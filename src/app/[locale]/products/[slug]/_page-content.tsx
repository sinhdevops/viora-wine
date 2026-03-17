'use client';

import { Product } from '@/@types/product';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { formatCurrency } from '@/utils/format-currency';
import { motion } from 'motion/react';
import { useZaloLink } from '@/hooks/use-zalo-link';
import { PRODUCTS } from '@/constants/products';
import ProductCard from '@/components/page/product-card';
import { 
  HiOutlineArrowLeft, 
  HiOutlineLocationMarker, 
  HiOutlineBeaker, 
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineTruck,
  HiOutlineCurrencyDollar,
  HiOutlineThumbUp,
  HiOutlinePhone
} from 'react-icons/hi';
import { RiPercentLine } from 'react-icons/ri';

interface ProductDetailPageContentProps {
  product: Product;
}

export default function ProductDetailPageContent({ product }: ProductDetailPageContentProps) {
  const locale = useLocale();
  const t = useTranslations('product');
  const commonT = useTranslations('common');
  const { getZaloLink } = useZaloLink();

  const name = locale === 'vi' ? product.name.vi : product.name.en;
  const description = locale === 'vi' ? product.description.vi : product.description.en;

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const commitments = [
    { icon: HiOutlineShieldCheck, text: locale === 'vi' ? 'Sản phẩm chính hãng' : 'Authentic products' },
    { icon: HiOutlineBadgeCheck, text: locale === 'vi' ? 'Nhận hàng - Thanh toán' : 'Cash on delivery' },
    { icon: HiOutlineTruck, text: locale === 'vi' ? 'Giao hàng Đà Nẵng: 1-2 giờ' : 'Da Nang delivery: 1-2 hours' },
    { icon: HiOutlineTruck, text: locale === 'vi' ? 'Giao hàng Tỉnh: 2-4 ngày' : 'Province delivery: 2-4 days' },
    { icon: HiOutlineCurrencyDollar, text: locale === 'vi' ? 'Giá cả cạnh tranh' : 'Competitive price' },
    { icon: HiOutlineThumbUp, text: locale === 'vi' ? 'Nhà bán hàng uy tín' : 'Reputable seller' },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#FDFDFD]">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors mb-12 text-[13px] font-medium group"
        >
          <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          {locale === 'vi' ? 'Quay lại danh sách sản phẩm' : 'Back to products'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden bg-[#F5F5F5] shadow-sm border border-gray-100"
          >
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-contain p-12 lg:p-20 mix-blend-multiply"
              priority
            />
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-brand-primary/5 text-brand-primary text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                <HiOutlineLocationMarker size={14} />
                {product.origin}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight font-normal">
              {name}
            </h1>

            <p className="text-3xl font-bold text-brand-primary mb-8">
              {formatCurrency(product.price, locale)}
            </p>

            <p className="text-gray-500 text-[15px] font-light leading-relaxed mb-10 max-w-xl">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <a
                href={getZaloLink(name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-brand-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                {locale === 'vi' ? 'Chat Zalo ngay' : 'Chat Zalo now'}
              </a>
              <a
                href="tel:0901234567"
                className="flex items-center justify-center gap-3 bg-[#C4A47C] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#B3936B] transition-all shadow-lg active:scale-95"
              >
                <HiOutlinePhone size={20} />
                {locale === 'vi' ? 'Gọi tư vấn' : 'Call for advice'}
              </a>
            </div>

            {/* Detailed Info Grid */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-8">Thông tin chi tiết</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <HiOutlineLocationMarker className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Xuất xứ</p>
                    <p className="text-[13px] text-gray-900 font-medium">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <RiPercentLine className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Nồng độ</p>
                    <p className="text-[13px] text-gray-900 font-medium">{product.alcohol}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <HiOutlineBeaker className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Dung tích</p>
                    <p className="text-[13px] text-gray-900 font-medium">{product.volume}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center flex-shrink-0">
                    <HiOutlineClock className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Ủ rượu</p>
                    <p className="text-[13px] text-gray-900 font-medium">12-18 năm trong thùng gỗ sồi</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sales Commitment Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-brand-wine py-4 px-8 text-center">
              <h2 className="text-white font-bold text-lg tracking-wide">
                {locale === 'vi' ? 'Cam kết bán hàng' : 'Sales Commitment'}
              </h2>
            </div>
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    <item.icon className="text-brand-primary group-hover:text-white transition-colors" size={24} />
                  </div>
                  <span className="text-[15px] text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-12 border-t border-gray-100">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif text-gray-900">{t('related')}</h2>
              <Link 
                href="/products" 
                className="text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-brand-primary transition-colors border border-gray-200 px-6 py-2 rounded-full"
              >
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
