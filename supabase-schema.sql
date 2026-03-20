-- Hero banners
create table hero_banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
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
  stock integer default 0,
  is_hot boolean default false,
  created_at timestamptz default now()
);