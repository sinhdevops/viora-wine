"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NewsItem } from "@/@types/news";

interface Props {
  news: NewsItem[];
}

const PAGE_SIZE = 6;

export default function EventsPageContent({ news }: Props) {
  const locale = useLocale() as "vi";
  const t = useTranslations("news");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("all");
  const page = Number(searchParams.get('page')) || 1;

  const TABS = [
    { id: "all", label: t("tab_all") },
    { id: "kien-thuc", label: t("tab_knowledge") },
    { id: "su-kien", label: t("tab_event") },
  ];

  const CATEGORY_LABELS: Record<string, string> = {
    knowledge: t("badge_knowledge"),
    event: t("badge_event"),
    tasting: t("badge_knowledge"),
    news: t("badge_event"),
  };

  const filtered = useMemo(
    () => activeTab === "all" ? news : news.filter((item) => item.category === activeTab),
    [news, activeTab]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const displayed = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const getPageUrl = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p === 1) params.delete('page');
    else params.set('page', p.toString());
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ''}`;
  };

  function handleTabChange(id: string) {
    setActiveTab(id);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
            <Link href="/" className="hover:text-gray-700">{t("breadcrumb_home")}</Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">{t("breadcrumb_current")}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          {/* Title styled as H1 but actual H1 is in server component for SEO */}
          <div className="text-xl font-black uppercase tracking-tight md:text-[28px]">
            {t("title")}
          </div>
          <p className="mt-1.5 text-sm text-gray-500">
            {t("subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`shrink-0 pb-3 text-[13px] font-semibold tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {displayed.map((item) => (
              <Link
                key={item.id}
                href={{ pathname: '/blog/[slug]', params: { slug: item.slug } }}
                className="group block"
              >
                {/* Image */}
                <div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-700   backdrop-blur-sm">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                </div>

                {/* Meta */}
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-primary">
                  {item.date}
                </p>

                {/* Title */}
                <h3 className="mb-2 text-[15px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-primary md:text-[16px]">
                  {item.title[locale]}
                </h3>

                {/* Excerpt */}
                <p className="line-clamp-2 text-[13px] leading-relaxed text-gray-500">
                  {item.excerpt[locale]}
                </p>

                {/* Read more */}
                <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-brand-primary">
                  {t("read_more")} <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-gray-400">{t("empty")}</p>
            <button
              onClick={() => handleTabChange("all")}
              className="mt-4 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a30000]"
            >
              {t("view_all")}
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {page === 1 ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 opacity-30 cursor-not-allowed">
                <ChevronLeft size={16} />
              </div>
            ) : (
              <Link
                href={getPageUrl(page - 1) as any}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-primary hover:text-brand-primary"
              >
                <ChevronLeft size={16} />
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={getPageUrl(p) as any}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  p === page
                    ? "bg-brand-primary text-white"
                    : "border border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {p}
              </Link>
            ))}

            {page === totalPages ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 opacity-30 cursor-not-allowed">
                <ChevronRight size={16} />
              </div>
            ) : (
              <Link
                href={getPageUrl(page + 1) as any}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-brand-primary hover:text-brand-primary"
              >
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
