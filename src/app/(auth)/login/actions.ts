'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const CredsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2).optional(),
});

export type AuthState = { error?: string } | undefined;

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = CredsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: 'Enter a valid email and password.' };

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: 'Sign-in is temporarily unavailable. Please try again shortly.' };
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });
  if (error) return { error: error.message };

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = CredsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || !parsed.data.full_name) {
    return { error: 'Enter your name, a valid email and an 8+ char password.' };
  }

  const role = formData.get('role') === 'seeker' ? 'seeker' : 'professional';

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return { error: 'Sign-up is temporarily unavailable. Please try again shortly.' };
  }
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name, role },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
  if (error) return { error: error.message };

  // Bootstrap a free accountant profile only for professionals. Job seekers
  // get no directory listing.
  if (data.user && role === 'professional') {
    await supabase.from('profiles').upsert(
      {
        id: data.user.id,
        full_name: parsed.data.full_name,
        location: 'Nairobi',
        email: parsed.data.email,
      },
      { onConflict: 'id', ignoreDuplicates: true },
    );
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
