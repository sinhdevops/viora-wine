"use client";

import { Plus } from "lucide-react";
import React from "react";

interface ProductTableHeaderProps {
	onAdd: () => void;
}

export const ProductTableHeader = React.memo(({ onAdd }: ProductTableHeaderProps) => {
	return (
		<div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-8">
			<div>
				<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
					Products
				</h1>
				<p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
					Inventory &amp; Catalog Management
				</p>
			</div>

			<button
				onClick={onAdd}
				className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-700"
			>
				<Plus size={16} />
				Add Product
			</button>
		</div>
	);
});

ProductTableHeader.displayName = "ProductTableHeader";
