'use client';

import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('loading');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-brand-primary font-serif text-lg animate-pulse">
        {t('text')}
      </p>
    </div>
  );
}
