import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductDetailPageContent from "./_page-content";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
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

	return <ProductDetailPageContent product={product} related={related ?? []} />;
}
