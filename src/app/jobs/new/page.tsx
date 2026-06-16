import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';
import { JobForm } from './JobForm';

export const metadata: Metadata = {
  title: 'Post a job',
  robots: { index: false },
};

export default async function NewJobPage() {
  await requireUser();
  return (
    <div className="shell max-w-2xl py-12">
      <h1 className="text-2xl font-bold tracking-tight text-navy-900">
        Post an accounting job
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Reach thousands of CPA-K, ACCA and CIFA professionals across Kenya.
      </p>
      <JobForm />
    </div>
  );
}
