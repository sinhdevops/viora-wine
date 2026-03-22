import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import NewsDetailPageContent from './_page-content';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/@types/news';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

type EventRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  content: string | null;
  thumbnail_url: string | null;
  date: string;
  category: string;
  read_time: string | null;
  author: string | null;
  featured: boolean | null;
};

function mapToNewsItem(row: EventRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category as NewsItem['category'],
    title: { vi: row.name, en: row.name },
    excerpt: { vi: row.description ?? '', en: row.description ?? '' },
    content: { vi: row.content ?? '', en: row.content ?? '' },
    image: row.thumbnail_url ?? '',
    date: row.date,
    readTime: row.read_time ?? '',
    author: row.author ?? '',
    featured: row.featured ?? false,
  };
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const common = await getTranslations({ locale, namespace: 'common' });


  const { data } = await supabase
    .from('events')
    .select('name, description, thumbnail_url')
    .eq('id', slug)
    .single();

  if (!data) return {};

  const title = data.name;
  const description = data.description ?? title;

  return {
    title,
    description,
    alternates: {
      canonical: `https://winehousedanang.vn/${locale}/news/${slug}`,
      languages: {
        vi: `https://winehousedanang.vn/vi/news/${slug}`,
        en: `https://winehousedanang.vn/en/news/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | ${common('brand')}`,
      description,
      url: `https://winehousedanang.vn/${locale}/news/${slug}`,
      siteName: common('brand'),
      locale,
      type: 'article',
      images: data.thumbnail_url
        ? [{ url: data.thumbnail_url, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${common('brand')}`,
      description,
      images: data.thumbnail_url ? [data.thumbnail_url] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: row }, { data: relatedRows }] = await Promise.all([
    supabase
      .from('events')
      .select('id,  name, description, content, thumbnail_url,  category')
      .eq('id', slug)
      .single(),
    supabase
      .from('events')
      .select('id,  name, description, content, thumbnail_url,  category')
      .neq('id', slug)
      .order('date', { ascending: false })
      .limit(3),
  ]);


  if (!row) notFound();

  const newsItem = mapToNewsItem(row as EventRow);
  const relatedNews = (relatedRows ?? []).map((r) => mapToNewsItem(r as EventRow));

  return <NewsDetailPageContent newsItem={newsItem} relatedNews={relatedNews} />;
}
