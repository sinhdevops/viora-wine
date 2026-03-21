import { createClient } from "@/utils/supabase/server";
import PromotionPageContent from "./_page-content";
import type { DbProduct } from "@/@types/product";

export default async function PromotionPage() {
	const supabase = await createClient();

	const { data: products } = await supabase
		.from("products")
		.select("id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
		.gt("discount_percentage", 0)
		.order("discount_percentage", { ascending: false });

	return <PromotionPageContent products={products as DbProduct[] ?? []} />;
}
