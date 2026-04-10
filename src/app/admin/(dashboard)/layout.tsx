import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex bg-gray-50 flex-1">
			<AdminSidebar />
			<main className="flex-1 overflow-y-auto pt-14 md:pt-0 pb-16 md:pb-0">
				{children}
			</main>
		</div>
	);
}
