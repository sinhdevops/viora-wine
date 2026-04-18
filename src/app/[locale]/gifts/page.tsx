import { getTranslations } from 'next-intl/server';
import { createClient } from "@/utils/supabase/server";
import GiftsPageContent from "./_page-content";
import type { DbProduct } from "@/@types/product";
import { buildAlternates, buildPageUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gifts' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: buildAlternates(locale, '/gifts'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: buildPageUrl(locale, '/gifts'),
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

export default async function GiftsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
    .in("category", ["gift", "combo"])
    .order("is_hot", { ascending: false });

  return <GiftsPageContent products={products as DbProduct[] ?? []} />;
}
