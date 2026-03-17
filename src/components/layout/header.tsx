'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Search, ChevronDown, Phone, MapPin } from 'lucide-react';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('products'), path: '/products' },
    { name: t('news'), path: '/news' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* Row 1: Logo, Contact, Search, Actions */}
      <div className="py-4 border-b border-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo + Contact */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex flex-col group shrink-0">
              <span className="text-2xl font-serif font-bold leading-none text-brand-primary">
                WINEHOUSE
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-gray-500">
                Đà Nẵng
              </span>
            </Link>
            <div className="hidden md:flex flex-col text-[11px] text-gray-600 gap-1">
              <a href="tel:0905123456" className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                <Phone size={12} className="text-brand-primary" />
                0905 123 456
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-brand-primary" />
                {locale === 'vi' ? '123 Nguyễn Văn Linh, Đà Nẵng' : '123 Nguyen Van Linh, Da Nang'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Search Bar (Smaller) */}
            <form 
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative group w-full max-w-[240px]"
            >
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
              <Search className="absolute left-3 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={14} />
            </form>

            {/* Language Dropdown */}
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

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-brand-primary p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation Menu */}
      <div className="hidden lg:block py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[11px] uppercase tracking-[0.2em] transition-all font-bold relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-brand-primary after:transition-all hover:after:w-full text-gray-700 hover:text-brand-primary ${
                  pathname === item.path ? 'text-brand-primary after:w-full' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 overflow-hidden lg:hidden shadow-xl"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg uppercase tracking-widest py-2 border-b border-gray-50 transition-colors ${
                      pathname === item.path ? 'text-brand-primary font-bold' : 'text-gray-700 hover:text-brand-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
