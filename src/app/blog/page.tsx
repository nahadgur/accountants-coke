import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PUBLISHED_SPOKES } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Accounting career guides in Kenya',
  description:
    'Practical guides for accounting careers in Kenya: how to break into entry-level roles, write a CV that gets shortlisted, prepare for interviews, and take the CPA course.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Accounting Career Guides
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        How to qualify, get shortlisted and land accounting jobs in Kenya, with
        the live roles a click away when you’re ready to apply.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PUBLISHED_SPOKES().map((g) => (
          <Link
            key={g.slug}
            href={`/blog/${g.slug}`}
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
