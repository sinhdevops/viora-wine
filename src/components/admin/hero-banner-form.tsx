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

interface HeroBannerFormProps {
	onSuccess?: () => void;
}

export function HeroBannerForm({ onSuccess }: HeroBannerFormProps) {
	const {
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<HeroBannerFormValues>({
		resolver: zodResolver(heroBannerSchema),
		defaultValues: { image_url: "" },
	});

	const imageUrl = watch("image_url");

	const onSubmit = async (data: HeroBannerFormValues) => {
		const supabase = createClient();
		const { error } = await supabase
			.from("hero_banners")
			.insert({ image_url: data.image_url });

		if (error) {
			toast.error("Lỗi khi lưu banner: " + error.message);
			return;
		}

		toast.success("Tạo hero banner thành công!");
		reset();
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
					onChange={(url) =>
						setValue("image_url", url, { shouldValidate: true })
					}
					error={errors.image_url?.message}
				/>
			</div>

			<div className="flex items-center gap-3">
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-2 rounded-lg bg-[#C80000] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a30000] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting && <Loader2 size={16} className="animate-spin" />}
					Lưu Banner
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
