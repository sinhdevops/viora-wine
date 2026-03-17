export interface Product {
  id: string;
  slug: string;
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  price: number;
  image: string;
  category: 'wine' | 'whisky' | 'spirits' | 'combo' | 'gift';
  origin: string;
  alcohol: string;
  volume: string;
  isBestseller?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: {
    vi: string;
    en: string;
  };
  avatar: string;
}
