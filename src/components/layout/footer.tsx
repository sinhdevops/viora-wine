import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('footer');
  const commonT = useTranslations('common');

  return (
    <footer className="bg-gray-50 border-t border-brand-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex flex-col mb-6">
              <span className="text-3xl font-serif font-bold text-brand-primary leading-none">
                WINEHOUSE
              </span>
              <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                Đà Nẵng
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              {commonT('slogan')}
            </p>
          </div>

          <div>
            <h4 className="text-brand-primary font-serif text-xl mb-6">{commonT('contact')}</h4>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li>{t('address')}</li>
              <li>{t('phone')}</li>
              <li>{t('email')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-primary font-serif text-xl mb-6">{t('follow')}</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} WineHouse Đà Nẵng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
