import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PUBLISHED_HUBS } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Accounting career guides in Kenya',
  description:
    'Practical guides to accounting and finance careers in Kenya: CPA, salaries, CVs, interviews, career paths, top employers and how to get hired.',
  alternates: { canonical: '/guides' },
};

export default function GuidesIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Accounting Career Guides
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Clear, current guidance on building an accounting and finance career in
        Kenya, from qualifying to getting hired, with the live jobs a click away.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PUBLISHED_HUBS().map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            {g.heroImage && (
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={g.heroImage}
                  alt={g.heroImageAlt ?? g.title}
                  width={700}
                  height={394}
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
