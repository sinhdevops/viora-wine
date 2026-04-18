"use client";

import { SiZalo } from "react-icons/si";

interface ZaloCtaBlockProps {
  title: string;
  buttonLabel: string;
  phone?: string;
}

export default function ZaloCtaBlock({
  title,
  buttonLabel,
  phone = "0338909973",
}: ZaloCtaBlockProps) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50  ">
      <div className="flex flex-col items-center gap-5 px-6 py-8 text-center sm:flex-row sm:text-left">
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0068FF] shadow-lg shadow-blue-300/40">
          <SiZalo size={28} className="text-white" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="mb-1 text-[15px] font-black text-gray-900">{title}</p>
          <p className="text-[13px] text-gray-500">
            Chuyên gia Viora Wine sẵn sàng tư vấn <strong>miễn phí</strong> 24/7 — giao hàng toàn quốc.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={`https://zalo.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0068FF] px-6 py-3 text-[13px] font-bold text-white shadow-md shadow-blue-300/30 transition-all hover:bg-[#0055CC] hover:shadow-lg active:scale-95"
        >
          <SiZalo size={16} />
          {buttonLabel}
        </a>
      </div>

      {/* Subtle bottom accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0068FF]/40 via-[#0068FF] to-[#0068FF]/40" />
    </div>
  );
}
