import { Product } from '../@types/product';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'chateau-margaux-2015',
    name: {
      vi: 'Château Margaux 2015',
      en: 'Château Margaux 2015'
    },
    description: {
      vi: 'Một trong những dòng rượu vang nổi tiếng nhất thế giới từ vùng Bordeaux, Pháp.',
      en: 'One of the most famous wines in the world from the Bordeaux region, France.'
    },
    price: 25000000,
    image: 'https://picsum.photos/seed/wine1/800/800',
    category: 'wine',
    origin: 'Pháp / France',
    alcohol: '13.5%',
    volume: '750ml',
    isBestseller: true
  },
  {
    id: '2',
    slug: 'macallan-18-sherry-oak',
    name: {
      vi: 'Macallan 18 Sherry Oak',
      en: 'Macallan 18 Sherry Oak'
    },
    description: {
      vi: 'Dòng Whisky đơn cất thượng hạng được ủ 18 năm trong thùng gỗ sồi Sherry từ Tây Ban Nha.',
      en: 'Premium single malt whisky aged for 18 years in Sherry oak casks from Spain.'
    },
    price: 12500000,
    image: 'https://picsum.photos/seed/whisky1/800/800',
    category: 'whisky',
    origin: 'Scotland',
    alcohol: '43%',
    volume: '700ml',
    isBestseller: true
  },
  {
    id: '3',
    slug: 'penfolds-grange-bin-95',
    name: {
      vi: 'Penfolds Grange Bin 95',
      en: 'Penfolds Grange Bin 95'
    },
    description: {
      vi: 'Biểu tượng của rượu vang Úc, sự kết hợp hoàn hảo giữa Shiraz và Cabernet Sauvignon.',
      en: 'The icon of Australian wine, a perfect blend of Shiraz and Cabernet Sauvignon.'
    },
    price: 18000000,
    image: 'https://picsum.photos/seed/wine2/800/800',
    category: 'wine',
    origin: 'Úc / Australia',
    alcohol: '14.5%',
    volume: '750ml',
    isBestseller: true
  },
  {
    id: '4',
    slug: 'hibiki-japanese-harmony',
    name: {
      vi: 'Hibiki Japanese Harmony',
      en: 'Hibiki Japanese Harmony'
    },
    description: {
      vi: 'Sự hòa quyện tinh tế của các loại whisky mạch nha và ngũ cốc từ các nhà chưng cất của Suntory.',
      en: 'A delicate blend of malt and grain whiskies from Suntory\'s distilleries.'
    },
    price: 4500000,
    image: 'https://picsum.photos/seed/whisky2/800/800',
    category: 'whisky',
    origin: 'Nhật Bản / Japan',
    alcohol: '43%',
    volume: '700ml',
    isBestseller: false
  },
  {
    id: '5',
    slug: 'hennessy-xo',
    name: {
      vi: 'Hennessy X.O',
      en: 'Hennessy X.O'
    },
    description: {
      vi: 'Dòng Cognac mạnh mẽ, phức hợp với hương vị của trái cây khô và gia vị.',
      en: 'A powerful and complex Cognac with notes of dried fruit and spices.'
    },
    price: 5800000,
    image: 'https://picsum.photos/seed/spirits1/800/800',
    category: 'spirits',
    origin: 'Pháp / France',
    alcohol: '40%',
    volume: '700ml',
    isBestseller: true
  },
  {
    id: '6',
    slug: 'combo-tiec-toi-lang-man',
    name: {
      vi: 'Combo Tiệc Tối Lãng Mạn',
      en: 'Romantic Dinner Combo'
    },
    description: {
      vi: 'Bộ đôi vang đỏ và vang trắng hoàn hảo cho bữa tối lãng mạn.',
      en: 'The perfect red and white wine duo for a romantic dinner.'
    },
    price: 1500000,
    image: 'https://picsum.photos/seed/combo1/800/800',
    category: 'combo',
    origin: 'Nhiều quốc gia / Multiple',
    alcohol: '13.5%',
    volume: '750ml x 2',
    isBestseller: false
  },
  {
    id: '7',
    slug: 'hop-qua-tet-sang-trong',
    name: {
      vi: 'Hộp Quà Tết Sang Trọng',
      en: 'Luxury Tet Gift Box'
    },
    description: {
      vi: 'Hộp quà cao cấp bao gồm rượu vang, hạt dinh dưỡng và socola thượng hạng.',
      en: 'Premium gift box including wine, nuts, and fine chocolate.'
    },
    price: 2800000,
    image: 'https://picsum.photos/seed/gift1/800/800',
    category: 'gift',
    origin: 'Việt Nam / Vietnam',
    alcohol: '14%',
    volume: '750ml + Phụ kiện',
    isBestseller: false
  },
  {
    id: '8',
    slug: 'opus-one-2018',
    name: {
      vi: 'Opus One 2018',
      en: 'Opus One 2018'
    },
    description: {
      vi: 'Sự hợp tác huyền thoại giữa Baron Philippe de Rothschild và Robert Mondavi.',
      en: 'Legendary collaboration between Baron Philippe de Rothschild and Robert Mondavi.'
    },
    price: 15500000,
    image: 'https://picsum.photos/seed/wine3/800/800',
    category: 'wine',
    origin: 'Mỹ / USA',
    alcohol: '14.5%',
    volume: '750ml',
    isBestseller: true
  },
  {
    id: '9',
    slug: 'lagavulin-16-year-old',
    name: {
      vi: 'Lagavulin 16 Year Old',
      en: 'Lagavulin 16 Year Old'
    },
    description: {
      vi: 'Dòng Islay Single Malt Whisky với hương khói than bùn đặc trưng mạnh mẽ.',
      en: 'Islay Single Malt Whisky with intense peat smoke character.'
    },
    price: 2800000,
    image: 'https://picsum.photos/seed/whisky3/800/800',
    category: 'whisky',
    origin: 'Scotland',
    alcohol: '43%',
    volume: '700ml',
    isBestseller: false
  },
  {
    id: '10',
    slug: 'sassicaia-2019',
    name: {
      vi: 'Sassicaia 2019',
      en: 'Sassicaia 2019'
    },
    description: {
      vi: 'Một trong những dòng Super Tuscan vĩ đại nhất của Ý.',
      en: 'One of the greatest Super Tuscan wines from Italy.'
    },
    price: 12000000,
    image: 'https://picsum.photos/seed/wine4/800/800',
    category: 'wine',
    origin: 'Ý / Italy',
    alcohol: '14%',
    volume: '750ml',
    isBestseller: true
  },
  {
    id: '11',
    slug: 'johnnie-walker-blue-label',
    name: {
      vi: 'Johnnie Walker Blue Label',
      en: 'Johnnie Walker Blue Label'
    },
    description: {
      vi: 'Đỉnh cao của nghệ thuật phối trộn whisky từ nhà Johnnie Walker.',
      en: 'The pinnacle of blending art from Johnnie Walker.'
    },
    price: 5200000,
    image: 'https://picsum.photos/seed/whisky4/800/800',
    category: 'whisky',
    origin: 'Scotland',
    alcohol: '40%',
    volume: '750ml',
    isBestseller: true
  }
];
