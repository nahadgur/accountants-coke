import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const iconName = s.facts[0]?.icon ?? 'file';
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft sm:rounded-2xl sm:hover:shadow-lift"
            >
              {/* Image placeholder — tablet/desktop only */}
              <div className="relative hidden aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-slate-50 to-slate-100 sm:flex">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 text-brand-600 shadow-soft ring-1 ring-brand-100 backdrop-blur">
                  <Icon name={iconName} className="h-7 w-7" />
                </span>
                <span className="absolute bottom-2 right-3 inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <ImageIcon className="h-3.5 w-3.5" />
                  Image
                </span>
              </div>

              {/* Body */}
              <div className="flex items-center justify-between gap-2 px-4 py-4 sm:flex-col sm:items-start sm:gap-1 sm:px-5">
                <div className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug text-navy-800 sm:text-base sm:font-bold sm:text-navy-900">
                    {s.name}
                  </span>
                  <span className="mt-0.5 hidden text-sm leading-snug text-slate-500 sm:block">
                    {s.facts[0]?.sub}
                  </span>
                </div>

                {/* mobile: inline icon */}
                <Icon
                  name={iconName}
                  className="h-5 w-5 shrink-0 text-brand-600 sm:hidden"
                />

                {/* desktop: learn-more affordance */}
                <span className="mt-2 hidden items-center gap-1 text-sm font-semibold text-brand-700 sm:inline-flex">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
