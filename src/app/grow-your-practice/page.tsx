import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';
import { PRACTICE } from '@/data/practice';

export const metadata: Metadata = {
  title: 'Grow your accounting practice',
  description:
    'Guides for Kenyan accounting firms: how to get clients, start a practice, and market within ICPAK rules. Claim your firm’s listing to get found by clients.',
  alternates: { canonical: '/grow-your-practice' },
};

export default function PracticeIndex() {
  return (
    <div className="shell py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900">
        Grow Your Accounting Practice
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">
        Practical guidance for Kenyan accounting firms on winning clients and
        building a practice. Already qualified?{' '}
        <Link
          href="/directory"
          data-claim
          className="font-semibold text-brand-700 hover:underline"
        >
          Claim your firm’s listing
        </Link>{' '}
        and get found by clients.
      </p>

      <Link
        href="/directory"
        data-claim
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
      >
        <Building2 className="h-4 w-4" />
        Claim your firm
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PRACTICE.map((p) => (
          <Link
            key={p.slug}
            href={`/grow-your-practice/${p.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
          >
            <h2 className="font-display text-xl font-bold text-navy-900">
              {p.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {p.description}
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
