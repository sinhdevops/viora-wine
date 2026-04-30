"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X, GripVertical, ImagePlus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface MultiImageUploaderProps {
	value: string[];
	onChange: (urls: string[]) => void;
	maxImages?: number;
}

export function MultiImageUploader({
	value,
	onChange,
	maxImages = 6,
}: MultiImageUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const [dragOver, setDragOver] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const uploadFiles = async (files: File[]) => {
		const remaining = maxImages - value.length;
		const toUpload = files.slice(0, remaining);
		if (toUpload.length === 0) {
			toast.warning(`Tối đa ${maxImages} ảnh`);
			return;
		}

		setUploading(true);
		const newUrls: string[] = [];
		for (const file of toUpload) {
			try {
				const formData = new FormData();
				formData.append("file", file);
				const res = await fetch("/api/upload", { method: "POST", body: formData });
				const data = await res.json();
				if (!res.ok) {
					toast.error(data.error || `Upload "${file.name}" thất bại`);
					continue;
				}
				newUrls.push(data.url);
			} catch {
				toast.error(`Lỗi kết nối khi upload "${file.name}"`);
			}
		}
		if (newUrls.length > 0) onChange([...value, ...newUrls]);
		setUploading(false);
		if (inputRef.current) inputRef.current.value = "";
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		if (files.length > 0) uploadFiles(files);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(false);
		const files = Array.from(e.dataTransfer.files).filter((f) =>
			f.type.startsWith("image/"),
		);
		if (files.length > 0) uploadFiles(files);
	};

	const removeImage = (idx: number) => {
		onChange(value.filter((_, i) => i !== idx));
	};

	const moveImage = (from: number, to: number) => {
		if (to < 0 || to >= value.length) return;
		const next = [...value];
		[next[from], next[to]] = [next[to], next[from]];
		onChange(next);
	};

	const canAddMore = value.length < maxImages;

	return (
		<div className="space-y-3">
			{/* Grid ảnh đã upload */}
			{value.length > 0 && (
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
					{value.map((url, idx) => (
						<div
							key={url + idx}
							className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
						>
							<Image
								src={url}
								alt={`Gallery ${idx + 1}`}
								fill
								className="object-cover"
							/>
							{/* Overlay actions */}
							<div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
								{/* Move left */}
								{idx > 0 && (
									<button
										type="button"
										onClick={() => moveImage(idx, idx - 1)}
										className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
										title="Dịch trái"
									>
										‹
									</button>
								)}
								{/* Remove */}
								<button
									type="button"
									onClick={() => removeImage(idx)}
									className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
									title="Xóa"
								>
									<X size={13} />
								</button>
								{/* Move right */}
								{idx < value.length - 1 && (
									<button
										type="button"
										onClick={() => moveImage(idx, idx + 1)}
										className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
										title="Dịch phải"
									>
										›
									</button>
								)}
							</div>
							{/* Index badge */}
							<span className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] font-bold text-white">
								{idx + 1}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Drop zone */}
			{canAddMore && (
				<div
					onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
					onDragLeave={() => setDragOver(false)}
					onDrop={handleDrop}
					onClick={() => !uploading && inputRef.current?.click()}
					className={`flex min-h-[100px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
						dragOver
							? "border-[#C80000] bg-red-50"
							: "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
					} ${uploading ? "cursor-not-allowed opacity-60" : ""}`}
				>
					{uploading ? (
						<div className="flex flex-col items-center gap-2 text-gray-400">
							<Loader2 size={24} className="animate-spin" />
							<span className="text-sm">Đang upload...</span>
						</div>
					) : (
						<div className="flex flex-col items-center gap-1.5 text-gray-400">
							<ImagePlus size={28} />
							<span className="text-sm font-medium">
								Thêm ảnh gallery ({value.length}/{maxImages})
							</span>
							<span className="text-xs">Click hoặc kéo thả • PNG, JPG, WEBP</span>
						</div>
					)}
				</div>
			)}

			{!canAddMore && (
				<p className="text-center text-xs text-gray-400">
					Đã đạt tối đa {maxImages} ảnh. Xóa bớt để thêm mới.
				</p>
			)}

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				multiple
				className="hidden"
				onChange={handleFileChange}
			/>
		</div>
	);
}
