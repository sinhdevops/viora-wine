import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import NewsDetailPageContent from './_page-content';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/@types/news';
import type { DbProduct } from '@/@types/product';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';
import { buildBreadcrumbSchema, buildFAQSchema, jsonLdScript, BRAND } from '@/lib/geo-schemas';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

type EventRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  content: string | null;
  thumbnail_url: string | null;
  date: string;
  category: string;
};

function mapToNewsItem(row: EventRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category as NewsItem['category'],
    title: { vi: row.name, en: row.name },
    excerpt: { vi: row.description ?? '', en: row.description ?? '' },
    content: { vi: row.content ?? '', en: row.content ?? '' },
    image: row.thumbnail_url ?? '',
    date: row.date,
    readTime: '',
    author: 'Viora Wine',
    featured: false,
  };
}

/** Tạo dynamic FAQ dựa trên tiêu đề bài viết — liên quan trực tiếp đến chủ đề */
function buildArticleFAQ(title: string, category: string) {
  const isKnowledge = category === 'kien-thuc';
  const baseFAQ = [
    {
      q: `${title} — thông tin này có chính xác không?`,
      a: `Đúng vậy. Nội dung "${title}" được biên soạn bởi đội ngũ chuyên gia rượu vang của Viora Wine với hơn 5 năm kinh nghiệm nhập khẩu và phân phối rượu vang chính hãng tại Việt Nam. Chúng tôi cập nhật thông tin thường xuyên để đảm bảo tính chính xác và hữu ích.`,
    },
    {
      q: 'Viora Wine là ai và tại sao nên tin tưởng thông tin từ Viora Wine?',
      a: 'Viora Wine là shop rượu vang nhập khẩu chính hãng có uy tín tại Đà Nẵng và Hà Nội, thành lập năm 2020. Với hơn 2.000 khách hàng tin dùng và đánh giá 4.9/5 sao, chúng tôi cam kết cung cấp thông tin chính xác, minh bạch về rượu vang nhập khẩu. Tất cả sản phẩm đều có chứng nhận xuất xứ và tem nhập khẩu hợp lệ.',
    },
    {
      q: isKnowledge
        ? 'Tôi có thể hỏi thêm về kiến thức rượu vang ở đâu?'
        : 'Tôi muốn tham gia sự kiện rượu vang của Viora Wine thì liên hệ thế nào?',
      a: isKnowledge
        ? 'Bạn có thể liên hệ trực tiếp đội ngũ chuyên gia Viora Wine qua Zalo: 0325-610-016. Chúng tôi sẵn sàng tư vấn về chọn rượu vang phù hợp, cách thưởng thức, bảo quản và kết hợp với thức ăn. Tư vấn miễn phí, không giới hạn câu hỏi.'
        : 'Liên hệ Viora Wine qua Zalo: 0325-610-016 hoặc gọi điện: 0338-909-973 để đăng ký tham dự sự kiện. Chúng tôi tổ chức thường xuyên các buổi wine tasting, khóa học thưởng rượu và sự kiện kết nối tại Đà Nẵng và Hà Nội.',
    },
    {
      q: 'Viora Wine có bán rượu vang nhập khẩu liên quan đến chủ đề này không?',
      a: 'Có. Viora Wine cung cấp đầy đủ các dòng rượu vang nhập khẩu chính hãng: vang đỏ, vang trắng, vang hồng, vang ngọt, Shiraz Úc, rượu mạnh Whisky/Cognac. Giá từ 210.000đ. Giao hàng toàn quốc. Tư vấn miễn phí qua Zalo: 0325-610-016.',
    },
    {
      q: 'Mua rượu vang nhập khẩu chính hãng ở đâu tại Việt Nam?',
      a: 'Viora Wine là địa chỉ mua rượu vang nhập khẩu chính hãng uy tín tại Việt Nam với kho hàng tại Đà Nẵng và Hà Nội. Toàn bộ sản phẩm có đầy đủ giấy tờ nhập khẩu, tem chính hãng và chứng nhận xuất xứ. Giao hàng toàn quốc 1–3 ngày. Website: viorawine.com | Zalo: 0325-610-016.',
    },
  ];
  return baseFAQ;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const common = await getTranslations({ locale, namespace: 'common' });

  const { data } = await supabase
    .from('events')
    .select('name, description, thumbnail_url, seo_title, seo_description')
    .eq('slug', slug)
    .single();

  if (!data) return {};

  const title = data.seo_title || data.name;
  const description = data.seo_description || data.description || title;

  return {
    title,
    description,
    keywords: [
      title,
      'Kiến thức rượu vang',
      'Tin tức Viora Wine',
      'Rượu vang Đà Nẵng',
      'Văn hóa rượu vang',
      'Học về rượu vang',
      'Rượu vang nhập khẩu chính hãng',
    ],
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title: `${title} | ${common('brand')}`,
      description,
      url: buildPageUrl(locale, `/blog/${slug}`),
      siteName: common('brand'),
      locale,
      type: 'article',
      images: data.thumbnail_url
        ? [{ url: data.thumbnail_url, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${common('brand')}`,
      description,
      images: data.thumbnail_url ? [data.thumbnail_url] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const supabase = await createClient();

  // Fetch article, related news and suggested products in parallel
  const [{ data: row }, { data: relatedRows }, { data: productRows }] =
    await Promise.all([
      supabase
        .from('events')
        .select('id, slug, name, description, content, thumbnail_url, category, date')
        .eq('slug', slug)
        .single(),
      supabase
        .from('events')
        .select('id, slug, name, description, content, thumbnail_url, category, date')
        .neq('slug', slug)
        .order('date', { ascending: false })
        .limit(3),
      supabase
        .from('products')
        .select('id, slug, name, description, thumbnail_url, price, discount_percentage, category, stock, tag, sold_count, rating')
        .eq('tag', 'best_seller')
        .gt('stock', 0)
        .order('sold_count', { ascending: false })
        .limit(3),
    ]);

  if (!row) notFound();

  const newsItem = mapToNewsItem(row as EventRow);
  const relatedNews = (relatedRows ?? []).map((r) => mapToNewsItem(r as EventRow));
  const suggestedProducts = (productRows ?? []) as DbProduct[];

  const blogListUrl = buildPageUrl(locale, '/blog');
  const blogPostUrl = buildPageUrl(locale, `/blog/${slug}`);

  // ── Article JSON-LD — đầy đủ với speakable và mainEntityOfPage ──
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': blogPostUrl,
    headline: newsItem.title['vi'],
    description: newsItem.excerpt['vi'] || newsItem.title['vi'],
    image: newsItem.image ? [newsItem.image] : [],
    datePublished: newsItem.date,
    dateModified: newsItem.date,
    inLanguage: 'vi-VN',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogPostUrl,
    },
    author: {
      '@type': 'Organization',
      name: BRAND.name,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: BRAND.logo },
      knowsAbout: BRAND.knowsAbout,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: BRAND.logo },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-excerpt', '.article-lead'],
    },
    about: {
      '@type': 'Thing',
      name: 'Rượu vang nhập khẩu chính hãng',
      description: 'Kiến thức và thông tin về rượu vang nhập khẩu tại Việt Nam',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND.name,
      url: SITE_URL,
    },
  };

  // ── Breadcrumb ──
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Kiến thức', url: blogListUrl },
    { name: newsItem.title['vi'], url: blogPostUrl },
  ]);

  // ── FAQPage — dynamic dựa trên chủ đề bài viết ──
  const faqJsonLd = buildFAQSchema(
    buildArticleFAQ(newsItem.title['vi'], newsItem.category),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <h1 className="sr-only">{newsItem.title['vi']}</h1>
      <NewsDetailPageContent
        newsItem={newsItem}
        relatedNews={relatedNews}
        suggestedProducts={suggestedProducts}
      />
    </>
  );
}
