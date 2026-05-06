import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import EventsPageContent from "./_page-content";
import { NewsItem } from '@/@types/news';
import { buildAlternates, buildPageUrl } from '@/lib/seo';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: [
      'kiến thức rượu vang',
      'hướng dẫn chọn rượu vang',
      'rượu vang cho người mới',
      'cách uống rượu vang',
      'vang đỏ vang trắng khác nhau',
      'rượu vang Úc đặc điểm',
      'food pairing rượu vang',
      'bảo quản rượu vang',
      'rượu vang Shiraz là gì',
      'Cabernet Sauvignon là gì',
      'nhiệt độ uống rượu vang',
      'blog rượu vang',
      common('brand'),
    ],
    alternates: buildAlternates(locale, '/blog'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: buildPageUrl(locale, '/blog'),
      siteName: common('brand'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from('events')
    .select('id, slug, name, description, content, thumbnail_url, date, category')
    .order('date', { ascending: false });


  const events = (rows ?? []).map((r) => mapToNewsItem(r as EventRow));

  return (
    <>
      <EventsPageContent news={events} />
    </>
  );
}
