import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://viorawine.vn';
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

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/events',
    '/products',
    '/gifts',
    '/promotion',
    '/privacy-policy',
    '/terms',
    '/shipping-policy',
    '/return-policy',
    '/payment-policy',
    '/inspection-policy',
    '/shopping-guide',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: page === '' ? 1 : 0.8,
      });
    }

    // Dynamic products
    if (products) {
      for (const product of products) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/products/${product.id}`,
          lastModified: new Date(product.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }

    // Dynamic events
    if (events) {
      for (const event of events) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/events/${event.id}`,
          lastModified: new Date(event.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      }
    }
  }

  return sitemapEntries;
}
