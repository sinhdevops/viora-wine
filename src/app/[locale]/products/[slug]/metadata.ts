import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'product' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const { data: product } = await supabase
    .from('products')
    .select('id, name, description, thumbnail_url, category')
    .eq('id', slug)
    .single();

  if (!product) return {};

  const title = product.name;
  const description = product.description
    ? `${product.description} — ${t('meta_desc_suffix')}`
    : t('meta_desc_suffix');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: {
        vi: `/vi/products/${slug}`,
        en: `/en/products/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | ${common('brand')}`,
      description,
      url: `/${locale}/products/${slug}`,
      siteName: common('brand'),
      locale,
      type: 'website',
      images: product.thumbnail_url
        ? [{ url: product.thumbnail_url, width: 800, height: 800, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${common('brand')}`,
      description,
      images: product.thumbnail_url ? [product.thumbnail_url] : [],
    },
  };
}
