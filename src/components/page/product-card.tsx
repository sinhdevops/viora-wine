'use client';

import { Product } from '@/@types/product';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { formatCurrency } from '@/utils/format-currency';
import { motion } from 'motion/react';
import { useZaloLink } from '@/hooks/use-zalo-link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations('product');
  const { getZaloLink } = useZaloLink();

  const name = locale === 'vi' ? product.name.vi : product.name.en;

  const categoryLabel = t(`categories.${product.category}`);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 aspect-216/386 max-w-54"
    >
      <Link href={`/products/${product.slug}`} className="relative block h-80 overflow-hidden">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-black/5 group-hover:bg-transparent transition-colors"></div>
        {product.isBestseller && (
          <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Bestseller
          </div>
        )}
      </Link>

      <div className="p-6">
        <span className="text-[10px] uppercase tracking-widest text-brand-primary mb-2 block font-bold">
         {product.origin}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-brand-primary transition-colors line-clamp-2 font-normal">
           {name}
          </h3>
        </Link>
        <p className="text-brand-primary font-bold text-base mb-6">
          {formatCurrency(product.price, locale)}
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          <a
            href={getZaloLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider bg-brand-primary text-white font-bold py-2.5 rounded-md hover:bg-brand-primary/90 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            Chat Zalo
          </a>
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center text-[10px] uppercase tracking-wider border border-gray-200 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-gray-600 font-medium"
          >
            {t('details')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
