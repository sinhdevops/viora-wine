-- Hero banners
create table hero_banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  is_active boolean default false,
  created_at timestamptz default now()
);

-- Events
create table events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  thumbnail_url text,
  content text,
  date date not null,
  category text not null check (category in ('su-kien', 'kien-thuc')),
  created_at timestamptz default now()
);

-- Products
create table products (
  id text primary key,
  name text not null,
  description text,
  thumbnail_url text,
  content text,
  price numeric default 0,
  discount_percentage numeric default 0,
  category text,
  wine_type text,
  volume text,
  grape_variety text,
  producer text,
  alcohol text,
  country text,
  stock integer default 0,
  is_hot boolean default false,
  rating decimal(2,1) default 5.0,
  sold_count integer default 0,
  created_at timestamptz default now()
);

-- Migration (run if table already exists):
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 5.0;
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS sold_count INTEGER DEFAULT 0;
-- UPDATE products SET rating = 5.0 WHERE rating IS NULL;
-- UPDATE products SET sold_count = 0 WHERE sold_count IS NULL;

-- Supabase RPC to safely increment sold_count:
-- CREATE OR REPLACE FUNCTION increment_sold_count(product_id TEXT)
-- RETURNS void LANGUAGE plpgsql AS $$
-- BEGIN
--   UPDATE products SET sold_count = sold_count + 1 WHERE id = product_id;
-- END;
-- $$;