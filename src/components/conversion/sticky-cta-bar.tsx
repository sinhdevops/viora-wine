"use client";

import { useEffect } from "react";

const PHONE = "0338909973";
const ORDER_HREF = "https://zalo.me/0325610016";

function PhoneIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}

export default function StickyCTABar() {
	useEffect(() => {
		document.body.style.paddingBottom = "calc(64px + env(safe-area-inset-bottom, 0px))";
		return () => {
			document.body.style.paddingBottom = "";
		};
	}, []);

	return (
		<div
			id="vc-sticky-bar"
			role="complementary"
			aria-label="Liên hệ & đặt hàng nhanh"
			className="fixed right-0 bottom-0 left-0 z-9999 flex items-center gap-2 border-t border-[#e8e0d5] bg-white px-3 md:hidden"
			style={{
				height: "calc(64px + env(safe-area-inset-bottom, 0px))",
				paddingBottom: "env(safe-area-inset-bottom, 0px)",
				boxShadow: "0 -3px 16px rgba(0,0,0,.10)",
			}}
		>
			<div className="flex shrink-0 flex-col pr-1 leading-snug">
				<span className="text-[10px] text-[#888]">Chọn từ</span>
				<span className="text-[12px] font-bold whitespace-nowrap text-[#7a1c1c]">290k – 3.400k</span>
			</div>

			<div className="flex flex-1 items-center justify-end gap-1.5">
				<a
					href={`tel:${PHONE}`}
					aria-label="Gọi ngay"
					className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border-[1.5px] border-[#7a1c1c] px-3.5 text-[13px] font-bold text-[#7a1c1c] no-underline select-none active:opacity-75"
					style={{ WebkitTapHighlightColor: "transparent" }}
				>
					<PhoneIcon />
					Gọi ngay
				</a>
				<a
					href={ORDER_HREF}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Đặt hàng qua Zalo"
					className="inline-flex h-10 items-center justify-center rounded-md px-3.5 text-[13px] font-bold text-white no-underline select-none active:opacity-75"
					style={{ background: "#7a1c1c", WebkitTapHighlightColor: "transparent" }}
				>
					Đặt ngay
				</a>
			</div>
		</div>
	);
}
