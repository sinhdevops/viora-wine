import { Link } from "@/i18n/routing";

export default function ShirazTopicCluster() {
	return (
		<section className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
			<div className="relative overflow-hidden rounded-2xl bg-[#5C0A0A] px-5 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10">
				{/* Decorative circles */}
				<div className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-white/5" />
				<div className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-white/5" />
				<div className="pointer-events-none absolute top-1/2 right-24 h-24 w-24 -translate-y-1/2 rounded-full bg-[#B22222]/30" />

				<div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
					{/* Text block */}
					<div className="flex items-start gap-3.5">
						<span className="mt-0.5 shrink-0 text-3xl leading-none lg:text-4xl">🍷</span>
						<div>
							<p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-red-300/80 uppercase">
								Chủ đề nổi bật
							</p>
							<h2 className="text-[17px] font-bold leading-snug text-white sm:text-[18px] lg:text-[22px]">
								Rượu Vang Shiraz Úc{" "}
								<span className="text-[#FFCC00]">Nhập Khẩu Chính Hãng</span>
							</h2>
							<p className="mt-1 text-[12px] leading-relaxed text-red-100/70 sm:text-[13px]">
								Giống nho đặc trưng nước Úc — đậm đà, phong phú hương vị, phù hợp mọi dịp
							</p>
						</div>
					</div>

					{/* CTAs — mobile: main full-width + row of 2; desktop: row */}
					<div className="flex flex-col gap-2 sm:shrink-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
						<Link
							href={"/shiraz" as any}
							className="flex items-center justify-center gap-2 rounded-xl bg-[#FFCC00] px-5 py-2.5 text-[13px] font-bold text-[#5C0A0A] transition-all hover:brightness-110 active:scale-95 sm:inline-flex sm:w-auto"
						>
							🍷 Xem tất cả Shiraz
						</Link>
						<div className="grid grid-cols-2 gap-2 sm:contents">
							<Link
								href={"/shiraz-ha-noi" as any}
								className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
							>
								Shiraz Hà Nội
							</Link>
							<Link
								href={"/shiraz-da-nang" as any}
								className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
							>
								Shiraz Đà Nẵng
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
