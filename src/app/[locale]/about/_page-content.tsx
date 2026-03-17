'use client';

import { useTranslations, useLocale } from 'next-intl';
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
  const t = useTranslations('common');
  const locale = useLocale();

  const stats = [
    { label: locale === 'vi' ? 'Năm kinh nghiệm' : 'Years Experience', value: '25+' },
    { label: locale === 'vi' ? 'Nhãn rượu' : 'Wine Labels', value: '1200+' },
    { label: locale === 'vi' ? 'Vùng quốc gia' : 'Global Regions', value: '15' },
  ];

  const selectionProcess = [
    {
      title: locale === 'vi' ? 'Khám phá thổ nhưỡng' : 'Terroir Exploration',
      description: locale === 'vi' ? 'Chúng tôi đi đến những vùng đất xa xôi để tìm ra những nhà làm rượu tôn trọng đất đai và phương pháp truyền thống.' : 'We travel to remote estates to find winemakers who respect the land and traditional methods.',
      icon: HiOutlineGlobeAlt
    },
    {
      title: locale === 'vi' ? 'Nếm thử mù' : 'Blind Tasting',
      description: locale === 'vi' ? 'Mỗi chai rượu đều trải qua các buổi nếm thử mù nghiêm ngặt bởi hội đồng chuyên gia của chúng tôi để đảm bảo chất lượng khách quan.' : 'Every bottle is subjected to rigorous blind tasting sessions by our expert panel to ensure objective excellence.',
      icon: HiOutlineBeaker
    },
    {
      title: locale === 'vi' ? 'Bảo quản tiêu chuẩn' : 'Controlled Storage',
      description: locale === 'vi' ? 'Hầm rượu tại Đà Nẵng của chúng tôi có hệ thống kiểm soát khí hậu hiện đại để bảo vệ sự nguyên vẹn của từng giọt rượu.' : 'Our Da Nang cellar features state-of-the-art climate control to preserve the integrity of every drop.',
      icon: RiThermometerLine
    }
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
            ESTABLISHED 1998
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
          >
            {locale === 'vi' ? 'Nghệ Thuật Trồng Nho & Di Sản' : 'The Art of Viticulture & Heritage'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light max-w-2xl mx-auto leading-relaxed opacity-90"
          >
            {locale === 'vi' 
              ? 'Từ những sườn đồi ngập nắng của vùng Tuscany đến làn gió biển của Đà Nẵng, chúng tôi mang những dòng rượu vang tốt nhất thế giới đến bàn tiệc của bạn.' 
              : 'From the sun-drenched slopes of Tuscany to the coastal breeze of Da Nang, we bring the world\'s finest vintages to your table.'}
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
                OUR JOURNEY
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                {locale === 'vi' ? 'Một Phần Tư Thế Kỷ Đam Mê' : 'A Quarter Century of Passion'}
              </h2>
              <div className="space-y-6 text-gray-500 font-light leading-relaxed mb-12">
                <p>
                  {locale === 'vi'
                    ? 'Được thành lập tại trung tâm Đà Nẵng, WineHouse bắt đầu với một sứ mệnh duy nhất: mang những dòng rượu vang tinh tế nhất thế giới đến bờ biển Việt Nam. Hành trình của chúng tôi là một trong những sự lựa chọn khắt khe, sự hiểu biết sâu sắc và cam kết không lay chuyển đối với nghệ thuật chọn rượu.'
                    : 'Founded in the heart of Da Nang, WineHouse began with a single mission: to bring the world\'s most exquisite vintages to the shores of Vietnam. Our journey is one of master sommeliers, ensuring that every unwavering commitment to the art of wine selection.'}
                </p>
                <p>
                  {locale === 'vi'
                    ? 'Chúng tôi không chỉ bán những chai rượu; chúng tôi kiến tạo những trải nghiệm. Mỗi chai rượu trong bộ sưu tập của chúng tôi đều được nếm thử và lựa chọn kỹ lưỡng, đảm bảo rằng mỗi ngụm rượu đều kể một câu chuyện về vùng đất, khí hậu và bàn tay tài hoa của người làm rượu.'
                    : 'We don\'t just sell bottles; we curate experiences. Each vintage in our collection is hand-selected by our master sommeliers, ensuring that every sip tells a story of the soil, the climate, and the craft of the winemaker.'}
                </p>
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
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop"
                  alt="Wine pouring"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-primary text-white p-8 rounded-2xl shadow-xl max-w-[200px]">
                <HiOutlineBadgeCheck size={32} className="mb-4" />
                <p className="text-sm font-bold leading-tight uppercase tracking-wider">
                  {locale === 'vi' ? 'Cam Kết Chất Lượng Chứng Nhận' : 'Certified Quality Assurance'}
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
            {locale === 'vi' ? 'Quy Trình Lựa Chọn Của Chúng Tôi' : 'Our Selection Process'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-light mb-16 max-w-2xl mx-auto"
          >
            {locale === 'vi'
              ? 'Chỉ 1 trong số 50 chai rượu được nếm thử mới có thể lọt vào hầm rượu riêng của WineHouse Đà Nẵng.'
              : 'Only 1 in every 50 wines tasted makes it into the WineHouse Da Nang private cellar.'}
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
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[800px]">
            <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop"
                alt="Main Cellar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white">
                <h3 className="text-xl lg:text-2xl font-serif mb-2">The Main Cellar</h3>
                <p className="text-xs lg:text-sm font-light opacity-80">Da Nang&apos;s largest collection of European vintages.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 rounded-3xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=800&auto=format&fit=crop"
                  alt="Tasting Room"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-serif">Tasting Room</h3>
                </div>
              </div>
              <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 rounded-3xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1553105672-0244c456793d?q=80&w=800&auto=format&fit=crop"
                  alt="Master Sommelier"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-serif">Master Sommelier</h3>
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
                {locale === 'vi' ? 'Ghé Thăm Ngôi Nhà Của Chúng Tôi' : 'Visit Our House'}
              </h2>
              <p className="text-gray-500 font-light mb-12 leading-relaxed">
                {locale === 'vi'
                  ? 'Trải nghiệm bộ sưu tập của chúng tôi trực tiếp tại cửa hàng hàng đầu tại Đà Nẵng.'
                  : 'Experience our collection in person at our flagship Da Nang boutique.'}
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">Location</h4>
                    <p className="text-sm text-gray-500 font-light">123 Bach Dang Street, Hai Chau District, Da Nang City, Vietnam</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                    <HiOutlineClock size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">Opening Hours</h4>
                    <p className="text-sm text-gray-500 font-light">Mon - Sun: 10:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary flex-shrink-0">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">Inquiries</h4>
                    <p className="text-sm text-gray-500 font-light">+84 236 3123 456</p>
                    <p className="text-sm text-gray-500 font-light">contact@winehousedanang.com</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-brand-primary text-white font-bold py-4 px-10 rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg active:scale-95">
                  {locale === 'vi' ? 'Đặt Lịch Hẹn' : 'Book a Tasting'}
                </button>
                <button className="bg-white text-gray-900 border border-gray-200 font-bold py-4 px-10 rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  {locale === 'vi' ? 'Tải Catalogue' : 'Download Catalog'}
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
