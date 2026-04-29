import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': '/gioi-thieu',
    '/products': '/san-pham',
    '/products/[slug]': '/san-pham/[slug]',
    '/blog': '/tin-tuc',
    '/blog/[slug]': '/tin-tuc/[slug]',
    '/contact': '/lien-he',
    '/promotion': '/khuyen-mai',
    '/gifts': '/qua-tang',
    '/privacy-policy': '/chinh-sach-bao-mat',
    '/terms': '/dieu-khoan',
    '/shopping-guide': '/huong-dan-mua-hang',
    '/shipping-policy': '/chinh-sach-van-chuyen',
    '/inspection-policy': '/chinh-sach-kiem-hang',
    '/return-policy': '/chinh-sach-doi-tra',
    '/payment-policy': '/chinh-sach-thanh-toan',
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
