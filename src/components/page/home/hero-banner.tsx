import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
	{
		id: 1,
		image_url:
			"https://images.unsplash.com/photo-1510850431481-7a00282b9077?auto=format&fit=crop&q=80&w=1920&h=1080",
	},
	{
		id: 2,
		image_url:
			"https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7ef?auto=format&fit=crop&q=80&w=1920&h=1080",
	},
	{
		id: 3,
		image_url: "https://images.unsplash.com/photo-1553390882-026330450529?auto=format&fit=crop&q=80&w=1920&h=1080",
	},
	{
		id: 4,
		image_url:
			"https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80&w=1920&h=1080",
	},
	{
		id: 5,
		image_url:
			"https://images.unsplash.com/photo-1566754436893-983a977a6ad2?auto=format&fit=crop&q=80&w=1920&h=1080",
	},
	{
		id: 6,
		image_url:
			"https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&q=80&w=1920&h=1080",
	},
];

export default function HeroBanner() {
	return (
		<section className="group relative overflow-hidden">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				speed={800}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				pagination={{
					clickable: true,
					el: ".custom-pagination",
					renderBullet: function (index, className) {
						return '<span class="' + className + '"></span>';
					},
				}}
				navigation={{
					prevEl: ".prev-btn",
					nextEl: ".next-btn",
				}}
				loop={true}
				className="h-[500px] w-full sm:h-[600px] lg:h-[750px]"
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative aspect-1440/634">
							{/* Background Image */}
							<Image
								src={slide.image_url}
								alt={slide.image_url}
								className="absolute inset-0 h-full w-full object-cover"
								referrerPolicy="no-referrer"
								fill
							/>
							<div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
						</div>
					</SwiperSlide>
				))}

				{/* Custom Navigation Buttons */}
				<button className="prev-btn absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:cursor-pointer hover:bg-white hover:text-black sm:left-10">
					<ChevronLeft size={24} />
				</button>
				<button className="next-btn absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:cursor-pointer hover:bg-white hover:text-black sm:right-10">
					<ChevronRight size={24} />
				</button>

				<div className="custom-pagination absolute right-0 bottom-11 left-0 z-20 flex items-center justify-center gap-3" />
			</Swiper>
		</section>
	);
}
