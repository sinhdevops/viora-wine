import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "inspection_policy" });
	const common = await getTranslations({ locale, namespace: "common" });

	return {
		title: t("meta_title"),
		description: t("updated"),
		robots: { index: true },
		openGraph: {
			title: `${t("meta_title")} | ${common("brand")}`,
			description: t("updated"),
		},
	};
}

export default async function InspectionPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "inspection_policy" });

	const SECTIONS = [
		{ title: t("section1_title"), content: t("section1_content") },
		{ title: t("section2_title"), content: t("section2_content") },
		{ title: t("section3_title"), content: t("section3_content") },
		{ title: t("section4_title"), content: t("section4_content") },
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="border-b border-gray-100">
				<div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
					<nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
						<Link href="/" className="hover:text-gray-700">
							{t("breadcrumb_home")}
						</Link>
						<ChevronRight size={12} />
						<span className="text-gray-700">{t("breadcrumb_current")}</span>
					</nav>
				</div>
			</div>

			<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-10 border-b border-gray-100 pb-8">
					<p className="text-brand-primary mb-2 text-[11px] font-bold tracking-widest uppercase">
						{t("brand_label")}
					</p>
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900 uppercase md:text-[32px]">
						{t("title")}
					</h1>
					<p className="mt-3 text-sm text-gray-500">{t("updated")}</p>
				</div>

				{/* Sections */}
				<div className="space-y-8">
					{SECTIONS.map((section) => (
						<div key={section.title}>
							<h2 className="mb-3 text-[15px] font-semibold text-gray-900">{section.title}</h2>
							<p className="text-[14px] leading-relaxed whitespace-pre-line text-gray-600">
								{section.content}
							</p>
						</div>
					))}
				</div>

				{/* Contact */}
				<div className="mt-12 rounded-2xl bg-gray-50 p-6">
					<h3 className="mb-2 text-[14px] font-bold text-gray-900">{t("contact_title")}</h3>
					<p className="text-[13px] leading-relaxed text-gray-500">{t("contact_desc")}</p>
					<ul className="mt-3 space-y-1 text-[13px] text-gray-600">
						<li>
							{t("contact_email_label")} <span className="font-medium">{t("contact_email")}</span>
						</li>
						<li>
							{t("contact_phone_label")} <span className="font-medium">{t("contact_phone")}</span>
						</li>
						<li>
							{t("contact_address_label")} <span className="font-medium">{t("contact_address")}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
