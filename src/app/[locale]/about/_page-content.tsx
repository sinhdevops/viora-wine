'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineGlobeAlt,
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck
} from 'react-icons/hi';
import { RiThermometerLine } from 'react-icons/ri';

export default function AboutPageContent() {
  const t = useTranslations('about');

  const stats = [
    { label: t('stat_years'), value: '25+' },
    { label: t('stat_labels'), value: '1200+' },
    { label: t('stat_regions'), value: '15' },
  ];

  const selectionProcess = [
    {
      title: t('terroir_title'),
      description: t('terroir_desc'),
      icon: HiOutlineGlobeAlt,
    },
    {
      title: t('blind_title'),
      description: t('blind_desc'),
      icon: HiOutlineBeaker,
    },
    {
      title: t('storage_title'),
      description: t('storage_desc'),
      icon: RiThermometerLine,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?q=80&w=1920&auto=format&fit=crop"
          alt="Vineyard"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block"
          >
            {t('established')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
          >
            {t('hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light max-w-2xl mx-auto leading-relaxed opacity-90"
          >
            {t('hero_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">
                {t('journey_label')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                {t('journey_title')}
              </h2>
              <div className="space-y-6 text-gray-500 font-light leading-relaxed mb-12">
                <p>{t('journey_p1')}</p>
                <p>{t('journey_p2')}</p>
              </div>
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-serif text-brand-primary mb-1">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop"
                  alt="Wine pouring"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-primary text-white p-8 rounded-2xl shadow-xl max-w-50">
                <HiOutlineBadgeCheck size={32} className="mb-4" />
                <p className="text-sm font-bold leading-tight uppercase tracking-wider">
                  {t('certified_quality')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selection Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-gray-900 mb-4"
          >
            {t('selection_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-light mb-16 max-w-2xl mx-auto"
          >
            {t('selection_subtitle')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {selectionProcess.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white   flex items-center justify-center text-brand-primary mb-8">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-4">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-200">
            <div className="lg:col-span-2 relative aspect-4/3 lg:aspect-auto rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop"
                alt={t('gallery_main_title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white">
                <h3 className="text-xl lg:text-2xl font-serif mb-2">{t('gallery_main_title')}</h3>
                <p className="text-xs lg:text-sm font-light opacity-80">{t('gallery_main_desc')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              <div className="relative aspect-4/3 lg:aspect-auto lg:flex-1 rounded-3xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=800&auto=format&fit=crop"
                  alt={t('gallery_tasting')}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-serif">{t('gallery_tasting')}</h3>
                </div>
              </div>
              <div className="relative aspect-4/3 lg:aspect-auto lg:flex-1 rounded-3xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1553105672-0244c456793d?q=80&w=800&auto=format&fit=crop"
                  alt={t('gallery_sommelier')}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-serif">{t('gallery_sommelier')}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our House Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif text-gray-900 mb-6">
                {t('visit_title')}
              </h2>
              <p className="text-gray-500 font-light mb-12 leading-relaxed">
                {t('visit_subtitle')}
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary shrink-0">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">{t('location_label')}</h4>
                    <p className="text-sm text-gray-500 font-light">{t('location_value')}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary shrink-0">
                    <HiOutlineClock size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">{t('hours_label')}</h4>
                    <p className="text-sm text-gray-500 font-light">{t('hours_value')}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary shrink-0">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">{t('inquiries_label')}</h4>
                    <p className="text-sm text-gray-500 font-light">{t('inquiries_phone')}</p>
                    <p className="text-sm text-gray-500 font-light">{t('inquiries_email')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-brand-primary text-white font-bold py-4 px-10 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg active:scale-95">
                  {t('book_tasting')}
                </button>
                <button className="bg-white text-gray-900 border border-gray-200 font-bold py-4 px-10 rounded-xl hover:bg-gray-50 transition-all   active:scale-95">
                  {t('download_catalog')}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
                alt="Map/Lifestyle"
                fill
                className="object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary/30 rounded-full animate-ping"></div>
                  <div className="relative w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-xl">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
