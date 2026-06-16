-- =====================================================================
-- Accountants.co.ke — Initial schema, enums, indexes, RLS, and helpers
-- Postgres 15 / Supabase
-- =====================================================================
-- Design notes:
--   * RLS is ROW-level. Postgres cannot mask individual COLUMNS via RLS.
--     We therefore keep public-readable fields on `profiles` (RLS: anyone
--     can read a published row) but gate CONTACT fields behind a SQL VIEW
--     (`public_directory_profiles`) that NULLs out contact data unless the
--     row is a paying premium subscriber. The owner always sees their own
--     full row via the base table.
--   * The lead-routing engine never broadcasts. `leads` rows are insertable
--     by the public (the match form) but selectable only by the (max 3)
--     premium profiles they were routed to, tracked in `lead_recipients`.
-- =====================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "pg_trgm";     -- fuzzy text search on names

-- ---------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------
create type certification_type as enum ('CPA-K', 'ACCA', 'CIFA');
create type design_tier        as enum ('free', 'premium');
create type employment_type    as enum ('Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary');
create type specialization     as enum (
  'Tax Audit',
  'Forensic Accounting',
  'Bookkeeping',
  'Corporate Finance',
  'Payroll',
  'Statutory Audit',
  'Management Consulting',
  'Company Secretarial'
);
create type lead_status        as enum ('open', 'routed', 'claimed', 'closed');

-- ---------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- PROFILES  (1:1 with auth.users)
-- =====================================================================
create table public.profiles (
  id                          uuid primary key references auth.users (id) on delete cascade,
  full_name                   text not null,
  slug                        text unique,                       -- SEO friendly /directory/[slug]
  bio                         text,
  certification_type          certification_type,
  registration_number         text,                              -- e.g. ICPAK membership no.
  location                    text not null,                     -- city, e.g. 'Nairobi'
  town                        text,                              -- sub-area, e.g. 'Westlands'
  specializations             specialization[] not null default '{}',
  firm_id                     uuid,   -- FK added after firms table exists (see below)

  -- gated contact fields (only exposed for active premium via the view)
  email                       text,
  phone                       text,
  whatsapp                    text,
  calendly_url                text,

  -- premium presentation assets
  avatar_url                  text,
  header_image_url            text,
  is_verified                 boolean not null default false,

  -- tier + billing
  design_tier                 design_tier not null default 'free',
  monthly_subscription_active boolean not null default false,

  is_published                boolean not null default true,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- a profile counts as "premium" only when on the premium tier AND paid up
create or replace function public.is_active_premium(p public.profiles)
returns boolean
language sql
immutable
as $$
  select p.design_tier = 'premium' and p.monthly_subscription_active;
$$;

-- =====================================================================
-- FIRMS
-- =====================================================================
create table public.firms (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid references auth.users (id) on delete set null,
  name           text not null,
  slug           text unique,
  logo_url       text,
  description    text,
  location       text not null,    -- Nairobi, Mombasa, Kisumu...
  town           text,
  website        text,
  premium_status boolean not null default false,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger trg_firms_updated_at
  before update on public.firms
  for each row execute function public.set_updated_at();

-- Now that firms exists, wire up the deferred profiles.firm_id FK.
alter table public.profiles
  add constraint profiles_firm_id_fkey
  foreign key (firm_id) references public.firms (id) on delete set null;

-- =====================================================================
-- JOB POSTINGS
-- =====================================================================
create table public.job_postings (
  id                uuid primary key default gen_random_uuid(),
  firm_id           uuid references public.firms (id) on delete cascade,   -- nullable: direct employer
  posted_by         uuid references auth.users (id) on delete set null,
  direct_employer   text,                                                  -- used when firm_id is null
  title             text not null,
  slug              text,
  description       text not null,
  employment_type   employment_type not null,
  location          text not null,
  town              text,
  specialization    specialization,
  salary_range_min  integer,            -- KES, monthly
  salary_range_max  integer,
  salary_currency   text not null default 'KES',
  applications_count integer not null default 0,
  is_featured       boolean not null default false,
  is_published      boolean not null default true,
  created_at        timestamptz not null default now(),
  expires_at        timestamptz not null default (now() + interval '30 days'),
  updated_at        timestamptz not null default now(),
  constraint salary_range_valid
    check (salary_range_min is null or salary_range_max is null
           or salary_range_max >= salary_range_min)
);

create trigger trg_jobs_updated_at
  before update on public.job_postings
  for each row execute function public.set_updated_at();

-- =====================================================================
-- LEADS  (Match-me engine)  + recipient routing table
-- =====================================================================
create table public.leads (
  id                   uuid primary key default gen_random_uuid(),
  client_name          text not null,
  client_email         text not null,
  client_phone         text,
  service_needed       specialization not null,
  location             text not null,
  town                 text,
  message              text,
  status               lead_status not null default 'open',
  assigned_to_profile_id uuid references public.profiles (id) on delete set null,
  created_at           timestamptz not null default now()
);

-- join table: a lead is routed to at most 3 premium profiles (never broadcast)
create table public.lead_recipients (
  lead_id      uuid not null references public.leads (id) on delete cascade,
  profile_id   uuid not null references public.profiles (id) on delete cascade,
  notified_at  timestamptz not null default now(),
  viewed_at    timestamptz,
  claimed_at   timestamptz,
  primary key (lead_id, profile_id)
);

-- =====================================================================
-- INDEXES (tuned for the directory filter + sort and the routing query)
-- =====================================================================
-- Premium-first sort: partial index makes the "premium pinned" ordering cheap
create index idx_profiles_premium_first
  on public.profiles (design_tier desc, created_at asc)
  where is_published;

create index idx_profiles_location      on public.profiles (location) where is_published;
create index idx_profiles_town          on public.profiles (town)     where is_published;
create index idx_profiles_certification on public.profiles (certification_type);
create index idx_profiles_specializations on public.profiles using gin (specializations);
create index idx_profiles_name_trgm     on public.profiles using gin (full_name gin_trgm_ops);

create index idx_jobs_feed
  on public.job_postings (is_featured desc, created_at desc)
  where is_published;
create index idx_jobs_location on public.job_postings (location) where is_published;
create index idx_jobs_firm     on public.job_postings (firm_id);

create index idx_leads_routing on public.leads (service_needed, location, status);
create index idx_lead_recipients_profile on public.lead_recipients (profile_id);

-- =====================================================================
-- PUBLIC DIRECTORY VIEW — column-level gating for contact info
-- =====================================================================
-- Anyone can read this view. Contact columns resolve to NULL unless the
-- row is an active premium subscriber. The owner sees their own contacts
-- regardless (auth.uid() match). security_invoker keeps RLS in effect.
create or replace view public.public_directory_profiles
with (security_invoker = true) as
select
  p.id,
  p.full_name,
  p.slug,
  p.bio,
  p.certification_type,
  p.registration_number,
  p.location,
  p.town,
  p.specializations,
  p.firm_id,
  p.avatar_url,
  p.header_image_url,
  p.is_verified,
  p.design_tier,
  p.monthly_subscription_active,
  p.created_at,
  -- gated fields
  case when public.is_active_premium(p) or p.id = auth.uid()
       then p.email     else null end as email,
  case when public.is_active_premium(p) or p.id = auth.uid()
       then p.phone     else null end as phone,
  case when public.is_active_premium(p) or p.id = auth.uid()
       then p.whatsapp  else null end as whatsapp,
  case when public.is_active_premium(p) or p.id = auth.uid()
       then p.calendly_url else null end as calendly_url
from public.profiles p
where p.is_published;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table public.profiles        enable row level security;
alter table public.firms           enable row level security;
alter table public.job_postings    enable row level security;
alter table public.leads           enable row level security;
alter table public.lead_recipients enable row level security;

-- ---------- profiles ----------
-- Public can read published profiles (contact masking happens at the view).
create policy "profiles: public read published"
  on public.profiles for select
  using (is_published = true);

-- Owners manage their own row.
create policy "profiles: owner insert"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: owner update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Guard against privilege escalation: a normal user must NOT be able to flip
-- their own tier/subscription flags. Those are owned by the billing webhook
-- (service_role bypasses RLS). Enforce via a trigger rather than RLS column
-- checks, which RLS cannot express directly.
create or replace function public.prevent_tier_self_escalation()
returns trigger
language plpgsql
as $$
begin
  if auth.role() <> 'service_role' then
    if new.design_tier is distinct from old.design_tier
       or new.monthly_subscription_active is distinct from old.monthly_subscription_active
       or new.is_verified is distinct from old.is_verified then
      raise exception 'tier, subscription and verification are managed by billing only';
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_profiles_no_tier_escalation
  before update on public.profiles
  for each row execute function public.prevent_tier_self_escalation();

-- ---------- firms ----------
create policy "firms: public read published"
  on public.firms for select
  using (is_published = true);

create policy "firms: owner all"
  on public.firms for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ---------- job_postings ----------
create policy "jobs: public read published"
  on public.job_postings for select
  using (is_published = true and expires_at > now());

-- Poster owns the job, OR they own the firm the job belongs to.
create policy "jobs: poster insert"
  on public.job_postings for insert
  with check (
    auth.uid() = posted_by
    and (
      firm_id is null
      or exists (select 1 from public.firms f
                 where f.id = firm_id and f.owner_id = auth.uid())
    )
  );

create policy "jobs: poster update"
  on public.job_postings for update
  using (auth.uid() = posted_by)
  with check (auth.uid() = posted_by);

create policy "jobs: poster delete"
  on public.job_postings for delete
  using (auth.uid() = posted_by);

-- ---------- leads ----------
-- The public match form may INSERT a lead. It may never SELECT the pool.
create policy "leads: public insert"
  on public.leads for insert
  with check (true);

-- A premium profile may read a lead ONLY if it was explicitly routed to them.
create policy "leads: routed recipients read"
  on public.leads for select
  using (
    exists (
      select 1 from public.lead_recipients lr
      where lr.lead_id = leads.id
        and lr.profile_id = auth.uid()
    )
  );

-- An assigned recipient may claim (update status / assignment) a lead routed to them.
create policy "leads: recipient claim"
  on public.leads for update
  using (
    exists (
      select 1 from public.lead_recipients lr
      where lr.lead_id = leads.id
        and lr.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.lead_recipients lr
      where lr.lead_id = leads.id
        and lr.profile_id = auth.uid()
    )
  );

-- ---------- lead_recipients ----------
-- Recipients see only their own routing rows (their private dashboard feed).
create policy "lead_recipients: own read"
  on public.lead_recipients for select
  using (profile_id = auth.uid());

create policy "lead_recipients: own update"
  on public.lead_recipients for update
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- Inserts into lead_recipients are done by the routing function (service_role),
-- so no public insert policy is granted.

-- =====================================================================
-- LEAD ROUTING FUNCTION  (security definer, called by a Server Action /
-- Edge Function running with the service role or invoked safely server-side)
-- Selects up to 3 active premium profiles matching service + location,
-- ranked by verification then recency, links them, and returns recipients.
-- =====================================================================
create or replace function public.route_lead(p_lead_id uuid)
returns setof public.lead_recipients
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead public.leads%rowtype;
begin
  select * into v_lead from public.leads where id = p_lead_id;
  if not found then
    raise exception 'lead % not found', p_lead_id;
  end if;

  insert into public.lead_recipients (lead_id, profile_id)
  select v_lead.id, p.id
  from public.profiles p
  where p.is_published
    and p.design_tier = 'premium'
    and p.monthly_subscription_active
    and p.location = v_lead.location
    and v_lead.service_needed = any (p.specializations)
  order by p.is_verified desc, p.created_at asc
  limit 3
  on conflict (lead_id, profile_id) do nothing;

  update public.leads
    set status = 'routed'
    where id = v_lead.id and status = 'open';

  return query
    select * from public.lead_recipients where lead_id = v_lead.id;
end;
$$;

revoke all on function public.route_lead(uuid) from public, anon, authenticated;
