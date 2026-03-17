import { NEWS } from '@/constants/news';
import NewsDetailPageContent from './_page-content';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const newsItem = NEWS.find(item => item.slug === slug);

  if (!newsItem) {
    notFound();
  }

  return <NewsDetailPageContent newsItem={newsItem} />;
}
