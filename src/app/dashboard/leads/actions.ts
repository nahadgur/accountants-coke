'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

const ClaimSchema = z.object({ lead_id: z.string().uuid() });

/** Claim a routed lead. RLS guarantees the user can only touch leads in their
 *  own lead_recipients rows, so we additionally stamp claimed_at + assignment. */
export async function claimLead(formData: FormData): Promise<void> {
  const user = await requireUser();
  const parsed = ClaimSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const supabase = await createClient();

  await supabase
    .from('leads')
    .update({ status: 'claimed', assigned_to_profile_id: user.id })
    .eq('id', parsed.data.lead_id);

  await supabase
    .from('lead_recipients')
    .update({ claimed_at: new Date().toISOString() })
    .eq('lead_id', parsed.data.lead_id)
    .eq('profile_id', user.id);

  revalidatePath('/dashboard/leads');
}

/** Mark a routed lead as viewed (call when the row is expanded). */
export async function markLeadViewed(leadId: string): Promise<void> {
  const user = await requireUser();
  const supabase = await createClient();
  await supabase
    .from('lead_recipients')
    .update({ viewed_at: new Date().toISOString() })
    .eq('lead_id', leadId)
    .eq('profile_id', user.id)
    .is('viewed_at', null);
}
