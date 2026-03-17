import {routing} from '@/i18n/routing';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'common'});

  return {
    title: {
      default: `${t('brand')} | ${t('slogan')}`,
      template: `%s | ${t('brand')}`
    },
    description: t('slogan'),
    openGraph: {
      title: t('brand'),
      description: t('slogan'),
      url: 'https://winehousedanang.vn',
      siteName: t('brand'),
      locale: locale,
      type: 'website',
    },
  };
}
