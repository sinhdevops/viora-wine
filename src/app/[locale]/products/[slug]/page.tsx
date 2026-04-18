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
    .select("id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot, rating, sold_count, volume, grape_variety, wine_type, producer, alcohol, country")
    .eq("slug", slug)
    .single();

  if (!product) notFound();

  const { data: relatedRaw } = await supabase
    .from("products")
    .select("id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot, rating, sold_count, country, wine_type")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(30);

  const related = (relatedRaw ?? [])
    .map((p) => ({
      ...p,
      _score:
        (p.country && p.country === product.country ? 3 : 0) +
        (p.wine_type && p.wine_type === product.wine_type ? 2 : 0) +
        (p.is_hot ? 1 : 0) +
        (p.sold_count ?? 0) / 1000,
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 8);

  const productUrl = buildPageUrl(locale, `/products/${slug}`);
  const productsListUrl = buildPageUrl(locale, '/products');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.thumbnail_url,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'VND',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailPageContent product={product} related={related ?? []} />
    </>
  );
}
