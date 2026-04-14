import { getTranslations } from 'next-intl/server';
import ProductsPageContent from './_page-content';
import { buildAlternates, SITE_URL } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products_page' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: [
      'rượu vang Úc Hà Nội',
      'rượu vang Úc Đà Nẵng',
      'rượu vang Úc Shiraz',
      'rượu vang Úc Cabernet Sauvignon',
      'rượu vang Úc cho người mới',
      'rượu vang Úc dưới 1 triệu',
      'shop rượu vang Úc Hà Nội',
      'shop rượu vang Úc Đà Nẵng',
      'rượu vang Úc nhập khẩu chính hãng',
      'rượu vang Pháp', 'rượu vang Ý',
      common('brand'),
    ],
    alternates: buildAlternates(locale, '/products'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: `${SITE_URL}/${locale}/products`,
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

export default function Page() {
  return <ProductsPageContent />;
}
