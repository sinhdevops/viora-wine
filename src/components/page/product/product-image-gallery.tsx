"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
	images: string[];
	productName: string;
}

export default function ProductImageGallery({ images, productName }: Props) {
	const [activeImg, setActiveImg] = useState(0);

	return (
		<div className="flex flex-col gap-3 self-start lg:flex-row lg:gap-6 lg:sticky lg:top-24">
			{/* Main image — top on mobile, right on desktop */}
			<div className="order-1 lg:order-2 w-full rounded-2xl bg-[#F5F5F5]">
				<div className="relative aspect-square w-full lg:aspect-auto lg:size-[450px]">
					<Image
						src={images[activeImg]}
						alt={productName}
						fill
						className="object-contain p-6 lg:p-8"
						priority
						sizes="(max-width: 1024px) 90vw, 45vw"
					/>
				</div>
			</div>

			{/* Thumbnails — horizontal scroll below on mobile, vertical on desktop */}
			<div className="order-2 lg:order-1 flex flex-row gap-2 overflow-x-auto pb-0.5 lg:flex-col lg:overflow-x-visible lg:pb-0">
				{images.map((img, i) => (
					<button
						key={i}
						onClick={() => setActiveImg(i)}
						className={`relative h-[68px] w-[68px] lg:h-[114px] lg:w-[114px] shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
							activeImg === i ? "border-brand-primary" : "border-gray-200 hover:border-gray-300"
						}`}
					>
						<Image src={img} alt="" fill className="object-cover" sizes="80px" />
					</button>
				))}
			</div>
		</div>
	);
}
