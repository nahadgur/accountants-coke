'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const ClaimSchema = z.object({
  firm_name: z.string().min(2).max(200),
  firm_slug: z.string().max(200).optional().or(z.literal('')),
  claimant_name: z.string().min(2).max(120),
  claimant_role: z.string().max(120).optional().or(z.literal('')),
  claimant_email: z.string().email(),
  claimant_phone: z.string().max(20).optional().or(z.literal('')),
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
    return { status: 'error', message: 'Please check the form and try again.' };
  }
  const c = parsed.data;

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return {
      status: 'error',
      message: 'Claims are temporarily unavailable. Please try again shortly.',
    };
  }

  const { error } = await supabase.from('firm_claims').insert({
    firm_name: c.firm_name,
    firm_slug: c.firm_slug || null,
    claimant_name: c.claimant_name,
    claimant_role: c.claimant_role || null,
    claimant_email: c.claimant_email,
    claimant_phone: c.claimant_phone || null,
    message: c.message || null,
  });

  if (error) {
    return { status: 'error', message: 'Could not submit your claim. Please try again.' };
  }

  return { status: 'success' };
}
