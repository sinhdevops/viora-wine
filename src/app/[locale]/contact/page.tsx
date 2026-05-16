import { getTranslations } from 'next-intl/server';
import ContactPageContent from './_page-content';
import { buildAlternates, buildPageUrl, SITE_URL } from '@/lib/seo';
import { buildFAQSchema, jsonLdScript, BRAND } from '@/lib/geo-schemas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: [
      'liên hệ Viora Wine',
      'số điện thoại Viora Wine',
      'địa chỉ Viora Wine',
      'shop rượu vang Đà Nẵng',
      'shop rượu vang Hà Nội',
      'viorawine',
      'viora wine',
    ],
    alternates: buildAlternates(locale, '/contact'),
    openGraph: {
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
      url: buildPageUrl(locale, '/contact'),
      siteName: common('brand'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${t('meta_title')} | ${common('brand')}`,
      description: t('meta_desc'),
    },
  };
}

export default function Page() {
  const pageUrl = `${SITE_URL}/lien-he`;

  // ── ContactPage schema — AI biết đây là trang liên hệ với thông tin cụ thể ──
  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': pageUrl,
    name: 'Liên Hệ Viora Wine',
    description: 'Liên hệ Viora Wine để mua rượu vang nhập khẩu chính hãng, tư vấn chọn rượu, đặt hàng số lượng lớn hoặc hỗ trợ khiếu nại. Đội ngũ phục vụ 8:00–22:00 mỗi ngày.',
    url: pageUrl,
    inLanguage: 'vi-VN',
    mainEntity: {
      '@type': 'Organization',
      name: BRAND.name,
      url: SITE_URL,
      telephone: BRAND.telephone,
      email: BRAND.email,
      address: BRAND.address,
      openingHoursSpecification: BRAND.openingHoursSpecification,
      sameAs: BRAND.sameAs,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+84325610016',
          contactType: 'customer service',
          areaServed: 'VN',
          availableLanguage: 'Vietnamese',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '22:00',
          },
        },
        {
          '@type': 'ContactPoint',
          telephone: '+84338909973',
          contactType: 'sales',
          areaServed: 'VN',
          availableLanguage: 'Vietnamese',
        },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.contact-info', '.contact-address'],
    },
  };

  // ── FAQ cho trang liên hệ ──
  const faqJsonLd = buildFAQSchema([
    {
      q: 'Viora Wine có số điện thoại và email liên hệ là gì?',
      a: 'Điện thoại/Zalo tư vấn: 0325-610-016. Điện thoại đặt hàng: 0338-909-973. Email: viorawine@gmail.com. Thời gian phục vụ: 8:00–22:00 mỗi ngày (kể cả cuối tuần và lễ).',
    },
    {
      q: 'Viora Wine có địa chỉ cửa hàng ở đâu?',
      a: 'Viora Wine có kho và điểm nhận hàng tại: (1) Hà Nội — Ngõ 44/65 đường Nguyễn Cơ Thạch; (2) Đà Nẵng — Đường Tố Hữu. Khuyến khích đặt hàng qua Zalo/điện thoại để được giao tận nơi trong 2–4 giờ nội thành.',
    },
    {
      q: 'Làm thế nào để đặt hàng nhanh nhất tại Viora Wine?',
      a: 'Nhanh nhất là nhắn Zalo: 0325-610-016. Mô tả sản phẩm bạn cần (hoặc dịp uống, ngân sách) — đội ngũ sẽ tư vấn và xác nhận đơn trong 15 phút. Có thể thanh toán khi nhận hàng (COD) hoặc chuyển khoản trước.',
    },
    {
      q: 'Viora Wine hỗ trợ đặt hàng số lượng lớn cho doanh nghiệp không?',
      a: 'Có. Viora Wine cung cấp dịch vụ B2B cho nhà hàng, khách sạn, công ty: giảm giá 5–20% tùy số lượng, có thể in logo trên hộp quà, giao đúng giờ theo lịch sự kiện. Liên hệ Zalo 0325-610-016 hoặc email viorawine@gmail.com để được báo giá.',
    },
    {
      q: 'Khiếu nại hoặc đổi trả sản phẩm thì liên hệ Viora Wine như thế nào?',
      a: 'Liên hệ ngay qua Zalo 0325-610-016 hoặc gọi điện 0338-909-973 trong vòng 3 ngày kể từ ngày nhận hàng. Chụp ảnh sản phẩm và mô tả vấn đề — Viora Wine cam kết xử lý trong vòng 24 giờ và đổi trả miễn phí nếu lỗi do vận chuyển hoặc nhầm sản phẩm.',
    },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(contactPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <ContactPageContent />
    </>
  );
}
