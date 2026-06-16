import type { Specialization } from '@/lib/types';

// Accounting services for programmatic SEO pages. `specialization` maps the
// service to the directory enum used to surface matching pros. Editorial copy
// lives here; pros are fetched live from Supabase.

export type Fact = { icon: string; label: string; sub: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string; // "Rental Income Tax"
  noun: string; // "rental income tax accountant"
  metaDesc: string; // bespoke, keyword-rich meta description (<=155 chars)
  specialization: Specialization | null;
  /** Short lead used on hub + combo pages. `loc` is the location name or "Kenya". */
  lead: (loc: string) => string;
  facts: Fact[];
  /** Hub intro paragraphs. */
  intro: string[];
  faqs: Faq[];
  relatedGuide?: string;
};

const f = (icon: string, label: string, sub: string): Fact => ({ icon, label, sub });

export const SERVICES: Service[] = [
  {
    slug: 'rental-income-tax',
    name: 'Rental Income Tax',
    noun: 'rental income tax accountant',
    metaDesc:
      'Find a verified accountant to file your Monthly Rental Income (MRI) tax in Kenya: 7.5% on gross rent, due by the 20th. Get matched free.',
    specialization: 'Tax Audit',
    lead: (loc) =>
      `If you earn residential rent in ${loc}, KRA expects a Monthly Rental Income (MRI) return every month, even when a unit is empty. A verified accountant registers your properties on eRITS, files on time, and keeps you clear of the 7.5% trap and penalties.`,
    facts: [
      f('percent', '7.5%', 'Flat MRI tax on gross rent'),
      f('clock', 'By the 20th', 'Filed every month'),
      f('file', 'KES 280k–15m', 'Annual rent band'),
      f('shield', 'NIL return', 'Required even at zero rent'),
    ],
    intro: [
      'Monthly Rental Income (MRI) is a final tax of 7.5% on gross rent. You cannot deduct expenses, and a return is due by the 20th of every month, including a NIL return in months a unit sits empty.',
      'It applies to landlords earning between KES 280,000 and 15 million a year. Landlords with high expenses can elect the standard income-tax regime instead, which a good accountant will model for you.',
    ],
    faqs: [
      { q: 'How much is rental income tax in Kenya?', a: 'MRI is a final tax of 7.5% on gross rent for landlords earning between KES 280,000 and 15 million a year.' },
      { q: 'When is the MRI return due?', a: 'By the 20th of the following month, every month. A NIL return is required even in months with no rent.' },
      { q: 'Can I deduct expenses?', a: 'Not under MRI, it is a flat 7.5% of gross rent. High-expense landlords can elect the standard regime to claim deductions.' },
      { q: 'What is eRITS?', a: 'KRA’s Electronic Rental Income Tax System for registering properties, filing and paying MRI online.' },
    ],
    relatedGuide: 'rental-income-tax-kenya',
  },
  {
    slug: 'etims',
    name: 'eTIMS Compliance',
    noun: 'eTIMS accountant',
    metaDesc:
      'Get a verified accountant to onboard you to KRA eTIMS and keep your expenses deductible under the 2026 expense-validation rules. Match free.',
    specialization: 'Tax Audit',
    lead: (loc) =>
      `Since January 2026, KRA validates expenses against eTIMS, so purchases without a valid electronic invoice can be disallowed and taxed. An accountant in ${loc} onboards you to eTIMS, sets up invoicing, and keeps your expenses deductible.`,
    facts: [
      f('calculator', 'Since Jan 2026', 'Expense validation live'),
      f('receipt', 'Valid e-invoice', 'Or the expense is disallowed'),
      f('shield', 'All businesses', 'Not just VAT-registered'),
      f('clock', 'Ongoing', 'Every transaction, every month'),
    ],
    intro: [
      'From 1 January 2026, KRA matches the income and expenses on your return against eTIMS, withholding tax and customs data. Expenses not backed by a valid electronic invoice (with your buyer PIN) can be treated as non-deductible, raising your tax.',
      'The obligation extends well beyond VAT-registered firms to companies, sole proprietors, turnover-tax payers, schools, NGOs and landlords. Businesses under KES 5 million turnover get reverse-invoicing relief, which an accountant will set up correctly.',
    ],
    faqs: [
      { q: 'Who needs eTIMS in Kenya?', a: 'Almost all persons in business, including companies, sole proprietors, turnover-tax payers, associations and landlords, not only VAT-registered businesses.' },
      { q: 'What happens if I don’t have eTIMS invoices?', a: 'From 2026, expenses without a valid eTIMS invoice can be disallowed, which increases your taxable income and tax due.' },
      { q: 'Do small businesses under KES 5M need eTIMS?', a: 'Yes, but they qualify for reverse-invoicing relief, where the purchaser issues the invoice. An accountant configures this for you.' },
    ],
    relatedGuide: 'etims-kenya',
  },
  {
    slug: 'tax-returns',
    name: 'KRA Tax Returns',
    noun: 'tax accountant',
    metaDesc:
      'File your KRA tax returns on iTax with a verified accountant in Kenya. Individual and company returns, accurate and on time. Get matched free.',
    specialization: 'Tax Audit',
    lead: (loc) =>
      `From individual returns to company tax, a verified tax accountant in ${loc} files accurately on iTax, claims what you are owed, and keeps you compliant with KRA all year.`,
    facts: [
      f('file', 'iTax', 'Individual & company returns'),
      f('clock', '30 June', 'Individual return deadline'),
      f('percent', 'Penalties', 'Avoid late-filing fines'),
      f('shield', 'CPA-K', 'Verified professionals'),
    ],
    intro: [
      'Filing on iTax is simple until it isn’t, multiple income sources, withholding tax, rental income and business income all change what you owe. A tax accountant gets it right and on time.',
      'Whether you are an employee, a sole proprietor or a company, the right professional minimises your liability legally and keeps you off KRA’s radar.',
    ],
    faqs: [
      { q: 'When are individual tax returns due in Kenya?', a: 'By 30 June each year for the previous year of income. Late filing attracts penalties.' },
      { q: 'Do I need an accountant to file on iTax?', a: 'Simple employment returns can be self-filed; multiple income sources, business or rental income are where an accountant saves you money and risk.' },
    ],
  },
  {
    slug: 'vat',
    name: 'VAT',
    noun: 'VAT accountant',
    metaDesc:
      'VAT registration, eTIMS tax invoicing and monthly returns handled by a verified VAT accountant in Kenya. Cross the KES 5M threshold cleanly.',
    specialization: 'Tax Audit',
    lead: (loc) =>
      `If your turnover crosses the VAT threshold, you must register, charge 16% and file monthly. A VAT accountant in ${loc} handles registration, eTIMS invoicing and returns so you stay compliant.`,
    facts: [
      f('percent', '16%', 'Standard VAT rate'),
      f('file', 'KES 5m', 'Registration threshold'),
      f('clock', 'Monthly', 'Returns by the 20th'),
      f('receipt', 'eTIMS', 'Tax invoices required'),
    ],
    intro: [
      'VAT registration is mandatory once taxable turnover exceeds KES 5 million in any 12 months. Once registered you charge 16%, issue eTIMS tax invoices and file monthly returns.',
      'Getting VAT wrong is expensive. A specialist keeps your input and output VAT clean and your returns on time.',
    ],
    faqs: [
      { q: 'What is the VAT registration threshold in Kenya?', a: 'KES 5 million in taxable turnover within any 12-month period.' },
      { q: 'How often is VAT filed?', a: 'Monthly, by the 20th of the following month, through iTax with eTIMS-backed invoices.' },
    ],
  },
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping',
    noun: 'bookkeeper',
    metaDesc:
      'Hire a verified bookkeeper in Kenya for accurate, reconciled, eTIMS-ready books and monthly reports your accountant and bank can trust.',
    specialization: 'Bookkeeping',
    lead: (loc) =>
      `Clean books are the foundation of every tax filing and loan application. A bookkeeper in ${loc} keeps your records accurate, reconciled and ready for KRA and your bank.`,
    facts: [
      f('book', 'Monthly', 'Records & reconciliation'),
      f('receipt', 'eTIMS-ready', 'Invoices captured correctly'),
      f('file', 'Reports', 'P&L and cash position'),
      f('shield', 'Audit-ready', 'Clean trail year-round'),
    ],
    intro: [
      'Day-to-day bookkeeping, sales, purchases, payroll, bank reconciliation, is what makes tax season painless and financing possible.',
      'A reliable bookkeeper keeps your numbers current so you always know where you stand and your accountant can file in minutes, not weeks.',
    ],
    faqs: [
      { q: 'What does a bookkeeper do?', a: 'Records transactions, reconciles bank and M-Pesa accounts, manages invoices and produces monthly reports your accountant uses to file.' },
      { q: 'Do I need a bookkeeper and an accountant?', a: 'Many SMEs use one professional for both; larger or busier businesses separate ongoing bookkeeping from periodic tax and advisory work.' },
    ],
  },
  {
    slug: 'audit',
    name: 'Audit & Assurance',
    noun: 'auditor',
    metaDesc:
      'Engage an ICPAK-registered auditor in Kenya for a credible statutory or special audit for compliance, tenders or lenders. Get matched free.',
    specialization: 'Statutory Audit',
    lead: (loc) =>
      `Whether for statutory compliance, a tender or a lender, a registered auditor in ${loc} delivers a credible, independent audit of your financial statements.`,
    facts: [
      f('shield', 'Independent', 'Statutory & special audits'),
      f('file', 'Compliance', 'Companies Act & sector rules'),
      f('badge', 'Registered', 'Practising-certificate firms'),
      f('clock', 'Annual', 'Year-end assurance'),
    ],
    intro: [
      'Audits give lenders, regulators and partners confidence in your numbers. Companies, SACCOs, NGOs and schools often require one by law or by funder.',
      'Use a firm holding a valid practising certificate, the directory lets you verify that before you engage.',
    ],
    faqs: [
      { q: 'Who needs an audit in Kenya?', a: 'Many companies, SACCOs, NGOs and schools require statutory audits; lenders and donors also often request audited accounts.' },
      { q: 'Who can audit in Kenya?', a: 'Only firms and CPAs holding a valid ICPAK practising certificate, which you should always verify.' },
    ],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    noun: 'payroll accountant',
    metaDesc:
      'Outsource Kenyan payroll to a verified accountant: PAYE, NSSF, SHIF and the housing levy calculated and remitted on time, every month.',
    specialization: 'Payroll',
    lead: (loc) =>
      `PAYE, NSSF, SHIF and the housing levy change often. A payroll accountant in ${loc} runs an accurate, compliant payroll and files every statutory deduction on time.`,
    facts: [
      f('banknote', 'PAYE', 'Calculated & remitted'),
      f('shield', 'NSSF & SHIF', 'Statutory deductions'),
      f('file', 'Housing levy', 'Correctly applied'),
      f('clock', 'Monthly', 'On-time remittance'),
    ],
    intro: [
      'Payroll is where compliance gets personal, get a deduction wrong and your staff and KRA both notice. PAYE, NSSF, SHIF and the affordable-housing levy all have to be right, every month.',
      'A payroll specialist keeps net pay accurate and every statutory return filed on time.',
    ],
    faqs: [
      { q: 'What statutory deductions apply to Kenyan payroll?', a: 'PAYE, NSSF, SHIF (formerly NHIF) and the affordable-housing levy, each with its own rate and deadline.' },
      { q: 'Can a small business outsource payroll?', a: 'Yes, outsourcing payroll is common and ensures deductions and filings stay compliant as rates change.' },
    ],
  },
  {
    slug: 'company-registration',
    name: 'Company Registration',
    noun: 'company registration accountant',
    metaDesc:
      'Register your company in Kenya with a verified professional: eCitizen incorporation, KRA PIN and a compliant setup from day one. Match free.',
    specialization: 'Company Secretarial',
    lead: (loc) =>
      `Starting out in ${loc}? A professional registers your company on eCitizen, sets up your KRA PIN and obligations, and gets you compliant from day one.`,
    facts: [
      f('building', 'eCitizen', 'Company incorporation'),
      f('file', 'KRA PIN', 'Tax obligations set up'),
      f('badge', 'Compliant', 'From day one'),
      f('shield', 'Secretarial', 'Statutory records'),
    ],
    intro: [
      'Registering a company is more than a certificate, you need the right KRA obligations, a compliant structure and proper statutory records from the start.',
      'A professional handles incorporation, PIN registration and company-secretarial setup so you launch clean.',
    ],
    faqs: [
      { q: 'How do I register a company in Kenya?', a: 'Through the eCitizen Business Registration Service; a professional handles name search, incorporation, KRA PIN and obligations.' },
      { q: 'What comes after registration?', a: 'KRA PIN and tax obligations, statutory records, and often a bank account, eTIMS and bookkeeping setup.' },
    ],
  },
];

export const SERVICE_MAP = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
export const getService = (slug: string): Service | undefined => SERVICE_MAP[slug];
