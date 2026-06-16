import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SERVICES, getService } from '@/data/services';
import { LOCATIONS } from '@/data/locations';
import { getGuide } from '@/data/guides';
import {
  PageHero,
  JumpNav,
  FactGrid,
  MatchCTA,
  FaqAccordion,
  Prose,
} from '@/components/page/blocks';
import { ProfileCard } from '@/components/directory/ProfileCard';
import { Button } from '@/components/ui/button';
import { Icon } from '@/lib/icons';
import { titleCase } from '@/lib/utils';
import { getServicePros, faqJsonLd } from '@/lib/seo';

export const revalidate = 300;

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).service);
  if (!s) return { title: 'Service not found' };
  return {
    title: `${s.name} Accountants in Kenya`,
    description: s.metaDesc,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

function locationHref(specialization: string | null, loc: (typeof LOCATIONS)[number]) {
  const p = new URLSearchParams();
  if (specialization) p.set('specialization', specialization);
  if (loc.type === 'area') {
    p.set('location', 'Nairobi');
    p.set('town', loc.name);
  } else {
    p.set('location', loc.name);
  }
  return `/directory?${p.toString()}`;
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).service);
  if (!s) notFound();

  const pros = await getServicePros(s.specialization);
  const guide = s.relatedGuide ? getGuide(s.relatedGuide) : undefined;

  return (
    <article className="shell py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(s.faqs)) }}
      />

      <PageHero
        breadcrumb={[{ label: 'Services', href: '/services' }, { label: s.name }]}
        title={`${s.name} Accountants in Kenya`}
        lead={s.lead('Kenya')}
        primary={{ label: 'Get matched', href: '/match' }}
        secondary={{ label: 'Browse directory', href: '/directory' }}
      />

      <div className="mt-10">
        <JumpNav
          items={[
            { label: 'The Essentials', id: 'essentials' },
            { label: 'What It Covers', id: 'about' },
            { label: 'Accountants', id: 'accountants' },
            { label: 'By Location', id: 'locations' },
            { label: 'FAQ', id: 'faq' },
          ]}
        />
      </div>

      <section id="essentials" className="scroll-mt-28">
        <FactGrid
          facts={s.facts.map((f) => ({
            icon: <Icon name={f.icon} />,
            label: f.label,
            sub: f.sub,
          }))}
        />
      </section>

      <div id="about" className="mt-12 scroll-mt-28">
        <Prose>
          {s.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </div>

      <div className="my-10">
        <MatchCTA
          body={`Tell us what you need and we’ll connect you with up to 3 verified ${s.noun}s, free.`}
          ctaLabel="Get matched for free"
        />
      </div>

      <section id="accountants" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          {titleCase(`Verified ${s.noun}s`)}
        </h2>
        {pros.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pros.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-600">
              No {s.noun}s listed here yet. Get matched and we’ll find one for you.
            </p>
            <Link href="/match" className="mt-4 inline-block">
              <Button variant="brand">
                Get matched <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      <section id="locations" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          {titleCase(`Find a ${s.noun} Near You`)}
        </h2>
        <p className="mt-1 text-slate-600">Browse verified professionals by area.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={locationHref(s.specialization, loc)}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              {loc.name}
            </Link>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
          Common Questions
        </h2>
        <div className="mt-5 max-w-3xl">
          <FaqAccordion items={s.faqs} />
        </div>
        {guide && (
          <p className="mt-6 text-sm text-slate-600">
            Want the full picture?{' '}
            <Link
              href={`/guides/${guide.slug}`}
              className="font-semibold text-brand-700 hover:underline"
            >
              Read our {guide.title.toLowerCase()}
            </Link>
            .
          </p>
        )}
      </section>
    </article>
  );
}
