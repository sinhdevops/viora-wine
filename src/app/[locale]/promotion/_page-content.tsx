"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight, Tag } from "lucide-react";
import { HiOutlineTicket, HiOutlineClock, HiOutlineGift, HiCheckBadge } from "react-icons/hi2";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";
import { useTranslations } from "next-intl";

const VOUCHERS = [
	{
		code: "WEEKEND20",
		labelKey: "Giảm 20%",
		descKey: "Áp dụng cho tất cả dòng vang đỏ khi mua từ 2 chai.",
		expiry: "31/03/2026",
	},
	{
		code: "WELCOME15",
		labelKey: "Giảm 15%",
		descKey: "Dành cho khách hàng đặt hàng lần đầu tiên.",
		expiry: "Không giới hạn",
	},
	{
		code: "GIFT500",
		labelKey: "Giảm 500.000đ",
		descKey: "Áp dụng cho đơn hàng từ 3.000.000đ trở lên.",
		expiry: "30/04/2026",
	},
];

const CATEGORY_TAB_IDS = ["all", "wine", "whisky", "spirits", "combo", "gift"] as const;

interface Props {
	products: DbProduct[];
}

export default function PromotionPageContent({ products }: Props) {
	const t = useTranslations("promotion");
	const [activeTab, setActiveTab] = useState("all");
	const [copied, setCopied] = useState<string | null>(null);

	const BENEFITS = [
		{ icon: HiCheckBadge, title: t("benefit1_title"), desc: t("benefit1_desc") },
		{ icon: HiOutlineGift, title: t("benefit2_title"), desc: t("benefit2_desc") },
	];

	const displayed = activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

	const handleCopy = (code: string) => {
		navigator.clipboard.writeText(code);
		setCopied(code);
		setTimeout(() => setCopied(null), 2000);
	};

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

			<div className="mx-auto max-w-360 px-4 py-10 sm:px-6 lg:px-8">
				{/* Voucher codes */}
				<div className="mb-10">
					<div className="mb-4 flex items-center gap-2">
						<Tag size={18} className="text-brand-primary" />
						<h2 className="text-[15px] font-semibold tracking-wide uppercase">{t("vouchers_title")}</h2>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{VOUCHERS.map((v) => (
							<div
								key={v.code}
								className="flex flex-col gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5"
							>
								<div className="flex items-start justify-between gap-2">
									<div>
										<span className="text-brand-primary mb-1 block text-[10px] font-bold tracking-widest uppercase">
											{v.labelKey}
										</span>
										<p className="text-[13px] leading-relaxed text-gray-500">{v.descKey}</p>
									</div>
									<HiOutlineTicket size={20} className="text-brand-primary shrink-0" />
								</div>
								<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
									<span className="text-brand-primary text-[15px] font-semibold tracking-widest">
										{v.code}
									</span>
									<button
										onClick={() => handleCopy(v.code)}
										className="bg-brand-primary rounded-md px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#a30000]"
									>
										{copied === v.code ? t("copied") : t("copy")}
									</button>
								</div>
								<div className="flex items-center gap-1.5 text-[11px] text-gray-400">
									<HiOutlineClock size={13} />
									{t("expiry_label")} {v.expiry}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Products on sale */}
				<div className="mb-6">
					<h1 className="text-xl font-semibold tracking-tight uppercase md:text-[28px]">
						{t("products_title")}
					</h1>
					<p className="mt-1.5 text-sm text-gray-500">{t("products_subtitle", { count: products.length })}</p>
				</div>

				{/* Tabs */}
				<div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-gray-200">
					{CATEGORY_TAB_IDS.map((id) => (
						<button
							key={id}
							onClick={() => setActiveTab(id)}
							className={`shrink-0 pb-3 text-[13px] font-semibold tracking-wider transition-colors ${
								activeTab === id
									? "border-brand-primary text-brand-primary border-b-2"
									: "text-gray-500 hover:text-gray-800"
							}`}
						>
							{t(`tab_${id}`)}
						</button>
					))}
				</div>

				{/* Grid */}
				{displayed.length > 0 ? (
					<div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-5">
						{displayed.map((product) => (
							<CardProduct key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<p className="text-sm text-gray-400">{t("empty")}</p>
						<button
							onClick={() => setActiveTab("all")}
							className="bg-brand-primary mt-4 rounded-lg px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a30000]"
						>
							{t("view_all")}
						</button>
					</div>
				)}

				{/* Member benefits */}
				<div className="mt-14 border-t border-gray-100 pt-10">
					<div className="mb-6">
						<h2 className="text-xl font-semibold tracking-tight uppercase md:text-[22px]">
							{t("member_title")}
						</h2>
						<p className="mt-1.5 text-sm text-gray-500">{t("member_subtitle")}</p>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{BENEFITS.map(({ icon: Icon, title, desc }) => (
							<div key={title} className="rounded-2xl bg-gray-50 p-6">
								<Icon size={24} className="text-brand-primary mb-3" />
								<h3 className="mb-1.5 text-[14px] font-bold text-gray-900">{title}</h3>
								<p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
							</div>
						))}

						{/* CTA card */}
						<div className="bg-brand-primary flex flex-col items-start justify-between rounded-2xl p-6 text-white sm:col-span-2 lg:col-span-2">
							<div>
								<p className="mb-2 text-[11px] font-bold tracking-widest text-white/70 uppercase">
									{t("referral_label")}
								</p>
								<h3 className="mb-2 text-[16px] leading-snug font-semibold">{t("referral_title")}</h3>
								<p className="text-[13px] leading-relaxed text-white/70">{t("referral_desc")}</p>
							</div>
							<Link
								href="/contact"
								className="text-brand-primary mt-5 inline-block rounded-lg bg-white px-5 py-2 text-[13px] font-bold transition-opacity hover:opacity-90"
							>
								{t("referral_cta")}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
