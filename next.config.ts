import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow Supabase Storage public buckets + common avatar hosts.
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
