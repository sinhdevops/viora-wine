"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
	heroBannerSchema,
	type HeroBannerFormValues,
} from "@/lib/schemas/hero-banner-schema";
import { createClient } from "@/lib/supabase";
import { ImageUploader } from "./image-uploader";

const MAX_ACTIVE = 5;

interface HeroBannerFormProps {
	initialData?: { id: string; image_url: string; is_active: boolean };
	activeCount: number;
	onSuccess?: () => void;
}

export function HeroBannerForm({ initialData, activeCount, onSuccess }: HeroBannerFormProps) {
	const isEdit = !!initialData;

	const {
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<HeroBannerFormValues>({
		resolver: zodResolver(heroBannerSchema),
		defaultValues: initialData ?? { image_url: "", is_active: false },
	});

	const imageUrl = watch("image_url");
	const isActive = watch("is_active");

	// Active count excluding this banner (relevant in edit mode)
	const otherActiveCount = isEdit && initialData.is_active ? activeCount - 1 : activeCount;
	const canActivate = otherActiveCount < MAX_ACTIVE;

	const handleToggle = () => {
		if (!isActive && !canActivate) {
			toast.error(`Đã đạt tối đa ${MAX_ACTIVE} banner active`);
			return;
		}
		setValue("is_active", !isActive);
	};

	const onSubmit = async (data: HeroBannerFormValues) => {
		if (data.is_active && !canActivate) {
			toast.error(`Đã đạt tối đa ${MAX_ACTIVE} banner active`);
			return;
		}

		const supabase = createClient();

		if (isEdit) {
			const { error } = await supabase
				.from("hero_banners")
				.update({ image_url: data.image_url, is_active: data.is_active })
				.eq("id", initialData.id);

			if (error) { toast.error("Lỗi khi cập nhật: " + error.message); return; }
			toast.success("Cập nhật banner thành công!");
		} else {
			const { error } = await supabase
				.from("hero_banners")
				.insert({ image_url: data.image_url, is_active: data.is_active });

			if (error) { toast.error("Lỗi khi lưu banner: " + error.message); return; }
			toast.success("Tạo hero banner thành công!");
			reset();
		}

		onSuccess?.();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700">
					Ảnh Banner <span className="text-red-500">*</span>
				</label>
				<ImageUploader
					value={imageUrl}
					onChange={(url) => setValue("image_url", url, { shouldValidate: true })}
					error={errors.image_url?.message}
				/>
			</div>

			{/* Toggle is_active */}
			<div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
				<div>
					<p className="text-sm font-medium text-gray-700">Active</p>
					<p className="text-xs text-gray-400">
						{activeCount}/{MAX_ACTIVE} banner đang active
						{!canActivate && !isActive && (
							<span className="ml-1 text-amber-600">· Đã đạt tối đa</span>
						)}
					</p>
				</div>
				<button
					type="button"
					onClick={handleToggle}
					className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
						isActive ? "bg-green-500" : "bg-gray-200"
					}`}
				>
					<span
						className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
							isActive ? "translate-x-6" : "translate-x-1"
						}`}
					/>
				</button>
			</div>

			<div className="flex items-center gap-3">
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a30000] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting && <Loader2 size={16} className="animate-spin" />}
					{isEdit ? "Cập nhật" : "Lưu Banner"}
				</button>

				{!isEdit && (
					<button
						type="button"
						onClick={() => reset()}
						className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
					>
						Đặt lại
					</button>
				)}
			</div>
		</form>
	);
}
