'use client';

import { useTranslations, useLocale } from 'next-intl';
import { PRODUCTS } from '@/constants/products';
import ProductCard from '@/components/page/product-card';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronDown } from 'react-icons/hi';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProductsPageContent() {
  const t = useTranslations('common');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('cat') || 'all';
  const originFilter = searchParams.get('origin') || 'all';
  const priceFilter = searchParams.get('price') || 'all';

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

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="bg-brand-black pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-brand-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">
              BỘ SƯU TẬP
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
              {currentCategoryName}
            </h1>
            <p className="text-gray-400 text-sm font-light max-w-xl leading-relaxed">
              Khám phá bộ sưu tập rượu cao cấp được tuyển chọn kỹ lưỡng từ những vùng rượu danh tiếng nhất thế giới.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-10">
              <h2 className="text-xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-4">Bộ lọc</h2>

              {/* Category Filter */}
              <div>
                <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center justify-between">
                  Loại rượu <HiChevronDown />
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="category"
                          checked={categoryFilter === cat.id}
                          onChange={() => updateFilter('cat', cat.id)}
                          className="peer appearance-none w-4 h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
                        />
                        <div className="absolute w-2 h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className={`text-[13px] transition-colors ${categoryFilter === cat.id ? 'text-brand-primary font-medium' : 'text-gray-600 group-hover:text-brand-primary'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin Filter */}
              <div>
                <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center justify-between">
                  Quốc gia <HiChevronDown />
                </h3>
                <div className="space-y-3">
                  {origins.map((origin) => (
                    <label key={origin.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="origin"
                          checked={originFilter === origin.id}
                          onChange={() => updateFilter('origin', origin.id)}
                          className="peer appearance-none w-4 h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
                        />
                        <div className="absolute w-2 h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className={`text-[13px] transition-colors ${originFilter === origin.id ? 'text-brand-primary font-medium' : 'text-gray-600 group-hover:text-brand-primary'}`}>
                        {origin.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center justify-between">
                  Mức giá <HiChevronDown />
                </h3>
                <div className="space-y-3">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="price"
                          checked={priceFilter === range.id}
                          onChange={() => updateFilter('price', range.id)}
                          className="peer appearance-none w-4 h-4 rounded-full border border-gray-300 checked:border-brand-primary transition-all"
                        />
                        <div className="absolute w-2 h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className={`text-[13px] transition-colors ${priceFilter === range.id ? 'text-brand-primary font-medium' : 'text-gray-600 group-hover:text-brand-primary'}`}>
                        {range.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[13px] text-gray-400 font-light">
                Hiển thị <span className="text-gray-900 font-medium">{filteredProducts.length}</span> sản phẩm
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 italic font-light">Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.</p>
                <button 
                  onClick={() => router.push('/products')}
                  className="mt-6 text-brand-primary text-sm font-bold underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
