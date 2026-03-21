'use client';

import { useLocale } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronDown, HiX } from 'react-icons/hi';
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { supabase } from '@/lib/supabase-client';
import CardProduct from '@/components/page/card-product';
import type { DbProduct } from '@/@types/product';

// ─── Category tabs (like GoodWineSection) ───────────────────────────────────
const CATEGORY_TABS = [
  { id: 'all',     vi: 'TẤT CẢ',     en: 'ALL'     },
  { id: 'wine',    vi: 'RƯỢU VANG',  en: 'WINES'   },
  { id: 'whisky',  vi: 'WHISKY',     en: 'WHISKY'  },
  { id: 'spirits', vi: 'RƯỢU MẠNH', en: 'SPIRITS' },
  { id: 'combo',   vi: 'COMBO',      en: 'COMBOS'  },
  { id: 'gift',    vi: 'QUÀ TẶNG',  en: 'GIFTS'   },
];

const PRICE_RANGES = [
  { id: 'all',     vi: 'Tất cả mức giá', en: 'All prices' },
  { id: 'under-5', vi: 'Dưới 5 triệu',  en: 'Under 5M'   },
  { id: '5-10',    vi: '5 – 10 triệu',  en: '5 – 10M'    },
  { id: '10-20',   vi: '10 – 20 triệu', en: '10 – 20M'   },
  { id: 'over-20', vi: 'Trên 20 triệu', en: 'Over 20M'   },
];

// ─── Collapsible filter section ──────────────────────────────────────────────
function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-brand-primary transition-colors"
      >
        <span>{title}</span>
        <HiChevronDown
          size={15}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Radio option ─────────────────────────────────────────────────────────────
function RadioOption({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-4 h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
        />
        <div className="absolute w-2 h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
      <span
        className={`text-[13px] transition-colors ${
          checked
            ? 'text-brand-primary font-medium'
            : 'text-gray-600 group-hover:text-brand-primary'
        }`}
      >
        {label}
      </span>
    </label>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductsPageContent() {
  const locale   = useLocale();
  const searchParams = useSearchParams();
  const router   = useRouter();

  const categoryFilter = searchParams.get('cat')   || 'all';
  const priceFilter    = searchParams.get('price') || 'all';

  const [products,     setProducts]     = useState<DbProduct[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [searchInput,  setSearchInput]  = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceOpen,    setPriceOpen]    = useState(true);

  // Fetch all products once
  useEffect(() => {
    supabase
      .from('products')
      .select('id, name, description, thumbnail_url, content, price, discount_percentage, category, stock, is_hot')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setProducts(data as DbProduct[]);
        setLoading(false);
      });
  }, []);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete(key);
    else params.set(key, value);
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    setSearchInput('');
    router.push('/products', { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat    = categoryFilter === 'all' || p.category === categoryFilter;
      const matchSearch = !searchInput   || p.name.toLowerCase().includes(searchInput.toLowerCase());
      let matchPrice = true;
      if      (priceFilter === 'under-5') matchPrice = p.price < 5_000_000;
      else if (priceFilter === '5-10')    matchPrice = p.price >= 5_000_000  && p.price <= 10_000_000;
      else if (priceFilter === '10-20')   matchPrice = p.price >  10_000_000 && p.price <= 20_000_000;
      else if (priceFilter === 'over-20') matchPrice = p.price >  20_000_000;
      return matchCat && matchSearch && matchPrice;
    });
  }, [products, categoryFilter, priceFilter, searchInput]);

  const hasActiveFilters = categoryFilter !== 'all' || priceFilter !== 'all' || searchInput;

  // Shared filter content (sidebar + drawer)
  const filterContent = (isMobile = false) => (
    <FilterSection
      title={locale === 'vi' ? 'Mức giá' : 'Price range'}
      isOpen={priceOpen}
      onToggle={() => setPriceOpen((v) => !v)}
    >
      {PRICE_RANGES.map((r) => (
        <RadioOption
          key={r.id}
          name="price"
          checked={priceFilter === r.id}
          onChange={() => { updateFilter('price', r.id); if (isMobile) setIsFilterOpen(false); }}
          label={locale === 'vi' ? r.vi : r.en}
        />
      ))}
    </FilterSection>
  );

  return (
    <div className="flex flex-col min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-5 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-brand-primary/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-primary/8 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-10">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              {locale === 'vi' ? 'Trang chủ' : 'Home'}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/70">{locale === 'vi' ? 'Cửa hàng' : 'Shop'}</span>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-0.5 bg-brand-primary" />
            <span className="text-brand-primary text-[10px] uppercase tracking-[0.4em] font-black">
              {locale === 'vi' ? 'Bộ sưu tập độc quyền' : 'Exclusive Collection'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase mb-6 leading-none">
            {locale === 'vi' ? 'Cửa hàng' : 'Shop'}
          </h1>

          <p className="text-gray-500 text-sm md:text-base font-light max-w-lg leading-relaxed border-l-2 border-brand-primary/30 pl-5 py-1 italic">
            {locale === 'vi'
              ? 'Khám phá tinh hoa nghệ thuật thưởng thức qua những dòng rượu tuyển chọn từ các điền trang danh tiếng hàng đầu thế giới.'
              : "Discover the finest wines and spirits from the world's most prestigious estates."}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CATEGORY TABS + SEARCH — sticky, white, like GoodWineSection
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 sticky top-18 z-30 shadow-sm">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-8">

            {/* Category tabs */}
            <div className="no-scrollbar flex gap-6 overflow-x-auto flex-1">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => updateFilter('cat', tab.id)}
                  className={`shrink-0 py-3.5 text-[12px] font-semibold tracking-wider transition-colors border-b-2 ${
                    categoryFilter === tab.id
                      ? 'border-brand-primary text-brand-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {locale === 'vi' ? tab.vi : tab.en}
                </button>
              ))}
            </div>

            {/* Desktop search */}
            <div className="hidden lg:flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 w-52 shrink-0 focus-within:border-brand-primary transition-colors">
              <HiMagnifyingGlass className="text-gray-400 shrink-0" size={15} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={locale === 'vi' ? 'Tìm kiếm...' : 'Search...'}
                className="bg-transparent outline-none text-[13px] text-gray-700 w-full placeholder:text-gray-400"
              />
              {searchInput && (
                <button onClick={() => setSearchInput('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <HiX size={14} />
                </button>
              )}
            </div>

            {/* Mobile filter trigger */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 shrink-0 py-3.5 hover:text-brand-primary transition-colors"
            >
              <HiAdjustmentsHorizontal size={17} />
              {locale === 'vi' ? 'Lọc' : 'Filter'}
              {priceFilter !== 'all' && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full">

        {/* Mobile search */}
        <div className="lg:hidden flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 mb-8 focus-within:border-brand-primary transition-colors">
          <HiMagnifyingGlass className="text-gray-400 shrink-0" size={16} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={locale === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...'}
            className="bg-transparent outline-none text-[14px] text-gray-700 w-full placeholder:text-gray-400"
          />
          {searchInput && (
            <button onClick={() => setSearchInput('')} className="text-gray-400">
              <HiX size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-10 lg:gap-14">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-48 shrink-0 sticky top-40 self-start">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-widest font-black text-gray-900">
                {locale === 'vi' ? 'Bộ lọc' : 'Filters'}
              </span>
              {priceFilter !== 'all' && (
                <button
                  onClick={() => updateFilter('price', 'all')}
                  className="text-[10px] text-brand-primary hover:underline uppercase tracking-wider font-bold"
                >
                  {locale === 'vi' ? 'Xóa' : 'Clear'}
                </button>
              )}
            </div>
            {filterContent()}
          </aside>

          {/* ── Product area ── */}
          <main className="flex-1 min-w-0">

            {/* Count + clear row */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
                {loading
                  ? (locale === 'vi' ? 'Đang tải...' : 'Loading...')
                  : `${filteredProducts.length} ${locale === 'vi' ? 'sản phẩm' : 'products'}`}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-[11px] text-brand-primary hover:underline uppercase tracking-wider font-bold"
                >
                  <HiX size={12} />
                  {locale === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'}
                </button>
              )}
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
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 pb-16"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
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
                  {locale === 'vi' ? 'Không tìm thấy sản phẩm' : 'No products found'}
                </h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-8">
                  {locale === 'vi'
                    ? 'Không có sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử lại với tiêu chí khác.'
                    : 'No products match your current filters. Try adjusting your criteria.'}
                </p>
                <button
                  onClick={clearAll}
                  className="bg-brand-primary text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 transition-all active:scale-95"
                >
                  {locale === 'vi' ? 'Xóa tất cả bộ lọc' : 'Clear all filters'}
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE FILTER DRAWER
      ═══════════════════════════════════════════════════════════════════════ */}
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
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[60] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="text-[11px] uppercase tracking-widest font-black text-gray-900">
                  {locale === 'vi' ? 'Bộ lọc' : 'Filters'}
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
                  {locale === 'vi' ? 'Xóa bộ lọc' : 'Clear'}
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 bg-brand-primary text-white py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20"
                >
                  {locale === 'vi' ? 'Áp dụng' : 'Apply'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
