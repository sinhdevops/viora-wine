"use client";

import type React from "react";
import type { DbProduct } from "@/@types/product";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/utils/format-currency";
import {
	PhoneCall,
	Star,
	AlertCircle,
	MessageCircle,
	MapPin,
	Leaf,
	Wine,
	FlaskConical,
	Building2,
	Percent,
	Globe,
	Utensils,
} from "lucide-react";
import { WINE_TYPE_LABELS } from "@/lib/schemas/product-schema";
import Button from "@/components/ui/button";
import ProductImageGallery from "@/components/page/product/product-image-gallery";
import ProductStockUrgency from "@/components/page/product/product-stock-urgency";
import ProductTrustBadges from "@/components/page/product/product-trust-badges";
import ProductSpecsCard from "@/components/page/product/product-specs-card";
import ProductAccordion from "@/components/page/product/product-accordion";
import ProductRelatedSlider from "@/components/page/product/product-related-slider";

interface Props {
	product: DbProduct;
	related: DbProduct[];
}

export default function ProductDetailPageContent({ product, related }: Props) {
	const t = useTranslations("product");

	const originalPrice =
		product.discount_percentage > 0
			? Math.round(product.price / (1 - product.discount_percentage / 100) / 100) * 100
			: null;

	const wineTypeLabel = product.wine_type
		? (WINE_TYPE_LABELS[product.wine_type as keyof typeof WINE_TYPE_LABELS] ?? product.wine_type)
		: null;

	const images = [product.thumbnail_url, product.thumbnail_url, product.thumbnail_url];
	const stockPercent = Math.min(95, Math.max(15, (product.stock / 20) * 100));
	const showUrgency = product.stock > 0 && product.stock < 25;

	const specs: { label: string; value: string; icon: React.ElementType }[] = [
		{ label: "Xuất xứ", value: product.country ?? "—", icon: MapPin },
		{ label: t("spec_grape"), value: product.grape_variety ?? "—", icon: Leaf },
		{ label: t("spec_wine_type"), value: wineTypeLabel ?? "—", icon: Wine },
		{ label: t("spec_volume"), value: product.volume ?? "—", icon: FlaskConical },
		{ label: t("spec_producer"), value: product.producer ?? "—", icon: Building2 },
		{ label: t("spec_alcohol"), value: product.alcohol ?? "—", icon: Percent },
		{ label: t("spec_country"), value: product.country ?? "—", icon: Globe },
		// { label: "Kết hợp món ăn", value: product.food_pairing ?? "—", icon: Utensils },
	];

	const accordionSections = [
		{
			id: "usage",
			title: "Hướng dẫn sử dụng",
			content: `<p>Nên thưởng thức ở nhiệt độ 16–18°C. Mở nắp trước 30 phút để rượu tiếp xúc không khí. Rót vào ly vang rộng miệng để phát huy hương thơm tốt nhất.</p>`,
		},
		{ id: "reviews", title: "Đánh giá & nhận xét", content: null },
		{
			id: "policy",
			title: "Chính sách giao hàng và đổi trả",
			content: `<p>Miễn phí vận chuyển cho đơn hàng từ 1 thùng hoặc từ 1 triệu trở lên nội thành tại các chi nhánh trên toàn quốc. Giao hàng liên tỉnh vui lòng liên hệ.</p><p style="margin-top:8px">Chúng tôi đổi trả trong vòng 7 ngày miễn phí đến khi nào quý vị ưng ý.</p>`,
		},
	];

	return (
		<div className="min-h-screen bg-white pb-24 lg:pb-0">
			{/* Breadcrumb */}
			<div className="border-b border-gray-100 bg-gray-50">
				<div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
					<nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
						<Link href="/" className="transition-colors hover:text-gray-600">
							{t("breadcrumb_home")}
						</Link>
						<span>/</span>
						<Link href="/products" className="transition-colors hover:text-gray-600">
							{t("breadcrumb_products")}
						</Link>
						<span>/</span>
						<span className="line-clamp-1 text-gray-600">{product.name}</span>
					</nav>
				</div>
			</div>

			{/* Main product section */}
			<div className="mx-auto max-w-360 px-4 pt-4 pb-6 sm:px-6 lg:px-8 lg:py-12">
				<div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-14">
					<ProductImageGallery images={images} productName={product.name} />

					{/* RIGHT — product info */}
					<div className="flex flex-col gap-0">
						{product.tag && (
							<div className="border-brand-primary mb-3 inline-flex h-7.5 w-fit items-center rounded-md border px-2.5">
								<span className="text-brand-primary font-semibold capitalize">
									{product.tag.replace("_", " ")}
								</span>
							</div>
						)}

						<h1 className="mb-3 text-[20px] leading-snug font-semibold text-gray-900 lg:text-[28px]">
							{product.name}
						</h1>

						{/* Rating + sold */}
						<div className="mb-3 flex flex-wrap items-center gap-2.5">
							<div className="flex items-center gap-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										size={14}
										className={
											i < Math.round(product.rating ?? 4.8)
												? "fill-yellow-400 text-yellow-400"
												: "fill-gray-200 text-gray-200"
										}
									/>
								))}
								<span className="ml-1 text-[12px] font-semibold text-gray-600 lg:text-[13px]">
									{(product.rating ?? 4.8).toFixed(1)}/5
								</span>
							</div>
							<span className="h-3.5 w-px bg-gray-200" />
							<span className="text-[12px] text-gray-400 lg:text-[13px]">
								Đã bán {(product.sold_count ?? 0).toLocaleString("vi-VN")} chai
							</span>
						</div>

						{/* Price */}
						<div className="mb-4 flex flex-wrap items-baseline gap-2.5 border-b border-gray-100 pb-4">
							{product.price === 0 ? (
								<span className="text-brand-primary text-[28px] font-semibold lg:text-[32px]">
									Liên hệ
								</span>
							) : (
								<>
									<span className="text-brand-primary text-[28px] font-semibold lg:text-[32px]">
										{formatCurrency(product.price)}
									</span>
									{originalPrice && (
										<>
											<span className="text-[14px] text-gray-300 line-through lg:text-[16px]">
												{formatCurrency(originalPrice)}
											</span>
											<span className="h-4 w-px self-center bg-gray-300" />
										</>
									)}
									<span className="text-[12px] text-gray-400 lg:text-[13px]">
										Freeship toàn quốc hôm nay
									</span>
								</>
							)}
						</div>

						{showUrgency && <ProductStockUrgency stock={product.stock} stockPercent={stockPercent} />}

						{/* CTA buttons — desktop only; mobile uses sticky bottom bar */}
						<div className="mb-5 grid grid-cols-2 gap-3">
							<Button size="lg" leftIcon={MessageCircle}>
								Tư vấn đặt hàng
							</Button>
							<Button size="lg" variant="outline-primary" leftIcon={PhoneCall}>
								Gọi điện đặt hàng
							</Button>
						</div>

						<ProductTrustBadges />

						{/* Age / safety warning */}
						<div className="bg-brand-primary/16 flex items-start gap-2.5 rounded-xl px-4 py-3">
							<AlertCircle
								size={18}
								className="text-brand-primary mt-0.5 shrink-0 lg:size-[22px]"
								strokeWidth={2}
							/>
							<p className="text-brand-primary text-[12px] leading-relaxed lg:text-[13px]">
								Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ đang mang thai. Khi uống rượu bia
								không lái xe!
							</p>
						</div>
					</div>
				</div>

				{/* Below fold — Specs + Accordion */}
				<div className="mt-8 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-[260px_1fr] lg:gap-8">
					<ProductSpecsCard specs={specs} />
					<ProductAccordion productContent={product.content} sections={accordionSections} />
				</div>

				<ProductRelatedSlider related={related} />
			</div>

			{/* Sticky mobile CTA bar */}
			<div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
				<div className="grid grid-cols-2 gap-3">
					<Button leftIcon={MessageCircle} className="h-12 text-[13px]">
						Tư vấn đặt hàng
					</Button>
					<Button variant="outline-primary" leftIcon={PhoneCall} className="h-12 text-[13px]">
						Gọi điện đặt hàng
					</Button>
				</div>
			</div>
		</div>
	);
}
