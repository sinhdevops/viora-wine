'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('not_found');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-serif text-brand-primary mb-4">404</h1>
      <h2 className="text-3xl font-serif text-brand-black mb-6">{t('title')}</h2>
      <p className="text-gray-500 max-w-md mb-10">{t('desc')}</p>
      <Link
        href="/"
        className="bg-brand-primary text-white font-bold py-4 px-12 rounded-full hover:bg-brand-black transition-all shadow-lg"
      >
        {t('back_home')}
      </Link>
    </div>
  );
}
