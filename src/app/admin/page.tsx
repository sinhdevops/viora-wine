import { CalendarDays, Image, Package } from "lucide-react";
import Link from "next/link";

const cards = [
	{
		href: "/admin/hero-banner",
		icon: Image,
		title: "Hero Banner",
		desc: "Thêm ảnh banner hiển thị trên trang chủ",
	},
	{
		href: "/admin/products",
		icon: Package,
		title: "Sản phẩm",
		desc: "Thêm sản phẩm mới vào danh mục",
	},
	{
		href: "/admin/events",
		icon: CalendarDays,
		title: "Sự kiện & Kiến thức",
		desc: "Quản lý sự kiện và bài viết kiến thức về rượu",
	},
];

export default function AdminDashboard() {
	return (
		<div className="p-8">
			<h1 className="mb-1 text-2xl font-bold text-gray-900">Dashboard</h1>
			<p className="mb-8 text-sm text-gray-500">Chào mừng đến Viora Admin</p>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{cards.map(({ href, icon: Icon, title, desc }) => (
					<Link
						key={href}
						href={href}
						className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
					>
						<div className="rounded-lg bg-[#C80000]/10 p-2.5">
							<Icon size={20} className="text-[#C80000]" />
						</div>
						<div>
							<p className="font-semibold text-gray-900">{title}</p>
							<p className="mt-0.5 text-xs text-gray-500">{desc}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
