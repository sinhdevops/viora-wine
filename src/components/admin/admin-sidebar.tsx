"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Image, LayoutDashboard, Package } from "lucide-react";

const navItems = [
	{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
	{ href: "/admin/hero-banner", label: "Banner", icon: Image, exact: false },
	{ href: "/admin/products", label: "Sản phẩm", icon: Package, exact: false },
	{ href: "/admin/events", label: "Sự kiện", icon: CalendarDays, exact: false },
];

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<>
			{/* ── Desktop Sidebar ── */}
			<aside className="hidden md:flex h-screen w-56 shrink-0 flex-col border-r border-gray-200 bg-white sticky top-0">
				<div className="flex h-16 items-center border-b border-gray-200 px-5">
					<span className="font-serif text-lg font-bold tracking-tight text-brand-primary">
						VIORA ADMIN
					</span>
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
			</aside>

			{/* ── Mobile Top Header ── */}
			<header className="md:hidden fixed top-0 inset-x-0 z-50 flex h-14 items-center border-b border-gray-200 bg-white px-4">
				<span className="font-serif text-base font-bold tracking-tight text-brand-primary">
					VIORA ADMIN
				</span>
			</header>

			{/* ── Mobile Bottom Navigation ── */}
			<nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex h-16 border-t border-gray-200 bg-white safe-area-pb">
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
