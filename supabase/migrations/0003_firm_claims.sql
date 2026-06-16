-- Firm claim requests. Seeded from the public ICPAK firms register, a person
-- representing a firm submits a claim; we verify against ICPAK before granting
-- them an account to manage the listing.

create table if not exists public.firm_claims (
  id uuid primary key default gen_random_uuid(),
  firm_name text not null,
  firm_slug text,
  claimant_name text not null,
  claimant_role text,
  claimant_email text not null,
  claimant_phone text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists firm_claims_status_idx on public.firm_claims (status);
create index if not exists firm_claims_slug_idx on public.firm_claims (firm_slug);

alter table public.firm_claims enable row level security;

-- Anyone may submit a claim. No public read (claims hold contact details);
-- review happens with the service role / dashboard. Insert only, no SELECT
-- policy, so the action must not request return=representation.
create policy "firm_claims: public insert"
  on public.firm_claims
  for insert
  with check (true);

grant insert on public.firm_claims to anon, authenticated;
