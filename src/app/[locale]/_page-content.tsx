'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { PRODUCTS } from '@/constants/products';
import ProductCard from '@/components/page/product-card';
import KnowledgeSection from '@/components/page/knowledge-section';
import { HiOutlineGift, HiOutlineSparkles, HiOutlineTruck, HiOutlineShieldCheck } from 'react-icons/hi';

export default function HomePageContent() {
  const t = useTranslations('home');
  const commonT = useTranslations('common');
  const locale = useLocale();

  const bestSellers = PRODUCTS.filter(p => p.isBestseller);
  const combos = PRODUCTS.filter(p => p.category === 'combo');
  const gifts = PRODUCTS.filter(p => p.category === 'gift');

  return (
    <div className="flex flex-col gap-0 pb-24">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-85px)] lg:h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/hero/1920/1080"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-brand-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tight"
          >
            {t('hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('hero_subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/products"
              className="inline-block bg-brand-primary text-white font-bold py-5 px-12 rounded-full hover:bg-white hover:text-brand-primary transition-all transform hover:scale-105 shadow-2xl active:scale-95"
            >
              {commonT('see_more')}
            </Link>
          </motion.div>
        </div>
      </section>

        {/* Categories */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-primary mb-4">{t('categories')}</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: commonT('categories_list.wine'), img: 'https://picsum.photos/seed/wine_cat/800/800', path: '/products?cat=wine' },
              { name: commonT('categories_list.whisky'), img: 'https://picsum.photos/seed/whisky_cat/800/800', path: '/products?cat=whisky' },
              { name: commonT('categories_list.spirits'), img: 'https://picsum.photos/seed/spirits_cat/800/800', path: '/products?cat=spirits' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.path}
                className="relative h-80 group overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-serif text-white border-b-2 border-brand-primary pb-2">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-brand-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: HiOutlineTruck, title: commonT('features.delivery.title'), desc: commonT('features.delivery.desc') },
              { icon: HiOutlineSparkles, title: commonT('features.advice.title'), desc: commonT('features.advice.desc') },
              { icon: HiOutlineShieldCheck, title: commonT('features.authentic.title'), desc: commonT('features.authentic.desc') },
              { icon: HiOutlineGift, title: commonT('features.gift.title'), desc: commonT('features.gift.desc') },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center text-white group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <feature.icon className="text-brand-primary" size={28} />
                </div>
                <h4 className="text-[13px] font-bold mb-1 tracking-wide uppercase">{feature.title}</h4>
                <p className="text-[11px] text-gray-500 font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand-primary mb-4">{t('bestseller')}</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.slice(4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    

      {/* Combo Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand-primary mb-4">{t('combos')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t('combos_subtitle')}</p>
          <div className="w-24 h-1 bg-brand-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Gift Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-primary mb-4">{t('gifts')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('gifts_subtitle')}</p>
            <div className="w-24 h-1 bg-brand-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gifts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <KnowledgeSection />

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-brand-primary mb-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
            </svg>
          </div>
          <blockquote className="text-2xl md:text-3xl font-serif text-brand-black mb-8 leading-relaxed italic">
            "Luxury WineHouse không chỉ bán rượu, họ bán những trải nghiệm văn hóa. Sự am hiểu của đội ngũ tư vấn giúp tôi luôn tìm được chai vang hoàn hảo cho mỗi bữa tiệc."
          </blockquote>
          <p className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-8">
            - MR. HOANG NGUYEN, WINE CONNOISSEUR
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
