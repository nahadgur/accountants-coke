import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow Supabase Storage public buckets + common avatar hosts.
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
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
