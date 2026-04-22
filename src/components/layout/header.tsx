"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Globe, Menu } from "lucide-react";
import Image from "next/image";
import { WINE_IMAGES } from "../../../public/statics/images";

const phone = '0338909973';

declare function gtag(...args: unknown[]): void;
function trackContactConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', { send_to: 'AW-18100193809/tU1uCO_GvJ4cEJGU7LZD' });
  }
}
const languages = [
	{ code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
	{ code: "en", name: "English", flag: "🇺🇸" },
];

export default function Header() {
	const t = useTranslations("common");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLangOpen, setIsLangOpen] = useState(false);
	const langRef = useRef<HTMLDivElement>(null);
	const locale = useLocale();
	const pathname = usePathname();

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (langRef.current && !langRef.current.contains(e.target as Node)) {
				setIsLangOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const navItems = [
		{ name: t("home"), path: "/" as const },
		{ name: t("products"), path: "/products" as const },
		{ name: t("news"), path: "/blog" as const },
		{ name: t("promotion"), path: "/promotion" as const },
		{ name: t("gifts"), path: "/gifts" as const },
		{ name: t("contact"), path: "/contact" as const },
	];

	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="shrink-0">
						<Image src={WINE_IMAGES.logo} alt="logo" />
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-8 md:flex">
						{navItems.map((item) => {
							const isActive =
								item.path === "/"
									? pathname === "/"
									: pathname.startsWith(item.path);
							return (
								<Link
									key={item.path}
									href={item.path}
									className={`text-sm font-medium transition-colors hover:text-red-600 ${
										isActive
											? "border-b-2 border-red-600 pb-0.5 text-red-600"
											: "text-gray-700"
									}`}
								>
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* Right side: language switcher + contact */}
					<div className="hidden items-center gap-4 md:flex">
						{/* Language Switcher */}
						<div className="relative" ref={langRef}>
							<button
								onClick={() => setIsLangOpen(!isLangOpen)}
								className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm transition-colors hover:border-red-400"
							>
								<Globe size={14} className="text-brand-primary" />
								<span className="text-xs font-bold uppercase text-gray-700">
									{locale.toUpperCase()}
								</span>
								<ChevronDown
									size={12}
									className={`text-gray-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
								/>
							</button>

							<AnimatePresence>
								{isLangOpen && (
									<motion.div
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 8 }}
										transition={{ duration: 0.15 }}
										className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
									>
										{languages.map((lang) => {
											// Standard way to switch language using native browser URL
											const handleLangSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
												e.preventDefault();
												setIsLangOpen(false);
												
												// Get raw path, safely handling current locale in the path
												const currentPath = window.location.pathname;
												const segments = currentPath.split("/");
												
												// If first segment is a known locale, replace it
												if (languages.some((l) => l.code === segments[1])) {
													segments[1] = lang.code;
												} else {
													// Insert locale as first segment
													segments.splice(1, 0, lang.code);
												}
												
												// Default locale (vi) might not need prefix depending on next-intl config,
												// but next-intl will automatically normalize it.
												const newPath = segments.join("/") + window.location.search;
												window.location.href = newPath;
											};

											return (
												<a
													key={lang.code}
													href="#"
													onClick={handleLangSwitch}
													className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
														locale === lang.code
															? "font-bold text-red-600"
															: "text-gray-600"
													}`}
												>
													<span>{lang.flag}</span>
													{lang.name}
												</a>
											);
										})}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Contact Button */}
						<a
							href={`https://zalo.me/${phone}`}
							target="_blank"
							rel="noopener noreferrer"
							onClick={trackContactConversion}
							className="rounded-lg bg-brand-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-red-200"
						>
							{t("contact_zalo")}
						</a>
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

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-40 md:hidden"
							onClick={() => setIsMobileMenuOpen(false)}
						/>

						{/* Panel trượt từ phải */}
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="fixed right-0 top-20 z-50 h-full w-72 bg-white shadow-2xl md:hidden"
						>
							<div className="space-y-1 px-3 py-3">
								{navItems.map((item) => (
									<Link
										key={item.path}
										href={item.path}
										onClick={() => setIsMobileMenuOpen(false)}
										className="block rounded-md px-3 py-4 font-medium  hover:bg-gray-50 hover:text-red-600"
									>
										{item.name}
									</Link>
								))}
								<div className="px-3 py-4">
									<a
										href={`https://zalo.me/${phone}`}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => { setIsMobileMenuOpen(false); trackContactConversion(); }}
										className="block w-full rounded-lg bg-[#f43f5e] py-3 text-center text-base font-semibold text-white hover:bg-red-700"
									>
										{t("contact_zalo")}
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
