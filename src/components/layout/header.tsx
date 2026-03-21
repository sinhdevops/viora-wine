"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Globe, Menu, X } from "lucide-react";

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
		{ name: t("home"), path: "/" },
		{ name: t("products"), path: "/products" },
		{ name: t("news"), path: "/news" },
		{ name: t("promotion"), path: "/promotion" },
		{ name: t("gifts"), path: "/gifts" },
	];

	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex-shrink-0">
						<span className="font-serif text-2xl font-bold tracking-tighter text-black">
							VIORA WINE
						</span>
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
								<Globe size={14} className="text-red-500" />
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
										{languages.map((lang) => (
											<Link
												key={lang.code}
												href={pathname}
												locale={lang.code}
												onClick={() => setIsLangOpen(false)}
												className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
													locale === lang.code
														? "font-bold text-red-600"
														: "text-gray-600"
												}`}
											>
												<span>{lang.flag}</span>
												{lang.name}
											</Link>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Contact Button */}
						<Link
							href="/contact"
							className="rounded-lg bg-[#f43f5e] px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-red-200"
						>
							{t("contact")}
						</Link>
					</div>

					{/* Mobile menu toggle */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="text-gray-700 hover:text-black md:hidden"
					>
						{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2 }}
						className="border-t border-gray-100 bg-white md:hidden"
					>
						<div className="space-y-1 px-4 py-3">
							{navItems.map((item) => (
								<Link
									key={item.path}
									href={item.path}
									onClick={() => setIsMobileMenuOpen(false)}
									className="block rounded-md px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600"
								>
									{item.name}
								</Link>
							))}
							<div className="px-3 py-4">
								<Link
									href="/contact"
									onClick={() => setIsMobileMenuOpen(false)}
									className="block w-full rounded-lg bg-[#f43f5e] py-3 text-center text-base font-semibold text-white hover:bg-red-700"
								>
									{t("contact")}
								</Link>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
