import { Headset, ShieldCheck, Gift } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";

const features = [
	{
		icon: TbTruckDelivery,
		title: "GIAO HÀNG TOÀN QUỐC",
		description: "Đóng gói cẩn thận",
	},
	{
		icon: Headset,
		title: "TƯ VẤN MIỄN PHÍ",
		description: "Hỗ trợ tư vấn 24/7",
	},
	{
		icon: ShieldCheck,
		title: "CAM KẾT CHÍNH HÃNG",
		description: "100% nhập khẩu",
	},
	{
		icon: Gift,
		title: "QUÀ TẶNG TINH TẾ",
		description: "Gói quà nghệ thuật",
	},
];

export default function Features() {
	return (
		<section className="bg-[#0B0E1F] py-6 lg:py-7.5">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-0 lg:space-y-1.5 lg:text-center"
						>
							<div className="shrink-0 rounded-full bg-white/10 p-2.5 lg:bg-transparent lg:p-0">
								<feature.icon className="h-5 w-5 text-white lg:h-10 lg:w-10" strokeWidth={1.5} />
							</div>
							<div className="lg:text-center">
								<h3 className="text-[11px] font-semibold tracking-wider text-white uppercase lg:text-base lg:tracking-widest">
									{feature.title}
								</h3>
								<p className="text-[11px] tracking-wide text-gray-400 lg:text-[15px]">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
