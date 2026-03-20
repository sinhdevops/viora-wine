"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { PRODUCTS } from "@/constants/products";
import ProductCard from "@/components/page/product-card";
import KnowledgeSection from "@/components/page/knowledge-section";
import { HiOutlineGift, HiOutlineSparkles, HiOutlineTruck, HiOutlineShieldCheck, HiChevronDown } from "react-icons/hi";
import { useState } from "react";
import { GiWineGlass, GiWineBottle } from "react-icons/gi";
import { LuLayoutGrid } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import HeroBanner from "@/components/page/home/hero-banner";
import Features from "@/components/page/home/features";

export default function HomePageContent() {
	const t = useTranslations("home");
	const commonT = useTranslations("common");

	const bestSellers = PRODUCTS.filter((p) => p.isBestseller);
	const combos = PRODUCTS.filter((p) => p.category === "combo");
	const gifts = PRODUCTS.filter((p) => p.category === "gift");

	const [activeCategory, setActiveCategory] = useState("all");

	const categories = [
		{ id: "all", name: "Tất cả", icon: LuLayoutGrid },
		{ id: "red", name: "Vang đỏ", icon: GiWineGlass },
		{ id: "white", name: "Vang trắng", icon: GiWineGlass },
		{ id: "rose", name: "Vang hồng", icon: GiWineGlass },
		{ id: "sparkling", name: "Vang sủi", icon: GiWineBottle },
		{ id: "whisky", name: "Whisky", icon: GiWineGlass },
		{ id: "decanter", name: "Ly decanter", icon: GiWineBottle },
	];

	// Helper for price formatting if needed, but the UI specifically says "254.100 đ"
	const featuredItems = Array(10).fill({
		name: "Rượu vang Ý Tavernello Montepulciano D'abruzzo",
		price: "254.100 đ",
		image: "https://res.cloudinary.com/dnngokucp/image/upload/v1773755507/edu-admin/programs/jw7nhgfhd9ksgg9zvrxi.png",
	});

	const testimonials = [
		{
			quote: "Viora Wine không chỉ bán rượu, họ bán những trải nghiệm văn hóa. Sự am hiểu của đội ngũ tư vấn giúp tôi luôn tìm được chai vang hoàn hảo cho mỗi bữa tiệc.",
			author: "MR. HOANG NGUYEN",
			role: "WINE CONNOISSEUR",
		},
		{
			quote: "Mỗi chai vang tại đây không chỉ là thức uống, mà là một câu chuyện về vùng đất và con người tạo ra nó. Tôi luôn tìm thấy sự đồng điệu tâm hồn trong từng giọt rượu.",
			author: "MS. KHANH VY",
			role: "WINE HOBBYIST",
		},
		{
			quote: "Rượu vang không dành cho người vội vã. Cảm ơn đội ngũ Viora đã kiên nhẫn dẫn dắt tôi khám phá thế giới hương vị đầy mê hoặc và chiều sâu này.",
			author: "MR. DUC ANH",
			role: "BUSINESSMAN",
		},
	];

	return (
		<div className="flex flex-col gap-0 pb-24">
			<HeroBanner />
			<Features />
			{/* Featured Products Section */}
			<section className="bg-[#F5F5F5] py-16">
				<div className="container mx-auto px-4">
					{/* Section Title */}
					<h2 className="mb-5 text-3xl font-semibold tracking-tight uppercase md:text-4xl">
						Các sản phẩm nổi bật của chúng tôi
					</h2>

					{/* Category Filter Tabs - Optimized for Mobile UX (Horizontal Scroll) */}
					<div className="relative -mx-4 mb-12 px-4 lg:mx-0 lg:px-0">
						<div className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-2 lg:flex-wrap">
							{categories.map((cat) => (
								<button
									key={cat.id}
									onClick={() => setActiveCategory(cat.id)}
									className={`flex shrink-0 items-center gap-2 rounded-full border-2 px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
										activeCategory === cat.id
											? "bg-brand-primary border-brand-primary text-white shadow-lg"
											: "border-transparent bg-white text-gray-700 shadow-sm hover:border-gray-200"
									}`}
								>
									<cat.icon size={18} />
									<span>{cat.name}</span>
								</button>
							))}
						</div>
					</div>

					{/* Product Grid */}
					<div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
						{featuredItems.map((item, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: idx * 0.05 }}
								className="group flex cursor-pointer flex-col rounded-lg border border-transparent bg-[#FFFFFF] p-3 transition-all duration-300 hover:border-gray-100 hover:bg-white hover:shadow-xl"
							>
								<div className="relative mb-4 aspect-3/4 w-full">
									<Image
										src={item.image}
										alt={item.name}
										fill
										className="object-contain transition-transform duration-500 group-hover:scale-110"
									/>
								</div>
								<div className="w-full font-medium">
									<h3 className="mb-3 line-clamp-2 min-h-[40px] leading-snug">{item.name}</h3>
									<p className="text-brand-primary text-lg font-black lg:text-xl xl:text-2xl">
										{item.price}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* See More Button */}
					<div className="flex justify-center">
						<button className="bg-brand-primary flex transform items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-105 hover:bg-[#A3162A] active:scale-95">
							<span>Xem thêm</span>
							<HiChevronDown size={20} />
						</button>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="bg-gray-50 py-24">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<h2 className="text-brand-primary mb-4 font-serif text-4xl">{t("categories")}</h2>
						<div className="bg-brand-primary mx-auto h-1 w-24"></div>
					</div>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
						{[
							{
								name: commonT("categories_list.wine"),
								img: "https://picsum.photos/seed/wine_cat/800/800",
								path: "/products?cat=wine",
							},
							{
								name: commonT("categories_list.whisky"),
								img: "https://picsum.photos/seed/whisky_cat/800/800",
								path: "/products?cat=whisky",
							},
							{
								name: commonT("categories_list.spirits"),
								img: "https://picsum.photos/seed/spirits_cat/800/800",
								path: "/products?cat=spirits",
							},
							{
								name: commonT("gifts"),
								img: "https://picsum.photos/seed/gift_cat/800/800",
								path: "/products?cat=gift",
							},
						].map((cat, idx) => (
							<Link
								key={idx}
								href={cat.path}
								className="group hover:border-brand-primary relative h-48 overflow-hidden rounded-2xl border-2 border-transparent shadow-lg transition-all duration-500 sm:h-64 md:h-80"
							>
								<Image
									src={cat.img}
									alt={cat.name}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="bg-brand-black/40 group-hover:bg-brand-black/20 absolute inset-0 transition-colors"></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="border-brand-primary border-b-2 pb-2 font-serif text-xl text-white md:text-3xl">
										{cat.name}
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Features Bar - Brand Primary Style */}
			<section className="bg-brand-primary relative overflow-hidden py-16">
				{/* Subtle decorative pattern or glow */}
				<div className="pointer-events-none absolute inset-0 bg-black/10"></div>

				<div className="relative z-10 container mx-auto px-4">
					<div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/20">
						{[
							{
								icon: HiOutlineTruck,
								title: commonT("features.delivery.title"),
								desc: commonT("features.delivery.desc"),
							},
							{
								icon: HiOutlineSparkles,
								title: commonT("features.advice.title"),
								desc: commonT("features.advice.desc"),
							},
							{
								icon: HiOutlineShieldCheck,
								title: commonT("features.authentic.title"),
								desc: commonT("features.authentic.desc"),
							},
							{
								icon: HiOutlineGift,
								title: commonT("features.gift.title"),
								desc: commonT("features.gift.desc"),
							},
						].map((feature, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="group flex flex-col items-center px-2 text-center"
							>
								<div className="relative mb-4 md:mb-6">
									{/* Icon Container */}
									<div className="relative flex h-14 w-14 transform items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:border-white group-hover:bg-white sm:h-20 sm:w-20 sm:rounded-2xl">
										<feature.icon className="group-hover:text-brand-primary text-xl text-white transition-colors sm:text-4xl" />

										{/* Decorative dot */}
										<div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-white opacity-50 sm:h-1.5 sm:w-1.5"></div>
									</div>
								</div>

								<div className="space-y-1 md:space-y-2">
									<h4 className="text-[10px] leading-tight font-black tracking-widest text-white uppercase sm:text-sm sm:tracking-[0.2em]">
										{feature.title}
									</h4>
									<div className="mx-auto h-0.5 w-8 origin-center scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100"></div>
									<p className="max-w-[140px] text-[9px] leading-relaxed font-medium text-white/70 transition-colors group-hover:text-white sm:max-w-[200px] sm:text-xs">
										{feature.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Knowledge Section */}
			<div className="bg-[#F5F5F5]">
				{" "}
				<KnowledgeSection />
			</div>

			{/* Testimonial Section with Swiper */}
			<section className="container mx-auto px-4 py-24">
				<div className="mx-auto max-w-4xl">
					<Swiper
						modules={[Autoplay, Pagination]}
						spaceBetween={30}
						slidesPerView={1}
						autoplay={{ delay: 5000, disableOnInteraction: false }}
						pagination={{ clickable: true }}
						className="testimonial-swiper pb-16"
					>
						{testimonials.map((item, idx) => (
							<SwiperSlide key={idx}>
								<div className="text-center">
									<div className="text-brand-primary mb-8 flex justify-center">
										<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
											<path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
										</svg>
									</div>
									<blockquote className="text-brand-black mb-8 font-serif text-2xl leading-relaxed italic md:text-3xl">
										&quot;{item.quote}&quot;
									</blockquote>
									<p className="text-brand-primary text-sm font-bold tracking-widest uppercase">
										- {item.author}, {item.role}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>
		</div>
	);
}
