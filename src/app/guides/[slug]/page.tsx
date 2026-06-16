import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide } from '@/data/guides';
import { getService } from '@/data/services';
import {
  PageHero,
  JumpNav,
  MatchCTA,
  FaqAccordion,
  Prose,
  ProsRow,
  type Pro,
} from '@/components/page/blocks';
import { getServicePros, faqJsonLd, articleJsonLd } from '@/lib/seo';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return { title: 'Guide not found' };
  return {
    title: g.metaTitle ?? g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();

  const service = g.relatedService ? getService(g.relatedService) : undefined;
  const profiles = service ? await getServicePros(service.specialization, 3) : [];
  const pros: Pro[] = profiles.map((p) => ({
    initial: p.full_name.charAt(0),
    name: p.full_name,
    cert: p.certification_type ?? 'CPA',
    loc: [p.town, p.location].filter(Boolean).join(', '),
    premium: p.design_tier === 'premium' && p.monthly_subscription_active,
    bio: p.bio ?? '',
    tags: p.specializations.slice(0, 2),
    href: `/directory/${p.slug ?? p.id}`,
  }));

  return (
    <article className="shell py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({
              title: g.title,
              description: g.description,
              updated: g.updated,
              url: `https://accountants.co.ke/guides/${g.slug}`,
            }),
            faqJsonLd(g.faqs),
          ]),
        }}
      />

      <PageHero
        breadcrumb={[{ label: 'Guides', href: '/guides' }, { label: g.title }]}
        title={g.title}
        lead={g.lead}
      />

      <div className="mt-10">
        <JumpNav
          items={[
            ...g.sections.map((s) => ({ label: s.heading, id: s.id })),
            { label: 'FAQ', id: 'faq' },
          ]}
        />
      </div>

      {g.sections.map((sec, i) => (
        <div key={sec.id}>
          <section id={sec.id} className="scroll-mt-28">
            <Prose>
              <h2>{sec.heading}</h2>
              {sec.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {sec.bullets && (
                <ul>
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </Prose>
          </section>
          {i === 0 && (
            <div className="my-10">
              <MatchCTA
                body={
                  service
                    ? `Rather hand it to a pro? Get matched with a verified ${service.noun}, free.`
                    : 'Get matched with a verified accountant, free.'
                }
                ctaLabel="Get matched"
              />
            </div>
          )}
        </div>
      ))}

      {pros.length > 0 && service && (
        <section className="mt-12">
          <ProsRow
            heading={`${service.name} Accountants`}
            sub="Verified CPA-K, ACCA and CIFA professionals who handle this."
            pros={pros}
            href={`/services/${service.slug}`}
          />
        </section>
      )}

      <section id="faq" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          Common Questions
        </h2>
        <div className="mt-5 max-w-3xl">
          <FaqAccordion items={g.faqs} />
        </div>
      </section>
    </article>
  );
}
