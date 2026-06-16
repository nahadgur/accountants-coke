import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { DirectoryProfile } from '@/lib/types';

/** Returns the signed-in user or null. */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Guard for protected routes: redirects to /login if not authed. */
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect('/login');
  return user;
}

/** Loads the full (unmasked-for-owner) profile row for the current user. */
export async function getCurrentProfile(): Promise<DirectoryProfile | null> {
  const user = await getUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  return (data as DirectoryProfile) ?? null;
}
