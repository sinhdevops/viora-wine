"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { EventItem } from "@/app/[locale]/_page-content";

const TABS = [
	{ id: "all",      label: "TẤT CẢ"    },
	{ id: "kien-thuc", label: "KIẾN THỨC" },
	{ id: "su-kien",  label: "SỰ KIỆN"   },
];

interface Props {
	events: EventItem[];
}

export default function NewsPageContent({ events }: Props) {
	const [activeTab, setActiveTab] = useState("all");

	const displayed =
		activeTab === "all" ? events : events.filter((e) => e.category === activeTab);

	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="border-b border-gray-100">
				<div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
					<nav className="flex items-center gap-1.5 text-[12px] text-gray-400">
						<Link href="/" className="hover:text-gray-700">Trang chủ</Link>
						<span className="mx-1">/</span>
						<span className="text-gray-700">Kiến thức &amp; Sự kiện</span>
					</nav>
				</div>
			</div>

			<div className="mx-auto max-w-360 px-4 py-10 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-xl font-black uppercase tracking-tight md:text-[28px]">
						KIẾN THỨC &amp; SỰ KIỆN
					</h1>
					<p className="mt-1.5 text-sm text-gray-500">
						Khám phá thế giới rượu vang qua những bài viết và sự kiện đặc sắc.
					</p>
				</div>

				{/* Tabs */}
				<div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-gray-200">
					{TABS.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`shrink-0 pb-3 text-[13px] font-semibold tracking-wider transition-colors ${
								activeTab === tab.id
									? "border-b-2 border-brand-primary text-brand-primary"
									: "text-gray-500 hover:text-gray-800"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Grid */}
				{displayed.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
						{displayed.map((event) => (
							<Link
								key={event.id}
								href={`/news/${event.id}`}
								className="group block"
							>
								{/* Image */}
								<div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-xl bg-gray-100">
									{event.thumbnail_url && (
										<Image
											src={event.thumbnail_url}
											alt={event.name}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									)}
									{/* Category badge */}
									<span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-700 shadow-sm backdrop-blur-sm">
										{event.category === "kien-thuc" ? "Kiến thức" : "Sự kiện"}
									</span>
								</div>

								{/* Meta */}
								<p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-primary">
									{event.date}
								</p>

								{/* Title */}
								<h3 className="mb-2 text-[15px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-primary md:text-[16px]">
									{event.name}
								</h3>

								{/* Description */}
								{event.description && (
									<p className="line-clamp-2 text-[13px] leading-relaxed text-gray-500">
										{event.description}
									</p>
								)}

								{/* Read more */}
								<div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-brand-primary">
									Xem chi tiết <ArrowRight size={13} />
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<p className="text-sm text-gray-400">Chưa có nội dung nào trong chuyên mục này.</p>
						<button
							onClick={() => setActiveTab("all")}
							className="mt-4 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a30000]"
						>
							Xem tất cả
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
