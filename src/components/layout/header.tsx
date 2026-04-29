"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Phone, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import SearchBar from "./search-bar";
import Image from "next/image";
import { WINE_IMAGES } from "../../../public/statics/images";
import Button from "../ui/button";

const phone = "0338909973";
const phoneDisplay = "0338-909-973";

declare function gtag(...args: unknown[]): void;
function trackContactConversion() {
	if (typeof gtag !== "undefined") {
		gtag("event", "conversion", { send_to: "AW-18100193809/tU1uCO_GvJ4cEJGU7LZD" });
	}
}


export default function Header() {
	const t = useTranslations("common");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ name: t("home"), path: "/" as const },
		{ name: t("products"), path: "/products" as const },
		{ name: t("news"), path: "/blog" as const },
		{ name: t("promotion"), path: "/promotion" as const },
		{ name: t("gifts"), path: "/gifts" as const },
	];

	return (
		<header className="sticky top-0 z-50">
			{/* Top bar */}
			<div className="bg-black text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Mobile */}
					<div className="flex h-10 items-center justify-between gap-3 md:hidden">
						<a
							href={`tel:${phone}`}
							onClick={trackContactConversion}
							className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold transition-colors active:text-gray-300"
						>
							<Phone size={14} />
							{phoneDisplay}
						</a>
						<div className="overflow-hidden">
							<div className="animate-marquee flex w-max gap-6 text-[11px] whitespace-nowrap text-gray-400">
								<span className="flex items-center gap-1">
									<ShieldCheck size={11} className="shrink-0" />
									Chính hãng 100%
								</span>
								<span className="flex items-center gap-1">
									<Truck size={11} className="shrink-0" />
									Giao hàng nhanh 2-4h
								</span>
								<span className="flex items-center gap-1">
									<RotateCcw size={11} className="shrink-0" />
									Đổi trả 7 ngày
								</span>
								{/* duplicate for seamless loop */}
								<span className="flex items-center gap-1">
									<ShieldCheck size={11} className="shrink-0" />
									Chính hãng 100%
								</span>
								<span className="flex items-center gap-1">
									<Truck size={11} className="shrink-0" />
									Giao hàng nhanh 2-4h
								</span>
								<span className="flex items-center gap-1">
									<RotateCcw size={11} className="shrink-0" />
									Đổi trả 7 ngày
								</span>
							</div>
						</div>
					</div>

					{/* Desktop */}
					<div className="hidden h-[52px] items-center justify-between md:flex">
						<div className="flex items-center gap-6">
							<span className="flex items-center gap-1.5">
								<ShieldCheck size={24} className="text-gray-300" />
								100% Rượu ngoại nhập khẩu chính hãng
							</span>
							<span className="flex items-center gap-1.5">
								<Truck size={24} className="text-gray-300" />
								Giao hàng nhanh 2-4h
							</span>
							<span className="flex items-center gap-1.5">
								<RotateCcw size={24} className="text-gray-300" />
								Đổi trả dễ dàng
							</span>
						</div>
						<a
							href={`tel:${phone}`}
							onClick={trackContactConversion}
							className="flex items-center gap-1.5 transition-colors hover:text-gray-300"
						>
							<Phone size={24} />
							{phoneDisplay}
						</a>
					</div>
				</div>
			</div>

			{/* Main header */}
			<div className="border-b border-gray-100 bg-white shadow-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-[76px] items-center justify-between gap-8">
						{/* Logo */}
						<Link href="/" className="shrink-0">
							<Image src={WINE_IMAGES.logo} alt="Viora Wine" />
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden items-center gap-7 md:flex">
							{navItems.map((item) => {
								const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
								return (
									<Link
										key={item.path}
										href={item.path}
										className={`text-sm font-semibold tracking-wide transition-colors hover:text-red-600 ${
											isActive ? "border-b-2 border-red-600 pb-0.5 text-red-600" : "text-gray-800"
										}`}
									>
										{item.name}
									</Link>
								);
							})}
						</nav>

						{/* Right: Search + Language */}
						<div className="hidden items-center gap-3 md:flex">
							<SearchBar className="w-64" />


						</div>

						{/* Mobile menu toggle */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-gray-700 hover:text-black md:hidden"
						>
							<Menu size={28} />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-40 md:hidden"
							onClick={() => setIsMobileMenuOpen(false)}
						/>
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="fixed top-[117px] right-0 z-50 h-full w-72 bg-white pt-10 shadow-2xl md:hidden"
						>
							{/* Mobile search */}
							<div className="mx-3 mb-2">
								<SearchBar onNavigate={() => setIsMobileMenuOpen(false)} />
							</div>

							<div className="space-y-1 px-3 py-2">
								{navItems.map((item) => {
									const isActive =
										item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
									return (
										<Link
											key={item.path}
											href={item.path}
											onClick={() => setIsMobileMenuOpen(false)}
											className={`flex items-center justify-between rounded-md px-3 py-4 font-medium transition-colors ${
												isActive
													? "text-brand-primary bg-red-50 font-semibold"
													: "text-gray-800 hover:bg-gray-50 hover:text-red-600"
											}`}
										>
											{item.name}
											{isActive && <span className="bg-brand-primary h-1.5 w-1.5 rounded-full" />}
										</Link>
									);
								})}
								<div className="px-3 py-4">
									<a
										href={`https://zalo.me/${phone}`}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => {
											setIsMobileMenuOpen(false);
											trackContactConversion();
										}}
									>
										<Button className="w-full">{t("contact_zalo")}</Button>
									</a>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
