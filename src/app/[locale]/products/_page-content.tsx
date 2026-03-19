'use client';

import { useTranslations, useLocale } from 'next-intl';
import { PRODUCTS } from '@/constants/products';
import ProductCard from '@/components/page/product-card';
import { Link } from '@/i18n/routing';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronDown, HiX } from 'react-icons/hi';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { useSearchParams, useRouter } from 'next/navigation';

interface FilterProps {
  isMobile?: boolean;
  openSections: { cat: boolean; origin: boolean; price: boolean };
  setOpenSections: React.Dispatch<React.SetStateAction<{ cat: boolean; origin: boolean; price: boolean }>>;
  categoryFilter: string;
  originFilter: string;
  priceFilter: string;
  updateFilter: (key: string, value: string) => void;
  closeDrawer?: () => void;
  categories: { id: string; name: string }[];
  origins: { id: string; name: string }[];
  priceRanges: { id: string; name: string }[];
}

const FilterContent = ({ 
  isMobile = false, 
  openSections, 
  setOpenSections, 
  categoryFilter, 
  originFilter, 
  priceFilter, 
  updateFilter,
  closeDrawer,
  categories,
  origins,
  priceRanges
}: FilterProps) => (
  <div className={`space-y-8 ${isMobile ? 'pb-20' : 'max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar px-1'}`}>
    {/* Category Filter */}
    <div className="border-b border-gray-50 pb-6">
      <button 
        onClick={() => setOpenSections(prev => ({...prev, cat: !prev.cat}))}
        className="w-full text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center justify-between group hover:text-brand-primary transition-colors"
      >
        <span>Loại rượu</span>
        <HiChevronDown className={`transition-transform duration-300 ${openSections.cat ? 'rotate-180' : ''}`} size={16} />
      </button>
      <AnimatePresence initial={true}>
        {openSections.cat && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="category"
                      checked={categoryFilter === cat.id}
                      onChange={() => {
                        updateFilter('cat', cat.id);
                        if (isMobile && closeDrawer) closeDrawer();
                      }}
                      className="peer appearance-none w-5 h-5 lg:w-4 lg:h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 lg:w-2 lg:h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className={`text-base lg:text-[13px] transition-colors ${categoryFilter === cat.id ? 'text-brand-primary font-medium' : 'text-gray-600 group-hover:text-brand-primary'}`}>
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Origin Filter */}
    <div className="border-b border-gray-50 pb-6">
      <button 
        onClick={() => setOpenSections(prev => ({...prev, origin: !prev.origin}))}
        className="w-full text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center justify-between group hover:text-brand-primary transition-colors"
      >
        <span>Quốc gia</span>
        <HiChevronDown className={`transition-transform duration-300 ${openSections.origin ? 'rotate-180' : ''}`} size={16} />
      </button>
      <AnimatePresence>
        {openSections.origin && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              {origins.map((origin) => (
                <label key={origin.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="origin"
                      checked={originFilter === origin.id}
                      onChange={() => {
                        updateFilter('origin', origin.id);
                        if (isMobile && closeDrawer) closeDrawer();
                      }}
                      className="peer appearance-none w-5 h-5 lg:w-4 lg:h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 lg:w-2 lg:h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className={`text-base lg:text-[13px] transition-colors ${originFilter === origin.id ? 'text-brand-primary font-medium' : 'text-gray-600 group-hover:text-brand-primary'}`}>
                    {origin.name}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Price Filter */}
    <div className="border-b border-gray-50 pb-6">
      <button 
        onClick={() => setOpenSections(prev => ({...prev, price: !prev.price}))}
        className="w-full text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center justify-between group hover:text-brand-primary transition-colors"
      >
        <span>Mức giá</span>
        <HiChevronDown className={`transition-transform duration-300 ${openSections.price ? 'rotate-180' : ''}`} size={16} />
      </button>
      <AnimatePresence>
        {openSections.price && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === range.id}
                      onChange={() => {
                        updateFilter('price', range.id);
                        if (isMobile && closeDrawer) closeDrawer();
                      }}
                      className="peer appearance-none w-5 h-5 lg:w-4 lg:h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
                    />
                    <div className="absolute w-2.5 h-2.5 lg:w-2 lg:h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className={`text-base lg:text-[13px] transition-colors ${priceFilter === range.id ? 'text-brand-primary font-medium' : 'text-gray-600 group-hover:text-brand-primary'}`}>
                    {range.name}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

export default function ProductsPageContent() {
  const t = useTranslations('common');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('cat') || 'all';
  const originFilter = searchParams.get('origin') || 'all';
  const priceFilter = searchParams.get('price') || 'all';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    cat: true,
    origin: true,
    price: true
  });

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const categories = [
    { id: 'all', name: locale === 'vi' ? 'Tất cả' : 'All' },
    { id: 'wine', name: locale === 'vi' ? 'Rượu vang' : 'Wines' },
    { id: 'whisky', name: locale === 'vi' ? 'Whisky' : 'Whisky' },
    { id: 'spirits', name: locale === 'vi' ? 'Rượu mạnh' : 'Spirits' },
    { id: 'combo', name: locale === 'vi' ? 'Combo' : 'Combos' },
    { id: 'gift', name: locale === 'vi' ? 'Gói quà' : 'Gifts' },
  ];

  const origins = [
    { id: 'all', name: locale === 'vi' ? 'Tất cả quốc gia' : 'All countries' },
    { id: 'Pháp', name: locale === 'vi' ? 'Pháp' : 'France' },
    { id: 'Scotland', name: locale === 'vi' ? 'Scotland' : 'Scotland' },
    { id: 'Mỹ', name: locale === 'vi' ? 'Mỹ' : 'USA' },
    { id: 'Úc', name: locale === 'vi' ? 'Úc' : 'Australia' },
    { id: 'Ý', name: locale === 'vi' ? 'Ý' : 'Italy' },
    { id: 'Nhật Bản', name: locale === 'vi' ? 'Nhật Bản' : 'Japan' },
  ];

  const priceRanges = [
    { id: 'all', name: locale === 'vi' ? 'Tất cả mức giá' : 'All prices' },
    { id: 'under-5', name: locale === 'vi' ? 'Dưới 5 triệu' : 'Under 5M' },
    { id: '5-10', name: locale === 'vi' ? '5 - 10 triệu' : '5 - 10M' },
    { id: '10-20', name: locale === 'vi' ? '10 - 20 triệu' : '10 - 20M' },
    { id: 'over-20', name: locale === 'vi' ? 'Trên 20 triệu' : 'Over 20M' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchOrigin = originFilter === 'all' || p.origin.includes(originFilter);
      
      const productName = (locale === 'vi' ? p.name.vi : p.name.en).toLowerCase();
      const matchSearch = !searchQuery || productName.includes(searchQuery.toLowerCase());

      let matchPrice = true;
      if (priceFilter === 'under-5') matchPrice = p.price < 5000000;
      else if (priceFilter === '5-10') matchPrice = p.price >= 5000000 && p.price <= 10000000;
      else if (priceFilter === '10-20') matchPrice = p.price > 10000000 && p.price <= 20000000;
      else if (priceFilter === 'over-20') matchPrice = p.price > 20000000;

      return matchCategory && matchOrigin && matchPrice && matchSearch;
    });
  }, [categoryFilter, originFilter, priceFilter, searchQuery, locale]);

  const currentCategoryName = searchQuery 
    ? (locale === 'vi' ? `Kết quả cho "${searchQuery}"` : `Results for "${searchQuery}"`)
    : (categories.find(c => c.id === categoryFilter)?.name || t('all'));

  const commonFilterProps = {
    openSections,
    setOpenSections,
    categoryFilter,
    originFilter,
    priceFilter,
    updateFilter,
    categories,
    origins,
    priceRanges
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header - Premium Redesign */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A0A0A]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-8 transition-opacity hover:opacity-100">
              <Link href="/" className="hover:text-brand-primary transition-colors">TRANG CHỦ</Link>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="text-white/80">CỬA HÀNG</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-brand-primary"></div>
                <span className="text-brand-primary text-[11px] uppercase tracking-[0.4em] font-black">
                  BỘ SƯU TẬP ĐỘC QUYỀN
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight font-black tracking-tight">
                {currentCategoryName}
              </h1>
              
              <p className="text-gray-400 text-sm md:text-lg font-medium max-w-xl leading-relaxed italic opacity-80 border-l-2 border-brand-primary/30 pl-6 py-1">
                &ldquo;Khám phá tinh hoa nghệ thuật thưởng thức qua những dòng rượu tuyển chọn từ các điền trang danh tiếng hàng đầu thế giới.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile Filter Trigger */}
          <div className="lg:hidden flex items-center justify-between mb-4 sticky top-20 z-30 bg-white/80 backdrop-blur-md py-3 px-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
              Công cụ tìm kiếm
            </p>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-brand-primary/20 active:scale-95 transition-all"
            >
              <HiAdjustmentsHorizontal size={18} />
              BỘ LỌC
            </button>
          </div>

          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-32 self-start">
            <h2 className="text-xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-4">Bộ lọc</h2>
            <FilterContent {...commonFilterProps} />
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                />
                {/* Drawer */}
                <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[60] lg:hidden shadow-2xl flex flex-col"
                >
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-serif text-gray-900">Bộ lọc</h2>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500"
                    >
                      <HiX size={24} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <FilterContent 
                      isMobile={true} 
                      closeDrawer={() => setIsFilterOpen(false)} 
                      {...commonFilterProps} 
                    />
                  </div>
                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4">
                    <button 
                      onClick={() => {
                        router.push('/products');
                        setIsFilterOpen(false);
                      }}
                      className="flex-1 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest"
                    >
                      Xoá bộ lọc
                    </button>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 bg-brand-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20"
                    >
                      Áp dụng
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-8">
              <p className="text-[13px] text-gray-400 font-light">
                Hiển thị <span className="text-gray-900 font-medium">{filteredProducts.length}</span> sản phẩm
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10 pb-20"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 lg:py-40 bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-black/5 px-8 flex flex-col items-center max-w-2xl mx-auto"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative">
                  <HiAdjustmentsHorizontal size={40} className="text-gray-300" />
                  <div className="absolute top-0 right-0 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white border-4 border-white">
                    <HiX size={14} />
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-4 font-black">
                  Không tìm thấy sản phẩm
                </h3>
                
                <p className="text-gray-500 text-sm lg:text-base font-medium max-w-sm mx-auto leading-relaxed mb-10 opacity-70">
                  Rất tiếc, hiện tại không có sản phẩm nào phù hợp với bộ lọc và tiêu chí tìm kiếm của bạn. Hãy thử thay đổi bộ lọc khác nhé.
                </p>
                
                <button 
                  onClick={() => router.push('/products')}
                  className="bg-brand-primary text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-primary/30 hover:shadow-brand-primary/50 transition-all active:scale-95"
                >
                  Xóa tất cả bộ lọc
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
