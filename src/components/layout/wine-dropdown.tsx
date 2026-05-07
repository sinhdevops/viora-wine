"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";

const WINE_TYPES = [
	{ label: "Rượu vang đỏ", href: "/red-wine" as const },
	{ label: "Rượu vang trắng", href: "/white-wine" as const },
	{ label: "Rượu vang hồng", href: "/rose-wine" as const },
	{ label: "Shiraz", href: "/shiraz" as const },
] as const;

const COUNTRIES = ["Pháp", "Ý", "Chile", "Úc"];

const LOCAL_LINKS = [
	{ label: "Shiraz Đà Nẵng", href: "/shiraz-da-nang" as const },
	{ label: "Shiraz Hà Nội", href: "/shiraz-ha-noi" as const },
];

const QUICK_LINKS = [
	{ label: "Rượu vang ngọt", href: "/sweet-wine", external: false },
	{ label: "Bán chạy nhất", href: "/san-pham?tab=best_seller", external: true },
	{ label: "Thường ngày", href: "/san-pham?tab=everyday", external: true },
	{ label: "Dễ uống", href: "/san-pham?tab=easy_drink", external: true },
	{ label: "Quà tặng", href: "/san-pham?tab=gift", external: true },
];

interface WineDropdownDesktopProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export function WineDropdownDesktop({ isOpen, onOpen, onClose }: WineDropdownDesktopProps) {
	const pathname = usePathname();
	const allWineRoutes = [...WINE_TYPES.map((w) => w.href as string), "/sweet-wine"];
	const isActive = allWineRoutes.some((r) => pathname.startsWith(r));

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				onClose();
			}
		}
		if (isOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onClose]);

	return (
		<div ref={containerRef} className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
			<Link
				href="/products"
				className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors outline-none hover:text-red-600 ${
					isActive ? "border-b-2 border-red-600 pb-0.5 text-red-600" : "text-gray-800"
				}`}
			>
				SẢN PHẨM
				<ChevronDown
					size={15}
					className={`mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
				/>
			</Link>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="absolute top-full left-1/2 z-50 mt-3 w-[880px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl"
					>
						<div className="grid grid-cols-4 gap-6">
							{/* Col 1: Theo loại */}
							<div>
								<p className="mb-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
									Theo Loại Rượu
								</p>
								<ul className="space-y-2">
									{WINE_TYPES.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												onClick={onClose}
												className="block text-sm text-gray-700 transition-colors hover:text-red-600"
											>
												{item.label}
											</Link>
										</li>
									))}
									<li>
										<Link
											href="/products"
											onClick={onClose}
											className="mt-2 flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline"
										>
											→ Tất cả rượu vang
										</Link>
									</li>
								</ul>
							</div>

							{/* Col 2: Theo quốc gia */}
							<div>
								<p className="mb-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
									Theo Quốc Gia
								</p>
								<ul className="space-y-2">
									{COUNTRIES.map((country) => (
										<li key={country}>
											<a
												href={`/san-pham?countries=${encodeURIComponent(country)}`}
												onClick={onClose}
												className="block text-sm text-gray-700 transition-colors hover:text-red-600"
											>
												Rượu vang {country}
											</a>
										</li>
									))}
								</ul>
							</div>

							{/* Col 3: Theo khu vực */}
							<div>
								<p className="mb-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
									Theo Khu Vực
								</p>
								<ul className="space-y-2">
									{LOCAL_LINKS.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												onClick={onClose}
												className="block text-sm text-gray-700 transition-colors hover:text-red-600"
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Col 4: Gợi ý */}
							<div>
								<p className="mb-3 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
									Gợi Ý
								</p>
								<ul className="space-y-2">
									{QUICK_LINKS.map((item) => (
										<li key={item.href}>
											<a
												href={item.href}
												onClick={onClose}
												className="block text-sm text-gray-700 transition-colors hover:text-red-600"
											>
												{item.label}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

interface WineMobileSubPanelProps {
	isOpen: boolean;
	onClose: () => void;
	onNavigate: () => void;
}

export function WineMobileSubPanel({ isOpen, onClose, onNavigate }: WineMobileSubPanelProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ x: "100%" }}
					animate={{ x: 0 }}
					exit={{ x: "100%" }}
					transition={{ duration: 0.22, ease: "easeInOut" }}
					className="absolute inset-0 z-10 overflow-y-auto bg-[#8B0000] text-white"
				>
					{/* Header */}
					<button
						onClick={onClose}
						className="flex w-full items-center gap-2 border-b border-white/20 px-5 py-4 text-sm font-semibold tracking-wide"
					>
						<span className="text-base">‹</span> RƯỢU VANG
					</button>

					<div className="space-y-6 px-5 py-4">
						{/* Theo loại */}
						<div>
							<p className="mb-3 text-[11px] font-bold tracking-widest text-white/50 uppercase">
								Loại Rượu
							</p>
							<ul className="divide-y divide-white/10">
								{WINE_TYPES.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											onClick={onNavigate}
											className="block py-3.5 text-sm font-medium text-white"
										>
											{item.label}
										</Link>
									</li>
								))}
								<li>
									<Link
										href="/products"
										onClick={onNavigate}
										className="block py-3.5 text-sm font-semibold text-yellow-300"
									>
										Tất cả rượu vang →
									</Link>
								</li>
							</ul>
						</div>

						{/* Gợi ý */}
						<div>
							<p className="mb-3 text-[11px] font-bold tracking-widest text-white/50 uppercase">Gợi Ý</p>
							<ul className="divide-y divide-white/10">
								{QUICK_LINKS.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											onClick={onNavigate}
											className="block py-3.5 text-sm font-medium text-white"
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Theo quốc gia */}
						<div>
							<p className="mb-3 text-[11px] font-bold tracking-widest text-white/50 uppercase">
								Quốc Gia
							</p>
							<ul className="divide-y divide-white/10">
								{COUNTRIES.map((country) => (
									<li key={country}>
										<a
											href={`/san-pham?countries=${encodeURIComponent(country)}`}
											onClick={onNavigate}
											className="block py-3.5 text-sm font-medium text-white"
										>
											Rượu vang {country}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Theo khu vực */}
						<div>
							<p className="mb-3 text-[11px] font-bold tracking-widest text-white/50 uppercase">
								Khu Vực
							</p>
							<ul className="divide-y divide-white/10">
								{LOCAL_LINKS.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											onClick={onNavigate}
											className="block py-3.5 text-sm font-medium text-white"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
