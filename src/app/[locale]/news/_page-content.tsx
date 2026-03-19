'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS } from '@/constants/news';
import { HiOutlineCalendar, HiOutlineClock, HiArrowNarrowRight } from 'react-icons/hi';

const CATEGORIES = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All' } },
  { id: 'knowledge', label: { vi: 'Kiến thức rượu', en: 'Wine Knowledge' } },
  { id: 'event', label: { vi: 'Sự kiện', en: 'Events' } },
  { id: 'tasting', label: { vi: 'Góc thưởng thức', en: 'Tasting Corner' } },
  { id: 'news', label: { vi: 'Tin mới', en: 'New News' } },
];

export default function NewsPageContent() {
  const locale = useLocale();
  const t = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredNews = activeCategory === 'all' 
    ? NEWS 
    : NEWS.filter(item => item.category === activeCategory);

  const featuredNews = NEWS.find(item => item.featured) || NEWS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* Premium Hero Header */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-8 transition-opacity hover:opacity-100">
              <Link href="/" className="hover:text-brand-primary transition-colors uppercase">TRANG CHỦ</Link>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="text-white/80 uppercase">KIẾN THỨC & SỰ KIỆN</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-brand-primary"></div>
                <span className="text-brand-primary text-[11px] uppercase tracking-[0.4em] font-black">
                  Tạp chí thượng lưu
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight font-black tracking-tight">
                Kiến Thức & <br className="hidden md:block" /> Sự Kiện
              </h1>
              
              <p className="text-gray-400 text-sm md:text-lg font-medium max-w-xl leading-relaxed italic opacity-80 border-l-2 border-brand-primary/30 pl-6 py-1">
                &ldquo;Cập nhật những kiến thức chuyên sâu và những câu chuyện tinh hoa đằng sau mỗi chai rượu vang thượng hạng.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-10 relative z-20">
        {/* Categories Filter - Integrated & Modern */}
        <div className="bg-white p-2 rounded-2xl lg:rounded-full shadow-2xl shadow-black/5 border border-gray-100 mb-20 flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-4 rounded-full text-[12px] uppercase tracking-widest font-black transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/30'
                  : 'bg-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              {locale === 'vi' ? cat.label.vi : cat.label.en}
            </button>
          ))}
        </div>

        {/* Featured Post - High-End Layout */}
        {activeCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-32"
          >
            <Link href={`/news/${featuredNews.slug}`} className="group block">
              <div className="relative bg-white rounded-[40px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px] shadow-2xl shadow-black/5 border border-gray-50 transition-all hover:shadow-brand-primary/5">
                <div className="lg:col-span-7 relative min-h-[400px] lg:min-h-full overflow-hidden">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title[locale as 'vi' | 'en']}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                </div>
                <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center bg-[#F8F9FA] relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -z-0"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2 bg-brand-primary text-white text-[10px] uppercase tracking-[0.3em] font-black px-4 py-1.5 rounded-full mb-8 shadow-lg shadow-brand-primary/20">
                      BÀI VIẾT TIÊU BIỂU
                    </span>
                    
                    <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-6 group-hover:text-brand-primary transition-colors leading-tight font-black">
                      {featuredNews.title[locale as 'vi' | 'en']}
                    </h2>
                    
                    <p className="text-gray-500 font-medium mb-10 line-clamp-3 leading-relaxed text-lg">
                      {featuredNews.excerpt[locale as 'vi' | 'en']}
                    </p>
                    
                    <div className="flex items-center gap-8 text-gray-400 text-[11px] uppercase tracking-widest font-bold mb-10 pb-10 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <HiOutlineCalendar size={18} className="text-brand-primary" />
                        {featuredNews.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlineClock size={14} className="text-brand-primary" />
                        {featuredNews.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-brand-primary font-black text-xs uppercase tracking-[0.3em] group/btn transition-all">
                      Đọc tiếp câu chuyện 
                      <HiArrowNarrowRight className="group-hover/btn:translate-x-3 transition-transform duration-300" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
          <div>
            <span className="text-brand-primary text-[10px] uppercase tracking-[0.4em] font-black mb-2 block">CÓ THỂ BẠN QUAN TÂM</span>
            <h2 className="text-4xl font-serif text-gray-900 font-black">Khám phá nội dung khác</h2>
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">
            {filteredNews.length} Bài viết được tìm thấy
          </p>
        </div>

        {/* News Grid - Staggered & Clean */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 pb-32">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Link href={`/news/${item.slug}`} className="group block h-full">
                    <div className="flex flex-col h-full bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50">
                      <div className="relative h-72 lg:h-80 overflow-hidden rounded-2xl mb-8">
                        <Image
                          src={item.image}
                          alt={item.title[locale as 'vi' | 'en']}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[9px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-full shadow-xl">
                            {CATEGORIES.find(c => c.id === item.category)?.label[locale as 'vi' | 'en']}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 pb-8 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                          <span>{item.date}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                          <span>{item.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl lg:text-2xl font-serif text-gray-900 mb-6 group-hover:text-brand-primary transition-colors line-clamp-2 leading-tight font-black">
                          {item.title[locale as 'vi' | 'en']}
                        </h3>
                        
                        <p className="text-gray-500 text-[14px] font-medium mb-8 line-clamp-3 leading-relaxed flex-1 italic opacity-80">
                          {item.excerpt[locale as 'vi' | 'en']}
                        </p>
                        
                        <div className="flex items-center gap-2 text-gray-900 font-black text-[11px] uppercase tracking-widest group/more">
                          Xem chi tiết 
                          <span className="w-8 h-px bg-gray-200 group-hover/more:w-12 group-hover/more:bg-brand-primary transition-all duration-300"></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 lg:py-40 flex flex-col items-center bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-black/5 px-8 max-w-4xl mx-auto mb-32"
          >
            <div className="w-32 h-32 bg-[#F8F9FA] rounded-[40px] flex items-center justify-center mb-10 relative rotate-6">
              <HiOutlineClock size={48} className="text-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center -rotate-6">
                <span className="text-4xl">🗞️</span>
              </div>
            </div>
            
            <h3 className="text-2xl lg:text-4xl font-serif text-gray-900 mb-6 font-black tracking-tight">
              Chưa có nội dung cho chuyên mục này
            </h3>
            
            <p className="text-gray-400 text-sm lg:text-lg font-medium max-w-lg mx-auto leading-relaxed mb-12 italic opacity-80">
              &ldquo;Các biên tập viên của chúng tôi đang tích cực biên soạn những câu chuyện tinh hoa nhất. Vui lòng quay lại sau ít phút hoặc khám phá các chuyên mục khác.&rdquo;
            </p>
            
            <button 
              onClick={() => setActiveCategory('all')}
              className="bg-brand-primary text-white px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-primary/30 hover:scale-105 transition-all active:scale-95"
            >
              Xem tất cả bài viết
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
