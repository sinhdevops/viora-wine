import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import { NEWS } from '@/constants/news';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export default function KnowledgeSection() {
  const t = useTranslations('home');
  const locale = useLocale();

  const latestNews = NEWS.slice(0, 4); // Show 4 items for better slider fill

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 overflow-hidden">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-4">{t('knowledge')}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base px-4">{t('knowledge_subtitle')}</p>
        <div className="w-20 md:w-24 h-1 bg-brand-primary mx-auto mt-4"></div>
      </div>

      {/* Desktop Grid (md and up) */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-3 gap-12">
        {latestNews.slice(0, 3).map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group hover-lift"
          >
            <Link href={`/news/${article.slug}`} className="block">
              <div className="relative h-72 mb-6 overflow-hidden rounded-3xl shadow-sm group-hover:shadow-xl transition-all">
                <Image
                  src={article.image}
                  alt={article.title[locale as 'vi' | 'en']}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 px-0"
                />
                <div className="absolute top-6 left-6 bg-brand-primary/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-bold">
                  {article.category === 'knowledge' ? (locale === 'vi' ? 'Kiến thức' : 'Knowledge') : (locale === 'vi' ? 'Sự kiện' : 'Event')}
                </div>
              </div>
              <p className="text-gray-400 text-[11px] mb-3 font-medium uppercase tracking-widest">{article.date}</p>
              <h3 className="text-xl font-serif text-gray-900 group-hover:text-brand-primary transition-colors leading-snug font-normal">
                {article.title[locale as 'vi' | 'en']}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Slider (below md) */}
      <div className="md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1.15}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="pb-12"
        >
          {latestNews.map((article) => (
            <SwiperSlide key={article.id}>
              <Link href={`/news/${article.slug}`} className="block">
                <div className="group active:scale-95 transition-transform duration-300">
                  <div className="relative aspect-4/5 w-full mb-6 overflow-hidden rounded-xl shadow-xl">
                    <Image
                      src={article.image}
                      alt={article.title[locale as 'vi' | 'en']}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-5 left-5 bg-brand-primary/95 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-black">
                      {article.category === 'knowledge' ? (locale === 'vi' ? 'Kiến thức' : 'Knowledge') : (locale === 'vi' ? 'Sự kiện' : 'Event')}
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-px bg-brand-primary/30"></span>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{article.date}</p>
                    </div>
                    <h3 className="text-lg font-serif text-gray-900 leading-snug font-black line-clamp-2">
                      {article.title[locale as 'vi' | 'en']}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 md:mt-16 text-center">
        <Link 
          href="/news" 
          className="inline-block border border-brand-primary text-brand-primary font-bold py-3 md:py-4 px-8 md:px-12 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-lg active:scale-95 text-sm md:text-base"
        >
          {locale === 'vi' ? 'Xem tất cả bài viết' : 'View all articles'}
        </Link>
      </div>
    </section>
  );
}
