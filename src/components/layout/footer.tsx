import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('footer');
  const commonT = useTranslations('common');
  const locale = useLocale();

  const navItems = [
    { name: commonT('home'), path: '/' },
    { name: commonT('products'), path: '/products' },
    { name: commonT('news'), path: '/news' },
    { name: commonT('promotion'), path: '/promotion' },
    { name: commonT('gifts'), path: '/gifts' },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-serif font-black text-white tracking-tight block group-hover:text-brand-primary transition-colors">
                VIORA WINE
              </span>
              <div className="h-0.5 w-12 bg-brand-primary mt-1 group-hover:w-full transition-all duration-500"></div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              {commonT('slogan') || "Tinh túy trong từng giọt rượu, đẳng cấp trong từng nhãn hiệu."}
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-brand-primary hover:text-white transition-all duration-300 border border-white/10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-serif text-xl mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-brand-primary"></span>
              Thông tin
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path} 
                    className="text-gray-400 hover:text-brand-primary text-[13px] uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary scale-0 group-hover:scale-100 transition-transform"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-serif text-xl mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-brand-primary"></span>
              {commonT('contact')}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <FaMapMarkerAlt />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                  <span className="block text-white font-bold mb-1 uppercase text-[10px] tracking-widest">Địa chỉ</span>
                  {t('address')}
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <FaPhoneAlt />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                  <span className="block text-white font-bold mb-1 uppercase text-[10px] tracking-widest">Hotline</span>
                  {t('phone')}
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <FaEnvelope />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                  <span className="block text-white font-bold mb-1 uppercase text-[10px] tracking-widest">Email</span>
                  {t('email')}
                </div>
              </li>
            </ul>
          </div>

          {/* Map / Newsletter Column */}
          <div>
            <h4 className="text-white font-serif text-xl mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-brand-primary"></span>
              Kết nối
            </h4>
            <div className="rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10 aspect-video lg:aspect-square relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.102385108842!2d108.21958687588373!3d16.060197739702213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b676f62e87%3A0xe6792f39281a8c08!2zVmnhu4d0IE5hbSwgxJDDoCBO4bq1bmcsIEjhuqNpIENow6J1LCBCw6xuaCBUaHXhuq1u!5e0!3m2!1svi!2s!4v1710899456789!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="py-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] font-medium text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white font-bold">VIORA WINE</span>. {locale === 'vi' ? 'Đã đăng ký bản quyền' : 'All rights reserved'}.
          </p>
          <div className="flex gap-8">
            {['Chính sách bảo mật', 'Điều khoản sử dụng'].map((policy) => (
              <a key={policy} href="#" className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
