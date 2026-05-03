"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Star, Truck, ShieldCheck } from "lucide-react";
import { WINE_IMAGES } from "../../../../public/statics/images";
import Button from "@/components/ui/button";

export default function HeroBannerNew() {
	return (
		<section className="relative w-full overflow-hidden" style={{ aspectRatio: "1440/520" }}>
			{/* Background image */}
			<Image
				src={WINE_IMAGES.banner}
				alt="Rượu Vang Nhập Khẩu Chính Hãng – Viora Wine"
				fill
				priority
				quality={75}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
				className="object-cover lg:object-center"
			/>

			<div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-6 lg:px-8">
				{/* Left: text content — occupies ~55% width */}
				<div className="w-full max-w-[55%]">
					{/* Top badge */}
					<span className="mb-3 hidden rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm lg:inline-block">
						ĐƯỢC TUYỂN CHỌN TỪ ÚC - Ý - CHILE
					</span>

					{/* Heading */}
					<h1
						className="text-3xl leading-tight font-bold text-white lg:text-5xl xl:text-6xl"
						style={{
							fontFamily: "'Libre Bodoni'",
						}}
					>
						Rượu vang dễ uống
					</h1>
					<h2
						className="mb-3 text-3xl leading-tight font-bold lg:text-5xl xl:text-6xl"
						style={{
							background: "linear-gradient(180deg, #FFF4C9 15.33%, #FFCC00 92.67%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							fontFamily: "'Libre Bodoni'",
						}}
					>
						cho mọi dịp.
					</h2>

					<div className="hidden lg:block">
						{/* Subtitle */}
						<p className="mb-2 text-lg text-white">
							Được chọn lọc cho người mới - Không cần biết vẫn chọn đúng.
						</p>

						{/* Price row */}
						<p className="mb-3 text-lg text-white">
							Chỉ từ{" "}
							<span
								className="text-[28px] font-semibold text-white"
								style={{
									background: "linear-gradient(180deg, #FFF4C9 15.33%, #FFCC00 92.67%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
								}}
							>
								490.000đ
							</span>
							<span className="mx-3 text-white/40">|</span>
							Freeship toàn quốc hôm nay
						</p>

						{/* Buttons */}
						<div className="mb-3 flex flex-wrap gap-3">
							<Link href="/products">
								<Button size="lg">MUA NGAY</Button>
							</Link>
							<Link href={{ pathname: "/products", query: { sort: "best_seller" } } as any}>
								<Button size="lg" variant="outline">
									XEM SẢN PHẨM BÁN CHẠY
								</Button>
							</Link>
						</div>

						{/* Stats row */}
						<div className="flex flex-wrap items-center gap-5 text-white/75">
							<span className="flex items-center gap-1.5">
								<Star size={20} className="text-yellow-400" fill="#FACC15" />
								4.8/5 từ 1000 khách hàng
							</span>
							<span className="flex items-center gap-1.5">
								<Truck size={20} />
								Giao nhanh 2-4h
							</span>
							<span className="flex items-center gap-1.5">
								<ShieldCheck size={20} />
								Cam kết chính hãng 100%
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
