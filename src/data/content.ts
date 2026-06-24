import type { Faq } from '@/data/services';

// Shared editorial content model. Pillar guides, careers articles and
// grow-your-practice articles are the same shape (lead + jump-nav sections +
// FAQs); they differ only in which funnel their CTA points at. The renderer
// is src/components/page/ArticlePage.tsx.

export type ArticleSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

/** The single CTA the article renders after its first section.
 *  - 'match' opens the global MatchModal (client funnel).
 *  - 'jobs'  is a plain link to the live job board.
 *  - 'claim' opens the global ClaimModal (firm funnel).
 *  - 'link'  is a plain link anywhere. */
export type ArticleCta = {
  kind: 'match' | 'jobs' | 'claim' | 'link';
  title?: string;
  body: string;
  ctaLabel: string;
  href: string;
  points?: string[];
  // match-only prefill (ignored by the other kinds)
  matchService?: string;
  matchLabel?: string;
  matchLocation?: string;
};

export type Article = {
  slug: string;
  title: string;
  metaTitle?: string; // tight SEO title (falls back to title)
  description: string;
  lead: string;
  updated: string; // ISO date
  sections: ArticleSection[];
  faqs: Faq[];
  /** Funnel CTA. Guides instead set `relatedService`, which the renderer turns
   *  into a service-aware match CTA + a row of matching pros. */
  cta?: ArticleCta;
  relatedService?: string; // service slug, surfaces matching pros (guides)
};
