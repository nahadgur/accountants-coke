'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { postToSheet } from '@/lib/sheet';

const ClaimSchema = z.object({
  firm_name: z.string().min(2).max(200),
  firm_slug: z.string().max(200).optional().or(z.literal('')),
  claimant_name: z.string().min(2).max(120),
  claimant_role: z.string().max(120).optional().or(z.literal('')),
  claimant_email: z.string().email(),
  claimant_phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20),
  message: z.string().max(2000).optional().or(z.literal('')),
});

export type ClaimState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' };

/**
 * Captures a "claim this firm" request. Anyone may submit (public INSERT under
 * RLS); the claim sits as `pending` for manual ICPAK-membership verification
 * before the firm gets an account to manage its listing. Fails soft so the form
 * never crashes the page when Supabase is unreachable.
 */
export async function submitFirmClaim(
  _prev: ClaimState,
  formData: FormData,
): Promise<ClaimState> {
  const parsed = ClaimSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Please check the form and try again.';
    return { status: 'error', message: msg };
  }
  const c = parsed.data;

  // Capture to the Google Sheet (reliable, env-independent) and Supabase. The
  // claim is saved if EITHER channel succeeds.
  const sheetOk = await postToSheet({
    formType: 'claim',
    firm_name: c.firm_name,
    firm_slug: c.firm_slug || '',
    claimant_name: c.claimant_name,
    claimant_role: c.claimant_role || '',
    claimant_email: c.claimant_email,
    claimant_phone: c.claimant_phone,
    message: c.message || '',
  });

  let dbOk = false;
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('firm_claims').insert({
      firm_name: c.firm_name,
      firm_slug: c.firm_slug || null,
      claimant_name: c.claimant_name,
      claimant_role: c.claimant_role || null,
      claimant_email: c.claimant_email,
      claimant_phone: c.claimant_phone,
      message: c.message || null,
    });
    dbOk = !error;
  } catch {
    dbOk = false;
  }

  if (!sheetOk && !dbOk) {
    return { status: 'error', message: 'Could not submit your claim. Please try again.' };
  }

  return { status: 'success' };
}
