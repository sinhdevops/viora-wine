import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import { buildAlternates, SITE_URL } from '@/lib/seo';

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
    .select('id, name, description, thumbnail_url, category, tags, price')
    .eq('id', slug)
    .single();

  if (!product) return {};

  const title = product.name;
  const nameLower = product.name?.toLowerCase() ?? '';
  const tagsArr: string[] = Array.isArray(product.tags) ? product.tags : [];

  const isAustralian =
    nameLower.includes('úc') ||
    nameLower.includes('australia') ||
    tagsArr.some((t: string) => t.toLowerCase().includes('australia') || t.toLowerCase().includes('úc'));

  const isShiraz =
    nameLower.includes('shiraz') ||
    tagsArr.some((t: string) => t.toLowerCase().includes('shiraz'));

  const isCabernetSauvignon =
    nameLower.includes('cabernet sauvignon') ||
    nameLower.includes('cab sauv') ||
    tagsArr.some((t: string) => t.toLowerCase().includes('cabernet'));

  const isGift = product.category === 'gift' || product.category === 'combo';

  const isUnderOneMillion = product.price && product.price < 1000000;

  const extraKeywords: string[] = [];
  if (isAustralian) {
    extraKeywords.push(
      'rượu vang Úc Hà Nội',
      'rượu vang Úc Đà Nẵng',
      'rượu vang Úc nhập khẩu chính hãng',
      'shop rượu vang Úc',
    );
  }
  if (isShiraz) extraKeywords.push('rượu vang Úc Shiraz', 'vang Shiraz Úc chính hãng');
  if (isCabernetSauvignon) extraKeywords.push('rượu vang Úc Cabernet Sauvignon', 'vang Cab Sauv Úc');
  if (isGift) extraKeywords.push('rượu vang Úc làm quà tặng', 'quà tặng rượu vang nhập khẩu');
  if (isUnderOneMillion) extraKeywords.push('rượu vang Úc dưới 1 triệu', 'vang Úc giá rẻ');

  const description = product.description
    ? `${product.description} — ${t('meta_desc_suffix')}`
    : t('meta_desc_suffix');

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      common('brand'),
      'Rượu vang Đà Nẵng',
      'Rượu vang Hà Nội',
      'Rượu vang nhập khẩu chính hãng',
      'Quà tặng rượu vang',
      ...extraKeywords,
    ],
    alternates: buildAlternates(locale, `/products/${slug}`),
    openGraph: {
      title: `${title} | ${common('brand')}`,
      description,
      url: `${SITE_URL}/${locale}/products/${slug}`,
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
