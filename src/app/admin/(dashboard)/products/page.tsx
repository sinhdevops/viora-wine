"use client";

import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import { type ProductFormValues } from "@/lib/schemas/product-schema";

// Import sub-components
import { ProductTableHeader } from "@/components/admin/products/product-table-header";
import { CategoryTabs } from "@/components/admin/products/category-tabs";
import { ProductTable } from "@/components/admin/products/product-table";
import { ProductModals } from "@/components/admin/products/product-modals";

type Product = ProductFormValues & { created_at: string };

const PER_PAGE = 10;

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
	const [selectedTab, setSelectedTab] = useState<string>("all");
	const [search, setSearch] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);

	const fetchProducts = useCallback(async () => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			toast.error("Không thể tải danh sách sản phẩm");
		} else {
			setProducts(data ?? []);
			setPage(1);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const handleDelete = useCallback(async (id: string) => {
		if (!confirm("Bạn chắc muốn xoá sản phẩm này?")) return;
		setDeletingId(id);
		const supabase = createClient();
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) {
			toast.error("Xoá thất bại: " + error.message);
		} else {
			toast.success("Đã xoá sản phẩm");
			setProducts((prev) => prev.filter((p) => p.id !== id));
		}
		setDeletingId(null);
	}, []);

	const filteredProducts = useMemo(() => {
		const q = search.trim().toLowerCase();
		return products.filter((p) => {
			const matchTab = selectedTab === "all" || p.category === selectedTab;
			const matchSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
			return matchTab && matchSearch;
		});
	}, [products, selectedTab, search]);

	const getCategoryCount = useCallback((cat: string) => {
		return products.filter((p) => p.category === cat).length;
	}, [products]);

	const handleAddProduct = useCallback(() => setOpen(true), []);
	const handleCloseCreateModal = useCallback(() => setOpen(false), []);
	const handleEditProduct = useCallback((product: Product) => setEditProduct(product), []);
	const handleCloseEditModal = useCallback(() => setEditProduct(null), []);
	const handleTabChange = useCallback((tab: string) => {
		setSelectedTab(tab);
		setSearch("");
		setPage(1);
	}, []);

	const handleModalSuccess = useCallback(() => {
		setOpen(false);
		setEditProduct(null);
		fetchProducts();
	}, [fetchProducts]);

	return (
		<div className="min-h-screen p-4 md:p-8">
			<ProductTableHeader onAdd={handleAddProduct} />

			<CategoryTabs 
				selectedTab={selectedTab}
				onTabChange={handleTabChange}
				totalProducts={products.length}
				getCategoryCount={getCategoryCount}
			/>

			{/* Search */}
			<div className="mb-4 flex items-center gap-2">
				<div className="relative flex-1 max-w-sm">
					<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
					<input
						ref={searchRef}
						value={search}
						onChange={(e) => { setSearch(e.target.value); setPage(1); }}
						placeholder="Tìm theo tên hoặc ID..."
						className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-gray-400"
					/>
					{search && (
						<button
							onClick={() => { setSearch(""); searchRef.current?.focus(); }}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							<X size={14} />
						</button>
					)}
				</div>
				{search && (
					<span className="text-sm text-gray-500">
						{filteredProducts.length} kết quả
					</span>
				)}
			</div>

			<ProductTable
				loading={loading}
				products={products}
				filteredProducts={filteredProducts}
				page={page}
				perPage={PER_PAGE}
				deletingId={deletingId}
				onEdit={handleEditProduct}
				onDelete={handleDelete}
				onPageChange={setPage}
				formatPrice={formatPrice}
			/>

			<ProductModals 
				isCreateModalOpen={open}
				onCreateModalClose={handleCloseCreateModal}
				editProduct={editProduct}
				onEditModalClose={handleCloseEditModal}
				onSuccess={handleModalSuccess}
			/>
		</div>
	);
}
