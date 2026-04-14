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
 */
export function buildAlternates(locale: string, path: string = '') {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      vi: `${SITE_URL}/vi${path}`,
      en: `${SITE_URL}/en${path}`,
      'x-default': `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
    },
  };
}
