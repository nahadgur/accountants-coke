import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRACTICE, getPractice } from '@/data/practice';
import { ArticlePage } from '@/components/page/ArticlePage';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRACTICE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPractice((await params).slug);
  if (!p) return { title: 'Not found' };
  return {
    title: p.metaTitle ?? p.title,
    description: p.description,
    alternates: { canonical: `/grow-your-practice/${p.slug}` },
  };
}

export default async function PracticeArticle({ params }: Props) {
  const p = getPractice((await params).slug);
  if (!p) notFound();

  return (
    <ArticlePage
      article={p}
      section={{ label: 'Grow your practice', base: '/grow-your-practice' }}
    />
  );
}
