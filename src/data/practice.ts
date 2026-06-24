import type { Article } from '@/data/content';

// Grow-Your-Practice track: content for accounting firms and practitioners.
// Each article funnels to the firm "claim your listing" flow (ClaimModal) and
// the directory, which grows the supply side of the marketplace. Kenya-specific
// and within ICPAK's professional-conduct rules on advertising.
//
// Flagship `how-to-get-accounting-clients-in-kenya` is fully written; the other
// two pillars are honest starting points, expanded later.

const listFirmCta = {
  kind: 'claim' as const,
  title: 'Get found by clients searching for an accountant',
  body: 'Claim your firm’s listing on Kenya’s accountant directory so businesses looking for your services can find and contact you.',
  ctaLabel: 'Claim your firm',
  href: '/directory',
  points: ['Free to claim', 'Verified against the ICPAK register', 'Get found by clients'],
};

export const PRACTICE: Article[] = [
  {
    slug: 'how-to-get-accounting-clients-in-kenya',
    title: 'How to Get Accounting Clients in Kenya',
    metaTitle: 'How to Get Accounting Clients in Kenya (2026)',
    description:
      'Practical ways for a Kenyan accounting firm to win clients: referrals, niching, getting found online, and listing where businesses search, within ICPAK rules.',
    lead: 'Winning clients as an accounting firm in Kenya comes down to trust and visibility. This guide covers the channels that actually bring in work, and how to stay within ICPAK’s professional-conduct rules while you market.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'foundations',
        heading: 'Start With What Earns Trust',
        body: [
          'Accountancy is a trust purchase, so the firms that grow are the ones that are easy to trust quickly. That starts with being clear about who you serve and what you do: a firm that says it handles tax and bookkeeping for SACCOs, or VAT for importers, is far more memorable than a generic "we do all accounting" listing.',
          'Make your credentials obvious. Your ICPAK good standing and, where relevant, your practising certificate are exactly what a cautious client is looking for before they hand over their books. Put them front and centre wherever a prospect meets you.',
        ],
      },
      {
        id: 'referrals',
        heading: 'Referrals and Reputation',
        body: [
          'Most accounting work in Kenya still comes through referral. The lever you control is giving existing clients a reason to refer: be responsive, hit filing deadlines, and explain things plainly. A client who never worries about KRA penalties tells other business owners about you.',
          'Build referral relationships sideways too. Lawyers, company-secretarial firms, banks and SACCOs all meet businesses that need an accountant. A reliable two-way referral arrangement with a few of them can be worth more than any advert.',
        ],
      },
      {
        id: 'get-found',
        heading: 'Get Found Online',
        body: [
          'When a referral is not to hand, businesses search. They look on Google, on Google Maps, and on directories for an accountant near them or for a specialism. If you are not visible in those places, you are invisible to that demand.',
          'The basics: a clean Google Business Profile with correct details, a simple website that states your services, location and credentials, and a presence on the directories clients actually use. The aim is that when someone searches for what you do, in your town, you come up.',
        ],
      },
      {
        id: 'directory',
        heading: 'List Where Clients Are Searching',
        body: [
          'Accountants.co.ke is built around exactly that search. Businesses come here to find and contact verified firms, and to be matched privately with accountants for a specific need. Your firm may already be listed from the ICPAK register, unclaimed.',
          'Claiming your listing is free and is verified against the ICPAK register. Once claimed you can add your contact details, services and team so prospects reach you directly. Claim your firm below to make sure you are visible when a client is looking.',
        ],
      },
      {
        id: 'compliance',
        heading: 'Market Within ICPAK Rules',
        body: [
          'ICPAK members must market within the Institute’s professional-conduct rules. In practice that means keeping every claim truthful and verifiable, not disparaging other firms, and maintaining professional dignity rather than hard-sell tactics.',
          'Above all, never invent reviews, credentials or results. Fabricated testimonials are both an ethics breach and, increasingly, a consumer-protection risk. Honest, specific proof, a named client win you are allowed to cite, a real turnaround, will always outperform an invented one.',
        ],
      },
    ],
    faqs: [
      { q: 'How do accounting firms get clients in Kenya?', a: 'Mostly through referrals and reputation, supported by being easy to find online: a Google Business Profile, a clear website, and listings on the directories businesses use to find verified accountants.' },
      { q: 'Can accountants advertise in Kenya?', a: 'Yes, within ICPAK’s professional-conduct rules. Marketing must be truthful and not misleading, must not disparage other firms, and must maintain professional dignity.' },
      { q: 'How do I list my firm on Accountants.co.ke?', a: 'Find your firm in the directory (many are already listed from the ICPAK register) and claim it. Claiming is free and is verified against the ICPAK register, after which you can add your details and services.' },
      { q: 'Is claiming my firm’s listing free?', a: 'Yes. Claiming and verifying your listing is free. Paid options exist for extra visibility and matched client leads, but the listing itself costs nothing.' },
    ],
    cta: listFirmCta,
  },
  {
    slug: 'how-to-start-an-accounting-practice-in-kenya',
    title: 'How to Start an Accounting Practice in Kenya',
    metaTitle: 'How to Start an Accounting Firm in Kenya (2026)',
    description:
      'What it takes to set up your own accounting firm in Kenya: the ICPAK practising certificate, registering the business, and finding your first clients.',
    lead: 'Going out on your own as an accountant in Kenya has a clear regulatory gate and then a commercial one. This guide outlines what you need in place before you can practise, and how to land the first clients.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'practising-certificate',
        heading: 'The Practising Certificate Comes First',
        body: [
          'To offer accountancy or audit services to the public in your own name in Kenya, you need a practising certificate from ICPAK, not just full membership. That requires CPA(K) membership in good standing, additional supervised audit experience, an up-to-date CPD record and professional references.',
          'Confirm the current requirements and fees directly with ICPAK before you commit, and make sure your CPD is current, because a gap there is one of the common reasons an application stalls.',
        ],
      },
      {
        id: 'set-up',
        heading: 'Set Up and Find Your First Clients',
        body: [
          'With the certificate in hand, register your business, sort out a basic engagement-letter and professional-indemnity setup, and decide on a focus. A clear niche makes a new firm far easier to market than a general one.',
          'Then make yourself findable. Claim your firm’s listing in the directory, set up a Google Business Profile, and tap your existing network for the first few engagements. Our guide to [how to get accounting clients in Kenya](/grow-your-practice/how-to-get-accounting-clients-in-kenya) covers the channels in depth.',
        ],
      },
    ],
    faqs: [
      { q: 'Do I need a practising certificate to start an accounting firm in Kenya?', a: 'Yes. To offer accountancy or audit services to the public in your own name you need an ICPAK practising certificate, which requires full membership plus additional supervised audit experience.' },
      { q: 'Can I start a practice straight after qualifying as CPA(K)?', a: 'Not immediately for public practice. Full membership lets you work in employment, but the practising certificate needed to serve the public requires further supervised experience first.' },
    ],
    cta: listFirmCta,
  },
  {
    slug: 'marketing-an-accounting-firm-in-kenya',
    title: 'Marketing an Accounting Firm in Kenya',
    metaTitle: 'Marketing an Accounting Firm in Kenya (2026)',
    description:
      'The marketing channels that work for Kenyan accounting firms, from Google and directories to content and referrals, kept within ICPAK’s conduct rules.',
    lead: 'Marketing an accounting firm is less about advertising spend and more about being consistently visible and credible where clients look. Here are the channels that work in Kenya, within ICPAK’s rules.',
    updated: '2026-06-24',
    sections: [
      {
        id: 'channels',
        heading: 'The Channels That Work',
        body: [
          'For most Kenyan firms the highest-return channels are a strong Google Business Profile, a clear website built around your services and location, listings on directories clients use, and a steady referral habit. Content that answers real client questions, and a measured presence on LinkedIn, compound over time.',
          'Pick two or three channels and do them properly rather than spreading thin. A claimed directory listing plus a tidy Google profile already puts you ahead of many firms that rely on word of mouth alone.',
        ],
      },
      {
        id: 'rules',
        heading: 'Keep It Honest and Compliant',
        body: [
          'Whatever channel you use, market within ICPAK’s professional-conduct rules: truthful claims, no disparagement of competitors, and professional dignity. Never fabricate reviews or credentials.',
          'Measure what actually brings enquiries, double down there, and drop what does not. To start, claim your firm’s listing so the demand already searching this site can reach you.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the best way to market an accounting firm in Kenya?', a: 'A combination of being easy to find (Google Business Profile, website, directory listings) and being easy to trust (clear credentials, referrals, honest proof). Focus on a few channels done consistently.' },
      { q: 'Are there rules on how accountants market in Kenya?', a: 'Yes. ICPAK members must keep marketing truthful and not misleading, avoid disparaging other firms, and maintain professional dignity. Fabricated reviews or credentials are not allowed.' },
    ],
    cta: listFirmCta,
  },
];

export const PRACTICE_MAP = Object.fromEntries(PRACTICE.map((p) => [p.slug, p]));
export const getPractice = (slug: string): Article | undefined => PRACTICE_MAP[slug];
