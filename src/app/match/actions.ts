'use server';

import { z } from 'zod';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { SPECIALIZATIONS, KENYAN_CITIES } from '@/lib/types';

const LeadSchema = z.object({
  client_name: z.string().min(2).max(120),
  client_email: z.string().email(),
  client_phone: z.string().max(20).optional().or(z.literal('')),
  service_needed: z.enum(SPECIALIZATIONS as [string, ...string[]]),
  location: z.enum(KENYAN_CITIES as unknown as [string, ...string[]]),
  town: z.string().max(80).optional().or(z.literal('')),
  message: z.string().max(2000).optional().or(z.literal('')),
});

export type MatchState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; matched: number };

/**
 * Lead-routing engine.
 *
 *  1. Validate the submission.
 *  2. Insert the lead using the request-scoped client (RLS allows public
 *     INSERT, blocks public SELECT — the pool is never exposed).
 *  3. Call `route_lead` with the SERVICE client. The SECURITY DEFINER function
 *     selects up to 3 active-premium profiles matching service + location and
 *     links them in `lead_recipients` — it does NOT broadcast site-wide.
 *  4. Fan out notifications (email/SMS) to those recipients only.
 */
export async function submitLead(
  _prev: MatchState,
  formData: FormData,
): Promise<MatchState> {
  const parsed = LeadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: 'error', message: 'Please check the form and try again.' };
  }
  const lead = parsed.data;

  const supabase = await createClient();
  const { data: inserted, error: insertError } = await supabase
    .from('leads')
    .insert({
      client_name: lead.client_name,
      client_email: lead.client_email,
      client_phone: lead.client_phone || null,
      service_needed: lead.service_needed,
      location: lead.location,
      town: lead.town || null,
      message: lead.message || null,
    })
    .select('id')
    .single();

  if (insertError || !inserted) {
    return { status: 'error', message: 'Could not submit your request.' };
  }

  // Route with elevated privileges (RLS-bypassing) but tightly scoped.
  const service = createServiceClient();
  const { data: recipients, error: routeError } = await service.rpc(
    'route_lead',
    { p_lead_id: inserted.id },
  );

  if (routeError) {
    // Lead is saved; routing can be retried by a cron. Surface a soft success.
    return { status: 'success', matched: 0 };
  }

  await notifyRecipients(inserted.id, recipients ?? []);

  return { status: 'success', matched: (recipients ?? []).length };
}

/** Placeholder fan-out. Wire to Resend/Postmark (email) + Africa's Talking (SMS).
 *  Recipients come straight from the routing function, so no extra querying of
 *  the protected lead pool is needed. */
async function notifyRecipients(
  leadId: string,
  recipients: { profile_id: string }[],
): Promise<void> {
  if (recipients.length === 0) return;
  // for (const r of recipients) {
  //   await sendEmail({ to: ..., template: 'new-lead', leadId });
  //   await sendSms({ to: ..., body: 'New lead on Accountants.co.ke' });
  // }
  console.info(`Routed lead ${leadId} to ${recipients.length} premium profiles`);
}
