import Image from "next/image";
import { Star, Truck, ShieldCheck } from "lucide-react";
import { WINE_IMAGES } from "../../../../public/statics/images";
import Button from "@/components/ui/button";

export default function HeroBannerNew() {
	return (
		<>
			{/* ── Mobile hero ── */}
			<section className="relative aspect-428/573 w-full overflow-hidden lg:hidden">
				<Image
					src={WINE_IMAGES.heroMobile}
					alt="Rượu Vang Nhập Khẩu Chính Hãng – Viora Wine"
					fill
					priority
					quality={85}
					sizes="100vw"
					className="object-cover object-center"
				/>

				<div className="absolute inset-0 flex flex-col items-center px-4 pt-6">
					<span className="mb-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
						ĐƯỢC TUYỂN CHỌN TỪ ÚC - Ý - CHILE
					</span>

					<h1
						className="text-center text-[36px] leading-tight font-semibold text-white"
						style={{ fontFamily: "'Libre Bodoni'" }}
					>
						Rượu vang dễ uống
					</h1>
					<h2
						className="text-center text-[38px] leading-tight font-bold"
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

					<p className="mb-[10px] text-center text-sm text-white">
						Chỉ từ{" "}
						<span
							className="text-xl font-semibold"
							style={{
								background: "linear-gradient(180deg, #FFF4C9 15.33%, #FFCC00 92.67%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							490.000đ
						</span>
						<span className="mx-2 text-white/40">|</span>
						Freeship toàn quốc hôm nay
					</p>

					<div className="flex flex-wrap justify-center gap-3">
						<Button href="/products" size="md">
							MUA NGAY
						</Button>
						<Button
							href={{ pathname: "/products", query: { sort: "best_seller" } } as any}
							size="md"
							variant="outline"
						>
							XEM SẢN PHẨM BÁN CHẠY
						</Button>
					</div>
				</div>
			</section>

			{/* ── Desktop hero ── */}
			<section className="relative hidden w-full overflow-hidden lg:block" style={{ aspectRatio: "1440/520" }}>
				<Image
					src={WINE_IMAGES.banner}
					alt="Rượu Vang Nhập Khẩu Chính Hãng – Viora Wine"
					fill
					priority
					quality={75}
					sizes="(max-width: 1024px) 100vw, 1920px"
					className="object-cover lg:object-center"
				/>

				<div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-6 lg:px-8">
					<div className="w-full max-w-[55%]">
						<span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
							ĐƯỢC TUYỂN CHỌN TỪ ÚC - Ý - CHILE
						</span>

						<h1
							className="text-3xl leading-tight font-bold text-white lg:text-5xl xl:text-6xl"
							style={{ fontFamily: "'Libre Bodoni'" }}
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

						<p className="mb-2 text-lg text-white">
							Được chọn lọc cho người mới - Không cần biết vẫn chọn đúng.
						</p>

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

						<div className="mb-3 flex flex-wrap gap-3">
							<Button href="/products" size="lg">
								MUA NGAY
							</Button>
							<Button
								href={{ pathname: "/products", query: { sort: "best_seller" } } as any}
								size="lg"
								variant="outline"
							>
								XEM SẢN PHẨM BÁN CHẠY
							</Button>
						</div>

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
			</section>
		</>
	);
}
