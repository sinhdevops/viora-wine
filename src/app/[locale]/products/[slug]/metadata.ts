import { PRODUCTS } from '@/constants/products';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string, slug: string}>;
}) {
  const {locale, slug} = await params;
  const product = PRODUCTS.find(p => p.slug === slug);
  const t = await getTranslations({locale, namespace: 'common'});

  if (!product) return {};

  const name = locale === 'vi' ? product.name.vi : product.name.en;
  const desc = locale === 'vi' ? product.description.vi : product.description.en;

  return {
    title: name,
    description: desc,
    openGraph: {
      title: `${name} | ${t('brand')}`,
      description: desc,
      images: [product.image],
    },
  };
}
