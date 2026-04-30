"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { type EventItem } from "@/app/[locale]/_page-content";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/free-mode";

interface ExploreSectionProps {
	events: EventItem[];
}

export default function ExploreSection({ events }: ExploreSectionProps) {
	const t = useTranslations("home");

	if (events.length === 0) return null;

	const [featured, ...rest] = events;

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 text-center">
					<h2 className="mb-2 text-xl font-semibold tracking-[0.15em] uppercase md:text-[28px]">
						{t("explore_title")}
					</h2>
					<p className="text-sm text-gray-500 md:text-base">{t("explore_subtitle")}</p>
				</div>

				{/* Bento grid — desktop */}
				<div
					className="hidden gap-3 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4"
					style={{ gridTemplateRows: "repeat(2, 240px)" }}
				>
					{/* Left: tall card spanning 2 rows */}
					<Link
						href={{ pathname: "/blog/[slug]", params: { slug: featured.slug } }}
						className="group relative row-span-2 overflow-hidden rounded-xl"
					>
						{featured.thumbnail_url && (
							<Image
								src={featured.thumbnail_url}
								alt={featured.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						)}
						<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
						<p className="absolute right-4 bottom-5 left-4 text-[15px] leading-snug font-semibold text-white">
							{featured.name}
						</p>
					</Link>

					{/* Right: 2x2 grid */}
					{rest.map((event) => (
						<Link
							key={event.id}
							href={{ pathname: "/blog/[slug]", params: { slug: event.slug } }}
							className="group relative overflow-hidden rounded-xl"
						>
							{event.thumbnail_url && (
								<Image
									src={event.thumbnail_url}
									alt={event.name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							)}
							<div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
							<p className="absolute right-3 bottom-4 left-3 text-[13px] leading-snug font-semibold text-white">
								{event.name}
							</p>
						</Link>
					))}
				</div>

				{/* Mobile */}
				<div className="md:hidden">
					{/* Featured item — full width image overlay */}
					<Link
						href={{ pathname: "/blog/[slug]", params: { slug: featured.slug } }}
						className="group relative mb-4 block overflow-hidden rounded-xl"
						style={{ height: 260 }}
					>
						{featured.thumbnail_url && (
							<Image
								src={featured.thumbnail_url}
								alt={featured.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						)}
						<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
						<p className="absolute right-4 bottom-4 left-4 text-[14px] leading-snug font-semibold text-white">
							{featured.name}
						</p>
					</Link>

					{/* Rest — horizontal swiper cards */}
					{rest.length > 0 && (
						<div className="-mx-4 overflow-hidden px-4">
							<Swiper
								modules={[FreeMode]}
								freeMode
								slidesPerView={1.5}
								spaceBetween={12}
								style={{ alignItems: "stretch" }}
							>
								{rest.map((event) => (
									<SwiperSlide key={event.id} style={{ height: "auto" }}>
										<Link
											href={{ pathname: "/blog/[slug]", params: { slug: event.slug } }}
											className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100"
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
												<p className="mb-1 line-clamp-2 min-h-[2.4em] text-[13px] leading-snug font-semibold text-gray-900">
													{event.name}
												</p>
												{event.description && (
													<p className="mb-2 line-clamp-2 text-[12px] leading-relaxed text-gray-500">
														{event.description}
													</p>
												)}
												<span className="text-brand-primary text-[12px] font-semibold group-hover:underline">
													{t("explore_read_more")}
												</span>
											</div>
										</Link>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
