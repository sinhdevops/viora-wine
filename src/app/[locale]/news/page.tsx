import { getTranslations } from 'next-intl/server';
import { createClient } from "@/utils/supabase/server";
import NewsPageContent from "./_page-content";
import type { EventItem } from "@/app/[locale]/_page-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    alternates: {
      canonical: `https://winehousedanang.vn/${locale}/news`,
      languages: {
        vi: 'https://winehousedanang.vn/vi/news',
        en: 'https://winehousedanang.vn/en/news',
      },
    },
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: `https://winehousedanang.vn/${locale}/news`,
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

export default async function NewsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("id, name, description, thumbnail_url, date, category")
    .order("date", { ascending: false });

  return <NewsPageContent events={events as EventItem[] ?? []} />;
}
