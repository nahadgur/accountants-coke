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
  draft?: boolean; // when true: 404s in prod, excluded from index + sitemap + static params
};

/** Guides that are live (not parked as drafts). Use everywhere a guide is listed publicly. */
export const PUBLISHED_GUIDES = (): Guide[] => GUIDES.filter((g) => !g.draft);

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
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
export const getGuide = (slug: string): Guide | undefined => GUIDE_MAP[slug];
