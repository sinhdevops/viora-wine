import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

const badges = [
	{ icon: ShieldCheck, title: "Chính hãng 100%", sub: "Nhập khẩu trực tiếp" },
	{ icon: Truck, title: "Freeship toàn quốc", sub: "Cho đơn từ 999k" },
	{ icon: RotateCcw, title: "Đổi trả dễ dàng", sub: "Trong vòng 7 ngày" },
];

export default function ProductTrustBadges() {
	return (
		<div className="mb-5 grid grid-cols-3 gap-1 rounded-xl border border-gray-100 bg-gray-50 p-3 lg:gap-0 lg:rounded-none lg:border-none lg:bg-transparent lg:p-0">
			{badges.map(({ icon: Icon, title, sub }, i) => (
				<div
					key={title}
					className={`flex flex-col items-center gap-1.5 text-center lg:flex-row lg:items-center lg:gap-2 lg:text-left ${i > 0 ? "border-l border-gray-200 lg:border-none lg:pl-4" : ""} ${i < badges.length - 1 ? "lg:pr-4" : ""}`}
				>
					<Icon size={24} className="shrink-0 text-gray-500 lg:size-9" strokeWidth={1.4} />
					<div>
						<p className="text-[11px] font-semibold leading-tight lg:text-[14px]">{title}</p>
						<p className="text-[10px] leading-tight text-[#3D3D3D] lg:text-[13px]">{sub}</p>
					</div>
				</div>
			))}
		</div>
	);
}
