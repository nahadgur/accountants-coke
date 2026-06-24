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

/** BreadcrumbList structured data. Items are ordered root -> current. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** ItemList structured data for roundup pages. Emit ONLY when the list mirrors
 *  what is actually rendered on the page (never a fabricated ranking). */
export function itemListJsonLd(items: { name: string; url: string }[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.url,
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
