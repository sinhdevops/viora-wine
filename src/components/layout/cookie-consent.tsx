"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@/i18n/routing";

declare function gtag(...args: unknown[]): void;

export default function CookieConsent() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		try {
			if (!localStorage.getItem("cookie-consent")) setShow(true);
		} catch {
			// localStorage blocked
		}
	}, []);

	function accept() {
		try {
			localStorage.setItem("cookie-consent", "granted");
		} catch {}
		if (typeof gtag !== "undefined") {
			gtag("consent", "update", {
				ad_storage: "granted",
				analytics_storage: "granted",
				ad_user_data: "granted",
				ad_personalization: "granted",
			});
		}
		setShow(false);
	}

	function decline() {
		try {
			localStorage.setItem("cookie-consent", "declined");
		} catch {}
		setShow(false);
	}

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					role="dialog"
					aria-label="Thông báo cookie"
					className="fixed bottom-0 left-0 right-0 z-[9998] border-t border-gray-200 bg-white px-4 py-4 shadow-2xl sm:px-6"
				>
					<div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
						<p className="text-sm text-gray-700">
							Chúng tôi dùng cookies để cải thiện trải nghiệm của bạn và phân tích lưu lượng truy cập.{" "}
							<Link href="/privacy-policy" className="text-brand-primary underline hover:no-underline">
								Chính sách bảo mật
							</Link>
						</p>
						<div className="flex shrink-0 gap-3">
							<button
								onClick={decline}
								className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
							>
								Từ chối
							</button>
							<button
								onClick={accept}
								className="bg-brand-primary rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
							>
								Chấp nhận
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
