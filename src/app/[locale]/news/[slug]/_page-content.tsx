'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import { NewsItem } from '@/@types/news';
import { NEWS } from '@/constants/news';
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineUser, 
  HiOutlineShare, 
  HiOutlineArrowLeft,
  HiOutlineChevronRight
} from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

interface NewsDetailPageContentProps {
  newsItem: NewsItem;
}

export default function NewsDetailPageContent({ newsItem }: NewsDetailPageContentProps) {
  const locale = useLocale();
  const t = useTranslations('common');

  const relatedNews = NEWS.filter(item => item.id !== newsItem.id).slice(0, 3);

  return (
    <div className="pt-24 pb-24 bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-12">
        <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-primary transition-colors">Trang chủ</Link>
          <HiOutlineChevronRight size={14} />
          <Link href="/news" className="hover:text-brand-primary transition-colors">Tin tức</Link>
          <HiOutlineChevronRight size={14} />
          <span className="text-gray-900 truncate max-w-[200px] md:max-w-none">
            {newsItem.title[locale as 'vi' | 'en']}
          </span>
        </nav>
      </div>

      <article>
        {/* Header Section */}
        <header className="container mx-auto px-4 max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] uppercase tracking-[0.3em] font-bold px-4 py-1.5 rounded-full mb-8 inline-block">
              {newsItem.category === 'knowledge' ? 'Kiến thức rượu' : newsItem.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-8 leading-tight">
              {newsItem.title[locale as 'vi' | 'en']}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-gray-400 text-[13px] border-y border-gray-100 py-6">
              <div className="flex items-center gap-2">
                <HiOutlineUser className="text-brand-primary" size={18} />
                <span className="font-medium text-gray-600">{newsItem.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="text-brand-primary" size={18} />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineClock className="text-brand-primary" size={18} />
                <span>{newsItem.readTime}</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <div className="container mx-auto px-4 max-w-6xl mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image
              src={newsItem.image}
              alt={newsItem.title[locale as 'vi' | 'en']}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Social Share - Sticky */}
            <aside className="hidden lg:block w-12">
              <div className="sticky top-40 flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 rotate-180 [writing-mode:vertical-lr] mb-4">
                  Chia sẻ
                </span>
                <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                  <FaFacebookF />
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                  <FaTwitter />
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                  <FaLinkedinIn />
                </button>
              </div>
            </aside>

            {/* Article Body */}
            <div className="flex-1">
              <div 
                className="prose prose-lg prose-brand-primary max-w-none text-gray-600 font-light leading-relaxed
                  prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-normal
                  prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                  prose-p:mb-8
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-img:rounded-[30px] prose-img:shadow-lg
                  prose-ul:list-disc prose-ul:pl-6
                "
                dangerouslySetInnerHTML={{ __html: newsItem.content[locale as 'vi' | 'en'] }}
              />

              {/* Tags & Share Mobile */}
              <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex flex-wrap gap-2">
                  {['Rượu vang', 'Kiến thức', 'Thưởng thức'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-500 text-[12px] font-medium rounded-full border border-gray-100">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 lg:hidden">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Chia sẻ:</span>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600"><FaFacebookF /></button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600"><FaTwitter /></button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-16 bg-gray-50 rounded-[30px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                  <Image
                    src="https://picsum.photos/seed/author/200/200"
                    alt={newsItem.author}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-serif text-gray-900 mb-2">{newsItem.author}</h4>
                  <p className="text-gray-500 text-[14px] font-light leading-relaxed">
                    Chuyên gia rượu vang với hơn 10 năm kinh nghiệm trong ngành. Đam mê chia sẻ kiến thức và văn hóa thưởng thức rượu vang đến mọi người.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="mt-24 pt-24 border-t border-gray-100 bg-[#FDFDFD]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Bài viết liên quan</h2>
            <Link 
              href="/news" 
              className="text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-brand-primary transition-colors border border-gray-200 px-6 py-2 rounded-full"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`} className="group block h-full">
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title[locale as 'vi' | 'en']}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-lg font-serif text-gray-900 mb-4 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                      {item.title[locale as 'vi' | 'en']}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                      <span>{item.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to News Button */}
      <div className="container mx-auto px-4 mt-24 text-center">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-3 text-gray-500 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-[13px] group"
        >
          <HiOutlineArrowLeft className="group-hover:-translate-x-2 transition-transform" />
          Quay lại danh sách tin tức
        </Link>
      </div>
    </div>
  );
}
