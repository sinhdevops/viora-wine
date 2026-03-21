import { createClient } from "@/utils/supabase/server";
import GiftsPageContent from "./_page-content";
import type { DbProduct } from "@/@types/product";

export default async function GiftsPage() {
	const supabase = await createClient();

	const { data: products } = await supabase
		.from("products")
		.select("id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
		.in("category", ["gift", "combo"])
		.order("is_hot", { ascending: false });

	return <GiftsPageContent products={products as DbProduct[] ?? []} />;
}
