import { getTranslations } from 'next-intl/server';
import HomePageContent from './_page-content';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';
import {
  buildWebSiteSchema,
  buildOrganizationSchema,
  buildFAQSchema,
  HOME_FAQ_ITEMS,
  jsonLdScript,
} from '@/lib/geo-schemas';

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

  // ── WebSite schema — SearchAction giúp AI hiểu cấu trúc tìm kiếm ──
  const webSiteJsonLd = buildWebSiteSchema();

  // ── Organization schema đầy đủ — entity chính cho GEO ──
  const organizationJsonLd = buildOrganizationSchema({
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rượu Vang Nhập Khẩu Chính Hãng',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Rượu Vang Đỏ Úc Monash Shiraz',
            description: 'Shiraz đỏ đậm đà từ Úc, hương mận chín và tiêu đen, 14% vol',
            offers: { '@type': 'Offer', priceCurrency: 'VND', price: 1050000, availability: 'https://schema.org/InStock' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Imperium Primitivo 16% – Vang đỏ cao cấp từ Ý',
            description: 'Primitivo cao cấp từ Puglia, Ý. Độ cồn 16%, vị mạnh mẽ và phức hợp',
            offers: { '@type': 'Offer', priceCurrency: 'VND', price: 950000, availability: 'https://schema.org/InStock' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'ANDARO Cabernet Sauvignon',
            description: 'Cabernet Sauvignon nhập khẩu Chile, phù hợp uống hàng ngày',
            offers: { '@type': 'Offer', priceCurrency: 'VND', price: 210000, availability: 'https://schema.org/InStock' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Rượu Vang Trắng Chardonnay Úc',
            description: 'Chardonnay tươi mát từ Úc, hương chanh và đào, 12.5% vol',
            offers: { '@type': 'Offer', priceCurrency: 'VND', price: 490000, availability: 'https://schema.org/InStock' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Rượu Vang Hồng Rosé Pháp',
            description: 'Rosé Provence thanh mát, hương dâu tây và hoa đào, hoàn hảo cho mùa hè',
            offers: { '@type': 'Offer', priceCurrency: 'VND', price: 650000, availability: 'https://schema.org/InStock' },
          },
        },
      ],
    },
  });

  // ── FAQPage — 8 câu hỏi thường gặp, AI sẽ trích dẫn trực tiếp ──
  const faqJsonLd = buildFAQSchema(HOME_FAQ_ITEMS);

  // ── WebPage với speakable — giúp voice AI đọc nội dung chính ──
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Viora Wine — Shop Rượu Vang Nhập Khẩu Chính Hãng Đà Nẵng & Hà Nội',
    description: 'Mua rượu vang nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Vang Úc, Pháp, Ý, Chile từ 210.000đ. Giao toàn quốc. Tư vấn miễn phí 24/7.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'vi-VN',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hero-description', '.trust-signals'],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(webSiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(webPageJsonLd) }} />
      <HomePageContent locale={locale} />
    </>
  );
}
