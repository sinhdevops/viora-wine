import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';
import { SITE_URL, getLocalizedPath } from '@/lib/seo';

// Static page priorities and change frequencies
const STATIC_PAGES: Record<string, { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = {
  '':                   { priority: 1.0,  changeFrequency: 'daily' },
  '/products':          { priority: 0.95, changeFrequency: 'daily' },
  '/red-wine':          { priority: 0.93, changeFrequency: 'daily' },
  '/white-wine':        { priority: 0.92, changeFrequency: 'daily' },
  '/rose-wine':         { priority: 0.91, changeFrequency: 'daily' },
  '/sweet-wine':        { priority: 0.90, changeFrequency: 'daily' },
  '/shiraz':            { priority: 0.90, changeFrequency: 'daily' },
  '/gifts':             { priority: 0.88, changeFrequency: 'weekly' },
  '/promotion':         { priority: 0.85, changeFrequency: 'daily' },
  '/blog':              { priority: 0.85, changeFrequency: 'daily' },
  '/spirits':           { priority: 0.83, changeFrequency: 'weekly' },
  '/shiraz-da-nang':    { priority: 0.82, changeFrequency: 'weekly' },
  '/shiraz-ha-noi':     { priority: 0.82, changeFrequency: 'weekly' },
  '/about':             { priority: 0.70, changeFrequency: 'monthly' },
  '/contact':           { priority: 0.70, changeFrequency: 'monthly' },
  '/shopping-guide':    { priority: 0.65, changeFrequency: 'monthly' },
  '/privacy-policy':    { priority: 0.30, changeFrequency: 'yearly' },
  '/terms':             { priority: 0.30, changeFrequency: 'yearly' },
  '/shipping-policy':   { priority: 0.35, changeFrequency: 'monthly' },
  '/return-policy':     { priority: 0.35, changeFrequency: 'monthly' },
  '/payment-policy':    { priority: 0.35, changeFrequency: 'monthly' },
  '/inspection-policy': { priority: 0.30, changeFrequency: 'yearly' },
  '/warranty-policy':   { priority: 0.30, changeFrequency: 'yearly' },
};

// Fixed dates for static pages so crawlers see stable lastModified values
const STATIC_PAGE_DATES: Record<string, string> = {
  '':                   '2026-05-01',
  '/products':          '2026-05-01',
  '/red-wine':          '2026-04-01',
  '/white-wine':        '2026-04-01',
  '/rose-wine':         '2026-04-01',
  '/sweet-wine':        '2026-04-01',
  '/shiraz':            '2026-04-01',
  '/gifts':             '2026-03-01',
  '/promotion':         '2026-05-01',
  '/blog':              '2026-05-01',
  '/spirits':           '2026-03-01',
  '/shiraz-da-nang':    '2026-03-01',
  '/shiraz-ha-noi':     '2026-03-01',
  '/about':             '2026-01-01',
  '/contact':           '2026-01-01',
  '/shopping-guide':    '2026-02-01',
  '/privacy-policy':    '2025-01-01',
  '/terms':             '2025-01-01',
  '/shipping-policy':   '2025-06-01',
  '/return-policy':     '2025-06-01',
  '/payment-policy':    '2025-06-01',
  '/inspection-policy': '2025-01-01',
  '/warranty-policy':   '2025-01-01',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('slug, created_at')
    .order('created_at', { ascending: false });

  const { data: events } = await supabase
    .from('events')
    .select('slug, created_at')
    .order('created_at', { ascending: false });

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages with stable lastModified dates
  for (const [page, config] of Object.entries(STATIC_PAGES)) {
    const localizedPage = page === '' ? '' : getLocalizedPath(page);
    const url = page === '' ? `${SITE_URL}/` : `${SITE_URL}${localizedPage}`;
    const lastModifiedStr = STATIC_PAGE_DATES[page] ?? '2025-01-01';

    sitemapEntries.push({
      url,
      lastModified: new Date(lastModifiedStr),
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    });
  }

  // Dynamic product pages
  if (products) {
    const productsPath = getLocalizedPath('/products');
    for (const product of products) {
      sitemapEntries.push({
        url: `${SITE_URL}${productsPath}/${product.slug}`,
        lastModified: new Date(product.created_at || '2025-01-01'),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Dynamic blog/event pages
  if (events) {
    const blogPath = getLocalizedPath('/blog');
    for (const event of events) {
      sitemapEntries.push({
        url: `${SITE_URL}${blogPath}/${event.slug}`,
        lastModified: new Date(event.created_at || '2025-01-01'),
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    }
  }

  return sitemapEntries;
}
