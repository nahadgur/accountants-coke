-- =====================================================================
-- Accountants.co.ke — Job applications + billing/subscriptions
-- Depends on 0001_init.sql
-- =====================================================================

create type application_status as enum ('new', 'reviewed', 'shortlisted', 'rejected');
create type subscription_status as enum ('active', 'past_due', 'canceled', 'incomplete');
create type listing_addon as enum ('featured', 'newsletter');

-- ---------------------------------------------------------------------
-- JOB APPLICATIONS
-- ---------------------------------------------------------------------
create table public.job_applications (
  id              uuid primary key default gen_random_uuid(),
  job_id          uuid not null references public.job_postings (id) on delete cascade,
  applicant_name  text not null,
  applicant_email text not null,
  applicant_phone text,
  cv_url          text,
  cover_note      text,
  status          application_status not null default 'new',
  created_at      timestamptz not null default now()
);

create index idx_applications_job on public.job_applications (job_id);

-- Keep job_postings.applications_count denormalised + accurate.
create or replace function public.bump_application_count()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    update public.job_postings
      set applications_count = applications_count + 1
      where id = new.job_id;
  elsif tg_op = 'DELETE' then
    update public.job_postings
      set applications_count = greatest(applications_count - 1, 0)
      where id = old.job_id;
  end if;
  return null;
end;
$$;

create trigger trg_bump_application_count
  after insert or delete on public.job_applications
  for each row execute function public.bump_application_count();

-- ---------------------------------------------------------------------
-- SUBSCRIPTIONS  (source of truth for premium tier, written by billing)
-- ---------------------------------------------------------------------
create table public.subscriptions (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid not null unique references public.profiles (id) on delete cascade,
  provider            text not null default 'paystack',   -- paystack | stripe
  provider_ref        text,                                -- subscription code / id
  status              subscription_status not null default 'incomplete',
  current_period_end  timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- LISTING ORDERS  (featured-job / newsletter-push purchases)
-- ---------------------------------------------------------------------
create table public.listing_orders (
  id            uuid primary key default gen_random_uuid(),
  job_id        uuid references public.job_postings (id) on delete cascade,
  purchaser_id  uuid references auth.users (id) on delete set null,
  addon         listing_addon not null,
  amount_kes    integer not null,
  provider_ref  text,
  paid          boolean not null default false,
  created_at    timestamptz not null default now()
);

create index idx_listing_orders_job on public.listing_orders (job_id);

-- ---------------------------------------------------------------------
-- BILLING SYNC: when a subscription flips to active, mirror onto profiles
-- (design_tier + monthly_subscription_active). Runs as table owner, so it
-- bypasses the tier-self-escalation guard legitimately.
-- ---------------------------------------------------------------------
create or replace function public.sync_profile_from_subscription()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'active' and (new.current_period_end is null
       or new.current_period_end > now()) then
    update public.profiles
      set design_tier = 'premium', monthly_subscription_active = true
      where id = new.profile_id;
  else
    update public.profiles
      set monthly_subscription_active = false
      where id = new.profile_id;
  end if;
  return new;
end;
$$;

create trigger trg_sync_profile_from_subscription
  after insert or update on public.subscriptions
  for each row execute function public.sync_profile_from_subscription();

-- ---------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------
alter table public.job_applications enable row level security;
alter table public.subscriptions    enable row level security;
alter table public.listing_orders   enable row level security;

-- Anyone may apply to a job (public insert), but only the job's poster reads.
create policy "applications: public insert"
  on public.job_applications for insert
  with check (
    exists (
      select 1 from public.job_postings j
      where j.id = job_id and j.is_published and j.expires_at > now()
    )
  );

create policy "applications: job owner read"
  on public.job_applications for select
  using (
    exists (
      select 1 from public.job_postings j
      where j.id = job_applications.job_id and j.posted_by = auth.uid()
    )
  );

create policy "applications: job owner update"
  on public.job_applications for update
  using (
    exists (
      select 1 from public.job_postings j
      where j.id = job_applications.job_id and j.posted_by = auth.uid()
    )
  );

-- Subscriptions: the owner can read their own; writes are billing-only
-- (service_role bypasses RLS), so no insert/update policy is granted.
create policy "subscriptions: owner read"
  on public.subscriptions for select
  using (profile_id = auth.uid());

-- Listing orders: the purchaser can read their own; writes are billing-only.
create policy "listing_orders: purchaser read"
  on public.listing_orders for select
  using (purchaser_id = auth.uid());
