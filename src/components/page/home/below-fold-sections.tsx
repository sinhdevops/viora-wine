"use client";

import dynamic from "next/dynamic";
import type { EventItem } from "@/app/[locale]/_page-content";

const BestSellerSlider = dynamic(() => import("@/components/page/home/best-seller-slider"), { ssr: false });
const SavingComboSection = dynamic(() => import("@/components/page/home/saving-combo-section"), { ssr: false });
const WinePromoBanner = dynamic(() => import("@/components/page/home/wine-promo-banner"), { ssr: false });
const GoodWineSection = dynamic(() => import("@/components/page/home/good-wine-section"), { ssr: false });
const ExploreSection = dynamic(() => import("@/components/page/home/explore-section"), { ssr: false });
const WineKnowledgeSection = dynamic(() => import("@/components/page/home/wine-knowledge-section"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/page/home/testimonials-section"), { ssr: false });

interface BelowFoldSectionsProps {
	suKienEvents: EventItem[];
	kienThucEvents: EventItem[];
}

export default function BelowFoldSections({ suKienEvents, kienThucEvents }: BelowFoldSectionsProps) {
	return (
		<div className="flex flex-col gap-25">
			<BestSellerSlider />
			<SavingComboSection />
			<WinePromoBanner />
			<GoodWineSection />
			<ExploreSection events={suKienEvents} />
			<WineKnowledgeSection events={kienThucEvents} />
			<TestimonialsSection />
		</div>
	);
}
