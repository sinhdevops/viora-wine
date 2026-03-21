"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { supabase } from "@/lib/supabase-client";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";

const tabs = [
	{ id: "all", label: "TẤT CẢ" },
	{ id: "red", label: "VANG ĐỎ" },
	{ id: "white", label: "VANG TRẮNG" },
	{ id: "rose", label: "VANG HỒNG" },
	{ id: "sparkling", label: "VANG NỔ" },
	{ id: "champagne", label: "CHAMPAGNE" },
	{ id: "sweet", label: "VANG NGỌT" },
];

export default function GoodWineSection() {
	const [activeTab, setActiveTab] = useState("all");
	const [products, setProducts] = useState<DbProduct[]>([]);

	useEffect(() => {
		supabase
			.from("products")
			.select("id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot")
			.eq("category", "wine")
			.limit(10)
			.then(({ data }) => {
				if (data) setProducts(data as DbProduct[]);
			});
	}, []);

	const displayed = products;

	return (
		<section className="bg-white py-12 md:py-14">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-xl font-black uppercase tracking-tight md:text-[26px]">
						VANG NGON GIÁ TỐT
					</h2>
					<Link
						href="/products?cat=wine"
						className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
					>
						Xem tất cả <ArrowRight size={15} />
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
									? "border-b-2 border-brand-primary text-brand-primary"
									: "text-gray-500 hover:text-gray-800"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-5">
					{displayed.map((product) => (
						<CardProduct key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
