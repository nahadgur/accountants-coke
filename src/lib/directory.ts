import 'server-only';
import { createClient } from '@/lib/supabase/server';
import {
  CERTIFICATIONS,
  SPECIALIZATIONS,
  type CertificationType,
  type DirectoryProfile,
  type Specialization,
} from '@/lib/types';

const PAGE_SIZE = 12;

/** Raw Next.js searchParams shape (string | string[] | undefined per key). */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/** Normalised, validated filters derived from the URL. Drives the SQL query
 *  and is echoed back into the filter UI so links stay shareable/SEO-clean. */
export interface DirectoryFilters {
  q: string | null;
  location: string | null;
  town: string | null;
  specialization: Specialization | null;
  certification: CertificationType | null;
  page: number;
}

function first(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

/** Parse + validate URL params. Unknown enum values are dropped (not trusted). */
export function parseDirectoryFilters(sp: RawSearchParams): DirectoryFilters {
  const spec = first(sp.specialization);
  const cert = first(sp.designation);
  const pageRaw = Number(first(sp.page));

  return {
    q: first(sp.q)?.trim() || null,
    location: first(sp.location)?.trim() || null,
    town: first(sp.town)?.trim() || null,
    specialization:
      spec && SPECIALIZATIONS.includes(spec as Specialization)
        ? (spec as Specialization)
        : null,
    certification:
      cert && CERTIFICATIONS.includes(cert as CertificationType)
        ? (cert as CertificationType)
        : null,
    page: Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1,
  };
}

export interface DirectoryResult {
  profiles: DirectoryProfile[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Server-side directory query.
 *
 * Sort rule (the core monetisation lever):
 *   1. Active-premium subscribers pinned to the TOP
 *      (`design_tier desc` puts 'premium' before 'free', and we additionally
 *       require monthly_subscription_active so lapsed premium drops to free
 *       ordering).
 *   2. Within each tier, oldest registrations first (stable, deterministic),
 *      which also reads as "alphabetical-ish by tenure"; swap to full_name
 *      ascending if you prefer strict alphabetical for the free tier.
 *
 * All filtering happens in Postgres via the RLS-protected
 * `public_directory_profiles` view, so contact fields are already masked for
 * free profiles before they ever leave the database.
 */
export async function queryDirectory(
  filters: DirectoryFilters,
): Promise<DirectoryResult> {
  const supabase = await createClient();

  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('public_directory_profiles')
    .select('*', { count: 'exact' });

  if (filters.location) query = query.eq('location', filters.location);
  if (filters.town) query = query.eq('town', filters.town);
  if (filters.certification)
    query = query.eq('certification_type', filters.certification);
  // specializations is a Postgres array — `contains` ⇒ `@>` operator.
  if (filters.specialization)
    query = query.contains('specializations', [filters.specialization]);
  if (filters.q) query = query.ilike('full_name', `%${filters.q}%`);

  // Premium-first, then deterministic tenure ordering.
  query = query
    .order('design_tier', { ascending: false }) // 'premium' > 'free'
    .order('monthly_subscription_active', { ascending: false })
    .order('created_at', { ascending: true })
    .range(from, to);

  const { data, count, error } = await query;
  if (error) throw new Error(`Directory query failed: ${error.message}`);

  const total = count ?? 0;
  return {
    profiles: (data ?? []) as DirectoryProfile[],
    total,
    page: filters.page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

/** Build a querystring preserving existing filters with one key overridden.
 *  Used for filter links + pagination so URLs stay canonical and crawlable. */
export function buildDirectoryHref(
  filters: DirectoryFilters,
  override: Partial<Record<keyof DirectoryFilters, string | number | null>>,
): string {
  const params = new URLSearchParams();
  const merged = { ...filters, ...override };

  if (merged.q) params.set('q', String(merged.q));
  if (merged.location) params.set('location', String(merged.location));
  if (merged.town) params.set('town', String(merged.town));
  if (merged.specialization)
    params.set('specialization', String(merged.specialization));
  if (merged.certification)
    params.set('designation', String(merged.certification));
  if (merged.page && Number(merged.page) > 1)
    params.set('page', String(merged.page));

  const qs = params.toString();
  return qs ? `/directory?${qs}` : '/directory';
}
