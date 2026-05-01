"use client";

import React from "react";
import Image from "next/image";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { type ProductFormValues } from "@/lib/schemas/product-schema";

type Product = ProductFormValues & { created_at: string };

interface ProductTableRowProps {
	product: Product;
	onEdit: (product: Product) => void;
	onDelete: (id: string) => void;
	isDeleting: boolean;
	formatPrice: (price: number) => string;
}

export const ProductTableRow = React.memo(({ 
	product, 
	onEdit, 
	onDelete, 
	isDeleting, 
	formatPrice 
}: ProductTableRowProps) => {
	return (
		<tr className="transition-colors hover:bg-gray-50/60">
			{/* Product */}
			<td className="px-5 py-4">
				<div className="flex items-center gap-3">
					<div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gray-100">
						{product.thumbnail_url ? (
							<Image
								src={product.thumbnail_url}
								alt={product.name}
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-gray-300">
								?
							</div>
						)}
					</div>
					<div>
						<p className="font-bold text-gray-900">{product.name}</p>
						<p className="text-xs text-gray-400">ID: {product.id}</p>
					</div>
				</div>
			</td>

			{/* Category */}
			<td className="px-5 py-4">
				<span className="rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
					{product.category}
				</span>
			</td>

			{/* Price */}
			<td className="px-5 py-4">
				<p className="font-bold text-gray-900">
					{formatPrice(product.price)}
				</p>
				{product.discount_percentage > 0 && (
					<p className="text-xs font-medium text-brand-primary">
						-{product.discount_percentage}% giảm giá
					</p>
				)}
			</td>

			{/* Stock */}
			<td className="px-5 py-4">
				<div className="flex items-center gap-1.5">
					<span
						className={`h-2 w-2 rounded-full ${
							product.stock > 0 ? "bg-green-400" : "bg-gray-300"
						}`}
					/>
					<span className="text-gray-600">
						{product.stock > 0
							? `${product.stock} còn hàng`
							: "Hết hàng"}
					</span>
				</div>
			</td>

			{/* Tag */}
			<td className="px-5 py-4">
				{product.tag ? (
					<span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
						{product.tag.replace("_", " ")}
					</span>
				) : null}
			</td>

			{/* Actions */}
			<td className="px-5 py-4 text-right">
				<div className="flex items-center justify-end gap-1">
					<button
						onClick={() => onEdit(product)}
						className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
					>
						<Pencil size={14} />
					</button>
					<button
						onClick={() => onDelete(product.id)}
						disabled={isDeleting}
						className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
					>
						{isDeleting ? (
							<Loader2 size={14} className="animate-spin" />
						) : (
							<Trash2 size={14} />
						)}
					</button>
				</div>
			</td>
		</tr>
	);
});

ProductTableRow.displayName = "ProductTableRow";
