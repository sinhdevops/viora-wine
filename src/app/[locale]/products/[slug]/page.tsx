import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductDetailPageContent from "./_page-content";
import { buildPageUrl, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFAQSchema, jsonLdScript } from "@/lib/geo-schemas";
export { generateMetadata } from "./metadata";

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("id, slug, name, description, thumbnail_url, images, content, price, discount_percentage, category, stock, tag, rating, sold_count, volume, grape_variety, wine_type, producer, alcohol, country, food_pairing")
    .eq("slug", slug)
    .single();

  if (!product) notFound();

  const { data: relatedRaw } = await supabase
    .from("products")
    .select("id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, tag, rating, sold_count, country, wine_type")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(30);

  const related = (relatedRaw ?? [])
    .map((p) => ({
      ...p,
      _score:
        (p.country && p.country === product.country ? 3 : 0) +
        (p.wine_type && p.wine_type === product.wine_type ? 2 : 0) +
        (p.tag ? 1 : 0) +
        (p.sold_count ?? 0) / 1000,
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 8);

  const productUrl = buildPageUrl(locale, `/products/${slug}`);
  const productsListUrl = buildPageUrl(locale, '/products');

  const salePrice = product.discount_percentage
    ? Math.round(product.price * (1 - product.discount_percentage / 100))
    : product.price;

  const productImages = [
    product.thumbnail_url,
    ...(product.images ?? []),
  ].filter(Boolean);

  const ratingValue = product.rating && product.rating > 0 ? product.rating : 5.0;
  const reviewCount = Math.max(product.sold_count ?? 0, 1);

  // ── additionalProperty — specs rượu vang để AI trích dẫn chính xác ──
  const additionalProperty: unknown[] = [];
  if (product.volume) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Dung tích', value: product.volume, unitCode: 'MLT' });
  }
  if (product.alcohol) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Độ cồn', value: `${product.alcohol}%` });
  }
  if (product.grape_variety) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Giống nho', value: product.grape_variety });
  }
  if (product.wine_type) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Loại vang', value: product.wine_type });
  }
  if (product.country) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Xuất xứ', value: product.country });
  }
  if (product.producer) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Nhà sản xuất', value: product.producer });
  }
  if (product.food_pairing) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Kết hợp với', value: product.food_pairing });
  }

  // ── Product JSON-LD đầy đủ ──
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': productUrl,
    name: product.name,
    image: productImages,
    description: product.description,
    sku: product.id,
    mpn: product.slug,
    brand: { '@type': 'Brand', name: product.producer ?? 'Viora Wine' },
    ...(product.country && { countryOfOrigin: product.country }),
    ...(product.grape_variety && { material: product.grape_variety }),
    ...(product.producer && {
      manufacturer: { '@type': 'Organization', name: product.producer },
    }),
    ...(additionalProperty.length > 0 && { additionalProperty }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      reviewCount,
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: ratingValue.toFixed(1),
          bestRating: '5',
          worstRating: '1',
        },
        author: { '@type': 'Organization', name: 'Viora Wine', url: SITE_URL },
        reviewBody: `${product.name} là sản phẩm nhập khẩu chính hãng được kiểm định chất lượng bởi đội ngũ chuyên gia của Viora Wine.${product.country ? ` Xuất xứ ${product.country}.` : ''}${product.grape_variety ? ` Giống nho ${product.grape_variety}.` : ''}${product.alcohol ? ` Độ cồn ${product.alcohol}%.` : ''}`,
        datePublished: new Date().toISOString().split('T')[0],
      },
    ],
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'VND',
      price: salePrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Viora Wine', url: SITE_URL },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'VN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 3,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'VN',
        },
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'VND' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': productUrl,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.product-description', '.product-price'],
    },
  };

  // ── FAQ 8 câu — AI sẽ trích dẫn trực tiếp trong câu trả lời ──
  const servingTemp = product.wine_type?.toLowerCase().includes('trắng') || product.wine_type?.toLowerCase().includes('hồng')
    ? '8–12°C'
    : '14–18°C';

  const faqJsonLd = buildFAQSchema([
    {
      q: `${product.name} uống ở nhiệt độ bao nhiêu là ngon nhất?`,
      a: `${product.name} nên được thưởng thức ở nhiệt độ ${servingTemp}. Mở nắp trước 15–30 phút để rượu tiếp xúc không khí, giúp hương thơm phát triển tốt nhất. Tránh uống quá lạnh hoặc quá ấm.`,
    },
    {
      q: `${product.name} có phải rượu vang nhập khẩu chính hãng không?`,
      a: `Có. Tất cả sản phẩm tại Viora Wine đều là rượu vang nhập khẩu chính hãng với đầy đủ giấy tờ hải quan, tem nhập khẩu và chứng nhận xuất xứ (C/O). ${product.country ? `${product.name} được nhập khẩu trực tiếp từ ${product.country}.` : ''}`,
    },
    {
      q: `Mua ${product.name} ở đâu uy tín tại Hà Nội và Đà Nẵng?`,
      a: `Bạn có thể mua ${product.name} tại Viora Wine — shop rượu vang nhập khẩu chính hãng uy tín tại Hà Nội và Đà Nẵng. Giao hàng toàn quốc, tư vấn miễn phí 24/7 qua Zalo: 0325-610-016.`,
    },
    {
      q: `Sau khi mở, ${product.name} bảo quản được bao lâu?`,
      a: `Sau khi mở nút, bạn nên dùng ${product.name} trong vòng 3–5 ngày. Đậy nút kín và bảo quản trong tủ lạnh để giữ hương vị tốt nhất. Tránh ánh sáng trực tiếp và nhiệt độ cao.`,
    },
    {
      q: `${product.name} uống cùng món ăn gì ngon nhất?`,
      a: product.food_pairing
        ? `${product.name} kết hợp tuyệt vời với: ${product.food_pairing}. Rượu vang và thức ăn bổ sung cho nhau khi có sự cân bằng về độ đậm, acid và chất béo.`
        : `${product.name} phù hợp với các món thịt đỏ (bò nướng, cừu), phô mai cứng và các món pasta. Tham khảo thêm tại Viora Wine qua Zalo: 0325-610-016.`,
    },
    {
      q: `Giá ${product.name} là bao nhiêu? Có khuyến mãi không?`,
      a: `Giá ${product.name} tại Viora Wine là ${salePrice.toLocaleString('vi-VN')}đ${product.discount_percentage ? ` (đang giảm ${product.discount_percentage}%)` : ''}. Viora Wine thường xuyên có chương trình khuyến mãi theo tháng. Liên hệ Zalo 0325-610-016 để được báo giá mới nhất và ưu đãi hiện hành.`,
    },
    {
      q: `${product.name} có phù hợp làm quà tặng không?`,
      a: `${product.name} là lựa chọn quà tặng sang trọng và ý nghĩa. Viora Wine cung cấp dịch vụ đóng hộp quà, giỏ rượu và wrap ribbon theo yêu cầu. Phù hợp cho quà sinh nhật, kỷ niệm, tặng đối tác kinh doanh. Gọi 0325-610-016 để đặt quà tặng.`,
    },
    {
      q: `${product.name} có độ cồn bao nhiêu? Phù hợp với ai?`,
      a: product.alcohol
        ? `${product.name} có độ cồn ${product.alcohol}%. ${parseFloat(product.alcohol) <= 12 ? 'Độ cồn vừa phải, phù hợp cho người mới bắt đầu uống vang và phụ nữ.' : parseFloat(product.alcohol) <= 14 ? 'Độ cồn chuẩn của rượu vang, phù hợp với hầu hết người thưởng thức.' : 'Độ cồn cao, phù hợp với người có kinh nghiệm thưởng thức rượu vang đậm đà.'} Hỏi thêm tư vấn qua Zalo: 0325-610-016.`
        : `${product.name} là rượu vang nhập khẩu chính hãng với độ cồn vừa phải. Liên hệ Viora Wine qua Zalo 0325-610-016 để được tư vấn cụ thể.`,
    },
  ]);

  // ── Breadcrumb ──
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Trang chủ', url: SITE_URL },
    { name: 'Sản phẩm', url: productsListUrl },
    { name: product.name, url: productUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <ProductDetailPageContent product={product} related={related ?? []} />
    </>
  );
}
