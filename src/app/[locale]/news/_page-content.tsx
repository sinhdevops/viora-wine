'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS } from '@/constants/news';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineArrowRight } from 'react-icons/hi';

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
    <div className="pt-24 pb-24 bg-[#FDFDFD]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-[11px] uppercase tracking-[0.3em] font-bold">
              TIN TỨC & BÀI VIẾT
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
            Khám phá thế giới rượu
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
            Cập nhật những kiến thức, tin tức mới nhất về rượu vang, whisky và nghệ thuật thưởng thức.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {locale === 'vi' ? cat.label.vi : cat.label.en}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {activeCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <Link href={`/news/${featuredNews.slug}`} className="group block">
              <div className="bg-brand-black rounded-[40px] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[450px] shadow-2xl">
                <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title[locale as 'vi' | 'en']}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                  <span className="bg-brand-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full w-fit mb-6">
                    {featuredNews.category === 'knowledge' ? 'Kiến thức rượu' : featuredNews.category}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-serif text-white mb-6 group-hover:text-brand-primary transition-colors leading-tight">
                    {featuredNews.title[locale as 'vi' | 'en']}
                  </h2>
                  <p className="text-gray-400 font-light mb-8 line-clamp-2 leading-relaxed">
                    {featuredNews.excerpt[locale as 'vi' | 'en']}
                  </p>
                  <div className="flex items-center gap-6 text-gray-500 text-[12px] mb-8">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar size={16} />
                      {featuredNews.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineClock size={16} />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-brand-primary font-bold text-[13px] uppercase tracking-widest">
                    Đọc thêm <HiOutlineArrowRight />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* News Grid */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-serif text-gray-900">Tất cả bài viết</h2>
          <span className="text-gray-400 text-sm font-light">{filteredNews.length} bài viết</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link href={`/news/${item.slug}`} className="group block h-full">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title[locale as 'vi' | 'en']}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm">
                          {CATEGORIES.find(c => c.id === item.category)?.label[locale as 'vi' | 'en']}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-serif text-gray-900 mb-4 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                        {item.title[locale as 'vi' | 'en']}
                      </h3>
                      <p className="text-gray-500 text-[14px] font-light mb-6 line-clamp-3 leading-relaxed flex-1">
                        {item.excerpt[locale as 'vi' | 'en']}
                      </p>
                      <div className="flex items-center gap-6 text-gray-400 text-[11px] pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <HiOutlineCalendar size={14} />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineClock size={14} />
                          {item.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
