# Hidden for launch / staging

Things deliberately switched off while auth, the dashboard and Paystack billing
are not ready. Everything here is reversible. Search the codebase for the marker
comments (they all say "hidden for now" or "Repointed ... while auth/dashboard
is hidden").

## How to turn it ALL back on

### 1. Sign in (auth entry points)
- `src/app/layout.tsx` — header: uncomment the "Sign in" `<Link>` block.
- `src/components/layout/MobileNav.tsx` — bottom bar: uncomment the "Sign in"
  `<Link>` block.

### 2. "List your practice" / "Get listed" CTAs
These were repointed from `/login` and `/dashboard/upgrade` to the public claim
flow (`/directory`, labelled "Claim your firm"). To restore the original
account/upgrade CTAs, change `href="/directory"` back and relabel:
- `src/app/layout.tsx` — header CTA (was `List your practice` -> `/login`).
- `src/app/layout.tsx` — promo strip "Get listed" (was `/dashboard/upgrade`).
- `src/app/layout.tsx` — footer "For firms" column (the original links were
  `List your practice` -> `/login` and `Premium plans` -> `/dashboard/upgrade`).
- `src/app/page.tsx` — homepage CTA band (was `List your practice` -> `/login`).
- `src/components/home/HeroToggle.tsx` — "I am an accountant" tab CTA.
- `src/components/layout/MobileNav.tsx` — bottom CTA.

### 3. Job posting (paid checkout / Paystack)
- `src/app/jobs/new/page.tsx` — set `POSTING_ENABLED = true`.
- `next.config.ts` — remove the `/jobs/new/:path*` redirect entry.
- `src/app/jobs/page.tsx` — uncomment the "Post a job" `<Link>`.
- `src/app/dashboard/jobs/page.tsx` — uncomment the "Post a job" `<Link>`.
- Job BROWSING (`/jobs`, `/jobs/[id]`) was never hidden.

### 4. Guides + Blog content sections (all of /guides and /blog)
Both content sections are hidden for now. No data was deleted: `src/data/guides.ts`
and the route files under `src/app/guides` and `src/app/blog` are untouched. To
turn it back on:
- `next.config.ts` — delete the four `/guides` + `/blog` redirect entries (the
  ones bouncing to `/`). If you still want the old `/guides/turnover-tax-kenya`
  and `/blog/ways-to-get-an-accounting-job-in-kenya` redirects, re-add them.
- `src/components/layout/NavSegments.tsx` — restore the `/guides` (Guides) and
  `/blog` (Career Guides) nav items.
- `src/components/layout/MobileNav.tsx` — restore the same two items.
- `src/app/layout.tsx` — restore the two footer "Tax guides" (`/guides`) links.
- `src/app/services/[service]/page.tsx` — uncomment the related-guide `<p>`
  block (currently a JSX comment) to bring back the related-guide link.
- `src/app/sitemap.ts` — restore the `/guides` + `/blog` static entries, the
  `PUBLISHED_HUBS`/`PUBLISHED_SPOKES` import, the `guideRoutes`/`blogRoutes`
  arrays, and add them back into the returned array.

## Logging out while Sign in is hidden
The dashboard is still reachable by URL. Go to **/dashboard** and use the
**Sign out** button in the left nav (`src/app/dashboard/layout.tsx`, posts to
`/auth/signout`).

## Still required for full launch (separate from the above)
- Vercel env vars on the `accountants-coke` project (Supabase keys + SITE_URL).
- Supabase Auth: "Confirm email" off (or SMTP configured) + Site URL set to the
  live domain.
- Paystack live keys before re-enabling job posting / premium upgrade.
