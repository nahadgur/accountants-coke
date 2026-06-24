import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROUNDUPS, getRoundup } from '@/data/bestFirms';
import { queryDirectory, buildDirectoryHref, type DirectoryFilters } from '@/lib/directory';
import {
  PageHero,
  JumpNav,
  MatchCTA,
  FaqAccordion,
  Prose,
  ProsRow,
  renderInline,
  type Pro,
} from '@/components/page/blocks';
import { faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo';

const BASE = 'https://accountants.co.ke';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ROUNDUPS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRoundup((await params).slug);
  if (!r) return { title: 'Not found' };
  return {
    title: r.metaTitle ?? r.title,
    description: r.description,
    alternates: { canonical: `/best/${r.slug}` },
  };
}

function listingHeading(segmentLabel: string, location: string | null): string {
  const base = segmentLabel.startsWith('for')
    ? `ICPAK-licensed firms ${segmentLabel}`
    : `ICPAK-licensed ${segmentLabel}`;
  return location ? `${base} in ${location}` : base;
}

export default async function RoundupPage({ params }: Props) {
  const r = getRoundup((await params).slug);
  if (!r) notFound();

  const filters: DirectoryFilters = {
    q: null,
    location: r.location,
    town: r.town ?? null,
    specialization: r.specialization,
    certification: null,
    page: 1,
  };
  const { profiles } = await queryDirectory(filters);
  const pros: Pro[] = profiles.slice(0, 6).map((p) => ({
    initial: p.full_name.charAt(0),
    name: p.full_name,
    cert: p.certification_type ?? 'CPA',
    loc: [p.town, p.location].filter(Boolean).join(', '),
    premium: p.design_tier === 'premium' && p.monthly_subscription_active,
    bio: p.bio ?? '',
    tags: p.specializations.slice(0, 2),
    href: `/directory/${p.slug ?? p.id}`,
  }));

  const dirHref = buildDirectoryHref(filters, {});
  const heading = listingHeading(r.segmentLabel, r.location);
  const url = `${BASE}/best/${r.slug}`;

  const jsonLd: object[] = [
    faqJsonLd(r.faqs),
    breadcrumbJsonLd([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Best firms', url: `${BASE}/best` },
      { name: r.title, url },
    ]),
  ];
  if (pros.length > 0) {
    jsonLd.push(
      itemListJsonLd(
        pros.map((p) => ({ name: p.name, url: `${BASE}${p.href}` })),
        url,
      ),
    );
  }

  return (
    <article className="shell py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        breadcrumb={[{ label: 'Best firms', href: '/best' }, { label: r.title }]}
        title={r.title}
        lead={r.lead}
        primary={{ label: 'Get matched', href: '/match' }}
        secondary={{ label: 'Browse directory', href: dirHref }}
      />

      <div className="mt-10">
        <JumpNav
          items={[
            { label: 'How to choose', id: 'choose' },
            { label: 'The firms', id: 'firms' },
            ...(r.notableFirms ? [{ label: 'Largest firms', id: 'notable' }] : []),
            { label: 'FAQ', id: 'faq' },
          ]}
        />
      </div>

      <section id="choose" className="scroll-mt-28">
        <Prose>
          <h2>How to choose</h2>
          {r.criteria.map((c) => (
            <div key={c.heading}>
              <h3>{c.heading}</h3>
              {c.body.map((p, j) => (
                <p key={j}>{renderInline(p)}</p>
              ))}
            </div>
          ))}
        </Prose>
      </section>

      <div className="my-10">
        <MatchCTA
          body="Tell us what you need and we’ll match you privately with up to three verified firms, free."
          ctaLabel="Get matched for free"
          matchService={r.specialization ?? undefined}
          matchLabel={r.specialization ?? undefined}
          matchLocation={r.location ?? undefined}
        />
      </div>

      <section id="firms" className="mt-12 scroll-mt-28">
        {pros.length > 0 ? (
          <>
            <ProsRow
              heading={heading}
              sub="Verified, ICPAK-licensed firms you can compare."
              pros={pros}
              href={dirHref}
            />
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-500">
              Firms are drawn from the ICPAK register. Subscribed members appear
              first, then other firms by how long they have been listed. The order
              is not a quality ranking or an endorsement. Always confirm a firm’s
              current ICPAK standing before you engage them.
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              We’re verifying more firms in this category. Tell us what you need
              and we’ll match you privately with up to three, or browse the full
              directory.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/match"
                data-match
                data-match-service={r.specialization ?? undefined}
                data-match-location={r.location ?? undefined}
                className="inline-flex items-center rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Get matched
              </Link>
              <Link
                href={dirHref}
                className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50"
              >
                Browse the directory
              </Link>
            </div>
          </div>
        )}
      </section>

      {r.notableFirms && (
        <section id="notable" className="mt-12 scroll-mt-28">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
            The largest firms in this category
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Named here for context, not as a ranking or recommendation.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {r.notableFirms.map((f) => (
              <li
                key={f.name}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft"
              >
                <p className="font-display text-lg font-bold text-navy-900">
                  {f.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {f.fact}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="faq" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          Common Questions
        </h2>
        <div className="mt-5 max-w-3xl">
          <FaqAccordion items={r.faqs} />
        </div>
      </section>
    </article>
  );
}
