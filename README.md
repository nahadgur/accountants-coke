# Accountants.co.ke

Premium niche platform for the Kenyan accounting market — a freemium professional/firm
directory plus a job board with a private lead-routing engine.

## Stack

- **Next.js 15** (App Router, RSC, Server Actions)
- **Supabase** (Postgres + Auth + RLS)
- **Tailwind CSS** (navy / slate / gold-emerald premium theme)
- **Zod** for Server Action validation

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase keys
npm run dev
```

### Database

Apply the migration to your Supabase project:

```bash
supabase db push
# or paste supabase/migrations/0001_init.sql into the SQL editor
```

Then regenerate the typed client (replaces the hand-written src/lib/types.ts shapes):

```bash
npm run db:types
```

## Project structure

```
supabase/
  migrations/0001_init.sql           Schema, enums, indexes, RLS, route_lead()
  migrations/0002_applications_and_billing.sql
                                     job_applications, subscriptions, listing_orders,
                                     count + billing-sync triggers, RLS
  seed.sql                           Sample firms + jobs for local dev
src/middleware.ts                    Refreshes the Supabase session for RLS
src/lib/
  supabase/                          server.ts (RSC + service client), client.ts (browser)
  types.ts                           Domain types + filter constants
  directory.ts                       searchParams parsing + premium-first query
  auth.ts                            getUser / requireUser / getCurrentProfile
  utils.ts                           cn(), formatSalary, slugify, timeAgo
src/components/
  ui/                                button, card, badge, input/select/textarea/label
  directory/                         ProfileCard, DirectoryFilters
  match/                             MatchWizard
src/app/
  layout.tsx · page.tsx              Root shell + nav, homepage
  (auth)/login/                      Sign in / sign up (Server Actions)
  auth/callback · auth/signout       OAuth/email code exchange, sign out
  directory/ · directory/[id]/       Filtered directory; free vs premium profile
  firms/ · firms/[id]/               Firm directory + detail with openings
  jobs/ · jobs/[id]/                 Feed (featured first); detail + JobPosting JSON-LD
  jobs/new/ · jobs/new/checkout/     Multi-step post form + Featured/Newsletter upsell
  jobs/[id]/apply/                   Public application form (count trigger)
  match/                             Match questionnaire + lead routing action
  dashboard/                         Guarded: overview, profile editor, leads (claim),
                                     my jobs + applications, upgrade/pricing
  api/billing/webhook/               Paystack HMAC-verified webhook
  sitemap.ts · robots.ts             Dynamic SEO
  not-found · error · loading        System UI
```

## Key design decisions

- **Contact gating is column-level**, but Postgres RLS is row-level only. The
  `public_directory_profiles` view `CASE`-masks `phone/whatsapp/email/calendly_url`
  to `NULL` unless the row is an active premium subscriber (or the owner).
- **Leads are never broadcast.** The public can `INSERT` into `leads` but not
  `SELECT`. The `route_lead()` SECURITY DEFINER function links up to 3 matching
  premium profiles into `lead_recipients`, who are the only ones who can read it.
- **Tier flags are billing-owned.** A trigger blocks users from self-escalating
  their own `design_tier` / `monthly_subscription_active` / `is_verified`.
- **Filters live in the URL** (`method=GET`, validated server-side) so every
  category/location combination is a crawlable, SSR-rendered page.

## Integration points to wire before going live

These are deliberately stubbed so you can plug in your own providers:

- **Payments.** `dashboard/upgrade` and `jobs/new/checkout` have the UI and order
  records; connect Paystack subscription/charge creation, then point Paystack at
  `/api/billing/webhook` (signature verification is already implemented). The
  `subscriptions` → `profiles` tier sync happens automatically via DB trigger.
- **Notifications.** `match/actions.ts → notifyRecipients()` and job-application
  alerts are no-ops; wire Resend/Postmark (email) and Africa's Talking (SMS).
- **File uploads.** Avatars, firm logos, header images and CVs currently take URLs;
  add Supabase Storage buckets + signed-upload widgets.
- **Types.** Run `npm run db:types` after applying migrations to replace the
  hand-written shapes in `src/lib/types.ts` with generated ones.
