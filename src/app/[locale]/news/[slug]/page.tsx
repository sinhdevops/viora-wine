import { NEWS } from '@/constants/news';
import { getTranslations } from 'next-intl/server';
import NewsDetailPageContent from './_page-content';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const newsItem = NEWS.find(item => item.slug === slug);
  const common = await getTranslations({ locale, namespace: 'common' });

  if (!newsItem) return {};

  const title = newsItem.title[locale as 'vi' | 'en'];
  const description = newsItem.excerpt[locale as 'vi' | 'en'] ?? title;

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
      images: newsItem.image ? [{ url: newsItem.image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${common('brand')}`,
      description,
      images: newsItem.image ? [newsItem.image] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const newsItem = NEWS.find(item => item.slug === slug);

  if (!newsItem) notFound();

  return <NewsDetailPageContent newsItem={newsItem} />;
}
