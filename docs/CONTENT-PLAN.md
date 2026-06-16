# Accountants.co.ke — Content Plan

Status: planning. Pick this up and start drafting from "Phase 1 backlog".
Last updated: 17 June 2026.

## The goal

Own three kinds of Kenyan search at once, all feeding the two revenue engines:

1. **Find an accountant** (commercial intent) → directory + "Get matched".
2. **Tax/compliance how-to** (business owners with a problem) → matched to a firm.
3. **Accounting careers** (job seekers + employers) → the job board.

Principle, unchanged: **specific before broad.** We win long-tail, intent-rich,
Kenya-specific queries first (where incumbents are weak), then earn the head
terms. We never chase generic "accounting" traffic that won't convert.

## How content converts (funnel map)

| Content type | Reader | Primary CTA | Links to |
|---|---|---|---|
| Compliance guide | Business owner with a deadline/problem | Get matched (modal) | Related service page, directory |
| "Accountant for X" segment page | Owner choosing a firm | Get matched + Browse directory | Directory, relevant guide |
| Pricing / decision guide | Owner comparing options | Get matched | Directory, services |
| Salary / career guide | Job seeker | Browse jobs | Jobs, How to become a CPA |

Every page ends with one clear CTA. Guides and segment pages push to the
directory/match; career pages push to jobs.

## Three silos (hub → spokes)

**A. Tax & compliance (top of funnel).**
Hub: `/guides`. Existing spokes: Rental Income Tax (MRI), eTIMS.
Clusters to build: payroll levies, SME taxes, KRA how-tos, VAT.

**B. Find an accountant (bottom of funnel).**
Hub: `/services` + `/directory`. Spokes: "accountant for [segment]" pages and
decision guides (cost, CPA vs ACCA, how to choose).

**C. Accounting careers (jobs engine).**
Hub: `/jobs`. Spokes: salary benchmarks, "how to become a CPA (KASNEB)",
entry-level guides, CV/interview guides.

## Guardrails (do not break)

- **Accuracy first (YMYL tax).** Verify every rate, threshold and deadline
  against KRA/official sources at draft time. Rates change with each Finance
  Act. Research before publishing; do not assert figures from memory.
- **No calculators.** Salary/PAYE calculators belong to the separate
  payecalculator.co.ke property. Here we write explainers and benchmarks, not
  tools, so we never cannibalise it.
- **Editorial byline only.** No fabricated named authors or credentials.
- **Kenyan English, KES, local context.** Real KRA/iTax/eTIMS/KASNEB references.
- **Bespoke metadata.** Unique, keyword-rich meta description per page; titles
  in title case; clean word-based slugs.
- **One CTA per page**, matched to intent (see funnel map).
- Internal-link every new page into its hub and at least one sibling.

## Phase 1 backlog (first batch — start here)

Ordered by intent + timeliness + clustering. Aim ~2-3 per working session.

| # | Working title | Target query | Silo | Intent | CTA | Notes / cluster |
|---|---|---|---|---|---|---|
| 1 | How Much Does an Accountant Cost in Kenya? | accountant fees / cost kenya | B | Commercial | Get matched | Pricing ranges by service + firm size. High-intent. |
| 2 | Accountant for Small Businesses in Kenya | small business accountant kenya | B | Commercial | Get matched | Segment hub; links TOT + bookkeeping. |
| 3 | Turnover Tax (TOT) in Kenya: Who Pays and How | turnover tax kenya | A | Problem | Get matched | SME cluster with #2. Verify 3% / KES 1m-25m band. |
| 4 | SHIF for Employers and Employees, Explained | SHIF kenya / NHIF replacement | A | Problem | Get matched | Timely (2024 change). Payroll cluster. Verify rates. |
| 5 | The Affordable Housing Levy, Explained | housing levy kenya | A | Problem | Get matched | Timely. Payroll cluster. Verify 1.5% + scope. |
| 6 | How to File Your KRA Returns on iTax (incl. Nil) | file kra returns / nil return | A | How-to | Get matched | High-volume how-to. Links eTIMS guide. |
| 7 | VAT in Kenya: Registration, Rates and Filing | vat kenya | A | Problem | Get matched | Pillar; links the VAT service page. Verify 16% / 5m threshold. |
| 8 | Accountant for Landlords and Real Estate | landlord accountant kenya | B | Commercial | Get matched | Pairs with existing MRI guide (strong cluster). |
| 9 | CPA vs ACCA vs CIFA: Which Do You Need? | cpa vs acca kenya | B | Decision | Browse directory | Sends to the right directory filter. |
| 10 | Accountant Salary in Kenya (2026 Benchmarks) | accountant salary kenya | C | Career | Browse jobs | Jobs-engine anchor. Benchmarks by level, NOT a calculator. |

## Phase 2 backlog bank (after Phase 1)

**Compliance (A):** NSSF new rates explained · Withholding tax rates in Kenya ·
Instalment/advance tax · KRA PIN registration · Digital Service / significant
economic presence tax · Capital Gains Tax on property · Tax deadlines calendar
(Kenya) · eTIMS for freelancers · eTIMS for landlords · Penalties and interest
for late filing.

**Find an accountant (B):** Accountant for SACCOs · for NGOs/charities · for
e-commerce/online sellers · for restaurants & hospitality · for matatu/transport
SACCOs · for medical/dental practices · for schools · for importers/exporters ·
for startups · How to Choose an Accountant in Kenya (checklist) · Signs You've
Outgrown Doing Your Own Books.

**Careers (C):** How to Become a CPA in Kenya (KASNEB path) · CPA salary by
section/level · Audit associate salary · Entry-level accounting jobs guide ·
Accounting CV template for Kenya · Accounting interview questions · Remote
accounting jobs in Kenya.

Each Phase 2 item slots under its hub and links to a Phase 1 sibling.

## Workflow per piece (repeatable)

1. **Validate** the query (Google autocomplete + "People also ask" + a live
   SERP check: who ranks, how thin, aggregators present?). Skip if a giant
   already owns it cleanly; keep if the top results are thin/aggregator.
2. **Research** the facts from KRA/official sources; note figures + source.
3. **Draft** to the page-anatomy shape: lead → what it is → who it affects →
   steps/figures → worked example → FAQ. 900-1,600 words for guides.
4. **Add** bespoke title + meta description, FAQ schema, one CTA, internal links
   (hub + one sibling).
5. **Publish** as a new entry in the relevant data file (`src/data/guides.ts`
   for A, a new segment-pages pattern for B, jobs/career data for C).

## Sequencing

~3 pieces/week is sustainable solo. Phase 1 (10 pieces) ≈ 3-4 weeks and gives
each silo a beachhead plus two real clusters (rental/landlord, payroll levies,
SME). Re-check rankings monthly; double down on whichever silo moves first.

## Open decisions before drafting

- Segment pages (B) need a template: reuse the service-page shape, or a lighter
  `/find/[segment]` route? Decide before #2.
- Career/salary pages (C): new `/careers` hub, or fold into `/guides`? Decide
  before #10.
