import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { SERVICES } from '@/data/services';
import { GUIDES } from '@/data/guides';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://accountants.co.ke';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: profiles }, { data: jobs }, { data: firms }] = await Promise.all([
    supabase.from('public_directory_profiles').select('slug, id').limit(5000),
    supabase
      .from('job_postings')
      .select('slug, id, updated_at')
      .eq('is_published', true)
      .limit(5000),
    supabase.from('firms').select('slug, id').eq('is_published', true).limit(5000),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/directory`, priority: 0.9 },
    { url: `${BASE}/services`, priority: 0.9 },
    { url: `${BASE}/jobs`, priority: 0.9 },
    { url: `${BASE}/firms`, priority: 0.8 },
    { url: `${BASE}/match`, priority: 0.8 },
    { url: `${BASE}/guides`, priority: 0.8 },
  ];

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.8,
  }));
  const guideRoutes = GUIDES.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    priority: 0.7,
  }));

  const profileRoutes = (profiles ?? []).map((p) => ({
    url: `${BASE}/directory/${p.slug ?? p.id}`,
    priority: 0.6,
  }));
  const jobRoutes = (jobs ?? []).map((j) => ({
    url: `${BASE}/jobs/${j.slug ?? j.id}`,
    lastModified: j.updated_at ? new Date(j.updated_at) : undefined,
    priority: 0.7,
  }));
  const firmRoutes = (firms ?? []).map((f) => ({
    url: `${BASE}/firms/${f.slug ?? f.id}`,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...guideRoutes,
    ...profileRoutes,
    ...jobRoutes,
    ...firmRoutes,
  ];
}
