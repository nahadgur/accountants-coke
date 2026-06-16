import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'Accounting services in Kenya',
  description:
    'Browse accounting services in Kenya and get matched with a verified CPA-K, ACCA or CIFA professional, free.',
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Accounting Services in Kenya
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Pick what you need and we’ll connect you with verified CPA-K, ACCA and
        CIFA professionals who handle it.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            <span className="icon-tile h-11 w-11">
              <Icon name={s.facts[0]?.icon ?? 'file'} />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold text-navy-900">
              {s.name}
            </h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
              {s.lead('Kenya').slice(0, 110)}…
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-brand-700">
              Find a {s.noun}
              <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
