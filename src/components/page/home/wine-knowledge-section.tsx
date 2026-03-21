import Image from "next/image";
import { Link } from "@/i18n/routing";
import { type EventItem } from "@/app/[locale]/_page-content";

interface WineKnowledgeSectionProps {
	events: EventItem[];
}

export default function WineKnowledgeSection({ events }: WineKnowledgeSectionProps) {
	if (events.length === 0) return null;

	return (
		<section className="bg-white py-12 md:py-16">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<h2 className="mb-1.5 text-xl font-black uppercase tracking-[0.05em] md:text-[28px]">
					KIẾN THỨC VỀ RƯỢU VANG
				</h2>
				<p className="mb-8 text-sm text-gray-500 md:text-[15px]">
					Khám phá thế giới rượu vang qua những bài viết và sự kiện đặc sắc.
				</p>

				{/* 3 columns */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
					{events.map((event) => (
						<Link key={event.id} href={`/events/${event.id}`} className="group block">
							{/* Image */}
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

							{/* Text */}
							<h3 className="mb-1.5 text-[15px] font-bold text-gray-900 md:text-[16px]">
								{event.name}
							</h3>
							{event.description && (
								<p className="text-[13px] leading-relaxed text-gray-500 md:text-sm">
									{event.description}
								</p>
							)}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
