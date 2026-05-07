import { createClient } from "@/utils/supabase/server";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";

const ZALO_LINK = "https://zalo.me/0325610016";

const SELECT_COLS =
	"id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, tag, rating, sold_count, grape_variety, wine_type, country";

interface WineProductGridProps {
	wineType?: string;
	grapeVariety?: string;
	emptyLabel?: string;
}

export default async function WineProductGrid({ wineType, grapeVariety, emptyLabel }: WineProductGridProps) {
	const supabase = await createClient();

	let query = supabase.from("products").select(SELECT_COLS).order("sold_count", { ascending: false }).limit(24);

	if (grapeVariety) {
		query = query.or(`grape_variety.ilike.%${grapeVariety}%,name.ilike.%${grapeVariety}%`);
	} else if (wineType) {
		query = query.eq("wine_type", wineType);
	}

	const { data } = await query;
	const products = (data ?? []) as DbProduct[];

	if (products.length === 0) {
		return (
			<div className="rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
				<p className="mb-2 text-lg font-medium text-gray-700">{emptyLabel ?? "Đang cập nhật sản phẩm mới nhất"}</p>
				<p className="mb-6 text-sm text-gray-600">Liên hệ Zalo để được tư vấn và đặt hàng trực tiếp</p>
				<div className="flex flex-wrap justify-center gap-3">
					<a
						href={ZALO_LINK}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-lg bg-[#B22222] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8B0000]"
					>
						Tư vấn qua Zalo
					</a>
					<a
						href="/san-pham"
						className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
					>
						Xem tất cả sản phẩm
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-[600px] grid grid-cols-2 gap-4 content-start sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
			{products.map((product) => (
				<CardProduct key={product.id} product={product} />
			))}
		</div>
	);
}
