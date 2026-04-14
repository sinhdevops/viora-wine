import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import NewsDetailPageContent from './_page-content';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/@types/news';
import type { DbProduct } from '@/@types/product';
import { buildAlternates, SITE_URL } from '@/lib/seo';
import { DEFAULT_FAQ_ITEMS } from '@/components/page/blog/faq-data';

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
    readTime: '',
    author: 'Viora Wine',
    featured: false,
  };
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const common = await getTranslations({ locale, namespace: 'common' });

  const { data } = await supabase
    .from('events')
    .select('name, description, thumbnail_url')
    .eq('slug', slug)
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
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title: `${title} | ${common('brand')}`,
      description,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
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

  // Fetch article, related news and suggested products in parallel
  const [{ data: row }, { data: relatedRows }, { data: productRows }] =
    await Promise.all([
      supabase
        .from('events')
        .select('id, slug, name, description, content, thumbnail_url, category, date')
        .eq('slug', slug)
        .single(),
      supabase
        .from('events')
        .select('id, slug, name, description, content, thumbnail_url, category, date')
        .neq('slug', slug)
        .order('date', { ascending: false })
        .limit(3),
      supabase
        .from('products')
        .select('id, name, description, thumbnail_url, price, discount_percentage, category, stock, is_hot')
        .eq('category', 'wine')
        .gt('stock', 0)
        .order('created_at', { ascending: false })
        .limit(3),
    ]);

  if (!row) notFound();

  const newsItem = mapToNewsItem(row as EventRow);
  const relatedNews = (relatedRows ?? []).map((r) => mapToNewsItem(r as EventRow));
  const suggestedProducts = (productRows ?? []) as DbProduct[];

  // ── JSON-LD: Article ──
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsItem.title[locale as 'vi' | 'en'],
    image: [newsItem.image],
    datePublished: newsItem.date,
    dateModified: newsItem.date,
    author: [
      {
        '@type': 'Person',
        name: newsItem.author || 'Viora Wine',
        url: SITE_URL,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Viora Wine',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  // ── JSON-LD: Breadcrumb ──
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kiến thức',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: newsItem.title[locale as 'vi' | 'en'],
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  // ── JSON-LD: FAQPage ──
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DEFAULT_FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <NewsDetailPageContent
        newsItem={newsItem}
        relatedNews={relatedNews}
        suggestedProducts={suggestedProducts}
      />
    </>
  );
}
