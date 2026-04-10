import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductDetailPageContent from "./_page-content";
export { generateMetadata } from "./metadata";

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
    .eq("id", slug)
    .single();

  if (!product) notFound();

  const { data: related } = await supabase
    .from("products")
    .select("id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(5);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viorawine.vn';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.thumbnail_url,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${slug}`,
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
        item: `${baseUrl}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sản phẩm',
        item: `${baseUrl}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${baseUrl}/products/${slug}`,
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
