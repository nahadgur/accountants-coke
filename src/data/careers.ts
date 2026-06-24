import type { Article } from '@/data/content';

// Careers track: job-seeker / aspiring-accountant content. Each article funnels
// to the live job board (/jobs) rather than the client match form. Kenya-
// specific throughout: KASNEB CPA, ICPAK, the Big Four Nairobi offices.
//
// Flagship `how-to-become-an-accountant-in-kenya` is fully written. The other
// three pillars are honest starting points, expanded to full depth later.

const browseJobsCta = {
  kind: 'jobs' as const,
  title: 'Looking for an accounting role?',
  body: 'Browse current accounting and finance jobs across Kenya, from entry-level to senior, and apply directly.',
  ctaLabel: 'Browse accounting jobs',
  href: '/jobs',
  points: ['Entry-level to senior', 'CPA-K, ACCA & CIFA roles', 'Across Kenya'],
};

export const CAREERS: Article[] = [
  {
    slug: 'how-to-become-an-accountant-in-kenya',
    title: 'How to Become an Accountant in Kenya',
    metaTitle: 'How to Become an Accountant in Kenya (2026 Guide)',
    description:
      'The full route to becoming an accountant in Kenya: the KASNEB CPA qualification, practical experience, ICPAK membership and the practising certificate, plus where to work.',
    lead: 'Becoming an accountant in Kenya runs through one main professional route: the KASNEB CPA examinations, followed by membership of ICPAK. Here is each step in order, what it takes, and where qualified accountants go to work.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'routes',
        heading: 'The Route In',
        body: [
          'Almost every practising accountant in Kenya holds the Certified Public Accountant (CPA) qualification examined by the [Kenya Accountants and Secretaries National Examinations Board (KASNEB)](https://www.kasneb.or.ke/cpa). A university degree in accounting, finance or commerce helps you get hired and can shorten the journey, but it is the professional qualification, not the degree, that lets you sign accounts and call yourself a CPA.',
          'So the path has three parts that build on each other: pass the KASNEB CPA examinations, complete the required practical experience and workshops, then register with the Institute of Certified Public Accountants of Kenya (ICPAK). If you want to offer accountancy or audit services to the public in your own name, there is a further step, the practising certificate, covered below.',
        ],
      },
      {
        id: 'cpa-kasneb',
        heading: 'The CPA Qualification, Step by Step',
        body: [
          'Under the revised 2021 syllabus, the CPA course is sat at three levels: Foundation, Intermediate and Advanced. The Foundation and Intermediate levels have six papers each, covering financial accounting, law, economics, financial management, financial reporting, auditing, management accounting and taxation. The Advanced level has three compulsory papers plus at least one specialisation paper, followed by a practical Data Analytics paper sat in a controlled computer environment.',
          'Direct entry to CPA needs a KCSE mean grade of C+ (or an equivalent qualification). If you do not yet meet that, KASNEB offers a progression route through its Accounting Technicians Diploma (ATD), which feeds into CPA. Each level is designed to take about a year, though most candidates allow extra time around exam sittings.',
        ],
        bullets: [
          'Foundation level: six papers (financial accounting, communication, law and governance, economics, quantitative analysis, ICT)',
          'Intermediate level: six papers (company law, financial management, financial reporting, auditing, management accounting, public finance and taxation)',
          'Advanced level: three compulsory papers, at least one specialisation paper, then the practical Data Analytics paper',
          'Entry: KCSE C+ for direct entry, or progress via the ATD',
        ],
      },
      {
        id: 'experience',
        heading: 'Practical Experience and Workshops',
        body: [
          'Passing the papers is not the whole qualification. KASNEB and ICPAK also require practical experience, normally about one year, so you have actually applied the work, not just examined it. There is a work-based simulation route for candidates who cannot easily secure a placement.',
          'You also attend workshops on ethics, leadership and soft skills run by KASNEB and ICPAK and earn the associated professional-development hours. These are built into the qualification rather than optional extras, and they continue after you qualify as Continuing Professional Development.',
        ],
      },
      {
        id: 'icpak',
        heading: 'Registering with ICPAK',
        body: [
          'Once you have passed the CPA examinations and met the experience and workshop requirements, you register with [ICPAK](https://www.icpak.com/member-categories/) as a full member and earn the designation CPA(K). Membership is what formally makes you a recognised accountant in Kenya, and it carries an annual subscription and ongoing CPD obligations.',
          'Full membership lets you work as an accountant in employment. It does not, on its own, let you offer accountancy or audit services to the public in your own name. For that you apply for a practising certificate, which requires additional supervised audit experience, an up-to-date CPD record and professional references. ICPAK sets the current application and subscription fees, so confirm those directly with the Institute before you budget for them.',
        ],
      },
      {
        id: 'where-to-work',
        heading: 'Where Qualified Accountants Work',
        body: [
          'The most visible employers are the Big Four firms with offices in Nairobi: PwC, Deloitte, KPMG and EY. They run structured graduate and trainee programmes and are a common first step for ambitious trainees, and our guide to [getting into the Big Four in Kenya](/careers/getting-into-the-big-four-in-kenya) covers how their recruitment works.',
          'Beyond the Big Four there is far more demand: mid-tier and small audit firms, banks and SACCOs, NGOs and donor-funded programmes, county and national government, and finance teams inside companies of every size. Pay varies widely by employer and level, which our [accountant salaries in Kenya](/careers/accountant-salaries-in-kenya) guide breaks down. When you are ready to move, you can [browse current accounting jobs](/jobs) and apply directly.',
        ],
      },
    ],
    faqs: [
      { q: 'Do I need a degree to become an accountant in Kenya?', a: 'No. The professional route is the KASNEB CPA qualification followed by ICPAK membership. A degree in accounting, finance or commerce helps you get hired and can run alongside CPA, but it is not mandatory to qualify.' },
      { q: 'How long does it take to become a CPA in Kenya?', a: 'The CPA course has three levels, each designed to take about a year, plus roughly a year of practical experience. Most people take around three to four years depending on how quickly they clear the exams.' },
      { q: 'What is the entry requirement for CPA?', a: 'A KCSE mean grade of C+ allows direct entry. If you do not meet that, you can progress through KASNEB’s Accounting Technicians Diploma (ATD) into CPA.' },
      { q: 'Is being a CPA(K) the same as being able to practise?', a: 'Not quite. CPA(K) is full ICPAK membership and lets you work as an accountant in employment. To offer accountancy or audit services to the public in your own name you also need a practising certificate, which requires further supervised audit experience.' },
      { q: 'CPA or ACCA in Kenya?', a: 'Both are recognised. CPA(K) via KASNEB is the local standard and the route into ICPAK; ACCA is an international qualification. Many accountants in Kenya hold one and add the other later depending on whether they want a local or global focus.' },
      { q: 'Where do I find accounting jobs after qualifying?', a: 'You can browse current accounting and finance roles across Kenya on our job board and apply to employers directly.' },
    ],
    cta: browseJobsCta,
  },
  {
    slug: 'accounting-jobs-in-kenya',
    title: 'Accounting Jobs in Kenya: How to Find and Land Them',
    metaTitle: 'Accounting Jobs in Kenya (2026)',
    description:
      'Where the accounting and finance jobs are in Kenya, the roles employers hire for, and how to apply, from entry-level to qualified CPA positions.',
    lead: 'Accounting is one of the steadiest hiring areas in Kenya, from audit juniors to financial controllers. This guide covers the roles employers post, who is hiring, and how to apply.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'roles',
        heading: 'The Roles Employers Hire For',
        body: [
          'Accounting jobs in Kenya span a wide range. At the start are audit assistants, accounts clerks and bookkeepers. With a few years and CPA progress come accountant, tax associate, payroll and management-accountant roles. Senior positions include financial accountant, finance manager, financial controller and finance director.',
          'Demand is broad because every organisation needs the numbers handled: audit and tax firms, banks and SACCOs, NGOs, county and national government, and the finance teams inside companies across every sector. You can [browse the live listings](/jobs) to see what is currently open.',
        ],
      },
      {
        id: 'applying',
        heading: 'How to Apply Well',
        body: [
          'Tailor each application to the role rather than sending one generic CV. Lead with your CPA level or ICPAK membership, the systems you know, and concrete results, not just duties. For entry-level roles, internships and attachments count for a lot, so make them visible.',
          'On this site you apply to employers directly through the [job board](/jobs): open a role, read what they need, and submit your details and CV. There is no charge to apply.',
        ],
      },
    ],
    faqs: [
      { q: 'What qualifications do accounting jobs in Kenya need?', a: 'It varies by level. Entry roles often accept CPA in progress or a relevant diploma or degree; qualified roles usually want CPA(K) or ACCA and several years of experience.' },
      { q: 'Do I need to be a full CPA to get hired?', a: 'No. Many employers hire candidates who are still sitting CPA, especially for junior and trainee roles, and support them while they finish.' },
      { q: 'How do I apply for jobs on this site?', a: 'Open a role on the job board, review the requirements, and submit your application and CV directly to the employer. Applying is free.' },
    ],
    cta: browseJobsCta,
  },
  {
    slug: 'getting-into-the-big-four-in-kenya',
    title: 'Getting Into the Big Four in Kenya',
    metaTitle: 'How to Join the Big Four Accounting Firms in Kenya',
    description:
      'How recruitment works at PwC, Deloitte, KPMG and EY in Nairobi, what they look for in graduates and trainees, and how to make your application stand out.',
    lead: 'PwC, Deloitte, KPMG and EY all have Nairobi offices and run structured graduate and trainee intakes. This guide covers how their recruitment works and what helps you get in.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'who-they-are',
        heading: 'The Four Firms in Kenya',
        body: [
          'The Big Four professional-services firms, PwC, Deloitte, KPMG and EY, all operate in Kenya from Nairobi and serve much of the country’s large-company audit, tax and advisory work. A first few years at one of them is a recognised launchpad, which is why their graduate programmes are competitive.',
          'They typically recruit through graduate schemes, internships and experienced-hire openings. Each firm runs its own intake calendar and online application process, so follow the careers pages of the specific firm you are targeting.',
        ],
      },
      {
        id: 'what-they-look-for',
        heading: 'What They Look For',
        body: [
          'Strong academics are the baseline: a good degree and solid progress through CPA or ACCA. Beyond that they assess aptitude tests, communication, and whether you can handle client-facing work under deadlines. Internships, attachments and leadership in university activities all help you stand out.',
          'Apply early in the cycle, prepare for the aptitude and competency stages, and be specific about why that firm and that service line. While you are building experience, you can also [browse other accounting roles](/jobs) across Kenya.',
        ],
      },
    ],
    faqs: [
      { q: 'Which are the Big Four firms in Kenya?', a: 'PwC, Deloitte, KPMG and EY. All four have offices in Nairobi.' },
      { q: 'Do I need to be a full CPA to join the Big Four?', a: 'Usually not for graduate intakes. They commonly hire candidates who are progressing through CPA or ACCA and support them to complete it.' },
      { q: 'How do I apply to the Big Four?', a: 'Through each firm’s own careers page and graduate-recruitment process. Watch their intake calendars and apply early in the cycle.' },
    ],
    cta: browseJobsCta,
  },
  {
    slug: 'accountant-salaries-in-kenya',
    title: 'Accountant Salaries in Kenya: What to Expect',
    metaTitle: 'Accountant Salaries in Kenya (2026)',
    description:
      'How accountant pay in Kenya varies by level, qualification, sector and employer, and how to use live job listings to see real, current salary ranges.',
    lead: 'Accountant pay in Kenya spans a wide range depending on your level, qualification and employer. Rather than quote figures that quickly date, this guide explains what moves the number and how to read the live market.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'what-drives-pay',
        heading: 'What Drives the Number',
        body: [
          'The biggest factors are level and qualification. An audit junior or accounts clerk sits well below a qualified CPA(K), who in turn sits below a finance manager or controller. Holding CPA(K) or ACCA, and the years of experience behind it, moves pay up materially.',
          'Sector and employer matter just as much. Big Four firms, banks, large corporates, NGOs and donor-funded programmes tend to pay more than small firms and SMEs, and Nairobi generally pays above smaller towns. Specialist skills such as tax, audit and financial reporting command a premium.',
        ],
      },
      {
        id: 'read-the-market',
        heading: 'Reading the Live Market',
        body: [
          'Published salary surveys go stale quickly, so the most reliable signal is what employers are actually offering right now. Many of the roles on our [job board](/jobs) list a salary range, which gives you a current, honest picture for your level and location.',
          'Use those live ranges to benchmark before you negotiate: filter for your role and area, look at several postings, and weigh the total package, not just the headline figure.',
        ],
      },
    ],
    faqs: [
      { q: 'How much do accountants earn in Kenya?', a: 'It varies widely by level, qualification, sector and employer, from entry-level clerks up to finance directors. The most current guide is the salary ranges on live job listings for your specific role and location.' },
      { q: 'Does CPA(K) increase your salary?', a: 'Generally yes. Full CPA(K) membership, and the experience that comes with it, typically moves you from junior pay bands into qualified-accountant and management pay bands.' },
      { q: 'Where can I see real, current salaries?', a: 'Many roles on our job board state a salary range. Filtering live listings for your level and location is the most accurate way to benchmark.' },
    ],
    cta: browseJobsCta,
  },
];

export const CAREER_MAP = Object.fromEntries(CAREERS.map((c) => [c.slug, c]));
export const getCareer = (slug: string): Article | undefined => CAREER_MAP[slug];
