import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';
import { formatCurrency } from '@/utils/format-currency';

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
    .select('id, slug, name, description, thumbnail_url, category, price, discount_percentage, country, grape_variety, wine_type, seo_title, seo_description')
    .eq('slug', slug)
    .single();

  if (!product) return {};

  const nameLower = product.name?.toLowerCase() ?? '';
  const countryLower = (product.country ?? '').toLowerCase();

  const isAustralian = nameLower.includes('úc') || countryLower.includes('úc') || countryLower.includes('australia');
  const isFrench = countryLower.includes('pháp') || countryLower.includes('france');
  const isItalian = countryLower.includes('ý') || countryLower.includes('italy');
  const isChilean = countryLower.includes('chile');
  const isShiraz = nameLower.includes('shiraz') || (product.grape_variety ?? '').toLowerCase().includes('shiraz');
  const isCabernet = nameLower.includes('cabernet') || (product.grape_variety ?? '').toLowerCase().includes('cabernet');
  const isMoscato = nameLower.includes('moscato') || nameLower.includes('ngọt');
  const isGift = product.category === 'gift' || product.category === 'combo';
  const isUnderOneMillion = product.price > 0 && product.price < 1_000_000;

  // Build intent-optimised title: Name | Price – Brand
  const salePrice = product.discount_percentage > 0
    ? Math.round(product.price * (1 - product.discount_percentage / 100))
    : product.price;
  const priceStr = salePrice > 0 ? formatCurrency(salePrice) : null;
  const baseTitle = product.seo_title || product.name;
  const title = priceStr
    ? `${baseTitle} | Giá ${priceStr} – ${common('brand')}`
    : `${baseTitle} – ${common('brand')}`;

  const description = product.seo_description
    || (product.description
      ? `${product.description}${priceStr ? ` Giá ${priceStr}.` : ''} — ${t('meta_desc_suffix')}`
      : t('meta_desc_suffix'));

  const extraKeywords: string[] = [];
  if (isAustralian) extraKeywords.push('rượu vang Úc', 'rượu vang Úc Hà Nội', 'rượu vang Úc Đà Nẵng', 'rượu vang Úc nhập khẩu chính hãng', 'shop rượu vang Úc');
  if (isFrench) extraKeywords.push('rượu vang Pháp', 'vang Pháp chính hãng', 'rượu vang Bordeaux');
  if (isItalian) extraKeywords.push('rượu vang Ý', 'vang Ý nhập khẩu', 'rượu vang Tuscany');
  if (isChilean) extraKeywords.push('rượu vang Chile', 'vang Chile nhập khẩu', 'rượu vang Nam Mỹ');
  if (isShiraz) extraKeywords.push('rượu vang Shiraz', 'rượu vang Úc Shiraz', 'vang Shiraz Barossa Valley', 'vang Shiraz chính hãng');
  if (isCabernet) extraKeywords.push('rượu vang Cabernet Sauvignon', 'vang Cabernet Úc', 'vang đỏ Cabernet');
  if (isMoscato) extraKeywords.push('rượu vang ngọt', 'vang Moscato', 'rượu vang dễ uống');
  if (isGift) extraKeywords.push('quà tặng rượu vang', 'hộp quà rượu vang cao cấp', 'rượu vang làm quà tặng');
  if (isUnderOneMillion) extraKeywords.push('rượu vang dưới 1 triệu', 'vang giá rẻ chính hãng', 'rượu vang phổ thông');

  return {
    title,
    description,
    keywords: [
      product.name,
      product.country ? `rượu vang ${product.country}` : null,
      product.grape_variety ?? null,
      common('brand'),
      'rượu vang nhập khẩu chính hãng',
      'mua rượu vang',
      'rượu vang Đà Nẵng',
      'rượu vang Hà Nội',
      ...extraKeywords,
    ].filter(Boolean) as string[],
    alternates: buildAlternates(locale, `/products/${slug}`),
    openGraph: {
      title: `${baseTitle} | ${common('brand')}`,
      description,
      url: buildPageUrl(locale, `/products/${slug}`),
      siteName: common('brand'),
      locale,
      type: 'website',
      images: product.thumbnail_url
        ? [{ url: product.thumbnail_url, width: 800, height: 800, alt: `${product.name} – ${common('brand')}` }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${baseTitle} | ${common('brand')}`,
      description,
      images: product.thumbnail_url ? [product.thumbnail_url] : [],
    },
  };
}
