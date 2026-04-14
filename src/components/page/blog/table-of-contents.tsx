"use client";

import { useState, useEffect } from "react";
import { ChevronDown, List } from "lucide-react";
import type { TocHeading } from "@/utils/content-processor";

interface TableOfContentsProps {
  headings: TocHeading[];
  tocTitle: string;
  /**
   * "mobile"  – renders only the collapsible pill (for inside the content column)
   * "desktop" – renders only the sticky sidebar (for the sidebar column)
   * omitted   – renders both (legacy/default)
   */
  mode?: "mobile" | "desktop";
}

function TocList({
  headings,
  activeId,
  onClickItem,
}: {
  headings: TocHeading[];
  activeId: string;
  onClickItem: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <ul className="space-y-0.5">
      {headings.map(({ id, text, level }) => (
        <li key={id} className={level === 3 ? "pl-4" : ""}>
          <a
            href={`#${id}`}
            onClick={(e) => onClickItem(e, id)}
            className={[
              "block rounded-md px-2 py-1.5 leading-snug transition-all duration-150",
              level === 2
                ? "text-[13px] font-semibold"
                : "text-[12px] font-normal",
              activeId === id
                ? "bg-brand-primary/8 text-brand-primary"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800",
            ].join(" ")}
          >
            {level === 3 && (
              <span className="mr-1 text-gray-300">–</span>
            )}
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function TableOfContents({
  headings,
  tocTitle,
  mode,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -55% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length < 3) return null;

  // ── Mobile collapsible pill ────────────────────────────────────────────────
  const MobilePanel = (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold text-gray-700"
        aria-expanded={isOpen}
        aria-controls="toc-mobile-list"
      >
        <span className="flex items-center gap-2">
          <List size={15} className="text-brand-primary" />
          {tocTitle}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav
          id="toc-mobile-list"
          className="border-t border-gray-100 px-3 pb-3 pt-2"
        >
          <TocList
            headings={headings}
            activeId={activeId}
            onClickItem={handleClick}
          />
        </nav>
      )}
    </div>
  );

  // ── Desktop sticky sidebar ─────────────────────────────────────────────────
  const DesktopPanel = (
    <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        <List size={14} className="text-brand-primary" />
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">
          {tocTitle}
        </span>
      </div>
      <nav className="px-3 py-3">
        <TocList
          headings={headings}
          activeId={activeId}
          onClickItem={handleClick}
        />
      </nav>
    </div>
  );

  // ── Render by mode ─────────────────────────────────────────────────────────
  if (mode === "mobile") {
    return <div className="lg:hidden">{MobilePanel}</div>;
  }

  if (mode === "desktop") {
    return <>{DesktopPanel}</>;
  }

  // Legacy: both
  return (
    <>
      <div className="lg:hidden">{MobilePanel}</div>
      <aside className="hidden lg:block">{DesktopPanel}</aside>
    </>
  );
}
