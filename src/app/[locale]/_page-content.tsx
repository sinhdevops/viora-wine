import HeroBannerNew from "@/components/page/home/hero-banner-new";
import CategoryQuickNav from "@/components/page/home/category-quick-nav";
import BelowFoldSections from "@/components/page/home/below-fold-sections";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

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
				<div className="absolute right-0 bottom-[-170px] left-0 z-10 mx-auto max-w-360 px-4 sm:px-6 lg:bottom-[-120px] lg:px-8">
					<CategoryQuickNav />
				</div>
			</div>
			{/* Padding to compensate for the overlapping quicknav */}
			<div className="pt-50 lg:pt-40" />

			{/* Shiraz topic cluster — static SSR block for Googlebot crawl */}
			<section className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-3 rounded-2xl border border-[#8B1A1A]/20 bg-linear-to-r from-[#8B1A1A]/5 to-transparent p-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-[#8B1A1A]">Chủ đề nổi bật</p>
						<h2 className="mt-1 text-base font-bold text-gray-900 sm:text-lg">
							Rượu Vang Shiraz Úc Nhập Khẩu Chính Hãng
						</h2>
						<p className="mt-1 text-sm text-gray-500">
							Tìm hiểu về Shiraz — giống nho đặc trưng nước Úc, đậm đà, phong phú hương vị
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Link
							href={"/shiraz" as any}
							className="inline-flex items-center gap-1.5 rounded-lg bg-[#8B1A1A] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
						>
							🍷 Xem tất cả Shiraz
						</Link>
						<Link
							href={"/shiraz-ha-noi" as any}
							className="inline-flex items-center rounded-lg border border-[#8B1A1A]/30 bg-white px-4 py-2 text-sm font-medium text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/5"
						>
							Shiraz Hà Nội
						</Link>
						<Link
							href={"/shiraz-da-nang" as any}
							className="inline-flex items-center rounded-lg border border-[#8B1A1A]/30 bg-white px-4 py-2 text-sm font-medium text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/5"
						>
							Shiraz Đà Nẵng
						</Link>
					</div>
				</div>
			</section>

			<BelowFoldSections
				suKienEvents={(suKienEvents ?? []) as EventItem[]}
				kienThucEvents={(kienThucEvents ?? []) as EventItem[]}
			/>
		</div>
	);
}
