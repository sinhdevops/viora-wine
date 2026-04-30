"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/utils/format-currency";
import type { DbProduct } from "@/@types/product";
import Button from "../ui/button";
import Badge, { type BadgeProps } from "../ui/badge";

type TagKey = NonNullable<DbProduct["tag"]>;
const TAG_MAP: Record<TagKey, { label: string; variant: BadgeProps["variant"] }> = {
	best_seller: { label: "Best seller", variant: "red" },
	easy_drink: { label: "Dễ uống", variant: "orange" },
	sweet: { label: "Ngọt nhẹ", variant: "green" },
	everyday: { label: "Thường ngày", variant: "purple" },
	gift: { label: "Quà tặng", variant: "pink" },
};

interface CardProductProps {
	product: DbProduct;
}

export default function CardProduct({ product }: CardProductProps) {
	const t = useTranslations("common");
	const [viewers, setViewers] = useState<number | null>(null);
	useEffect(() => {
		setViewers(Math.floor(Math.random() * 15) + 1);
	}, []);
	const originalPrice =
		product.discount_percentage > 0
			? Math.round(product.price / (1 - product.discount_percentage / 100) / 100) * 100
			: null;

	return (
		<div className="group block h-full">
			<div className="flex h-full flex-col">
				{/* Image area */}
				<Link href={{ pathname: "/products/[slug]", params: { slug: product.slug } }} className="block">
					<div className="relative">
						<div className="relative aspect-220/290 overflow-hidden rounded-xl bg-[#ECECEC]">
							{product.thumbnail_url && (
								<Image
									src={product.thumbnail_url}
									alt={product.name}
									fill
									className="object-contain transition-transform duration-500"
								/>
							)}
						</div>

						{/* Badge */}
						{product.tag &&
							(() => {
								const key = product.tag as TagKey;
								const { label, variant } = TAG_MAP[key];
								return (
									<div className="absolute top-1 left-2">
										<Badge variant={variant}>{label}</Badge>
									</div>
								);
							})()}

						{/* Viewers bar — best_seller only */}
						{product.tag === "best_seller" && viewers !== null && (
							<div className="absolute bottom-0 left-1/2 flex min-w-[160px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-t-xl border border-t-0 border-gray-200 bg-white px-2 py-1">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									className="shrink-0 text-gray-500"
								>
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
									<circle cx="12" cy="12" r="3" />
								</svg>
								<span className="text-[12px] font-medium text-gray-600">{viewers} người đang xem</span>
							</div>
						)}
					</div>
				</Link>

				{/* Info */}
				<div className="flex flex-1 flex-col space-y-1.5 py-3">
					<Link href={{ pathname: "/products/[slug]", params: { slug: product.slug } }} className="block">
						<p className="line-clamp-2 min-h-11 text-[14px] font-medium wrap-break-word md:text-[15px]">
							{product.name}
						</p>
						<div className="line-clamp-1">Đậm đà, dễ uống, hợp với thịt đỏ</div>
						<div className="flex flex-wrap items-baseline gap-x-2.5">
							{product.price === 0 ? (
								<span className="text-brand-primary text-[15px] font-semibold">{t("contact")}</span>
							) : (
								<>
									<span className="text-brand-primary text-base font-semibold lg:text-lg">
										{formatCurrency(product.price)}
									</span>
									{originalPrice && (
										<span className="text-sm text-[#3D3D3D] line-through lg:text-[15px]">
											{formatCurrency(originalPrice)}
										</span>
									)}
								</>
							)}
						</div>
						{product.rating != null && (
							<div className="flex items-center gap-1.5">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="#FACC15"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
								</svg>
								<span className="font-semibold">{product.rating.toFixed(1)}</span>
								{product.sold_count != null && product.sold_count > 0 && (
									<span className="text-secondary text-[13px]">({product.sold_count} đánh giá)</span>
								)}
							</div>
						)}
						<div>Nồng độ: 1% ABV*</div>
					</Link>
					<div className="mt-auto pt-2">
						<a
							href="https://zalo.me/0338909973"
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => {
								e.stopPropagation();
								// Fire-and-forget: increment sold_count, do not block navigation
								fetch(`/api/products/${product.id}/increment-sold`, { method: "POST" });
							}}
							className="inline-block"
						>
							<Button>Tư vấn đặt hàng </Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
