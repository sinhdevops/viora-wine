"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import "react-quill-new/dist/quill.snow.css";

import {
	CATEGORIES,
	WINE_TYPES,
	WINE_TYPE_LABELS,
	productSchema,
	type ProductFormValues,
} from "@/lib/schemas/product-schema";
import { ImageUploader } from "./image-uploader";
import { supabase } from "@/lib/supabase-client";

const QuillEditor = dynamic(() => import("react-quill-new"), {
	ssr: false,
	loading: () => (
		<div className="flex h-40 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-400">
			Đang tải editor...
		</div>
	),
});

const cls = {
	label: "mb-1.5 block text-sm font-medium text-gray-700",
	input:
		"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-[#C80000] focus:outline-none focus:ring-1 focus:ring-[#C80000]",
	error: "mt-1 text-xs text-red-500",
};

interface ProductFormProps {
	initialData?: ProductFormValues;
	onSuccess?: () => void;
}

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
	const isEdit = !!initialData;

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: initialData ?? {
			id: "",
			name: "",
			description: "",
			thumbnail_url: "",
			content: "",
			price: 0,
			discount_percentage: 0,
			category: CATEGORIES[0],
			wine_type: null,
			stock: 0,
			is_hot: false,
		},
	});

	const thumbnailUrl = watch("thumbnail_url");
	const category     = watch("category");
	const isWine       = category === "wine";

	useEffect(() => {
		if (!isEdit) {
			const num = Date.now().toString().slice(-6);
			setValue("id", `vw-${num}`);
		}
	}, [isEdit, setValue]);

	const onSubmit = async (data: ProductFormValues) => {

		if (isEdit) {
			const { id, ...rest } = data;
			const { error } = await supabase
				.from("products")
				.update(rest)
				.eq("id", id);
			if (error) {
				toast.error("Lỗi khi cập nhật: " + error.message);
				return;
			}
			toast.success("Cập nhật sản phẩm thành công!");
		} else {
			const { error } = await supabase.from("products").insert(data);
			if (error) {
				toast.error("Lỗi khi lưu sản phẩm: " + error.message);
				return;
			}
			toast.success("Tạo sản phẩm thành công!");
			reset();
		}

		onSuccess?.();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Row 1: ID + Name */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className={cls.label}>
						ID <span className="text-red-500">*</span>
					</label>
					<input
						{...register("id")}
						className={cls.input + " cursor-not-allowed bg-gray-50 text-gray-400"}
						disabled
					/>
					{errors.id && <p className={cls.error}>{errors.id.message}</p>}
				</div>

				<div>
					<label className={cls.label}>
						Tên sản phẩm <span className="text-red-500">*</span>
					</label>
					<input
						{...register("name")}
						className={cls.input}
						placeholder="Château Margaux 2015"
					/>
					{errors.name && <p className={cls.error}>{errors.name.message}</p>}
				</div>
			</div>

			{/* Description */}
			<div>
				<label className={cls.label}>
					Mô tả ngắn <span className="text-red-500">*</span>
				</label>
				<textarea
					{...register("description")}
					rows={3}
					className={cls.input}
					placeholder="Mô tả ngắn về sản phẩm..."
				/>
				{errors.description && (
					<p className={cls.error}>{errors.description.message}</p>
				)}
			</div>

			{/* Thumbnail */}
			<div>
				<label className={cls.label}>
					Ảnh sản phẩm <span className="text-red-500">*</span>
				</label>
				<ImageUploader
					value={thumbnailUrl}
					onChange={(url) =>
						setValue("thumbnail_url", url, { shouldValidate: true })
					}
					error={errors.thumbnail_url?.message}
				/>
			</div>

			{/* Content - Quill */}
			<div>
				<label className={cls.label}>
					Nội dung chi tiết <span className="text-red-500">*</span>
				</label>
				<Controller
					name="content"
					control={control}
					render={({ field }) => (
						<QuillEditor
							theme="snow"
							value={field.value}
							onChange={field.onChange}
							modules={{
								toolbar: [
									[{ header: [1, 2, 3, false] }],
									["bold", "italic", "underline", "strike"],
									[{ list: "ordered" }, { list: "bullet" }],
									["blockquote", "code-block"],
									["link", "image"],
									["clean"],
								],
							}}
						/>
					)}
				/>
				{errors.content && (
					<p className={cls.error}>{errors.content.message}</p>
				)}
			</div>

			{/* Row: Price + Discount + Stock */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div>
					<label className={cls.label}>
						Giá (VNĐ) <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						{...register("price", { valueAsNumber: true })}
						className={cls.input}
						min={0}
						placeholder="0"
					/>
					{errors.price && <p className={cls.error}>{errors.price.message}</p>}
				</div>

				<div>
					<label className={cls.label}>Giảm giá (%)</label>
					<input
						type="number"
						{...register("discount_percentage", { valueAsNumber: true })}
						className={cls.input}
						min={0}
						max={100}
						placeholder="0"
					/>
					{errors.discount_percentage && (
						<p className={cls.error}>{errors.discount_percentage.message}</p>
					)}
				</div>

				<div>
					<label className={cls.label}>
						Kho <span className="text-red-500">*</span>
					</label>
					<input
						type="number"
						{...register("stock", { valueAsNumber: true })}
						className={cls.input}
						min={0}
						placeholder="0"
					/>
					{errors.stock && (
						<p className={cls.error}>{errors.stock.message}</p>
					)}
				</div>
			</div>

			{/* Row: Category + Wine type */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className={cls.label}>Danh mục</label>
					<select {...register("category")} className={cls.input}>
						{CATEGORIES.map((cat) => (
							<option key={cat} value={cat}>
								{{ wine: "Rượu vang", whisky: "Whisky", spirits: "Rượu mạnh", combo: "Combo", gift: "Quà tặng" }[cat]}
							</option>
						))}
					</select>
					{errors.category && (
						<p className={cls.error}>{errors.category.message}</p>
					)}
				</div>

				<div>
					<label className={`${cls.label} ${!isWine ? "text-gray-400" : ""}`}>
						Loại vang
						{!isWine && (
							<span className="ml-1.5 text-xs font-normal text-gray-400">
								(chỉ dùng cho Rượu vang)
							</span>
						)}
					</label>
					<select
						{...register("wine_type")}
						disabled={!isWine}
						className={
							cls.input +
							(!isWine ? " cursor-not-allowed bg-gray-50 text-gray-400 opacity-60" : "")
						}
					>
						<option value="">-- Chọn loại vang --</option>
						{WINE_TYPES.map((type) => (
							<option key={type} value={type}>
								{WINE_TYPE_LABELS[type]}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Is Hot */}
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					id="is_hot"
					{...register("is_hot")}
					className="h-4 w-4 rounded border-gray-300 accent-brand-primary"
				/>
				<label htmlFor="is_hot" className="text-sm font-medium text-gray-700">
					Sản phẩm nổi bật (Hot)
				</label>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-3 border-t border-gray-100 pt-2">
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-2 rounded-lg bg-[#C80000] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a30000] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting && <Loader2 size={16} className="animate-spin" />}
					{isEdit ? "Cập nhật" : "Tạo sản phẩm"}
				</button>

				<button
					type="button"
					onClick={() => reset()}
					className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
				>
					Đặt lại
				</button>
			</div>
		</form>
	);
}
