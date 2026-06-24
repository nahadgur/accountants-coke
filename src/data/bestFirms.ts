import type { Faq } from '@/data/services';
import type { Specialization } from '@/lib/types';

// "Top firms for X" roundups. INTEGRITY MODEL: we never store or author a
// ranked "best firms" list. The firm list shown on each page is fetched LIVE
// from the directory (public_directory_profiles via queryDirectory) using the
// location/specialization filters below, and presented as a neutrally-ordered
// listing of ICPAK-licensed firms, not an endorsement. Only `notableFirms`
// names specific firms, and only with plainly documentable facts (the Big Four).

export type RoundupCriterion = { heading: string; body: string[] };
export type NotableFirm = { name: string; fact: string };

export type FirmRoundup = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  lead: string;
  updated: string;
  /** Short segment noun used in the listing heading, e.g. "for startups". */
  segmentLabel: string;
  location: string | null; // 'Nairobi' | 'Mombasa' | null = Kenya-wide
  town?: string | null;
  specialization: Specialization | null; // directory filter; null = all
  criteria: RoundupCriterion[];
  notableFirms?: NotableFirm[];
  faqs: Faq[];
};

export const ROUNDUPS: FirmRoundup[] = [
  {
    slug: 'accounting-firms-in-kenya-for-startups',
    title: 'Accounting Firms in Kenya for Startups: How to Choose',
    metaTitle: 'Best Accounting Firms in Kenya for Startups (2026)',
    description:
      'How to choose an accounting firm for a startup in Kenya: sector fit, pricing, compliance from day one, and room to grow. Compare ICPAK-licensed firms.',
    lead: 'Choosing an accountant for a startup is less about firm size and more about fit: someone who understands early-stage compliance, cloud tools and a tight budget. Here is how to choose, and the ICPAK-licensed firms you can compare.',
    updated: '2026-06-24',
    segmentLabel: 'for startups',
    location: null,
    specialization: null,
    criteria: [
      {
        heading: 'Does the firm understand startups?',
        body: [
          'A firm that mostly serves established companies may not be the right fit for a seed-stage business. Look for experience with young companies: cloud bookkeeping, investor and board reporting, and a willingness to answer the small questions while you are finding your feet.',
        ],
      },
      {
        heading: 'Pricing that fits an early-stage budget',
        body: [
          'Fixed monthly packages are usually easier to plan around than open-ended hourly billing when cash is tight. Ask exactly what is included, what triggers extra fees, and whether the price scales sensibly as you hire and grow.',
        ],
      },
      {
        heading: 'Compliance from day one',
        body: [
          'Your accountant should set up the basics correctly from the start: KRA registration, [eTIMS onboarding](/guides/etims-kenya/), watching the [VAT threshold](/guides/vat-kenya/) as revenue grows, and PAYE once you start paying staff. Getting this right early avoids expensive clean-ups later.',
        ],
      },
      {
        heading: 'Room to grow into advisory',
        body: [
          'The right firm grows with you, from bookkeeping today to management accounts, fundraising support and board reporting as you scale. Ask whether they can step up when you need more than compliance.',
        ],
      },
    ],
    faqs: [
      { q: 'What kind of accountant does a startup in Kenya need?', a: 'One comfortable with early-stage businesses: cloud accounting, the compliance basics (KRA registration, eTIMS, VAT, PAYE), and clear fixed pricing, with the ability to grow into advisory as you scale.' },
      { q: 'Should a startup use a Big Four firm?', a: 'Usually not. The Big Four mainly serve large companies and price accordingly. For an early-stage startup a smaller specialist firm is typically a better fit and far more affordable.' },
      { q: 'How do I compare firms for my startup?', a: 'Use the criteria above (sector fit, pricing, compliance, room to grow), then compare ICPAK-licensed firms below or tell us your needs and we will match you privately with up to three.' },
    ],
  },
  {
    slug: 'audit-firms-in-nairobi',
    title: 'Audit Firms in Nairobi: How to Choose',
    metaTitle: 'Audit Firms in Nairobi (2026)',
    description:
      'How to choose a statutory audit firm in Nairobi: independence, sector experience, ICPAK practising status and fees. Compare ICPAK-licensed audit firms.',
    lead: 'Choosing an audit firm in Nairobi comes down to independence, relevant sector experience and a valid practising certificate. Here is what to check, and the ICPAK-licensed firms you can compare.',
    updated: '2026-06-24',
    segmentLabel: 'audit firms',
    location: 'Nairobi',
    specialization: 'Statutory Audit',
    criteria: [
      {
        heading: 'Practising status and independence',
        body: [
          'Only a firm with a valid ICPAK practising certificate can sign a statutory audit. Confirm that, and confirm genuine independence from the work being audited, before anything else.',
        ],
      },
      {
        heading: 'Sector experience and fees',
        body: [
          'An auditor who already knows your sector works faster and asks better questions. Weigh that against a clear, fixed fee quote and a realistic timetable.',
        ],
      },
    ],
    notableFirms: [
      { name: 'PwC', fact: 'One of the Big Four; operates in Kenya from Nairobi and audits many of the country’s largest companies.' },
      { name: 'Deloitte', fact: 'One of the Big Four; has a long-established Nairobi practice serving large-company audit, tax and advisory.' },
      { name: 'KPMG', fact: 'One of the Big Four; operates in Kenya from Nairobi across audit, tax and advisory.' },
      { name: 'EY', fact: 'One of the Big Four; operates in Kenya from Nairobi across assurance, tax and advisory.' },
    ],
    faqs: [
      { q: 'Who can carry out a statutory audit in Kenya?', a: 'Only an accountant or firm holding a valid ICPAK practising certificate. Full membership alone is not enough to sign an audit.' },
      { q: 'Which are the largest audit firms in Nairobi?', a: 'The Big Four, PwC, Deloitte, KPMG and EY, all operate in Nairobi and handle most large-company audits. Many strong mid-tier and smaller firms serve SMEs.' },
    ],
  },
  {
    slug: 'tax-firms-in-kenya-for-smes',
    title: 'Tax Firms in Kenya for SMEs: How to Choose',
    metaTitle: 'Tax Accountants in Kenya for SMEs (2026)',
    description:
      'How a Kenyan SME should choose a tax accountant: KRA and eTIMS know-how, VAT and turnover-tax handling, and fair pricing. Compare ICPAK-licensed firms.',
    lead: 'For an SME, the right tax firm keeps you compliant with KRA without overpaying, and without nasty surprises. Here is how to choose, and the ICPAK-licensed firms you can compare.',
    updated: '2026-06-24',
    segmentLabel: 'tax firms',
    location: null,
    specialization: 'Tax Audit',
    criteria: [
      {
        heading: 'KRA and eTIMS fluency',
        body: [
          'Your tax firm should be completely current on KRA systems: iTax filing, [eTIMS expense validation](/guides/etims-kenya/), and the [VAT registration threshold](/guides/vat-kenya/) and turnover-tax boundary. This is where most SME tax mistakes happen.',
        ],
      },
      {
        heading: 'Pricing and responsiveness',
        body: [
          'Look for transparent pricing and someone who actually replies before a filing deadline. For an SME, a responsive smaller firm often beats a big name you can never reach.',
        ],
      },
    ],
    faqs: [
      { q: 'What should an SME look for in a tax accountant in Kenya?', a: 'Current KRA and eTIMS knowledge, sound handling of VAT and turnover tax, transparent pricing and quick responses around deadlines.' },
      { q: 'Do small businesses in Kenya need a tax accountant?', a: 'Many manage simple filings themselves, but as soon as VAT, eTIMS validation or payroll enter the picture, a tax accountant usually pays for itself in avoided penalties.' },
    ],
  },
  {
    slug: 'bookkeeping-firms-in-mombasa',
    title: 'Bookkeeping Firms in Mombasa: How to Choose',
    metaTitle: 'Bookkeeping Services in Mombasa (2026)',
    description:
      'How to choose a bookkeeping firm in Mombasa: cloud software, monthly reporting and eTIMS-ready records. Compare ICPAK-licensed firms.',
    lead: 'Good bookkeeping in Mombasa keeps your records clean, your returns easy and your eTIMS invoices in order. Here is what to look for, and the ICPAK-licensed firms you can compare.',
    updated: '2026-06-24',
    segmentLabel: 'bookkeeping firms',
    location: 'Mombasa',
    specialization: 'Bookkeeping',
    criteria: [
      {
        heading: 'Cloud software and monthly reporting',
        body: [
          'Look for a firm that keeps your books in cloud software you can see, and sends clear monthly reports, not a shoebox reconciled once a year at tax time.',
        ],
      },
      {
        heading: 'eTIMS-ready records',
        body: [
          'With KRA validating expenses against [eTIMS](/guides/etims-kenya/), your bookkeeper should keep records that tie cleanly to valid electronic invoices, so your deductions hold up.',
        ],
      },
    ],
    faqs: [
      { q: 'What does a bookkeeping firm do?', a: 'It keeps your day-to-day financial records accurate and up to date, reconciles accounts, and produces the reports your accountant and KRA returns rely on.' },
      { q: 'Why does eTIMS matter for bookkeeping in Kenya?', a: 'Because KRA now validates expenses against eTIMS, your records need to match valid electronic invoices. Good bookkeeping keeps those deductions defensible.' },
    ],
  },
];

export const ROUNDUP_MAP = Object.fromEntries(ROUNDUPS.map((r) => [r.slug, r]));
export const getRoundup = (slug: string): FirmRoundup | undefined => ROUNDUP_MAP[slug];
