import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Request-scoped Supabase client for RSCs and Server Actions.
 * Honours the user session via cookies, so RLS applies as the logged-in user
 * (or `anon` when signed out). Use this for all reads/writes in app routes.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` from a Server Component is a no-op; middleware refreshes
            // the session cookie instead. Safe to swallow.
          }
        },
      },
    },
  );
}

/**
 * Privileged client that BYPASSES RLS. Only ever import this in trusted
 * server-side code (billing webhooks, the lead-routing action). Never expose
 * the service-role key to the browser.
 */
export function createServiceClient() {
  const { createClient: createSb } = require('@supabase/supabase-js');
  return createSb(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
