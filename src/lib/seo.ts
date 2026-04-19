/**
 * Shared SEO constants to ensure domain consistency
 * across all metadata, schema markup, and sitemaps.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://viorawine.com';

export const DEFAULT_LOCALE = 'vi';

/**
 * Maps internal route paths to locale-specific URL segments.
 * Only Vietnamese needs explicit mapping; English keeps the original path.
 */
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

/**
 * Translate an internal path to its locale-specific URL.
 * Handles both exact matches and dynamic sub-paths (e.g. /blog/some-slug → /tin-tuc/some-slug).
 */
export function getLocalizedPath(path: string, locale: string): string {
  if (locale !== DEFAULT_LOCALE) return path;

  for (const [internal, localized] of Object.entries(VI_PATH_MAP)) {
    if (path === internal) return localized;
    if (path.startsWith(internal + '/')) {
      return localized + path.slice(internal.length);
    }
  }
  return path;
}

/**
 * Build the correct page URL respecting localePrefix: 'as-needed'.
 * vi (default) → no prefix, with localized path: https://viorawine.com/san-pham
 * en           → /en prefix: https://viorawine.com/en/products
 */
export function buildPageUrl(locale: string, path: string = '') {
  const cleanPath = path === '/' ? '' : path;
  const localizedPath = getLocalizedPath(cleanPath, locale);
  return locale === DEFAULT_LOCALE
    ? `${SITE_URL}${localizedPath || '/'}`
    : `${SITE_URL}/${locale}${localizedPath}`;
}

/**
 * Build the standard `alternates` object for Next.js Metadata API.
 * Generates self-referencing canonical + hreflang (vi, en, x-default).
 */
export function buildAlternates(locale: string, path: string = '') {
  const cleanPath = path === '/' ? '' : path;
  const viUrl = `${SITE_URL}${getLocalizedPath(cleanPath, 'vi') || '/'}`;
  const enUrl = `${SITE_URL}/en${cleanPath}`;
  const canonical = locale === DEFAULT_LOCALE ? viUrl : enUrl;

  return {
    canonical,
    languages: {
      vi: viUrl,
      en: enUrl,
      'x-default': viUrl,
    },
  };
}
