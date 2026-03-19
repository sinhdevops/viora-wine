'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import { HiOutlineTicket, HiOutlineGift, HiOutlineClock,  HiCheckBadge } from 'react-icons/hi2';
import { HiArrowNarrowRight } from 'react-icons/hi';

const DEALS = [
  {
    id: 1,
    title: { vi: 'Tiệc Vang Cuối Tuần', en: 'Weekend Wine Party' },
    desc: { vi: 'Giảm 20% cho tất cả dòng vang đỏ Pháp khi mua từ 2 chai.', en: '20% off all French red wines when buying 2+ bottles.' },
    code: 'WEEKEND20',
    expiry: '2026-03-25',
    image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1000&auto=format&fit=crop',
    color: 'from-brand-primary/20'
  },
  {
    id: 2,
    title: { vi: 'Đặc Quyền Hội Viên', en: 'Member Privileges' },
    desc: { vi: 'Ưu đãi 15% cho đơn hàng đầu tiên dành riêng cho thành viên mới.', en: '15% off your first order exclusively for new members.' },
    code: 'WELCOME15',
    expiry: 'Vĩnh viễn',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop',
    color: 'from-amber-500/10'
  }
];

export default function PromotionPageContent() {
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
              <span className="text-white/80 uppercase">ƯU ĐÃI ĐẶC QUYỀN</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-brand-primary"></div>
                <span className="text-brand-primary text-[11px] uppercase tracking-[0.4em] font-black">
                  EXCLUSIVE OFFERS
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight font-black tracking-tight">
                Tiệc Rượu & <br className="hidden md:block" /> Ưu Đãi Đặc Quyền
              </h1>
              
              <p className="text-gray-400 text-sm md:text-lg font-medium max-w-xl leading-relaxed italic opacity-80 border-l-2 border-brand-primary/30 pl-6 py-1">
                &ldquo;Trân trọng gửi tới quý khách những chương trình ưu đãi độc quyền dành riêng cho giới mộ điệu rượu vang và whisky thượng hạng.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {DEALS.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-[#F8F9FA] rounded-[40px] overflow-hidden min-h-[400px] flex flex-col md:flex-row shadow-2xl shadow-black/5 border border-gray-100"
            >
              <div className="md:w-1/2 relative h-[250px] md:h-auto overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title[locale as 'vi' | 'en']}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent"></div>
              </div>
              
              <div className="md:w-1/2 p-10 flex flex-col justify-center relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${deal.color} to-transparent rounded-bl-[100px] -z-0`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <HiOutlineTicket size={24} className="text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Lên đến -20%</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-gray-900 mb-4 font-black group-hover:text-brand-primary transition-colors">
                    {deal.title[locale as 'vi' | 'en']}
                  </h3>
                  
                  <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
                    {deal.desc[locale as 'vi' | 'en']}
                  </p>
                  
                  <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-8">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Mã ưu đãi</p>
                      <p className="text-lg font-black text-brand-primary tracking-widest">{deal.code}</p>
                    </div>
                    <button className="bg-brand-primary text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-xl shadow-brand-primary/20">Sao chép</button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <HiOutlineClock size={16} />
                    Hạn dùng: {deal.expiry}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Viora Club Membership */}
      <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <span className="text-brand-primary text-[11px] uppercase tracking-[0.4em] font-black px-4 py-1.5 border border-brand-primary/30 rounded-full inline-block">
                VIORA ELITE CLUB
              </span>
              <h2 className="text-4xl lg:text-6xl font-serif text-gray-900 font-black leading-tight">
                Đặc Quyền Dành Cho <br /> Giới Thượng Lưu
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                Trở thành thành viên của Viora Wine để tận hưởng những ưu đãi cá nhân hóa, quyền ưu tiên mua các dòng rượu hiếm và tham gia các buổi nếm thử độc quyền.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-xl shadow-black/5">
                  <HiCheckBadge size={32} className="text-brand-primary shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900 mb-1">Tích lũy điểm thưởng</p>
                    <p className="text-xs text-gray-500 font-medium">Hoàn tiền 5% cho mỗi đơn hàng bằng điểm thưởng.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-xl shadow-black/5">
                  <HiOutlineGift size={32} className="text-brand-primary shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900 mb-1">Quà tặng sinh nhật</p>
                    <p className="text-xs text-gray-500 font-medium">Nhận ngay một chai vang tuyển chọn vào tuần sinh nhật.</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-brand-primary text-white px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-primary/30 hover:scale-105 transition-all mt-8">
                Đăng ký thành viên ngay
              </button>
            </div>
            
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-[60px] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1000&auto=format&fit=crop"
                alt="Elite Club"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                <div className="space-y-4">
                  <p className="text-amber-400 font-serif italic text-2xl">Viora Gold Member</p>
                  <p className="text-white/60 text-sm font-medium">Đẳng cấp khởi đầu từ sự thấu hiểu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-32 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-5xl font-serif text-gray-900 font-black">Lan tỏa tinh hoa, Nhận quà đặc biệt</h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed">
            Giới thiệu bạn bè cùng thưởng thức rượu vang tại Viora Wine. Bạn sẽ nhận ngay voucher <span className="text-brand-primary font-black">500.000đ</span> cho mỗi lời giới thiệu thành công.
          </p>
          <div className="flex items-center justify-center gap-4 text-brand-primary font-black text-sm uppercase tracking-[0.2em] group cursor-pointer pt-6">
            Tìm hiểu chương trình giới thiệu 
            <HiArrowNarrowRight className="group-hover:translate-x-4 transition-transform" size={20} />
          </div>
        </div>
      </section>
    </div>
  );
}
