"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function UrgencyStrip() {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (new Date().getHours() >= 22) return;

    function tick() {
      const now = new Date();
      if (now.getHours() >= 22) { setDisplay(null); clearInterval(id); return; }
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setDisplay(`${pad(h)}:${pad(m)}:${pad(s)}`);
    }

    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, []);

  if (display === null) return null;

  return (
    <div
      role="status"
      aria-live="off"
      className="flex w-full items-center justify-between gap-2 px-4 py-[7px]"
      style={{ background: "#7a1c1c", color: "#f9d4a0" }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-[6px]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span className="truncate text-[12px] font-medium sm:whitespace-normal sm:text-[13px]">
          Flash sale hôm nay — giảm thêm 10% khi đặt trước
        </span>
      </div>
      <span
        className="shrink-0 rounded text-[13px] font-bold tracking-wider"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          background: "#5a1212",
          padding: "2px 8px",
          minWidth: 68,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
        aria-label={`Còn ${display}`}
      >
        {display}
      </span>
    </div>
  );
}
