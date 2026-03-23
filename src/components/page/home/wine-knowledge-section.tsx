"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { type EventItem } from "@/app/[locale]/_page-content";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/free-mode";

interface WineKnowledgeSectionProps {
	events: EventItem[];
}

export default function WineKnowledgeSection({ events }: WineKnowledgeSectionProps) {
	const t = useTranslations("home");

	if (events.length === 0) return null;

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<h2 className="mb-1.5 text-xl font-black uppercase tracking-[0.05em] md:text-[28px]">
					{t("knowledge_title")}
				</h2>
				<p className="mb-8 text-sm text-gray-500 md:text-[15px]">
					{t("knowledge_subtitle")}
				</p>

				{/* Desktop: 3 columns */}
				<div className="hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-3 md:gap-8">
					{events.map((event) => (
						<Link key={event.id} href={`/events/${event.id}`} className="group block">
							<div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-xl">
								{event.thumbnail_url && (
									<Image
										src={event.thumbnail_url}
										alt={event.name}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								)}
							</div>
							<h3 className="mb-1.5 text-[15px] font-bold text-gray-900 md:text-[16px]">
								{event.name}
							</h3>
							{event.description && (
								<p className="text-[13px] leading-relaxed text-gray-500 md:text-sm">
									{event.description}
								</p>
							)}
							<span className="mt-3 inline-block text-[13px] font-semibold text-brand-primary group-hover:underline">
								{t("knowledge_read_more")}
							</span>
						</Link>
					))}
				</div>

				{/* Mobile: horizontal swiper */}
				<div className="-mx-4 overflow-hidden px-4 sm:hidden">
					<Swiper
						modules={[FreeMode]}
						freeMode
						slidesPerView={1.5}
						spaceBetween={12}
						style={{ alignItems: "stretch" }}
					>
						{events.map((event) => (
							<SwiperSlide key={event.id} style={{ height: "auto" }}>
								<Link
									href={`/events/${event.id}`}
									className="group flex h-full flex-col overflow-hidden rounded-xl shadow-sm"
								>
									<div className="relative aspect-video w-full overflow-hidden">
										{event.thumbnail_url && (
											<Image
												src={event.thumbnail_url}
												alt={event.name}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										)}
									</div>
									<div className="p-3">
										<p className="mb-1 line-clamp-2 min-h-[2.4em] text-[13px] font-semibold leading-snug text-gray-900">
											{event.name}
										</p>
										{event.description && (
											<p className="mb-2 line-clamp-2 text-[12px] leading-relaxed text-gray-500">
												{event.description}
											</p>
										)}
										<span className="text-[12px] font-semibold text-brand-primary group-hover:underline">
											{t("knowledge_read_more")}
										</span>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
