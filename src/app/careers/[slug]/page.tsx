import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CAREERS, getCareer } from '@/data/careers';
import { ArticlePage } from '@/components/page/ArticlePage';

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CAREERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCareer((await params).slug);
  if (!c) return { title: 'Not found' };
  return {
    title: c.metaTitle ?? c.title,
    description: c.description,
    alternates: { canonical: `/careers/${c.slug}` },
  };
}

export default async function CareerArticle({ params }: Props) {
  const c = getCareer((await params).slug);
  if (!c) notFound();

  return <ArticlePage article={c} section={{ label: 'Careers', base: '/careers' }} />;
}
