"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { ProductTableRow } from "./product-table-row";
import { TablePagination } from "@/components/admin/table-pagination";
import { type ProductFormValues } from "@/lib/schemas/product-schema";

type Product = ProductFormValues & { created_at: string };

interface ProductTableProps {
	loading: boolean;
	products: Product[];
	filteredProducts: Product[];
	page: number;
	perPage: number;
	deletingId: string | null;
	onEdit: (product: Product) => void;
	onDelete: (id: string) => void;
	onPageChange: (page: number) => void;
	formatPrice: (price: number) => string;
}

export const ProductTable = React.memo(({
	loading,
	products,
	filteredProducts,
	page,
	perPage,
	deletingId,
	onEdit,
	onDelete,
	onPageChange,
	formatPrice
}: ProductTableProps) => {
	if (loading) {
		return (
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				<div className="flex items-center justify-center py-20 text-gray-400">
					<Loader2 size={24} className="animate-spin" />
				</div>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				<div className="py-20 text-center text-sm text-gray-400">
					Chưa có sản phẩm nào. Nhấn <strong>+ Add Product</strong> để tạo.
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full min-w-160 text-sm">
					<thead>
						<tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
							<th className="px-5 py-4">Product</th>
							<th className="px-5 py-4">Category</th>
							<th className="px-5 py-4">Price</th>
							<th className="px-5 py-4">Stock</th>
							<th className="px-5 py-4">Hot</th>
							<th className="px-5 py-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50">
						{filteredProducts.slice((page - 1) * perPage, page * perPage).map((product) => (
							<ProductTableRow 
								key={product.id}
								product={product}
								onEdit={onEdit}
								onDelete={onDelete}
								isDeleting={deletingId === product.id}
								formatPrice={formatPrice}
							/>
						))}
					</tbody>
				</table>
			</div>
			<TablePagination
				total={filteredProducts.length}
				page={page}
				perPage={perPage}
				onChange={onPageChange}
			/>
		</div>
	);
});

ProductTable.displayName = "ProductTable";
