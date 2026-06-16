import type { Metadata } from 'next';
import { MatchWizard } from '@/components/match/MatchWizard';

export const metadata: Metadata = {
  title: 'Match Me With an Accountant',
  description:
    'Answer a few questions and we’ll connect you with the right verified accountant in Kenya for tax, audit, bookkeeping or corporate finance.',
};

export default function MatchPage() {
  return (
    <div className="shell max-w-xl py-12">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-navy-900">
          Find the Right Accountant
        </h1>
        <p className="mt-2 text-slate-500">
          Tell us what you need. We’ll route your request privately to up to
          three matching specialists.
        </p>
      </div>
      <MatchWizard />
    </div>
  );
}
