"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import type { DbProduct } from "@/@types/product";
import CardProduct from "@/components/page/card-product";
import TestimonialsSection from "@/components/page/home/testimonials-section";

interface Props {
	related: DbProduct[];
}

export default function ProductRelatedSlider({ related }: Props) {
	const t = useTranslations("product");
	const swiperRef = useRef<SwiperType | null>(null);

	if (related.length === 0) return null;

	return (
		<div className="mt-14 border-t border-gray-100 pt-10">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-[28px] font-semibold text-gray-900">{t("related")}</h2>
				<Link href="/products" className="text-brand-primary text-[13px] font-medium hover:underline">
					{t("view_all")}
				</Link>
			</div>
			<div className="relative">
				<button
					onClick={() => swiperRef.current?.slidePrev()}
					aria-label="Previous"
					className="absolute top-1/2 -left-4 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-gray-300 hover:text-gray-700 md:-left-5"
				>
					<ChevronLeft size={16} />
				</button>
				<Swiper
					modules={[Navigation]}
					onSwiper={(s) => (swiperRef.current = s)}
					spaceBetween={14}
					slidesPerView={2}
					breakpoints={{
						640: { slidesPerView: 3, spaceBetween: 16 },
						1024: { slidesPerView: 4, spaceBetween: 20 },
						1280: { slidesPerView: 5, spaceBetween: 20 },
					}}
					className="px-1! py-4!"
				>
					{related.map((p) => (
						<SwiperSlide key={p.id}>
							<CardProduct product={p} />
						</SwiperSlide>
					))}
				</Swiper>
				<button
					onClick={() => swiperRef.current?.slideNext()}
					aria-label="Next"
					className="absolute top-1/2 -right-4 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-gray-300 hover:text-gray-700 md:-right-5"
				>
					<ChevronRight size={16} />
				</button>
			</div>
			<TestimonialsSection />
		</div>
	);
}
