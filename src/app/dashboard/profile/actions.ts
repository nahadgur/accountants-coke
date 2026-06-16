'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { CERTIFICATIONS, SPECIALIZATIONS } from '@/lib/types';
import { slugify } from '@/lib/utils';

const ProfileSchema = z.object({
  full_name: z.string().min(2).max(120),
  bio: z.string().max(2000).optional().or(z.literal('')),
  certification_type: z.enum(CERTIFICATIONS as [string, ...string[]]).optional().or(z.literal('')),
  registration_number: z.string().max(60).optional().or(z.literal('')),
  location: z.string().min(2).max(80),
  town: z.string().max(80).optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  whatsapp: z.string().max(20).optional().or(z.literal('')),
  calendly_url: z.string().url().optional().or(z.literal('')),
  // multi-select arrives as repeated fields
  specializations: z.array(z.enum(SPECIALIZATIONS as [string, ...string[]])).optional(),
});

export type ProfileState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' };

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const user = await requireUser();

  const raw = {
    ...Object.fromEntries(formData),
    specializations: formData.getAll('specializations') as string[],
  };
  const parsed = ProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: 'error', message: 'Please check the highlighted fields.' };
  }
  const d = parsed.data;

  const supabase = await createClient();
  // NOTE: design_tier / subscription / verification are intentionally NOT set
  // here — the DB trigger blocks self-escalation; billing owns those.
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: d.full_name,
      slug: slugify(d.full_name) + '-' + user.id.slice(0, 6),
      bio: d.bio || null,
      certification_type: d.certification_type || null,
      registration_number: d.registration_number || null,
      location: d.location,
      town: d.town || null,
      phone: d.phone || null,
      whatsapp: d.whatsapp || null,
      calendly_url: d.calendly_url || null,
      specializations: d.specializations ?? [],
    })
    .eq('id', user.id);

  if (error) return { status: 'error', message: error.message };

  revalidatePath('/dashboard/profile');
  revalidatePath('/directory');
  return { status: 'success' };
}
