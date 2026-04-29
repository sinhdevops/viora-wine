import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';
import { SITE_URL, getLocalizedPath } from '@/lib/seo';

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

  const staticPagePriorities: Record<string, number> = {
    '': 1.0,
    '/products': 0.95,
    '/gifts': 0.9,
    '/promotion': 0.85,
    '/blog': 0.85,
    '/about': 0.7,
    '/contact': 0.7,
    '/shopping-guide': 0.65,
    '/privacy-policy': 0.3,
    '/terms': 0.3,
    '/shipping-policy': 0.3,
    '/return-policy': 0.3,
    '/payment-policy': 0.3,
    '/inspection-policy': 0.3,
  };

  const staticPages = Object.keys(staticPagePriorities);
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    const priority = staticPagePriorities[page] ?? 0.5;
    const localizedPage = page === '' ? '' : getLocalizedPath(page);
    const url = page === '' ? `${SITE_URL}/` : `${SITE_URL}${localizedPage}`;
    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: priority >= 0.85 ? 'daily' : 'weekly',
      priority,
    });
  }

  if (products) {
    const productsPath = getLocalizedPath('/products');
    for (const product of products) {
      sitemapEntries.push({
        url: `${SITE_URL}${productsPath}/${product.slug}`,
        lastModified: new Date(product.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  if (events) {
    const blogPath = getLocalizedPath('/blog');
    for (const event of events) {
      sitemapEntries.push({
        url: `${SITE_URL}${blogPath}/${event.slug}`,
        lastModified: new Date(event.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    }
  }

  return sitemapEntries;
}
