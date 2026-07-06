import type { Faq } from '@/data/services';

// Pillar guides (top-of-funnel SEO). Body is rendered as editorial prose with a
// jump-nav; each guide funnels to matching via the related service.

export type GuideSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
  /** Q&A rendered as an h3 question + answer paragraph (e.g. interview questions). */
  qa?: { q: string; a: string }[];
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
  draft?: boolean; // when true: 404s in prod, excluded from index + sitemap + static params
  kind?: 'hub' | 'spoke'; // hub/pillar -> /guides; spoke -> /blog. Undefined = treated as hub/pillar (/guides).
  hub?: string; // parent hub slug (spokes only), for the up-link to /guides/<hub>
};

/** Live hubs/pillars, served at /guides/<slug> (everything that is not a spoke). */
export const PUBLISHED_HUBS = (): Guide[] =>
  GUIDES.filter((g) => !g.draft && g.kind !== 'spoke');

/** Live spokes, served at /blog/<slug>. */
export const PUBLISHED_SPOKES = (): Guide[] =>
  GUIDES.filter((g) => !g.draft && g.kind === 'spoke');

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
  {
    slug: 'how-to-file-vat-return-itax-kenya',
    title: 'How to File a VAT Return on iTax in Kenya',
    metaTitle: 'How to File a VAT Return on iTax in Kenya (2026)',
    description:
      'A step-by-step walkthrough of filing the monthly VAT3 return on iTax in Kenya, the 20th deadline, filing a NIL return, paying via M-Pesa, and the late-filing penalty.',
    lead: 'Once you are VAT-registered, the return is a monthly job that runs whether or not you traded. This walks through filing the VAT3 on iTax, what to do in a month with no sales, how to pay, and the cost of missing the 20th.',
    updated: '2026-06-27',
    sections: [
      {
        id: 'before-you-file',
        heading: 'Before you start',
        body: [
          "Filing a VAT return assumes you are already registered and have the VAT obligation active on your PIN. If you are not sure whether registration even applies to your turnover, our guide to [VAT in Kenya](/guides/vat-kenya/) sets out the KES 5 million threshold and the difference between standard, zero-rated and exempt supplies before you get to filing.",
          "You file on iTax, the [Kenya Revenue Authority's online portal](https://itax.kra.go.ke), and you will need your PIN, your iTax password, and a complete record of every sale and purchase in the tax period. The return reconciles the VAT you charged on sales (output tax) against the VAT you paid on purchases (input tax), so a tidy record of both is what makes filing quick rather than painful.",
          "One thing to settle first is your input tax. From 2026, KRA validates the purchases on your return against electronic invoices, so a cost without a valid eTIMS invoice can be disallowed and stripped out of your claim. Our explainer on [how eTIMS invoicing works](/guides/etims-kenya/) covers what counts as a valid invoice, which is worth reading before you total up your input VAT.",
        ],
      },
      {
        id: 'the-steps',
        heading: 'Filing the VAT3 step by step',
        body: [
          "The return itself is the VAT3, and the flow on iTax is the same every month once you have done it once.",
        ],
        bullets: [
          'Log in to iTax with your PIN and password',
          'Open Returns, then File Return, and select the VAT obligation',
          'Download the VAT3 Excel return template that iTax provides',
          'Fill the sales schedule (output VAT) and the purchases schedule (input VAT) offline',
          'Validate the template, which zips it ready for upload',
          'Upload the zipped file back on iTax and submit',
          'Download the acknowledgement receipt and keep it for your records',
        ],
      },
      {
        id: 'nil-return',
        heading: 'Filing a NIL return when you did not trade',
        body: [
          "A registered business files every single month, even one with no sales at all. When there is nothing to declare you submit a NIL return rather than skipping the period, because the duty attaches to your registration, not to whether you traded that month. On iTax you select the same VAT obligation and choose the NIL filing option instead of uploading a full VAT3.",
          "Treating a quiet month as a free pass is the most common avoidable mistake. A missed NIL return is recorded as a failure to file, and it carries the same penalty as failing to file a return with tax due, so the safest habit is to file something every month without exception.",
        ],
      },
      {
        id: 'paying',
        heading: 'Paying what you owe',
        body: [
          "If your output VAT is higher than your input VAT for the period, the difference is payable and the deadline to pay is the same as the deadline to file: on or before the 20th of the month after the tax period. A return for June is filed and paid by 20 July.",
          "To pay, you generate a payment slip on iTax and settle it through the listed channels, including M-Pesa using KRA's Paybill number 572572, your bank, or an authorised agent. Filing on time but paying late still triggers interest, so generate and clear the payment slip in the same sitting rather than filing and coming back to it.",
        ],
      },
      {
        id: 'deadlines-penalties',
        heading: 'The deadline and what late costs you',
        body: [
          "The single date to hold onto is the 20th of the following month, which covers both filing and payment. The penalty structure behind that date is set in law under the Tax Procedures Act, alongside the wider VAT rules in the [VAT Act 2013](https://new.kenyalaw.org/akn/ke/act/2013/35/).",
          "For failing to file or remit, KRA charges the greater of 5% of the tax due or KES 10,000. Late payment then adds interest of 1% per month on the unpaid amount until it is cleared, and because that interest compounds it keeps growing quietly even after the one-off penalty has landed. For a monthly tax those costs stack up fast across a year, which is why most businesses set a fixed reminder or hand the monthly filing to an accountant.",
        ],
      },
    ],
    faqs: [
      { q: 'How do I file a VAT return in Kenya?', a: 'Log in to iTax, open Returns then File Return, select the VAT obligation, download and fill the VAT3 Excel template with your sales and purchases, validate it to create a zip file, upload and submit, then save the acknowledgement.' },
      { q: 'When is the VAT return deadline in Kenya?', a: 'The VAT3 return and any payment are due on or before the 20th of the month after the tax period. June VAT, for example, is filed and paid by 20 July.' },
      { q: 'Do I have to file VAT if I had no sales?', a: 'Yes. You file a NIL return for any month with nothing to declare. A missed NIL return counts as a failure to file and carries the same penalty.' },
      { q: 'How do I pay VAT in Kenya?', a: 'Generate a payment slip on iTax and pay it via M-Pesa using KRA Paybill 572572, through your bank, or an authorised agent, by the 20th.' },
      { q: 'What is the penalty for filing a VAT return late?', a: 'Failing to file or remit attracts the greater of 5% of the tax due or KES 10,000, and late payment adds interest of 1% per month on the unpaid amount until cleared.' },
    ],
    relatedService: 'vat',
  },
  {
    slug: 'turnover-tax-kenya',
    draft: true,
    title: 'Turnover Tax in Kenya: Who Pays, the Rate and How to File',
    metaTitle: 'Turnover Tax in Kenya: Rate, Threshold and Filing (2026)',
    description:
      'Turnover Tax in Kenya explained: the 1.5% rate on gross sales, the KES 1M to 25M threshold, who is excluded, filing by the 20th on iTax, and the penalties.',
    lead: 'Turnover Tax is the simplified regime for smaller Kenyan businesses that sit below the VAT line but above the smallest traders. It taxes your sales, not your profit, so it is quick to work out and easy to get wrong. Here is who falls under it, the rate, and how filing works.',
    updated: '2026-07-02',
    sections: [
      {
        id: 'what-is-tot',
        heading: 'What Turnover Tax is',
        body: [
          "Turnover Tax, usually shortened to TOT, is a simplified tax for small businesses that charges a flat rate on your gross sales rather than on your profit. Because it is worked out on turnover, you do not deduct costs, stock, rent or wages first; the rate applies to the money that comes in from your trade.",
          "That simplicity is the whole point of the regime. It exists so that a small trader can meet their obligation from a basic sales record instead of preparing full accounts, and it sits deliberately between the smallest informal traders and the businesses large enough to fall under [VAT and the standard company tax rules](/guides/vat-kenya/). It is a final tax on that business income, so once you have paid it for the period there is nothing further to reconcile on those sales.",
          "TOT covers business turnover only. It does not sweep in rental income, which is taxed under its own monthly regime, nor income that is management, professional or training fees, nor income that has already suffered a final withholding tax such as qualifying dividends or interest. If your income is a mix of these, only the trading turnover goes into the TOT calculation.",
        ],
      },
      {
        id: 'who-pays',
        heading: 'Who has to pay TOT',
        body: [
          "The regime is defined by turnover, and the band is narrow. You fall under TOT if your gross turnover from business is more than KES 1 million and does not exceed KES 25 million in a year, according to the [Kenya Revenue Authority's Turnover Tax guidance](https://www.kra.go.ke/individual/filing-paying/types-of-taxes/turnover-tax-tot). Below KES 1 million you are outside TOT; above KES 25 million you leave it and move onto the standard income tax and, once your taxable sales reach the registration line, VAT.",
          "Both individuals and companies can be liable, so a limited company trading within that band is not automatically on corporation tax; it can sit under TOT the same as a sole trader. The regime applies to residents only. A non-resident carrying on business in Kenya is taxed under the ordinary rules, not TOT.",
          "You can also choose to leave the regime. Under the [Income Tax (Turnover Tax) Rules](https://new.kenyalaw.org/akn/ke/act/ln/2008/5/eng@2022-12-31), a person may elect by written notice to the Commissioner not to be taxed under TOT and to be assessed under the annual income tax regime instead. That election is worth modelling with an accountant, because a business with thin margins can pay more on a percentage of gross sales than it would on its actual profit, and the standard regime lets you deduct real costs.",
        ],
        bullets: [
          'Turnover above KES 1 million and up to KES 25 million a year',
          'Open to both individuals and companies that are resident',
          'Excludes rental income, professional or management fees, and final-withholding income',
          'You can elect out in writing and be taxed on profit instead',
        ],
      },
      {
        id: 'rate',
        heading: 'The rate and how it is worked out',
        body: [
          "The current rate is 1.5% of gross sales. It has moved in recent years: it was reduced back to 1.5% with effect from 1 July 2023 after a spell at a higher figure, so any guide still quoting 3% is out of date. Always confirm the live rate against KRA before you file, because the rate and the threshold are set by the Finance Act and can be changed in the annual budget cycle.",
          "Working out what you owe is straightforward. You take the gross sales for the month, ignore your costs entirely, and apply 1.5%. On monthly sales of KES 400,000, for example, the TOT due is KES 6,000. There is no personal relief, no expense set-off and no capital allowance in this regime; the trade-off for the low headline rate is that you are taxed on the top line rather than the bottom line.",
          "This is exactly why the election out matters. A business turning over KES 20 million on wafer-thin margins can find that 1.5% of sales dwarfs what the standard regime would charge on its slim profit, while a high-margin service business often prefers the simplicity of TOT. The maths is specific to your numbers, so it is a decision to run rather than assume.",
        ],
      },
      {
        id: 'filing',
        heading: 'Filing and paying on iTax',
        body: [
          "TOT is a monthly obligation. The return and the payment are both due on or before the 20th day of the month following the tax period, so sales made in January are declared and paid by 20 February. You file through iTax, and you pay the tax due using the same channels as the rest of the KRA system, including M-Pesa via the KRA Paybill, your bank, or an authorised agent.",
          "As with the other monthly taxes, a quiet month is not a month off. If you had no sales you still file a nil return for the period rather than skipping it, because the duty is tied to your registration for the tax, not to whether you traded. Falling into the same monthly rhythm you would use for [filing a VAT return](/guides/how-to-file-vat-return-itax-kenya/) keeps the 20th from slipping.",
          "One practical point that catches people out is invoicing. Being on TOT rather than VAT does not exempt you from electronic tax invoicing; the requirement to issue invoices through the system applies to persons in business generally. [How eTIMS works](/guides/etims-kenya/) determines what a valid electronic invoice looks like, and it matters even for a small trader on the simplified regime.",
        ],
      },
      {
        id: 'penalties',
        heading: 'What late filing costs',
        body: [
          "The penalties are modest per month but they compound if ignored. Late filing of a TOT return attracts a penalty of KES 1,000 for each month the return is outstanding. Late payment of the tax adds a penalty of 5% of the tax due, and interest then runs at 1% per month on the unpaid amount until it is cleared, so a small balance left alone keeps growing quietly in the background.",
          "Because the return is monthly, a habit of letting it drift turns a small tax into a running penalty. Most traders on TOT either set a fixed reminder for the 20th or hand the monthly filing to a professional, and a tax accountant can also file the election out and model whether TOT or the standard regime leaves you better off. If you would rather not manage the monthly cycle yourself, matching with a verified [tax accountant through our directory](/services/tax-returns/) takes the deadline off your plate.",
        ],
      },
    ],
    faqs: [
      { q: 'What is the Turnover Tax rate in Kenya?', a: 'Turnover Tax is 1.5% of gross sales, applied with no deduction for costs. The rate was reduced to 1.5% with effect from 1 July 2023, so older figures such as 3% are out of date. Confirm the current rate on the KRA portal before you file.' },
      { q: 'Who has to pay Turnover Tax in Kenya?', a: 'Resident individuals and companies whose gross business turnover is more than KES 1 million and up to KES 25 million a year. Below KES 1 million you are outside TOT; above KES 25 million you move to the standard income tax rules and possibly VAT.' },
      { q: 'What income is excluded from Turnover Tax?', a: 'TOT does not apply to rental income, management, professional or training fees, or income already subject to a final withholding tax such as qualifying dividends or interest. It also does not apply to non-residents.' },
      { q: 'When is Turnover Tax filed and paid?', a: 'TOT is monthly. Both the return and the payment are due on or before the 20th of the month after the tax period, filed on iTax. You file a nil return for any month with no sales.' },
      { q: 'Can I opt out of Turnover Tax?', a: 'Yes. You can elect in writing to the Commissioner not to be taxed under TOT, which puts you on the annual income tax regime where you are taxed on profit and can deduct costs. It is worth modelling both with an accountant.' },
      { q: 'What is the penalty for filing Turnover Tax late?', a: 'Late filing attracts a penalty of KES 1,000 for each month the return is outstanding. Late payment adds 5% of the tax due, plus interest of 1% per month on the unpaid amount until cleared.' },
    ],
    relatedService: 'tax-returns',
  },
  {
    slug: 'vat-registration-threshold-kenya',
    draft: true,
    title: 'VAT Registration Threshold in Kenya: When You Must Register',
    metaTitle: 'VAT Registration Threshold in Kenya (KES 5M)',
    description:
      'The KES 5 million VAT registration threshold in Kenya explained: the forward-looking test, voluntary registration, deregistration, and what changes the day you register.',
    lead: 'Value Added Tax turns on one line in your accounts more than any other. Cross it and registration becomes compulsory, with a new set of monthly duties from day one. Here is exactly where the line sits, how the test works both ways, and when it can pay to register before you have to.',
    updated: '2026-07-03',
    sections: [
      {
        id: 'the-threshold',
        heading: 'The KES 5 million line',
        body: [
          "You must register for VAT once the value of your taxable supplies reaches or is expected to reach KES 5 million in any twelve-month period, according to the [Kenya Revenue Authority's VAT guidance](https://www.kra.go.ke/individual/filing-paying/types-of-taxes/value-added-tax). The figure is turnover, not profit, and it counts only your taxable supplies, meaning the standard-rated and zero-rated sales you make. Purely exempt supplies do not go into the count, which is why classifying your products correctly matters before you even get to the threshold question.",
          "The test is measured across a rolling twelve months rather than a calendar or accounting year. That is easy to miss: a seasonal business can breach the line on a run of good months even if the full-year figure looks comfortable, so it is the trailing twelve months you watch, not the annual return.",
        ],
        bullets: [
          'Registration is compulsory at KES 5 million of taxable supplies',
          'The count is turnover, not profit, and excludes exempt supplies',
          'The period is any rolling twelve months, not the accounting year',
        ],
      },
      {
        id: 'forward-looking',
        heading: 'Why the test looks forward as well as back',
        body: [
          "The threshold is not only backward-looking. If you can reasonably expect your taxable supplies to reach KES 5 million in the coming twelve months, you are expected to register before you breach the line rather than after. A signed contract, a large order or a clear growth trend can trigger the expectation, and KRA treats the duty as arising when the expectation is reasonable, not when the money finally lands.",
          "This is the point businesses get wrong most often. Waiting until the annual accounts confirm the breach can mean you have been trading above the line, and charging no VAT, for months you should have been registered. Any VAT you failed to charge in that window is generally still owed, which is a bill you have to find rather than one your customers covered. Watching a rolling total and registering on the expectation is what keeps that gap from opening, and it is the same discipline that runs through [VAT in Kenya](/guides/vat-kenya/) more broadly.",
        ],
      },
      {
        id: 'voluntary',
        heading: 'Registering voluntarily below the line',
        body: [
          "A business under KES 5 million can apply for voluntary registration, and some do so deliberately. The usual reason is input tax: once registered, you can reclaim the VAT you pay on stock, equipment and other business costs, which a supplier buying heavily from VAT-registered wholesalers may find worthwhile. Selling mostly to other registered businesses is another common trigger, since they can reclaim the VAT you charge, so adding it does not raise your real price to them.",
          "Voluntary registration is granted subject to KRA conditions and it carries exactly the same duties as compulsory registration. You file every month, you charge VAT on your standard-rated sales, and you must issue valid electronic invoices for the input tax to hold up, which is where [how eTIMS invoicing works](/guides/etims-kenya/) becomes part of the decision rather than a separate chore. Weigh the input tax you would recover against that ongoing compliance load before you apply, because the paperwork does not scale down just because you registered early.",
        ],
      },
      {
        id: 'after-you-register',
        heading: 'What changes the day you register',
        body: [
          "Registration is the start of a monthly obligation, not a one-off event. From the effective date you charge 16% on standard-rated supplies, file a return every month, and pay the difference between the VAT you charged and the input VAT you can reclaim. The return and payment are due on or before the 20th of the following month on iTax, and a month with no sales still needs a nil return rather than a skipped filing. The full monthly routine, including how to complete the VAT3, is set out in the walkthrough on [filing a VAT return on iTax](/guides/how-to-file-vat-return-itax-kenya/).",
          "Getting the effective date and the first return right is the part worth handing over. A verified [VAT accountant through the directory](/services/vat/) can confirm whether you have actually crossed the line, register you from the correct date, and set up compliant invoicing so your first filings do not unravel under KRA's expense validation.",
        ],
      },
      {
        id: 'deregistration',
        heading: 'Coming back off the register',
        body: [
          "Registration is not permanent. A business that stops making taxable supplies altogether must apply to deregister, and a business whose turnover has fallen below KES 5 million in a year may opt to deregister, though that one is a choice rather than an automatic switch. The legal basis for the whole regime sits in the [VAT Act 2013](https://new.kenyalaw.org/akn/ke/act/2013/35/), which is worth reading alongside the KRA guidance when a borderline case comes up.",
          "Two practical points catch people out. First, you keep filing returns until KRA confirms the deregistration, not from the day you apply, so a premature stop still counts as a missed filing. Second, KRA will not approve deregistration while you have outstanding returns or unpaid VAT, so the account has to be clean before the application goes in.",
        ],
      },
    ],
    faqs: [
      { q: 'What is the VAT registration threshold in Kenya?', a: 'You must register for VAT once your taxable supplies reach or are expected to reach KES 5 million in any twelve-month period. The count is turnover, not profit, and it excludes exempt supplies.' },
      { q: 'Is the VAT threshold based on the calendar year?', a: 'No. It is any rolling twelve-month period, not the calendar or accounting year. A seasonal run of strong months can breach the line even if the full-year figure looks lower.' },
      { q: 'Can I register for VAT voluntarily in Kenya?', a: 'Yes. A business below KES 5 million can apply for voluntary registration, often to reclaim input VAT on stock and equipment. It carries the same monthly filing duty as compulsory registration.' },
      { q: 'Do I have to register before I cross the threshold?', a: 'If you can reasonably expect taxable supplies to reach KES 5 million in the coming twelve months, you are expected to register before you breach the line, not after. VAT you failed to charge while above the line is generally still owed.' },
      { q: 'How do I deregister from VAT in Kenya?', a: 'Apply to KRA. You must if you have stopped making taxable supplies, and you may if turnover has fallen below KES 5 million in a year. Keep filing until KRA confirms it, and clear all outstanding returns and VAT first.' },
    ],
    relatedService: 'vat',
  },
  {
    slug: 'corporation-tax-in-kenya',
    draft: true,
    title: 'Corporation Tax in Kenya: The Rate, Who Pays and What Is Taxed',
    metaTitle: 'Corporation Tax in Kenya: Rate and Scope (2026)',
    description:
      'Corporation tax in Kenya explained: the 30% resident company rate, how branches and non-residents are taxed, what counts as taxable profit, and the filing deadline.',
    lead: 'Corporation tax is the tax a company pays on its profits, and for most Kenyan companies the headline rate is settled. What trips businesses up is the detail around it: residence, how branches are treated, and what actually counts as taxable profit once the accounts are adjusted. Here is how it works.',
    updated: '2026-07-03',
    sections: [
      {
        id: 'the-rate',
        heading: 'The resident company rate',
        body: [
          "A resident company in Kenya is taxed on its profits at 30%, the standard corporation tax rate confirmed on the [Kenya Revenue Authority's company tax pages](https://www.kra.go.ke/business/companies-partnerships/companies-partnerships-pin-taxes). The rate applies to the taxable profit for the year of income, which is the accounting profit adjusted for tax purposes rather than the raw figure at the bottom of your profit and loss account. Rates are set by the annual Finance Act and can change, so confirm the live figure against KRA before you rely on it for a return.",
          "Corporation tax sits apart from the other taxes a company handles. It is charged on profit, whereas VAT is charged on turnover and PAYE is deducted from staff wages, so a company can owe all three at once for entirely different reasons. A small trader below the VAT line can still owe corporation tax on its profit, and a loss-making company can still owe VAT on its sales.",
        ],
      },
      {
        id: 'residence',
        heading: 'When a company is resident',
        body: [
          "Residence decides which rules apply. A company is resident in Kenya if it is incorporated under Kenyan law, or if the management and control of its affairs are exercised in Kenya in a given year of income. Incorporation abroad does not put a company outside Kenyan tax if the real decision-making happens in Nairobi, which is a point group structures need to think through carefully.",
          "A resident company is taxed on its worldwide business income, subject to relief for foreign tax already paid, while a non-resident is taxed only on the income attributable to its Kenyan activity. That distinction is why residence is settled first and the rate second, because the two answers together decide what actually falls into the Kenyan tax net.",
        ],
      },
      {
        id: 'branches-non-residents',
        heading: 'Branches and non-resident companies',
        body: [
          "A non-resident company trading in Kenya through a branch or permanent establishment is taxed at 30% on the profits attributable to that Kenyan presence, the same headline rate as a resident company, as summarised in the [PwC Kenya tax overview](https://taxsummaries.pwc.com/kenya/corporate/taxes-on-corporate-income). The older gap between the branch rate and the resident rate has closed, so the choice between a branch and a locally incorporated subsidiary now turns more on liability, repatriation and administration than on a raw rate difference.",
          "Non-residents that supply services into Kenya over the internet or an electronic network may instead fall under the Significant Economic Presence tax, which replaced the Digital Service Tax and runs on a deemed-profit basis rather than the 30% company rate. If a foreign group is weighing how to structure a Kenyan operation, that is exactly the kind of question a verified [company tax accountant through the directory](/services/tax-returns/) is there to model before anything is registered.",
        ],
      },
      {
        id: 'taxable-profit',
        heading: 'What counts as taxable profit',
        body: [
          "Taxable profit is not the same as accounting profit. You start from the profit in your accounts, then add back expenses the law does not allow, such as fines, private costs and general provisions, and you claim capital allowances in place of the depreciation you charged in the books. The result is the figure the 30% actually applies to, which is why two companies with identical accounting profit can owe different tax.",
          "The adjustment that increasingly matters is expense validation. From 2026 KRA cross-checks the costs on a company return against electronic invoices, so a genuine expense without a valid record can be disallowed and pushed back into taxable profit. Keeping every purchase backed by a compliant invoice is now part of protecting the rate, which is where [how eTIMS invoicing works](/guides/etims-kenya/) feeds straight into your corporation tax bill.",
        ],
      },
      {
        id: 'filing',
        heading: 'Filing and paying company tax',
        body: [
          "A company files an annual income tax return on iTax, and the balance of tax for the year is due by the end of the sixth month after the accounting year-end. For a December year-end that means the return and any balance are due by 30 June. The tax itself is not left entirely to year-end, though: profitable companies pay in advance during the year through instalment tax, and the annual return then reconciles what has already been paid against the final liability.",
          "A company registered for VAT also runs that monthly cycle in parallel, which is a different tax on a different base with its own deadline. The overlap between the annual company return and the monthly [VAT obligation](/guides/vat-kenya/) is where a lot of small companies lose track, so mapping every deadline for your own year-end at the start of the year is time well spent.",
        ],
      },
    ],
    faqs: [
      { q: 'What is the corporation tax rate in Kenya?', a: 'Resident companies are taxed on their profits at 30%. Rates are set by the Finance Act and can change, so confirm the current figure on the KRA portal before you file.' },
      { q: 'How much tax do branches of foreign companies pay in Kenya?', a: 'A non-resident company trading through a Kenyan branch or permanent establishment is taxed at 30% on the profits attributable to that Kenyan presence, the same headline rate as a resident company.' },
      { q: 'When is a company resident in Kenya for tax?', a: 'A company is resident if it is incorporated under Kenyan law, or if the management and control of its affairs are exercised in Kenya in a given year of income.' },
      { q: 'Is corporation tax charged on turnover or profit?', a: 'On profit. Corporation tax applies to taxable profit, which is accounting profit adjusted for tax, including adding back disallowed expenses and claiming capital allowances in place of depreciation.' },
      { q: 'When is the company tax return due in Kenya?', a: 'The annual income tax return and the balance of tax are due by the end of the sixth month after the accounting year-end, so 30 June for a December year-end. Profitable companies also pay instalment tax during the year.' },
    ],
    relatedService: 'tax-returns',
  },
  {
    slug: 'instalment-tax-in-kenya',
    draft: true,
    title: 'Instalment Tax in Kenya: Who Pays, the Quarters and How to Estimate',
    metaTitle: 'Instalment Tax in Kenya: Dates and Rules (2026)',
    description:
      'Instalment tax in Kenya explained: the KES 40,000 threshold, the 110% prior-year and current-year methods, the four quarterly dates, the agricultural schedule, and the balance of tax.',
    lead: 'Instalment tax is how Kenya collects income tax during the year rather than all at once at the end of it. If your tax bill is large enough, KRA expects payments on account across four quarters. Here is who it applies to, how to work out each instalment, and the dates you cannot let slip.',
    updated: '2026-07-03',
    sections: [
      {
        id: 'what-it-is',
        heading: 'What instalment tax is',
        body: [
          "Instalment tax is not a separate tax. It is income tax paid in advance, in stages, during the year of income, and then reconciled against your final liability when you file the annual return. The idea is to spread the burden and give KRA a steadier flow of revenue rather than a single year-end lump, so the money you pay in instalments is simply your own income tax settled early.",
          "It applies to both individuals and companies with income that is not already taxed at source. Someone whose income is entirely PAYE has their tax deducted every month by their employer, so instalment tax rarely bites them. It is the business owner, landlord on the standard regime, or company with trading profit who has to pay it, because nobody is withholding their tax for them along the way.",
        ],
      },
      {
        id: 'who-pays',
        heading: 'Who has to pay it',
        body: [
          "For an individual, instalment tax applies once your tax liability for the year is expected to exceed KES 40,000 after accounting for any PAYE and withholding tax already deducted, as set out in the [Kenya Revenue Authority's instalment tax guidance](https://www.kra.go.ke/individual/filing-paying/types-of-taxes/installment-tax). Below that, you settle the whole bill with your annual return instead. Companies with a corporation tax liability generally fall within the system regardless of that individual threshold.",
          "There is one clear exclusion worth stating plainly. Businesses on the simplified Turnover Tax regime do not pay instalment tax, because it already collects a flat percentage of sales every month, so layering instalments on top would double up. That regime is the small-trader alternative to registering for a turnover-based tax like [VAT in Kenya](/guides/vat-kenya/), and if you sit under it this obligation is not yours; if you are on the standard income tax rules, it usually is.",
        ],
        bullets: [
          'Individuals: applies when the tax due exceeds KES 40,000 after PAYE and withholding',
          'Companies: generally within the system where corporation tax is due',
          'Turnover Tax payers are excluded, since TOT already collects monthly',
        ],
      },
      {
        id: 'estimating',
        heading: 'The two ways to estimate',
        body: [
          "You do not wait for the final figure to pay instalment tax; you estimate. KRA allows two methods, and you pick whichever fits. The prior-year basis takes the tax you paid last year and multiplies it by 110%, then spreads that across the instalments. It is the safe default for an established business with steady results, because it removes the guesswork and protects you from underpayment penalties as long as the previous year was a normal one.",
          "The current-year basis lets you estimate this year's profit and calculate the tax on it directly. That suits a new business with no prior-year figure, or one whose results are swinging up or down sharply, where 110% of last year would be badly wrong in either direction. The trade-off is that if you lowball a current-year estimate, KRA can charge a penalty on the shortfall, so the current-year route rewards a realistic forecast and punishes an optimistic one.",
        ],
      },
      {
        id: 'the-dates',
        heading: 'The four quarterly dates',
        body: [
          "For most taxpayers the year's instalment tax is split into four equal payments of 25% each, due on the 20th day of the fourth, sixth, ninth and twelfth months of the year of income. For a business on a standard January-to-December year, that lands on 20 April, 20 June, 20 September and 20 December. You pay each one on iTax, generating a payment slip and settling it the same way you would any other KRA liability.",
          "Farmers get a different rhythm. The agricultural sector pays 75% of the instalment tax in the ninth month and the remaining 25% in the twelfth, which fits the seasonal pattern of income arriving around harvest rather than evenly across the year. The mechanics of generating and paying the slip on iTax are the same as for [filing a VAT return](/guides/how-to-file-vat-return-itax-kenya/), even though the tax and the schedule are different.",
        ],
      },
      {
        id: 'balance-and-penalties',
        heading: 'The balance of tax and getting it wrong',
        body: [
          "Instalments are payments on account, not the final word. When you file the annual return, the total instalment tax you paid is set against your actual liability for the year. If you underpaid, you clear the balance of tax, which is due by the end of the fourth month after your year-end, so 30 April for a December year-end. If you overpaid, the excess sits as a credit you can carry forward or reclaim. The wider rules live in the Income Tax Act, available in full on [Kenya Law](https://new.kenyalaw.org/akn/ke/act/1973/16/).",
          "Underpaying instalments has a cost beyond the balance itself. KRA can charge a penalty where the instalments paid fall short of what was properly due, on top of interest on the late amount, which is why a careless estimate is more expensive than a careful one. A verified [tax accountant through the directory](/services/tax-returns/) can pick the right estimation method for your position and keep the four dates from slipping, which for a growing business is usually cheaper than the penalties for guessing.",
        ],
      },
    ],
    faqs: [
      { q: 'What is instalment tax in Kenya?', a: 'It is income tax paid in advance during the year of income, in stages, then reconciled against your final liability when you file the annual return. It is not a separate tax, just your own income tax paid early.' },
      { q: 'Who has to pay instalment tax?', a: 'Individuals whose tax due for the year is expected to exceed KES 40,000 after PAYE and withholding, and companies with a corporation tax liability. Turnover Tax payers are excluded because TOT already collects monthly.' },
      { q: 'How is instalment tax calculated in Kenya?', a: 'By one of two methods: the prior-year basis, which is 110% of last year’s tax spread across the instalments, or the current-year basis, where you estimate this year’s profit and calculate the tax directly. New or volatile businesses usually use the current-year basis.' },
      { q: 'When is instalment tax due in Kenya?', a: 'For most taxpayers it is four equal payments of 25%, due on the 20th of the fourth, sixth, ninth and twelfth months of the year of income, so 20 April, 20 June, 20 September and 20 December for a calendar year. Agriculture pays 75% in the ninth month and 25% in the twelfth.' },
      { q: 'What is the balance of tax?', a: 'It is the difference between your final annual liability and the instalment tax you already paid. It is due by the end of the fourth month after your year-end, so 30 April for a December year-end. Overpayments carry forward as a credit.' },
    ],
    relatedService: 'tax-returns',
  },
  {
    slug: 'paye-employer-obligations-kenya',
    draft: true,
    title: 'PAYE Employer Obligations in Kenya: Deducting, Remitting and Filing',
    metaTitle: 'PAYE Employer Obligations in Kenya (2026)',
    description:
      'What Kenyan employers must do for PAYE: register, deduct tax from wages, remit by the 9th, file the P10, issue P9A forms, and avoid the 25% failure-to-deduct penalty.',
    lead: 'PAYE puts the responsibility for an employee’s income tax on the employer. You deduct it from wages, you remit it, and you file for it, all on a tight monthly clock. Getting this wrong is one of the fastest ways for a Kenyan business to run up penalties, so here is what the duty actually involves.',
    updated: '2026-07-03',
    sections: [
      {
        id: 'the-duty',
        heading: 'The employer sits in the middle',
        body: [
          "Pay As You Earn is the system for collecting income tax from employment income, and the law places the mechanics on the employer rather than the worker. You calculate the tax due on each employee’s pay, deduct it before you hand over their net wage, and remit what you deducted to KRA. In effect you are collecting the government’s tax and passing it on, which is why the penalties for getting it wrong fall on you, not on the employee.",
          "The employer side of that duty is registering, deducting, remitting and filing. If what you want is to see how a given salary breaks down into tax, statutory deductions and take-home, that is a different calculation, and the [Kenya PAYE calculator](https://payecalculator.co.ke) works through an employee’s net pay band by band rather than repeating it here.",
        ],
      },
      {
        id: 'register',
        heading: 'Registering as an employer',
        body: [
          "Before you run a single payroll you register for a PAYE obligation on your KRA PIN. Any business that pays emoluments has to do this, whether it is a limited company with fifty staff or a sole proprietor with one employee, because the duty attaches to the act of paying wages, not to the size of the payroll.",
          "Registration adds PAYE to the obligations already on your PIN, sitting alongside things like [VAT](/guides/vat-kenya/) if you are registered for it. Each obligation has its own return and its own deadline, so an employer that is also VAT-registered is running two separate monthly cycles that happen to share the same portal.",
        ],
      },
      {
        id: 'deduct',
        heading: 'Deducting the right amount',
        body: [
          "Each month you work out the PAYE on every employee’s taxable pay using the graduated bands, apply the personal relief every resident employee is entitled to, and deduct the result from their gross before paying them. Taxable pay is not just the basic salary; it includes most cash allowances and the value of many non-cash benefits, so the calculation starts from a wider figure than the headline salary.",
          "Getting the taxable figure right also means accounting for the deductions that reduce it, such as allowable pension contributions and the statutory deductions that now come off taxable income. This is where payroll errors cluster, because a wrong taxable base flows straight into a wrong deduction, and KRA reconciles what you filed against what you paid. Every expense and benefit you record should be backed by proper documentation, which is part of why [eTIMS invoicing](/guides/etims-kenya/) discipline reaches into payroll as well as your other costs.",
        ],
      },
      {
        id: 'remit-file',
        heading: 'Remitting and filing by the 9th',
        body: [
          "The deadline that governs PAYE is the 9th of the following month, and it covers both jobs at once. You remit the PAYE you deducted, and you file the monthly PAYE return, the P10, on iTax on or before the 9th, as the [Kenya Revenue Authority's PAYE guidance](https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye) confirms. Miss it and you have missed a filing as well as a payment, so the safest habit is to run payroll early enough that the return and the remittance are both done well before the date.",
          "The 9th is deliberately tighter than the 20th that governs VAT and several other taxes, which trips up employers who assume every KRA deadline lands mid-month. If you are also handling those monthly taxes, treat PAYE as the earlier of the two clocks so it is never the one you forget.",
        ],
      },
      {
        id: 'annual-penalties',
        heading: 'Annual returns and the cost of slipping',
        body: [
          "On top of the monthly cycle there is an annual layer. You issue each employee a P9A form, the record of their pay and tax for the year, by the end of January so they can file their own individual return. Your P10 returns across the year should reconcile with those P9A figures, and a mismatch is one of the first things KRA looks at, so tidy monthly filing is what makes the year-end painless.",
          "The penalties make timeliness the cheaper option. Failing to deduct or account for PAYE attracts a penalty of 25% of the tax involved or KES 10,000, whichever is higher, and late payment then adds interest on the unpaid amount until it is cleared. Because the duty repeats every month, a habit of slipping turns a manageable payroll into a running liability, which is why many employers hand the monthly cycle to a verified [payroll accountant through the directory](/services/payroll/) rather than carry the risk in-house.",
        ],
      },
    ],
    faqs: [
      { q: 'What are an employer’s PAYE obligations in Kenya?', a: 'Register for a PAYE obligation on your KRA PIN, deduct the correct tax from each employee’s pay, remit it to KRA, file the monthly P10 return by the 9th, and issue P9A forms to employees by the end of January.' },
      { q: 'When must an employer remit PAYE in Kenya?', a: 'PAYE is remitted and the P10 return filed on iTax on or before the 9th of the following month. That is tighter than the 20th that governs VAT, so it is easy to miss if you assume every deadline is mid-month.' },
      { q: 'What is the penalty for not deducting or remitting PAYE?', a: 'Failing to deduct or account for PAYE attracts a penalty of 25% of the tax involved or KES 10,000, whichever is higher, plus interest on the unpaid amount until it is cleared.' },
      { q: 'What is a P9A form?', a: 'It is the annual record of an employee’s pay and PAYE for the year, which the employer must issue to each employee by the end of January so they can file their own individual income tax return.' },
      { q: 'Does an employer calculate the employee’s take-home pay?', a: 'The employer deducts PAYE and statutory deductions and pays the net wage, but the band-by-band take-home breakdown is a separate calculation. A dedicated PAYE calculator works through an employee’s net pay rather than the employer’s filing duty.' },
    ],
    relatedService: 'payroll',
  },

  // ----- GROUP B: Careers (jobs-board pivot). All draft until published. -----
  // These funnel to the live /jobs board, not /match. Facts verified against
  // KASNEB, ICPAK and ACCA at write time. No invented salary figures.
  {
    slug: 'accounting-jobs-in-kenya',
    draft: false,
    kind: 'hub',
    title: 'Accounting Jobs in Kenya: How to Find and Land Them',
    metaTitle: 'Accounting Jobs in Kenya: How to Find and Land Them',
    description:
      'How to find accounting jobs in Kenya and actually get hired: where roles are advertised, what employers screen for, and how to move from applying to an offer.',
    lead: 'The accounting job market in Kenya rewards people who apply in the right places, in the right way, and with the right proof on the page. Here is how the market is structured, where the roles sit, and what it takes to move from an application to an offer.',
    updated: '2026-07-06',
    sections: [
      {
        id: 'the-market',
        heading: 'How the market is shaped',
        body: [
          'Accounting sits inside almost every organisation in Kenya, so demand is spread widely rather than concentrated in one sector. Audit and advisory firms hire in cohorts, industry finance teams hire as they grow, and the public sector, SACCOs, NGOs and county governments all run their own finance functions. That breadth is why an accounting qualification travels: the same core skills open doors in banking, manufacturing, retail, development work and practice.',
          'Roles cluster into a few families. Practice work covers audit, tax and advisory inside firms, from the Big Four down to mid-tier and small local firms. Industry work covers the finance team of a business that is not itself an accounting firm, running the books, the reporting and the controls. Public and not-for-profit finance covers government bodies, SACCOs and NGOs, each with its own compliance rhythm. Knowing which family a role belongs to tells you what the day actually looks like, and browsing the live roles on the [Kenyan accounting job board](/jobs) is the quickest way to see how each one is advertised.',
        ],
      },
      {
        id: 'qualifications',
        heading: 'What employers expect on paper',
        body: [
          'The dominant local qualification is the Certified Public Accountant credential examined by the [Kenya Accountants and Secretaries National Examinations Board](https://www.kasneb.or.ke/cpa), sat over Foundation, Intermediate and Advanced levels. Many listings ask for CPA completion, some for CPA in progress, and senior roles increasingly ask for full membership of the [Institute of Certified Public Accountants of Kenya](https://www.icpak.com/member-categories/) alongside years of experience. How far along the [route to becoming an accountant in Kenya](/guides/how-to-become-an-accountant-in-kenya) you need to be depends on the role, and junior positions are open well before the final papers.',
          'A degree in commerce, finance or a related field is common but not universal; plenty of qualified accountants came through a diploma and CPA rather than a bachelor degree. What employers screen hardest is the match between the level you are at and the level the role sits at. An entry-level listing that asks for CPA Foundation and a year of exposure is a different filter from a financial-controller listing that asks for CPA(K) membership and five years, and applying up two rungs rarely works.',
        ],
      },
      {
        id: 'where-to-look',
        heading: 'Where the roles are actually advertised',
        body: [
          'Kenyan accounting vacancies surface across general job boards, recruiter shortlists, firm career pages and professional networks, and the same role can appear in several of these at once. Relying on a single channel is the most common reason a strong candidate misses roles that would have suited them, so it pays to watch a spread rather than one site.',
          'A focused board that only carries accounting, audit, tax and finance roles cuts the noise that comes with general listings. Browsing and filtering the [accounting and finance roles on our jobs board](/jobs) lets you see the live market by function and seniority in one place, and applying through it keeps your application inside the pipeline rather than lost in a generic inbox.',
        ],
        bullets: [
          'Dedicated accounting and finance job boards, filtered by function and level',
          'Firm career pages, especially for graduate and audit-associate intakes',
          'Recruitment agencies that place finance staff',
          'Professional networks where recruiters source passively',
        ],
      },
      {
        id: 'get-shortlisted',
        heading: 'Getting past the first screen',
        body: [
          'Most applications are filtered before a human reads them closely, so the first job of your documents is to survive that screen. A tuned, results-led [accounting CV in Kenya](/blog/accounting-cv-kenya) that mirrors the language of the listing does more work here than any covering note, which is why it is worth building the document carefully rather than sending one generic version everywhere.',
          'If you are early in your career, the barrier is usually experience rather than qualification, and the way through is to target roles pitched at your level, the tactics for [breaking into entry-level accounting jobs in Kenya](/blog/entry-level-accounting-jobs-kenya), and making transferable exposure legible.',
        ],
      },
      {
        id: 'interview-offer',
        heading: 'From interview to offer',
        body: [
          'Once you are shortlisted, the interview tests two things: whether you can do the technical work and whether you will be steady doing it. Kenyan accounting interviews lean on the fundamentals, on KRA compliance, on how you handle a reconciliation that will not balance, and on judgement questions that have no clean answer. Working through the common [accounting interview questions in Kenya](/blog/accounting-interview-questions-kenya) and preparing real, structured responses ahead of time is what separates a nervous candidate from a hireable one.',
          'On salary, be led by the market rather than a guess. Ranges advertised on live job listings are the honest reference point, and they move with sector, seniority and location, so quote the band the current roles are showing rather than a fixed number. When an offer comes, weighing it against what comparable roles on the [live jobs board](/jobs) are advertising keeps the negotiation grounded in evidence.',
        ],
      },
    ],
    faqs: [
      { q: 'What qualifications do I need for accounting jobs in Kenya?', a: 'Most roles expect the CPA qualification examined by KASNEB, either completed or in progress depending on the level. Senior roles often ask for ICPAK membership and several years of experience. A commerce or finance degree is common but not universal.' },
      { q: 'Where are accounting jobs in Kenya advertised?', a: 'Across general job boards, dedicated accounting and finance boards, recruitment agencies, firm career pages and professional networks. The same role often appears in several places, so watch a spread of channels rather than one.' },
      { q: 'Can I get an accounting job in Kenya without full CPA?', a: 'Yes, for entry-level and support roles that ask for CPA in progress rather than completion. The barrier early on is usually experience, so target roles pitched at your level and make transferable exposure clear.' },
      { q: 'How much do accountants earn in Kenya?', a: 'Pay varies with sector, seniority and location. The honest reference is the range advertised on live job listings for the specific role and level, rather than a single figure, so check current listings for the band employers are actually offering.' },
      { q: 'How do I stand out when applying?', a: 'Tune your CV to each listing, prepare structured answers to the common technical and judgement questions, and apply through a focused pipeline so your application is not lost in a generic inbox.' },
    ],
  },
  {
    slug: 'how-to-become-an-accountant-in-kenya',
    draft: false,
    kind: 'hub',
    title: 'How to Become an Accountant in Kenya: CPA, KASNEB & ICPAK',
    metaTitle: 'How to Become an Accountant in Kenya: CPA, KASNEB & ICPAK',
    description:
      'The route to becoming an accountant in Kenya: the KASNEB CPA levels and papers, the entry grade, ICPAK membership and the practising certificate, and where ACCA fits.',
    lead: 'Becoming an accountant in Kenya runs along a well-marked path: qualify through KASNEB, gain experience, and join ICPAK. Here is exactly how the CPA route works, what each step demands, and how the alternatives such as ACCA fit alongside it.',
    updated: '2026-07-06',
    sections: [
      {
        id: 'the-route',
        heading: 'The route in outline',
        body: [
          'The standard path to becoming an accountant in Kenya has three stages: pass the professional examinations, build practical experience, and register with the professional body. The examinations are set by the Kenya Accountants and Secretaries National Examinations Board, known as KASNEB, and the leading qualification is the Certified Public Accountant credential. Membership of the Institute of Certified Public Accountants of Kenya, ICPAK, is what lets you use the CPA(K) designation and, in time, practise publicly.',
          'None of these stages is skippable if you want to work as a recognised accountant, but they do not all have to happen in a strict order. Many people begin working in a finance role while still sitting KASNEB papers, which is often the fastest way to accumulate the experience that both employers and ICPAK will later ask for. Watching the [entry-level accounting roles on the jobs board](/jobs) while you study is a practical way to line up that experience early.',
        ],
      },
      {
        id: 'cpa-levels',
        heading: 'The CPA qualification: levels and papers',
        body: [
          'Under the revised KASNEB syllabus, the [CPA course in Kenya](/blog/cpa-course-kenya) is examined across three levels: Foundation, Intermediate and Advanced. The Foundation level covers six papers including Financial Accounting, Communication Skills, Introduction to Law and Governance, Economics, Quantitative Analysis, and Information Communication Technology. The Intermediate level covers a further six, including Company Law, Financial Management, Financial Reporting and Analysis, Auditing and Assurance, Management Accounting, and Public Finance and Taxation.',
          'The Advanced level moves into higher-level papers such as Leadership and Management, Advanced Financial Reporting and Analysis, and Advanced Financial Management, together with a specialisation choice and required ethics and work-simulation elements. Because the syllabus has been revised, the exact paper list at the Advanced level and any transition rules are worth confirming against KASNEB before you register.',
        ],
        bullets: [
          'Foundation level: six papers, the accounting and business fundamentals',
          'Intermediate level: six papers, reporting, audit, management accounting and tax',
          'Advanced level: higher-level papers plus a specialisation and ethics and work-simulation elements',
        ],
      },
      {
        id: 'entry-exams',
        heading: 'Who qualifies and how the exams run',
        body: [
          'The minimum entry requirement for the CPA course is a KCSE mean grade of C+, and holders of relevant diplomas or degrees can register too, with degree holders in accounting often eligible for exemptions from parts of the Foundation level. Confirm your own exemption position with KASNEB, since it depends on the exact qualification you hold.',
          'KASNEB professional examinations are held three times a year, in April, August and December, which gives candidates several attempts within a single year and lets a focused student move through the levels quickly. You register with KASNEB, book the papers you are ready to sit, and pay the exam fees per paper, with the current fee schedule published on the KASNEB portal.',
        ],
      },
      {
        id: 'icpak',
        heading: 'Joining ICPAK and practising',
        body: [
          'Passing the CPA examinations makes you a qualified accountant, but using the CPA(K) designation and being recognised professionally means registering with ICPAK, the [statutory body established under the Accountants Act to regulate the profession](https://www.icpak.com/member-categories/). Fresh graduates typically enter as associate members, then move to full membership once they have accumulated the required years of practical experience.',
          'Offering audit and accountancy services to the public is a further step again, gated behind a practising certificate that ICPAK issues only to full members with additional supervised experience and up-to-date professional development. If your goal is to run your own practice rather than work in industry, that certificate is the milestone that matters.',
        ],
      },
      {
        id: 'acca-alternative',
        heading: 'Where ACCA and other routes fit',
        body: [
          'CPA is not the only qualification recognised in Kenya. The [ACCA qualification](https://www.accaglobal.com/gb/en/qualifications/glance/acca/overview.html) offered by the UK-based Association of Chartered Certified Accountants is widely respected, particularly for roles with an international or multinational dimension, and it combines a series of exams with an ethics module and three years of practical experience to reach membership. Some Kenyan accountants hold both CPA and ACCA.',
          'For most people building a career in Kenya, CPA is the natural spine because it is examined locally, is cheaper, and maps directly onto ICPAK membership and Kenyan tax and regulatory practice. ACCA is the stronger add-on where global mobility matters. Whichever route you take, the qualification only converts into a career when you pair it with real roles, so treat [finding accounting jobs in Kenya](/guides/accounting-jobs-in-kenya) as part of the plan rather than something you do only at the end.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I become an accountant in Kenya?', a: 'Pass the KASNEB CPA examinations across the Foundation, Intermediate and Advanced levels, build practical experience, and register with ICPAK. ICPAK membership lets you use the CPA(K) designation, and a practising certificate is needed to offer services to the public.' },
      { q: 'What is the entry requirement for CPA in Kenya?', a: 'A KCSE mean grade of C+ is the minimum for the CPA course. Holders of relevant diplomas or degrees can also register, and accounting degree holders may qualify for exemptions from parts of the Foundation level. Confirm your exemptions with KASNEB.' },
      { q: 'How many CPA papers are there?', a: 'Under the revised KASNEB syllabus the CPA course runs across three levels, with six papers each at Foundation and Intermediate and a set of higher-level and specialisation papers plus ethics and work-simulation elements at Advanced. Confirm the current paper list with KASNEB.' },
      { q: 'When are KASNEB CPA exams held?', a: 'KASNEB professional examinations are held three times a year, in April, August and December, so candidates can sit papers several times within a single year.' },
      { q: 'Is ACCA recognised in Kenya?', a: 'Yes. The ACCA qualification is recognised and respected in Kenya, especially for international roles, and combines exams, an ethics module and three years of experience. CPA remains the natural local route because it is examined in Kenya and maps directly onto ICPAK membership.' },
    ],
  },
  {
    slug: 'accounting-interview-questions-kenya',
    draft: false,
    kind: 'spoke',
    hub: 'accounting-jobs-in-kenya',
    title: 'Top 15 Accounting Interview Questions in Kenya (With Answers)',
    metaTitle: 'Top 15 Accounting Interview Questions in Kenya (With Answers)',
    description:
      'The 15 accounting interview questions Kenyan employers actually ask, from the opener and technical and KRA-compliance questions to competency and judgement ones, each numbered with how to answer it.',
    lead: 'An accounting interview in Kenya tests whether you can do the technical work and whether you will be steady doing it. Below are the 15 questions employers actually ask, numbered and grouped by what they are probing, each with the answer an interviewer is listening for.',
    updated: '2026-07-06',
    sections: [
      {
        id: 'how-they-assess',
        heading: 'What the interview is really testing',
        body: [
          'A Kenyan accounting interview usually has three layers running at once: can you handle the core accounting, do you understand local compliance, and will you exercise sound judgement when something is unclear. Employers rarely announce which layer a question belongs to, so part of interviewing well is hearing what a question is actually probing and answering that, not the surface of it.',
          'This matters most for candidates coming straight out of the [KASNEB CPA examinations](https://www.kasneb.or.ke/cpa), where the instinct is to recite the syllabus. Interviewers want the syllabus applied to a messy situation, not repeated back. If you are still working towards the qualification, the study route is set out in the guide to [becoming an accountant in Kenya](/guides/how-to-become-an-accountant-in-kenya), but the interview is where you show you can use it. The 15 questions below are numbered in roughly the order they tend to come up.',
        ],
      },
      {
        id: 'opening',
        heading: 'The opening question',
        body: [
          'Almost every accounting interview in Kenya starts here, and it is where many candidates waste their strongest minute rambling through the whole CV. Treat it as a chance to frame the story the rest of the interview will follow.',
        ],
        qa: [
          { q: '1. Tell me about yourself and your experience as an accountant.', a: 'Give a tight sixty-second pitch: your qualification, whether a CPA stage or a B.Com, where you have worked and what you handled there, one strength backed by a result, and what you are looking for now. Point it at the role in front of you rather than reciting your CV top to bottom, and stop cleanly instead of trailing off.' },
        ],
      },
      {
        id: 'technical',
        heading: 'Technical questions and how to answer them',
        body: [
          'Technical questions establish that the fundamentals are solid, and the strongest answers follow a shape: state the principle, show the steps, then name the check that confirms it. If you are asked about an area you have only studied, say so and reason from principle rather than bluffing, because interviewers in accounting are alert to a candidate who hides uncertainty. These are the ones that come up most.',
        ],
        qa: [
          { q: '2. What is the difference between accruals and cash accounting?', a: 'Accruals accounting records income when it is earned and costs when they are incurred, no matter when cash moves; cash accounting records them only when money changes hands. Add an example: a sale invoiced in June but paid in July is June income under accruals, and Kenyan financial statements are prepared on the accruals basis.' },
          { q: '3. Walk me through how a sale reaches the financial statements.', a: 'Start at the invoice, then the journal entry debiting the customer and crediting sales and output VAT, through the sales and general ledgers to the trial balance, and finally into the income statement as revenue and the balance sheet as a receivable until it is settled. Naming each stage shows you understand the flow, not just the endpoints.' },
          { q: '4. A bank reconciliation will not balance. How would you find the difference?', a: 'Tick off the matched items first, then hunt the usual culprits: unpresented cheques, bank charges or standing orders not yet in the cashbook, a transposition error, or an entry made twice or with the wrong sign. The proof is that the adjusted cashbook balance and the adjusted bank statement balance finally agree.' },
          { q: '5. What is the difference between depreciation and a provision for doubtful debts?', a: 'Depreciation spreads the cost of a fixed asset over its useful life; a provision for doubtful debts writes receivables down to what you realistically expect to collect. Both are non-cash adjustments, but one consumes an asset over time and the other reflects whether a debt is recoverable.' },
          { q: '6. Which accounting software have you used, and how proficient are you?', a: 'Name the packages you have actually worked in, from QuickBooks and Sage on smaller books to SAP or another ERP in larger finance teams, and be honest about your level in each. Tie it to a real task you performed, such as running a month-end in the system or reconciling a ledger, and mention comfort with KRA iTax and eTIMS, since day-to-day Kenyan work runs through both.' },
        ],
      },
      {
        id: 'compliance',
        heading: 'The KRA and compliance questions',
        body: [
          'Because so much of Kenyan accounting is compliance work, expect questions rooted in the local tax system. You are not expected to quote every figure from memory, but you are expected to know how it fits together and where to confirm a rate against the [Kenya Revenue Authority](https://www.kra.go.ke/). Answer each by showing you understand the shape of the obligation and its deadline, then say you would confirm the current rate before relying on it.',
        ],
        qa: [
          { q: '7. When are VAT returns due?', a: 'A VAT return and payment are due by the 20th of the month following the tax period, and a nil return is still required for a month with no activity. Mentioning the nil-return point shows you understand the deadline discipline, not just the date.' },
          { q: '8. What PAYE obligations does an employer have?', a: 'Register for PAYE, deduct tax from each employee monthly, and remit it to the KRA by the 9th of the following month along with the statutory deductions, then file the annual reconciliation. Showing you know it is a monthly remittance with an annual return behind it is what the question tests.' },
          { q: '9. What is withholding tax and when do you deduct it?', a: 'Withholding tax is deducted at source on specified payments such as professional or consultancy fees, rent, dividends, interest and royalties, then remitted to the KRA by the 20th of the following month with a withholding certificate issued to the payee. Say that the rate depends on the payment type and whether the recipient is resident, and that you would confirm the current rate before applying it.' },
          { q: '10. How is rental income taxed?', a: 'Residential rental income is taxed under Monthly Rental Income, a final tax on gross rent filed monthly, unless the landlord elects the annual regime to claim expenses. You need not state the exact percentage under pressure, but you should know it is a monthly, final, gross-basis tax with an election available.' },
          { q: '11. What is eTIMS and why does it matter for an expense?', a: 'eTIMS is the KRA electronic tax invoicing system, and an expense generally needs a valid eTIMS invoice to be deductible. The point behind the question is that supplier compliance now affects your employer tax bill, so you would check that purchases carry valid invoices.' },
        ],
      },
      {
        id: 'competency',
        heading: 'Competency and judgement questions',
        body: [
          'Competency questions ask for a real example, and the reliable structure is situation, action, result. Pick examples that show ownership rather than luck; a vague answer with no clear outcome is what sinks otherwise strong candidates. The judgement questions have no clean answer, and that is the point: the interviewer is watching your integrity and your escalation instinct.',
        ],
        qa: [
          { q: '12. Tell me about a time you spotted an error.', a: 'Name the specific error, what you did to confirm and correct it, and the result. "I noticed a supplier invoice posted twice during a month-end review, reversed it, and added a duplicate-payment check to the routine" beats a general claim of being detail-oriented.' },
          { q: '13. Tell me about a deadline you protected under pressure.', a: 'Describe the deadline, the risk to it, and the concrete step you took, whether reprioritising, flagging early, or staying to finish a reconciliation, and the outcome. The interviewer is testing whether you manage a deadline actively rather than hoping it holds.' },
          { q: '14. What would you do if you were asked to record something you believed was wrong?', a: 'Name the line you would not cross, raise it with the person who asked and then a manager if needed, and document your position. An escalation instinct matters more than sounding agreeable.' },
          { q: '15. You find a mistake after a return has already been filed. What do you do?', a: 'Quantify the error, tell your manager promptly, and correct it through the proper route, an amended return or the next filing, rather than hiding it. Employers listen for someone who surfaces problems early, because a hidden error costs far more later.' },
        ],
      },
      {
        id: 'closing',
        heading: 'Closing well and following up',
        body: [
          'The end of the interview is part of the assessment. Having two or three genuine questions ready, about the team, the reporting cycle, or how the role grows, signals that you are weighing the fit rather than just wanting any job. Avoid making salary the first thing you raise; when it does come up, anchor to the ranges advertised on live listings for the role and level rather than naming a figure out of the air.',
          'Preparation is what turns a nervous candidate into a hireable one, so rehearse structured answers before the day rather than improvising in the room. A sharp [accounting CV in Kenya](/blog/accounting-cv-kenya) is what gets you into the room in the first place, and once you are ready, applying to the roles on the [live accounting jobs board](/jobs) puts that preparation to work. Reading the guide to [landing accounting jobs in Kenya](/guides/accounting-jobs-in-kenya) alongside it keeps the whole application, not just the interview, sharp.',
        ],
      },
    ],
    faqs: [
      { q: 'What questions are asked in an accounting interview in Kenya?', a: 'A mix of technical questions on the fundamentals, compliance questions rooted in KRA obligations such as VAT, PAYE and eTIMS, and competency and judgement questions that ask for real examples and test your integrity under pressure.' },
      { q: 'How do I answer technical accounting questions?', a: 'Structure the answer: state the principle, show the steps you would take, then name the check that confirms it is right. If you have only studied an area, say so and reason from principle rather than bluffing.' },
      { q: 'Do accounting interviews in Kenya test tax knowledge?', a: 'Yes. Because much of the work is compliance, expect questions on VAT deadlines, PAYE employer duties, rental income tax and eTIMS. You are expected to understand how the system fits together and to verify specific rates before relying on them.' },
      { q: 'How should I answer competency questions?', a: 'Give a real example using a simple situation, action and result structure, and choose examples that show ownership. Vague answers with no clear outcome are the ones that let strong candidates down.' },
      { q: 'What questions should I ask the interviewer?', a: 'Two or three genuine questions about the team, the reporting cycle or how the role grows. Avoid leading with salary, and when it comes up, anchor to the ranges advertised on live listings for the role and level.' },
    ],
  },
  {
    slug: 'accounting-cv-kenya',
    draft: false,
    kind: 'spoke',
    hub: 'accounting-jobs-in-kenya',
    title: 'Accounting CV in Kenya: How to Get Shortlisted',
    metaTitle: 'Accounting CV in Kenya: How to Get Shortlisted',
    description:
      'How to write an accounting CV in Kenya that gets shortlisted: structure, how to show CPA and ICPAK status, quantifying results, tuning to the listing, and common mistakes.',
    lead: 'Most accounting applications in Kenya are filtered before a person reads them closely, so your CV has one job first: survive the screen. Here is how to structure it, what to put where, and the mistakes that get strong candidates rejected on sight.',
    updated: '2026-07-06',
    sections: [
      {
        id: 'the-job-of-a-cv',
        heading: 'What your CV has to do first',
        body: [
          'An accounting CV in Kenya is read twice: quickly, to decide whether you clear the basic bar, and then slowly, only if you clear it. The first read is often a scan against the listing for the qualification, the years, and a few keywords. If those are not visible in seconds, a strong candidate can be filtered out before anyone reads the detail, so the top third of the first page has to do the heavy lifting.',
          'That means leading with the facts an employer is screening for: your CPA status, your ICPAK membership if you have it, your total relevant experience, and the kind of accounting you do. Burying the qualification on page two is one of the most common reasons a capable applicant never makes the shortlist. Tuning the CV to each listing, so those facts line up with what the role asks for, is what the guide to [landing accounting jobs in Kenya](/guides/accounting-jobs-in-kenya) treats as the single highest-leverage step.',
        ],
      },
      {
        id: 'structure',
        heading: 'The structure that works',
        body: [
          'A clean, conventional structure beats a designed one for accounting roles. Lead with a short professional summary, then qualifications, then experience in reverse order, then education and any additional skills. Keep it to two pages, use plain formatting that survives being parsed by software, and avoid photos, tables and graphics that can scramble in an applicant-tracking system.',
          'Put your qualifications where they are seen. State clearly whether you have completed [the KASNEB CPA qualification](https://www.kasneb.or.ke/cpa) or are at a specific stage, and name your [ICPAK membership category](https://www.icpak.com/member-categories/) if you hold one, because those two lines answer the first question the employer has. The full qualification picture, and how far along you need to be for different roles, is set out in the guide to [becoming an accountant in Kenya](/guides/how-to-become-an-accountant-in-kenya).',
        ],
        bullets: [
          'Professional summary: three or four lines, qualification and focus up front',
          'Qualifications: CPA stage and ICPAK category stated plainly',
          'Experience: reverse order, achievements not just duties',
          'Education and skills: concise, relevant, no filler',
        ],
      },
      {
        id: 'quantify',
        heading: 'Show results, not duties',
        body: [
          'The difference between a CV that lists duties and one that shows results is the difference between blending in and standing out. "Responsible for accounts payable" tells an employer nothing; "cleared a backlog of supplier reconciliations and cut month-end close from ten days to six" shows impact. Wherever you can, attach a number to what you did, because numbers are how an accountant demonstrates they think in outcomes.',
          'Be truthful with those numbers. Inflated or invented figures are easy to unpick in an interview, and accounting is a field where getting caught embellishing is fatal to trust. If you cannot quantify something honestly, describe the scope instead, the size of the ledger, the number of entities, the systems you worked in, so the reader can gauge the level you operated at.',
        ],
      },
      {
        id: 'tune-to-listing',
        heading: 'Tune it to the listing',
        body: [
          'One generic CV sent everywhere is the quiet reason many applications fail. Each listing uses particular language, for the software it runs, the standards it works to, the sector it sits in, and mirroring that language, honestly, is what gets you past the keyword screen and signals you actually read the role. This does not mean rewriting your history; it means reordering and rephrasing so the relevant parts surface first.',
          'Read the listing and ask what this specific employer is screening for, then make sure those exact things are visible high up. When you apply through the [accounting jobs board](/jobs), that tuned version is what enters the pipeline, and a version aimed at the role beats a stronger but generic CV aimed at nothing in particular.',
        ],
      },
      {
        id: 'mistakes',
        heading: 'The mistakes that get you rejected',
        body: [
          'A handful of errors reject candidates before their experience is even weighed. Typos and inconsistent figures are read as carelessness, which is disqualifying for someone who will be trusted with the books. An unexplained gap, an email address that looks unprofessional, or a CV that runs to five pages all cost you before the interview.',
          'Once the CV is clean, the rest of the application has to match it. A tuned covering note and, above all, being ready for the technical and judgement questions in the [accounting interview questions in Kenya](/blog/accounting-interview-questions-kenya) walkthrough are what convert a shortlisting into an offer. The CV opens the door; the preparation behind it is what walks you through.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I write an accounting CV for the Kenyan job market?', a: 'Lead with your CPA status and ICPAK membership, keep it to two pages of clean, parseable formatting, show results with numbers rather than listing duties, and tune it to each listing so the facts the employer is screening for appear high on the first page.' },
      { q: 'Where should I put my CPA and ICPAK details on my CV?', a: 'Near the top, in a clear qualifications section, stating whether you have completed CPA or your current stage and your ICPAK membership category. Employers screen for these first, so burying them costs you the shortlist.' },
      { q: 'How long should an accounting CV be?', a: 'Two pages. Longer CVs dilute the facts that matter, and overly designed layouts can scramble when parsed by applicant-tracking software, so keep the formatting plain.' },
      { q: 'Should I use one CV for every application?', a: 'No. Tune each CV to the listing, mirroring its language honestly and surfacing the relevant experience first. A version aimed at the specific role beats a stronger but generic CV.' },
      { q: 'What are the most common accounting CV mistakes?', a: 'Typos and inconsistent numbers, burying your qualification, unexplained gaps, an unprofessional email address, and excessive length. In accounting, carelessness on the page reads as carelessness with the books.' },
    ],
  },
  {
    slug: 'entry-level-accounting-jobs-kenya',
    draft: false,
    kind: 'spoke',
    hub: 'accounting-jobs-in-kenya',
    title: 'Entry-Level Accounting Jobs in Kenya: How to Break In',
    metaTitle: 'Entry-Level Accounting Jobs in Kenya: How to Break In',
    description:
      'How to break into entry-level accounting jobs in Kenya: the roles that hire juniors, using attachments and internships, what employers want, and how to apply well.',
    lead: 'The hardest accounting job to get in Kenya is the first one, because almost every listing seems to want experience you do not yet have. Here is how the entry-level market actually works, the roles that hire juniors, and how to break in.',
    updated: '2026-07-06',
    sections: [
      {
        id: 'the-catch-22',
        heading: 'The experience trap, and the way out',
        body: [
          'Every new accountant hits the same wall: roles ask for experience, and you need a role to get experience. The way out is to recognise that not every listing means it. Plenty of entry-level roles ask for CPA in progress and a willingness to learn rather than years on the job, and the skill early on is telling those apart from the roles that are genuinely out of reach so you spend your applications where they can land.',
          'The other half of the answer is that experience does not only come from a permanent job. Attachments, internships and short contracts all count, and treating them as the on-ramp rather than a detour is what gets most people their first real role. Watching the junior and trainee listings on the [accounting jobs board](/jobs) shows you which employers are hiring at that level right now.',
        ],
      },
      {
        id: 'roles-that-hire',
        heading: 'The roles that actually hire juniors',
        body: [
          'A handful of role types are the usual entry points, and knowing their titles helps you search for them. Audit firms hire audit associates in cohorts, often straight out of the CPA examinations, and this is one of the most reliable ways into [the accountancy profession regulated by ICPAK](https://www.icpak.com/member-categories/) because firms expect to train you. Industry finance teams hire accounts assistants, accounts clerks and junior accountants to handle payables, receivables and reconciliations under supervision.',
          'Beyond those, bookkeeping roles in small businesses, finance-officer roles in SACCOs and NGOs, and trainee positions in shared-service centres all take people early in their careers. Each has a different texture, but all of them value someone who is reliable with detail and eager to learn over someone who claims to know everything, and the [live jobs board](/jobs) lets you filter these entry points by function.',
        ],
        bullets: [
          'Audit associate: cohort hiring in firms, structured training',
          'Accounts assistant or clerk: payables, receivables, reconciliations',
          'Junior accountant: supervised general ledger and reporting work',
          'Finance officer: common in SACCOs and NGOs',
        ],
      },
      {
        id: 'attachments',
        heading: 'Using attachments and internships',
        body: [
          'Industrial attachments and internships are the standard bridge into Kenyan accounting, and for many people they are how the first line of experience gets onto the CV. The value is not only the technical exposure; it is the reference, the professional network, and often the inside track when the same organisation next hires permanently. Treating an attachment as a serious audition rather than a box to tick is what turns it into a job.',
          'Apply for these the way you would a permanent role, with a tuned CV and a clear reason for wanting that specific placement. The document that gets you shortlisted for an attachment is the same one that gets you shortlisted later, so it is worth building well from the start, which is what the guide to writing an [accounting CV that gets shortlisted](/blog/accounting-cv-kenya) walks through.',
        ],
      },
      {
        id: 'what-employers-want',
        heading: 'What employers want from a junior',
        body: [
          'At entry level, employers are not expecting deep expertise. They are looking for someone who is accurate with detail, honest about what they do not know, and quick to learn a process and stick to it. Reliability under a deadline and a willingness to ask rather than guess matter more than a long list of skills, because the technical depth is what the job itself will build.',
          'Progress on the [KASNEB CPA qualification](https://www.kasneb.or.ke/cpa) signals exactly this, that you are committed to the profession and are building the technical base in parallel. If you have not started or are early in the process, the study route and how it fits around a first job is set out in the guide to [becoming an accountant in Kenya](/guides/how-to-become-an-accountant-in-kenya), and being visibly in progress is often enough for an entry-level employer.',
        ],
      },
      {
        id: 'apply-well',
        heading: 'Applying so you get noticed',
        body: [
          'Volume alone does not work; targeted applications do. Aim at roles pitched at your actual level, tune each application to the listing, and apply through a focused pipeline rather than scattering the same CV across the internet. A smaller number of well-aimed applications through the [accounting jobs board](/jobs) beats a hundred generic ones, because each one lands in front of an employer who is hiring at your level.',
          'Then prepare for the conversation. Entry-level interviews still test the fundamentals and your judgement, and walking in with structured answers, as covered in the [accounting interview questions in Kenya](/blog/accounting-interview-questions-kenya) walkthrough, is what converts a first shortlisting into a first job. The candidates who break in are rarely the most experienced, because none of them are; they are the ones who applied precisely and prepared properly.',
        ],
      },
    ],
    faqs: [
      { q: 'How do I get an entry-level accounting job in Kenya with no experience?', a: 'Target roles that ask for CPA in progress rather than years of experience, use attachments and internships as the on-ramp, and apply with a tuned CV through a focused pipeline. The first line of experience often comes from a placement rather than a permanent job.' },
      { q: 'What are the common entry-level accounting roles?', a: 'Audit associate positions in firms, accounts assistant or clerk roles handling payables and receivables, junior accountant roles doing supervised ledger work, and finance-officer roles in SACCOs and NGOs.' },
      { q: 'Do internships and attachments help?', a: 'Yes. They are the standard bridge into the profession, providing the first experience, a reference, a network and often an inside track when the organisation next hires permanently. Apply for them as seriously as a permanent role.' },
      { q: 'Do I need to have finished CPA for an entry-level job?', a: 'Usually not. Many entry-level roles accept CPA in progress. Being visibly on the qualification signals commitment and a growing technical base, which is what entry-level employers screen for alongside reliability and willingness to learn.' },
      { q: 'What do employers want from a junior accountant?', a: 'Accuracy with detail, honesty about what you do not yet know, and the ability to learn and follow a process. Reliability under deadline and asking rather than guessing matter more than a long skills list at this stage.' },
    ],
  },
  {
    slug: 'cpa-course-kenya',
    draft: false,
    kind: 'spoke',
    hub: 'how-to-become-an-accountant-in-kenya',
    title: 'The CPA Course in Kenya: Levels, Papers & Cost',
    metaTitle: 'The CPA Course in Kenya: Levels, Papers & Cost',
    description:
      'The KASNEB CPA course in Kenya explained: the Foundation, Intermediate and Advanced levels and their papers, entry grade, exam sittings, registration and fees, and duration.',
    lead: 'The CPA course is the backbone qualification for accountants in Kenya, examined by KASNEB across three levels. Here is exactly how it is structured, what each level covers, how the exams and fees work, and how long the whole thing takes.',
    updated: '2026-07-06',
    sections: [
      {
        id: 'what-cpa-is',
        heading: 'What the CPA course is',
        body: [
          'The Certified Public Accountant course is the professional accountancy qualification set by the Kenya Accountants and Secretaries National Examinations Board, KASNEB. It is the standard route to becoming a recognised accountant in Kenya, and completing it is what lets you apply for [membership of the Institute of Certified Public Accountants of Kenya](https://www.icpak.com/member-categories/) and use the CPA(K) designation. The wider route, from exams through experience to ICPAK, is laid out in the guide to [becoming an accountant in Kenya](/guides/how-to-become-an-accountant-in-kenya).',
          'Under the revised KASNEB syllabus, the course is examined across three levels, Foundation, Intermediate and Advanced, each building on the last. It is designed to be studied alongside work, which is why many candidates sit papers while holding a finance role, and watching the [trainee and junior listings on the jobs board](/jobs) is a practical way to line up that experience while you study.',
        ],
      },
      {
        id: 'levels-papers',
        heading: 'The three levels and their papers',
        body: [
          'The Foundation level covers six papers that build the base: Financial Accounting, Communication Skills, Introduction to Law and Governance, Economics, Quantitative Analysis, and Information Communication Technology. This level assumes no prior accounting knowledge and is where most candidates start.',
          'The Intermediate level covers a further six papers, moving into the working core of the profession: Company Law, Financial Management, Financial Reporting and Analysis, Auditing and Assurance, Management Accounting, and Public Finance and Taxation. The Advanced level then moves into higher-level papers such as Leadership and Management, Advanced Financial Reporting and Analysis and Advanced Financial Management, together with a specialisation choice and required ethics and work-simulation components. Because the syllabus was revised, confirm the exact Advanced-level paper list and any specialisation rules on the KASNEB CPA course page before you register.',
        ],
        bullets: [
          'Foundation: six papers, the accounting and business fundamentals',
          'Intermediate: six papers, reporting, audit, management accounting and tax',
          'Advanced: higher-level papers, a specialisation, and ethics and work-simulation elements',
        ],
      },
      {
        id: 'entry-exams',
        heading: 'Entry requirements and exam sittings',
        body: [
          'The minimum entry requirement for the CPA course is a KCSE mean grade of C+. Candidates with relevant diplomas or degrees can also register, and accounting degree holders are often eligible for exemptions from parts of the Foundation level, though the exact exemptions depend on the qualification and should be confirmed with KASNEB.',
          'KASNEB professional examinations are held three times a year, in April, August and December. That three-sitting rhythm is one reason a committed candidate can move through the levels relatively quickly, since there is no long wait between attempts. You register with KASNEB, book the papers you are ready for, and sit them at an approved centre.',
        ],
      },
      {
        id: 'cost',
        heading: 'Registration and exam fees',
        body: [
          'The cost of the CPA course is made up of a one-off registration fee with KASNEB and then a fee for each paper you sit, alongside separate charges such as an annual registration renewal. Exam fees are charged per paper and differ by level, so the total cost depends on how many papers you attempt and how many attempts each one takes.',
          'Because these figures are set by KASNEB and updated periodically, the reliable source is the official fee schedule rather than any third-party summary. Check the current fees on the [KASNEB fee structures page](https://www.kasneb.or.ke/fee-structures) before you budget, and factor in tuition if you study with a college rather than privately, since that sits on top of the KASNEB fees.',
        ],
      },
      {
        id: 'duration',
        heading: 'How long it takes',
        body: [
          'KASNEB guidance frames each level as requiring roughly a year on average, which puts the examinations at about three years for a candidate who progresses steadily and passes cleanly. On top of that, candidates are advised to allow additional time for the practical experience and workshop requirements built into the qualification, so the realistic end-to-end picture is a little longer than the exam timetable alone.',
          'In practice the timeline varies widely with how many papers you take per sitting, how you balance study against work, and resits. Some finish faster by sitting a full level at once; others spread it out around a demanding job. Either way, the qualification only pays off when it meets real roles, so treating the [live accounting jobs](/jobs) as part of the plan, and preparing with the [accounting interview questions in Kenya](/blog/accounting-interview-questions-kenya) walkthrough, is what turns exam passes into a career.',
        ],
      },
    ],
    faqs: [
      { q: 'How many levels and papers are in the CPA course in Kenya?', a: 'Under the revised KASNEB syllabus the CPA course has three levels: Foundation and Intermediate with six papers each, and Advanced with higher-level papers plus a specialisation and ethics and work-simulation elements. Confirm the exact Advanced-level paper list with KASNEB.' },
      { q: 'What is the entry requirement for the CPA course?', a: 'A KCSE mean grade of C+ is the minimum. Holders of relevant diplomas or degrees can also register, and accounting degree holders may qualify for exemptions from parts of the Foundation level, subject to confirmation by KASNEB.' },
      { q: 'How much does the CPA course cost in Kenya?', a: 'There is a one-off KASNEB registration fee, per-paper exam fees that differ by level, and periodic renewal charges, plus tuition if you study with a college. Fees are set and updated by KASNEB, so check the official fee structures page before budgeting.' },
      { q: 'When are CPA exams held?', a: 'KASNEB professional examinations are held three times a year, in April, August and December, so there is no long wait between attempts.' },
      { q: 'How long does the CPA course take in Kenya?', a: 'KASNEB frames each level as about a year on average, so roughly three years of examinations for a steady candidate, with extra time allowed for the practical experience and workshop requirements. Actual timelines vary with papers taken per sitting, work commitments and resits.' },
    ],
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
export const getGuide = (slug: string): Guide | undefined => GUIDE_MAP[slug];
