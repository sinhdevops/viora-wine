const ZALO = "https://zalo.me/0325610016";

const combos = [
	{
		emoji: "🥂",
		label: "Combo tiếp khách",
		desc: "2 chai vang đỏ tầm trung — sang trọng, vừa túi tiền",
		price: "Từ 780.000đ",
		badge: "Phổ biến nhất",
		badgeColor: "bg-[#7a1c1c] text-white",
	},
	{
		emoji: "🎁",
		label: "Combo quà biếu sếp",
		desc: "Chai cao cấp + hộp quà sang — gây ấn tượng ngay",
		price: "Từ 1.200.000đ",
		badge: "Bán chạy",
		badgeColor: "bg-amber-700 text-white",
	},
	{
		emoji: "🥩",
		label: "Combo bữa steak",
		desc: "Shiraz / Cabernet Sauvignon đậm tanin — perfect match",
		price: "Từ 590.000đ",
		badge: "Gợi ý chef",
		badgeColor: "bg-emerald-800 text-white",
	},
	{
		emoji: "💕",
		label: "Combo cho nữ",
		desc: "Merlot ngọt nhẹ, dễ uống — không chát, hương trái cây",
		price: "Từ 390.000đ",
		badge: "Dễ uống",
		badgeColor: "bg-pink-700 text-white",
	},
];

export default function ComboSection() {
	return (
		<section className="bg-[#fdf8f4] py-12 sm:py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 text-center">
					<span className="mb-2 inline-block rounded-full bg-[#7a1c1c]/10 px-3 py-1 text-[12px] font-semibold tracking-wider text-[#7a1c1c] uppercase">
						Chọn nhanh
					</span>
					<h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Combo Bán Chạy</h2>
					<p className="mt-2 text-sm text-gray-500">Không biết chọn gì? Để Viora gợi ý combo phù hợp nhất</p>
				</div>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
					{combos.map((combo) => (
						<a
							key={combo.label}
							href={`${ZALO}`}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#7a1c1c]/40 hover:shadow-md active:scale-[.98] sm:p-5"
						>
							<div className="mb-3 flex items-start justify-between">
								<span className="text-3xl" aria-hidden="true">
									{combo.emoji}
								</span>
								<span
									className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${combo.badgeColor}`}
								>
									{combo.badge}
								</span>
							</div>
							<p className="mb-1 text-[13px] font-bold text-gray-900 sm:text-[14px]">{combo.label}</p>
							<p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-gray-500 sm:text-[12px]">
								{combo.desc}
							</p>
							<div className="mt-auto">
								<p className="mb-2 text-[13px] font-bold text-[#7a1c1c] sm:text-[14px]">
									{combo.price}
								</p>
								<span className="inline-flex w-full items-center justify-center rounded-lg bg-[#7a1c1c] py-2 text-[12px] font-semibold text-white transition-opacity group-hover:opacity-90 sm:text-[13px]">
									Tư vấn ngay
								</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
