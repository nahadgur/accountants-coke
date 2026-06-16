import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Accountants.co.ke',
    short_name: 'Accountants.co.ke',
    description:
      'Kenya’s directory of verified CPA-K, ACCA and CIFA accounting firms and professionals, with private client matching.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0E1116',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
