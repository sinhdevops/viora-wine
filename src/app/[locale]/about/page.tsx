import { getTranslations } from 'next-intl/server';
import AboutPageContent from './_page-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: {
      canonical: `https://winehousedanang.vn/${locale}/about`,
      languages: {
        vi: 'https://winehousedanang.vn/vi/about',
        en: 'https://winehousedanang.vn/en/about',
      },
    },
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: `https://winehousedanang.vn/${locale}/about`,
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

export default function Page() {
  return <AboutPageContent />;
}
