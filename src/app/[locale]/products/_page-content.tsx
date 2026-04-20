'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronDown, HiX, HiChevronLeft, HiChevronRight, HiCheck } from 'react-icons/hi';
import { HiAdjustmentsHorizontal, HiMagnifyingGlass, HiArrowsUpDown, HiStar, HiSparkles } from 'react-icons/hi2';
import { HiTrendingUp } from 'react-icons/hi';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { supabase } from '@/lib/supabase-client';
import CardProduct from '@/components/page/card-product';
import type { DbProduct } from '@/@types/product';

const CATEGORY_TAB_IDS = ['all', 'wine', 'whisky', 'spirits', 'combo', 'gift'] as const;
const PRICE_RANGE_IDS = ['all', 'under-5', '5-10', '10-20', 'over-20'] as const;
const HOT_FILTER_IDS = ['all', 'hot'] as const;

type HotFilterId = (typeof HOT_FILTER_IDS)[number];
const PRODUCTS_PER_PAGE = 12; // TODO: đổi lại 12 sau khi test

const SORT_OPTIONS = [
  { value: 'default',     label: 'Mặc định',           icon: HiArrowsUpDown },
  { value: 'best_seller', label: 'Bán chạy nhất',       icon: HiTrendingUp },
  { value: 'top_rated',   label: 'Đánh giá cao nhất',   icon: HiStar },
  { value: 'newest',      label: 'Mới nhất',             icon: HiSparkles },
  { value: 'price_asc',   label: 'Giá: Thấp → Cao',     icon: HiArrowsUpDown },
  { value: 'price_desc',  label: 'Giá: Cao → Thấp',     icon: HiArrowsUpDown },
] as const;

function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0 w-full md:w-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[12px] font-semibold transition-all w-full md:w-auto justify-between md:justify-start
          ${open ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'}`}
      >
        <active.icon size={13} className="shrink-0" />
        <span>{active.label}</span>
        <HiChevronDown size={13} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-brand-primary' : 'text-gray-400'}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1.5"
          >
            {SORT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors text-left
                    ${isActive ? 'text-brand-primary bg-brand-primary/6 font-semibold' : 'text-gray-600 hover:bg-gray-50 font-medium'}`}
                >
                  <Icon size={14} className="shrink-0" />
                  <span className="flex-1">{opt.label}</span>
                  {isActive && <HiCheck size={14} className="shrink-0 text-brand-primary" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type PriceRangeId = (typeof PRICE_RANGE_IDS)[number];

// ─── Pagination ───────────────────────────────────────────────────────────────
function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const t = useTranslations('products_page');
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) return null;
  const pages = getPageNumbers(currentPage, totalPages);

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete('page');
    else params.set('page', page.toString());
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-1.5 pt-8 pb-6"
    >
      {/* Prev */}
      {currentPage === 1 ? (
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] opacity-30 cursor-not-allowed text-gray-500 border border-gray-200">
          <HiChevronLeft size={13} />
          <span className="hidden sm:inline">{t('pagination.prev')}</span>
        </div>
      ) : (
        <Link
          href={getPageUrl(currentPage - 1) as any}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 text-gray-500 border border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-md hover:shadow-brand-primary/30"
        >
          <HiChevronLeft size={13} />
          <span className="hidden sm:inline">{t('pagination.prev')}</span>
        </Link>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-300 text-[12px] select-none">
              ···
            </span>
          ) : (
            <Link
              key={page}
              href={getPageUrl(page) as any}
              className={`w-9 h-9 rounded-full text-[11px] font-black flex items-center justify-center transition-all duration-200 ${
                page === currentPage
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/40 scale-105'
                  : 'text-gray-500 hover:text-brand-primary hover:bg-brand-primary/8 border border-transparent hover:border-brand-primary/20'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage === totalPages ? (
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] opacity-30 cursor-not-allowed text-gray-500 border border-gray-200">
          <span className="hidden sm:inline">{t('pagination.next')}</span>
          <HiChevronRight size={13} />
        </div>
      ) : (
        <Link
          href={getPageUrl(currentPage + 1) as any}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 text-gray-500 border border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-md hover:shadow-brand-primary/30"
        >
          <span className="hidden sm:inline">{t('pagination.next')}</span>
          <HiChevronRight size={13} />
        </Link>
      )}
    </motion.div>
  );
}

// ─── Collapsible filter section ──────────────────────────────────────────────
function FilterSection({
  title,
  isOpen,
  onToggle,
  hasActive,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500 group-hover:text-gray-800 transition-colors">
            {title}
          </span>
          {hasActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
          )}
        </div>
        <HiChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Price pill options ───────────────────────────────────────────────────────
function PriceOptions({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const isActive = opt.id === value;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm shadow-brand-primary/30'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Toggle option ────────────────────────────────────────────────────────────
function ToggleOption({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <div
      onClick={onChange}
      className="flex items-center justify-between py-1 cursor-pointer group"
    >
      <span className={`text-[13px] font-semibold transition-colors ${checked ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
        {label}
      </span>
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${
          checked ? 'bg-brand-primary' : 'bg-gray-200 group-hover:bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductsPageContent() {
  const t = useTranslations('products_page');
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFilter = searchParams.get('cat') || 'all';
  const priceFilter = (searchParams.get('price') || 'all') as PriceRangeId;
  const hotFilter = (searchParams.get('hot') || 'all') as HotFilterId;

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [hotOpen, setHotOpen] = useState(true);
  const currentPage = Number(searchParams.get('page')) || 1;
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    supabase
      .from('products')
      .select('id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot, rating, sold_count, created_at')
      .order('sold_count', { ascending: false })
      .then(({ data }) => {
        if (data) setProducts(data as DbProduct[]);
        setLoading(false);
      });
  }, []);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete(key);
    else params.set(key, value);
    params.delete('page');
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    setSearchInput('');
    router.push('/products', { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchSearch = !searchInput || p.name.toLowerCase().includes(searchInput.toLowerCase());
      let matchPrice = true;
      if (priceFilter === 'under-5') matchPrice = p.price < 5_000_000;
      else if (priceFilter === '5-10') matchPrice = p.price >= 5_000_000 && p.price <= 10_000_000;
      else if (priceFilter === '10-20') matchPrice = p.price > 10_000_000 && p.price <= 20_000_000;
      else if (priceFilter === 'over-20') matchPrice = p.price > 20_000_000;
      const matchHot = hotFilter === 'all' || p.is_hot === true;
      return matchCat && matchSearch && matchPrice && matchHot;
    });

    if (sortOrder === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'best_seller') {
      result.sort((a, b) => (b.sold_count ?? 0) - (a.sold_count ?? 0));
    } else if (sortOrder === 'top_rated') {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.sold_count ?? 0) - (a.sold_count ?? 0));
    } else if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime());
    } else {
      // default: sold_count DESC → nếu bằng nhau thì hot đứng trước
      result.sort((a, b) => {
        const soldDiff = (b.sold_count ?? 0) - (a.sold_count ?? 0);
        if (soldDiff !== 0) return soldDiff;
        if (b.is_hot !== a.is_hot) return b.is_hot ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [products, categoryFilter, priceFilter, hotFilter, searchInput, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  // Reset to page 1 when filters or sorting change
  useEffect(() => {
    if (currentPage !== 1 && !searchParams.get('page')) {
      // already page 1 implicitly
    }
  }, [categoryFilter, priceFilter, hotFilter, searchInput, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = categoryFilter !== 'all' || priceFilter !== 'all' || hotFilter !== 'all' || searchInput;

  const filterContent = (isMobile = false) => (
    <>
      <FilterSection
        title={t('price_range')}
        isOpen={priceOpen}
        onToggle={() => setPriceOpen((v) => !v)}
        hasActive={priceFilter !== 'all'}
      >
        <PriceOptions
          options={PRICE_RANGE_IDS.map((id) => ({ id, label: t(`price_range_tabs.${id}`) }))}
          value={priceFilter}
          onChange={(id) => {
            updateFilter('price', id);
            if (isMobile) setIsFilterOpen(false);
          }}
        />
      </FilterSection>
      <FilterSection
        title={t('hot_filter')}
        isOpen={hotOpen}
        onToggle={() => setHotOpen((v) => !v)}
        hasActive={hotFilter === 'hot'}
      >
        <ToggleOption
          checked={hotFilter === 'hot'}
          onChange={() => {
            updateFilter('hot', hotFilter === 'hot' ? 'all' : 'hot');
            if (isMobile) setIsFilterOpen(false);
          }}
          label={t('hot_filter_label')}
        />
      </FilterSection>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO */}
      <section className="relative py-5 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute -top-32 -right-32 w-120 h-120 bg-brand-primary/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-primary/8 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-10">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              {t('home')}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/70">{t('shop')}</span>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-0.5 bg-brand-primary" />
            <span className="text-brand-primary text-[10px] uppercase tracking-[0.4em] font-black">
              {t('exclusive_collection')}
            </span>
          </div>

          <div className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase mb-6 leading-none">
            {t('shop')}
          </div>

          <p className="text-gray-500 text-sm md:text-base font-light max-w-lg leading-relaxed border-l-2 border-brand-primary/30 pl-5 py-1 italic">
            {t('shop_desc')}
          </p>
        </div>
      </section>

      {/* CATEGORY TABS + SEARCH */}
      <div className="bg-white border-b border-gray-100 sticky top-19 z-30 shadow-sm">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-2.5">

            {/* Pill tabs */}
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto flex-1">
              {CATEGORY_TAB_IDS.map((id) => {
                const isActive = categoryFilter === id;
                return (
                  <button
                    key={id}
                    onClick={() => updateFilter('cat', id)}
                    className={`relative shrink-0 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-primary text-white'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {t(`tabs.${id}`)}
                  </button>
                );
              })}
            </div>

            {/* Desktop search */}
            <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-2 w-44 shrink-0 focus-within:border-brand-primary focus-within:bg-white focus-within:w-56 transition-all duration-300">
              <HiMagnifyingGlass className="text-gray-400 shrink-0" size={14} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('search_placeholder')}
                className="bg-transparent outline-none text-[12px] text-gray-700 w-full placeholder:text-gray-400"
              />
              {searchInput && (
                <button onClick={() => setSearchInput('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <HiX size={13} />
                </button>
              )}
            </div>

            {/* Mobile filter trigger */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                priceFilter !== 'all' || hotFilter !== 'all'
                  ? 'bg-brand-primary text-white'
                  : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <HiAdjustmentsHorizontal size={15} />
              {t('filter')}
              {(priceFilter !== 'all' || hotFilter !== 'all') && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full">

        {/* Mobile search */}
        <div className="lg:hidden flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 mb-8 focus-within:border-brand-primary transition-colors">
          <HiMagnifyingGlass className="text-gray-400 shrink-0" size={16} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('search_placeholder_mobile')}
            className="bg-transparent outline-none text-[14px] text-gray-700 w-full placeholder:text-gray-400"
          />
          {searchInput && (
            <button onClick={() => setSearchInput('')} className="text-gray-400">
              <HiX size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-10 lg:gap-14">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-40 self-start">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <HiAdjustmentsHorizontal size={15} className="text-gray-400" />
                <span className="text-[12px] uppercase tracking-widest font-black text-gray-800">
                  {t('filters')}
                </span>
              </div>
              {(priceFilter !== 'all' || hotFilter !== 'all') && (
                <button
                  onClick={() => { updateFilter('price', 'all'); updateFilter('hot', 'all'); }}
                  className="flex items-center gap-1 text-[11px] text-brand-primary hover:underline font-bold"
                >
                  <HiX size={11} />
                  {t('clear')}
                </button>
              )}
            </div>
            {filterContent()}
          </aside>

          {/* Product area */}
          <main className="flex-1 min-w-0">

            {/* Count + clear row + sort */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
                  {loading
                    ? t('loading')
                    : `${filteredProducts.length} ${t('count')}`}
                  {!loading && totalPages > 1 && (
                    <span className="ml-2 normal-case tracking-normal font-normal text-gray-300">
                      — {t('pagination.page_of', { current: currentPage, total: totalPages })}
                    </span>
                  )}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1 text-[11px] text-brand-primary hover:underline uppercase tracking-wider font-bold"
                  >
                    <HiX size={12} />
                    {t('clear_filters')}
                  </button>
                )}
              </div>

              <SortDropdown value={sortOrder} onChange={setSortOrder} />
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 pb-16">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-gray-100 animate-pulse aspect-216/290" />
                ))}
              </div>
            )}

            {/* Product grid */}
            {!loading && filteredProducts.length > 0 && (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardProduct product={product} isHot={product.is_hot} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            )}

            {/* Empty state */}
            {!loading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-24 px-8"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
                  <HiAdjustmentsHorizontal size={34} className="text-gray-200" />
                  <div className="absolute top-0 right-0 w-7 h-7 bg-brand-primary rounded-full flex items-center justify-center text-white border-4 border-white">
                    <HiX size={11} />
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-3">
                  {t('no_products_title')}
                </h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-8">
                  {t('no_products_desc')}
                </p>
                <button
                  onClick={clearAll}
                  className="bg-brand-primary text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 transition-all active:scale-95"
                >
                  {t('clear_all_filters')}
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-60 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="text-[11px] uppercase tracking-widest font-black text-gray-900">
                  {t('filters')}
                </span>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <HiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {filterContent(true)}
              </div>

              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/80 flex gap-3">
                <button
                  onClick={() => { clearAll(); setIsFilterOpen(false); }}
                  className="flex-1 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {t('clear_filters')}
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 bg-brand-primary text-white py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20"
                >
                  {t('apply')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
