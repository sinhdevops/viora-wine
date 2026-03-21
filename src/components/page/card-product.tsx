"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/utils/format-currency";
import type { DbProduct } from "@/@types/product";
import { WINE_IMAGES } from "../../../public/statics/images";

interface CardProductProps {
	product: DbProduct;
	isHot?: boolean;
}

export default function CardProduct({ product, isHot = false }: CardProductProps) {
	const locale = useLocale();
	const originalPrice =
		product.discount_percentage > 0
			? Math.round(product.price / (1 - product.discount_percentage / 100) / 100) * 100
			: null;

	return (
		<Link href={`/products/${product.id}`} className="group block">
			<div>
				{/* Image area */}
				<div className="relative aspect-216/290 rounded-xl bg-[#ECECEC]">
					<Image
						src={product.thumbnail_url}
						alt={product.name}
						fill
						className="object-contain transition-transform duration-500"
					/>

					{/* HOT badge */}
					{isHot && (
						<div className="absolute -top-5 -left-3">
							<Image src={WINE_IMAGES.hot} alt="hot product" />
						</div>
					)}
				</div>

				{/* Info */}
				<div className="py-3">
					<p className="mb-1.5 line-clamp-2 min-h-11 wrap-break-word text-[14px] font-medium md:text-[15px]">
						{product.name}
					</p>
					<div className="flex flex-wrap items-baseline gap-x-2.5">
						{originalPrice && (
							<span className="text-[13px] text-[#3D3D3D] line-through">
								{formatCurrency(originalPrice, locale)}
							</span>
						)}
						<span className="text-[15px] font-semibold text-brand-primary">
							{formatCurrency(product.price, locale)}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
