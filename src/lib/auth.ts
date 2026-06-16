import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { DirectoryProfile } from '@/lib/types';

export type AccountRole = 'professional' | 'seeker';

/** Returns the signed-in user or null. Fails soft if Supabase is unreachable. */
export async function getUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

/** Account role from user metadata. Existing accounts default to professional. */
export async function getUserRole(): Promise<AccountRole> {
  const user = await getUser();
  return user?.user_metadata?.role === 'seeker' ? 'seeker' : 'professional';
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
