import type { Metadata } from 'next';
import Link from 'next/link';
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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft"
          >
            <span className="text-sm font-semibold leading-snug text-navy-800">
              {s.name}
            </span>
            <Icon
              name={s.facts[0]?.icon ?? 'file'}
              className="h-5 w-5 shrink-0 text-brand-600"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
