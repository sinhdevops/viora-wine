"use client";

import DOMPurify from "isomorphic-dompurify";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  User,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { NewsItem } from "@/@types/news";
import type { DbProduct } from "@/@types/product";
import { processContent, splitAtSecondH2, calculateReadingTime, sanitizeHtmlContent, ensureImgAlt } from "@/utils/content-processor";
import { injectInternalLinks } from "@/utils/internal-links";

import TableOfContents from "@/components/page/blog/table-of-contents";
import ProductSuggestionBlock from "@/components/page/blog/product-suggestion-block";
import FaqSection from "@/components/page/blog/faq-section";
import { DEFAULT_FAQ_ITEMS } from "@/components/page/blog/faq-data";
import ZaloCtaBlock from "@/components/page/blog/zalo-cta-block";
import AuthorBlock from "@/components/page/blog/author-block";
import CommentSection from "@/components/page/blog/comment-section";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface NewsDetailPageContentProps {
  newsItem: NewsItem;
  relatedNews: NewsItem[];
  suggestedProducts: DbProduct[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Share Buttons
// ─────────────────────────────────────────────────────────────────────────────

function ShareButtons() {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFacebook = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`,
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

// ─────────────────────────────────────────────────────────────────────────────
// Prose renderer
// ─────────────────────────────────────────────────────────────────────────────

function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-body wrap-break-word"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsDetailPageContent({
  newsItem,
  relatedNews,
  suggestedProducts,
}: NewsDetailPageContentProps) {
  const locale = useLocale() as "vi";
  const t = useTranslations("news_detail");
  const tNews = useTranslations("news");

  // ── Category labels ──
  const CATEGORY_LABELS: Record<string, string> = {
    knowledge: tNews("badge_knowledge"),
    event: tNews("badge_event"),
    tasting: tNews("badge_knowledge"),
    news: tNews("badge_event"),
  };
  const categoryLabel =
    CATEGORY_LABELS[newsItem.category] ?? newsItem.category;

  // ── Tags ──
  const TAGS =
    newsItem.category === "kien-thuc"
      ? [t("tag_wine"), t("tag_knowledge"), t("tag_enjoyment")]
      : [t("tag_wine"), t("tag_enjoyment")];

  // ── Process HTML content: inject heading IDs + extract TOC + internal links ──
  const rawHtml = sanitizeHtmlContent(DOMPurify.sanitize(newsItem.content[locale]));
  const withAlt = ensureImgAlt(rawHtml, newsItem.title[locale]);
  const withLinks = injectInternalLinks(withAlt);
  const { processedHtml, headings } = processContent(withLinks);
  const [firstSection, restSection] = splitAtSecondH2(processedHtml);

  // ── Reading time: use stored value or auto-calculate from content ──
  const readTime = newsItem.readTime || calculateReadingTime(rawHtml);

  // ── Sidebar: only show 2-col layout when TOC has enough headings ──
  const hasToc = headings.length >= 3;

  // ── Author bio (full EEAT version) ──
  const authorBio = t("author_bio_full");

  return (
    <div className="min-h-screen bg-white">
      {/* ①  Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
          <nav
            className="flex items-center gap-1.5 text-[12px] text-gray-400"
            aria-label="breadcrumb"
          >
            <Link href="/" className="hover:text-gray-700">
              {t("breadcrumb_home")}
            </Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-gray-700">
              {t("breadcrumb_news")}
            </Link>
            <ChevronRight size={12} />
            <span className="max-w-[180px] truncate text-gray-700 md:max-w-none">
              {newsItem.title[locale]}
            </span>
          </nav>
        </div>
      </div>

      <article>
        {/* ①  Title Section ────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-360 px-4 pb-6 pt-8 sm:px-6 lg:px-8">
          {/* Category badge */}
          <span className="mb-4 inline-block rounded-full bg-brand-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            {categoryLabel}
          </span>

          {/* Title styled as H1 but actual H1 is in server component for SEO */}
          <div className="mb-5 text-2xl font-black leading-tight tracking-tight text-gray-900 md:text-[36px] lg:text-[42px]">
            {newsItem.title[locale]}
          </div>

          {/* Meta row: date · read-time · author · share */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-primary" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-brand-primary" />
                <span>{readTime}</span>
              </div>
              {newsItem.author && (
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-brand-primary" />
                  <span>{newsItem.author}</span>
                </div>
              )}
            </div>

            {/* Share — desktop */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-[12px] font-semibold text-gray-400">
                {t("share_label")}
              </span>
              <ShareButtons />
            </div>
          </div>
        </div>

        {/* ②③④  Two-column layout: 70% content | 30% sidebar ─────────────── */}
        <div className="mx-auto max-w-360 px-4 pt-6 pb-10 sm:px-6 lg:px-8">
          <div className={hasToc ? "lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 xl:grid-cols-[1fr_320px]" : ""}>

            {/* ── LEFT COLUMN: main content (70%) ─────────────────────────── */}
            <div className="min-w-0">

              {/* Mobile TOC – collapsible pill, hidden on desktop */}
              <TableOfContents
                headings={headings}
                tocTitle={t("toc_title")}
                mode="mobile"
              />

              {/* Featured Image */}
              {newsItem.image && (
                <div className="mb-8">
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
              )}

              {/* Intro box */}
              {newsItem.excerpt[locale] && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-amber-600">
                    {t("intro_label")}
                  </p>
                  <p className="text-[15px] leading-relaxed text-gray-700">
                    {newsItem.excerpt[locale]}
                  </p>
                </div>
              )}

              {/* First article section (up to 2nd H2) */}
              <ArticleBody html={firstSection} />

              {/* Product Suggestion Block */}
              <ProductSuggestionBlock
                products={suggestedProducts}
                title={t("product_suggestion_title")}
                ctaLabel={t("product_suggestion_zalo")}
              />

              {/* Remaining article sections */}
              {restSection && <ArticleBody html={restSection} />}

              {/* Zalo CTA */}
              <ZaloCtaBlock
                title={t("zalo_cta_title")}
                buttonLabel={t("zalo_cta_button")}
              />

              {/* Food Pairing */}
              {/* <FoodPairingBlock
                title={t("food_pairing_title")}
                items={DEFAULT_FOOD_ITEMS}
              /> */}

              {/* Tags */}
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-8">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-default rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-500 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share — mobile */}
              <div className="mt-6 flex items-center gap-3 sm:hidden">
                <span className="text-[12px] font-semibold text-gray-400">
                  {t("share_mobile_label")}
                </span>
                <ShareButtons />
              </div>

              {/* Back link */}
              <div className="mt-10 border-t border-gray-100 pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 transition-colors hover:text-brand-primary"
                >
                  <ArrowLeft size={15} />
                  {t("back_to_news")}
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN: sticky sidebar (30%, desktop only, TOC ≥ 3) ── */}
            {hasToc && (
              <aside className="hidden lg:block">
                <div className="sticky top-35 space-y-6">
                  <TableOfContents
                    headings={headings}
                    tocTitle={t("toc_title")}
                    mode="desktop"
                  />
                </div>
              </aside>
            )}

          </div>
        </div>
      </article>

      {/* ⑦  FAQ Section ──────────────────────────────────────────────────── */}
      <FaqSection 
        title={t("faq_title")} 
        items={t.raw("faq_items") || DEFAULT_FAQ_ITEMS} 
      />

      {/* ⑩  Author Authority Block ──────────────────────────────────────── */}
      {newsItem.author && (
        <AuthorBlock
          name={newsItem.author}
          bio={authorBio}
          label={t("author_label")}
          title={t("author_title")}
          viewMoreLabel={t("author_view_more")}
          socialLinks={{
            facebook: "https://www.facebook.com/viorawine",
            zalo: "https://zalo.me/0338909973",
          }}
        />
      )}

      {/* ⑪  Comment Section ─────────────────────────────────────────────── */}
      <CommentSection articleId={newsItem.id} />

      {/* ⑨  Related Posts ────────────────────────────────────────────────── */}
      {relatedNews.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 md:text-[24px]">
                {t("related_title")}
              </h2>
              <Link
                href="/blog"
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
                  <Link href={{ pathname: '/blog/[slug]', params: { slug: item.slug } }} className="group block">
                    <div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title[locale]}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-700   backdrop-blur-sm">
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
