import { PRODUCTS } from '@/constants/products';
import { notFound } from 'next/navigation';
import ProductDetailPageContent from './_page-content';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageContent product={product} />;
}
