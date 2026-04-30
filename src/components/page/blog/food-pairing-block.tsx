"use client";

import { Link } from "@/i18n/routing";

interface FoodItem {
	emoji: string;
	name: string;
	desc: string;
	href?: string;
}

interface FoodPairingBlockProps {
	title: string;
	items: FoodItem[];
}

function FoodCard({ item }: { item: FoodItem }) {
	const inner = (
		<div
			className={[
				"group flex flex-col items-center gap-3 rounded-2xl border bg-white p-5 text-center transition-all",
				item.href
					? "hover:border-brand-primary/30 cursor-pointer border-gray-100 hover:shadow-md"
					: "border-gray-100",
			].join(" ")}
		>
			<span className="text-4xl leading-none">{item.emoji}</span>
			<div>
				<p className="mb-1 text-[13px] font-bold text-gray-900">{item.name}</p>
				<p className="text-[12px] leading-relaxed text-gray-500">{item.desc}</p>
			</div>
			{item.href && (
				<span className="text-brand-primary mt-auto text-[11px] font-semibold group-hover:underline">
					Xem sản phẩm →
				</span>
			)}
		</div>
	);

	if (item.href) {
		return <Link href={item.href as any}>{inner}</Link>;
	}
	return inner;
}

export default function FoodPairingBlock({ title, items }: FoodPairingBlockProps) {
	return (
		<aside className="my-10 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
			<div className="mb-5 flex items-center gap-2">
				<span className="text-xl">🍽️</span>
				<h3 className="text-[15px] font-semibold tracking-tight text-gray-900 uppercase">{title}</h3>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{items.map((item) => (
					<FoodCard key={item.name} item={item} />
				))}
			</div>
		</aside>
	);
}

/** Default food-pairing items (Vietnamese) – pass as `items` prop. */
export const DEFAULT_FOOD_ITEMS: FoodItem[] = [
	{
		emoji: "🥩",
		name: "Steak",
		desc: "Vang đỏ đậm như Shiraz hoặc Cabernet Sauvignon tôn lên vị béo của thịt bò nướng.",
		href: "/products?type=red-wine",
	},
	{
		emoji: "🍖",
		name: "BBQ",
		desc: "Vang đỏ trái cây như Merlot hoặc Grenache hợp cực kỳ với thịt nướng than hoa.",
		href: "/products?tag=bbq",
	},
	{
		emoji: "🧀",
		name: "Phô mai",
		desc: "Vang trắng Chardonnay hoặc Sauvignon Blanc cân bằng hoàn hảo với phô mai béo.",
		href: "/products?type=white-wine",
	},
	{
		emoji: "🥗",
		name: "Thịt nguội",
		desc: "Vang hồng nhẹ nhàng là bạn đồng hành lý tưởng cho đĩa thịt nguội và charcuterie.",
		href: "/products?type=rose-wine",
	},
];
