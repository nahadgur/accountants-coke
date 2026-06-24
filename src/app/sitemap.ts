import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { SERVICES } from '@/data/services';
import { GUIDES } from '@/data/guides';
import { CAREERS } from '@/data/careers';
import { PRACTICE } from '@/data/practice';
import { ROUNDUPS } from '@/data/bestFirms';

const BASE = 'https://accountants.co.ke';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let jobs: { slug: string | null; id: string; updated_at: string | null }[] = [];

  try {
    const supabase = await createClient();
    const jb = await supabase
      .from('job_postings')
      .select('slug, id, updated_at')
      .eq('is_published', true)
      .limit(5000);
    jobs = jb.data ?? [];
  } catch {
    // No env / DB unreachable at build: ship the static + content routes only.
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/directory`, priority: 0.9 },
    { url: `${BASE}/services`, priority: 0.9 },
    { url: `${BASE}/jobs`, priority: 0.9 },
    { url: `${BASE}/best`, priority: 0.8 },
    { url: `${BASE}/careers`, priority: 0.8 },
    { url: `${BASE}/grow-your-practice`, priority: 0.8 },
    { url: `${BASE}/match`, priority: 0.8 },
    { url: `${BASE}/guides`, priority: 0.8 },
    { url: `${BASE}/how-it-works`, priority: 0.6 },
    { url: `${BASE}/about`, priority: 0.5 },
    { url: `${BASE}/faq`, priority: 0.5 },
    { url: `${BASE}/contact`, priority: 0.4 },
    { url: `${BASE}/privacy`, priority: 0.3 },
    { url: `${BASE}/terms`, priority: 0.3 },
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
  const careerRoutes = CAREERS.map((c) => ({
    url: `${BASE}/careers/${c.slug}`,
    lastModified: new Date(c.updated),
    priority: 0.7,
  }));
  const practiceRoutes = PRACTICE.map((p) => ({
    url: `${BASE}/grow-your-practice/${p.slug}`,
    lastModified: new Date(p.updated),
    priority: 0.7,
  }));
  const bestRoutes = ROUNDUPS.map((r) => ({
    url: `${BASE}/best/${r.slug}`,
    lastModified: new Date(r.updated),
    priority: 0.7,
  }));
  const jobRoutes = (jobs ?? []).map((j) => ({
    url: `${BASE}/jobs/${j.slug ?? j.id}`,
    lastModified: j.updated_at ? new Date(j.updated_at) : undefined,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...guideRoutes,
    ...careerRoutes,
    ...practiceRoutes,
    ...bestRoutes,
    ...jobRoutes,
  ];
}
