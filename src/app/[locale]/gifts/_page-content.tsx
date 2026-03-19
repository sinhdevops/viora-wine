'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import { HiOutlineSparkles, HiOutlineStar, HiOutlineCubeTransparent, HiOutlinePencilSquare,  } from 'react-icons/hi2';
import { HiArrowNarrowRight } from 'react-icons/hi';

const GIFT_SETS = [
  {
    id: 1,
    title: { vi: 'Hộp Quà Doanh Nghiệp', en: 'Corporate Gift Sets' },
    price: 'Từ 2.500.000đ',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop',
    icon: <HiOutlineStar size={32} />
  },
  {
    id: 2,
    title: { vi: 'Bộ Sưu Tập Kỷ Niệm', en: 'Anniversary Collection' },
    price: 'Từ 1.800.000đ',
    image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=80&w=1000&auto=format&fit=crop',
    icon: <HiOutlineSparkles size={32} />
  },
  {
    id: 3,
    title: { vi: 'Hộp Quà Cá Nhân', en: 'Personalized Gifts' },
    price: 'Từ 900.000đ',
    image: 'https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?q=80&w=1000&auto=format&fit=crop',
    icon: <HiOutlinePencilSquare size={32} />
  }
];

export default function GiftsPageContent() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-8 transition-opacity hover:opacity-100">
              <Link href="/" className="hover:text-brand-primary transition-colors">TRANG CHỦ</Link>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="text-white/80 uppercase">Nghệ thuật quà tặng</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-brand-primary"></div>
                <span className="text-brand-primary text-[11px] uppercase tracking-[0.4em] font-black">
                  LUXURY GIFTING
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight font-black tracking-tight">
                Nghệ Thuật <br className="hidden md:block" /> Quà Tặng Hoàn Mỹ
              </h1>
              
              <p className="text-gray-400 text-sm md:text-lg font-medium max-w-xl leading-relaxed italic opacity-80 border-l-2 border-brand-primary/30 pl-6 py-1">
                &ldquo;Trao gửi thành ý qua những set quà tinh túy, kết hợp hoàn hảo giữa rượu vang ngoại nhập và sự trang trọng trong từng chi tiết gói bọc.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Curation Grid */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GIFT_SETS.map((set) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[600px] rounded-[50px] overflow-hidden shadow-2xl transition-all hover:translate-y-[-10px]"
            >
              <Image 
                src={set.image}
                alt={set.title[locale as 'vi' | 'en']}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-brand-primary bg-white/10 backdrop-blur-md p-4 rounded-3xl">
                    {set.icon}
                  </div>
                  <div className="w-full h-px bg-white/20"></div>
                </div>
                <h3 className="text-3xl font-serif font-black mb-4">
                  {set.title[locale as 'vi' | 'en']}
                </h3>
                <p className="text-brand-primary font-black uppercase tracking-widest text-xs mb-8">
                  {set.price}
                </p>
                <div className="flex items-center gap-2 text-white/60 font-black text-[10px] uppercase tracking-[0.3em] group-hover:text-brand-primary transition-colors">
                  Khám phá bộ sưu tập <HiArrowNarrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Values / Customization */}
      <section className="py-32 bg-[#F8F9FA] relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-24">
            <span className="text-brand-primary text-[11px] uppercase tracking-[0.4em] font-black">SỰ CÁ NHÂN HÓA ĐỈNH CAO</span>
            <h2 className="text-4xl lg:text-6xl font-serif text-gray-900 font-black leading-tight">Gửi Gắm Bản Sắc <br /> Riêng Của Bạn</h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed italic">
              Viora Wine cung cấp dịch vụ thiết kế quà tặng theo yêu cầu dành cho doanh nghiệp và cá nhân, đảm bảo mỗi món quà là một tác phẩm nghệ thuật duy nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-brand-primary/5 rounded-[40px] flex items-center justify-center text-brand-primary mb-4 rotate-6 group-hover:rotate-0 transition-transform">
                <HiOutlinePencilSquare size={40} />
              </div>
              <h4 className="text-xl font-black text-gray-900">Khắc Lazer Theo Yêu Cầu</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Khắc tên hoặc lời chúc trực tiếp lên chai rượu để món quà trở thành kỷ vật trường tồn.
              </p>
            </div>

            <div className="text-center space-y-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-brand-primary/5 rounded-[40px] flex items-center justify-center text-brand-primary mb-4 -rotate-12 group-hover:rotate-0 transition-transform">
                <HiOutlineCubeTransparent size={40} />
              </div>
              <h4 className="text-xl font-black text-gray-900">Hộp Gỗ Thủ Công</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Các mẫu hộp gỗ thông, sơn mài cao cấp được chế tác riêng biệt cho từng dòng rượu.
              </p>
            </div>

            <div className="text-center space-y-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-brand-primary/5 rounded-[40px] flex items-center justify-center text-brand-primary mb-4 rotate-12 group-hover:rotate-0 transition-transform">
                <HiOutlineSparkles size={40} />
              </div>
              <h4 className="text-xl font-black text-gray-900">Thiệp Viết Tay Ý Nghĩa</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Đội ngũ của chúng tôi sẵn sàng nắn nót từng lời chúc lên thiệp lụa cao cấp tặng kèm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 container mx-auto px-6 text-center overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/10 rounded-full blur-[150px] -z-0"></div>
        <div className="relative z-10 space-y-10">
          <h2 className="text-4xl lg:text-7xl font-serif text-gray-900 font-black">Quà tặng là lời ngỏ <br /> của sự chân thành.</h2>
          <button className="bg-brand-primary text-white px-16 py-6 rounded-full text-[13px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-brand-primary/40 hover:scale-105 transition-all">
            Yêu cầu báo giá quà lưu niệm
          </button>
        </div>
      </section>
    </div>
  );
}
