"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Banner {
	id: string;
	image_url: string;
}

interface HeroBannerProps {
	banners: Banner[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
	if (banners.length === 0) return null;

	return (
		<section className="group relative overflow-hidden">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				speed={1000}
				autoplay={{ delay: 10000, disableOnInteraction: false }}
				pagination={{
					clickable: true,
					el: ".custom-pagination",
					renderBullet: function (_index, className) {
						return '<span class="' + className + '"></span>';
					},
				}}
				navigation={{
					prevEl: ".prev-btn",
					nextEl: ".next-btn",
				}}
				loop={banners.length > 1}
				className="w-full"
			>
				{banners.map((banner) => (
					<SwiperSlide key={banner.id}>
						<div className="relative h-55 w-full sm:h-auto sm:aspect-16/7 lg:aspect-1440/634">
							<Image
								src={banner.image_url}
								alt="Hero Banner"
								referrerPolicy="no-referrer"
								className="lg:object-cover"
								fill
								priority
							/>
							{/* Mobile: bottom gradient for readability */}
							<div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent sm:hidden" />
							{/* Desktop: left gradient */}
							<div className="absolute inset-0 hidden bg-linear-to-r from-black/50 via-black/20 to-transparent sm:block" />
						</div>
					</SwiperSlide>
				))}

				{/* Nav — hidden on mobile, show on desktop hover */}
				<button className="prev-btn absolute top-1/2 left-4 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-300 sm:flex sm:opacity-0 group-hover:sm:opacity-100 hover:cursor-pointer hover:bg-white hover:text-black sm:left-10">
					<ChevronLeft size={24} />
				</button>
				<button className="next-btn absolute top-1/2 right-4 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-300 sm:flex sm:opacity-0 group-hover:sm:opacity-100 hover:cursor-pointer hover:bg-white hover:text-black sm:right-10">
					<ChevronRight size={24} />
				</button>

				<div className="custom-pagination absolute right-0 bottom-4 left-0 z-20 flex items-center justify-center gap-2 sm:bottom-8" />
			</Swiper>
		</section>
	);
}
