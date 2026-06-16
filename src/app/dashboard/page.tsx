import Link from 'next/link';
import { getCurrentProfile, requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Dashboard', robots: { index: false } };

async function getStats(userId: string) {
  const supabase = await createClient();
  const [{ count: leadCount }, { count: jobCount }] = await Promise.all([
    supabase
      .from('lead_recipients')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', userId),
    supabase
      .from('job_postings')
      .select('*', { count: 'exact', head: true })
      .eq('posted_by', userId),
  ]);
  return { leadCount: leadCount ?? 0, jobCount: jobCount ?? 0 };
}

export default async function DashboardOverview() {
  const user = await requireUser();
  const profile = await getCurrentProfile();
  const { leadCount, jobCount } = await getStats(user.id);
  const premium =
    profile?.design_tier === 'premium' && profile.monthly_subscription_active;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">
        Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Here’s what’s happening with your account.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Leads received" value={leadCount} href="/dashboard/leads" />
        <Stat label="Jobs posted" value={jobCount} href="/dashboard/jobs" />
        <Stat
          label="Account tier"
          value={premium ? 'Premium' : 'Free'}
          href="/dashboard/upgrade"
        />
      </div>

      {!premium && (
        <div className="mt-6 rounded-xl border border-gold-500/30 bg-gold-50/50 p-6">
          <h2 className="font-semibold text-navy-900">
            Unlock leads and a premium profile
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Premium members appear at the top of the directory, show their
            contact details, and receive matched client leads directly.
          </p>
          <Link
            href="/dashboard/upgrade"
            className="mt-4 inline-block rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-gold-400"
          >
            See plans
          </Link>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300"
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-navy-900">{value}</p>
    </Link>
  );
}
