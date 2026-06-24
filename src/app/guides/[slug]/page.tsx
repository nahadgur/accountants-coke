import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide } from '@/data/guides';
import { ArticlePage } from '@/components/page/ArticlePage';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return { title: 'Guide not found' };
  return {
    title: g.metaTitle ?? g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();

  return <ArticlePage article={g} section={{ label: 'Guides', base: '/guides' }} />;
}
