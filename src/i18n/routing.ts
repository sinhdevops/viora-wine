import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': {
      vi: '/gioi-thieu',
      en: '/about',
    },
    '/products': {
      vi: '/san-pham',
      en: '/products',
    },
    '/products/[slug]': {
      vi: '/san-pham/[slug]',
      en: '/products/[slug]',
    },
    '/blog': {
      vi: '/tin-tuc',
      en: '/blog',
    },
    '/blog/[slug]': {
      vi: '/tin-tuc/[slug]',
      en: '/blog/[slug]',
    },
    '/contact': {
      vi: '/lien-he',
      en: '/contact',
    },
    '/promotion': {
      vi: '/khuyen-mai',
      en: '/promotion',
    },
    '/gifts': {
      vi: '/qua-tang',
      en: '/gifts',
    },
    '/privacy-policy': {
      vi: '/chinh-sach-bao-mat',
      en: '/privacy-policy',
    },
    '/terms': {
      vi: '/dieu-khoan',
      en: '/terms',
    },
    '/shopping-guide': {
      vi: '/huong-dan-mua-hang',
      en: '/shopping-guide',
    },
    '/shipping-policy': {
      vi: '/chinh-sach-van-chuyen',
      en: '/shipping-policy',
    },
    '/inspection-policy': {
      vi: '/chinh-sach-kiem-hang',
      en: '/inspection-policy',
    },
    '/return-policy': {
      vi: '/chinh-sach-doi-tra',
      en: '/return-policy',
    },
    '/payment-policy': {
      vi: '/chinh-sach-thanh-toan',
      en: '/payment-policy',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
