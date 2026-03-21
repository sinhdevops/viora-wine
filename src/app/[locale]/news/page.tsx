import { createClient } from "@/utils/supabase/server";
import NewsPageContent from "./_page-content";
import type { EventItem } from "@/app/[locale]/_page-content";

export default async function NewsPage() {
	const supabase = await createClient();

	const { data: events } = await supabase
		.from("events")
		.select("id, name, description, thumbnail_url, date, category")
		.order("date", { ascending: false });

	return <NewsPageContent events={events as EventItem[] ?? []} />;
}
