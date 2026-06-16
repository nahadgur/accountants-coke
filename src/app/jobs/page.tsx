import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import type { JobWithFirm } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Accounting Jobs in Kenya',
  description:
    'Browse the latest accounting, audit, tax and finance jobs across Kenya. Featured roles from top firms updated daily.',
};

export const revalidate = 120;

function salaryBadge(job: JobWithFirm): string | null {
  const { salary_range_min: min, salary_range_max: max, salary_currency } = job;
  const fmt = (n: number) => `${salary_currency} ${(n / 1000).toFixed(0)}k`;
  if (min && max) return `${fmt(min)}–${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return null;
}

export default async function JobsPage() {
  let jobs: JobWithFirm[] = [];
  try {
    const supabase = await createClient();
    // Featured first, then newest. Matches idx_jobs_feed.
    const { data } = await supabase
      .from('job_postings')
      .select('*, firm:firms(id,name,logo_url,website,location)')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50);
    jobs = (data as JobWithFirm[]) ?? [];
  } catch {
    jobs = [];
  }

  return (
    <div className="shell max-w-3xl py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">
            Accounting Jobs
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {jobs.length} open role{jobs.length === 1 ? '' : 's'} across Kenya.
          </p>
        </div>
        <Link
          href="/jobs/new"
          className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Post a job
        </Link>
      </div>

      <ul className="space-y-3">
        {jobs.map((job) => {
          const badge = salaryBadge(job);
          const employer = job.firm?.name ?? job.direct_employer ?? 'Employer';
          return (
            <li key={job.id}>
              <Link
                href={`/jobs/${job.slug ?? job.id}`}
                className={[
                  'flex items-start gap-4 rounded-xl border bg-white p-5 transition-all',
                  job.is_featured
                    ? 'border-gold-500/40 ring-1 ring-gold-500/20 hover:shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm',
                ].join(' ')}
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {job.firm?.logo_url ? (
                    <Image
                      src={job.firm.logo_url}
                      alt={employer}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-semibold text-slate-400">
                      {employer.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate font-semibold text-navy-900">
                      {job.title}
                    </h2>
                    {job.is_featured && (
                      <span className="badge badge-featured shrink-0">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{employer}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded bg-slate-100 px-2 py-0.5">
                      {[job.town, job.location].filter(Boolean).join(', ')}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5">
                      {job.employment_type}
                    </span>
                    {badge && (
                      <span className="rounded bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
