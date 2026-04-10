"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Package,
	CalendarDays,
	Image as ImageIcon,
	Flame,
	AlertTriangle,
	TrendingUp,
	ArrowRight,
	Wine,
	Loader2,
	BarChart3,
	Layers,
	ShoppingBag,
} from "lucide-react";
import { createClient } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = {
	id: string;
	name: string;
	thumbnail_url: string | null;
	price: number;
	discount_percentage: number;
	category: string;
	stock: number;
	is_hot: boolean;
	created_at: string;
};

type Event = {
	id: string;
	name: string;
	thumbnail_url: string | null;
	category: "su-kien" | "kien-thuc";
	date: string;
	created_at: string;
};

type Banner = {
	id: string;
	is_active: boolean;
};

type DashboardData = {
	products: Product[];
	events: Event[];
	banners: Banner[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
	wine:    { label: "Rượu vang",   color: "bg-rose-500",    bg: "bg-rose-50"    },
	whisky:  { label: "Whisky",      color: "bg-amber-500",   bg: "bg-amber-50"   },
	spirits: { label: "Spirits",     color: "bg-purple-500",  bg: "bg-purple-50"  },
	combo:   { label: "Combo",       color: "bg-teal-500",    bg: "bg-teal-50"    },
	gift:    { label: "Quà tặng",    color: "bg-pink-500",    bg: "bg-pink-50"    },
};

function formatPrice(n: number) {
	return n.toLocaleString("vi-VN") + " ₫";
}

function formatDate(d: string) {
	return new Date(d).toLocaleDateString("vi-VN", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
	label,
	value,
	sub,
	icon: Icon,
	iconBg,
	iconColor,
	href,
}: {
	label: string;
	value: string | number;
	sub?: string;
	icon: React.ElementType;
	iconBg: string;
	iconColor: string;
	href: string;
}) {
	return (
		<Link
			href={href}
			className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:gap-4 md:p-5"
		>
			<div className={`shrink-0 rounded-xl p-3 ${iconBg}`}>
				<Icon size={22} className={iconColor} />
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
				<p className="mt-0.5 text-xl font-extrabold tracking-tight text-gray-900 md:text-2xl">{value}</p>
				{sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
			</div>
			<ArrowRight
				size={16}
				className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-500"
			/>
		</Link>
	);
}

function CategoryBar({
	label,
	count,
	total,
	color,
	bg,
}: {
	label: string;
	count: number;
	total: number;
	color: string;
	bg: string;
}) {
	const pct = total > 0 ? Math.round((count / total) * 100) : 0;
	return (
		<div className="flex items-center gap-3">
			<div className={`w-28 shrink-0 rounded-full px-2.5 py-1 text-center text-[11px] font-bold uppercase tracking-wide ${bg} text-gray-600`}>
				{label}
			</div>
			<div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-2">
				<div
					className={`h-full rounded-full transition-all duration-700 ${color}`}
					style={{ width: `${pct}%` }}
				/>
			</div>
			<span className="w-12 shrink-0 text-right text-sm font-bold text-gray-700">{count}</span>
			<span className="w-10 shrink-0 text-right text-xs text-gray-400">{pct}%</span>
		</div>
	);
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
	const [data, setData] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const supabase = createClient();
		Promise.all([
			supabase.from("products").select("id,name,thumbnail_url,price,discount_percentage,category,stock,is_hot,created_at").order("created_at", { ascending: false }),
			supabase.from("events").select("id,name,thumbnail_url,category,date,created_at").order("created_at", { ascending: false }),
			supabase.from("hero_banners").select("id,is_active"),
		]).then(([p, e, b]) => {
			setData({
				products: (p.data ?? []) as Product[],
				events: (e.data ?? []) as Event[],
				banners: (b.data ?? []) as Banner[],
			});
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2 size={32} className="animate-spin text-brand-primary" />
			</div>
		);
	}

	const { products, events, banners } = data!;

	// ── Computed stats ──
	const activeBanners = banners.filter((b) => b.is_active).length;
	const hotProducts = products.filter((p) => p.is_hot).length;
	const outOfStock = products.filter((p) => p.stock === 0).length;
	const totalStockValue = products.reduce((sum, p) => {
		const finalPrice = p.price * (1 - p.discount_percentage / 100);
		return sum + finalPrice * p.stock;
	}, 0);

	const eventCount = events.filter((e) => e.category === "su-kien").length;
	const knowledgeCount = events.filter((e) => e.category === "kien-thuc").length;

	// Category distribution
	const categoryOrder = ["wine", "whisky", "spirits", "combo", "gift"];
	const categoryCounts = categoryOrder.map((cat) => ({
		key: cat,
		count: products.filter((p) => p.category === cat).length,
		...(CATEGORY_LABELS[cat] ?? { label: cat, color: "bg-gray-400", bg: "bg-gray-100" }),
	}));

	// Stock health
	const inStock = products.filter((p) => p.stock > 0).length;
	const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

	// Recent items
	const recentProducts = products.slice(0, 5);
	const recentEvents = events.slice(0, 5);

	const today = new Date().toLocaleDateString("vi-VN", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			{/* ── Header ── */}
			<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
				<div>
					<div className="mb-1 flex items-center gap-2">
						<Wine size={20} className="text-brand-primary" />
						<span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Viora Wine</span>
					</div>
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
					<p className="mt-1 text-sm text-gray-400">{today}</p>
				</div>
				<div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
					<TrendingUp size={16} className="text-emerald-500" />
					<span className="text-sm font-semibold text-gray-700">
						Tổng giá trị kho:{" "}
						<span className="text-brand-primary">{formatPrice(totalStockValue)}</span>
					</span>
				</div>
			</div>

			{/* ── Stat Cards ── */}
			<div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5 md:mb-8">
				<StatCard
					href="/admin/products"
					label="Sản phẩm"
					value={products.length}
					sub={`${inStock} còn hàng`}
					icon={Package}
					iconBg="bg-blue-50"
					iconColor="text-blue-600"
				/>
				<StatCard
					href="/admin/events"
					label="Sự kiện"
					value={events.length}
					sub={`${eventCount} sự kiện · ${knowledgeCount} bài viết`}
					icon={CalendarDays}
					iconBg="bg-violet-50"
					iconColor="text-violet-600"
				/>
				<StatCard
					href="/admin/hero-banner"
					label="Banner"
					value={`${activeBanners}/10`}
					sub={`${activeBanners} đang hiển thị`}
					icon={ImageIcon}
					iconBg="bg-emerald-50"
					iconColor="text-emerald-600"
				/>
				<StatCard
					href="/admin/products"
					label="Sản phẩm Hot"
					value={hotProducts}
					sub="đang được đánh dấu hot"
					icon={Flame}
					iconBg="bg-orange-50"
					iconColor="text-orange-500"
				/>
				<StatCard
					href="/admin/products"
					label="Hết hàng"
					value={outOfStock}
					sub={lowStock > 0 ? `+${lowStock} sắp hết hàng` : "Không có sản phẩm sắp hết"}
					icon={AlertTriangle}
					iconBg="bg-red-50"
					iconColor="text-red-500"
				/>
			</div>

			{/* ── Main Grid ── */}
			<div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
				{/* ── Left Column (2/3) ── */}
				<div className="space-y-6 lg:col-span-2">
					{/* Category Distribution */}
					<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
						<div className="mb-5 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<BarChart3 size={18} className="text-brand-primary" />
								<h2 className="font-bold text-gray-900">Phân bổ danh mục</h2>
							</div>
							<span className="text-xs text-gray-400">{products.length} sản phẩm</span>
						</div>
						<div className="space-y-3">
							{categoryCounts.map((cat) => (
								<CategoryBar
									key={cat.key}
									label={cat.label}
									count={cat.count}
									total={products.length}
									color={cat.color}
									bg={cat.bg}
								/>
							))}
							{products.filter((p) => !categoryOrder.includes(p.category)).length > 0 && (
								<CategoryBar
									label="Khác"
									count={products.filter((p) => !categoryOrder.includes(p.category)).length}
									total={products.length}
									color="bg-gray-400"
									bg="bg-gray-100"
								/>
							)}
						</div>
					</div>

					{/* Recent Products */}
					<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
						<div className="mb-5 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<ShoppingBag size={18} className="text-brand-primary" />
								<h2 className="font-bold text-gray-900">Sản phẩm gần đây</h2>
							</div>
							<Link
								href="/admin/products"
								className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
							>
								Xem tất cả <ArrowRight size={12} />
							</Link>
						</div>
						<div className="divide-y divide-gray-50">
							{recentProducts.length === 0 ? (
								<p className="py-8 text-center text-sm text-gray-400">Chưa có sản phẩm nào</p>
							) : (
								recentProducts.map((p) => {
									const cat = CATEGORY_LABELS[p.category];
									const finalPrice = p.price * (1 - p.discount_percentage / 100);
									return (
										<div key={p.id} className="flex items-center gap-3 py-3">
											<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gray-100">
												{p.thumbnail_url ? (
													<Image src={p.thumbnail_url} alt={p.name} fill className="object-cover" />
												) : (
													<div className="flex h-full w-full items-center justify-center text-gray-300 text-xs">?</div>
												)}
											</div>
											<div className="min-w-0 flex-1">
												<div className="flex items-center gap-2">
													<p className="truncate text-sm font-semibold text-gray-900">{p.name}</p>
													{p.is_hot && (
														<span className="shrink-0 rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold text-orange-500">
															HOT
														</span>
													)}
												</div>
												<div className="mt-0.5 flex items-center gap-2">
													{cat && (
														<span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cat.bg} text-gray-500`}>
															{cat.label}
														</span>
													)}
													<span className="text-[11px] text-gray-400">{formatDate(p.created_at)}</span>
												</div>
											</div>
											<div className="shrink-0 text-right">
												<p className="text-sm font-bold text-gray-900">{formatPrice(finalPrice)}</p>
												<p className="text-[11px] text-gray-400">
													{p.stock > 0 ? (
														<span className="text-emerald-500">{p.stock} còn</span>
													) : (
														<span className="text-red-400">Hết hàng</span>
													)}
												</p>
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>

				{/* ── Right Column (1/3) ── */}
				<div className="space-y-6">
					{/* Inventory Health */}
					<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
						<div className="mb-5 flex items-center gap-2">
							<Layers size={18} className="text-brand-primary" />
							<h2 className="font-bold text-gray-900">Tình trạng kho</h2>
						</div>
						<div className="space-y-3">
							{[
								{
									label: "Còn hàng",
									value: inStock,
									total: products.length,
									color: "bg-emerald-500",
									textColor: "text-emerald-600",
								},
								{
									label: "Sắp hết (≤ 5)",
									value: lowStock,
									total: products.length,
									color: "bg-amber-400",
									textColor: "text-amber-600",
								},
								{
									label: "Hết hàng",
									value: outOfStock,
									total: products.length,
									color: "bg-red-400",
									textColor: "text-red-500",
								},
							].map(({ label, value, total, color, textColor }) => {
								const pct = total > 0 ? Math.round((value / total) * 100) : 0;
								return (
									<div key={label}>
										<div className="mb-1 flex justify-between text-xs">
											<span className="font-medium text-gray-600">{label}</span>
											<span className={`font-bold ${textColor}`}>{value} ({pct}%)</span>
										</div>
										<div className="h-2 overflow-hidden rounded-full bg-gray-100">
											<div
												className={`h-full rounded-full transition-all duration-700 ${color}`}
												style={{ width: `${pct}%` }}
											/>
										</div>
									</div>
								);
							})}
						</div>
						<div className="mt-4 rounded-xl bg-gray-50 p-3">
							<p className="text-xs text-gray-500">Tổng giá trị tồn kho</p>
							<p className="mt-0.5 text-lg font-extrabold text-brand-primary">{formatPrice(totalStockValue)}</p>
						</div>
					</div>

					{/* Recent Events */}
					<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
						<div className="mb-5 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<CalendarDays size={18} className="text-brand-primary" />
								<h2 className="font-bold text-gray-900">Sự kiện gần đây</h2>
							</div>
							<Link
								href="/admin/events"
								className="flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
							>
								Xem tất cả <ArrowRight size={12} />
							</Link>
						</div>
						<div className="space-y-3">
							{recentEvents.length === 0 ? (
								<p className="py-4 text-center text-sm text-gray-400">Chưa có sự kiện nào</p>
							) : (
								recentEvents.map((e) => (
									<div key={e.id} className="flex items-start gap-3">
										<div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-gray-100">
											{e.thumbnail_url ? (
												<Image src={e.thumbnail_url} alt={e.name} fill className="object-cover" />
											) : (
												<div className="flex h-full w-full items-center justify-center">
													<CalendarDays size={14} className="text-gray-300" />
												</div>
											)}
										</div>
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm font-semibold text-gray-900">{e.name}</p>
											<div className="mt-0.5 flex items-center gap-2">
												<span
													className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
														e.category === "su-kien"
															? "bg-violet-50 text-violet-600"
															: "bg-sky-50 text-sky-600"
													}`}
												>
													{e.category === "su-kien" ? "Sự kiện" : "Kiến thức"}
												</span>
												<span className="text-[11px] text-gray-400">{formatDate(e.date)}</span>
											</div>
										</div>
									</div>
								))
							)}
						</div>

						{/* Events summary */}
						<div className="mt-4 grid grid-cols-2 gap-2">
							<div className="rounded-xl bg-violet-50 p-3 text-center">
								<p className="text-xl font-extrabold text-violet-700">{eventCount}</p>
								<p className="text-[11px] font-medium text-violet-500">Sự kiện</p>
							</div>
							<div className="rounded-xl bg-sky-50 p-3 text-center">
								<p className="text-xl font-extrabold text-sky-700">{knowledgeCount}</p>
								<p className="text-[11px] font-medium text-sky-500">Kiến thức</p>
							</div>
						</div>
					</div>

					{/* Quick actions */}
					<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
						<h2 className="mb-4 font-bold text-gray-900">Truy cập nhanh</h2>
						<div className="space-y-2">
							{[
								{ href: "/admin/products", label: "Quản lý sản phẩm", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
								{ href: "/admin/events", label: "Quản lý sự kiện", icon: CalendarDays, color: "text-violet-500", bg: "bg-violet-50" },
								{ href: "/admin/hero-banner", label: "Quản lý banner", icon: ImageIcon, color: "text-emerald-500", bg: "bg-emerald-50" },
							].map(({ href, label, icon: Icon, color, bg }) => (
								<Link
									key={href}
									href={href}
									className="group flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 transition-all hover:border-gray-200 hover:bg-gray-50"
								>
									<div className={`rounded-lg p-1.5 ${bg}`}>
										<Icon size={14} className={color} />
									</div>
									<span className="flex-1 text-sm font-medium text-gray-700">{label}</span>
									<ArrowRight size={14} className="text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-500" />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
