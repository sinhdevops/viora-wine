"use client";

import { useEffect } from "react";
import { SiZalo } from "react-icons/si";
import { usePathname } from "next/navigation";

const PHONE = "0338909973";
const ZALO_HREF = "https://zalo.me/0325610016";
const MESSENGER_HREF = "https://m.me/viorawine";

function IconHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMessenger() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.952 1.44 5.59 3.7 7.33V22l3.4-1.87c.91.253 1.873.39 2.9.39 5.523 0 10-4.145 10-9.277C22 6.145 17.523 2 12 2zm1.008 12.498l-2.545-2.717-4.968 2.717 5.467-5.799 2.607 2.717 4.906-2.717-5.467 5.799z" />
    </svg>
  );
}

function trackConversion() {
  if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
    (window as any).gtag("event", "conversion", { send_to: "AW-18100193809/tU1uCO_GvJ4cEJGU7LZD" });
  }
}

export default function MobileBottomNav() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = (mobile: boolean) => {
      document.body.style.paddingBottom = mobile
        ? "calc(56px + env(safe-area-inset-bottom, 0px))"
        : "";
    };
    apply(mq.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
      document.body.style.paddingBottom = "";
    };
  }, []);

  const isHome = pathname === "/" || /^\/[a-z]{2}$/.test(pathname ?? "");
  const isProducts = pathname?.includes("san-pham") || pathname?.includes("products");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-9999 border-t border-gray-100 bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", boxShadow: "0 -2px 12px rgba(0,0,0,.08)" }}
      aria-label="Điều hướng mobile"
    >
      <div className="flex h-14 items-stretch">

        {/* Trang chủ */}
        <a
          href="/"
          className={`flex flex-1 flex-col items-center justify-center gap-[3px] text-[10px] font-medium transition-colors ${isHome ? "text-[#7a1c1c]" : "text-gray-500"}`}
          aria-current={isHome ? "page" : undefined}
        >
          <IconHome />
          Trang chủ
        </a>

        {/* Sản phẩm */}
        <a
          href="/san-pham"
          className={`flex flex-1 flex-col items-center justify-center gap-[3px] text-[10px] font-medium transition-colors ${isProducts ? "text-[#7a1c1c]" : "text-gray-500"}`}
          aria-current={isProducts ? "page" : undefined}
        >
          <IconGrid />
          Sản phẩm
        </a>

        {/* Gọi ngay — CTA nổi bật */}
        <a
          href={`tel:${PHONE}`}
          onClick={trackConversion}
          className="flex flex-1 flex-col items-center justify-center gap-[3px] bg-[#7a1c1c] text-[10px] font-bold text-white"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label={`Gọi ngay ${PHONE}`}
        >
          <IconPhone />
          Gọi ngay
        </a>

        {/* Zalo */}
        <a
          href={ZALO_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackConversion}
          className="flex flex-1 flex-col items-center justify-center gap-[3px] bg-[#0068ff] text-[10px] font-bold text-white"
          style={{ WebkitTapHighlightColor: "transparent" }}
          aria-label="Chat Zalo"
        >
          <SiZalo size={20} aria-hidden="true" />
          Zalo
        </a>

        {/* Messenger */}
        <a
          href={MESSENGER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackConversion}
          className="flex flex-1 flex-col items-center justify-center gap-[3px] text-[10px] font-bold text-white"
          style={{ background: "linear-gradient(135deg,#00B2FF,#006AFF)", WebkitTapHighlightColor: "transparent" }}
          aria-label="Chat Messenger"
        >
          <IconMessenger />
          Messenger
        </a>

      </div>
    </nav>
  );
}
