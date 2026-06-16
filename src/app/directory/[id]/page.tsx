import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { DirectoryProfile, JobPosting } from '@/lib/types';

type PageProps = { params: Promise<{ id: string }> };

// Accepts either a slug or a UUID in [id].
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getProfile(idOrSlug: string): Promise<DirectoryProfile | null> {
  const supabase = await createClient();
  const column = UUID_RE.test(idOrSlug) ? 'id' : 'slug';
  const { data } = await supabase
    .from('public_directory_profiles')
    .select('*')
    .eq(column, idOrSlug)
    .maybeSingle();
  return (data as DirectoryProfile) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const profile = await getProfile((await params).id);
  if (!profile) return { title: 'Profile not found' };
  return {
    title: `${profile.full_name}${
      profile.certification_type ? `, ${profile.certification_type}` : ''
    }`,
    description:
      profile.bio?.slice(0, 155) ??
      `${profile.full_name}, accountant in ${profile.location}, Kenya.`,
  };
}

function isActivePremium(p: DirectoryProfile) {
  return p.design_tier === 'premium' && p.monthly_subscription_active;
}

export default async function ProfileDetailPage({ params }: PageProps) {
  const profile = await getProfile((await params).id);
  if (!profile) notFound();

  const premium = isActivePremium(profile);

  // Premium profiles surface their firm's active job openings.
  let firmJobs: JobPosting[] = [];
  if (premium && profile.firm_id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('job_postings')
      .select('*')
      .eq('firm_id', profile.firm_id)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(5);
    firmJobs = (data as JobPosting[]) ?? [];
  }

  return (
    <article className="shell max-w-3xl py-12">
      {/* Premium header image */}
      {premium && profile.header_image_url && (
        <div className="relative mb-[-48px] h-48 w-full overflow-hidden rounded-2xl">
          <Image
            src={profile.header_image_url}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="relative rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex items-start gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-4 ring-white">
            {premium && profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-400">
                {profile.full_name.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
              {profile.full_name}
              {premium && profile.is_verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </h1>
            <p className="mt-0.5 text-gold-600">{profile.certification_type}</p>
            <p className="text-sm text-slate-500">
              {[profile.town, profile.location].filter(Boolean).join(', ')}
              {profile.registration_number &&
                ` · Reg. ${profile.registration_number}`}
            </p>
          </div>
        </div>

        {profile.bio && (
          <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
            {profile.bio}
          </p>
        )}

        {/* Contact / CTA block: premium-only */}
        {premium ? (
          <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap gap-3">
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
                >
                  WhatsApp
                </a>
              )}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
                >
                  Call {profile.phone}
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Email
                </a>
              )}
            </div>

            {profile.calendly_url && (
              <iframe
                title="Book a consultation"
                src={profile.calendly_url}
                className="mt-4 h-[640px] w-full rounded-lg border border-slate-200"
              />
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-gold-500/30 bg-gold-50/40 p-5 text-center">
            <p className="text-sm font-medium text-navy-900">
              Contact details are available on Premium profiles.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Are you {profile.full_name}?{' '}
              <Link
                href="/dashboard/upgrade"
                className="font-semibold text-gold-600 hover:underline"
              >
                Upgrade to Premium
              </Link>{' '}
              to display your phone, WhatsApp and booking link.
            </p>
          </div>
        )}

        {/* Premium: active job openings from the firm */}
        {premium && firmJobs.length > 0 && (
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Open roles at this firm
            </h2>
            <ul className="space-y-2">
              {firmJobs.map((job) => (
                <li key={job.id}>
                  <Link
                    href={`/jobs/${job.slug ?? job.id}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm hover:border-slate-300"
                  >
                    <span className="font-medium text-navy-900">
                      {job.title}
                    </span>
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
