"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import type { DbProduct } from "@/@types/product";
import CardProduct from "@/components/page/card-product";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/grid";

export default function BestSellerSlider() {
	const t = useTranslations("home");
	const swiperRef = useRef<SwiperType | null>(null);
	const [products, setProducts] = useState<DbProduct[]>([]);

	useEffect(() => {
		supabase
			.from("products")
			.select(
				"id, slug, name, description, thumbnail_url, price, discount_percentage, category, stock, tag, content, rating, sold_count",
			)
			.eq("category", "wine")
			.gt("sold_count", 0)
			.order("sold_count", { ascending: false })
			.limit(10)
			.then(({ data }) => {
				if (data && data.length > 0) setProducts(data as DbProduct[]);
			});
	}, []);

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Title */}
				<h2 className="mb-3 text-xl font-semibold tracking-[0.15em] uppercase md:text-[28px]">
					{t("bestseller_title")}
				</h2>

				{/* Slider wrapper with side arrows */}
				<div className="relative">
					{/* Prev button */}
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						aria-label="Sản phẩm trước"
						className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-all hover:border-gray-400 hover:text-gray-900 md:-left-5"
					>
						<ChevronLeft size={18} aria-hidden="true" />
					</button>

					<Swiper
						modules={[Navigation, Grid]}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						spaceBetween={16}
						slidesPerView={2}
						slidesPerGroup={4}
						grid={{ rows: 2, fill: "row" }}
						breakpoints={{
							640: { slidesPerView: 3, spaceBetween: 16, grid: { rows: 1 }, slidesPerGroup: 1 },
							1024: { slidesPerView: 4, spaceBetween: 20, grid: { rows: 1 }, slidesPerGroup: 1 },
							1280: { slidesPerView: 5, spaceBetween: 20, grid: { rows: 1 }, slidesPerGroup: 1 },
						}}
						className="px-1! pt-4!"
					>
						{products.map((product) => (
							<SwiperSlide key={product.id}>
								<CardProduct product={product} />
							</SwiperSlide>
						))}
					</Swiper>

					{/* Next button */}
					<button
						onClick={() => swiperRef.current?.slideNext()}
						aria-label="Sản phẩm tiếp theo"
						className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-all hover:border-gray-400 hover:text-gray-900 md:-right-5"
					>
						<ChevronRight size={18} aria-hidden="true" />
					</button>
				</div>
			</div>
		</section>
	);
}
