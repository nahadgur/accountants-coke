'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const ApplySchema = z.object({
  job_id: z.string().uuid(),
  applicant_name: z.string().min(2).max(120),
  applicant_email: z.string().email(),
  applicant_phone: z.string().max(20).optional().or(z.literal('')),
  cv_url: z.string().url().optional().or(z.literal('')),
  cover_note: z.string().max(3000).optional().or(z.literal('')),
});

export type ApplyState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' };

export async function applyToJob(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const parsed = ApplySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: 'error', message: 'Please check your details and try again.' };
  }
  const d = parsed.data;

  // RLS allows public insert only when the job is published + unexpired.
  // The applications_count trigger increments the job automatically.
  const supabase = await createClient();
  const { error } = await supabase.from('job_applications').insert({
    job_id: d.job_id,
    applicant_name: d.applicant_name,
    applicant_email: d.applicant_email,
    applicant_phone: d.applicant_phone || null,
    cv_url: d.cv_url || null,
    cover_note: d.cover_note || null,
  });

  if (error) {
    return { status: 'error', message: 'This role may no longer be open.' };
  }
  return { status: 'success' };
}
