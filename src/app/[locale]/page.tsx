import { getTranslations } from 'next-intl/server';
import HomePageContent from './_page-content';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';

// Revalidate every 5 minutes so Supabase event/banner data stays fresh
// without hitting Supabase on every request (cuts TTFB significantly)
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: buildAlternates(locale),
    openGraph: {
      title: t('meta_title'),
      description: t('meta_desc'),
      url: buildPageUrl(locale),
      siteName: common('brand'),
      locale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/statics/images/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: common('brand'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_desc'),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    name: 'Viora Wine',
    alternateName: 'Viora Wine Đà Nẵng',
    url: SITE_URL,
    logo: `${SITE_URL}/statics/images/logo.png`,
    description: 'Shop rượu vang nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Chuyên vang Úc, Pháp, Ý, Chile. Giao hàng toàn quốc.',
    telephone: '+84325610016',
    email: 'viorawine@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ngõ 44/65 đường Nguyễn Cơ Thạch',
      addressLocality: 'Hà Nội',
      addressCountry: 'VN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: '16.0544068', longitude: '108.2021667' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
    sameAs: ['https://zalo.me/0325610016'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rượu Vang Nhập Khẩu Chính Hãng',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Rượu Vang Úc Shiraz' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Rượu Vang Pháp' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Rượu Vang Ý' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Rượu Vang Chile' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '2000',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HomePageContent locale={locale} />
    </>
  );
}
