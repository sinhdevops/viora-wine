import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import { NEWS } from '@/constants/news';

export default function KnowledgeSection() {
  const t = useTranslations('home');
  const locale = useLocale();

  const latestNews = NEWS.slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-brand-primary mb-4">{t('knowledge')}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">{t('knowledge_subtitle')}</p>
        <div className="w-24 h-1 bg-brand-primary mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {latestNews.map((article, idx) => (
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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

      <div className="mt-16 text-center">
        <Link 
          href="/news" 
          className="inline-block border border-brand-primary text-brand-primary font-bold py-4 px-12 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-lg active:scale-95"
        >
          {locale === 'vi' ? 'Xem tất cả bài viết' : 'View all articles'}
        </Link>
      </div>
    </section>
  );
}
