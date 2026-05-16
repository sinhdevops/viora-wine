/**
 * Centralized GEO (Generative Engine Optimization) schema builders.
 * These structured data types help AI engines (ChatGPT, Perplexity, Google AI, Claude)
 * understand, cite, and recommend Viora Wine content.
 */

import { SITE_URL } from '@/lib/seo';

export const BRAND = {
  name: 'Viora Wine',
  alternateName: 'Viora Wine Đà Nẵng',
  url: SITE_URL,
  logo: `${SITE_URL}/statics/images/logo.png`,
  telephone: '+84325610016',
  email: 'viorawine@gmail.com',
  foundingDate: '2020',
  slogan: 'Chọn Viora – Chọn Đẳng Cấp',
  sameAs: [
    'https://zalo.me/0325610016',
    'https://www.facebook.com/viorawine',
    'https://www.instagram.com/viorawine.official',
  ],
  knowsAbout: [
    'Rượu vang Pháp',
    'Rượu vang Úc',
    'Rượu vang Ý',
    'Rượu vang Chile',
    'Rượu vang Tây Ban Nha',
    'Rượu vang Shiraz',
    'Rượu vang Cabernet Sauvignon',
    'Rượu vang nhập khẩu chính hãng',
    'Bảo quản rượu vang',
    'Kết hợp rượu vang với đồ ăn',
    'Văn hóa thưởng thức rượu vang',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ngõ 44/65 đường Nguyễn Cơ Thạch',
    addressLocality: 'Hà Nội',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '16.0544068',
    longitude: '108.2021667',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '22:00',
  },
};

/** WebSite schema with SearchAction — giúp AI engine hiểu cấu trúc site và cho phép tìm kiếm */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    alternateName: BRAND.alternateName,
    url: BRAND.url,
    description: 'Shop rượu vang nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Chuyên vang Úc, Pháp, Ý, Chile, Tây Ban Nha. Giao hàng toàn quốc.',
    inLanguage: 'vi-VN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/san-pham?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Organization schema đầy đủ cho GEO — dùng ở home và about */
export function buildOrganizationSchema(overrides: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    alternateName: BRAND.alternateName,
    url: BRAND.url,
    logo: {
      '@type': 'ImageObject',
      url: BRAND.logo,
      width: 200,
      height: 60,
    },
    description: 'Viora Wine là nhà phân phối rượu vang nhập khẩu chính hãng hàng đầu tại Đà Nẵng và Hà Nội. Thành lập năm 2020, chuyên cung cấp các dòng rượu vang cao cấp từ Úc, Pháp, Ý, Chile, Tây Ban Nha với đảm bảo xuất xứ và giá cả minh bạch.',
    slogan: BRAND.slogan,
    foundingDate: BRAND.foundingDate,
    telephone: BRAND.telephone,
    email: BRAND.email,
    address: BRAND.address,
    geo: BRAND.geo,
    openingHoursSpecification: BRAND.openingHoursSpecification,
    sameAs: BRAND.sameAs,
    knowsAbout: BRAND.knowsAbout,
    areaServed: [
      { '@type': 'City', name: 'Đà Nẵng' },
      { '@type': 'City', name: 'Hà Nội' },
      { '@type': 'Country', name: 'Việt Nam' },
    ],
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Bank Transfer, MoMo, ZaloPay',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: 2000,
    },
    ...overrides,
  };
}

/** ItemList schema cho danh sách sản phẩm — giúp AI liệt kê sản phẩm theo danh mục */
export function buildItemListSchema(
  items: { name: string; url: string; image?: string; description?: string; price?: number }[],
  listName: string,
  listDescription: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    description: listDescription,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'VND',
            price: item.price,
            availability: 'https://schema.org/InStock',
          },
        }),
      },
    })),
  };
}

/** SpeakableSpecification — đánh dấu nội dung để voice AI (Google Assistant, Siri) đọc */
export function buildSpeakableSpec(xPaths?: string[]) {
  return {
    '@type': 'SpeakableSpecification',
    xPath: xPaths ?? ['/html/head/title', "//*[@id='product-name']", "//*[@id='product-description']"],
  };
}

/** WebPage schema với speakable — dùng cho các trang nội dung */
export function buildWebPageSchema(opts: {
  type?: string;
  name: string;
  description: string;
  url: string;
  breadcrumb?: unknown;
  speakableXPaths?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'vi-VN',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND.name,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.product-description', '.faq-answer', '.page-description'],
    },
    ...(opts.breadcrumb ? { breadcrumb: opts.breadcrumb } : {}),
  };
}

/** FAQPage schema — chuẩn hóa câu hỏi thường gặp để AI trích dẫn trực tiếp */
export function buildFAQSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** HowTo schema — cho trang hướng dẫn/chỉ dẫn */
export function buildHowToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    inLanguage: 'vi-VN',
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.url,
    },
    ...(opts.totalTime && { totalTime: opts.totalTime }),
    step: opts.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Inline script helper */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data);
}

/** Common home page FAQs */
export const HOME_FAQ_ITEMS = [
  {
    q: 'Viora Wine là gì và bán những loại rượu nào?',
    a: 'Viora Wine là shop rượu vang nhập khẩu chính hãng tại Đà Nẵng và Hà Nội, thành lập năm 2020. Chúng tôi chuyên cung cấp rượu vang đỏ, vang trắng, vang hồng, vang ngọt, rượu Shiraz và rượu mạnh từ các vùng nổi tiếng thế giới: Úc (Barossa Valley), Pháp (Bordeaux, Bourgogne), Ý (Tuscany, Puglia), Chile, Tây Ban Nha.',
  },
  {
    q: 'Rượu vang tại Viora Wine có đảm bảo chính hãng không?',
    a: 'Có. 100% sản phẩm tại Viora Wine là hàng nhập khẩu chính hãng với đầy đủ giấy tờ hải quan, tem nhập khẩu hợp lệ và chứng nhận xuất xứ (C/O). Chúng tôi nhập khẩu trực tiếp từ nhà phân phối được ủy quyền, không qua trung gian.',
  },
  {
    q: 'Giá rượu vang tại Viora Wine từ bao nhiêu?',
    a: 'Giá rượu vang tại Viora Wine từ 210.000đ đến hàng chục triệu đồng, phù hợp với mọi nhu cầu: uống hàng ngày, tặng quà, tiệc cưới, đối tác. Dòng phổ thông từ 210.000đ–500.000đ, dòng tầm trung 500.000đ–1.500.000đ, dòng cao cấp trên 1.500.000đ.',
  },
  {
    q: 'Viora Wine có giao hàng toàn quốc không?',
    a: 'Có. Viora Wine giao hàng toàn quốc với đóng gói chuyên dụng chống vỡ. Nội thành Đà Nẵng và Hà Nội: giao trong 2–4 giờ. Các tỉnh thành khác: 1–3 ngày làm việc qua đơn vị vận chuyển uy tín. Freeship nội thành cho đơn từ 500.000đ.',
  },
  {
    q: 'Làm thế nào để đặt hàng tại Viora Wine?',
    a: 'Bạn có thể đặt hàng qua: (1) Website viorawine.com — chọn sản phẩm và thanh toán online; (2) Zalo: 0325-610-016 — nhắn tin đặt hàng nhanh; (3) Gọi điện: 0338-909-973 — tư vấn miễn phí và đặt hàng trực tiếp. Đội ngũ hỗ trợ từ 8:00–22:00 mỗi ngày.',
  },
  {
    q: 'Rượu vang Shiraz Úc có gì đặc biệt?',
    a: 'Shiraz Úc (đặc biệt từ Barossa Valley và McLaren Vale) nổi tiếng với màu đỏ đậm, vị trái cây chín (mận, việt quất), hương tiêu đen và vanilla từ thùng gỗ sồi. Độ cồn cao (13.5–16%), tanin mượt mà, rất phổ biến ở Việt Nam. Viora Wine nhập Shiraz chính hãng từ các nhà sản xuất hàng đầu Úc.',
  },
  {
    q: 'Mua rượu vang làm quà tặng ở Viora Wine có dịch vụ gì?',
    a: 'Viora Wine cung cấp dịch vụ quà tặng trọn gói: hộp quà sang trọng, giỏ rượu kết hợp, khắc tên/thông điệp theo yêu cầu, wrap ribbon cao cấp. Phù hợp cho quà biếu doanh nghiệp, tiệc cưới, sinh nhật, kỷ niệm. Gọi 0325-610-016 để được tư vấn.',
  },
  {
    q: 'Chính sách đổi trả của Viora Wine như thế nào?',
    a: 'Viora Wine chấp nhận đổi trả trong 3 ngày kể từ ngày nhận hàng nếu: sản phẩm bị vỡ trong quá trình vận chuyển, hàng không đúng đơn đặt, sản phẩm có dấu hiệu hỏng hóc. Phí đổi trả do Viora Wine chịu. Liên hệ ngay qua Zalo 0325-610-016 để được hỗ trợ.',
  },
];

/** Wine category FAQ builder */
export function buildCategoryFAQ(category: {
  name: string;
  description: string;
  priceRange: string;
  servingTemp: string;
  pairingFoods: string;
  origin: string;
  phone: string;
}) {
  return [
    {
      q: `${category.name} là gì?`,
      a: category.description,
    },
    {
      q: `Uống ${category.name} ở nhiệt độ bao nhiêu là đúng?`,
      a: `Nhiệt độ lý tưởng để thưởng thức ${category.name} là ${category.servingTemp}. Bảo quản đúng nhiệt độ giúp hương thơm và vị rượu phát triển tốt nhất. Nếu lấy từ tủ lạnh, hãy để ra ngoài 15–20 phút trước khi uống.`,
    },
    {
      q: `${category.name} uống cùng món ăn nào ngon nhất?`,
      a: `${category.name} kết hợp tuyệt vời với: ${category.pairingFoods}. Nguyên tắc chung: rượu có độ acid và tanin cao hỗ trợ tiêu hóa chất béo, giúp bữa ăn trọn vẹn hơn.`,
    },
    {
      q: `${category.name} chính hãng từ những vùng nào?`,
      a: `Viora Wine cung cấp ${category.name} nhập khẩu chính hãng từ: ${category.origin}. Tất cả đều có đầy đủ giấy tờ hải quan, tem nhập khẩu và chứng nhận xuất xứ (C/O).`,
    },
    {
      q: `Giá ${category.name} tại Viora Wine từ bao nhiêu?`,
      a: `Giá ${category.name} tại Viora Wine ${category.priceRange}. Chúng tôi có nhiều mức giá phù hợp: từ uống hàng ngày đến quà biếu cao cấp. Mọi sản phẩm đều đảm bảo chính hãng, không bán hàng giả.`,
    },
    {
      q: `Mua ${category.name} ở đâu uy tín tại Hà Nội và Đà Nẵng?`,
      a: `Viora Wine là địa chỉ mua ${category.name} uy tín tại Hà Nội và Đà Nẵng. Giao hàng toàn quốc, đóng gói chống vỡ, bảo đảm chính hãng 100%. Tư vấn miễn phí: ${category.phone}.`,
    },
    {
      q: `Sau khi mở chai ${category.name}, bảo quản bao lâu?`,
      a: `Sau khi mở nắp, ${category.name} nên được dùng trong 3–5 ngày. Dùng nút bần hoặc stopper để đậy kín, bảo quản trong tủ lạnh hoặc nơi thoáng mát, tránh ánh nắng trực tiếp. Rượu vang ngọt và vang có gas cần dùng sớm hơn (1–2 ngày).`,
    },
    {
      q: `Viora Wine có giao ${category.name} toàn quốc không?`,
      a: `Có! Viora Wine giao hàng toàn quốc với đóng gói chuyên dụng chống vỡ. Nội thành Đà Nẵng & Hà Nội: giao trong 2–4 giờ. Tỉnh thành khác: 1–3 ngày làm việc. Liên hệ ${category.phone} để được hỗ trợ đặt hàng nhanh nhất.`,
    },
  ];
}
