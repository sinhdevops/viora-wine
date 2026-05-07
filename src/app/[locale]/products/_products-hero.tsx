import Image from "next/image";
import { WINE_IMAGES } from "../../../../public/statics/images";

export default function ProductsHero() {
	return (
		<>
			{/* HERO — mobile */}
			<section className="relative aspect-428/180 lg:hidden">
				<Image
					src={WINE_IMAGES.bannerProductMobile}
					alt="Tất cả sản phẩm – Viora Wine"
					fill
					priority
					className="object-cover"
				/>
				<div className="absolute inset-0 flex items-center px-6">
					<div className="">
						<span className="mb-[6px] inline-block rounded-full border border-white/20 bg-transparent px-3 py-1 text-[12px] font-semibold tracking-widest text-white uppercase">
							ĐƯỢC TUYỂN CHỌN TỪ ÚC - Ý - CHILE
						</span>
						<h1
							className="text-[28px] leading-tight font-bold text-white sm:text-[36px]"
							style={{ fontFamily: "'Libre Bodoni'" }}
						>
							Tất cả sản phẩm
						</h1>
						<h2
							className="mb-[6px] text-[28px] leading-tight font-bold sm:text-[36px]"
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
						<p className="text-sm text-white">Top sản phẩm bán chạy - giá tốt hôm nay.</p>
					</div>
				</div>
			</section>

			{/* HERO — desktop */}
			<section className="relative hidden aspect-1440/350 lg:block">
				<Image
					src={WINE_IMAGES.bannerProduct}
					alt="banner product"
					fill
					priority
					className="object-cover object-right"
				/>
				<div className="absolute inset-0 flex items-center">
					<div className="mx-auto w-full max-w-7xl px-16">
						<div className="max-w-[50%]">
							<span className="mb-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase">
								ĐƯỢC TUYỂN CHỌN TỪ ÚC - Ý - CHILE
							</span>
							<h1
								className="text-[56px] leading-tight font-bold text-white"
								style={{ fontFamily: "'Libre Bodoni'" }}
							>
								Chọn rượu dễ dàng hơn
							</h1>
							<h2
								className="mb-3 text-[56px] leading-tight font-bold"
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
							<p className="mb-5 text-base text-white/80">Top sản phẩm bán chạy - giá tốt hôm nay.</p>
							<div className="flex gap-8">
								<div className="flex items-start gap-3">
									<img
										src="/statics/images/icon-authenticity.svg"
										alt=""
										className="h-10 w-10 shrink-0"
									/>
									<div>
										<p className="text-sm font-semibold text-white">Chính hãng 100%</p>
										<p className="text-xs text-white/75">Nhập khẩu trực tiếp</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<img
										src="/statics/images/icon-delivery.svg"
										alt=""
										className="h-10 w-10 shrink-0"
									/>
									<div>
										<p className="text-sm font-semibold text-white">Freeship toàn quốc</p>
										<p className="text-xs text-white/75">Cho đơn từ 999k</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<img src="/statics/images/icon-return.svg" alt="" className="h-10 w-10 shrink-0" />
									<div>
										<p className="text-sm font-semibold text-white">Đổi trả dễ dàng</p>
										<p className="text-xs text-white/75">Trong vòng 7 ngày</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
