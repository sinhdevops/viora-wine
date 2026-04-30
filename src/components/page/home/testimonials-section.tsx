"use client";

import Image from "next/image";
import { HiStar } from "react-icons/hi";
import { ArrowRight, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Review {
	id: string;
	name: string;
	city: string;
	avatar: string;
	review: string;
	productImage?: string;
}

const REVIEWS: Review[] = [
	{
		id: "rev-1",
		name: "Anh Tuấn",
		city: "Hà Nội",
		avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=AnhTuan&backgroundColor=b6e3f4",
		review: "Rượu ngon, dễ uống, giao hàng nhanh sẽ ủng hộ tiếp.",
	},
	{
		id: "rev-2",
		name: "Chị Kim Ngân",
		city: "Đà Nẵng",
		avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=KimNgan&backgroundColor=ffd5dc",
		review: "Mua làm quà tặng, đóng gói rất đẹp và sang. Người nhận rất thích!",
		productImage:
			"https://www.viorawine.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdnngokucp%2Fimage%2Fupload%2Fv1776357752%2Flnwxc1lwqv0zlysuyt9e.webp&w=1920&q=75",
	},
	{
		id: "rev-3",
		name: "Chị Hằng",
		city: "Hà Nội",
		avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=ChiHang&backgroundColor=c0aede",
		review: "Mình không uống được rượu mạnh mà chai này uống rất ok, ngọt nhẹ, thơm.",
	},
	{
		id: "rev-4",
		name: "Anh Nguyễn Nam",
		city: "TP. Hồ Chí Minh",
		avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=NguyenNam&backgroundColor=d1f0c0",
		review: "Shop tư vấn nhiệt tình, rượu chính hãng, giá cả hợp lý.",
		productImage:
			"https://www.viorawine.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdnngokucp%2Fimage%2Fupload%2Fv1776357752%2Flnwxc1lwqv0zlysuyt9e.webp&w=1920&q=75",
	},
];

function ReviewCard({ review }: { review: Review }) {
	return (
		<div className="flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
			{/* Quote icon + Stars */}
			<div className="flex items-center justify-between">
				<Quote size={28} className="text-brand-primary/20 -scale-x-100" strokeWidth={1.5} />
				<div className="flex gap-0.5 text-yellow-400">
					{Array.from({ length: 5 }).map((_, i) => (
						<HiStar key={i} size={16} />
					))}
				</div>
			</div>

			{/* Review text */}
			<p className="flex-1 text-[15px] leading-relaxed text-gray-700 italic">"{review.review}"</p>

			{/* Bottom: avatar + name + optional product image */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
						<Image src={review.avatar} alt={review.name} fill className="object-cover" unoptimized />
					</div>
					<div>
						<p className="text-sm font-semibold text-gray-900">{review.name}</p>
						<p className="text-xs text-gray-400">{review.city}</p>
					</div>
				</div>
				{review.productImage && (
					<div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md">
						<Image src={review.productImage} alt="product" fill className="object-contain" />
					</div>
				)}
			</div>
		</div>
	);
}

export default function TestimonialsSection() {
	return (
		<section className="py-10">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-6 flex items-start justify-between gap-4">
					<h2 className="text-base font-semibold tracking-wide uppercase md:text-[28px]">
						Khách hàng nói gì về chúng tôi
					</h2>
					<a
						href="#"
						className="text-brand-primary flex shrink-0 items-center gap-1 text-sm font-medium hover:underline"
					>
						Xem tất cả
						<ArrowRight size={14} />
					</a>
				</div>
			</div>

			{/* Mobile: full-bleed swiper */}
			<div className="md:hidden">
				<Swiper
					modules={[Pagination]}
					spaceBetween={12}
					slidesPerView={1.1}
					slidesOffsetBefore={16}
					slidesOffsetAfter={16}
					pagination={{ clickable: true, el: ".testimonials-pagination" }}
					className="pb-1"
				>
					{REVIEWS.map((review) => (
						<SwiperSlide key={review.id} className="h-auto">
							<ReviewCard review={review} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className="testimonials-pagination [&_.swiper-pagination-bullet-active]:bg-brand-primary mt-4 flex justify-center gap-1.5 [&_.swiper-pagination-bullet]:bg-gray-300" />
			</div>

			{/* Desktop: grid */}
			<div className="mx-auto hidden max-w-360 gap-4 px-4 sm:px-6 md:grid md:grid-cols-2 lg:grid-cols-4 lg:px-8">
				{REVIEWS.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>
		</section>
	);
}
