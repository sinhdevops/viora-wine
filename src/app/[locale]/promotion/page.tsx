import { getTranslations } from 'next-intl/server';
import { createClient } from "@/utils/supabase/server";
import PromotionPageContent from "./_page-content";
import type { DbProduct } from "@/@types/product";
import { buildAlternates, buildPageUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'promotion' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: buildAlternates(locale, '/promotion'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: buildPageUrl(locale, '/promotion'),
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

export default async function PromotionPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
    .gt("discount_percentage", 0)
    .order("discount_percentage", { ascending: false });

  return <PromotionPageContent products={products as DbProduct[] ?? []} />;
}
