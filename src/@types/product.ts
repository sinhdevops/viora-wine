export interface DbProduct {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  content: string;
  price: number;
  discount_percentage: number;
  category: 'wine' | 'whisky' | 'spirits' | 'combo' | 'gift';
  stock: number;
  is_hot: boolean;
  rating?: number;
  sold_count?: number;
}
