"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import "react-quill-new/dist/quill.snow.css";

import {
	EVENT_CATEGORIES,
	eventSchema,
	type EventFormValues,
} from "@/lib/schemas/event-schema";
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

interface EventFormProps {
	initialData?: EventFormValues & { id: string };
	onSuccess?: () => void;
}

export function EventForm({ initialData, onSuccess }: EventFormProps) {
	const isEdit = !!initialData;

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		defaultValues: initialData ?? {
			name: "",
			description: "",
			thumbnail_url: "",
			content: "",
			date: "",
			category: "su-kien",
		},
	});

	useEffect(() => {
		reset(
			initialData ?? {
				name: "",
				description: "",
				thumbnail_url: "",
				content: "",
				date: "",
				category: "su-kien",
			}
		);
	}, [initialData?.id, reset]);

	const thumbnailUrl = watch("thumbnail_url");

	const onSubmit = async (data: EventFormValues) => {
		if (isEdit) {
			const { error } = await supabase
				.from("events")
				.update(data)
				.eq("id", initialData.id);
			if (error) {
				toast.error("Lỗi khi cập nhật: " + error.message);
				return;
			}
			toast.success("Cập nhật sự kiện thành công!");
		} else {
			const { error } = await supabase.from("events").insert(data);
			if (error) {
				toast.error("Lỗi khi lưu sự kiện: " + error.message);
				return;
			}
			toast.success("Tạo sự kiện thành công!");
			reset();
		}

		onSuccess?.();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Name */}
			<div>
				<label className={cls.label}>
					Tên sự kiện <span className="text-red-500">*</span>
				</label>
				<input
					{...register("name")}
					className={cls.input}
					placeholder="Vd: Wine Night tháng 4 tại Đà Nẵng"
				/>
				{errors.name && <p className={cls.error}>{errors.name.message}</p>}
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
					placeholder="Mô tả ngắn về sự kiện..."
				/>
				{errors.description && (
					<p className={cls.error}>{errors.description.message}</p>
				)}
			</div>

			{/* Row: Date + Category */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label className={cls.label}>
						Ngày diễn ra <span className="text-red-500">*</span>
					</label>
					<input
						type="date"
						{...register("date")}
						className={cls.input}
					/>
					{errors.date && <p className={cls.error}>{errors.date.message}</p>}
				</div>

				<div>
					<label className={cls.label}>
						Danh mục <span className="text-red-500">*</span>
					</label>
					<select {...register("category")} className={cls.input}>
						{EVENT_CATEGORIES.map(({ value, label }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
					{errors.category && (
						<p className={cls.error}>{errors.category.message}</p>
					)}
				</div>
			</div>

			{/* Thumbnail */}
			<div>
				<label className={cls.label}>
					Ảnh thumbnail <span className="text-red-500">*</span>
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
					Nội dung <span className="text-red-500">*</span>
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

			{/* Actions */}
			<div className="flex items-center gap-3 border-t border-gray-100 pt-2">
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-2 rounded-lg bg-[#C80000] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a30000] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting && <Loader2 size={16} className="animate-spin" />}
					{isEdit ? "Cập nhật" : "Tạo sự kiện"}
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
