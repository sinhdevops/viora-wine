export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.viorawine.com';

const VI_PATH_MAP: Record<string, string> = {
  '/products': '/san-pham',
  '/blog': '/tin-tuc',
  '/contact': '/lien-he',
  '/promotion': '/khuyen-mai',
  '/gifts': '/qua-tang',
  '/about': '/gioi-thieu',
  '/privacy-policy': '/chinh-sach-bao-mat',
  '/terms': '/dieu-khoan',
  '/shopping-guide': '/huong-dan-mua-hang',
  '/shipping-policy': '/chinh-sach-van-chuyen',
  '/inspection-policy': '/chinh-sach-kiem-hang',
  '/return-policy': '/chinh-sach-doi-tra',
  '/payment-policy': '/chinh-sach-thanh-toan',
};

export function getLocalizedPath(path: string): string {
  for (const [internal, localized] of Object.entries(VI_PATH_MAP)) {
    if (path === internal) return localized;
    if (path.startsWith(internal + '/')) {
      return localized + path.slice(internal.length);
    }
  }
  return path;
}

export function buildPageUrl(_locale: string, path: string = '') {
  const cleanPath = path === '/' ? '' : path;
  const localizedPath = getLocalizedPath(cleanPath);
  return `${SITE_URL}${localizedPath || '/'}`;
}

export function buildAlternates(_locale: string, path: string = '') {
  const cleanPath = path === '/' ? '' : path;
  const canonical = `${SITE_URL}${getLocalizedPath(cleanPath) || '/'}`;
  return { canonical };
}
