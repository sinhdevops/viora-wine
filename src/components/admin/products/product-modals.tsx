"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { ProductForm } from "@/components/admin/product-form";
import { type ProductFormValues } from "@/lib/schemas/product-schema";

type Product = ProductFormValues & { created_at: string };

interface ProductModalsProps {
	isCreateModalOpen: boolean;
	onCreateModalClose: () => void;
	editProduct: Product | null;
	onEditModalClose: () => void;
	onSuccess: () => void;
}

export const ProductModals = React.memo(({
	isCreateModalOpen,
	onCreateModalClose,
	editProduct,
	onEditModalClose,
	onSuccess
}: ProductModalsProps) => {
	return (
		<>
			{/* Modal tạo mới */}
			<Modal
				open={isCreateModalOpen}
				onClose={onCreateModalClose}
				title="Thêm sản phẩm mới"
				description="Điền đầy đủ thông tin để tạo sản phẩm"
				size="2xl"
			>
				<ProductForm
					onSuccess={onSuccess}
				/>
			</Modal>

			{/* Modal chỉnh sửa */}
			<Modal
				open={!!editProduct}
				onClose={onEditModalClose}
				title="Chỉnh sửa sản phẩm"
				description={editProduct ? `ID: ${editProduct.id}` : ""}
				size="2xl"
			>
				{editProduct && (
					<ProductForm
						initialData={editProduct}
						onSuccess={onSuccess}
					/>
				)}
			</Modal>
		</>
	);
});

ProductModals.displayName = "ProductModals";
