import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils';
import type { JobPosting } from '@/lib/types';

export const metadata = { title: 'My jobs', robots: { index: false } };

export default async function MyJobsPage() {
  const user = await getUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from('job_postings')
    .select('*')
    .eq('posted_by', user!.id)
    .order('created_at', { ascending: false });
  const jobs = (data as JobPosting[]) ?? [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">My job postings</h1>
        {/* Post a job hidden for now — paid checkout not live yet.
        <Link
          href="/jobs/new"
          className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Post a job
        </Link>
        */}
      </div>

      {jobs.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          You haven’t posted any jobs yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => {
            const expired = new Date(job.expires_at) < new Date();
            return (
              <li
                key={job.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jobs/${job.slug ?? job.id}`}
                      className="font-semibold text-navy-900 hover:underline"
                    >
                      {job.title}
                    </Link>
                    {job.is_featured && <Badge variant="featured">Featured</Badge>}
                    {expired && <Badge variant="neutral">Expired</Badge>}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {job.applications_count} application
                    {job.applications_count === 1 ? '' : 's'} · posted{' '}
                    {timeAgo(job.created_at)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/jobs/${job.id}`}
                  className="text-sm font-medium text-navy-700 hover:underline"
                >
                  Manage →
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
