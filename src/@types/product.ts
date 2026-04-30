export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail_url: string;
  content: string;
  price: number;
  discount_percentage: number;
  category: 'wine' | 'whisky' | 'spirits' | 'combo' | 'gift';
  stock: number;
  tag?: "best_seller" | "easy_drink" | "sweet" | "everyday" | "gift" | null;
  rating?: number;
  sold_count?: number;
  created_at?: string;
  // SEO
  seo_title?: string | null;
  seo_description?: string | null;
  // Product specs
  volume?: string | null;
  grape_variety?: string | null;
  wine_type?: string | null;
  producer?: string | null;
  alcohol?: string | null;
  country?: string | null;
  food_pairing?: string | null;
  images?: string[] | null;
}
