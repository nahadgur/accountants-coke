import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerifiedMark } from '@/components/ui/VerifiedMark';

/* ============================================================
   Reusable editorial money-page template blocks.
   Sidebar-free: navigation is a top "jump" chip row, the match
   CTA lives inline in the content. Used by service / niche /
   location pages and pillar guides.
   ============================================================ */

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-x-2 text-sm text-slate-500">
      {items.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {c.href ? (
            <Link href={c.href} className="hover:text-navy-700">
              {c.label}
            </Link>
          ) : (
            <span className="text-navy-700">{c.label}</span>
          )}
          {i < items.length - 1 && <span className="text-slate-300">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  breadcrumb,
  title,
  lead,
  primary,
  secondary,
}: {
  breadcrumb?: Crumb[];
  title: string;
  lead: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <header className="max-w-4xl">
      {breadcrumb && <Breadcrumbs items={breadcrumb} />}
      <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{lead}</p>
      {(primary || secondary) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {primary && (
            <Link href={primary.href}>
              <Button variant="brand" size="lg">
                {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {secondary && (
            <Link href={secondary.href}>
              <Button variant="outline" size="lg">
                {secondary.label}
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export function JumpNav({ items }: { items: { label: string; id: string }[] }) {
  return (
    <div className="sticky top-16 z-30 -mx-4 mb-10 border-y border-slate-200 bg-white/90 px-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-2">
      <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="inline-block whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-900"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FactGrid({
  facts,
}: {
  facts: { icon: React.ReactNode; label: string; sub: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {facts.map((f) => (
        <div
          key={f.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft"
        >
          <span className="icon-tile h-10 w-10">{f.icon}</span>
          <p className="mt-3 font-display text-lg font-extrabold text-navy-900">
            {f.label}
          </p>
          <p className="text-xs text-slate-500">{f.sub}</p>
        </div>
      ))}
    </div>
  );
}

export function MatchCTA({
  title = 'Get Matched for Free',
  body,
  points = ['CPA-K verified', 'No fee to you', 'Replies within 24h'],
  ctaLabel = 'Get matched',
  href = '/match',
  tone = 'dark',
  matchService,
  matchLabel,
  matchLocation,
}: {
  title?: string;
  body: string;
  points?: string[];
  ctaLabel?: string;
  href?: string;
  tone?: 'dark' | 'light';
  matchService?: string;
  matchLabel?: string;
  matchLocation?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div
      className={[
        'rounded-2xl p-6 sm:p-7',
        dark
          ? 'bg-navy-900 text-white'
          : 'border border-slate-200 bg-white shadow-soft',
      ].join(' ')}
    >
      <h3 className={dark ? 'font-display text-xl font-bold text-white' : 'font-display text-xl font-bold text-navy-900'}>
        {title}
      </h3>
      <p className={dark ? 'mt-1.5 text-sm text-slate-300' : 'mt-1.5 text-sm text-slate-600'}>
        {body}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {points.map((p) => (
          <li
            key={p}
            className={dark ? 'flex items-center gap-1.5 text-slate-200' : 'flex items-center gap-1.5 text-slate-700'}
          >
            <Check className="h-4 w-4 text-brand-500" /> {p}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        data-match
        data-match-service={matchService}
        data-match-label={matchLabel}
        data-match-location={matchLocation}
        className="mt-5 inline-block"
      >
        <Button variant={dark ? 'brand' : 'primary'} size="lg">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export type Pro = {
  initial: string;
  name: string;
  cert: string;
  loc: string;
  premium?: boolean;
  bio: string;
  tags: string[];
  href?: string;
};

export function ProsRow({
  heading,
  sub,
  pros,
  href,
}: {
  heading: string;
  sub?: string;
  pros: Pro[];
  href?: string;
}) {
  return (
    <section>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
            {heading}
          </h2>
          {sub && <p className="mt-1 text-slate-600">{sub}</p>}
        </div>
        {href && (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-brand-700"
          >
            See all
            <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pros.map((p) => (
          <Link
            key={p.name}
            href={p.href ?? '/directory'}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-display font-bold text-slate-400">
                  {p.initial}
                </span>
                <div className="min-w-0">
                  <span className="flex items-center gap-1.5 font-display text-sm font-bold text-navy-900">
                    <span className="truncate">{p.name}</span>
                    <VerifiedMark className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs text-slate-500">
                    <span className="font-semibold text-brand-700">{p.cert}</span> · {p.loc}
                  </span>
                </div>
              </div>
              {p.premium && <span className="badge badge-premium shrink-0">Premium</span>}
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-slate-600">{p.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
            {f.q}
            <span className="text-xl leading-none text-brand-600 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Editorial body typography wrapper for guide prose. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-none space-y-4 text-[1.0625rem] leading-relaxed text-slate-700 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-navy-900 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy-900 [&_a]:font-semibold [&_a]:text-brand-700 [&_a:hover]:underline [&_strong]:text-navy-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
      {children}
    </div>
  );
}
