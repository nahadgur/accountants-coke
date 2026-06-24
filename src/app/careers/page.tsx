import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { CAREERS } from '@/data/careers';

export const metadata: Metadata = {
  title: 'Accounting careers in Kenya',
  description:
    'How to build an accounting career in Kenya: becoming a CPA through KASNEB, joining the Big Four, what accountants earn, and where to find jobs.',
  alternates: { canonical: '/careers' },
};

export default function CareersIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Accounting Careers in Kenya
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        How to qualify, who is hiring, and what to expect, for students and
        accountants building a career in Kenya. Ready to move?{' '}
        <Link href="/jobs" className="font-semibold text-brand-700 hover:underline">
          Browse current jobs
        </Link>
        .
      </p>

      <Link
        href="/jobs"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
      >
        <Briefcase className="h-4 w-4" />
        Browse accounting jobs
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CAREERS.map((c) => (
          <Link
            key={c.slug}
            href={`/careers/${c.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            <h2 className="font-display text-xl font-bold text-navy-900">
              {c.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {c.description}
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
