import type { Faq } from '@/data/services';

// Pillar guides (top-of-funnel SEO). Body is rendered as editorial prose with a
// jump-nav; each guide funnels to matching via the related service.

export type GuideSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle?: string; // tight SEO title (falls back to title)
  description: string;
  lead: string;
  updated: string; // ISO date
  sections: GuideSection[];
  faqs: Faq[];
  relatedService?: string; // service slug, surfaces matching pros
};

export const GUIDES: Guide[] = [
  {
    slug: 'rental-income-tax-kenya',
    title: 'Rental Income Tax in Kenya: The Landlord’s Guide',
    metaTitle: 'Rental Income Tax in Kenya (2026 Guide)',
    description:
      'How rental income tax (MRI) works in Kenya: the 7.5% rate, monthly filing, NIL returns, eRITS and penalties, plus when to get an accountant.',
    lead: 'If you earn residential rent in Kenya, KRA expects a Monthly Rental Income return every month, even when a unit is empty. Here is exactly how it works, and how to stay compliant without overpaying.',
    updated: '2026-06-16',
    sections: [
      {
        id: 'how-it-works',
        heading: 'How MRI Works',
        body: [
          'Residential rent in Kenya is taxed under Monthly Rental Income (MRI), a final tax of 7.5% on the gross rent you receive. The rate fell from 10% to 7.5% on 1 January 2024. Because it is a final tax, no expenses, losses or capital allowances are deductible; the 7.5% is charged on the full rent before any costs.',
          'MRI applies to resident landlords, both individuals and companies, whose residential rental income is more than KES 280,000 and not more than KES 15 million in a year.',
        ],
        bullets: [
          'Rate: 7.5% of gross rent received (down from 10% before 2024)',
          'A final tax, with no expense, loss or capital deductions',
          'For resident landlords earning KES 280,000 to 15 million a year',
          'Charged on rent received, not on profit',
        ],
      },
      {
        id: 'who-pays',
        heading: 'Who Pays MRI',
        body: [
          'Earn KES 280,000 or less from residential rent in a year and you fall outside MRI; that income is handled under the normal income-tax rules instead. Earn more than KES 15 million and you also leave MRI, declaring the rent in your annual income tax return at the normal rates alongside your other income.',
          'MRI covers residential property only. Commercial rent is declared in your annual income tax return, where normal expenses are deductible, and it attracts 16% VAT once your turnover reaches KES 5 million. A landlord with both residential and commercial units runs both regimes at once.',
          'Non-resident landlords are outside MRI too: their rent is subject to 30% withholding tax as a final tax, deducted by the tenant. KRA can also appoint rental income tax agents, usually property managers, to deduct MRI at source and remit it for you. Short-let or furnished (Airbnb-style) lettings and jointly owned property are treated differently, so confirm your exact position with an accountant.',
        ],
      },
      {
        id: 'filing',
        heading: 'Filing and Paying on eRITS',
        body: [
          'MRI is filed every month. The return and payment are due on or before the 20th of the following month, so rent received in January is declared and paid by 20 February.',
          'You must file a NIL return for any month you receive no rent; a skipped NIL is still a missed filing. KRA launched the Electronic Rental Income Tax System (eRITS) on 10 April 2025, built on the Gava Connect platform, to register properties, file and pay online.',
          'Using eRITS is currently optional, you can still file MRI on iTax. But draft 2026 regulations propose making eRITS registration mandatory, with each property listed individually; they were out for public consultation in 2026, so treat compulsory registration as coming rather than settled law. Most landlords set a standing monthly routine or hand it to an accountant so the 20th never slips.',
        ],
      },
      {
        id: 'standard-regime',
        heading: 'When the Standard Regime Is Better',
        body: [
          'MRI’s simplicity costs you deductions. When your expenses, mortgage interest, repairs, management and agent fees, are high relative to rent, a flat 7.5% on gross can exceed what you would pay on actual profit.',
          'You may elect, by written notice to the Commissioner, not to be taxed under MRI. The annual income-tax regime then applies and you claim allowable expenses against the rent. An accountant models both, files the election correctly, and registers you for whichever leaves you better off.',
        ],
      },
      {
        id: 'penalties',
        heading: 'Penalties to Avoid',
        body: [
          'The Tax Procedures Act fixes the cost of slipping. Late filing is KES 2,000 or 5% of the tax due (whichever is higher) for individuals, and KES 20,000 or 5% for companies. Late payment adds a 5% penalty plus interest of 1% per month on the unpaid tax. Because MRI is monthly, these stack up fast, and a missed NIL return still counts as a missed filing.',
          'From January 2026, KRA also validates expenses against eTIMS. If you elect the standard regime to claim costs, those expenses generally need valid electronic invoices to be deductible, so your suppliers’ compliance now affects your tax bill. Staying current is far cheaper than catching up after an audit.',
        ],
      },
    ],
    faqs: [
      { q: 'How much is rental income tax in Kenya?', a: 'MRI is a final tax of 7.5% on gross rent (reduced from 10% in 2024) for resident landlords earning between KES 280,000 and 15 million a year.' },
      { q: 'What is the rental income tax threshold?', a: 'MRI applies to residential rent above KES 280,000 and up to KES 15 million a year. Below that it is taxed under normal rules; above it, under the annual income-tax regime.' },
      { q: 'Do I file even if I got no rent?', a: 'Yes. A NIL return is required for any month you receive no rent, by the 20th of the following month.' },
      { q: 'Can I deduct expenses from rental income?', a: 'Not under MRI. You can elect in writing to the Commissioner to use the standard regime and claim deductions if your expenses are high.' },
      { q: 'Does MRI apply to commercial property?', a: 'No. MRI is for residential rent only. Commercial rent is taxed under normal income tax and may attract VAT.' },
      { q: 'Do non-resident landlords pay MRI?', a: 'No. A non-resident landlord’s rent is subject to 30% withholding tax as a final tax, deducted by the tenant, not MRI.' },
    ],
    relatedService: 'rental-income-tax',
  },
  {
    slug: 'etims-kenya',
    title: 'eTIMS in Kenya (2026): What Every Business Must Do',
    metaTitle: 'eTIMS in Kenya 2026: What to Do',
    description:
      'KRA’s eTIMS expense validation is live from January 2026. Who must onboard, what counts as a valid invoice, and how to keep expenses deductible.',
    lead: 'Since January 2026, KRA validates the expenses on your return against eTIMS. Purchases without a valid electronic invoice can be disallowed and taxed. Here is what that means and what to do.',
    updated: '2026-06-16',
    sections: [
      {
        id: 'what-changed',
        heading: 'What Changed in 2026',
        body: [
          'From 1 January 2026, KRA cross-checks your income tax return against three data sources: TIMS/eTIMS invoice records, the gross amounts on Withholding Income Tax, and Customs import data. Anything that does not reconcile gets flagged.',
          'Expenses not backed by a valid electronic invoice (carrying the buyer PIN where applicable) are disallowed, which raises your taxable profit and your tax. This builds on a rule already in force since 1 January 2024; 2026 simply switches on automated validation, starting with 2025 returns filed by 30 June 2026.',
        ],
      },
      {
        id: 'who',
        heading: 'Who Has to Onboard',
        body: [
          'Since 1 September 2023, all persons carrying on business must onboard eTIMS and issue electronic invoices, whether or not they are VAT-registered.',
        ],
        bullets: [
          'Companies, partnerships and sole proprietors',
          'Associations, trusts and NGOs',
          'VAT-exempt sectors: hospitals, schools, tours and travel',
          'Landlords and turnover-tax payers',
        ],
      },
      {
        id: 'exempt',
        heading: 'What’s Exempt',
        body: [
          'Section 23A of the Tax Procedures Act lets some payments sit outside the e-invoice requirement: emoluments (payroll), imports, investment allowances, interest, airline passenger ticketing and withholding-tax payments.',
          'Almost everything else your business buys needs a valid eTIMS invoice to be deductible, so do not assume an expense is exempt without checking.',
        ],
      },
      {
        id: 'small-business',
        heading: 'The Under-KES-5M Relief',
        body: [
          'Suppliers with annual turnover up to KES 5 million do not issue their own eTIMS invoices. Instead the buyer issues the invoice on the seller’s behalf, with the seller’s consent, through eCitizen or USSD *222#. This is buyer-initiated, or reverse, invoicing under the Tax Procedures Act.',
          'It still has to be set up correctly, which is where an accountant helps.',
        ],
      },
      {
        id: 'stay-deductible',
        heading: 'How to Stay Deductible',
        body: [
          'Onboard through the method that fits your size: eTIMS Lite (web via eCitizen, USSD *222#, or the "eTIMS Non VAT" app) for small and non-VAT businesses, or the online portal and eTIMS client for larger or multi-branch operations.',
          'Then make sure every supplier issues a compliant invoice with your PIN, and reconcile monthly. An accountant configures invoicing, trains your team and keeps your expenses defensible.',
        ],
      },
    ],
    faqs: [
      { q: 'Who needs eTIMS in Kenya?', a: 'All persons in business since 1 September 2023, companies, sole proprietors, partnerships, NGOs, schools, hospitals and landlords, not only VAT-registered businesses.' },
      { q: 'When did eTIMS start?', a: 'Onboarding has been required since 1 September 2023, with a window for non-VAT taxpayers to 31 March 2024. From January 2026 KRA validates returns against eTIMS.' },
      { q: 'What expenses are exempt from eTIMS?', a: 'Section 23A exempts emoluments, imports, investment allowances, interest, airline tickets and withholding-tax payments. Most other purchases need a valid eTIMS invoice to be deductible.' },
      { q: 'What if my supplier has no eTIMS?', a: 'Their invoice may not be valid for your deduction, so the expense can be disallowed. Push suppliers to comply, or use buyer-initiated invoicing where the supplier is under KES 5 million turnover.' },
      { q: 'Is there relief for small businesses?', a: 'Yes. Suppliers under KES 5 million turnover use buyer-initiated (reverse) invoicing, where the buyer issues the invoice with the seller’s consent.' },
    ],
    relatedService: 'etims',
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
export const getGuide = (slug: string): Guide | undefined => GUIDE_MAP[slug];
