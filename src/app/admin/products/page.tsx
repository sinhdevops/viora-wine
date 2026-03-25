"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { ProductForm } from "@/components/admin/product-form";
import { TablePagination } from "@/components/admin/table-pagination";
import { createClient } from "@/lib/supabase";
import { type ProductFormValues } from "@/lib/schemas/product-schema";

type Product = ProductFormValues & { created_at: string };

function formatPrice(price: number) {
	return price.toLocaleString("vi-VN") + " ₫";
}

export default function ProductsPage() {
	const [open, setOpen] = useState(false);
	const [editProduct, setEditProduct] = useState<Product | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const PER_PAGE = 10;

	const fetchProducts = useCallback(async () => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) toast.error("Không thể tải danh sách sản phẩm");
		else { setProducts(data ?? []); setPage(1); }

		setLoading(false);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const handleDelete = async (id: string) => {
		if (!confirm("Bạn chắc muốn xoá sản phẩm này?")) return;
		setDeletingId(id);
		const supabase = createClient();
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) toast.error("Xoá thất bại: " + error.message);
		else {
			toast.success("Đã xoá sản phẩm");
			setProducts((prev) => prev.filter((p) => p.id !== id));
		}
		setDeletingId(null);
	};

	return (
		<div className="min-h-screen p-4 md:p-8">
			{/* Page header */}
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
					onClick={() => setOpen(true)}
					className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-700"
				>
					<Plus size={16} />
					Add Product
				</button>
			</div>

			{/* Table */}
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				{loading ? (
					<div className="flex items-center justify-center py-20 text-gray-400">
						<Loader2 size={24} className="animate-spin" />
					</div>
				) : products.length === 0 ? (
					<div className="py-20 text-center text-sm text-gray-400">
						Chưa có sản phẩm nào. Nhấn <strong>+ Add Product</strong> để tạo.
					</div>
				) : (
					<>
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
							{products.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((product) => (
								<tr
									key={product.id}
									className="transition-colors hover:bg-gray-50/60"
								>
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
												-{product.discount_percentage}% OFF
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
													? `${product.stock} in stock`
													: "Out of stock"}
											</span>
										</div>
									</td>

									{/* Hot */}
									<td className="px-5 py-4">
										{product.is_hot && (
											<div className="flex items-center gap-1.5">
												<span className="h-2 w-2 rounded-full bg-orange-400" />
												<span className="text-xs font-bold uppercase tracking-wider text-orange-500">
													Hot
												</span>
											</div>
										)}
									</td>

									{/* Actions */}
									<td className="px-5 py-4 text-right">
										<div className="flex items-center justify-end gap-1">
											<button
												onClick={() => setEditProduct(product)}
												className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
											>
												<Pencil size={14} />
											</button>
											<button
												onClick={() => handleDelete(product.id)}
												disabled={deletingId === product.id}
												className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
											>
												{deletingId === product.id ? (
													<Loader2 size={14} className="animate-spin" />
												) : (
													<Trash2 size={14} />
												)}
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					</div>
					<TablePagination
						total={products.length}
						page={page}
						perPage={PER_PAGE}
						onChange={setPage}
					/>
				</>
				)}
			</div>

			{/* Modal tạo mới */}
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title="Thêm sản phẩm mới"
				description="Điền đầy đủ thông tin để tạo sản phẩm"
				size="2xl"
			>
				<ProductForm
					onSuccess={() => {
						setOpen(false);
						fetchProducts();
					}}
				/>
			</Modal>

			{/* Modal chỉnh sửa */}
			<Modal
				open={!!editProduct}
				onClose={() => setEditProduct(null)}
				title="Chỉnh sửa sản phẩm"
				description={editProduct ? `ID: ${editProduct.id}` : ""}
				size="2xl"
			>
				{editProduct && (
					<ProductForm
						initialData={editProduct}
						onSuccess={() => {
							setEditProduct(null);
							fetchProducts();
						}}
					/>
				)}
			</Modal>
		</div>
	);
}
