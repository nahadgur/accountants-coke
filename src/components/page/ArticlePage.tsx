import type { Article } from '@/data/content';
import { getService } from '@/data/services';
import {
  PageHero,
  JumpNav,
  MatchCTA,
  ActionCTA,
  FaqAccordion,
  Prose,
  ProsRow,
  renderInline,
  type Pro,
} from '@/components/page/blocks';
import {
  getServicePros,
  faqJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
} from '@/lib/seo';

const BASE = 'https://accountants.co.ke';

export type SectionMeta = { label: string; base: string };

/**
 * Shared renderer for every editorial article page (guides, careers,
 * grow-your-practice). `section` sets the breadcrumb/canonical root.
 * CTA selection:
 *  - relatedService set (guides) -> service-aware MatchCTA + matching pros row
 *  - cta.kind 'match'            -> prefilled MatchCTA
 *  - cta.kind 'jobs'|'claim'|'link' -> plain ActionCTA (claim opens ClaimModal)
 */
export async function ArticlePage({
  article,
  section,
}: {
  article: Article;
  section: SectionMeta;
}) {
  const url = `${BASE}${section.base}/${article.slug}`;

  const service = article.relatedService
    ? getService(article.relatedService)
    : undefined;
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

  const cta = article.cta;

  return (
    <article className="shell py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({
              title: article.title,
              description: article.description,
              updated: article.updated,
              url,
            }),
            faqJsonLd(article.faqs),
            breadcrumbJsonLd([
              { name: 'Home', url: `${BASE}/` },
              { name: section.label, url: `${BASE}${section.base}` },
              { name: article.title, url },
            ]),
          ]),
        }}
      />

      <PageHero
        breadcrumb={[
          { label: section.label, href: section.base },
          { label: article.title },
        ]}
        title={article.title}
        lead={article.lead}
      />

      <div className="mt-10">
        <JumpNav
          items={[
            ...article.sections.map((s) => ({ label: s.heading, id: s.id })),
            { label: 'FAQ', id: 'faq' },
          ]}
        />
      </div>

      {article.sections.map((sec, i) => (
        <div key={sec.id}>
          <section id={sec.id} className="scroll-mt-28">
            <Prose>
              <h2>{sec.heading}</h2>
              {sec.body.map((p, j) => (
                <p key={j}>{renderInline(p)}</p>
              ))}
              {sec.bullets && (
                <ul>
                  {sec.bullets.map((b) => (
                    <li key={b}>{renderInline(b)}</li>
                  ))}
                </ul>
              )}
            </Prose>
          </section>
          {i === 0 && (
            <div className="my-10">
              {service ? (
                <MatchCTA
                  body={`Rather hand it to a pro? Get matched with a verified ${service.noun}, free.`}
                  ctaLabel="Get matched"
                  matchService={service.specialization ?? undefined}
                  matchLabel={service.name}
                />
              ) : cta && cta.kind === 'match' ? (
                <MatchCTA
                  title={cta.title}
                  body={cta.body}
                  points={cta.points}
                  ctaLabel={cta.ctaLabel}
                  href={cta.href}
                  matchService={cta.matchService}
                  matchLabel={cta.matchLabel}
                  matchLocation={cta.matchLocation}
                />
              ) : cta ? (
                <ActionCTA
                  title={cta.title}
                  body={cta.body}
                  points={cta.points}
                  ctaLabel={cta.ctaLabel}
                  href={cta.href}
                  claim={cta.kind === 'claim'}
                />
              ) : (
                <MatchCTA
                  body="Get matched with a verified accountant, free."
                  ctaLabel="Get matched"
                />
              )}
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
          <FaqAccordion items={article.faqs} />
        </div>
      </section>
    </article>
  );
}
