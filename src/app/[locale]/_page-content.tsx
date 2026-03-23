import "swiper/css";
import "swiper/css/pagination";
import HeroBanner from "@/components/page/home/hero-banner";
import Features from "@/components/page/home/features";
import FeaturedCategories from "@/components/page/home/featured-categories";
import BestSellerSlider from "@/components/page/home/best-seller-slider";
import WinePromoBanner from "@/components/page/home/wine-promo-banner";
import GoodWineSection from "@/components/page/home/good-wine-section";
import ExploreSection from "@/components/page/home/explore-section";
import WineKnowledgeSection from "@/components/page/home/wine-knowledge-section";
import { createClient } from "@/utils/supabase/server";

export type EventItem = {
	id: string;
	name: string;
	description: string | null;
	thumbnail_url: string | null;
	date: string;
	category: string;
};

export default async function HomePageContent() {
	const supabase = await createClient();

	const [{ data: suKienEvents }, { data: kienThucEvents }] = await Promise.all([
		supabase
			.from("events")
			.select("id, name, description, thumbnail_url, date, category")
			.eq("category", "su-kien")
			.order("date", { ascending: false })
			.limit(5),
		supabase
			.from("events")
			.select("id, name, description, thumbnail_url, date, category")
			.eq("category", "kien-thuc")
			.order("date", { ascending: false })
			.limit(3),
	]);

	return (
		<div className="flex flex-col gap-0 pb-24">
			<HeroBanner />
			<Features />
			<div className="flex flex-col gap-25">
			<FeaturedCategories />
			<BestSellerSlider />
			<WinePromoBanner />
			<GoodWineSection />
			<ExploreSection events={suKienEvents ?? []} />
			<WineKnowledgeSection events={kienThucEvents ?? []} />
			</div>
		</div>
	);
}
