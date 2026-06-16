import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import type { Firm, JobPosting } from '@/lib/types';

type PageProps = { params: Promise<{ id: string }> };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getFirm(idOrSlug: string): Promise<Firm | null> {
  const supabase = await createClient();
  const column = UUID_RE.test(idOrSlug) ? 'id' : 'slug';
  const { data } = await supabase
    .from('firms')
    .select('*')
    .eq(column, idOrSlug)
    .eq('is_published', true)
    .maybeSingle();
  return (data as Firm) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const firm = await getFirm((await params).id);
  if (!firm) return { title: 'Firm not found' };
  return {
    title: firm.name,
    description:
      firm.description?.slice(0, 155) ??
      `${firm.name}, accounting firm in ${firm.location}, Kenya.`,
  };
}

export default async function FirmDetailPage({ params }: PageProps) {
  const firm = await getFirm((await params).id);
  if (!firm) notFound();

  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from('job_postings')
    .select('*')
    .eq('firm_id', firm.id)
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });
  const openings = (jobs as JobPosting[]) ?? [];

  return (
    <article className="shell max-w-3xl py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            {firm.logo_url ? (
              <Image src={firm.logo_url} alt={firm.name} fill sizes="64px" className="object-contain p-1.5" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-400">
                {firm.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
              {firm.name}
              {firm.premium_status && <Badge variant="premium">Premium</Badge>}
            </h1>
            <p className="text-sm text-slate-500">
              {[firm.town, firm.location].filter(Boolean).join(', ')}
            </p>
            {firm.website && (
              <a
                href={firm.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-navy-700 hover:underline"
              >
                {firm.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>

        {firm.description && (
          <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
            {firm.description}
          </p>
        )}

        {openings.length > 0 && (
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Open roles
            </h2>
            <ul className="space-y-2">
              {openings.map((job) => (
                <li key={job.id}>
                  <Link
                    href={`/jobs/${job.slug ?? job.id}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm hover:border-slate-300"
                  >
                    <span className="font-medium text-navy-900">{job.title}</span>
                    <span className="text-slate-500">{job.employment_type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
