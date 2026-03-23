import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import MainLayout from '@/components/layout/main-layout';
import { Montserrat } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const homeT = await getTranslations({ locale, namespace: 'home' });

  return {
    metadataBase: new URL('https://winehousedanang.vn'),
    title: {
      default: homeT('meta_title'),
      template: `%s | ${t('brand')}`,
    },
    description: homeT('meta_desc'),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    openGraph: {
      title: homeT('meta_title'),
      description: homeT('meta_desc'),
      url: 'https://winehousedanang.vn',
      siteName: t('brand'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@winehousedanang',
    },
    verification: {
      google: 'your-google-site-verification-token',
    },
  };
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WineHouse Đà Nẵng',
  alternateName: 'WineHouse Da Nang',
  url: 'https://winehousedanang.vn',
  logo: 'https://winehousedanang.vn/statics/images/logo.svg',
  image: 'https://winehousedanang.vn/statics/images/og-home.jpg',
  description:
    'Cửa hàng rượu vang nhập khẩu chính hãng tại Đà Nẵng. Rượu vang Úc, Pháp, Ý, Whisky cao cấp.',
  telephone: '+84-338-909-973',
  email: 'contact@winehousedanang.vn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Đường Tố Hữu',
    addressLocality: 'Đà Nẵng',
    addressRegion: 'Đà Nẵng',
    postalCode: '550000',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 16.0470797,
    longitude: 108.19163245,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '23:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/winehousedanang',
    'https://www.instagram.com/winehousedanang',
  ],
  priceRange: '$$',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'WineHouse Đà Nẵng',
  url: 'https://winehousedanang.vn',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://winehousedanang.vn/vi/products?cat={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }

  return (
    <html lang={locale} className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
