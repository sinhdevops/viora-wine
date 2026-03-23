import { getTranslations } from 'next-intl/server';
import ContactPageContent from './_page-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        vi: '/vi/contact',
        en: '/en/contact',
      },
    },
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: `/${locale}/contact`,
      siteName: common('brand'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
    },
  };
}

export default function Page() {
  return <ContactPageContent />;
}
