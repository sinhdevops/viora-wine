import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductDetailPageContent from "./_page-content";
import { buildPageUrl, SITE_URL } from "@/lib/seo";
export { generateMetadata } from "./metadata";

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("id, slug, name, description, thumbnail_url, images, content, price, discount_percentage, category, stock, tag, rating, sold_count, volume, grape_variety, wine_type, producer, alcohol, country")
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

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: productImages,
    description: product.description,
    sku: product.id,
    ...(product.country && { countryOfOrigin: product.country }),
    ...(product.grape_variety && { material: product.grape_variety }),
    ...(product.producer && {
      brand: { '@type': 'Brand', name: product.producer },
      manufacturer: { '@type': 'Organization', name: product.producer },
    }),
    ...(product.rating && product.rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        reviewCount: product.sold_count ?? 1,
      },
    }),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'VND',
      price: salePrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Viora Wine', url: 'https://www.viorawine.com' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'VND' },
        deliveryTime: { '@type': 'ShippingDeliveryTime', businessDays: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] } },
      },
    },
  };

  // FAQ schema — wine product common questions
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${product.name} uống ở nhiệt độ bao nhiêu là ngon nhất?`,
        acceptedAnswer: { '@type': 'Answer', text: `${product.name} nên được thưởng thức ở nhiệt độ 14–18°C. Mở nắp trước 15–30 phút để rượu tiếp xúc không khí, giúp hương thơm phát triển tốt nhất.` },
      },
      {
        '@type': 'Question',
        name: `${product.name} có phải rượu vang nhập khẩu chính hãng không?`,
        acceptedAnswer: { '@type': 'Answer', text: `Có. Tất cả sản phẩm tại Viora Wine đều là rượu vang nhập khẩu chính hãng với đầy đủ giấy tờ, tem nhập khẩu và chứng nhận xuất xứ. ${product.country ? `${product.name} được nhập khẩu trực tiếp từ ${product.country}.` : ''}` },
      },
      {
        '@type': 'Question',
        name: `Mua ${product.name} ở đâu uy tín tại Hà Nội và Đà Nẵng?`,
        acceptedAnswer: { '@type': 'Answer', text: `Bạn có thể mua ${product.name} tại Viora Wine — shop rượu vang nhập khẩu chính hãng uy tín tại Hà Nội và Đà Nẵng. Giao hàng toàn quốc, tư vấn miễn phí 24/7 qua Zalo: 0325-610-016.` },
      },
      {
        '@type': 'Question',
        name: `Sau khi mở, ${product.name} bảo quản được bao lâu?`,
        acceptedAnswer: { '@type': 'Answer', text: `Sau khi mở nút, bạn nên dùng ${product.name} trong vòng 3–5 ngày. Đậy nút kín và bảo quản trong tủ lạnh để giữ hương vị tốt nhất. Tránh ánh sáng trực tiếp và nhiệt độ cao.` },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sản phẩm',
        item: productsListUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ProductDetailPageContent product={product} related={related ?? []} />
    </>
  );
}
