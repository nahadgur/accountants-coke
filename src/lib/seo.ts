import 'server-only';
import { queryDirectory } from '@/lib/directory';
import type { Specialization, DirectoryProfile } from '@/lib/types';

/** Live, premium-first pros for a service's specialization. */
export async function getServicePros(
  specialization: Specialization | null,
  limit = 6,
): Promise<DirectoryProfile[]> {
  if (!specialization) return [];
  const { profiles } = await queryDirectory({
    q: null,
    location: null,
    town: null,
    specialization,
    certification: null,
    page: 1,
  });
  return profiles.slice(0, limit);
}

/** FAQPage structured data for rich results. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Article structured data for guides. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  updated: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    dateModified: opts.updated,
    mainEntityOfPage: opts.url,
    publisher: {
      '@type': 'Organization',
      name: 'Accountants.co.ke',
    },
  };
}
