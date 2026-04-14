import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';
import { SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const locales = ['vi', 'en'];

  // Fetch all products
  const { data: products } = await supabase
    .from('products')
    .select('id, created_at')
    .order('created_at', { ascending: false });

  // Fetch all events
  const { data: events } = await supabase
    .from('events')
    .select('id, created_at')
    .order('created_at', { ascending: false });

  // Priority map: higher priority pages for target keywords
  const staticPagePriorities: Record<string, number> = {
    '': 1.0,          // Homepage — most important
    '/products': 0.95, // Products listing — key landing page for target keywords
    '/gifts': 0.9,     // Gift sets — target keyword "rượu vang Úc làm quà tặng"
    '/promotion': 0.85, // Promotions — target keyword "dưới 1 triệu"
    '/events': 0.85,   // Blog/Knowledge — target keyword "cho người mới"
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

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      const priority = staticPagePriorities[page] ?? 0.5;
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: priority >= 0.85 ? 'daily' : 'weekly',
        priority,
      });
    }

    // Dynamic products — high priority (core business content)
    if (products) {
      for (const product of products) {
        sitemapEntries.push({
          url: `${SITE_URL}/${locale}/products/${product.id}`,
          lastModified: new Date(product.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }

    // Dynamic events — medium priority (SEO content / beginner guides)
    if (events) {
      for (const event of events) {
        sitemapEntries.push({
          url: `${SITE_URL}/${locale}/events/${event.id}`,
          lastModified: new Date(event.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.75,
        });
      }
    }
  }

  return sitemapEntries;
}
