'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { PRODUCTS } from '@/constants/products';
import ProductCard from '@/components/page/product-card';
import KnowledgeSection from '@/components/page/knowledge-section';
import { HiOutlineGift, HiOutlineSparkles, HiOutlineTruck, HiOutlineShieldCheck, HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { GiWineGlass, GiWineBottle } from 'react-icons/gi';
import { LuLayoutGrid } from "react-icons/lu";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function HomePageContent() {
  const t = useTranslations('home');
  const commonT = useTranslations('common');

  const bestSellers = PRODUCTS.filter(p => p.isBestseller);
  const combos = PRODUCTS.filter(p => p.category === 'combo');
  const gifts = PRODUCTS.filter(p => p.category === 'gift');

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: LuLayoutGrid },
    { id: 'red', name: 'Vang đỏ', icon: GiWineGlass },
    { id: 'white', name: 'Vang trắng', icon: GiWineGlass },
    { id: 'rose', name: 'Vang hồng', icon: GiWineGlass },
    { id: 'sparkling', name: 'Vang sủi', icon: GiWineBottle },
    { id: 'whisky', name: 'Whisky', icon: GiWineGlass },
    { id: 'decanter', name: 'Ly decanter', icon: GiWineBottle },
  ];

  // Helper for price formatting if needed, but the UI specifically says "254.100 đ"
  const featuredItems = Array(10).fill({
    name: "Rượu vang Ý Tavernello Montepulciano D'abruzzo",
    price: "254.100 đ",
    image: "https://res.cloudinary.com/dnngokucp/image/upload/v1773755507/edu-admin/programs/jw7nhgfhd9ksgg9zvrxi.png"
  });

  const testimonials = [
    {
      quote: "Viora Wine không chỉ bán rượu, họ bán những trải nghiệm văn hóa. Sự am hiểu của đội ngũ tư vấn giúp tôi luôn tìm được chai vang hoàn hảo cho mỗi bữa tiệc.",
      author: "MR. HOANG NGUYEN",
      role: "WINE CONNOISSEUR"
    },
    {
      quote: "Mỗi chai vang tại đây không chỉ là thức uống, mà là một câu chuyện về vùng đất và con người tạo ra nó. Tôi luôn tìm thấy sự đồng điệu tâm hồn trong từng giọt rượu.",
      author: "MS. KHANH VY",
      role: "WINE HOBBYIST"
    },
    {
      quote: "Rượu vang không dành cho người vội vã. Cảm ơn đội ngũ Viora đã kiên nhẫn dẫn dắt tôi khám phá thế giới hương vị đầy mê hoặc và chiều sâu này.",
      author: "MR. DUC ANH",
      role: "BUSINESSMAN"
    }
  ];

  return (
    <div className="flex flex-col gap-0 pb-24">
        <div className="pt-26 pb-10" style={{ background: 'linear-gradient(92.21deg, #BD1931 6.61%, #430F10 97.85%)' }}>
      {/* Hero Section */}
      <section 
        className="relative min-h-[85vh] overflow-hidden flex items-center"
        style={{ background: 'linear-gradient(92.21deg, #BD1931 6.61%, #430F10 97.85%)' }}
      >
        {/* Black background half screen - Exactly half width and full right */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full bg-black hidden lg:block"
          style={{ 
            borderTopLeftRadius: '240px', 
            borderBottomLeftRadius: '240px' 
          }}
        />

        <div className="container relative mx-auto px-4 lg:px-12 z-10 pt-20 pb-20 lg:pt-0 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left space-y-10 max-w-2xl relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight whitespace-pre-line uppercase font-sans">
                  {t('hero_title')}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-white/80 leading-relaxed font-medium"
              >
                {t('hero_subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#BD1931] font-bold rounded-2xl hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-xl uppercase tracking-wider text-sm lg:text-base"
                >
                  {commonT('contact_us')}
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Wine Bottle centered in the black half */}
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative aspect-square w-full"
              >
                <Image
                  src="https://res.cloudinary.com/dnngokucp/image/upload/v1773755507/edu-admin/programs/jw7nhgfhd9ksgg9zvrxi.png"
                  alt="Viora Wine Bottle"
                  fill
                  className="object-contain p-4 scale-125 select-none pointer-events-none"
                  priority
                />
              </motion.div>
            </div>

            {/* Mobile Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:hidden relative w-full aspect-square bg-black rounded-[60px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dnngokucp/image/upload/v1773755507/edu-admin/programs/jw7nhgfhd9ksgg9zvrxi.png"
                alt="Viora Wine Bottle"
                fill
                className="object-contain p-8"
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-black/20 to-transparent pointer-events-none"></div>
      </section>
    </div>

    {/* Featured Products Section */}
    <section className="bg-[#F5F5F5] py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-5 uppercase tracking-tight">
          Các sản phẩm nổi bật của chúng tôi
        </h2>

        {/* Category Filter Tabs - Optimized for Mobile UX (Horizontal Scroll) */}
        <div className="relative mb-12 -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex overflow-x-auto lg:flex-wrap gap-3 no-scrollbar py-2 scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border-2 transition-all duration-300 font-semibold text-sm shrink-0 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-brand-primary border-brand-primary text-white shadow-lg'
                    : 'bg-white border-transparent text-gray-700 hover:border-gray-200 shadow-sm'
                }`}
              >
                <cat.icon size={18} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-[#FFFFFF] rounded-lg p-3 flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-xl hover:bg-white border border-transparent hover:border-gray-100"
            >
              <div className="relative w-full aspect-3/4 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-full font-medium">
                <h3 className="line-clamp-2 min-h-[40px] mb-3 leading-snug">
                  {item.name}
                </h3>
                <p className="text-brand-primary font-black text-lg lg:text-xl xl:text-2xl">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#A3162A] transition-all transform hover:scale-105 active:scale-95 shadow-xl">
            <span>Xem thêm</span>
            <HiChevronDown size={20} />
          </button>
        </div>
      </div>
    </section>


        {/* Categories */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-primary mb-4">{t('categories')}</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: commonT('categories_list.wine'), img: 'https://picsum.photos/seed/wine_cat/800/800', path: '/products?cat=wine' },
              { name: commonT('categories_list.whisky'), img: 'https://picsum.photos/seed/whisky_cat/800/800', path: '/products?cat=whisky' },
              { name: commonT('categories_list.spirits'), img: 'https://picsum.photos/seed/spirits_cat/800/800', path: '/products?cat=spirits' },
              { name: commonT('gifts'), img: 'https://picsum.photos/seed/gift_cat/800/800', path: '/products?cat=gift' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.path}
                className="relative h-48 sm:h-64 md:h-80 group overflow-hidden rounded-2xl shadow-lg border-2 border-transparent hover:border-brand-primary transition-all duration-500"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-3xl font-serif text-white border-b-2 border-brand-primary pb-2">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar - Brand Primary Style */}
      <section className="bg-brand-primary py-16 relative overflow-hidden">
        {/* Subtle decorative pattern or glow */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-0 lg:divide-x lg:divide-white/20">
            {[
              { icon: HiOutlineTruck, title: commonT('features.delivery.title'), desc: commonT('features.delivery.desc') },
              { icon: HiOutlineSparkles, title: commonT('features.advice.title'), desc: commonT('features.advice.desc') },
              { icon: HiOutlineShieldCheck, title: commonT('features.authentic.title'), desc: commonT('features.authentic.desc') },
              { icon: HiOutlineGift, title: commonT('features.gift.title'), desc: commonT('features.gift.desc') },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center px-2 group"
              >
                <div className="relative mb-4 md:mb-6">
                  {/* Icon Container */}
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center relative border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:rotate-3 shadow-xl">
                    <feature.icon className="text-white group-hover:text-brand-primary transition-colors text-xl sm:text-4xl" />
                    
                    {/* Decorative dot */}
                    <div className="absolute top-1 right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white opacity-50"></div>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <h4 className="text-white font-black text-[10px] sm:text-sm tracking-widest sm:tracking-[0.2em] uppercase leading-tight">
                    {feature.title}
                  </h4>
                  <div className="w-8 h-0.5 bg-white mx-auto scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  <p className="text-white/70 text-[9px] sm:text-xs font-medium max-w-[140px] sm:max-w-[200px] leading-relaxed group-hover:text-white transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Knowledge Section */}
      <div className="bg-[#F5F5F5]"> <KnowledgeSection /></div>
     

      {/* Testimonial Section with Swiper */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="testimonial-swiper pb-16"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="text-center">
                  <div className="text-brand-primary mb-8 flex justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-serif text-brand-black mb-8 leading-relaxed italic">
                    &quot;{item.quote}&quot;
                  </blockquote>
                  <p className="text-brand-primary font-bold uppercase tracking-widest text-sm">
                    - {item.author}, {item.role}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
