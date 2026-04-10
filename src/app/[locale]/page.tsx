import { getTranslations } from 'next-intl/server';
import HomePageContent from './_page-content';

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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: '/vi',
        en: '/en',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_desc'),
      url: `/${locale}`,
      siteName: common('brand'),
      locale,
      type: 'website',
      images: [
        {
          url: 'https://viorawine.vn/statics/images/og-home.jpg',
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

export default function Page() {
  return <HomePageContent />;
}
