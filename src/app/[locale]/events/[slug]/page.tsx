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
    keywords: [
      title,
      'Kiến thức rượu vang',
      'Tin tức Viora Wine',
      'Rượu vang Đà Nẵng',
      'Văn hóa rượu vang',
      'Học về rượu vang',
    ],
    alternates: {
      canonical: `/${locale}/events/${slug}`,
      languages: {
        vi: `/vi/events/${slug}`,
        en: `/en/events/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | ${common('brand')}`,
      description,
      url: `/${locale}/events/${slug}`,
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
  const { slug, locale } = await params;
  const supabase = await createClient();

  const [{ data: row }, { data: relatedRows }] = await Promise.all([
    supabase
      .from('events')
      .select('id,  name, description, content, thumbnail_url,  category, date')
      .eq('id', slug)
      .single(),
    supabase
      .from('events')
      .select('id, name, description, content, thumbnail_url, category, date')
      .neq('id', slug)
      .order('date', { ascending: false })
      .limit(3),
  ]);


  if (!row) notFound();

  const newsItem = mapToNewsItem(row as EventRow);
  const relatedNews = (relatedRows ?? []).map((r) => mapToNewsItem(r as EventRow));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viorawine.vn';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsItem.title[locale as 'vi' | 'en'],
    image: [newsItem.image],
    datePublished: newsItem.date,
    dateModified: newsItem.date,
    author: [
      {
        '@type': 'Person',
        name: 'Viora Wine',
        url: baseUrl,
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: `${baseUrl}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kiến thức',
        item: `${baseUrl}/events`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: newsItem.title[locale as 'vi' | 'en'],
        item: `${baseUrl}/events/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NewsDetailPageContent newsItem={newsItem} relatedNews={relatedNews} />
    </>
  );
}
