import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ApplyForm } from './ApplyForm';

type PageProps = { params: Promise<{ id: string }> };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const metadata = { title: 'Apply', robots: { index: false } };

export default async function ApplyPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const column = UUID_RE.test(id) ? 'id' : 'slug';
  const { data: job } = await supabase
    .from('job_postings')
    .select('id, title, direct_employer, firm:firms(name)')
    .eq(column, id)
    .maybeSingle();

  if (!job) notFound();
  const employer =
    (job as { firm?: { name?: string } }).firm?.name ??
    (job as { direct_employer?: string }).direct_employer ??
    'this employer';

  return (
    <div className="shell max-w-lg py-12">
      <Link href={`/jobs/${id}`} className="text-sm text-slate-500 hover:underline">
        ← Back to job
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-bold text-navy-900">
        Apply: {(job as { title: string }).title}
      </h1>
      <p className="mb-6 text-sm text-slate-500">at {employer}</p>
      <ApplyForm jobId={(job as { id: string }).id} />
    </div>
  );
}
