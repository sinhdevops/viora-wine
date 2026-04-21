"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/utils/format-currency";
import type { DbProduct } from "@/@types/product";
import { WINE_IMAGES } from "../../../public/statics/images";

interface CardProductProps {
	product: DbProduct;
	isHot?: boolean;
}

export default function CardProduct({ product, isHot = false }: CardProductProps) {
	const t = useTranslations("common");
	const locale = useLocale();
	const originalPrice =
		product.discount_percentage > 0
			? Math.round(product.price / (1 - product.discount_percentage / 100) / 100) * 100
			: null;

	return (
		<div className="group block h-full">
			<div className="flex flex-col h-full">
				{/* Image area */}
				<Link href={{ pathname: '/products/[slug]', params: { slug: product.slug } }} className="block">
					<div className="relative">
						<div className="relative aspect-216/290 rounded-xl overflow-hidden bg-[#ECECEC]">
								<Image
							src={product.thumbnail_url}
							alt={product.name}
							fill
							className="object-contain transition-transform duration-500"
						/>
						</div>

						{/* HOT badge */}
						{isHot && (
							<div className="absolute -top-5 -left-3">
								<Image src={WINE_IMAGES.hot} alt="" aria-hidden="true" />
							</div>
						)}
					</div>
				</Link>

				{/* Info */}
				<div className="py-3 flex flex-col flex-1">
					<Link href={{ pathname: '/products/[slug]', params: { slug: product.slug } }} className="block">
						<p className="mb-1.5 line-clamp-2 min-h-11 wrap-break-word text-[14px] font-medium md:text-[15px]">
							{product.name}
						</p>
						<div className="flex flex-wrap items-baseline mb-3 gap-x-2.5">
							{product.price === 0 ? (
								<span className="text-[15px] font-semibold text-brand-primary">
									{t("contact")}
								</span>
							) : (
								<>
									{originalPrice && (
										<span className="text-[13px] text-[#3D3D3D] line-through">
											{formatCurrency(originalPrice, locale)}
										</span>
									)}
									<span className="text-[15px] font-semibold text-brand-primary">
										{formatCurrency(product.price, locale)}
									</span>
								</>
							)}
						</div>
					</Link>
					<div className="mt-auto pt-2">
						<a
							href="https://zalo.me/0349748451"
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => {
								e.stopPropagation();
								// Fire-and-forget: increment sold_count, do not block navigation
								fetch(`/api/products/${product.id}/increment-sold`, { method: 'POST' });
							}}
							className="inline-block"
						>
							<button className="rounded-lg bg-brand-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-red-200">
								{t("contact_zalo")}
							</button>
						</a>
					</div>
				</div>
				
			</div>
		</div>
	);
}
