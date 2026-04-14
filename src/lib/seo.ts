/**
 * Shared SEO constants to ensure domain consistency
 * across all metadata, schema markup, and sitemaps.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.viorawine.com';

export const DEFAULT_LOCALE = 'vi';

/**
 * Build the standard `alternates` object for Next.js Metadata API.
 * Generates self-referencing canonical + hreflang (vi, en, x-default).
 *
 * localePrefix is 'as-needed': default locale (vi) has NO prefix in the URL.
 * → vi canonical: https://www.viorawine.com{path}
 * → en canonical: https://www.viorawine.com/en{path}
 */
/**
 * Build the correct page URL respecting localePrefix: 'as-needed'.
 * vi (default) → no prefix: https://www.viorawine.com/products
 * en           → /en prefix: https://www.viorawine.com/en/products
 */
export function buildPageUrl(locale: string, path: string = '') {
  return locale === DEFAULT_LOCALE
    ? `${SITE_URL}${path || '/'}`
    : `${SITE_URL}/${locale}${path}`;
}

export function buildAlternates(locale: string, path: string = '') {
  const viUrl = `${SITE_URL}${path || '/'}`;
  const enUrl = `${SITE_URL}/en${path}`;
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
