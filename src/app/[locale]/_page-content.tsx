import HeroBannerNew from "@/components/page/home/hero-banner-new";
import CategoryQuickNav from "@/components/page/home/category-quick-nav";
import BelowFoldSections from "@/components/page/home/below-fold-sections";
import ShirazTopicCluster from "@/components/page/home/shiraz-topic-cluster";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";

export type EventItem = {
	id: string;
	slug: string;
	name: string;
	description: string | null;
	thumbnail_url: string | null;
	date: string;
	category: string;
};

export default async function HomePageContent({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home" });
	const supabase = await createClient();

	const [{ data: suKienEvents }, { data: kienThucEvents }] = await Promise.all([
		supabase
			.from("events")
			.select("id, slug, name, description, thumbnail_url, date, category")
			.eq("category", "su-kien")
			.order("date", { ascending: false })
			.limit(5),
		supabase
			.from("events")
			.select("id, slug, name, description, thumbnail_url, date, category")
			.eq("category", "kien-thuc")
			.order("date", { ascending: false })
			.limit(3),
	]);

	return (
		<div className="flex flex-col gap-0 pb-24">
			<h1 className="sr-only">{t("meta_title")}</h1>
			{/* Banner + quicknav overlap */}
			<div className="relative">
				<HeroBannerNew />
				<div className="absolute right-0 -bottom-30 left-0 z-10 mx-auto max-w-360 px-4 sm:px-6 lg:bottom-[-120px] lg:px-8">
					<CategoryQuickNav />
				</div>
			</div>
			{/* Padding to compensate for the overlapping quicknav */}
			<div className="pt-50 lg:pt-40" />

			<ShirazTopicCluster />

			<BelowFoldSections
				suKienEvents={(suKienEvents ?? []) as EventItem[]}
				kienThucEvents={(kienThucEvents ?? []) as EventItem[]}
			/>
		</div>
	);
}
