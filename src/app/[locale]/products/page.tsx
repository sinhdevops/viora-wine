import { getTranslations } from 'next-intl/server';
import ProductsPageContent from './_page-content';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const hasFilters = Object.keys(sp).length > 0;
  const t = await getTranslations({ locale, namespace: 'products_page' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    ...(hasFilters && { robots: { index: false, follow: true } }),
    keywords: [
      'rượu vang nhập khẩu chính hãng',
      'mua rượu vang',
      'shop rượu vang',
      'rượu vang Úc',
      'rượu vang Úc Hà Nội',
      'rượu vang Úc Đà Nẵng',
      'rượu vang Úc Shiraz',
      'rượu vang Úc Cabernet Sauvignon',
      'rượu vang Úc cho người mới',
      'rượu vang Úc dưới 1 triệu',
      'rượu vang đỏ nhập khẩu',
      'rượu vang trắng nhập khẩu',
      'rượu vang hồng',
      'rượu vang Pháp',
      'rượu vang Ý',
      'rượu vang Chile',
      'rượu vang Bordeaux',
      'rượu vang Shiraz Barossa Valley',
      'quà tặng rượu vang cao cấp',
      'hộp quà rượu vang',
      'shop rượu vang Úc Hà Nội',
      'shop rượu vang Úc Đà Nẵng',
      common('brand'),
    ],
    alternates: buildAlternates(locale, '/products'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: buildPageUrl(locale, '/products'),
      siteName: common('brand'),
      locale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/statics/images/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: t('meta_title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      images: [`${SITE_URL}/statics/images/og-home.jpg`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products_page' });
  return (
    <>
      <ProductsPageContent />
    </>
  );
}
