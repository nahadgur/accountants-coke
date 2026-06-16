-- =====================================================================
-- Seed data for local development. Run after migrations:
--   supabase db reset   (applies migrations + this seed)
-- NOTE: profiles.id normally FKs to auth.users. For seeding without real
-- auth users, create them first via the Supabase dashboard or the admin API,
-- then replace the UUIDs below. The firms + jobs below are standalone.
-- =====================================================================

insert into public.firms (id, name, slug, location, town, website, premium_status, description)
values
  ('11111111-1111-1111-1111-111111111111', 'Mwangi & Associates', 'mwangi-associates', 'Nairobi', 'Westlands', 'https://mwangi.co.ke', true,  'Full-service audit, tax and advisory firm serving Kenyan SMEs and multinationals.'),
  ('22222222-2222-2222-2222-222222222222', 'Coastline Advisory',  'coastline-advisory',  'Mombasa', 'Nyali',     'https://coastline.co.ke', true, 'Coast-region specialists in shipping, logistics and hospitality accounting.'),
  ('33333333-3333-3333-3333-333333333333', 'Rift Capital Partners','rift-capital',        'Nakuru',  'CBD',       null, false, 'Corporate finance and management consulting for agribusiness.')
on conflict (id) do nothing;

insert into public.job_postings
  (firm_id, direct_employer, title, slug, description, employment_type, location, town, specialization, salary_range_min, salary_range_max, is_featured)
values
  ('11111111-1111-1111-1111-111111111111', null, 'Senior Tax Manager', 'senior-tax-manager-seed',
   'Lead the tax practice, manage a team of five, and advise multinational clients on Kenyan and EAC tax matters. CPA-K required with 8+ years experience.',
   'Full-time', 'Nairobi', 'Westlands', 'Tax Audit', 250000, 350000, true),
  ('22222222-2222-2222-2222-222222222222', null, 'Audit Associate', 'audit-associate-seed',
   'Support statutory audits across our shipping and hospitality portfolio. ACCA part-qualified or CPA-K finalist.',
   'Full-time', 'Mombasa', 'Nyali', 'Statutory Audit', 120000, 160000, true),
  (null, 'Acme Retail Ltd', 'Bookkeeper (SME)', 'bookkeeper-sme-seed',
   'Handle day-to-day bookkeeping, VAT filings and payroll for a growing retail business. QuickBooks experience essential.',
   'Contract', 'Nairobi', 'CBD', 'Bookkeeping', 80000, 100000, false),
  ('33333333-3333-3333-3333-333333333333', null, 'Finance Intern', 'finance-intern-seed',
   'Six-month internship supporting the corporate finance team on valuations and financial modelling.',
   'Internship', 'Nakuru', 'CBD', 'Corporate Finance', null, null, false)
on conflict do nothing;
