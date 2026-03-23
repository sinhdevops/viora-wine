import HeroBanner from "@/components/page/home/hero-banner";
import Features from "@/components/page/home/features";
import FeaturedCategories from "@/components/page/home/featured-categories";
import BelowFoldSections from "@/components/page/home/below-fold-sections";
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

	const [{ data: banners }, { data: suKienEvents }, { data: kienThucEvents }] = await Promise.all([
		supabase
			.from("hero_banners")
			.select("id, image_url")
			.order("created_at", { ascending: true }),
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
			<HeroBanner banners={banners ?? []} />
			<Features />
			<div className="mb-25">
				<FeaturedCategories />
			</div>
			<BelowFoldSections suKienEvents={suKienEvents ?? []} kienThucEvents={kienThucEvents ?? []} />
		</div>
	);
}
