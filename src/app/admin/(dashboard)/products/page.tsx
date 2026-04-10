"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
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
		return products.filter((p) =>
			selectedTab === "all" ? true : p.category === selectedTab
		);
	}, [products, selectedTab]);

	const getCategoryCount = useCallback((cat: string) => {
		return products.filter((p) => p.category === cat).length;
	}, [products]);

	const handleAddProduct = useCallback(() => setOpen(true), []);
	const handleCloseCreateModal = useCallback(() => setOpen(false), []);
	const handleEditProduct = useCallback((product: Product) => setEditProduct(product), []);
	const handleCloseEditModal = useCallback(() => setEditProduct(null), []);
	const handleTabChange = useCallback((tab: string) => {
		setSelectedTab(tab);
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
