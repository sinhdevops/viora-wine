import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/*/_not-found',
          '/admin/*',
        ],
      },
      // Major AI search engines — allow full crawl for GEO visibility
      {
        userAgent: [
          'GPTBot',           // ChatGPT / OpenAI
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',  // Google Gemini / AI Overviews
          'Googlebot',
          'CCBot',            // Common Crawl (trains many LLMs)
          'anthropic-ai',     // Claude / Anthropic
          'Claude-Web',
          'PerplexityBot',    // Perplexity AI
          'Applebot',         // Apple Intelligence / Siri
          'Applebot-Extended',
          'YouBot',           // You.com AI
          'cohere-ai',        // Cohere AI
          'Bytespider',       // ByteDance / TikTok AI
          'DuckAssistBot',    // DuckDuckGo AI
          'meta-externalagent', // Meta AI
          'BingBot',          // Microsoft Copilot / Bing AI
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
