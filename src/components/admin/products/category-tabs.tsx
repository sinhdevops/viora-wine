"use client";

import React from "react";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/schemas/product-schema";

interface CategoryTabsProps {
	selectedTab: string;
	onTabChange: (tab: string) => void;
	totalProducts: number;
	getCategoryCount: (cat: string) => number;
}

export const CategoryTabs = React.memo(({ 
	selectedTab, 
	onTabChange, 
	totalProducts, 
	getCategoryCount 
}: CategoryTabsProps) => {
	return (
		<div className="mb-6 flex flex-wrap items-center gap-2">
			<button
				onClick={() => onTabChange("all")}
				className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
					selectedTab === "all"
						? "bg-gray-900 text-white shadow-md active:scale-95"
						: "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 active:scale-95"
				}`}
			>
				All ({totalProducts})
			</button>
			{CATEGORIES.map((cat) => (
				<button
					key={cat}
					onClick={() => onTabChange(cat)}
					className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
						selectedTab === cat
							? "bg-gray-900 text-white shadow-md active:scale-95"
							: "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 active:scale-95"
					}`}
				>
					{CATEGORY_LABELS[cat]} ({getCategoryCount(cat)})
				</button>
			))}
		</div>
	);
});

CategoryTabs.displayName = "CategoryTabs";
