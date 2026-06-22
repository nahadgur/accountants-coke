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
  {
    slug: 'vat-kenya',
    title: 'VAT in Kenya: Registration, Rates and Filing',
    metaTitle: 'VAT in Kenya: Rates, Registration and Filing (2026)',
    description:
      'When you must register for VAT in Kenya, the 16% standard rate and zero-rated and exempt supplies, plus how to file and pay on iTax by the 20th.',
    lead: 'Value Added Tax is the consumption tax you charge on most goods and services you sell in Kenya. The real question for a growing business is usually whether you have crossed the line that makes registration compulsory, and what changes the day you do. This guide sets out who must register, the rates that apply, and how filing and payment work on iTax, with every figure checked against the Kenya Revenue Authority.',
    updated: '2026-06-22',
    sections: [
      {
        id: 'who-must-register',
        heading: 'Who has to register for VAT',
        body: [
          "Registration turns on turnover, not profit. You must register for VAT once the value of your taxable goods and services reaches or is expected to reach KES 5 million in any twelve-month period, according to the [Kenya Revenue Authority's VAT guidance](https://www.kra.go.ke/individual/filing-paying/types-of-taxes/value-added-tax). The test is forward-looking as well as backward-looking: if you can reasonably see your sales crossing KES 5 million in the coming year, you are expected to register before you breach the threshold rather than after.",
          "Businesses below KES 5 million can still apply for voluntary registration, which some do so they can reclaim the VAT they pay on stock and equipment. Voluntary registration is granted subject to KRA conditions, and it carries the same monthly filing duty as compulsory registration, so it is worth weighing the input tax you would recover against the ongoing compliance load.",
          "If your turnover sits in the small-business range and VAT does not yet apply, your obligation may instead be Turnover Tax, which is a separate regime for smaller traders. The two do not overlap, so settle which one you fall under before you register for anything.",
        ],
      },
      {
        id: 'vat-rates',
        heading: 'The rates: standard, zero-rated and exempt',
        body: [
          "Kenya runs three VAT categories, and the difference between them matters for what you can claim back.",
          "The standard rate is 16%, and it applies to most taxable goods and services. This is the rate you add to your invoices and the rate buyers see at the till.",
          "Zero-rated supplies are taxable but charged at 0%. These are listed in the Second Schedule to the [VAT Act 2013](https://new.kenyalaw.org/akn/ke/act/2013/35/) and include certain exports and a defined set of essential goods. Because zero-rated supplies are still taxable in law, a business making them can register and reclaim the input VAT it has paid, which is the practical reason the zero rate exists rather than a plain exemption.",
          "Exempt supplies are different. They are listed in the First Schedule and are outside the VAT net entirely, which means you do not charge VAT on them but you also cannot deduct the input VAT on costs that relate to them. Getting the classification wrong is one of the more common ways businesses either overcharge customers or lose a refund they were entitled to, so confirm the schedule that covers your products before you set your prices.",
        ],
      },
      {
        id: 'filing-and-paying',
        heading: 'How to file and pay VAT on iTax',
        body: [
          "VAT is a monthly tax. Both the return and the payment are due on or before the 20th day of the month following the tax period, and returns are filed online through iTax, as set out in the KRA VAT guidance. A return covering June, for example, is due by 20 July.",
          "A registered business files every month even when there is nothing to declare. If you made no sales in a period you still submit a nil return rather than skipping the month, because the obligation attaches to your registration, not to whether you traded. This is the same NIL-return discipline that applies elsewhere in the KRA system, and missing it is treated as a failure to file rather than a harmless gap.",
          "The return itself reconciles the VAT you charged on sales against the VAT you paid on purchases, and you remit the difference. That reconciliation now leans heavily on electronic invoicing: input VAT generally has to be supported by a valid electronic tax invoice for KRA to accept the deduction. If you are not yet set up for compliant invoicing, our explainer on [how eTIMS works for Kenyan businesses](/guides/etims-kenya/) covers what counts as a valid invoice and why an unvalidated purchase can be disallowed when you file your VAT.",
        ],
      },
      {
        id: 'late-penalties',
        heading: 'What it costs to file or pay late',
        body: [
          "The penalties are deliberately steep enough to make timeliness cheaper than the alternative. For failing to file or remit VAT, KRA applies a penalty of the greater of 5% of the tax due or KES 10,000, and late payment then attracts interest of 1% per month on the unpaid amount until it is cleared. Because the interest compounds month on month, a balance left unpaid grows quietly in the background even after the one-off penalty has been charged.",
          "The figures above are current at the time of writing, but VAT rates, thresholds and the exempt and zero-rated schedules are set by the Finance Act and can change each year. Always confirm the position for your own period against KRA before you rely on a number, especially around the June budget cycle when amendments take effect.",
        ],
      },
      {
        id: 'when-to-get-help',
        heading: 'When to bring in an accountant',
        body: [
          "Plenty of businesses register for VAT and run their monthly returns themselves. The point where it usually pays to get help is when the classification gets messy: mixed supplies that are partly standard-rated and partly exempt, large input claims sitting in a refund position, or a backlog of unvalidated invoices threatening your deductions. Those are the situations where a single mistake repeats every month until someone catches it.",
          "If you would rather have the registration decision, the monthly filing and the input-tax reconciliation handled properly from the start, tell us what your business needs and we will match you privately with up to three qualified accountants who handle VAT, free. You can also look through our [VAT service listings](/services/vat/) to see the kind of support available before you decide.",
        ],
      },
    ],
    faqs: [
      { q: 'When must I register for VAT in Kenya?', a: 'Once your taxable turnover reaches or is expected to reach KES 5 million in any twelve-month period. The test is forward-looking, so you should register before you cross the threshold if you can reasonably see sales reaching it.' },
      { q: 'What is the VAT rate in Kenya?', a: 'The standard rate is 16% on most goods and services. Some supplies are zero-rated (taxable at 0%) and others are exempt (outside VAT entirely).' },
      { q: 'What is the difference between zero-rated and exempt supplies?', a: 'Zero-rated supplies are taxable at 0%, so you can still reclaim input VAT on related costs. Exempt supplies are outside VAT, so you charge no VAT but cannot reclaim the input VAT on related costs.' },
      { q: 'When are VAT returns due in Kenya?', a: 'VAT is monthly. The return and payment are due on or before the 20th of the month after the tax period, so June VAT is due by 20 July. File a NIL return for any month with nothing to declare.' },
      { q: 'What is the penalty for filing or paying VAT late?', a: 'Failing to file or remit attracts a penalty of the greater of 5% of the tax due or KES 10,000, and late payment adds interest of 1% per month on the unpaid amount until it is cleared.' },
      { q: 'Do I have to register for VAT below KES 5 million?', a: 'No, but you can apply for voluntary registration, often to reclaim input VAT on stock and equipment. It carries the same monthly filing duty. Smaller traders may fall under Turnover Tax instead.' },
    ],
    relatedService: 'vat',
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
export const getGuide = (slug: string): Guide | undefined => GUIDE_MAP[slug];
