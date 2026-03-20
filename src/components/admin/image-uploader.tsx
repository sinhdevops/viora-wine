"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploaderProps {
	value: string;
	onChange: (url: string) => void;
	error?: string;
}

export function ImageUploader({ value, onChange, error }: ImageUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			const res = await fetch("/api/upload", { method: "POST", body: formData });
			const data = await res.json();

			if (!res.ok) {
				toast.error(data.error || "Upload thất bại");
				return;
			}

			onChange(data.url);
		} catch {
			toast.error("Lỗi kết nối khi upload");
		} finally {
			setUploading(false);
			// reset input so same file can be re-uploaded
			if (inputRef.current) inputRef.current.value = "";
		}
	};

	return (
		<div className="space-y-2">
			<div
				onClick={() => !uploading && inputRef.current?.click()}
				className={`relative flex min-h-[180px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
					error
						? "border-red-400 bg-red-50"
						: "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
				} ${uploading ? "cursor-not-allowed opacity-60" : ""}`}
			>
				{value ? (
					<>
						<Image
							src={value}
							alt="Preview"
							fill
							className="rounded-xl object-cover"
						/>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onChange("");
							}}
							className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
						>
							<X size={14} />
						</button>
					</>
				) : uploading ? (
					<div className="flex flex-col items-center gap-2 text-gray-400">
						<Loader2 size={32} className="animate-spin" />
						<span className="text-sm">Đang upload...</span>
					</div>
				) : (
					<div className="flex flex-col items-center gap-2 text-gray-400">
						<Upload size={32} />
						<span className="text-sm font-medium">Click để chọn ảnh</span>
						<span className="text-xs">PNG, JPG, WEBP</span>
					</div>
				)}
			</div>

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleFileChange}
			/>

			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
}
