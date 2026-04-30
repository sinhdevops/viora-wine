import type React from "react";

interface Spec {
	label: string;
	value: string;
	icon: React.ElementType;
}

interface Props {
	specs: Spec[];
}

export default function ProductSpecsCard({ specs }: Props) {
	return (
		<div className="h-fit rounded-2xl bg-[#EFEFEF] p-6">
			<h3 className="mb-5 text-[20px] font-semibold text-gray-900">Thông tin sản phẩm</h3>
			<div className="space-y-5">
				{specs.map(({ label, value, icon: Icon }) => (
					<div key={label} className="flex items-start gap-3">
						<Icon size={18} className="mt-0.5 shrink-0 text-gray-500" strokeWidth={1.6} />
						<p className="flex flex-wrap items-baseline gap-x-1.5 text-[15px] leading-snug">
							<span className="text-gray-500">{label}:</span>
							<span className="font-semibold text-gray-900">{value}</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
