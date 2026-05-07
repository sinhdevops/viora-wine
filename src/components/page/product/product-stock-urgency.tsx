"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Eye } from "lucide-react";

interface Props {
	stock: number;
	stockPercent: number;
}

export default function ProductStockUrgency({ stock, stockPercent }: Props) {
	const [viewersCount, setViewersCount] = useState(() => Math.floor(Math.random() * 15) + 8);

	useEffect(() => {
		const timer = setInterval(() => {
			setViewersCount((prev) => Math.max(5, Math.min(30, prev + (Math.random() > 0.5 ? 1 : -1))));
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="mb-4 overflow-hidden rounded-xl bg-red-50">
			<div className="flex items-center justify-between px-3 pt-3 pb-2">
				<div className="text-brand-primary flex items-center gap-1.5 text-[13px] font-semibold">
					<Clock size={13} className="shrink-0" />
					<span>Chỉ còn {stock} chai trong kho</span>
				</div>
				<div className="flex items-center gap-1.5 text-[13px] text-gray-600">
					<Eye size={13} className="shrink-0" />
					<span>{viewersCount} người đang xem</span>
				</div>
			</div>
			<div className="h-1.5 w-full overflow-hidden bg-red-100">
				<motion.div
					className="bg-brand-primary h-full"
					initial={{ width: 0 }}
					animate={{ width: `${stockPercent}%` }}
					transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
				/>
			</div>
		</div>
	);
}
