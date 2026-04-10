import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Toaster } from "sonner";
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
				className="flex bg-gray-50 font-(family-name:--font-lexend) min-h-screen"
				suppressHydrationWarning
			>
				{children}
				<Toaster position="top-right" richColors />
			</body>
		</html>
	);
}
