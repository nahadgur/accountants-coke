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

// 8-hub careers silo (Google-Sheet content map). Hubs only for now; spokes
// (kind:'spoke' -> /blog) are added in later waves. FAQ answers render as plain
// text, so links live only in section body/qa. Figures are reported ranges or
// verified statutory rates; confirm fees/stipends at the cited source before
// treating any single number as fixed.
export const GUIDES: Guide[] = [
  // ============================================================
  // HUB 1 - Jobs
  // ============================================================
  {
    slug: 'accounting-finance-jobs-kenya',
    title: 'Accounting and Finance Jobs in Kenya: Latest Vacancies and How to Get Hired',
    metaTitle: 'Accounting & Finance Jobs in Kenya (Full Guide)',
    description:
      'Find accounting and finance jobs in Kenya plus a full how-to-get-hired guide. Latest vacancies, top employers, CVs, interviews and salaries.',
    lead: 'Accounting and finance roles are among the most advertised jobs in Kenya, but the market has tightened. This guide covers where the vacancies are, who is hiring, the skills employers now screen for, and how to get shortlisted in a market with plenty of qualified candidates chasing each role.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'the-market',
        heading: 'What the accounting job market looks like now',
        body: [
          'Accountant is consistently one of the most in demand roles on Kenyan job boards, and finance, banking and insurance make up the single largest share of white collar listings. The catch is supply. Kenya produces thousands of CPA finalists and commerce graduates every year, so most advertised roles draw a deep pool of applicants and employers can afford to be selective.',
          'The bigger shift is at the entry level. Routine bookkeeping, data entry and payroll processing are exactly the tasks accounting software now automates, and clerical accounting roles are among those [most exposed to automation](https://odi.org/en/insights/the-ai-time-bomb-25-million-jobs-at-risk-is-kenya-ready/) over the coming decade. The work that is growing sits one rung up, in analysis, controls, reporting and advisory, where judgement still matters.',
          'The practical takeaway is that a qualification alone no longer sets you apart. Pairing [CPA certification from KASNEB](/guides/cpa-kenya-kasneb-guide/) with a working command of Excel, a cloud accounting package and some data analysis is what moves an application from the reject pile to the shortlist.',
        ],
      },
      {
        id: 'who-is-hiring',
        heading: 'Who hires accountants in Kenya',
        body: [
          'Demand is concentrated across a handful of sectors. Banks, SACCOs and insurers carry large in house finance teams. Audit and advisory firms, led by the Big Four, recruit in annual graduate cohorts. Manufacturers, NGOs, county governments and the national government all run sizeable finance functions, and the growing finance outsourcing sector in Nairobi adds a steady stream of shared services roles.',
          'Location matters more than most candidates expect. Nairobi accounts for the large majority of advertised accounting vacancies, followed at a distance by Mombasa, Kisumu and Nakuru. A fuller picture of the cities and named employers that dominate hiring sits in the guide to [where accountants actually work in Kenya](/guides/accounting-jobs-kenya-locations-employers/).',
        ],
        bullets: [
          'Banking, insurance and SACCOs, the largest single employer group',
          'Audit and advisory firms, including the Big Four and mid tier firms',
          'NGOs and donor funded programmes, strong on compliance skills',
          'National and county government, including KRA and state corporations',
          'Manufacturing, retail and the fast growing finance outsourcing sector',
        ],
      },
      {
        id: 'skills-that-get-hired',
        heading: 'The skills that get you hired',
        body: [
          'Qualifications open the door, but employers shortlist on tools and evidence. Advanced Excel is close to universal, and most Kenyan job adverts name a cloud or desktop accounting package, usually QuickBooks, Sage or an enterprise system, as a requirement rather than a nice to have. Familiarity with filing on iTax and with eTIMS is increasingly expected too, because almost every finance role in Kenya touches KRA compliance.',
          'The skills pulling ahead of the pack are analytical. Being able to build a clean model in Excel, work with a dashboard, or turn a ledger into a decision is what separates candidates for the roles that are actually growing. Adding a short data analysis course on top of a professional qualification is one of the most cost effective ways to stand out in a crowded field, and it points you toward the analysis and advisory work that automation is not replacing.',
        ],
        bullets: [
          'Advanced Excel, named in almost every accounting advert',
          'A cloud or desktop package such as QuickBooks, Sage or an ERP',
          'iTax and eTIMS filing for PAYE, VAT and withholding tax',
          'IFRS based reporting and monthly reconciliations',
          'Data analysis, the skill that moves you toward the growing roles',
        ],
      },
      {
        id: 'how-to-get-hired',
        heading: 'How to get shortlisted',
        body: [
          'Most applications fail before a human reads them. Larger Kenyan employers now filter CVs through applicant tracking software, so a [CV built around the exact keywords in the advert](/guides/accountant-cv-kenya/) is what gets you past the first gate. After that comes the human skim, and then, increasingly, an online aptitude or competency test.',
          'Prepare for the assessment stage as seriously as the interview itself. The [questions Kenyan accounting panels ask](/guides/accounting-interview-questions-kenya/), from bank reconciliations to IFRS and iTax, reward candidates who can explain their reasoning rather than recite definitions. Knowing [what the role should pay](/guides/accountant-salary-kenya/) also lets you negotiate from a position of information rather than hope.',
          'If you are early in your career, do not wait for a permanent role to appear. Attachment, internships and graduate schemes are the normal way into the profession, and the [entry level and graduate routes](/guides/entry-level-graduate-accounting-jobs-kenya/) are where most first jobs actually start.',
        ],
      },
      {
        id: 'where-to-search',
        heading: 'Where to search for accounting jobs',
        body: [
          'Most accounting vacancies in Kenya are advertised in a handful of places. General job boards carry the volume, the professional bodies and the Big Four post their graduate cohorts on their own pages, and a growing share of roles are filled through referrals and professional networks before they are ever advertised. Spreading your search across all three, rather than refreshing a single board, is what surfaces the roles other candidates miss.',
          'Company career pages are worth checking directly, especially for the banks, the Big Four, KRA and the larger NGOs, which often recruit on fixed windows. Set up alerts, apply within the first days of a posting, and keep a simple record of where and when you applied. Popular roles close quickly once they attract a full pool, so speed and organisation matter as much as the application itself.',
        ],
      },
      {
        id: 'avoid-scams',
        heading: 'How to avoid fake job adverts',
        body: [
          'A tighter market has produced more recruitment scams. Fake adverts circulate on WhatsApp, Telegram and social media promising instant hiring, then ask for a registration, training or medical fee. No legitimate Kenyan employer asks you to pay to be considered for a job.',
          'Treat any request for money, a personal mobile number instead of a company email, or pressure to act immediately as a warning sign, and check the advert against [known recruitment scam tactics](https://africacheck.org/fact-checks/meta-programme-fact-checks/steer-clear-scam-tactics-used-fake-online-ad-hundreds-jobs) before you respond. Apply through the employer or a recognised board, and browse [current accounting vacancies](/jobs) rather than clicking a link from an unsolicited message.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Are accounting jobs in demand in Kenya?',
        a: 'Yes. Accountant is one of the most advertised roles in Kenya, and finance, banking and insurance make up the largest share of professional vacancies. Competition is high, though, because the country produces far more CPA finalists and commerce graduates than there are advertised roles.',
      },
      {
        q: 'What qualifications do you need for an accounting job in Kenya?',
        a: 'Most roles ask for CPA certification, or steady progress toward it, alongside a diploma or degree in a related field. Employers increasingly value practical skills too, such as Excel, a cloud accounting package and some data analysis, on top of the qualification.',
      },
      {
        q: 'How do I get an accounting job in Kenya with no experience?',
        a: 'Start through attachment, an internship or a graduate scheme rather than waiting for a permanent role. Build a targeted CV, complete some hands on software training, and apply widely. Government routes such as the KRA attachment and the Public Service internship are reliable, documented starting points.',
      },
      {
        q: 'Which sectors hire the most accountants in Kenya?',
        a: 'Banking, insurance and SACCOs hire the most, followed by audit and advisory firms, NGOs, national and county government, manufacturing and the growing finance outsourcing sector. Nairobi carries the majority of advertised roles.',
      },
      {
        q: 'What software should an accountant in Kenya know?',
        a: 'Advanced Excel is expected almost everywhere, along with a cloud or desktop accounting package such as QuickBooks or Sage, and familiarity with KRA systems including iTax and eTIMS. Some data analysis ability is increasingly valued and helps you stand out.',
      },
      {
        q: 'How can I tell if an accounting job advert is genuine?',
        a: 'A genuine employer never asks you to pay a fee to apply, interview or be hired. Be wary of adverts that use a personal phone number instead of a company email, promise instant hiring, or pressure you to act at once. Apply through the employer or a recognised job board.',
      },
    ],
  },

  // ============================================================
  // HUB 2 - CPA
  // ============================================================
  {
    slug: 'cpa-kenya-kasneb-guide',
    title: 'CPA Kenya: The Complete KASNEB CPA Guide',
    metaTitle: 'CPA Kenya: Complete KASNEB CPA Guide',
    description:
      'Everything on becoming a CPA in Kenya: KASNEB requirements, fees, exam structure, exemptions, duration, ICPAK membership and the careers it opens.',
    lead: 'The CPA is Kenya’s flagship accounting qualification, examined by KASNEB and leading to membership of ICPAK. This guide covers the current three level structure, the entry requirements, the real cost and duration, the exemptions, and, honestly, whether it is still worth it.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'structure',
        heading: 'How the CPA course is structured now',
        body: [
          'Many older guides still describe CPA as six sections split across Part I, II and III. That is out of date. Under the revised syllabus, the qualification runs across three levels, Foundation, Intermediate and Advanced, and sits at Level 7 on the national qualifications framework. Anyone planning their studies should work from the [current CPA syllabus and structure](https://kasneb.or.ke/cpa) rather than an old section based outline.',
          'Foundation and Intermediate carry six papers each, covering financial accounting, law and governance, economics, quantitative analysis, ICT, company law, financial management, financial reporting, auditing, management accounting, and public finance and taxation. The Advanced level adds compulsory papers plus a specialisation, and now bundles an ethics component and a work simulation workshop rather than being a pure examination.',
          'In total the course is around seventeen examinable papers plus the ethics and work simulation workshops, and it carries a one year practical experience requirement. Because KASNEB reviews the syllabus periodically, confirm the exact paper list for your intake before you register.',
        ],
      },
      {
        id: 'requirements',
        heading: 'Entry requirements and how long it takes',
        body: [
          'The standard entry requirement is a KCSE mean grade of C+, or a recognised diploma. Degree holders and holders of the KASNEB diploma can also register and may qualify for exemptions from some Foundation papers.',
          'Examinations are held three times a year, in April, August and December, which means you rarely wait long for the next sitting. A focused candidate sitting a full level a year completes the examinations in about three years, with additional time for the practical experience and workshop requirements. Actual timelines vary widely with the number of papers taken per sitting, work commitments and resits, and many Kenyan candidates deliberately spread the course over a longer period while they work.',
        ],
      },
      {
        id: 'fees',
        heading: 'What the CPA course costs',
        body: [
          'Budget for three kinds of cost. There is a one off KASNEB registration fee, currently in the region of KES 7,500, an annual registration renewal, and an examination fee charged per paper that rises with each level, roughly in the low thousands per paper at Foundation and higher at Advanced. On top of KASNEB charges you will usually pay tuition to a college or online provider.',
          'Because these figures change and exemption charges apply per paper, treat the numbers here as indicative and confirm the current schedule on the official fee structures page before you budget. Reactivation fees also apply if your registration lapses, so keep your renewal current. Spread across the whole qualification, most candidates should plan for a meaningful multi year investment once tuition is included, which is part of why it pays to be clear about the return.',
        ],
      },
      {
        id: 'what-each-level-unlocks',
        heading: 'What each level unlocks',
        body: [
          'One reason to think of CPA in levels rather than as a single finish line is that each stage already carries value in the job market. Completing the Foundation level shows an employer you have the grounding for an accounts assistant or junior role. The Intermediate level, with its financial reporting, auditing and taxation papers, maps onto the work of a full accountant. The Advanced level, together with the practical experience, is what positions you for senior, specialist and management roles.',
          'This matters for anyone weighing whether to keep going. You do not have to finish the whole qualification before you start earning from it, and many Kenyan accountants work while they study, taking papers a sitting at a time. The roles each stage opens up track closely to [where the accounting vacancies actually are](/guides/accounting-finance-jobs-kenya/), so progress and employability move together rather than waiting until the very end.',
        ],
      },
      {
        id: 'exemptions',
        heading: 'Exemptions and moving across from other courses',
        body: [
          'If you already hold a degree or another qualification, you may not need to sit every paper. KASNEB grants exemptions on a paper by paper basis to holders of relevant degrees, the KASNEB diploma, ACCA and other recognised awards, which can shorten the Foundation level in particular. Exemptions are applied for through KASNEB and carry a fee per paper, so weigh the saving in time against the cost, and confirm which of your papers qualify before you register.',
          'Candidates who began under the old section based syllabus are moved across under published transition rules rather than starting again. If you paused your studies, check your standing before you re register, because the papers you have already passed usually carry forward into the current three level structure. Getting this right can save both money and a repeated sitting.',
        ],
      },
      {
        id: 'where-to-study',
        heading: 'Where to study CPA',
        body: [
          'You can prepare for CPA through a college, an online provider or by self study, and the right choice depends on how you learn and how much structure you need. Accredited colleges offer classroom or blended tuition and the discipline of a timetable, while online classes suit those balancing study with work, which is the majority of Kenyan candidates. Self study is the cheapest route and works for motivated students, though it puts the full weight of pacing and revision on you.',
          'Whatever route you pick, the examinations are the same, set and marked by KASNEB, so the value is in the teaching and support rather than the certificate at the end. Look for a provider with a strong pass record, plenty of past paper practice and tutors you can actually reach, rather than the lowest fee alone.',
        ],
      },
      {
        id: 'icpak',
        heading: 'From CPA to CPA(K): the ICPAK step',
        body: [
          'Passing the KASNEB examinations is not the end of the road. To use the CPA(K) designation and to practise, you register with [ICPAK](https://icpak.com/), the statutory body for the profession, established under the Accountants Act. ICPAK confers membership and, for those who need it, the practising certificate that allows you to sign off audits.',
          'This distinction trips up many candidates. KASNEB examines and certifies, ICPAK admits you to the profession and regulates it. Both matter, and both carry their own fees, so factor membership into your longer term budget and keep it current once you qualify.',
        ],
      },
      {
        id: 'worth-it',
        heading: 'Is CPA still worth it in Kenya?',
        body: [
          'This is the honest question behind most CPA searches, and the answer is nuanced. The qualification is still the baseline expectation for accounting roles, and without it many doors stay shut. But a CPA on its own no longer guarantees a job, because so many people now hold one and because routine processing work is being automated.',
          'What lifts the return is direction. Deciding early whether you want compliance and audit, or the faster growing analysis and investment path, and stacking the right skills on top of CPA, is what turns the qualification into a career. The [route from a first accounting role toward finance leadership](/guides/accounting-career-paths-kenya/) shows where each choice leads, and the [pay each CPA level tends to command](/guides/accountant-salary-kenya/) makes the trade offs concrete.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What are the requirements to do CPA in Kenya?',
        a: 'The minimum entry requirement is a KCSE mean grade of C+, or a recognised diploma. Degree holders and KASNEB diploma holders can also register and may qualify for exemptions from some Foundation papers.',
      },
      {
        q: 'How long does CPA take in Kenya?',
        a: 'KASNEB frames each level as about a year, so roughly three years of examinations for a steady candidate, plus time for the practical experience and workshop requirements. Timelines vary with the papers taken per sitting, work commitments and resits.',
      },
      {
        q: 'How much does the CPA course cost in Kenya?',
        a: 'Expect a one off KASNEB registration fee, an annual renewal, and examination fees charged per paper that rise by level, plus tuition if you study with a college. Fees are set and revised by KASNEB, so confirm the current schedule before budgeting.',
      },
      {
        q: 'Can I get exemptions for CPA in Kenya?',
        a: 'Yes. KASNEB grants exemptions on a paper by paper basis to holders of relevant degrees, the KASNEB diploma, ACCA and other recognised qualifications. Exemptions are applied for through KASNEB and carry a fee per paper, so confirm which of your papers qualify before registering.',
      },
      {
        q: 'How many papers and levels are in CPA Kenya?',
        a: 'The course runs across three levels, Foundation, Intermediate and Advanced. Foundation and Intermediate have six papers each, and the Advanced level adds compulsory and specialisation papers plus an ethics component and a work simulation workshop, for around seventeen examinable papers in total.',
      },
      {
        q: 'What is the difference between KASNEB and ICPAK?',
        a: 'KASNEB sets and marks the CPA examinations and certifies that you have passed. ICPAK is the professional body you join afterwards to use the CPA(K) designation and, where needed, to hold a practising certificate. You pass through KASNEB and then register with ICPAK.',
      },
      {
        q: 'When are CPA exams held in Kenya?',
        a: 'KASNEB professional examinations are held three times a year, in April, August and December, so there is no long wait between attempts.',
      },
    ],
  },

  // ============================================================
  // HUB 3 - CV
  // ============================================================
  {
    slug: 'accountant-cv-kenya',
    title: 'Accountant CV and Job Applications in Kenya',
    metaTitle: 'Accountant CV & Applications in Kenya',
    description:
      'Write an accountant CV that gets interviews in Kenya: format, ATS keywords, referees, cover letters and the mistakes that get you rejected.',
    lead: 'A strong accountant CV in Kenya now has to clear three gates before it wins an interview: the applicant tracking system that scans it, the recruiter who skims it in seconds, and a newer filter for CVs that read as if a machine wrote them. This guide shows you how to pass all three and how to write the letters that go with it.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'three-gates',
        heading: 'The three gates your CV must pass',
        body: [
          'The Kenyan hiring conversation has shifted decisively toward automated screening. Larger employers in banking, NGOs, ICT and government now run CVs through applicant tracking software before any person sees them, so a CV that is not machine readable can be rejected without a human ever opening it.',
          'The second gate is the human skim, which Kenyan recruiters put at roughly six to ten seconds. The third is new for 2026. Recruiters increasingly complain that generic, artificially generated CVs all sound the same, leaning on tired phrases like results driven professional, and they screen them out. The winning CV is therefore both machine parseable and unmistakably yours, written in specifics only you could have lived.',
        ],
      },
      {
        id: 'format',
        heading: 'The right format for a Kenyan accountant CV',
        body: [
          'Keep it to one page if you are a fresh graduate and no more than two pages once you have a few years behind you. Use a single column layout with clear headings and no tables, text boxes, graphics or icons, all of which confuse tracking software. A standard font at eleven or twelve point keeps it readable to both software and people.',
          'Follow the order Kenyan recruiters expect: contact details, a short professional summary, work experience, education, skills, certifications, and referees. Save and send it as the format the advert asks for, defaulting to a Word document for the cleanest machine parsing and a PDF where layout matters.',
        ],
        bullets: [
          'One page for graduates, up to two pages with experience',
          'Single column, no tables, graphics or icons',
          'Standard font at eleven or twelve point',
          'Contact, summary, experience, education, skills, certifications, referees',
          'Match the file format the advert requests',
        ],
      },
      {
        id: 'what-changed',
        heading: 'What to leave off a modern Kenyan CV',
        body: [
          'Older local templates still ask for a passport photo, ID number, age, religion and marital status. The current consensus among Kenyan recruiters is to drop all of these. They add nothing an employer can lawfully act on, and they date your CV. Include a photo only where the advert specifically requests one, as some government and corporate roles still do.',
          'Referees remain expected in Kenya, unlike in some other markets. List two or three professional referees, former supervisors, lecturers or senior colleagues rather than relatives, with their name, title, organisation, phone and email, or note that they are available on request.',
        ],
      },
      {
        id: 'summary-and-experience',
        heading: 'Writing the summary and experience that convince',
        body: [
          'The professional summary at the top is the first thing a recruiter reads after your name, so make it specific. Three or four lines naming your qualification, your years of experience, the areas you know such as financial reporting, tax or audit, and the kind of role you want, does far more than a generic line about being a hardworking team player. Tailor it to each advert rather than reusing one version everywhere.',
          'The work experience section wins or loses the interview. List roles in reverse order and, under each, write achievements rather than duties. Numbers make the difference, so a bullet that says you closed the monthly accounts three days faster, or cut reconciliation errors, tells an employer far more than one that says you were responsible for reconciliations. Where you are early in your career, treat [attachment and internship placements](/guides/entry-level-graduate-accounting-jobs-kenya/) as genuine experience, because to a Kenyan recruiter they are.',
        ],
      },
      {
        id: 'accountant-specifics',
        heading: 'The accountant specific content that wins',
        body: [
          'A tracking system scans your skills section first, so mirror the language of the advert. If it asks for IFRS, write both the acronym and the full form once, and do the same for tax and reconciliation terms the employer names. List six to ten skills using the exact keywords, and keep them true to what you can actually do.',
          'Prove competence with quantified, standards aware bullets rather than duties. Preparing monthly management accounts in line with [IFRS](https://www.ifrs.org/) reads far stronger than responsible for accounts, and adding a number, such as cutting reporting errors or closing the books faster, turns a claim into evidence. Where you hold a professional qualification, present your [KASNEB level and ICPAK status](/guides/cpa-kenya-kasneb-guide/) clearly so both software and reviewers pick it up, and list current membership of [ICPAK](https://icpak.com/) where you have it.',
        ],
      },
      {
        id: 'cover-letters',
        heading: 'Cover letters and application letters',
        body: [
          'Many Kenyan adverts ask for a cover letter or an application letter, and the two are not quite the same. A cover letter accompanies your CV and makes the case for why you fit a specific role in three short paragraphs. An application letter is a more formal, standalone letter that some public sector and traditional employers still expect. Read the advert and send whichever it names.',
          'Whichever you write, keep it to one page, address it to a named person where you can, and use it to connect your experience to the employer’s needs rather than repeating your CV. A short, specific letter that shows you understand the role beats a long generic one every time, and it is often the tie breaker between two similar candidates.',
        ],
      },
      {
        id: 'be-found',
        heading: 'Being found before you apply',
        body: [
          'A growing share of Kenyan finance roles are filled through referrals and recruiter searches before they are ever advertised, so a complete professional profile is part of a modern job search. A clear headline naming your qualification, an about section written in your own voice, and the same keywords you use on your CV all help recruiters find you, and turning on an open to work signal tells them you are available.',
          'None of this replaces a strong CV and solid interview preparation, but it widens the number of opportunities that reach you. Once your CV earns a call, the [questions Kenyan accounting interviews turn on](/guides/accounting-interview-questions-kenya/) are where the offer is won or lost, so treat the CV and the interview as one preparation task rather than two.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How many pages should an accountant CV be in Kenya?',
        a: 'One page for a fresh graduate and no more than two pages once you have several years of experience. Longer documents are only expected for academic, medical or research roles.',
      },
      {
        q: 'Should I include a photo, ID number or age on my Kenyan CV?',
        a: 'The modern consensus among Kenyan recruiters is to leave out your photo, ID number, age, religion and marital status. Include a photo only if the advert specifically asks for one, which some government and corporate roles still do.',
      },
      {
        q: 'What is an ATS friendly CV?',
        a: 'It is a CV that applicant tracking software can read cleanly: a single column, standard fonts, no tables, graphics or icons, and keywords that mirror the job advert. Many larger Kenyan employers filter CVs this way before a person sees them.',
      },
      {
        q: 'What is the difference between a cover letter and an application letter?',
        a: 'A cover letter accompanies your CV and briefly argues why you fit a specific role. An application letter is a more formal, standalone letter that some public sector and traditional Kenyan employers still ask for. Send whichever the advert names, and keep it to one page.',
      },
      {
        q: 'How many referees should a Kenyan CV have?',
        a: 'Two or three professional referees, such as former supervisors, lecturers or senior colleagues, with their name, title, organisation, phone and email. Avoid listing relatives or friends. You can also state that referees are available on request.',
      },
      {
        q: 'Why is my accountant CV not getting shortlisted?',
        a: 'The most common reasons are a CV that tracking software cannot read, one that does not mirror the keywords in the advert, or generic wording that fails to show how you fit the specific role. Tailor each application and lead with quantified, standards aware achievements.',
      },
    ],
  },

  // ============================================================
  // HUB 4 - Interviews
  // ============================================================
  {
    slug: 'accounting-interview-questions-kenya',
    title: 'Accounting Interview Questions and Answers in Kenya',
    metaTitle: 'Accounting Interview Questions & Answers Kenya',
    description:
      'Accounting interview questions and answers for Kenya: common, technical, audit and behavioural, plus the Big Four process and questions to ask back.',
    lead: 'Passing a Kenyan accounting interview in 2026 starts before you meet anyone. Many employers now screen with online aptitude and competency tests first, then probe your technical grounding in IFRS and tax. This guide walks through both stages, with the questions that actually come up, how to answer them, and what to do afterwards.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'before-the-interview',
        heading: 'What to expect before the interview in 2026',
        body: [
          'The single biggest change from older interview guides is that the interview is often not the first hurdle. Big Four firms and larger employers now run an online aptitude test, covering numerical, verbal and logical reasoning, before any conversation, and some use gamified or personality assessments on top. These [aptitude and psychometric tests](https://www.shl.com/) are now mainstream in Kenyan hiring, not just at the Big Four.',
          'The public sector has moved the same way. KRA runs a computer based test that mixes reasoning and situational judgement with genuine tax knowledge, including iTax, eTIMS, PAYE and VAT. Banks and consulting firms increasingly add recorded video interviews for bulk graduate screening. Prepare for the test as deliberately as the interview, because failing it means the panel never meets you.',
        ],
      },
      {
        id: 'common-questions',
        heading: 'Common and behavioural questions',
        body: [
          'The opening stretch of most interviews is predictable, which means it is winnable with preparation. Answer behavioural questions with a specific situation, the action you took and the result, rather than a general statement about yourself.',
        ],
        qa: [
          {
            q: 'Tell me about yourself and your experience as an accountant.',
            a: 'Give a ninety second arc from your qualification to your current focus, ending with why this role fits. Anchor it to the job you are interviewing for, not your whole history. A tailored [accountant CV](/guides/accountant-cv-kenya/) gives you the through line to follow here.',
          },
          {
            q: 'How do you make sure your work is accurate?',
            a: 'Describe your actual checks: reconciling to source documents, reviewing against prior periods, and a second pass before sign off. Name a time a check caught an error before it reached the accounts.',
          },
          {
            q: 'Tell me about a time you found and resolved a financial discrepancy.',
            a: 'A bank reconciliation example works well. State the size of the difference, how you traced it, and what you changed so it did not recur.',
          },
        ],
      },
      {
        id: 'technical-questions',
        heading: 'Technical questions on IFRS and tax',
        body: [
          'This is where depth beats memorised definitions, and where Kenyan panels test whether you can apply standards rather than recite them.',
        ],
        qa: [
          {
            q: 'What is the accounting equation, and name the main financial statements.',
            a: 'Assets equal liabilities plus equity. The main statements are the statement of financial position, the statement of profit or loss, the statement of cash flows and the statement of changes in equity, each answering a different question about the business.',
          },
          {
            q: 'Why must Kenyan financial statements comply with IFRS?',
            a: 'Kenya has adopted [IFRS](https://www.ifrs.org/) as the reporting framework, so compliance is what makes statements comparable and auditable, and audits themselves follow the international standards on auditing. Be ready to discuss a standard you have applied in practice.',
          },
          {
            q: 'How do you handle PAYE, VAT and withholding tax on iTax?',
            a: 'Walk through registration, computation and filing on iTax, and mention eTIMS for VAT compliance. Employers, and especially KRA, want to see that you understand the current filing process, not just the theory.',
          },
        ],
      },
      {
        id: 'more-technical',
        heading: 'More technical questions to prepare',
        body: [
          'Beyond the basics, panels for experienced roles probe the areas that commonly trip candidates up. These are standard rather than trick questions, and the way to prepare is to be able to explain each in plain terms with a real example from your work.',
        ],
        qa: [
          {
            q: 'What is depreciation, and which methods do you know?',
            a: 'Depreciation spreads the cost of an asset over its useful life. Be ready to explain the straight line and reducing balance methods, when each is used, and which your previous employer applied.',
          },
          {
            q: 'What is the difference between accruals and provisions?',
            a: 'An accrual is a known expense not yet invoiced, while a provision is an estimate set aside for a probable future cost. Panels want to hear that you understand both the timing and the judgement involved.',
          },
          {
            q: 'Explain deferred tax in simple terms.',
            a: 'Deferred tax arises from timing differences between the accounting treatment and the tax treatment of an item. An everyday example, such as depreciation differing from capital allowances, shows genuine understanding rather than memorisation.',
          },
          {
            q: 'What is materiality, and why does it matter in an audit?',
            a: 'Materiality is the threshold above which an error or omission would change a reader’s decision. It matters because it guides where an auditor focuses effort and which misstatements must be corrected.',
          },
        ],
      },
      {
        id: 'audit-and-firms',
        heading: 'Audit questions and how firms differ',
        body: [
          'Audit interviews add questions on materiality, audit risk, and the difference between internal and external audit, and the Big Four in particular put candidates through a group exercise, often a live numerical problem, before manager and partner stages that revisit your CV and motivation.',
          'Tailor your preparation to the employer. The Big Four weight the aptitude test and case work, banks and SACCOs lean on reconciliations, software and IFRS, and KRA combines a panel with its tax knowledge test. Knowing [how the major employers hire](/guides/accounting-jobs-kenya-locations-employers/) lets you rehearse the right stage. Have your own questions ready too, about career progression, CPA support and how performance is assessed, because a candidate who asks nothing reads as uninterested.',
        ],
      },
      {
        id: 'after-the-interview',
        heading: 'After the interview',
        body: [
          'The interview does not end when you leave the room. A short, courteous follow up message thanking the panel and restating your interest keeps you in mind and does no harm. If you were given a timeline, wait for it before chasing.',
          'Candidates often ask how to read the signs. Being asked about your notice period, introduced to other team members, or drawn into a longer conversation about the role are all encouraging, though none is a guarantee. Whatever the outcome, note the questions that caught you out and prepare them for next time, since similar ground comes up across [the accounting roles employers advertise](/guides/accounting-finance-jobs-kenya/).',
          'A few habits cost candidates the offer. Turning up without questions, answering in generalities instead of concrete examples, or failing the aptitude test through lack of practice are the common ones. Rehearse two or three strong stories from your own experience, sit a practice numerical test beforehand, and treat the whole process, from the online test to the partner interview, as a single performance rather than a series of separate hurdles. That preparation is what separates the shortlisted from the hired.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What questions are asked in an accounting interview in Kenya?',
        a: 'Expect a mix of behavioural questions such as tell me about yourself, technical questions on the accounting equation, financial statements, IFRS and Kenyan tax filing on iTax, and, for audit roles, questions on materiality and audit risk. Many employers add an aptitude or competency test first.',
      },
      {
        q: 'Do Kenyan employers use aptitude or psychometric tests for accountants?',
        a: 'Increasingly, yes. The Big Four, banks, larger corporates and KRA use online aptitude, numerical or psychometric tests, and sometimes recorded video interviews, before or alongside the interview. Prepare for the test as seriously as the interview itself.',
      },
      {
        q: 'How do I prepare for a KRA accounting interview?',
        a: 'KRA typically combines a panel interview with a computer based test covering reasoning, situational judgement and real tax knowledge, including iTax, eTIMS, PAYE and VAT. Revise the current filing processes, not just the theory, and prepare concise examples of your work.',
      },
      {
        q: 'What is the Big Four interview process in Kenya?',
        a: 'It usually starts with an online aptitude test, followed by a group interview that often includes a live numerical exercise, then manager and partner interviews that revisit your CV, motivation and behavioural competencies. The process can take several weeks.',
      },
      {
        q: 'What questions should I ask the interviewer?',
        a: 'Ask about career progression and CPA support, how performance and competency are assessed, the day to day shape of the role, and the interviewer’s own experience of the team. Thoughtful questions signal genuine interest.',
      },
    ],
  },

  // ============================================================
  // HUB 5 - Salary
  // ============================================================
  {
    slug: 'accountant-salary-kenya',
    title: 'Accountant Salary in Kenya: Pay by Role, Experience and CPA Level',
    metaTitle: 'Accountant Salary in Kenya: Full Guide',
    description:
      'Accountant salary in Kenya: pay by role, experience and CPA level, plus city and employer comparisons and what you actually take home after deductions.',
    lead: 'Most salary guides for Kenyan accountants quote gross pay and stop there. Since statutory deductions were overhauled across 2024 and 2025, your take home on the same salary is now lower than older articles suggest. This guide gives realistic gross ranges by role and, just as important, what actually lands in your account.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'by-role',
        heading: 'Accountant salary by role and experience',
        body: [
          'The figures below are reported ranges drawn from Kenyan salary trackers and job listings. They are monthly gross pay and vary widely with sector, city and employer, so treat them as a guide to the shape of the market rather than fixed bands.',
        ],
        bullets: [
          'Accounts clerk or ATD holder, roughly KES 15,000 to 40,000',
          'Junior accountant, roughly KES 20,000 to 70,000',
          'Assistant accountant, roughly KES 39,000 to 135,000',
          'CPA(K) accountant, commonly KES 35,000 to 90,000 to start',
          'Senior accountant, roughly KES 100,000 to 200,000',
          'Finance manager, broadly KES 150,000 to 300,000 and above',
          'Chief accountant or financial controller, roughly KES 160,000 to 250,000 and up in large firms',
        ],
      },
      {
        id: 'why-it-varies',
        heading: 'Why the same job title pays so differently',
        body: [
          'Two accountants with the same title can earn very different amounts in Kenya, and the reasons are consistent. Sector is the biggest factor, with NGOs, telcos, banks and multinationals paying well above small and medium firms. Qualification matters, since a CPA finalist commands more than someone part way through. And the size of the employer counts, because a controller in a large listed company sits in a different bracket to one in a small firm.',
          'This is why a single average figure is misleading. When you benchmark your own pay, compare like with like, the same role, sector, city and experience level, rather than a national average that blends them all together. The route from one rung to the next, and the pay step it brings, is set out in the guide to [accounting career paths in Kenya](/guides/accounting-career-paths-kenya/).',
        ],
      },
      {
        id: 'by-employer-city',
        heading: 'How pay differs by employer and city',
        body: [
          'Who you work for moves the number as much as your title. NGOs, telcos and multinationals tend to pay above small and medium firms, usually with medical cover and allowances on top. Banks and SACCOs sit in the middle to upper range. Government pay follows the salary scales, where a total package matters more than the basic, since house and commuter allowances make up a large part of it.',
          'City matters too. Nairobi pays most, reflecting the concentration of banks, the Big Four and the finance sector, with Mombasa and Kisumu some way behind. The guide to [where accountants work and which employers pay best](/guides/accounting-jobs-kenya-locations-employers/) breaks this down by sector, and the [pay each CPA level tends to unlock](/guides/cpa-kenya-kasneb-guide/) explains why the same title can pay very differently.',
        ],
      },
      {
        id: 'take-home',
        heading: 'What you actually take home in 2026',
        body: [
          'This is where older guides mislead. Three changes have cut Kenyan take home pay on the same gross salary. The National Health Insurance Fund was replaced by the Social Health Insurance Fund at 2.75 percent of gross with no cap from October 2024. The Affordable Housing Levy of 1.5 percent from the employee became permanent. And the National Social Security Fund rose to a second tier from February 2025, taking the maximum employee contribution to KES 4,320 a month.',
          'As an illustration, an accountant on a gross salary of KES 100,000 in 2026 takes home in the region of KES 70,000 to 72,000 once PAYE, the health levy, the housing levy and NSSF are taken out. The exact figure depends on the reliefs and deductions applied in the current rules, so use it as a realistic guide and confirm the live rates before relying on a precise number.',
        ],
      },
      {
        id: 'statutory-detail',
        heading: 'The deductions that shape your payslip',
        body: [
          'It helps to know each line on a Kenyan payslip and roughly what it takes. The rates below are the current statutory figures, and together they explain why take home has fallen on the same gross pay. Pay As You Earn is set out in full in [KRA’s PAYE guidance](https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye), and the health contribution is administered through the [Social Health Insurance Fund](https://sha.go.ke/).',
        ],
        bullets: [
          'Pay As You Earn, banded from 10 percent on the first KES 24,000 up to 35 percent above KES 800,000, with a monthly personal relief of KES 2,400',
          'Social Health Insurance Fund at 2.75 percent of gross pay, with no upper cap, replacing the old NHIF from October 2024',
          'Affordable Housing Levy at 1.5 percent of gross pay, matched by your employer',
          'National Social Security Fund, up to KES 4,320 a month under the tier that took effect in February 2025',
        ],
      },
      {
        id: 'earn-more',
        heading: 'How to earn more as an accountant in Kenya',
        body: [
          'If your pay has stalled, the levers are fairly predictable. Finishing your CPA and keeping your ICPAK membership current lifts you into the roles that pay more. Moving toward a better paying sector, or from a small firm to a bank, NGO or multinational, often does more for your salary than years of loyalty in the same place.',
          'Specialisation is the other lever. Tax, audit, financial analysis and roles that combine accounting with data skills tend to pay above general bookkeeping, precisely because fewer people can do them well. And when an offer comes, negotiate on the basis of researched ranges rather than a round number, since the first figure quoted is rarely the ceiling.',
          'It also pays to look past the headline salary. Medical cover, a pension above the statutory minimum, a bonus, transport and airtime allowances and paid study leave for CPA can be worth a great deal, and they differ widely between employers. When you compare two offers, weigh the whole package and the progression on offer, not just the gross figure at the top of the letter.',
          'Finally, keep your own benchmark current. Salary trackers, live job listings and conversations within your professional network give you a realistic range for your role, sector and city, so you negotiate from evidence rather than hope. Pay in Kenyan finance moves with experience and responsibility, so revisit your position every couple of years rather than letting it drift.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does an accountant earn in Kenya per month?',
        a: 'Reported ranges run from roughly KES 20,000 for junior roles to KES 100,000 to 200,000 for senior accountants, with finance managers and controllers earning more. Pay varies widely by sector, employer and city, so these are indicative ranges rather than fixed figures.',
      },
      {
        q: 'What is the starting salary of an accountant in Kenya?',
        a: 'Entry level and junior accountant pay is commonly reported between KES 20,000 and 70,000 a month, with CPA(K) holders often starting around KES 35,000 to 50,000. Audit firms sometimes start fresh graduates lower, which is a common complaint among new CPAs.',
      },
      {
        q: 'How much does a CPA holder earn in Kenya?',
        a: 'A CPA(K) accountant commonly starts around KES 35,000 to 50,000 and rises well into six figures with experience and seniority. The qualification lifts earning potential over time rather than guaranteeing a high starting salary.',
      },
      {
        q: 'What is the take home pay on a KES 100,000 salary in Kenya?',
        a: 'As an illustration, take home on a KES 100,000 gross salary in 2026 is in the region of KES 70,000 to 72,000 after PAYE, the Social Health Insurance Fund at 2.75 percent, the 1.5 percent housing levy and NSSF. The exact figure depends on the current reliefs and deductions.',
      },
      {
        q: 'Do NGOs or banks pay accountants more in Kenya?',
        a: 'NGOs, telcos and multinationals are generally reported as the top payers, usually with allowances and medical cover, while banks and SACCOs sit in the middle to upper range and small firms pay least. Nairobi pays more than other cities.',
      },
    ],
  },

  // ============================================================
  // HUB 6 - Careers
  // ============================================================
  {
    slug: 'accounting-career-paths-kenya',
    title: 'Accounting and Finance Career Paths in Kenya',
    metaTitle: 'Accounting & Finance Career Paths in Kenya',
    description:
      'Accounting and finance career paths in Kenya: the ladder from assistant to CFO, how to advance and which certifications to stack for each route.',
    lead: 'An accounting career in Kenya is no longer a single ladder. The traditional entry rungs are being automated at the same time as outsourcing and capital markets create new demand higher up. This guide maps the routes, the rungs, the certifications that fit each one, and what the first ten years usually look like, so you can choose a direction rather than drift.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'the-ladder',
        heading: 'The accounting career ladder in Kenya',
        body: [
          'The usual progression runs from accounts clerk or assistant, to accountant, to senior accountant, then finance manager, financial controller and ultimately chief finance officer. Each rung adds responsibility for judgement, people and strategy rather than just processing, and the pay steps up accordingly, which the guide to [what each level tends to earn](/guides/accountant-salary-kenya/) sets out.',
          'This shape is a useful model rather than a fixed path. Many Kenyan accountants branch sideways into tax, audit, public sector finance or consulting long before the top, and the years spent on each rung vary with sector and employer. Treating the ladder as a map of options, not a single escalator, is the healthier way to plan.',
        ],
      },
      {
        id: 'the-split',
        heading: 'Why the ladder is splitting at the bottom',
        body: [
          'The most important trend for anyone starting out is that the entry level is being pulled in two directions at once. Routine bookkeeping, payroll and data entry are exactly the tasks software now handles, so demand for pure processing roles is flattening. At the same time, Kenya’s growth as a finance and accounting outsourcing hub is creating entry level headcount serving overseas clients.',
          'The advice that follows is to move through the number processing phase quickly and toward analysis, controls and advisory, where judgement keeps you valuable. That means treating your first role as a springboard, not a destination, and building analytical skills alongside your qualification from the start rather than waiting until you are senior.',
        ],
      },
      {
        id: 'credentials',
        heading: 'Which certification for which route',
        body: [
          'The right credential depends on the branch you want. The [CPA from KASNEB](/guides/cpa-kenya-kasneb-guide/) remains the backbone for accounting, tax and audit, and the strongest choice for local and regional practice. ACCA suits those aiming at multinationals and international mobility, and many combine the two.',
          'For the investment and capital markets branch, the Certified Investment and Financial Analyst qualification is the Kenyan route, leading to [ICIFA membership](https://icifa.co.ke/), and it is increasingly in demand as the capital markets grow. The globally recognised CFA is the international step up from there. The full range of [KASNEB courses beyond CPA](https://kasneb.or.ke/) is worth understanding before you commit, because stacking the wrong credential is expensive in both time and money.',
        ],
      },
      {
        id: 'credential-comparison',
        heading: 'CPA, ACCA, CIFA and CFA compared',
        body: [
          'The credential debate dominates Kenyan accounting forums, and the honest answer is that they serve different goals. CPA is the local standard for accounting, tax and audit, and the expected qualification for most Kenyan finance roles. ACCA covers similar ground with a global brand, which helps if you plan to work abroad or for a multinational, and many people hold both.',
          'CIFA and the CFA sit on the investment side rather than the accounting side. CIFA is the Kenyan qualification for analysis, fund management and capital markets, while the CFA is its globally recognised counterpart. If your interest is investment rather than reporting and compliance, that pairing fits better than stacking more accounting papers. The practical rule is to choose the credential by the branch of the ladder you want, not by which is hardest or carries the most prestige.',
        ],
      },
      {
        id: 'specialisations',
        heading: 'Where the growth is',
        body: [
          'Compliance heavy work, straight bookkeeping and basic audit, is the most exposed to automation. The branches growing fastest are analysis and finance business partnering, investment and capital markets, advisory and consulting, and specialisms such as forensic accounting. Positioning yourself toward these, rather than toward commodity processing, is the single biggest lever on a long term accounting career in Kenya.',
          'None of this happens by accident. It starts with the [right first role and graduate route](/guides/entry-level-graduate-accounting-jobs-kenya/) and a deliberate plan to add skills each year rather than waiting to be promoted.',
        ],
      },
      {
        id: 'how-to-climb',
        heading: 'How to climb faster',
        body: [
          'Progression in Kenyan finance rewards a particular mix. Employers promote people who move beyond processing into judgement, who can explain what the numbers mean to a manager who is not an accountant, and who take on responsibility for controls, deadlines and, eventually, people. Building that reputation deliberately, rather than waiting to be noticed, is what shortens the climb.',
          'Practical steps help. Volunteer for the reporting and analysis work rather than only the routine tasks, learn the tools your seniors use, and seek exposure across the finance function so you understand more than your own corner. Pairing that with steady qualification progress and a specialisation where it fits your goal is what turns a first job into a career, especially at the [employers and sectors that invest in developing people](/guides/accounting-jobs-kenya-locations-employers/).',
        ],
      },
      {
        id: 'first-ten-years',
        heading: 'What the first ten years usually look like',
        body: [
          'For someone starting today, a realistic arc is to spend the first two or three years in a junior or assistant role learning the fundamentals, ideally while completing CPA. The middle years, roughly three to seven in, are where you become a full accountant and then a senior, taking ownership of reporting, reconciliations and parts of the audit or tax cycle, and where specialising begins to pay off.',
          'From around seven years, the paths diverge. Some move into finance management and then toward controller and finance director roles, others deepen into a specialism such as tax, audit or investment analysis, and a growing number move into advisory, consulting or the finance functions of multinationals. None of this is fixed, but treating each stage as preparation for the next, rather than a holding pattern, is what keeps a career moving.',
          'Two things speed the arc up and one slows it down. Steady qualification progress and deliberate skill building, especially in analysis and the tools your seniors rely on, move you faster, while staying too long in a pure processing role is what most often stalls a career. Reviewing your direction each year, and being willing to change employer or sector when the ladder in front of you runs out, keeps momentum on your side.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is accounting a good career in Kenya?',
        a: 'It can be, but it is competitive. Qualifications are widely held and routine processing work is being automated, so the accountants who do best choose a direction early, such as analysis, tax, audit or investment, and build skills to match rather than relying on the qualification alone.',
      },
      {
        q: 'What is the accounting career ladder in Kenya?',
        a: 'The common path runs from accounts clerk or assistant, to accountant, senior accountant, finance manager, financial controller and chief finance officer. Many accountants also branch sideways into tax, audit, public sector finance or consulting.',
      },
      {
        q: 'Which is better in Kenya, CPA or ACCA?',
        a: 'CPA is the stronger choice for local and regional practice, tax and audit, while ACCA suits careers aimed at multinationals and international mobility. They are not mutually exclusive, and combining them is common.',
      },
      {
        q: 'Is CIFA more marketable than CPA in Kenya?',
        a: 'CIFA is often described as more marketable for investment and capital markets roles, such as fund management and stockbroking, and demand is growing as the markets expand. CPA remains broader and stronger for mainstream accounting, tax and audit, so the better choice depends on the career you want.',
      },
      {
        q: 'How do I advance from accountant to finance manager in Kenya?',
        a: 'Build a track record in reporting and controls, complete your CPA, and take on responsibility for people and decisions rather than just processing. Adding analytical and business partnering skills, and gaining exposure across the finance function, is what employers look for when promoting into management.',
      },
    ],
  },

  // ============================================================
  // HUB 7 - Location / Employer
  // ============================================================
  {
    slug: 'accounting-jobs-kenya-locations-employers',
    title: 'Where Accountants Work in Kenya: Jobs by City, Sector and Top Employers',
    metaTitle: 'Where Accountants Work in Kenya: Cities & Employers',
    description:
      'Where accountants work in Kenya: jobs by city and sector plus profiles of top employers, from the Big Four and banks to SACCOs, NGOs and government.',
    lead: 'Accounting jobs in Kenya are not spread evenly. They concentrate in a handful of cities and a shortlist of employers, and in 2025 and 2026 that concentration is deepening. This guide maps where the work actually is, who the major employers are, and how location and sector shape your prospects.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'concentrating',
        heading: 'Why the jobs are concentrating',
        body: [
          'Three current forces are pulling accounting work toward a few centres. Nairobi is consolidating as a regional finance hub, with the Nairobi International Financial Centre adding certified firms and targeting new capital and jobs across fintech, investment management and capital markets. The finance and accounting outsourcing sector is growing fast, serving overseas clients from Nairobi. And the public sector has run large hiring waves, including sizeable batches of accountant and internal auditor posts.',
          'This sits against a real oversupply of qualified candidates, so where you look matters more than it used to. The paradox to plan around is that jobs exist and are being created, but they cluster in specific cities, sectors and employers rather than being available everywhere.',
        ],
      },
      {
        id: 'cities',
        heading: 'Accounting jobs by city',
        body: [
          'Nairobi dominates, home to the bank headquarters, the Big Four, the financial centre and most NGO and corporate finance functions, and it pays the most. Mombasa is the clear second, with demand around the port, logistics, shipping and tourism. Kisumu follows, with notable NGO and county government demand, while Nakuru and Eldoret are emerging regional centres driven by agriculture and county administration.',
          'Because listings concentrate in the capital, most candidates should expect to compete there, and the [live vacancies across the country](/jobs) give the clearest read on where openings are at any moment.',
        ],
      },
      {
        id: 'city-detail',
        heading: 'A closer look at each city',
        body: [
          'The character of accounting work changes from city to city, which is worth knowing if you are choosing where to build a career or willing to relocate for the right role.',
        ],
        bullets: [
          'Nairobi, the centre of gravity, with bank headquarters, the Big Four, the financial centre, NGOs, government and the outsourcing sector, and the highest pay',
          'Mombasa, driven by the port, shipping, logistics, manufacturing and tourism, and the clear second market',
          'Kisumu, with strong NGO and county government demand and a growing commercial base in the lake region',
          'Nakuru and Eldoret, emerging regional centres built on agriculture, agribusiness and county administration',
        ],
      },
      {
        id: 'employers',
        heading: 'The major accounting employers',
        body: [
          'A shortlist of employers accounts for a large share of professional accounting roles. Knowing who they are, and what they pay, helps you target rather than scatter applications.',
        ],
        bullets: [
          'The Big Four, Deloitte, PwC, KPMG and EY, all headquartered in Nairobi',
          'Banks, including Equity, KCB, Co-operative, Absa, NCBA and Standard Chartered',
          'SACCOs and the growing fintech sector',
          'NGOs and donor funded programmes, strong in Nairobi and Kisumu',
          'Government, including KRA, the National Treasury and county public service boards',
        ],
      },
      {
        id: 'big-four-and-banks',
        heading: 'The Big Four and the banks up close',
        body: [
          'The Big Four, Deloitte, PwC, KPMG and EY, are all headquartered in Nairobi and recruit in annual graduate cohorts, offering structured training, a recognised name and clear progression, with Deloitte often cited as the largest single office presence. A few years at a Big Four firm is a common launch pad into industry and advisory, even where the starting pay is modest against the workload.',
          'The major banks, including Equity, KCB, Co-operative, Absa, NCBA and Standard Chartered, run large in house finance teams and their own graduate schemes, and sit alongside a fast growing group of SACCOs and fintechs that hire accounting staff. The trade off, for anyone weighing where to aim, is usually between the training and brand of a firm and the pay and stability of a large employer, and either way a completed [CPA qualification](/guides/cpa-kenya-kasneb-guide/) is the common entry ticket.',
        ],
      },
      {
        id: 'public-sector-ngos',
        heading: 'Public sector, NGOs and where hiring is growing',
        body: [
          'Beyond the private sector, the national and county governments are among the largest employers of accountants and internal auditors, hiring through published vacancies and salary scales, and the Kenya Revenue Authority recruits both professionals and attachés. Recent public sector hiring waves have included large batches of accountant and auditor posts, which makes government a realistic target rather than a fallback.',
          'NGOs and donor funded programmes add a distinct market, strong in Nairobi and Kisumu, that prizes donor compliance and reporting skills and often pays competitively. Between the public sector drives, the financial centre and the outsourcing sector, the pattern for 2026 is that hiring is real but concentrated, so knowing where to look is half the job.',
        ],
      },
      {
        id: 'choosing-where-to-build',
        heading: 'Choosing where to build your career',
        body: [
          'For most accountants the honest advice is to start where the training and volume are, which usually means Nairobi, and to specialise once you know which branch of finance suits you. The capital offers the widest range of employers, the structured graduate schemes and the fastest progression, which is why so many careers begin there even if they do not stay.',
          'That said, a strong accountant is employable across the country, and the regional centres can offer faster responsibility and a lower cost of living. If you are weighing a move, look at the sector mix of the city, the named employers hiring there, and whether the role stretches you, rather than the location alone. Relocating for the right graduate scheme or a Big Four cohort is often worth it early on, when the training compounds for the rest of your career.',
        ],
      },
      {
        id: 'pay-and-sector',
        heading: 'How employer choice shapes pay and entry',
        body: [
          'Employer type drives both pay and how you get in. NGOs, telcos and multinationals tend to pay best, banks and the Big Four offer structured progression, and government roles follow published scales but come with allowances. The [full breakdown of accountant pay by employer and city](/guides/accountant-salary-kenya/) makes the differences concrete.',
          'The profession’s footprint is genuinely national. ICPAK reports members across all 47 counties, and the [Institute of Certified Public Accountants of Kenya](https://icpak.com/) is present well beyond Nairobi, even though the densest hiring is in the capital. Labour market context, including employment trends by industry, is published by the [Kenya National Bureau of Statistics](https://www.knbs.or.ke/) for those who want the wider picture. To convert this into applications, the guide to [how to get hired in the Kenyan accounting market](/guides/accounting-finance-jobs-kenya/) is the practical next step.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Where are most accounting jobs in Kenya?',
        a: 'Nairobi carries the large majority of advertised accounting roles, followed by Mombasa and Kisumu, with Nakuru and Eldoret emerging. Nairobi also pays the most, reflecting the concentration of banks, the Big Four and the finance sector.',
      },
      {
        q: 'Which companies hire the most accountants in Kenya?',
        a: 'The Big Four audit firms, the major banks, SACCOs and fintechs, NGOs and donor programmes, and national and county government are the largest employers of accountants. Manufacturers and the growing finance outsourcing sector also hire steadily.',
      },
      {
        q: 'Which employer pays accountants best in Kenya?',
        a: 'NGOs, telcos and multinationals are generally reported as the top payers, often with allowances and medical cover. Banks and the Big Four offer strong structured progression, while government roles follow published scales plus allowances.',
      },
      {
        q: 'Are there accounting jobs outside Nairobi?',
        a: 'Yes. Mombasa has demand around the port, logistics and tourism, Kisumu has NGO and county government roles, and Nakuru and Eldoret are growing regional centres. The volume is smaller than Nairobi, but the roles are real, and the profession has members in all 47 counties.',
      },
      {
        q: 'Is it worth working for the Big Four in Kenya?',
        a: 'The Big Four offer structured training, a recognised name and clear progression, which is valuable early in a career, though starting pay can be modest relative to the workload. Many accountants use a few years there as a springboard into industry or advisory roles.',
      },
    ],
  },

  // ============================================================
  // HUB 8 - Entry-level
  // ============================================================
  {
    slug: 'entry-level-graduate-accounting-jobs-kenya',
    title: 'Entry-Level and Graduate Accounting Jobs in Kenya: Internships, Attachment and First Roles',
    metaTitle: 'Entry-Level & Graduate Accounting Jobs in Kenya',
    description:
      'Entry-level and graduate accounting jobs in Kenya: attachment, internships, graduate schemes and how to land your first role with no experience.',
    lead: 'Almost no accountant in Kenya starts with a permanent job. The normal way in is attachment, an internship or a graduate scheme, and knowing the difference, which ones actually pay, and how to turn a placement into a career is half the battle. This guide maps every route into the profession.',
    kind: 'hub',
    updated: '2026-07-13',
    sections: [
      {
        id: 'attachment-vs-internship',
        heading: 'Attachment, internship and graduate scheme',
        body: [
          'Kenyans treat these as distinct, and the distinction matters. Attachment is a placement taken while you are still a student, usually part of your course, often unpaid or paying only a small stipend. An internship is normally taken after graduation, tends to run longer, and is more likely to carry a stipend. A graduate or management trainee scheme is a structured entry job at a bank or large firm, and is the closest thing to a first real role.',
          'The practical rule many advisers give is to pursue the one that fits your stage, an attachment while studying and an internship or graduate scheme after, rather than stacking them without direction.',
        ],
      },
      {
        id: 'who-pays',
        heading: 'Who actually pays, and how much',
        body: [
          'The honest picture is mixed. Many private firms pay attachés and interns little or nothing, treating the placement as training. The reliably paid routes are in the public sector, which is why they are worth targeting first.',
          'The KRA industrial attachment pays a stipend of around KES 7,000 a month to students, applied for through the authority’s e-recruitment portal, and it runs intakes across the year. The Public Service internship programme, aimed at graduates, pays around KES 25,000 a month for a twelve month placement. Both are documented and competitive, and the gap between the two, a student stipend versus a graduate stipend, is a useful marker of how much your stage of study changes the offer.',
        ],
        bullets: [
          'KRA industrial attachment, around KES 7,000 a month for students, applied via the KRA e-recruitment portal',
          'Public Service internship programme, around KES 25,000 a month for graduates, twelve months',
          'Bank and Big Four graduate schemes, structured roles with their own application windows',
          'Private firm attachments and internships, often little or no pay',
        ],
      },
      {
        id: 'graduate-schemes',
        heading: 'Graduate and management trainee schemes',
        body: [
          'The step up from attachment and internships is the structured graduate or management trainee scheme, and these are the closest thing to a guaranteed first real job. Banks run some of the best known, such as multi year management trainee programmes that rotate you through departments, and the Big Four recruit graduate associates into assurance and advisory on fixed term contracts that often convert to permanent roles.',
          'These schemes are competitive and run on fixed windows, usually asking for a recent graduate with a strong class of degree and, increasingly, progress on a professional qualification. They rarely publish a stipend in advance, so judge them on the structure, training and progression they offer rather than a headline number, and apply the moment applications open, because the windows are short.',
        ],
      },
      {
        id: 'what-employers-look-for',
        heading: 'What employers look for in a first hire',
        body: [
          'With no track record to judge, employers hiring for entry level roles weight a few things heavily. A relevant degree or diploma and progress on CPA show you can do the technical work. Practical exposure, even a short attachment, tells them you have seen a real finance function. And the softer signals, reliability, communication and a willingness to learn, matter more than most graduates expect, because a manager is taking a chance on your potential rather than your history.',
          'This is why the graduates who get hired are rarely just the ones with the best grades. They are the ones who can point to something concrete, a placement, a software skill, a problem they solved, and who come across as easy to train and quick to take responsibility. Building those signals deliberately, while you are still studying, is what shortens the wait for a first offer.',
        ],
      },
      {
        id: 'how-to-apply',
        heading: 'How to apply and where to look',
        body: [
          'Government routes run through official portals. The KRA attachment is applied for on the authority’s [e-recruitment portal](https://www.kra.go.ke/) during each intake window, and the graduate internship runs through the [Public Service Commission](https://www.publicservice.go.ke/). Bank and Big Four graduate schemes each publish their own dates on their careers pages, so track them and apply as soon as they open, since windows are short.',
          'Because intake dates rotate, verify the current window before you rely on it. For private sector entry level roles and internships, browse [current openings on the job board](/jobs) alongside the government programmes.',
        ],
      },
      {
        id: 'making-it-count',
        heading: 'Making your attachment count',
        body: [
          'An attachment or internship is only as valuable as what you do with it, so treat it as an extended interview. Volunteer for real work, learn the systems the team uses, and build relationships with the people who could later recommend you. A strong reference and a genuine skill picked up on placement are often worth more than the stipend itself.',
          'Keep a record of what you actually did, the software you used, the reports you touched, the problems you solved, because that becomes the experience section of your next application, and the evidence that lifts you toward [the pay a permanent role brings](/guides/accountant-salary-kenya/). Turning a placement into an offer, or into a CV that finally gets shortlisted, is the whole point.',
        ],
      },
      {
        id: 'first-job',
        heading: 'Breaking the no experience deadlock',
        body: [
          'The catch is familiar. Employers want experience, and you cannot get experience without a job. Attachment and internships are the accepted way to break it, and a placement that you turn into a strong reference is often worth more than the stipend.',
          'Give yourself the best chance at each stage. A tailored [graduate accountant CV](/guides/accountant-cv-kenya/) gets you past the screening, and preparing for the [attachment and internship interview](/guides/accounting-interview-questions-kenya/) turns the placement into an offer. You do not need to have finished CPA to start, but steady progress on the [CPA qualification](/guides/cpa-kenya-kasneb-guide/) alongside your first role signals commitment to employers.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between attachment and internship in Kenya?',
        a: 'Attachment is a placement taken while you are still a student, usually part of your course and often unpaid or paying a small stipend. An internship is normally taken after graduation, runs longer and is more likely to carry a stipend. A graduate scheme is a structured entry job at a bank or large firm.',
      },
      {
        q: 'Do interns and attachés get paid in Kenya?',
        a: 'It varies. Many private firms pay little or nothing, treating the placement as training. Government routes are the reliably paid ones: the KRA attachment pays around KES 7,000 a month to students, and the Public Service internship pays around KES 25,000 a month to graduates.',
      },
      {
        q: 'How much does the KRA attachment pay?',
        a: 'The KRA industrial attachment pays a stipend of around KES 7,000 a month, applied for through the KRA e-recruitment portal. KRA runs several intakes across the year, so confirm the current window and stipend before applying.',
      },
      {
        q: 'How do I get an accounting job in Kenya with no experience?',
        a: 'Start with attachment, an internship or a graduate scheme rather than waiting for a permanent role. Target the reliably paid government programmes first, build a strong graduate CV, prepare for the interview, and make steady progress on CPA alongside your first placement.',
      },
      {
        q: 'Do you need CPA to get an entry level accounting job in Kenya?',
        a: 'Not to start. You can begin through attachment or an internship while still studying, but steady progress on CPA strengthens your applications and is expected as you move toward permanent roles. Employers value a mix of qualification progress and practical placement experience.',
      },
    ],
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
export const getGuide = (slug: string): Guide | undefined => GUIDE_MAP[slug];
