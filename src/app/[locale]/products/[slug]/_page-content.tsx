"use client";

import type { DbProduct } from "@/@types/product";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/utils/format-currency";
import { useZaloLink } from "@/hooks/use-zalo-link";
import { ChevronRight, ChevronLeft, Phone, ShieldCheck, Truck, BadgeCheck, Headset } from "lucide-react";
import CardProduct from "@/components/page/card-product";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { WINE_IMAGES } from "../../../../../public/statics/images";
import { useLocale } from "next-intl";

interface Props {
  product: DbProduct;
  related: DbProduct[];
}

export default function ProductDetailPageContent({ product, related }: Props) {
  const locale = useLocale();
  const t = useTranslations("product");
  const { getZaloLink } = useZaloLink();
  const swiperRef = useRef<SwiperType | null>(null);

  const originalPrice =
    product.discount_percentage > 0
      ? Math.round(product.price / (1 - product.discount_percentage / 100) / 100) * 100
      : null;

  const commitments = [
    { icon: ShieldCheck, text: t("commitment_authentic") },
    { icon: Truck, text: t("commitment_delivery") },
    { icon: BadgeCheck, text: t("commitment_payment") },
    { icon: Headset, text: t("commitment_support") },
  ];

  const categoryLabel =
    t.raw(`category_labels.${product.category}` as Parameters<typeof t.raw>[0]) ??
    product.category;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
            <Link href="/" className="hover:text-gray-700">{t("breadcrumb_home")}</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-gray-700">{t("breadcrumb_products")}</Link>
            <ChevronRight size={12} />
            <span className="line-clamp-1 text-gray-700">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F5F5F5] sm:aspect-4/5">
              <Image
                src={product.thumbnail_url}
                alt={product.name}
                fill
                className="object-contain p-8 sm:p-12"
                priority
              />
              {product.is_hot && (
                <div className="absolute top-0 -left-2.5">
                  <Image src={WINE_IMAGES.hot} alt="Hot product" />
                </div>
              )}
              {product.discount_percentage > 0 && (
                <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-[13px] font-black text-white">
                  -{product.discount_percentage}%
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-brand-primary">
              {String(categoryLabel)}
            </span>

            {/* Name */}
            <h1 className="mb-5 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-[32px]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              {product.price === 0 ? (
                <span className="text-3xl font-black text-brand-primary">
                  Liên hệ
                </span>
              ) : (
                <>
                  <span className="text-3xl font-black text-brand-primary">
                    {formatCurrency(product.price, locale)}
                  </span>
                  {originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(originalPrice, locale)}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="mb-8 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-400"}`} />
              <span className={`text-[13px] font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {product.stock > 0
                  ? `${t("in_stock")} (${product.stock})`
                  : t("out_of_stock")}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 grid grid-cols-2 gap-3">
              <a
                href={getZaloLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Fire-and-forget: increment sold_count, does not block Zalo opening
                  fetch(`/api/products/${product.id}/increment-sold`, { method: 'POST' });
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#A30000] active:scale-95"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                {t("chat_zalo")}
              </a>
              <a
                href="tel:0901234567"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3.5 text-sm font-bold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 active:scale-95"
              >
                <Phone size={18} />
                {t("call")}
              </a>
            </div>

            {/* Commitments */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 p-5">
              {commitments.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={16} className="shrink-0 text-brand-primary" strokeWidth={2} />
                  <span className="text-[12px] font-medium text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  {t("description_label")}
                </p>
                <p className="text-[14px] leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14 border-t border-gray-100 pt-10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{t("related")}</h2>
              <Link href="/products" className="text-[13px] font-medium text-brand-primary hover:underline">
                {t("view_all")}
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous"
                className="absolute top-1/2 -left-4 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-400 hover:text-gray-900 md:-left-5"
              >
                <ChevronLeft size={16} />
              </button>
              <Swiper
                modules={[Navigation]}
                onSwiper={(s) => (swiperRef.current = s)}
                spaceBetween={14}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3, spaceBetween: 16 },
                  1024: { slidesPerView: 4, spaceBetween: 20 },
                  1280: { slidesPerView: 5, spaceBetween: 20 },
                }}
                className="px-1! py-4!"
              >
                {related.map((p) => (
                  <SwiperSlide key={p.id}>
                    <CardProduct product={p} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next"
                className="absolute top-1/2 -right-4 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-400 hover:text-gray-900 md:-right-5"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
