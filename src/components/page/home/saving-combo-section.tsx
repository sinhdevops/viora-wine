"use client";

import { useTranslations } from "next-intl";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";

const MOCK_COMBOS: DbProduct[] = [
	{
		id: "combo-1",
		name: "Combo 3 chai Vang Chile G7 Classic (Cabernet Sauvignon)",
		thumbnail_url: "/statics/images/category-wine1.webp",
		price: 840000,
		discount_percentage: 20,
		description: "Combo đặc biệt",
		content: "Combo đặc biệt",
		category: "combo",
		stock: 100,
		is_hot: true,
	},
	{
		id: "combo-2",
		name: "Combo 2 chai Vang Pháp Chateau cao cấp",
		thumbnail_url: "/statics/images/category-wine2.webp",
		price: 1500000,
		discount_percentage: 25,
		description: "Combo đặc biệt",
		content: "Combo đặc biệt",
		category: "combo",
		stock: 100,
		is_hot: false,
	},
	{
		id: "combo-3",
		name: "Combo 6 chai Vang Ý Luccarelli (Tặng kèm khui vang)",
		thumbnail_url: "/statics/images/category-wine4.webp",
		price: 1680000,
		discount_percentage: 30,
		description: "Combo đặc biệt",
		content: "Combo đặc biệt",
		category: "combo",
		stock: 100,
		is_hot: false,
	},
		{
		id: "combo-4",
		name: "Combo 6 chai Vang Ý Luccarelli (Tặng kèm khui vang)",
		thumbnail_url: "/statics/images/category-wine4.webp",
		price: 1680000,
		discount_percentage: 30,
		description: "Combo đặc biệt",
		content: "Combo đặc biệt",
		category: "combo",
		stock: 100,
		is_hot: false,
	},
		{
		id: "combo-5",
		name: "Combo 6 chai Vang Ý Luccarelli (Tặng kèm khui vang)",
		thumbnail_url: "/statics/images/category-wine4.webp",
		price: 1680000,
		discount_percentage: 30,
		description: "Combo đặc biệt",
		content: "Combo đặc biệt",
		category: "combo",
		stock: 100,
		is_hot: false,
	},
];

export default function SavingComboSection() {
	const t = useTranslations("home");

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="mb-10 text-center">
					<h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.15em] md:text-[28px]">
						{t("combos")}
					</h2>
					<p className="text-gray-500 text-sm md:text-base mx-auto max-w-2xl">
						{t("combos_subtitle")}
					</p>
				</div>

				{/* Grid Layout for 3 Combo Cards */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
					{MOCK_COMBOS.map((combo) => (
						<CardProduct key={combo.id} product={combo} isHot={combo.is_hot} />
					))}
				</div>
			</div>
		</section>
	);
}
