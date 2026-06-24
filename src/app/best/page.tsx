import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ROUNDUPS } from '@/data/bestFirms';

export const metadata: Metadata = {
  title: 'Best accounting firms in Kenya by need',
  description:
    'How to choose the right accounting firm in Kenya for your situation, by sector and location, and compare verified ICPAK-licensed firms.',
  alternates: { canonical: '/best' },
};

export default function BestIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Choosing an Accounting Firm in Kenya
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        How to pick the right firm for your situation, by sector and location,
        with verified ICPAK-licensed firms to compare. Prefer we do it for you?{' '}
        <Link
          href="/match"
          data-match
          className="font-semibold text-brand-700 hover:underline"
        >
          Get matched free
        </Link>
        .
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ROUNDUPS.map((r) => (
          <Link
            key={r.slug}
            href={`/best/${r.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            <h2 className="font-display text-xl font-bold text-navy-900">
              {r.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {r.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-brand-700">
              How to choose
              <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
