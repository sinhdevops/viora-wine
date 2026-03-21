"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight, Tag } from "lucide-react";
import { HiOutlineTicket, HiOutlineClock, HiOutlineGift, HiCheckBadge } from "react-icons/hi2";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";

const VOUCHERS = [
	{
		code: "WEEKEND20",
		label: "Giảm 20%",
		desc: "Áp dụng cho tất cả dòng vang đỏ khi mua từ 2 chai.",
		expiry: "31/03/2026",
	},
	{
		code: "WELCOME15",
		label: "Giảm 15%",
		desc: "Dành cho khách hàng đặt hàng lần đầu tiên.",
		expiry: "Không giới hạn",
	},
	{
		code: "GIFT500",
		label: "Giảm 500.000đ",
		desc: "Áp dụng cho đơn hàng từ 3.000.000đ trở lên.",
		expiry: "30/04/2026",
	},
];

const BENEFITS = [
	{
		icon: HiCheckBadge,
		title: "Tích lũy điểm thưởng",
		desc: "Hoàn tiền 5% cho mỗi đơn hàng bằng điểm thưởng.",
	},
	{
		icon: HiOutlineGift,
		title: "Quà tặng sinh nhật",
		desc: "Nhận ngay một chai vang tuyển chọn vào tuần sinh nhật.",
	},
];

const CATEGORY_TABS = [
	{ id: "all",     label: "TẤT CẢ"    },
	{ id: "wine",    label: "RƯỢU VANG" },
	{ id: "whisky",  label: "WHISKY"    },
	{ id: "spirits", label: "RƯỢU MẠNH" },
	{ id: "combo",   label: "COMBO"     },
	{ id: "gift",    label: "QUÀ TẶNG"  },
];

interface Props {
	products: DbProduct[];
}

export default function PromotionPageContent({ products }: Props) {
	const [activeTab, setActiveTab] = useState("all");
	const [copied, setCopied] = useState<string | null>(null);

	const displayed =
		activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

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
					<nav className="flex items-center gap-1.5 text-[12px] text-gray-400">
						<Link href="/" className="hover:text-gray-700">Trang chủ</Link>
						<ChevronRight size={12} />
						<span className="text-gray-700">Khuyến mãi</span>
					</nav>
				</div>
			</div>

			<div className="mx-auto max-w-360 px-4 py-10 sm:px-6 lg:px-8">

				{/* ── Voucher codes ── */}
				<div className="mb-10">
					<div className="mb-4 flex items-center gap-2">
						<Tag size={18} className="text-brand-primary" />
						<h2 className="text-[15px] font-black uppercase tracking-wide">Mã ưu đãi</h2>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{VOUCHERS.map((v) => (
							<div
								key={v.code}
								className="flex flex-col gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5"
							>
								<div className="flex items-start justify-between gap-2">
									<div>
										<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-brand-primary">
											{v.label}
										</span>
										<p className="text-[13px] leading-relaxed text-gray-500">{v.desc}</p>
									</div>
									<HiOutlineTicket size={20} className="shrink-0 text-brand-primary" />
								</div>
								<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
									<span className="text-[15px] font-black tracking-widest text-brand-primary">
										{v.code}
									</span>
									<button
										onClick={() => handleCopy(v.code)}
										className="rounded-md bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a30000]"
									>
										{copied === v.code ? "Đã sao chép!" : "Sao chép"}
									</button>
								</div>
								<div className="flex items-center gap-1.5 text-[11px] text-gray-400">
									<HiOutlineClock size={13} />
									HSD: {v.expiry}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* ── Products on sale ── */}
				<div className="mb-6">
					<h1 className="text-xl font-black uppercase tracking-tight md:text-[28px]">
						SẢN PHẨM ĐANG GIẢM GIÁ
					</h1>
					<p className="mt-1.5 text-sm text-gray-500">
						{products.length} sản phẩm đang được ưu đãi — cập nhật liên tục.
					</p>
				</div>

				{/* Tabs */}
				<div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-gray-200">
					{CATEGORY_TABS.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`shrink-0 pb-3 text-[13px] font-semibold tracking-wider transition-colors ${
								activeTab === tab.id
									? "border-b-2 border-brand-primary text-brand-primary"
									: "text-gray-500 hover:text-gray-800"
							}`}
						>
							{tab.label}
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
						<p className="text-sm text-gray-400">Không có sản phẩm đang giảm giá trong danh mục này.</p>
						<button
							onClick={() => setActiveTab("all")}
							className="mt-4 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a30000]"
						>
							Xem tất cả
						</button>
					</div>
				)}

				{/* ── Member benefits ── */}
				<div className="mt-14 border-t border-gray-100 pt-10">
					<div className="mb-6">
						<h2 className="text-xl font-black uppercase tracking-tight md:text-[22px]">
							ƯU ĐÃI THÀNH VIÊN
						</h2>
						<p className="mt-1.5 text-sm text-gray-500">
							Đăng ký thành viên để nhận thêm nhiều quyền lợi độc quyền.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{BENEFITS.map(({ icon: Icon, title, desc }) => (
							<div key={title} className="rounded-2xl bg-gray-50 p-6">
								<Icon size={24} className="mb-3 text-brand-primary" />
								<h3 className="mb-1.5 text-[14px] font-bold text-gray-900">{title}</h3>
								<p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
							</div>
						))}

						{/* CTA card */}
						<div className="flex flex-col items-start justify-between rounded-2xl bg-brand-primary p-6 text-white sm:col-span-2 lg:col-span-2">
							<div>
								<p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
									Giới thiệu bạn bè
								</p>
								<h3 className="mb-2 text-[16px] font-black leading-snug">
									Nhận voucher 500.000đ cho mỗi lời giới thiệu thành công
								</h3>
								<p className="text-[13px] leading-relaxed text-white/70">
									Chia sẻ link của bạn — bạn bè đặt hàng lần đầu là bạn nhận ngay ưu đãi.
								</p>
							</div>
							<Link
								href="/contact"
								className="mt-5 inline-block rounded-lg bg-white px-5 py-2 text-[13px] font-bold text-brand-primary transition-opacity hover:opacity-90"
							>
								Tìm hiểu thêm
							</Link>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
