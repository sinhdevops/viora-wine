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
		<section className="bg-[#0B0E1F] py-[30px]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group flex cursor-pointer flex-col items-center space-y-[6px] text-center"
						>
							<div className="transition-all duration-300">
								<feature.icon className="h-8 w-8 text-white lg:h-10 lg:w-10" strokeWidth={1.5} />
							</div>
							<h3 className="text-sm font-medium tracking-widest text-white uppercase lg:text-base">
								{feature.title}
							</h3>
							<p className="text-sm tracking-wide text-gray-400 lg:text-[15px]">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
