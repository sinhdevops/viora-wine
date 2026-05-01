"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Image as ImageIcon, LayoutDashboard, Package } from "lucide-react";
import { WINE_IMAGES } from "../../../public/statics/images";
import Image from "next/image";

const navItems = [
	{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
	{ href: "/admin/hero-banner", label: "Banner", icon: ImageIcon, exact: false },
	{ href: "/admin/products", label: "Sản phẩm", icon: Package, exact: false },
	{ href: "/admin/events", label: "Sự kiện", icon: CalendarDays, exact: false },
];

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<>
			{/* ── Desktop Sidebar ── */}
			<aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
				<div className="flex h-16 items-center border-b border-gray-200 px-5">
					<Link href="/" className="shrink-0">
						<Image src={WINE_IMAGES.logo} alt="Viora Wine" />
					</Link>
				</div>
				<nav className="flex flex-col gap-1 p-3">
					{navItems.map(({ href, label, icon: Icon, exact }) => {
						const isActive = exact ? pathname === href : pathname.startsWith(href);
						return (
							<Link
								key={href}
								href={href}
								className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
									isActive
										? "bg-brand-primary text-white"
										: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
								}`}
							>
								<Icon size={17} />
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="mt-auto border-t border-gray-100 p-3">
					<button
						onClick={async () => {
							const { createClient } = await import("@/utils/supabase/client");
							const supabase = createClient();
							await supabase.auth.signOut();
							window.location.href = "/admin/login";
						}}
						className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="17"
							height="17"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<polyline points="16 17 21 12 16 7" />
							<line x1="21" y1="12" x2="9" y2="12" />
						</svg>
						Đăng xuất
					</button>
				</div>
			</aside>

			{/* ── Mobile Top Header ── */}
			<header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b border-gray-200 bg-white px-4 md:hidden">
				<span className="text-brand-primary font-serif text-base font-bold tracking-tight">VIORA ADMIN</span>
			</header>

			{/* ── Mobile Bottom Navigation ── */}
			<nav className="safe-area-pb fixed inset-x-0 bottom-0 z-50 flex h-16 border-t border-gray-200 bg-white md:hidden">
				{navItems.map(({ href, label, icon: Icon, exact }) => {
					const isActive = exact ? pathname === href : pathname.startsWith(href);
					return (
						<Link
							key={href}
							href={href}
							className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
								isActive ? "text-brand-primary" : "text-gray-400 hover:text-gray-600"
							}`}
						>
							<Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
							<span className="text-[10px] font-semibold">{label}</span>
						</Link>
					);
				})}
			</nav>
		</>
	);
}
