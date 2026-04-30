"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { supabase } from "@/lib/supabase-client";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";
import { useTranslations } from "next-intl";

export default function GoodWineSection() {
	const t = useTranslations("home");
	const [activeTab, setActiveTab] = useState("all");
	const [products, setProducts] = useState<DbProduct[]>([]);
	const [loading, setLoading] = useState(true);

	const tabs = [
		{ id: "all", label: t("good_wine_tab_all") },
		{ id: "red", label: t("good_wine_tab_red") },
		{ id: "white", label: t("good_wine_tab_white") },
		{ id: "rose", label: t("good_wine_tab_rose") },
		{ id: "sparkling", label: t("good_wine_tab_sparkling") },
		{ id: "champagne", label: t("good_wine_tab_champagne") },
		{ id: "sweet", label: t("good_wine_tab_sweet") },
	];

	useEffect(() => {
		setLoading(true);
		const query = supabase
			.from("products")
			.select(
				"id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, tag, wine_type, rating, sold_count",
			)
			.eq("category", "wine")
			.order("rating", { ascending: false })
			.order("sold_count", { ascending: false })
			.limit(10);

		if (activeTab !== "all") {
			query.eq("wine_type", activeTab);
		}

		query.then(({ data }) => {
			setProducts((data as DbProduct[]) ?? []);
			setLoading(false);
		});
	}, [activeTab]);

	const displayed = products;

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-xl font-semibold tracking-tight uppercase md:text-[26px]">
						{t("good_wine_title")}
					</h2>
					<Link
						href={"/products?cat=wine" as any}
						className="text-brand-primary flex items-center gap-1 text-sm font-medium hover:underline"
					>
						{t("good_wine_view_all")} <ArrowRight size={15} />
					</Link>
				</div>

				{/* Tabs */}
				<div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-gray-200">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`shrink-0 pb-3 text-[13px] font-semibold tracking-wider transition-colors ${
								activeTab === tab.id
									? "border-brand-primary text-brand-primary border-b-2"
									: "text-gray-500 hover:text-gray-800"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Product Grid */}
				{loading ? (
					<div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-5">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="aspect-216/290 animate-pulse rounded-xl bg-gray-100" />
						))}
					</div>
				) : displayed.length > 0 ? (
					<div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-5">
						{displayed.map((product) => (
							<CardProduct key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<p className="text-sm text-gray-400">{t("good_wine_empty")}</p>
					</div>
				)}
			</div>
		</section>
	);
}
