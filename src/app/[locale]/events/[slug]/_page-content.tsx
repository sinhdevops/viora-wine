"use client";

import DOMPurify from "isomorphic-dompurify";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronRight, Share2, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { NewsItem } from "@/@types/news";

interface NewsDetailPageContentProps {
  newsItem: NewsItem;
  relatedNews: NewsItem[];
}

function ShareButtons() {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFacebook = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        "_blank",
        "noopener,noreferrer,width=600,height=400"
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleFacebook}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-80"
        aria-label="Share on Facebook"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        onClick={handleCopy}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
        aria-label="Copy link"
        title="Copy link"
      >
        <Share2 size={13} />
      </button>
    </div>
  );
}

export default function NewsDetailPageContent({ newsItem, relatedNews }: NewsDetailPageContentProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("news_detail");
  const tNews = useTranslations("news");

  const CATEGORY_LABELS: Record<string, string> = {
    knowledge: tNews("badge_knowledge"),
    event: tNews("badge_event"),
    tasting: tNews("badge_knowledge"),
    news: tNews("badge_event"),
  };

  const categoryLabel = CATEGORY_LABELS[newsItem.category] ?? newsItem.category;

  const TAGS =
    newsItem.category === "kien-thuc"
      ? [t("tag_wine"), t("tag_knowledge"), t("tag_enjoyment")]
      : [t("tag_wine"), t("tag_enjoyment")];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
            <Link href="/" className="hover:text-gray-700">{t("breadcrumb_home")}</Link>
            <ChevronRight size={12} />
            <Link href="/events" className="hover:text-gray-700">{t("breadcrumb_news")}</Link>
            <ChevronRight size={12} />
            <span className="max-w-[180px] truncate text-gray-700 md:max-w-none">
              {newsItem.title[locale]}
            </span>
          </nav>
        </div>
      </div>

      <article>
        {/* Header */}
        <div className="mx-auto max-w-360 px-4 pb-6 pt-8 sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full bg-brand-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            {categoryLabel}
          </span>

          <h1 className="mb-5 text-2xl font-black leading-tight tracking-tight text-gray-900 md:text-[36px] lg:text-[42px]">
            {newsItem.title[locale]}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-primary" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-brand-primary" />
                <span>{newsItem.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-brand-primary" />
                <span>{newsItem.author}</span>
              </div>
            </div>

            {/* Share — desktop */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-[12px] font-semibold text-gray-400">{t("share_label")}</span>
              <ShareButtons />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="relative h-55 w-full overflow-hidden rounded-xl sm:aspect-21/9 sm:h-auto">
            <Image
              src={newsItem.image}
              alt={newsItem.title[locale]}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div
            className="prose prose-gray max-w-none wrap-break-word prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900 prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-h3:uppercase prose-p:mb-5 prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-gray-600 prose-strong:font-bold prose-strong:text-gray-900 prose-ul:pl-5 prose-li:mb-1 prose-li:text-[15px] prose-li:text-gray-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsItem.content[locale]) }}
          />

          {/* Tags */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-8">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-500 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share — mobile */}
          <div className="mt-6 flex items-center gap-3 sm:hidden">
            <span className="text-[12px] font-semibold text-gray-400">{t("share_mobile_label")}</span>
            <ShareButtons />
          </div>

          {/* Author */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
              <User size={22} />
            </div>
            <div>
              <p className="mb-1 text-[13px] font-bold text-gray-900">{newsItem.author}</p>
              <p className="text-[13px] leading-relaxed text-gray-500">{t("author_bio")}</p>
            </div>
          </div>

          {/* Back */}
          <div className="mt-10 border-t border-gray-100 pt-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 transition-colors hover:text-brand-primary"
            >
              <ArrowLeft size={15} />
              {t("back_to_news")}
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedNews.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 md:text-[24px]">
                {t("related_title")}
              </h2>
              <Link
                href="/events"
                className="flex items-center gap-1 text-[12px] font-semibold text-brand-primary hover:underline"
              >
                {t("view_all")} <ArrowRight size={13} />
              </Link>
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1.2}
              spaceBetween={16}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="pb-10!"
            >
              {relatedNews.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={`/events/${item.slug}`} className="group block">
                    <div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title[locale]}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-700 shadow-sm backdrop-blur-sm">
                        {CATEGORY_LABELS[item.category] ?? item.category}
                      </span>
                    </div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-primary">
                      {item.date}
                    </p>
                    <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-primary">
                      {item.title[locale]}
                    </h3>
                    <div className="flex items-center gap-1 text-[12px] font-semibold text-brand-primary">
                      {tNews("read_more")} <ArrowRight size={13} />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
}
