"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MapPin, ChevronDown, Clock, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { WINE_IMAGES } from "../../../public/statics/images";

export default function Footer() {
	const t = useTranslations("footer");
	const [openSection, setOpenSection] = useState<string | null>(null);

	const toggle = (id: string) => setOpenSection((prev) => (prev === id ? null : id));

	const categories = [
		{ name: "Vang đỏ", path: "/products?cat=red" },
		{ name: "Vang trắng", path: "/products?cat=white" },
		{ name: "Vang hồng", path: "/products?cat=rose" },
		{ name: "Whisky", path: "/products?cat=whisky" },
		{ name: "Rượu mạnh", path: "/products?cat=spirits" },
		{ name: "Champagne", path: "/products?cat=champagne" },
		{ name: "Quà tặng", path: "/products?cat=gift" },
		{ name: "Combo ưu đãi", path: "/products?cat=combo" },
	];

	const supportItems = [
		{ name: t("shopping_guide_link"), path: "/shopping-guide" as const },
		{ name: t("shipping_policy_link"), path: "/shipping-policy" as const },
		{ name: t("inspection_policy_link"), path: "/inspection-policy" as const },
		{ name: t("return_policy_link"), path: "/return-policy" as const },
		{ name: t("payment_policy_link"), path: "/payment-policy" as const },
	];

	const socials = [
		{ icon: FaFacebookF, href: "https://www.facebook.com/viorawine", label: "Facebook", bg: "bg-[#1877F2]" },
		{ icon: SiZalo, href: "https://zalo.me/0373216268", label: "Zalo", bg: "bg-[#0068FF]" },
		{ icon: FaYoutube, href: "https://www.youtube.com/@viorawine", label: "YouTube", bg: "bg-[#FF0000]" },
	];

	const accordionSections = [
		{
			id: "categories",
			title: "Danh Mục Sản Phẩm",
			content: (
				<ul className="space-y-3 pb-4">
					{categories.map((item) => (
						<li key={item.path}>
							<Link href={item.path as any} className="text-sm text-white/60 transition-colors hover:text-white">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			),
		},
		{
			id: "support",
			title: "Hỗ Trợ Khách Hàng",
			content: (
				<ul className="space-y-3 pb-4">
					{supportItems.map((item) => (
						<li key={item.path}>
							<Link href={item.path} className="text-sm text-white/60 transition-colors hover:text-white">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			),
		},
		{
			id: "contact",
			title: "Thông Tin Liên Hệ",
			content: (
				<ul className="space-y-3 pb-4">
					<li className="flex items-start gap-2.5">
						<MapPin size={14} className="mt-0.5 shrink-0 text-red-500" />
						<span className="text-sm text-white/60">Ngõ 44/65 đường Nguyễn Cơ Thạch, Phường Từ Liêm, TP Hà Nội</span>
					</li>
					<li className="flex items-center gap-2.5">
						<Phone size={14} className="shrink-0 text-red-500" />
						<a href="tel:0338909973" className="text-sm text-white/60 hover:text-white">033 890 9973</a>
					</li>
					<li className="flex items-center gap-2.5">
						<Mail size={14} className="shrink-0 text-red-500" />
						<a href="mailto:viorawine@gmail.com" className="text-sm text-white/60 hover:text-white">viorawine@gmail.com</a>
					</li>
					<li className="flex items-start gap-2.5">
						<Clock size={14} className="mt-0.5 shrink-0 text-red-500" />
						<div className="text-sm text-white/60">
							<p>T2–T6: 08:00 – 22:00</p>
							<p>T7–CN: 09:00 – 23:00</p>
						</div>
					</li>
				</ul>
			),
		},
	];

	return (
		<footer className="bg-[#0C0C0C] text-white">
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-[50px]">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8">

					{/* Col 1 — Brand */}
					<div className="space-y-4">
						<Link href="/">
							<Image src={WINE_IMAGES.logoDark} alt="Logo dark" />
						</Link>
						<p className="text-sm leading-relaxed text-white/60">
							Chuyên rượu vang nhập khẩu - Cam kết chính hãng, rượu ngon – Giao nhanh – Tư vấn tận tình
						</p>

						{/* Socials + 18+ */}
						<div className="flex items-center gap-3">
							{socials.map(({ icon: Icon, href, label, bg }) => (
								<a
									key={label}
									href={href}
									aria-label={label}
									target="_blank"
									rel="noopener noreferrer"
									className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg} text-white transition-opacity hover:opacity-80`}
								>
									<Icon size={16} />
								</a>
							))}
							<div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500 text-[11px] font-extrabold text-red-500">
								18+
							</div>
						</div>

						{/* Legal */}
						<div className="space-y-1 text-xs text-white/50">
							<p className="font-semibold text-white/70">{t("legal_company_name")}</p>
							<p>{t("legal_business_license")}</p>
							<p>{t("legal_alcohol_license")}</p>
						</div>
					</div>

					{/* Mobile: accordion columns */}
					<div className="space-y-0 lg:hidden">
						{accordionSections.map((section) => (
							<div key={section.id} className="border-t border-white/10">
								<button
									onClick={() => toggle(section.id)}
									className="flex w-full items-center justify-between py-4 text-left"
								>
									<span className="text-sm font-bold tracking-wider text-white/80 uppercase">
										{section.title}
									</span>
									<ChevronDown
										size={16}
										className={`shrink-0 text-white/40 transition-transform duration-200 ${openSection === section.id ? "rotate-180" : ""}`}
									/>
								</button>
								{openSection === section.id && section.content}
							</div>
						))}
					</div>

					{/* Desktop: 3 normal columns */}
					<div className="hidden lg:block">
						<h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Danh Mục Sản Phẩm</h4>
						<ul className="space-y-3">
							{categories.map((item) => (
								<li key={item.path}>
									<Link href={item.path as any} className="text-sm text-white/60 transition-colors hover:text-white">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="hidden lg:block">
						<h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Hỗ Trợ Khách Hàng</h4>
						<ul className="space-y-3">
							{supportItems.map((item) => (
								<li key={item.path}>
									<Link href={item.path} className="text-sm text-white/60 transition-colors hover:text-white">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="hidden lg:block">
						<h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Thông Tin Liên Hệ</h4>
						<ul className="space-y-4">
							<li className="flex items-start gap-2.5">
								<MapPin size={15} className="mt-0.5 shrink-0 text-red-500" />
								<span className="text-sm text-white/70">Địa chỉ: Ngõ 44/65 đường Nguyễn Cơ Thạch, Phường Từ Liêm, TP Hà Nội</span>
							</li>
							<li className="flex items-center gap-2.5">
								<Phone size={15} className="shrink-0 text-red-500" />
								<a href="tel:0338909973" className="text-sm text-white/70 hover:text-white">033 890 9973</a>
							</li>
							<li className="flex items-center gap-2.5">
								<Mail size={15} className="shrink-0 text-red-500" />
								<a href="mailto:viorawine@gmail.com" className="text-sm text-white/70 hover:text-white">viorawine@gmail.com</a>
							</li>
							<li className="flex items-start gap-2.5">
								<Clock size={15} className="mt-0.5 shrink-0 text-red-500" />
								<div className="text-sm text-white/70">
									<p>T2–T6: 08:00 – 22:00</p>
									<p>T7–CN: 09:00 – 23:00</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
					<p className="text-center text-xs text-white/50 sm:text-sm">
						© {new Date().getFullYear()} <span className="font-semibold text-white/70">VIORA WINE</span>. ĐÃ ĐĂNG KÝ BẢN QUYỀN.
					</p>
					<div className="flex gap-5">
						<Link href="/privacy-policy" className="text-xs tracking-widest text-white/50 uppercase transition-colors hover:text-white sm:text-sm">
							{t("privacy_link")}
						</Link>
						<Link href="/terms" className="text-xs tracking-widest text-white/50 uppercase transition-colors hover:text-white sm:text-sm">
							{t("terms_link")}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
