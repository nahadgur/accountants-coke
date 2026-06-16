import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow Supabase Storage public buckets for avatars/logos.
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Firms-only product: the firms list is the directory now.
      { source: '/firms', destination: '/directory', permanent: true },
      // Job posting hidden for now (paid checkout not live). Temporary.
      { source: '/jobs/new/:path*', destination: '/jobs', permanent: false },
    ];
  },
};

export default nextConfig;
