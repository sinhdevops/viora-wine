import { getTranslations } from 'next-intl/server';
import AboutPageContent from './_page-content';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';
import { buildOrganizationSchema, buildFAQSchema, jsonLdScript, BRAND } from '@/lib/geo-schemas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: [
      'Viora Wine',
      'Viora Wine Đà Nẵng',
      'shop rượu vang Đà Nẵng',
      'rượu vang nhập khẩu chính hãng',
      'giới thiệu Viora Wine',
      'viorawine',
      'viora wine',
    ],
    alternates: buildAlternates(locale, '/about'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: buildPageUrl(locale, '/about'),
      siteName: common('brand'),
      locale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/statics/images/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: common('brand'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
    },
  };
}

export default function Page() {
  const pageUrl = `${SITE_URL}/gioi-thieu`;

  // ── AboutPage schema — giúp AI hiểu đây là trang giới thiệu doanh nghiệp ──
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': pageUrl,
    name: 'Giới Thiệu Viora Wine — Shop Rượu Vang Nhập Khẩu Chính Hãng',
    description: 'Viora Wine là nhà phân phối rượu vang nhập khẩu chính hãng thành lập năm 2020 tại Đà Nẵng và Hà Nội. Chuyên cung cấp rượu vang từ Úc, Pháp, Ý, Chile với cam kết chính hãng 100%.',
    url: pageUrl,
    inLanguage: 'vi-VN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.about-description', '.about-mission'],
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: SITE_URL,
    },
  };

  // ── Organization schema đầy đủ — entity chính cho AI ──
  const organizationJsonLd = buildOrganizationSchema({
    '@id': `${SITE_URL}/#organization`,
    description: 'Viora Wine là nhà phân phối rượu vang nhập khẩu chính hãng hàng đầu tại Đà Nẵng và Hà Nội. Thành lập năm 2020, chúng tôi đã phục vụ hơn 2.000 khách hàng với cam kết 100% hàng chính hãng có chứng nhận xuất xứ. Đội ngũ chuyên gia am hiểu rượu vang từ các vùng sản xuất Úc, Pháp, Ý, Chile, Tây Ban Nha. Sứ mệnh: đưa văn hóa thưởng thức rượu vang đẳng cấp thế giới đến tay người Việt với giá minh bạch và dịch vụ tận tâm.',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
    foundingLocation: { '@type': 'City', name: 'Đà Nẵng' },
  });

  // ── FAQPage cho trang About — AI sẽ trích dẫn thông tin doanh nghiệp ──
  const faqJsonLd = buildFAQSchema([
    {
      q: 'Viora Wine là gì? Công ty được thành lập từ khi nào?',
      a: 'Viora Wine là shop rượu vang nhập khẩu chính hãng thành lập năm 2020 tại Đà Nẵng, Việt Nam. Hiện có kho hàng và đội ngũ tư vấn tại cả Đà Nẵng và Hà Nội, phục vụ giao hàng toàn quốc.',
    },
    {
      q: 'Viora Wine nhập khẩu rượu từ những quốc gia nào?',
      a: 'Viora Wine nhập khẩu trực tiếp từ các vùng sản xuất rượu vang danh tiếng thế giới: Úc (Barossa Valley, McLaren Vale), Pháp (Bordeaux, Burgundy, Rhône), Ý (Tuscany, Puglia), Chile (Colchagua, Maipo Valley), Tây Ban Nha (Rioja, Ribera del Duero) và một số vùng khác.',
    },
    {
      q: 'Làm sao biết rượu tại Viora Wine là hàng chính hãng?',
      a: 'Toàn bộ sản phẩm tại Viora Wine có đầy đủ: (1) Giấy tờ hải quan nhập khẩu; (2) Tem nhập khẩu hợp lệ theo quy định Bộ Công Thương; (3) Chứng nhận xuất xứ (Certificate of Origin - C/O); (4) Nhập từ nhà phân phối được ủy quyền chính thức. Bạn có thể yêu cầu xem chứng từ trước khi mua.',
    },
    {
      q: 'Viora Wine có địa chỉ cửa hàng thực tế không?',
      a: 'Có. Viora Wine có kho hàng và điểm giao dịch tại Hà Nội (Ngõ 44/65 Nguyễn Cơ Thạch) và Đà Nẵng. Hoạt động từ 8:00–22:00 mỗi ngày. Bạn có thể đến trực tiếp hoặc đặt hàng qua Zalo/điện thoại để được giao tận nơi.',
    },
    {
      q: 'Viora Wine có chính sách bảo hành/đổi trả không?',
      a: 'Viora Wine chấp nhận đổi trả trong 3 ngày nếu: sản phẩm bị vỡ khi giao, hàng không đúng đơn đặt, hoặc sản phẩm có dấu hiệu hỏng hóc. Phí đổi trả do Viora Wine chịu hoàn toàn. Liên hệ Zalo 0325-610-016 để được hỗ trợ nhanh nhất.',
    },
    {
      q: 'Viora Wine phục vụ những đối tượng khách hàng nào?',
      a: 'Viora Wine phục vụ đa dạng đối tượng: (1) Cá nhân mua uống hoặc quà tặng; (2) Nhà hàng/khách sạn muốn nhập rượu vang theo lô; (3) Doanh nghiệp đặt quà biếu đối tác; (4) Sự kiện cưới, tiệc công ty. Liên hệ để nhận báo giá phù hợp theo từng nhu cầu.',
    },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(aboutPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <AboutPageContent />
    </>
  );
}
