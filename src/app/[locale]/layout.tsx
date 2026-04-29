import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import MainLayout from "@/components/layout/main-layout";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/seo";

const montserrat = Montserrat({
	subsets: ["vietnamese"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-montserrat",
	display: "swap",
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "common" });
	const homeT = await getTranslations({ locale, namespace: "home" });

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: homeT("meta_title"),
			template: `%s | ${t("brand")}`,
		},
		description: homeT("meta_desc"),
		keywords: [
			"rượu vang",
			"rượu vang đỏ",
			"ly rượu vang",
			"Viora Wine",
			"Viora Wine Đà Nẵng",
			"rượu vang Úc Hà Nội",
			"rượu vang Úc Đà Nẵng",
			"shop rượu vang Úc Hà Nội",
			"shop rượu vang Úc Đà Nẵng",
			"rượu vang Úc nhập khẩu chính hãng",
			"rượu vang Úc Shiraz",
			"rượu vang Úc Cabernet Sauvignon",
			"rượu vang Úc cho người mới",
			"rượu vang Úc dưới 1 triệu",
			"rượu vang Úc làm quà tặng",
			"Rượu vang Đà Nẵng",
			"Rượu vang nhập khẩu",
			"Quà tặng Tết Đà Nẵng",
			"Hộp quà rượu vang",
			"Rượu vang chính hãng",
			"Whisky Đà Nẵng",
		],
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, "max-image-preview": "large" },
		},
		openGraph: {
			title: homeT("meta_title"),
			description: homeT("meta_desc"),
			url: "/",
			siteName: t("brand"),
			locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			site: "@viorawine",
		},
	};
}

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: "Viora Wine Đà Nẵng",
	alternateName: ["Viora Wine Da Nang", "Shop Rượu Vang Úc Viora Wine"],
	url: SITE_URL,
	logo: `${SITE_URL}/statics/images/logo.svg`,
	image: `${SITE_URL}/statics/images/og-home.jpg`,
	description:
		"Shop rượu vang Úc nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Rượu vang Úc Shiraz, Cabernet Sauvignon, Pháp, Ý, Whisky cao cấp. Giao hàng toàn quốc, tư vấn 24/7.",
	telephone: "+84-338-909-973",
	email: "viorawine@gmail.com",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Đường Tố Hữu",
		addressLocality: "Đà Nẵng",
		addressRegion: "Đà Nẵng",
		postalCode: "550000",
		addressCountry: "VN",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 16.0470797,
		longitude: 108.19163245,
	},
	areaServed: [
		{ "@type": "City", name: "Đà Nẵng" },
		{ "@type": "City", name: "Hà Nội" },
		{ "@type": "Country", name: "Việt Nam" },
	],
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			opens: "10:00",
			closes: "23:00",
		},
	],
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "4.9",
		reviewCount: "2000",
		bestRating: "5",
		worstRating: "1",
	},
	sameAs: ["https://www.facebook.com/viorawine", "https://www.instagram.com/viorawine"],
	priceRange: "$$",
	servesCuisine: "Rượu vang Úc nhập khẩu",
	hasMap: "https://maps.google.com/?q=Viora+Wine+Da+Nang",
};

const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Viora Wine Đà Nẵng",
	url: SITE_URL,
	potentialAction: {
		"@type": "SearchAction",
		target: {
			"@type": "EntryPoint",
			urlTemplate: `${SITE_URL}/products?cat={search_term_string}`,
		},
		"query-input": "required name=search_term_string",
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

	if (!routing.locales.includes(locale as "vi")) {
		notFound();
	}

	return (
		<html lang={locale} className={montserrat.variable} suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5P3662VX');`,
					}}
				/>
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
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-5P3662VX"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-C1XWMDYLVB" strategy="afterInteractive" />
				<Script id="google-analytics" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C1XWMDYLVB');
            gtag('config', 'AW-18100193809');
          `}
				</Script>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<MainLayout>{children}</MainLayout>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
