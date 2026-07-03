import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PUBLISHED_GUIDES } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Kenya tax & accounting guides',
  description:
    'Practical, current guides on Kenyan tax and accounting: rental income tax, eTIMS, VAT and more, for businesses and individuals.',
  alternates: { canonical: '/guides' },
};

export default function GuidesIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Tax &amp; Accounting Guides
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Clear, current guidance on Kenyan tax and compliance, and a verified
        accountant to hand it to when you’re ready.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PUBLISHED_GUIDES().map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            <h2 className="font-display text-xl font-bold text-navy-900">
              {g.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {g.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-brand-700">
              Read the guide
              <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
