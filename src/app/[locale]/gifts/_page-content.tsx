"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { HiOutlinePencilSquare, HiOutlineCubeTransparent, HiOutlineSparkles } from "react-icons/hi2";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";
import { useTranslations } from "next-intl";

interface Props {
  products: DbProduct[];
}

export default function GiftsPageContent({ products }: Props) {
  const t = useTranslations("gifts");
  const [activeTab, setActiveTab] = useState("all");

  const TABS = [
    { id: "all", label: t("tab_all") },
    { id: "gift", label: t("tab_gift") },
    { id: "combo", label: t("tab_combo") },
  ];

  const SERVICES = [
    { icon: HiOutlinePencilSquare, title: t("service1_title"), desc: t("service1_desc") },
    { icon: HiOutlineCubeTransparent, title: t("service2_title"), desc: t("service2_desc") },
    { icon: HiOutlineSparkles, title: t("service3_title"), desc: t("service3_desc") },
  ];

  const displayed =
    activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
            <Link href="/" className="hover:text-gray-700">{t("breadcrumb_home")}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-700">{t("breadcrumb_current")}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-black uppercase tracking-tight md:text-[28px]">
            {t("title")}
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            {t("subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-8 flex gap-6 overflow-x-auto border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* Product Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-5">
            {displayed.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-gray-400">{t("empty")}</p>
            <button
              onClick={() => setActiveTab("all")}
              className="mt-4 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a30000]"
            >
              {t("view_all")}
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="my-14 border-t border-gray-100" />

        {/* Gift services */}
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-tight md:text-[22px]">
            {t("services_title")}
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            {t("services_subtitle")}
          </p>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-gray-50 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Icon size={24} />
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-gray-900">{title}</h3>
              <p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gray-50 px-8 py-10 text-center">
          <h3 className="mb-2 text-[18px] font-black uppercase tracking-tight text-gray-900 md:text-[22px]">
            {t("cta_title")}
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            {t("cta_subtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-brand-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#a30000]"
          >
            {t("cta_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
