import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { PUBLISHED_HUBS, getGuide } from '@/data/guides';
import {
  PageHero,
  MatchCTA,
  FaqAccordion,
  Prose,
} from '@/components/page/blocks';
import { faqJsonLd, articleJsonLd } from '@/lib/seo';

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const label = m[1]; const href = m[2];
    if (href.startsWith('/')) {
      out.push(<Link key={`il-${k++}`} href={href}>{label}</Link>);
    } else {
      out.push(<a key={`il-${k++}`} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PUBLISHED_HUBS().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g || g.draft || g.kind === 'spoke') return { title: 'Guide not found' };
  return {
    title: g.metaTitle ?? g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g || g.draft || g.kind === 'spoke') notFound();

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
        breadcrumb={[{ label: 'Career Guides', href: '/guides' }, { label: g.title }]}
        title={g.title}
        lead={g.lead}
      />

      {g.sections.map((sec, i) => (
        <div key={sec.id}>
          <section id={sec.id} className="scroll-mt-28">
            <Prose>
              <h2>{sec.heading}</h2>
              {sec.body.map((p, j) => (
                <p key={j}>{renderInline(p)}</p>
              ))}
              {sec.qa?.flatMap((item, j) => [
                <h3 key={`q-${j}`}>{renderInline(item.q)}</h3>,
                <p key={`a-${j}`}>{renderInline(item.a)}</p>,
              ])}
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
              <MatchCTA
                title="Looking for your next accounting role?"
                body="Browse current accounting and finance vacancies across Kenya and apply directly. Free to search."
                points={['Fresh listings', 'Apply directly', 'No fee to search']}
                ctaLabel="Browse accounting jobs"
                href="/jobs"
              />
            </div>
          )}
        </div>
      ))}

      <section id="faq" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          Common Questions
        </h2>
        <div className="mt-5">
          <FaqAccordion items={g.faqs} />
        </div>
      </section>
    </article>
  );
}
