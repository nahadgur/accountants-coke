import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { EmploymentType, JobWithFirm } from '@/lib/types';

type PageProps = { params: Promise<{ id: string }> };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getJob(idOrSlug: string): Promise<JobWithFirm | null> {
  const supabase = await createClient();
  const column = UUID_RE.test(idOrSlug) ? 'id' : 'slug';
  const { data } = await supabase
    .from('job_postings')
    .select('*, firm:firms(id,name,logo_url,website,location)')
    .eq(column, idOrSlug)
    .maybeSingle();
  return (data as JobWithFirm) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const job = await getJob((await params).id);
  if (!job) return { title: 'Job not found' };
  const employer = job.firm?.name ?? job.direct_employer ?? 'Employer';
  return {
    title: `${job.title} at ${employer}`,
    description: job.description.slice(0, 155),
  };
}

// Google for Jobs employmentType vocabulary.
const EMPLOYMENT_TYPE_MAP: Record<EmploymentType, string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Internship: 'INTERN',
  Temporary: 'TEMPORARY',
};

/** Build schema.org JobPosting JSON-LD that satisfies Google Jobs’ required
 *  and recommended fields. Salary and identifier are emitted only when present
 *  to avoid invalid empty values. */
function buildJobPostingJsonLd(job: JobWithFirm) {
  const employer = job.firm?.name ?? job.direct_employer ?? 'Confidential';

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    validThrough: job.expires_at,
    employmentType: EMPLOYMENT_TYPE_MAP[job.employment_type],
    identifier: {
      '@type': 'PropertyValue',
      name: employer,
      value: job.id,
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: employer,
      ...(job.firm?.website ? { sameAs: job.firm.website } : {}),
      ...(job.firm?.logo_url ? { logo: job.firm.logo_url } : {}),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.town ?? job.location,
        addressRegion: job.location,
        addressCountry: 'KE',
      },
    },
  };

  if (job.salary_range_min || job.salary_range_max) {
    jsonLd.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: job.salary_currency,
      value: {
        '@type': 'QuantitativeValue',
        ...(job.salary_range_min ? { minValue: job.salary_range_min } : {}),
        ...(job.salary_range_max ? { maxValue: job.salary_range_max } : {}),
        unitText: 'MONTH',
      },
    };
  }

  return jsonLd;
}

export default async function JobDetailPage({ params }: PageProps) {
  const job = await getJob((await params).id);
  if (!job) notFound();

  const employer = job.firm?.name ?? job.direct_employer ?? 'Employer';
  const jsonLd = buildJobPostingJsonLd(job);

  return (
    <article className="shell max-w-3xl py-12">
      {/* Structured data for Google Jobs / AI Overviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
            {job.firm?.logo_url ? (
              <Image
                src={job.firm.logo_url}
                alt={employer}
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-400">
                {employer.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{job.title}</h1>
            <p className="text-slate-600">{employer}</p>
          </div>
          {job.is_featured && (
            <span className="ml-auto rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
              Featured
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="rounded bg-slate-100 px-2.5 py-1">
            {[job.town, job.location].filter(Boolean).join(', ')}
          </span>
          <span className="rounded bg-slate-100 px-2.5 py-1">
            {job.employment_type}
          </span>
          {job.specialization && (
            <span className="rounded bg-slate-100 px-2.5 py-1">
              {job.specialization}
            </span>
          )}
        </div>

        <div className="prose prose-slate mt-6 max-w-none whitespace-pre-line">
          {job.description}
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <a
            href={`/jobs/${job.id}/apply`}
            className="inline-block rounded-md bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-800"
          >
            Apply now
          </a>
        </div>
      </div>
    </article>
  );
}
