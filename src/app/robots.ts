import type { MetadataRoute } from 'next';

const BASE = 'https://accountants.co.ke';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/login', '/api/', '/auth/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
