import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Toaster } from "sonner";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import "../globals.css";

const lexend = Lexend({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-lexend",
});

export const metadata: Metadata = {
	title: "Admin — Viora Wine",
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="vi" className={lexend.variable} suppressHydrationWarning>
			<body
				className="flex bg-gray-50 font-[family-name:var(--font-lexend)]"
				suppressHydrationWarning
			>
				<AdminSidebar />
				<main className="flex-1 overflow-y-auto">{children}</main>
				<Toaster position="top-right" richColors />
			</body>
		</html>
	);
}
