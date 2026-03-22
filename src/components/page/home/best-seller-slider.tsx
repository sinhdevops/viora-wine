"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import type { DbProduct } from "@/@types/product";
import CardProduct from "@/components/page/card-product";

import "swiper/css";
import "swiper/css/grid";

export default function BestSellerSlider() {
	const swiperRef = useRef<SwiperType | null>(null);
	const [products, setProducts] = useState<DbProduct[]>([]);

	useEffect(() => {
		supabase
			.from("products")
			.select("id, name, description, thumbnail_url, price, discount_percentage, category, stock, is_hot, content")
			.eq("is_hot", true)
			.limit(10)
			.then(({ data }) => {
				if (data && data.length > 0) setProducts(data as DbProduct[]);
			});
	}, []);

	return (
		<section className="bg-white py-12 md:py-16">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Title */}
				<h2 className="mb-7.5 text-center text-xl font-semibold uppercase tracking-[0.15em] md:text-[28px]">
					SẢN PHẨM BÁN CHẠY NHẤT
				</h2>

				{/* Slider wrapper with side arrows */}
				<div className="relative">
					{/* Prev button */}
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						className="absolute top-1/2 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-400 hover:text-gray-900 md:-left-5"
					>
						<ChevronLeft size={18} />
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
						className="px-1! py-4!"
					>
						{products.map((product) => (
							<SwiperSlide key={product.id}>
								<CardProduct product={product} isHot />
							</SwiperSlide>
						))}
					</Swiper>

					{/* Next button */}
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className="absolute top-1/2 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-400 hover:text-gray-900 md:-right-5"
					>
						<ChevronRight size={18} />
					</button>
				</div>
			</div>
		</section>
	);
}
