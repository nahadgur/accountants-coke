import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MobileNav } from '@/components/layout/MobileNav';
import { NavSegments } from '@/components/layout/NavSegments';
import { MatchModal } from '@/components/match/MatchModal';
import { ClaimModal } from '@/components/firms/ClaimModal';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://accountants.co.ke'),
  title: {
    default: 'Accountants.co.ke — Hire Kenya’s Top Accountants',
    template: '%s · Accountants.co.ke',
  },
  description:
    'Find and hire verified CPA-K, ACCA and CIFA accountants and firms across Kenya. Browse accounting jobs and get matched with the right professional.',
  openGraph: {
    type: 'website',
    siteName: 'Accountants.co.ke',
    locale: 'en_KE',
  },
  robots: { index: true, follow: true },
  verification: { google: 'u_yqaID2LILSgeM31wfmceaY5uwrgVZO3BFOq1Rl4U4' },
};

const SITE_URL = 'https://accountants.co.ke';

// Brand identity graph so Google can resolve the site name + a sitelinks
// search box pointing at the directory.
const SITE_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Accountants.co.ke',
    publisher: { '@id': `${SITE_URL}/#org` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/directory?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: 'Accountants.co.ke',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      'Kenya’s directory of verified CPA-K, ACCA and CIFA accounting firms and professionals, with private client matching.',
    areaServed: 'KE',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-KE" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-mark.png"
                alt="Accountants.co.ke"
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
              <span className="font-display text-lg font-extrabold tracking-tight text-navy-900">
                Accountants
                <span className="text-brand-600">.co.ke</span>
              </span>
            </Link>

            <NavSegments />

            <div className="hidden items-center gap-2 md:flex">
              {/* Sign in hidden for now — restore when auth is live.
              <Link
                href="/login"
                className="whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-navy-900"
              >
                Sign in
              </Link>
              */}
              {/* Was "List your practice" -> /login. Repointed to the public
                  claim flow while auth/dashboard is hidden. */}
              <Link
                href="/directory"
                className="whitespace-nowrap rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
              >
                Claim your firm
              </Link>
            </div>

            <MobileNav />
          </div>
        </header>

        {/* Subscriber-acquisition strip — tight full-width on mobile, contained card on desktop */}
        <div className="border-b border-brand-200/50 bg-brand-50 sm:border-0 sm:bg-transparent sm:px-6 sm:pt-4 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:rounded-2xl sm:border sm:border-brand-200/70 sm:bg-gradient-to-r sm:from-brand-50 sm:via-brand-50 sm:to-brand-100/50 sm:px-5 sm:py-3 sm:shadow-soft">
            <div className="flex min-w-0 items-center gap-3">
              <span className="hidden shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200 sm:inline-block">
                For pros
              </span>
              <p className="min-w-0 text-[13px] leading-tight text-navy-800 sm:text-sm sm:leading-normal">
                <span className="font-semibold text-navy-900">
                  Accountants &amp; firms
                </span>
                <span className="hidden sm:inline">
                  {' '}
                  — list your practice and get matched with paying clients across
                  Kenya.
                </span>
                <span className="sm:hidden"> — get matched with clients.</span>
              </p>
            </div>
            {/* Was "Get listed" -> /dashboard/upgrade. Repointed to the public
                claim flow while billing/dashboard is hidden. */}
            <Link
              href="/directory"
              className="group inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-brand-700 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm sm:shadow-soft sm:hover:-translate-y-0.5"
            >
              Get listed
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>

        <main id="main" className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-slate-200 bg-navy-950 text-slate-300">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo-mark.png"
                    alt="Accountants.co.ke"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <span className="font-display text-lg font-extrabold tracking-tight text-white">
                    Accountants<span className="text-brand-400">.co.ke</span>
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                  Kenya’s marketplace for verified CPA-K, ACCA and CIFA
                  professionals and firms, with a job board and private client
                  matching.
                </p>
              </div>

              <FooterCol
                title="For clients"
                links={[
                  { href: '/directory', label: 'Find a firm' },
                  { href: '/match', label: 'Get matched' },
                  // 'Tax guides' (/guides) hidden for now.
                ]}
              />
              {/* "List your practice" (/login) and "Premium plans"
                  (/dashboard/upgrade) removed while auth/billing is hidden. */}
              <FooterCol
                title="For firms"
                links={[
                  { href: '/directory', label: 'Claim your firm' },
                  { href: '/directory', label: 'Firms directory' },
                  // 'Tax guides' (/guides) hidden for now.
                ]}
              />
              <FooterCol
                title="Explore"
                links={[
                  { href: '/jobs', label: 'Accounting jobs' },
                  { href: '/services', label: 'Services' },
                  { href: '/directory', label: 'Firms directory' },
                ]}
              />
            </div>

            <div className="mt-12 border-t border-white/10 pt-6">
              <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {[
                  { href: '/about', label: 'About' },
                  { href: '/how-it-works', label: 'How it works' },
                  { href: '/faq', label: 'FAQ' },
                  { href: '/contact', label: 'Contact' },
                  { href: '/privacy', label: 'Privacy' },
                  { href: '/terms', label: 'Terms' },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-slate-400 transition-colors hover:text-brand-400"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Accountants.co.ke. All rights reserved.</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </footer>
        <MatchModal />
        <ClaimModal />
      </body>
    </html>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-slate-300 transition-colors hover:text-brand-400"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
