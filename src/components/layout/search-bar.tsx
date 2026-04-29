"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Search, X, Camera, Loader2 } from "lucide-react";
import Image from "next/image";

import { supabase } from "@/lib/supabase-client";
import { formatCurrency } from "@/utils/format-currency";
import type { DbProduct } from "@/@types/product";

type SearchProduct = Pick<DbProduct, "id" | "slug" | "name" | "thumbnail_url" | "price" | "discount_percentage">;

interface Props {
	placeholder?: string;
	className?: string;
	onNavigate?: () => void;
}

export default function SearchBar({ placeholder = "Tìm kiếm rượu vang...", className, onNavigate }: Props) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchProduct[]>([]);
	const [loading, setLoading] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		const trimmed = query.trim();
		if (trimmed.length < 2) {
			setResults([]);
			setOpen(false);
			return;
		}

		debounceRef.current = setTimeout(async () => {
			setLoading(true);
			const { data } = await supabase
				.from("products")
				.select("id, slug, name, thumbnail_url, price, discount_percentage")
				.ilike("name", `%${trimmed}%`)
				.limit(6);
			setResults((data as SearchProduct[]) ?? []);
			setOpen(true);
			setLoading(false);
		}, 300);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [query]);

	const navigate = (url: string) => {
		setOpen(false);
		setQuery("");
		setImagePreview(null);
		onNavigate?.();
		router.push(url as any);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) navigate(`/products?q=${encodeURIComponent(query.trim())}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			setOpen(false);
			inputRef.current?.blur();
		}
	};

	const clearAll = () => {
		setQuery("");
		setResults([]);
		setOpen(false);
		setImagePreview(null);
		inputRef.current?.focus();
	};

	const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Show preview
		const objectUrl = URL.createObjectURL(file);
		setImagePreview(objectUrl);
		setImageLoading(true);
		setQuery("");
		setResults([]);
		setOpen(false);

		try {
			const formData = new FormData();
			formData.append("image", file);

			const res = await fetch("/api/search-by-image", {
				method: "POST",
				body: formData,
			});

			const json = await res.json();

			if (json.query && json.query.trim()) {
				setQuery(json.query.trim());
				inputRef.current?.focus();
			} else {
				setQuery("");
				setOpen(false);
			}
		} catch {
			// silently fail - user can still type manually
		} finally {
			setImageLoading(false);
			// Reset file input so same file can be re-selected
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	return (
		<div ref={containerRef} className={`relative ${className ?? ""}`}>
			<form
				onSubmit={handleSubmit}
				className="focus-within:border-brand-primary flex items-stretch overflow-hidden rounded-md border border-gray-200 transition-colors"
			>
				{/* Image preview chip */}
				{imagePreview && (
					<div className="my-0.5 ml-1.5 flex shrink-0 items-center gap-1 rounded bg-gray-100 pl-1 pr-0.5">
						<div className="relative h-6 w-6 overflow-hidden rounded">
							<Image src={imagePreview} alt="" fill className="object-cover" sizes="24px" />
						</div>
						{imageLoading && <Loader2 size={12} className="animate-spin text-gray-400" />}
					</div>
				)}

				<input
					ref={inputRef}
					type="text"
					value={imageLoading ? "" : query}
					onChange={(e) => {
						setImagePreview(null);
						setQuery(e.target.value);
					}}
					onFocus={() => results.length > 0 && setOpen(true)}
					onKeyDown={handleKeyDown}
					placeholder={imageLoading ? "Đang nhận diện ảnh..." : placeholder}
					disabled={imageLoading}
					className="min-w-0 flex-1 px-3 py-2 text-sm outline-none disabled:bg-transparent disabled:text-gray-400"
				/>

				{(query || imagePreview) && !imageLoading && (
					<button type="button" onClick={clearAll} className="px-2 text-gray-400 hover:text-gray-600">
						<X size={14} />
					</button>
				)}

				{/* Camera button */}
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					disabled={imageLoading}
					title="Tìm kiếm bằng hình ảnh"
					className="border-l border-gray-200 px-2.5 text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
				>
					<Camera size={15} />
				</button>

				<button
					type="submit"
					disabled={imageLoading}
					className="bg-brand-primary hover:bg-brand-primary/90 m-0.5 rounded px-3 text-white transition-colors disabled:opacity-50"
				>
					{loading ? (
						<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
					) : (
						<Search size={16} />
					)}
				</button>
			</form>

			{/* Hidden file input — accept images, camera on mobile */}
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				capture="environment"
				className="hidden"
				onChange={handleImageSelect}
			/>

			{/* Autocomplete dropdown */}
			{open && (
				<div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[999] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl">
					{imagePreview && (
						<div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2">
							<Camera size={12} className="text-gray-400" />
							<span className="text-[11px] text-gray-400">Kết quả tìm kiếm từ ảnh</span>
						</div>
					)}
					{results.length > 0 ? (
						<>
							{results.map((product) => (
								<Link
									key={product.id}
									href={`/products/${product.slug}` as any}
									onClick={() => {
										setOpen(false);
										setQuery("");
										setImagePreview(null);
										onNavigate?.();
									}}
									className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
								>
									<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
										<Image
											src={product.thumbnail_url}
											alt={product.name}
											fill
											className="object-contain p-1"
											sizes="40px"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-[13px] font-semibold text-gray-800">{product.name}</p>
										<p className="text-brand-primary text-[12px] font-medium">
											{product.price === 0 ? "Liên hệ" : formatCurrency(product.price)}
										</p>
									</div>
								</Link>
							))}
							<button
								type="button"
								onClick={() => navigate(`/products?q=${encodeURIComponent(query.trim())}`)}
								className="text-brand-primary flex w-full items-center justify-center gap-2 border-t border-gray-100 py-3 text-[12px] font-semibold transition-colors hover:bg-gray-50"
							>
								<Search size={13} />
								Xem tất cả kết quả cho &ldquo;{query}&rdquo;
							</button>
						</>
					) : (
						<p className="py-6 text-center text-[13px] text-gray-400">Không tìm thấy sản phẩm nào</p>
					)}
				</div>
			)}
		</div>
	);
}
