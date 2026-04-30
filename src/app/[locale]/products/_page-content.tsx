"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiChevronDown, HiX, HiChevronLeft, HiChevronRight, HiCheck } from "react-icons/hi";
import { HiAdjustmentsHorizontal, HiMagnifyingGlass, HiArrowsUpDown, HiStar, HiSparkles } from "react-icons/hi2";
import { HiTrendingUp } from "react-icons/hi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import * as Slider from "@radix-ui/react-slider";
import { supabase } from "@/lib/supabase-client";
import CardProduct from "@/components/page/card-product";
import { WINE_IMAGES } from "../../../../public/statics/images";
import type { DbProduct } from "@/@types/product";
import TestimonialsSection from "@/components/page/home/testimonials-section";

const QUICK_FILTER_TABS = [
	{ id: "all", label: "Tất cả" },
	{ id: "best_seller", label: "Bán chạy nhất" },
	{ id: "everyday", label: "Thường ngày" },
	{ id: "easy_drink", label: "Dễ uống" },
	{ id: "sweet", label: "Ngọt nhẹ" },
	{ id: "gift", label: "Quà tặng" },
] as const;
const PRODUCTS_PER_PAGE = 12;
const MAX_PRICE = 5_000_000;

const COUNTRY_OPTIONS = ["Pháp", "Ý", "Úc", "Chile"];

const WINE_TYPE_OPTIONS: { id: string; label: string; field: "category" | "wine_type" }[] = [
	{ id: "wine", label: "Vang", field: "category" },
	{ id: "red", label: "Vang đỏ", field: "wine_type" },
	{ id: "white", label: "Vang trắng", field: "wine_type" },
	{ id: "rose", label: "Vang hồng", field: "wine_type" },
	{ id: "champagne", label: "Champagne", field: "wine_type" },
	{ id: "whisky", label: "Whisky", field: "category" },
	{ id: "spirits", label: "Rượu mạnh", field: "category" },
	{ id: "combo", label: "Combo ưu đãi", field: "category" },
	{ id: "gift", label: "Quà tặng", field: "category" },
];

const SORT_OPTIONS = [
	{ value: "default", label: "Mặc định", icon: HiArrowsUpDown },
	{ value: "best_seller", label: "Bán chạy nhất", icon: HiTrendingUp },
	{ value: "top_rated", label: "Đánh giá cao nhất", icon: HiStar },
	{ value: "newest", label: "Mới nhất", icon: HiSparkles },
	{ value: "price_asc", label: "Giá: Thấp → Cao", icon: HiArrowsUpDown },
	{ value: "price_desc", label: "Giá: Cao → Thấp", icon: HiArrowsUpDown },
] as const;

function formatPrice(value: number): string {
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)} triệu`;
	if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
	return "0";
}

// ─── CheckItem ────────────────────────────────────────────────────────────────
function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
	return (
		<label className="group flex cursor-pointer items-center gap-2.5 py-1.5" onClick={onChange}>
			<div
				className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
					checked ? "border-brand-primary bg-brand-primary" : "border-gray-300 group-hover:border-gray-400"
				}`}
			>
				{checked && <HiCheck size={9} className="text-white" />}
			</div>
			<span
				className={`text-[13px] transition-colors ${
					checked ? "font-semibold text-gray-900" : "text-gray-600 group-hover:text-gray-800"
				}`}
			>
				{label}
			</span>
		</label>
	);
}

// ─── FilterSidebar ────────────────────────────────────────────────────────────
function FilterSidebar({
	priceRange,
	onPriceChange,
	selectedCountries,
	onCountryToggle,
	selectedWineTypes,
	onWineTypeToggle,
	hasActive,
	onClearAll,
}: {
	priceRange: [number, number];
	onPriceChange: (v: [number, number]) => void;
	selectedCountries: string[];
	onCountryToggle: (c: string) => void;
	selectedWineTypes: string[];
	onWineTypeToggle: (t: string) => void;
	hasActive: boolean;
	onClearAll: () => void;
}) {
	return (
		<div>
			{/* Header */}
			<div className="mb-5 flex items-center justify-between">
				<span className="text-[13px] font-semibold tracking-[0.15em] text-gray-900 uppercase">Bộ lọc</span>
				{hasActive && (
					<button
						onClick={onClearAll}
						className="text-brand-primary text-[12px] font-semibold hover:underline"
					>
						Xóa bộ lọc
					</button>
				)}
			</div>

			{/* Giá */}
			<div className="border-t border-gray-100 pt-4 pb-5">
				<div className="mb-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Giá</div>
				<Slider.Root
					className="relative flex w-full touch-none items-center select-none"
					min={0}
					max={MAX_PRICE}
					step={500_000}
					value={priceRange}
					onValueChange={(v) => onPriceChange(v as [number, number])}
				>
					<Slider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-200">
						<Slider.Range className="bg-brand-primary absolute h-full" />
					</Slider.Track>
					<Slider.Thumb className="border-brand-primary bg-brand-primary block h-4 w-4 cursor-pointer rounded-full border-2 shadow transition-shadow focus:ring-2 focus:ring-red-200 focus:outline-none" />
					<Slider.Thumb className="border-brand-primary bg-brand-primary block h-4 w-4 cursor-pointer rounded-full border-2 shadow transition-shadow focus:ring-2 focus:ring-red-200 focus:outline-none" />
				</Slider.Root>
				<div className="mt-3 flex items-center justify-between">
					<span className="rounded bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
						{formatPrice(priceRange[0])}
					</span>
					<span className="text-[10px] text-gray-300">—</span>
					<span className="rounded bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
						{priceRange[1] >= MAX_PRICE ? "Trên 5 triệu" : formatPrice(priceRange[1])}
					</span>
				</div>
			</div>

			{/* Quốc gia */}
			<div className="border-t border-gray-100 pt-4 pb-5">
				<div className="mb-3 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Quốc gia</div>
				<CheckItem
					label="Tất cả"
					checked={selectedCountries.length === 0}
					onChange={() => onCountryToggle("__all__")}
				/>
				{COUNTRY_OPTIONS.map((c) => (
					<CheckItem
						key={c}
						label={c}
						checked={selectedCountries.includes(c)}
						onChange={() => onCountryToggle(c)}
					/>
				))}
			</div>

			{/* Loại rượu */}
			<div className="border-t border-gray-100 pt-4">
				<div className="mb-3 text-[11px] font-bold tracking-widest text-gray-500 uppercase">Loại rượu</div>
				<CheckItem
					label="Tất cả"
					checked={selectedWineTypes.length === 0}
					onChange={() => onWineTypeToggle("__all__")}
				/>
				{WINE_TYPE_OPTIONS.map((o) => (
					<CheckItem
						key={o.id}
						label={o.label}
						checked={selectedWineTypes.includes(o.id)}
						onChange={() => onWineTypeToggle(o.id)}
					/>
				))}
			</div>
		</div>
	);
}

// ─── SortDropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const active = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div ref={ref} className="relative shrink-0">
			<button
				onClick={() => setOpen((v) => !v)}
				className={`flex items-center justify-between gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold transition-all ${
					open
						? "border-brand-primary text-brand-primary bg-brand-primary/5"
						: "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
				}`}
			>
				<active.icon size={13} className="shrink-0" />
				<span>Sắp xếp : {active.label}</span>
				<HiChevronDown
					size={13}
					className={`shrink-0 transition-transform duration-200 ${open ? "text-brand-primary rotate-180" : "text-gray-400"}`}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -6, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.97 }}
						transition={{ duration: 0.15 }}
						className="absolute top-[calc(100%+6px)] right-0 z-50 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl"
					>
						{SORT_OPTIONS.map((opt) => {
							const Icon = opt.icon;
							const isActive = opt.value === value;
							return (
								<button
									key={opt.value}
									onClick={() => {
										onChange(opt.value);
										setOpen(false);
									}}
									className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors ${
										isActive
											? "text-brand-primary bg-brand-primary/6 font-semibold"
											: "font-medium text-gray-600 hover:bg-gray-50"
									}`}
								>
									<Icon size={14} className="shrink-0" />
									<span className="flex-1">{opt.label}</span>
									{isActive && <HiCheck size={14} className="text-brand-primary shrink-0" />}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function getPageNumbers(current: number, total: number): (number | "...")[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const pages: (number | "...")[] = [1];
	if (current > 3) pages.push("...");
	for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
		pages.push(i);
	}
	if (current < total - 2) pages.push("...");
	pages.push(total);
	return pages;
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
	const t = useTranslations("products_page");
	const searchParams = useSearchParams();
	const pathname = usePathname();

	if (totalPages <= 1) return null;
	const pages = getPageNumbers(currentPage, totalPages);

	const getPageUrl = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (page === 1) params.delete("page");
		else params.set("page", page.toString());
		const qs = params.toString();
		return `${pathname}${qs ? `?${qs}` : ""}`;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="flex items-center justify-center gap-1.5 pt-8 pb-6"
		>
			{currentPage === 1 ? (
				<div className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase opacity-30">
					<HiChevronLeft size={13} />
					<span className="hidden sm:inline">{t("pagination.prev")}</span>
				</div>
			) : (
				<Link
					href={getPageUrl(currentPage - 1) as any}
					className="hover:bg-brand-primary hover:border-brand-primary hover:shadow-brand-primary/30 flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase transition-all duration-200 hover:text-white hover:shadow-md"
				>
					<HiChevronLeft size={13} />
					<span className="hidden sm:inline">{t("pagination.prev")}</span>
				</Link>
			)}

			<div className="flex items-center gap-1">
				{pages.map((page, i) =>
					page === "..." ? (
						<span
							key={`ellipsis-${i}`}
							className="flex h-9 w-9 items-center justify-center text-[12px] text-gray-300 select-none"
						>
							···
						</span>
					) : (
						<Link
							key={page}
							href={getPageUrl(page) as any}
							className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-200 ${
								page === currentPage
									? "bg-brand-primary shadow-brand-primary/40 scale-105 text-white shadow-md"
									: "hover:text-brand-primary hover:bg-brand-primary/8 hover:border-brand-primary/20 border border-transparent text-gray-500"
							}`}
						>
							{page}
						</Link>
					),
				)}
			</div>

			{currentPage === totalPages ? (
				<div className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase opacity-30">
					<span className="hidden sm:inline">{t("pagination.next")}</span>
					<HiChevronRight size={13} />
				</div>
			) : (
				<Link
					href={getPageUrl(currentPage + 1) as any}
					className="hover:bg-brand-primary hover:border-brand-primary hover:shadow-brand-primary/30 flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase transition-all duration-200 hover:text-white hover:shadow-md"
				>
					<span className="hidden sm:inline">{t("pagination.next")}</span>
					<HiChevronRight size={13} />
				</Link>
			)}
		</motion.div>
	);
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductsPageContent() {
	const t = useTranslations("products_page");
	const searchParams = useSearchParams();
	const router = useRouter();

	const categoryFilter = searchParams.get("cat") || "all";
	const currentPage = Number(searchParams.get("page")) || 1;
	const qParam = searchParams.get("q") || "";
	const wtParam = searchParams.get("wt") || "";
	const sortParam = searchParams.get("sort") || "";

	const [products, setProducts] = useState<DbProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState(qParam);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState(sortParam || "default");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
	const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
	const [selectedWineTypes, setSelectedWineTypes] = useState<string[]>(wtParam ? [wtParam] : []);
	const [quickFilter, setQuickFilter] = useState<string>("all");

	useEffect(() => {
		setSearchInput(qParam);
	}, [qParam]);

	useEffect(() => {
		setSelectedWineTypes(wtParam ? [wtParam] : []);
	}, [wtParam]);

	useEffect(() => {
		supabase
			.from("products")
			.select(
				"id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, tag, rating, sold_count, created_at, country, wine_type",
			)
			.order("sold_count", { ascending: false })
			.then(({ data }) => {
				if (data) setProducts(data as DbProduct[]);
				setLoading(false);
			});
	}, []);

	const updateCategoryFilter = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === "all") params.delete("cat");
		else params.set("cat", value);
		params.delete("page");
		router.push(`/products?${params.toString()}`, { scroll: false });
	};

	const resetPage = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("page");
		router.push(`?${params.toString()}`, { scroll: false });
	};

	const toggleCountry = (c: string) => {
		if (c === "__all__") {
			setSelectedCountries([]);
		} else {
			setSelectedCountries((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
		}
		resetPage();
	};

	const toggleWineType = (type: string) => {
		if (type === "__all__") {
			setSelectedWineTypes([]);
		} else {
			setSelectedWineTypes((prev) => (prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]));
		}
		resetPage();
	};

	const clearAll = () => {
		setSearchInput("");
		setPriceRange([0, MAX_PRICE]);
		setSelectedCountries([]);
		setSelectedWineTypes([]);
		router.push("/products", { scroll: false });
	};

	const filteredProducts = useMemo(() => {
		let result = products.filter((p) => {
			const matchCat = categoryFilter === "all" || p.category === categoryFilter;
			const matchSearch = !searchInput || p.name.toLowerCase().includes(searchInput.toLowerCase());
			const matchPrice = p.price >= priceRange[0] && (priceRange[1] >= MAX_PRICE || p.price <= priceRange[1]);
			const matchCountry =
				selectedCountries.length === 0 || (!!p.country && selectedCountries.includes(p.country));
			const matchWineType =
				selectedWineTypes.length === 0 ||
				selectedWineTypes.some((id) => {
					const opt = WINE_TYPE_OPTIONS.find((o) => o.id === id);
					if (!opt) return false;
					return opt.field === "wine_type" ? p.wine_type === id : p.category === id;
				});
			const matchQuickFilter = quickFilter === "all" || p.tag === quickFilter;
			return matchCat && matchSearch && matchPrice && matchCountry && matchWineType && matchQuickFilter;
		});

		if (sortOrder === "price_asc") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortOrder === "price_desc") {
			result.sort((a, b) => b.price - a.price);
		} else if (sortOrder === "best_seller") {
			result.sort((a, b) => (b.sold_count ?? 0) - (a.sold_count ?? 0));
		} else if (sortOrder === "top_rated") {
			result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.sold_count ?? 0) - (a.sold_count ?? 0));
		} else if (sortOrder === "newest") {
			result.sort((a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime());
		} else {
			result.sort((a, b) => {
				const soldDiff = (b.sold_count ?? 0) - (a.sold_count ?? 0);
				if (soldDiff !== 0) return soldDiff;
				if (!!b.tag !== !!a.tag) return b.tag ? -1 : 1;
				return 0;
			});
		}

		return result;
	}, [
		products,
		categoryFilter,
		priceRange,
		selectedCountries,
		selectedWineTypes,
		searchInput,
		sortOrder,
		quickFilter,
	]);

	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

	const paginatedProducts = useMemo(() => {
		const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
		return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
	}, [filteredProducts, currentPage]);

	const hasActiveFilters =
		categoryFilter !== "all" ||
		priceRange[0] > 0 ||
		priceRange[1] < MAX_PRICE ||
		selectedCountries.length > 0 ||
		selectedWineTypes.length > 0 ||
		!!searchInput;

	const hasSidebarFilters =
		priceRange[0] > 0 || priceRange[1] < MAX_PRICE || selectedCountries.length > 0 || selectedWineTypes.length > 0;

	return (
		<div className="flex min-h-screen flex-col overflow-x-clip">
			{/* HERO */}
			<section className="relative aspect-1440/500 lg:aspect-1440/350">
				<Image src={WINE_IMAGES.bannerProduct} alt="banner product" fill priority className="" />
			</section>

			{/* MAIN CONTENT */}
			<div className="mx-auto w-full max-w-360 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
				{/* Mobile search */}
				<div className="focus-within:border-brand-primary mb-8 flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition-colors lg:hidden">
					<HiMagnifyingGlass className="shrink-0 text-gray-400" size={16} />
					<input
						type="text"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder={t("search_placeholder_mobile")}
						className="w-full bg-transparent text-[14px] text-gray-700 outline-none placeholder:text-gray-400"
					/>
					{searchInput && (
						<button onClick={() => setSearchInput("")} className="text-gray-400">
							<HiX size={16} />
						</button>
					)}
				</div>

				<div className="flex gap-10 lg:gap-14">
					{/* Desktop Sidebar */}
					<aside className="sticky top-35 hidden w-52 shrink-0 self-start lg:block">
						<FilterSidebar
							priceRange={priceRange}
							onPriceChange={setPriceRange}
							selectedCountries={selectedCountries}
							onCountryToggle={toggleCountry}
							selectedWineTypes={selectedWineTypes}
							onWineTypeToggle={toggleWineType}
							hasActive={hasSidebarFilters}
							onClearAll={() => {
								setPriceRange([0, MAX_PRICE]);
								setSelectedCountries([]);
								setSelectedWineTypes([]);
							}}
						/>
					</aside>

					{/* Product area */}
					<main className="min-w-0 flex-1">
						{/* Mobile toolbar: count + filter + sort */}
						<div className="mb-6 flex items-center justify-between gap-2 lg:hidden">
							<p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
								{loading ? t("loading") : `${filteredProducts.length} ${t("count")}`}
							</p>
							<div className="flex items-center gap-2">
								<button
									onClick={() => setIsFilterOpen(true)}
									className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all ${
										hasSidebarFilters
											? "border-brand-primary text-brand-primary bg-brand-primary/5"
											: "border-gray-200 bg-white text-gray-600"
									}`}
								>
									<HiAdjustmentsHorizontal size={13} />
									Lọc
									{hasSidebarFilters && (
										<span className="bg-brand-primary flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
											{selectedCountries.length +
												selectedWineTypes.length +
												(priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0)}
										</span>
									)}
								</button>
								<SortDropdown value={sortOrder} onChange={setSortOrder} />
							</div>
						</div>

						{/* Desktop toolbar: count + clear + sort */}
						<div className="mb-4 hidden items-center justify-between gap-4 lg:flex">
							<div className="flex items-center gap-4">
								<p className="text-[28px] font-semibold uppercase">TẤT CẢ SẢN PHẨM</p>
								{hasActiveFilters && (
									<button
										onClick={clearAll}
										className="text-brand-primary flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase hover:underline"
									>
										<HiX size={12} />
										{t("clear_filters")}
									</button>
								)}
							</div>
							<SortDropdown value={sortOrder} onChange={setSortOrder} />
						</div>

						<div className="relative mb-6 aspect-956/105">
							<Image src={WINE_IMAGES.promotion} alt="promotion banner" fill />
						</div>

						{/* Quick filter tabs */}
						<div className="mb-5 flex flex-wrap gap-2">
							{QUICK_FILTER_TABS.map((tab) => {
								const isActive = quickFilter === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() => {
											setQuickFilter(tab.id);
											const params = new URLSearchParams(searchParams.toString());
											params.delete("page");
											router.push(`?${params.toString()}`, { scroll: false });
										}}
										className={`rounded-xl border px-4 py-[9px] leading-[22px] transition-all ${
											isActive
												? "border-brand-primary text-brand-primary font-semibold"
												: "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
										}`}
									>
										{tab.label}
									</button>
								);
							})}
						</div>

						{/* Loading skeleton */}
						{loading && (
							<div className="grid grid-cols-2 gap-4 pb-16 sm:grid-cols-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
								{Array.from({ length: 8 }).map((_, i) => (
									<div key={i} className="aspect-216/290 animate-pulse rounded-xl bg-gray-100" />
								))}
							</div>
						)}

						{/* Product grid */}
						{!loading && filteredProducts.length > 0 && (
							<>
								<motion.div
									layout
									className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
								>
									<AnimatePresence mode="popLayout">
										{paginatedProducts.map((product) => (
											<motion.div
												key={product.id}
												layout
												initial={{ opacity: 0, scale: 0.96 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.96 }}
												transition={{ duration: 0.3 }}
											>
												<CardProduct product={product} />
											</motion.div>
										))}
									</AnimatePresence>
								</motion.div>
								<Pagination currentPage={currentPage} totalPages={totalPages} />
							</>
						)}

						{/* Empty state */}
						{!loading && filteredProducts.length === 0 && (
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-col items-center px-8 py-24 text-center"
							>
								<div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
									<HiAdjustmentsHorizontal size={34} className="text-gray-200" />
									<div className="bg-brand-primary absolute top-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white text-white">
										<HiX size={11} />
									</div>
								</div>
								<h3 className="mb-3 text-xl font-semibold tracking-tight text-gray-900 uppercase">
									{t("no_products_title")}
								</h3>
								<p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-400">
									{t("no_products_desc")}
								</p>
								<button
									onClick={clearAll}
									className="bg-brand-primary shadow-brand-primary/30 hover:shadow-brand-primary/50 rounded-full px-8 py-3 text-[11px] font-semibold tracking-[0.2em] text-white uppercase shadow-lg transition-all active:scale-95"
								>
									{t("clear_all_filters")}
								</button>
							</motion.div>
						)}
					</main>
				</div>
			</div>

			{/* MOBILE FILTER DRAWER */}
			<AnimatePresence>
				{isFilterOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsFilterOpen(false)}
							className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
						/>
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 28, stiffness: 220 }}
							className="fixed inset-y-0 right-0 z-60 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
						>
							<div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
								<span className="text-[11px] font-semibold tracking-widest text-gray-900 uppercase">
									{t("filters")}
								</span>
								<button
									onClick={() => setIsFilterOpen(false)}
									className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100"
								>
									<HiX size={20} />
								</button>
							</div>

							<div className="flex-1 overflow-y-auto px-6 py-4">
								<FilterSidebar
									priceRange={priceRange}
									onPriceChange={setPriceRange}
									selectedCountries={selectedCountries}
									onCountryToggle={toggleCountry}
									selectedWineTypes={selectedWineTypes}
									onWineTypeToggle={toggleWineType}
									hasActive={hasSidebarFilters}
									onClearAll={() => {
										setPriceRange([0, MAX_PRICE]);
										setSelectedCountries([]);
										setSelectedWineTypes([]);
									}}
								/>
							</div>

							<div className="flex gap-3 border-t border-gray-100 bg-gray-50/80 px-6 py-5">
								<button
									onClick={() => {
										clearAll();
										setIsFilterOpen(false);
									}}
									className="flex-1 rounded-xl border border-gray-200 py-3.5 text-[11px] font-semibold tracking-widest text-gray-500 uppercase transition-colors hover:bg-gray-100"
								>
									{t("clear_filters")}
								</button>
								<button
									onClick={() => setIsFilterOpen(false)}
									className="bg-brand-primary shadow-brand-primary/20 flex-1 rounded-xl py-3.5 text-[11px] font-semibold tracking-widest text-white uppercase shadow-lg"
								>
									{t("apply")}
								</button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
			<TestimonialsSection />
		</div>
	);
}
