import { Gift, Truck } from "lucide-react";
import Button from "@/components/ui/button";

const PROMOS = [
	{
		bg: "linear-gradient(100.15deg, #520002 2.39%, #B50008 97.18%)",
		iconBg: "rgba(0,0,0,0.2)",
		icon: Gift,
		title: "MUA 2 GIẢM 20%",
		desc: "Áp dụng cho mọi sản phẩm",
	},
	{
		bg: "linear-gradient(279.11deg, #00B734 0%, #005719 97.62%)",
		iconBg: "rgba(0,0,0,0.18)",
		icon: Truck,
		title: "FREESHIP TOÀN QUỐC",
		desc: "Áp dụng cho đơn từ 999k",
	},
	{
		bg: "linear-gradient(279.82deg, #F00060 -1.7%, #9D014F 32.21%, #00046D 95.89%)",
		iconBg: "rgba(0,0,0,0.2)",
		icon: Gift,
		title: "MUA 5 TẶNG 1",
		desc: "Áp dụng đến hết tháng 5/2026",
	},
];

export default function PromoCards() {
	return (
		<section className="w-full">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
					{PROMOS.map(({ bg, iconBg, icon: Icon, title, desc }) => (
						<div
							key={title}
							className="flex min-h-[148px] overflow-hidden rounded-2xl"
							style={{ background: bg }}
						>
							{/* Icon strip */}
							<div
								className="flex w-[100px] shrink-0 items-center justify-center"
								style={{ background: iconBg }}
							>
								<Icon size={52} className="text-white/90" strokeWidth={1.2} />
							</div>

							{/* Content */}
							<div className="flex flex-1 flex-col justify-center gap-2 px-6 py-6">
								<p className="text-xl leading-tight font-black text-white uppercase">{title}</p>
								<p className="text-[13px] text-white/80">{desc}</p>
								<Button href="/products" variant="ghost" size="md" className="mt-2 w-fit">
									Mua ngay
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
