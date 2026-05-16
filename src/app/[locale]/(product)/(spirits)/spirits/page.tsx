import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFAQSchema, buildCategoryFAQ, jsonLdScript } from "@/lib/geo-schemas";

export const revalidate = 3600;

const faqItems = buildCategoryFAQ({
	name: "Rượu Mạnh (Spirits)",
	description: "Rượu mạnh (spirits) là các loại rượu được chưng cất, có độ cồn cao từ 20–70%. Bao gồm Whisky (Scotch, Irish, Bourbon), Cognac, Brandy, Vodka, Gin, Rum và Tequila. Mỗi loại có phong cách và hương vị đặc trưng riêng.",
	servingTemp: "18–22°C cho Whisky và Cognac, Vodka nên uống lạnh 2–4°C, Gin uống với đá hoặc tonic",
	pairingFoods: "phô mai cứng, hạt dẻ, socola đen (cho Whisky/Cognac), hải sản (cho Vodka/Gin), thịt BBQ (cho Bourbon), tráng miệng ngọt (cho Brandy)",
	origin: "Scotland (Scotch Whisky), Mỹ (Bourbon, Tennessee), Pháp (Cognac, Armagnac), Nga (Vodka), Anh/Hà Lan (Gin), Cuba/Caribbean (Rum), Mexico (Tequila)",
	priceRange: "từ 500.000đ đến nhiều triệu đồng — phụ thuộc vào dòng sản phẩm và năm ủ",
	phone: "0325-610-016",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return {
		title: "Rượu Mạnh Nhập Khẩu Chính Hãng – Whisky, Cognac, Brandy | Viora Wine",
		description:
			"Mua rượu mạnh nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Whisky Scotch, Bourbon, Cognac Pháp, Brandy, Vodka, Gin từ 500.000đ. Giao hàng toàn quốc. Tư vấn 24/7.",
		keywords: ["rượu mạnh", "rượu mạnh nhập khẩu", "whisky", "cognac", "brandy", "vodka", "gin", "rượu mạnh chính hãng", "Scotch whisky", "Bourbon", "rượu mạnh Đà Nẵng", "Viora Wine", "viorawine", "viora wine"],
		alternates: buildAlternates(locale, "/spirits"),
		openGraph: {
			title: "Rượu Mạnh Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Whisky, Cognac, Brandy, Vodka, Gin nhập khẩu chính hãng. Từ 500.000đ. Giao toàn quốc.",
			url: buildPageUrl(locale, "/spirits"),
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [{ url: `${SITE_URL}/statics/images/og-home.jpg`, width: 1200, height: 630, alt: "Rượu Mạnh – Viora Wine" }],
		},
	};
}

export default function SpiritsPage() {
	const pageUrl = `${SITE_URL}/ruou-manh`;

	const breadcrumbJsonLd = buildBreadcrumbSchema([
		{ name: "Trang chủ", url: SITE_URL },
		{ name: "Sản phẩm", url: `${SITE_URL}/san-pham` },
		{ name: "Rượu Mạnh", url: pageUrl },
	]);

	const faqJsonLd = buildFAQSchema(faqItems);

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Rượu Mạnh Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu mạnh nhập khẩu chính hãng: Whisky, Cognac, Brandy, Vodka, Gin tại Viora Wine. Đảm bảo chính hãng, giá tốt, giao hàng toàn quốc.",
		url: pageUrl,
		inLanguage: "vi-VN",
		breadcrumb: breadcrumbJsonLd,
		speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".category-description"] },
		publisher: { "@type": "Organization", name: "Viora Wine", url: SITE_URL },
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(webPageJsonLd) }} />

			<div className="min-h-screen bg-white">
				<section className="bg-linear-to-br from-[#2C1810] to-[#6B3A2A] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">Sản phẩm</a>
							<span>/</span>
							<span className="text-white">Rượu Mạnh</span>
						</nav>
						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
								Rượu Mạnh <span className="text-yellow-400">Nhập Khẩu Chính Hãng</span>
							</h1>
							<p className="mb-6 text-lg leading-relaxed text-white/85">
								Whisky, Cognac, Brandy, Vodka, Gin và các loại rượu mạnh cao cấp từ khắp thế giới — nhập khẩu
								chính hãng, đảm bảo chất lượng tuyệt đối.
							</p>
							<div className="flex flex-wrap gap-3 text-sm">
								{["✓ Nhập khẩu chính hãng 100%", "✓ Tư vấn 24/7", "✓ Giao hàng toàn quốc"].map((b) => (
									<span key={b} className="rounded-full bg-white/10 px-4 py-2 text-white/90">{b}</span>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
					<h2 className="mb-6 text-xl font-semibold text-gray-900">Các Loại Rượu Mạnh Tại Viora Wine</h2>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{ name: "🥃 Whisky / Whiskey", desc: "Scotch, Bourbon, Irish, Japanese — từ 500.000đ" },
							{ name: "🍷 Cognac / Brandy", desc: "Rémy Martin, Hennessy, Martell, Armagnac" },
							{ name: "🍸 Vodka", desc: "Absolut, Grey Goose, Belvedere và nhiều hơn nữa" },
							{ name: "🍹 Gin", desc: "Hendrick's, Tanqueray, Bombay Sapphire" },
							{ name: "🥂 Rum", desc: "Bacardi, Captain Morgan, Ron Zacapa" },
							{ name: "🌵 Tequila", desc: "Jose Cuervo, Patrón, Don Julio" },
						].map((item) => (
							<div key={item.name} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
								<p className="mb-1 font-semibold text-gray-900">{item.name}</p>
								<p className="text-sm text-gray-500">{item.desc}</p>
							</div>
						))}
					</div>
				</section>

				<section className="bg-gray-50 py-12">
					<div className="mx-auto max-w-2xl px-4 text-center">
						<p className="mb-3 text-base font-medium text-gray-700">Đang cập nhật sản phẩm rượu mạnh trên website</p>
						<p className="mb-6 text-sm text-gray-500">
							Liên hệ để xem đầy đủ danh mục sản phẩm và đặt hàng: <strong>0325-610-016</strong>
						</p>
						<a
							href="https://zalo.me/0325610016"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block rounded-lg bg-[#B22222] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#8B0000]"
						>
							Tư vấn qua Zalo
						</a>
					</div>
				</section>

				<section className="bg-white py-12">
					<div className="mx-auto max-w-2xl px-4 sm:px-6">
						<h2 className="mb-6 text-center text-xl font-bold text-gray-900">Câu Hỏi Thường Gặp Về Rượu Mạnh</h2>
						<div className="space-y-4">
							{faqItems.slice(0, 5).map((item) => (
								<div key={item.q} className="rounded-xl border border-gray-100 p-5">
									<h3 className="mb-2 font-semibold text-gray-900">{item.q}</h3>
									<p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
