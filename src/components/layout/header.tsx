'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useRef } from 'react';
 const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

export default function Header() {
  const t = useTranslations('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
     const langRef = useRef<HTMLDivElement>(null);
      const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('products'), path: '/products' },
    { name: t('news'), path: '/news' },
    { name: t('promotion'), path: '/promotion' },
    { name: t('gifts'), path: '/gifts' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-6">
      <div className="container mx-auto">
        <nav className={`flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-300 ${
          (scrolled || !isHome)
            ? 'bg-black/60 backdrop-blur-xl shadow-2xl' 
            : 'bg-white/10 backdrop-blur-md border border-white/10'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
              VIORA WINE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-[13px] font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-wider"
              >
                {item.name}
              </Link>
            ))}
          </div>
<div className="flex items-center gap-4">
   <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 hover:border-brand-primary transition-colors bg-white"
              >
                <Globe className="text-brand-primary" size={14} />
                <span className="text-[10px] font-bold uppercase text-gray-700">
                  {locale === 'vi' ? 'VI' : 'EN'}
                </span>
                <ChevronDown className={`text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} size={12} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2"
                  >
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={pathname}
                        locale={lang.code}
                        onClick={() => setIsLangOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                          locale === lang.code ? 'text-brand-primary font-bold' : 'text-gray-600'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
             <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:flex items-center justify-center px-6 py-2.5 bg-brand-primary hover:bg-[#A3162A] text-white rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap uppercase"
            >
              {t('contact')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
</div>
          {/* Action Button */}
         
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 lg:hidden"
          >
            <div className="bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 shadow-2xl overflow-hidden">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white text-lg font-medium py-2 border-b border-white/5 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center px-6 py-4 bg-brand-primary text-white rounded-xl font-bold uppercase"
                >
                  {t('contact')}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
