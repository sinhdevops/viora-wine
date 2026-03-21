import Image from "next/image";
import { Link } from "@/i18n/routing";
import { type EventItem } from "@/app/[locale]/_page-content";

interface ExploreSectionProps {
	events: EventItem[];
}

export default function ExploreSection({ events }: ExploreSectionProps) {
	if (events.length === 0) return null;

	const [featured, ...rest] = events;

	return (
		<section className="bg-white py-12 md:py-16">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 text-center">
					<h2 className="mb-2 text-xl font-black uppercase tracking-[0.15em] md:text-[28px]">
						KHÁM PHÁ
					</h2>
					<p className="text-sm text-gray-500 md:text-base">
						Khám phá thế giới rượu vang qua những bài viết và sự kiện đặc sắc.
					</p>
				</div>

				{/* Bento grid — desktop */}
				<div
					className="hidden gap-3 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4"
					style={{ gridTemplateRows: "repeat(2, 240px)" }}
				>
					{/* Left: tall card spanning 2 rows */}
					<Link
						href={`/events/${featured.id}`}
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
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
						<p className="absolute right-4 bottom-5 left-4 text-[15px] font-semibold leading-snug text-white">
							{featured.name}
						</p>
					</Link>

					{/* Right: 2x2 grid */}
					{rest.map((event) => (
						<Link
							key={event.id}
							href={`/events/${event.id}`}
							className="group relative overflow-hidden rounded-2xl"
						>
							{event.thumbnail_url && (
								<Image
									src={event.thumbnail_url}
									alt={event.name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							)}
							<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
							<p className="absolute right-3 bottom-4 left-3 text-[13px] font-semibold leading-snug text-white">
								{event.name}
							</p>
						</Link>
					))}
				</div>

				{/* Mobile: vertical stack */}
				<div className="flex flex-col gap-3 md:hidden">
					{events.map((event, idx) => (
						<Link
							key={event.id}
							href={`/events/${event.id}`}
							className="group relative overflow-hidden rounded-2xl"
							style={{ height: idx === 0 ? 260 : 180 }}
						>
							{event.thumbnail_url && (
								<Image
									src={event.thumbnail_url}
									alt={event.name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							)}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
							<p className="absolute right-4 bottom-4 left-4 text-[14px] font-semibold leading-snug text-white">
								{event.name}
							</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
