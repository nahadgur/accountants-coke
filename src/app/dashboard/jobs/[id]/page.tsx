import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils';
import type { JobPosting } from '@/lib/types';

type PageProps = { params: Promise<{ id: string }> };

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string | null;
  cover_note: string | null;
  cv_url: string | null;
  status: string;
  created_at: string;
}

export const metadata = { title: 'Manage job', robots: { index: false } };

export default async function ManageJobPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUser();
  const supabase = await createClient();

  const { data: job } = await supabase
    .from('job_postings')
    .select('*')
    .eq('id', id)
    .eq('posted_by', user!.id)
    .maybeSingle();

  if (!job) notFound();
  const j = job as JobPosting;

  // RLS: only the job owner can read these.
  const { data: apps } = await supabase
    .from('job_applications')
    .select('*')
    .eq('job_id', id)
    .order('created_at', { ascending: false });
  const applications = (apps as Application[]) ?? [];

  return (
    <div>
      <Link href="/dashboard/jobs" className="text-sm text-slate-500 hover:underline">
        ← All jobs
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-navy-900">{j.title}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {applications.length} application{applications.length === 1 ? '' : 's'}
      </p>

      {applications.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No applications yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {applications.map((a) => (
            <li key={a.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy-900">{a.applicant_name}</h2>
                <Badge variant="neutral">{a.status}</Badge>
              </div>
              <p className="mt-0.5 text-sm text-slate-600">
                <a className="text-navy-700 hover:underline" href={`mailto:${a.applicant_email}`}>
                  {a.applicant_email}
                </a>
                {a.applicant_phone && ` · ${a.applicant_phone}`} · {timeAgo(a.created_at)}
              </p>
              {a.cover_note && (
                <p className="mt-2 text-sm text-slate-700">{a.cover_note}</p>
              )}
              {a.cv_url && (
                <a
                  href={a.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-navy-700 hover:underline"
                >
                  View CV →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
