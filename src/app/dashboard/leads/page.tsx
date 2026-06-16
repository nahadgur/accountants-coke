import { getCurrentProfile } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { claimLead } from './actions';
import { timeAgo } from '@/lib/utils';
import type { Lead } from '@/lib/types';
import Link from 'next/link';

export const metadata = { title: 'Leads', robots: { index: false } };

export default async function LeadsPage() {
  const profile = await getCurrentProfile();
  const premium =
    profile?.design_tier === 'premium' && profile.monthly_subscription_active;

  if (!premium) {
    return (
      <div className="rounded-xl border border-gold-500/30 bg-gold-50/50 p-8 text-center">
        <h1 className="text-xl font-bold text-navy-900">Leads are a Premium feature</h1>
        <p className="mt-2 text-sm text-slate-600">
          Matched client requests are routed only to premium members in the
          relevant location and specialization.
        </p>
        <Link
          href="/dashboard/upgrade"
          className="mt-4 inline-block rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-gold-400"
        >
          Upgrade to receive leads
        </Link>
      </div>
    );
  }

  // RLS returns only leads routed to this profile.
  const supabase = await createClient();
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  const leads = (data as Lead[]) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Your matched leads</h1>
      <p className="mt-1 text-sm text-slate-500">
        {leads.length} lead{leads.length === 1 ? '' : 's'} routed to you.
      </p>

      {leads.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No leads yet. They’ll appear here the moment a matching client submits
          the “Match me” form.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-navy-900">
                      {lead.service_needed}
                    </h2>
                    <Badge
                      variant={lead.status === 'claimed' ? 'verified' : 'neutral'}
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {[lead.town, lead.location].filter(Boolean).join(', ')} ·{' '}
                    {timeAgo(lead.created_at)}
                  </p>
                  {lead.message && (
                    <p className="mt-2 text-sm text-slate-700">{lead.message}</p>
                  )}
                  <div className="mt-3 space-y-0.5 text-sm">
                    <p className="font-medium text-navy-900">{lead.client_name}</p>
                    <p className="text-slate-600">
                      <a className="text-navy-700 hover:underline" href={`mailto:${lead.client_email}`}>
                        {lead.client_email}
                      </a>
                      {lead.client_phone && ` · ${lead.client_phone}`}
                    </p>
                  </div>
                </div>

                {lead.status !== 'claimed' && (
                  <form action={claimLead}>
                    <input type="hidden" name="lead_id" value={lead.id} />
                    <Button type="submit" variant="emerald" size="sm">
                      Claim lead
                    </Button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
