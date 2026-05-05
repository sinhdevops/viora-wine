"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/utils/format-currency";
import { SiZalo } from "react-icons/si";
import { HiStar } from "react-icons/hi";
import type { DbProduct } from "@/@types/product";

interface ProductSuggestionBlockProps {
	products: DbProduct[];
	title: string;
	ctaLabel: string;
}

const TAG_LABELS: Record<string, { label: string; className: string }> = {
	best_seller: { label: "Bán chạy", className: "bg-orange-500 text-white" },
	easy_drink: { label: "Dễ uống", className: "bg-green-500 text-white" },
	sweet: { label: "Ngọt nhẹ", className: "bg-pink-500 text-white" },
	everyday: { label: "Thường ngày", className: "bg-blue-500 text-white" },
	gift: { label: "Quà tặng", className: "bg-purple-500 text-white" },
};

function ProductCard({ product, ctaLabel }: { product: DbProduct; ctaLabel: string }) {
	const t = useTranslations("common");
	const tagMeta = product.tag ? TAG_LABELS[product.tag] : null;

	const originalPrice =
		product.discount_percentage > 0
			? Math.round(product.price / (1 - product.discount_percentage / 100) / 100) * 100
			: null;

	return (
		<div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-md">
			{/* Image */}
			<Link href={{ pathname: "/products/[slug]", params: { slug: product.slug } }} className="block">
				<div className="relative aspect-[3/2] w-full bg-[#ECECEC]">
					{product.thumbnail_url && (
						<Image
							src={product.thumbnail_url}
							alt={product.name}
							fill
							className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					)}
					{product.discount_percentage > 0 && (
						<span className="bg-brand-primary absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white">
							-{product.discount_percentage}%
						</span>
					)}
					{tagMeta && (
						<span
							className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${tagMeta.className}`}
						>
							{tagMeta.label}
						</span>
					)}
				</div>
			</Link>

			{/* Info */}
			<div className="flex flex-1 flex-col gap-2 p-4">
				{/* Rating row */}
				<div className="flex items-center gap-1.5">
					<HiStar className="text-yellow-400" size={13} />
					<span className="text-[11px] font-bold text-gray-600">5.0</span>
				</div>

				{/* Name */}
				<Link href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}>
					<p className="hover:text-brand-primary line-clamp-2 min-h-[2.5rem] text-[13px] leading-snug font-semibold text-gray-800 transition-colors">
						{product.name}
					</p>
				</Link>

				{/* Short description */}
				{product.description && (
					<p className="line-clamp-2 text-[12px] leading-relaxed text-gray-500">{product.description}</p>
				)}

				{/* Price */}
				<div className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
					{product.price === 0 ? (
						<span className="text-brand-primary text-[14px] font-bold">{t("contact")}</span>
					) : (
						<>
							{originalPrice && (
								<span className="text-[12px] text-gray-400 line-through">
									{formatCurrency(originalPrice)}
								</span>
							)}
							<span className="text-brand-primary text-[14px] font-bold">
								{formatCurrency(product.price)}
							</span>
						</>
					)}
				</div>

				{/* Zalo CTA */}
				<a
					href="https://zalo.me/0325610016"
					target="_blank"
					rel="noopener noreferrer"
					className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0068FF] py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0055CC] hover:shadow-md active:scale-95"
				>
					<SiZalo size={16} />
					{ctaLabel}
				</a>
			</div>
		</div>
	);
}

export default function ProductSuggestionBlock({ products, title, ctaLabel }: ProductSuggestionBlockProps) {
	if (!products || products.length === 0) return null;

	return (
		<aside className="my-10 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
			{/* Header */}
			<div className="mb-5 flex items-center gap-2">
				<span className="text-xl">🍷</span>
				<h3 className="text-[15px] font-semibold tracking-tight text-gray-900 uppercase">{title}</h3>
			</div>

			{/* Product grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((p) => (
					<ProductCard key={p.id} product={p} ctaLabel={ctaLabel} />
				))}
			</div>
		</aside>
	);
}
