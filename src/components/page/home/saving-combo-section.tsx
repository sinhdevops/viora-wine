"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";

export default function SavingComboSection() {
	const t = useTranslations("home");
	const [combos, setCombos] = useState<DbProduct[]>([]);

	useEffect(() => {
		supabase
			.from("products")
			.select(
				"id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, tag, rating, sold_count",
			)
			.eq("category", "combo")
			.order("created_at", { ascending: false })
			.limit(10)
			.then(({ data }) => {
				if (data) setCombos(data as DbProduct[]);
			});
	}, []);

	if (combos.length === 0) return null;

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="mb-6">
					<h2 className="mb-3 text-xl font-semibold tracking-[0.15em] uppercase md:text-[28px]">
						COMBO ƯU ĐÃI HOT NHẤT
					</h2>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:gap-6">
					{combos.map((combo) => (
						<CardProduct key={combo.id} product={combo} />
					))}
				</div>
			</div>
		</section>
	);
}
