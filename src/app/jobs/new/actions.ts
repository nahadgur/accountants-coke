'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { EMPLOYMENT_TYPES, SPECIALIZATIONS, KENYAN_CITIES } from '@/lib/types';
import { slugify } from '@/lib/utils';

const JobSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(20).max(8000),
  employment_type: z.enum(EMPLOYMENT_TYPES as [string, ...string[]]),
  location: z.enum(KENYAN_CITIES as unknown as [string, ...string[]]),
  town: z.string().max(80).optional().or(z.literal('')),
  specialization: z.enum(SPECIALIZATIONS as [string, ...string[]]).optional().or(z.literal('')),
  direct_employer: z.string().max(140).optional().or(z.literal('')),
  firm_id: z.string().uuid().optional().or(z.literal('')),
  salary_range_min: z.coerce.number().int().positive().optional().or(z.literal('')),
  salary_range_max: z.coerce.number().int().positive().optional().or(z.literal('')),
  addons: z.array(z.enum(['featured', 'newsletter'])).optional(),
});

export type JobState =
  | { status: 'idle' }
  | { status: 'error'; message: string };

const ADDON_PRICES_KES: Record<'featured' | 'newsletter', number> = {
  featured: 3000,
  newsletter: 5000,
};

export async function createJob(
  _prev: JobState,
  formData: FormData,
): Promise<JobState> {
  const user = await requireUser();

  const raw = {
    ...Object.fromEntries(formData),
    addons: formData.getAll('addons') as string[],
  };
  const parsed = JobSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: 'error', message: 'Please complete all required fields.' };
  }
  const d = parsed.data;

  if (!d.firm_id && !d.direct_employer) {
    return {
      status: 'error',
      message: 'Provide either a firm or a direct employer name.',
    };
  }

  const supabase = await createClient();
  const wantsFeatured = (d.addons ?? []).includes('featured');

  const { data: job, error } = await supabase
    .from('job_postings')
    .insert({
      posted_by: user.id,
      firm_id: d.firm_id || null,
      direct_employer: d.firm_id ? null : d.direct_employer || null,
      title: d.title,
      slug: `${slugify(d.title)}-${Date.now().toString(36)}`,
      description: d.description,
      employment_type: d.employment_type,
      location: d.location,
      town: d.town || null,
      specialization: d.specialization || null,
      salary_range_min: d.salary_range_min || null,
      salary_range_max: d.salary_range_max || null,
      // Featured is only granted once payment settles; create as unfeatured.
      is_featured: false,
    })
    .select('id')
    .single();

  if (error || !job) {
    return { status: 'error', message: error?.message ?? 'Could not create job.' };
  }

  // Record the upgrade orders (unpaid). A payment redirect would follow in prod.
  const addons = (d.addons ?? []) as ('featured' | 'newsletter')[];
  if (addons.length > 0) {
    await supabase.from('listing_orders').insert(
      addons.map((addon) => ({
        job_id: job.id,
        purchaser_id: user.id,
        addon,
        amount_kes: ADDON_PRICES_KES[addon],
        paid: false,
      })),
    );
  }

  revalidatePath('/jobs');
  revalidatePath('/dashboard/jobs');

  // In production, redirect to Paystack checkout when paid add-ons were chosen.
  if (wantsFeatured || addons.length > 0) {
    redirect(`/jobs/new/checkout?job=${job.id}`);
  }
  redirect(`/jobs/${job.id}`);
}
