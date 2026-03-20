"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image, LayoutDashboard, Package } from "lucide-react";

const navItems = [
	{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
	{ href: "/admin/hero-banner", label: "Hero Banner", icon: Image, exact: false },
	{ href: "/admin/products", label: "Sản phẩm", icon: Package, exact: false },
];

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="flex h-screen w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
			<div className="flex h-16 items-center border-b border-gray-200 px-5">
				<span className="font-serif text-lg font-bold tracking-tight text-[#C80000]">
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
									? "bg-[#C80000] text-white"
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
	);
}
