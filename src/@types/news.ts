export interface NewsItem {
  id: string;
  slug: string;
  category: 'kien-thuc' | 'su-kien';
  title: {
    vi: string;
    en: string;
  };
  excerpt: {
    vi: string;
    en: string;
  };
  content: {
    vi: string;
    en: string;
  };
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}
