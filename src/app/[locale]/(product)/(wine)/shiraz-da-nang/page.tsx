import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";

export const revalidate = 3600;

const ZALO_LINK = "https://zalo.me/0325610016";

const faqItems = [
	{
		q: "Mua rượu vang Shiraz tại Đà Nẵng ở đâu uy tín?",
		a: "Viora Wine là shop rượu vang Shiraz Úc nhập khẩu chính hãng uy tín tại Đà Nẵng với hơn 2.000 khách hàng tin dùng, đánh giá 4.9/5 sao. Toàn bộ sản phẩm có giấy tờ nhập khẩu đầy đủ, tem chính hãng. Đặt hàng qua Zalo 0338-909-973, giao tận nhà trong 2–4h.",
	},
	{
		q: "Giao rượu vang Shiraz Đà Nẵng mất bao lâu?",
		a: "Viora Wine giao rượu vang Shiraz trong nội thành Đà Nẵng chỉ 2–4 giờ sau khi đặt hàng. Đặt trước 10h nhận trong ngày, đặt chiều nhận tối. Đóng gói chuyên dụng thùng xốp + bubble wrap, cam kết 100% không vỡ chai.",
	},
	{
		q: "Rượu vang Shiraz Đà Nẵng giá bao nhiêu?",
		a: "Viora Wine có Shiraz từ 490.000đ đến 2.000.000đ+/chai tùy dòng và vùng. Shiraz everyday (Barossa Valley) từ 490.000–800.000đ, phù hợp bữa tối thường ngày. Shiraz premium (Old Vine, Reserve) từ 800.000–1.500.000đ, phù hợp quà tặng và bữa tiệc đặc biệt.",
	},
	{
		q: "Shop rượu vang Shiraz Đà Nẵng có hỗ trợ gói quà không?",
		a: "Có! Viora Wine cung cấp dịch vụ gói quà rượu vang Shiraz chuyên nghiệp tại Đà Nẵng: hộp quà sang trọng, ruy băng đỏ, thiệp viết tay cá nhân hóa. Phù hợp quà sinh nhật, kỷ niệm, Tết, quà biếu đối tác. Phí gói quà từ 50.000đ/hộp.",
	},
	{
		q: "Rượu vang Úc Shiraz Đà Nẵng có gì đặc biệt?",
		a: "Shiraz Úc tại Viora Wine được chọn lọc từ Barossa Valley và McLaren Vale — hai vùng sản xuất Shiraz nổi tiếng nhất thế giới. Đặc trưng: màu tím đen đậm, hương mận và chocolate đen, vị cay nhẹ hạt tiêu, tanin mềm mượt. Hoàn hảo cho bữa BBQ bãi biển Đà Nẵng.",
	},
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return {
		title: "Rượu Vang Shiraz Đà Nẵng – Giao 2-4h | Viora Wine",
		description:
			"Mua rượu vang Shiraz tại Đà Nẵng. Nhập khẩu chính hãng từ Úc, giao hàng 2–4h nội thành. Giá từ 490.000đ. Gói quà sang trọng. Tư vấn miễn phí: 0338-909-973.",
		keywords: [
			"rượu vang Shiraz Đà Nẵng",
			"mua rượu vang Shiraz Đà Nẵng",
			"shop rượu vang Đà Nẵng",
			"rượu vang Úc Đà Nẵng",
			"giao rượu vang Đà Nẵng",
			"rượu vang nhập khẩu Đà Nẵng",
			"Shiraz Barossa Valley Đà Nẵng",
		],
		alternates: buildAlternates(locale, "/shiraz-da-nang"),
		openGraph: {
			title: "Rượu Vang Shiraz Đà Nẵng – Giao 2-4h | Viora Wine",
			description:
				"Shiraz Úc chính hãng tại Đà Nẵng. Giao nhanh 2–4h nội thành. Từ 490.000đ.",
			url: buildPageUrl(locale, "/shiraz-da-nang"),
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [
				{
					url: `${SITE_URL}/statics/images/og-home.jpg`,
					width: 1200,
					height: 630,
					alt: "Rượu Vang Shiraz Đà Nẵng – Viora Wine",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Rượu Vang Shiraz Đà Nẵng – Viora Wine",
			description: "Shiraz Úc chính hãng. Giao nhanh 2–4h nội thành Đà Nẵng. Từ 490.000đ.",
		},
	};
}

export default async function ShirazDaNangPage() {
	const pageUrl = buildPageUrl("vi", "/shiraz-da-nang");

	const localBusinessJsonLd = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "Viora Wine Đà Nẵng",
		description: "Shop rượu vang Shiraz Úc nhập khẩu chính hãng tại Đà Nẵng. Giao 2–4h nội thành.",
		url: pageUrl,
		telephone: "+84-338-909-973",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Đường Tố Hữu",
			addressLocality: "Đà Nẵng",
			addressRegion: "Đà Nẵng",
			postalCode: "550000",
			addressCountry: "VN",
		},
		geo: { "@type": "GeoCoordinates", latitude: 16.0470797, longitude: 108.19163245 },
		areaServed: { "@type": "City", name: "Đà Nẵng" },
		openingHours: ["Mo-Su 10:00-23:00"],
		priceRange: "490000-2000000 VND",
		aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2000", bestRating: "5" },
	};

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqItems.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: { "@type": "Answer", text: item.a },
		})),
	};

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Rượu Vang Shiraz", item: `${SITE_URL}/ruou-vang-shiraz` },
			{ "@type": "ListItem", position: 3, name: "Shiraz Đà Nẵng", item: pageUrl },
		],
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* ── Hero ─────────────────────────────────────────────── */}
				<section className="bg-gradient-to-br from-[#6B0F1A] to-[#B22222] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
							<span>/</span>
							<a href="/ruou-vang-shiraz" className="transition-colors hover:text-white">Rượu Vang Shiraz</a>
							<span>/</span>
							<span className="text-white">Đà Nẵng</span>
						</nav>

						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
								Rượu Vang Shiraz{" "}
								<span className="text-yellow-400">Đà Nẵng</span>
								<br />
								<span className="text-2xl font-medium sm:text-3xl">Giao Nhanh 2–4h Nội Thành</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Viora Wine — shop rượu vang Shiraz Úc nhập khẩu chính hãng tại Đà Nẵng. Giao tận nhà
								trong 2–4 giờ, đóng gói chuyên dụng không vỡ. Hơn 2.000 khách hàng Đà Nẵng tin dùng.
							</p>

							<div className="mb-8 flex flex-wrap gap-3 text-sm">
								{[
									"⚡ Giao 2–4h nội thành Đà Nẵng",
									"🏅 Shiraz Úc chính hãng 100%",
									"⭐ 4.9/5 — 2.000+ khách hàng",
								].map((b) => (
									<span key={b} className="rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">{b}</span>
								))}
							</div>

							<div className="flex flex-wrap gap-3">
								<a
									href={ZALO_LINK}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-lg bg-yellow-400 px-8 py-3.5 font-bold text-gray-900 transition-colors hover:bg-yellow-300"
								>
									Đặt hàng qua Zalo ngay
								</a>
								<a
									href="/ruou-vang-shiraz"
									className="rounded-lg border border-white/40 px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
								>
									← Xem tất cả Shiraz
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* ── Delivery detail ──────────────────────────────────── */}
				<section className="border-b border-gray-100 bg-white py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-6 text-lg font-bold text-gray-900">
							Giao Rượu Vang Shiraz Đà Nẵng — Nhanh Nhất Thị Trường
						</h2>
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{ icon: "⚡", title: "2–4h nội thành", desc: "Tân Chính, Mỹ Khê, Hải Châu, Ngũ Hành Sơn, Sơn Trà, Thanh Khê, Liên Chiểu" },
								{ icon: "📦", title: "Đóng gói chuyên dụng", desc: "Thùng xốp + bubble wrap. Cam kết 100% không vỡ chai khi nhận" },
								{ icon: "💳", title: "Thanh toán linh hoạt", desc: "COD tiền mặt, chuyển khoản, MoMo, VNPay — trả khi nhận hàng" },
								{ icon: "🔁", title: "Đổi trả dễ dàng", desc: "Chai lỗi hoặc không đúng → đổi trả ngay trong ngày, không điều kiện" },
							].map((item) => (
								<div key={item.title} className="flex gap-3">
									<span className="mt-0.5 shrink-0 text-2xl">{item.icon}</span>
									<div>
										<p className="font-semibold text-gray-900">{item.title}</p>
										<p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── Products ─────────────────────────────────────────── */}
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
						Mua Rượu Vang Shiraz Đà Nẵng
					</h2>
					<p className="mb-8 text-gray-500">
						Shiraz Úc nhập khẩu chính hãng — được khách hàng Đà Nẵng đặt nhiều nhất.
					</p>

					<WineProductGrid grapeVariety="Shiraz" emptyLabel="Đang cập nhật sản phẩm Shiraz Đà Nẵng mới nhất" />
				</section>

				{/* ── Why Shiraz Úc ────────────────────────────────────── */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
								Rượu Vang Úc Shiraz — Lý Do Được Yêu Thích Tại Đà Nẵng
							</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									Khí hậu nắng nóng và văn hóa BBQ bãi biển của Đà Nẵng tạo nên sự kết hợp hoàn hảo
									với <strong>Shiraz Úc</strong>. Đây là loại vang đỏ đậm đà, vị cay nhẹ hạt tiêu,
									hương mận và chocolate đen — tất cả đều tôn lên hương vị của thịt nướng, hải sản
									nướng và các buổi tiệc ngoài trời đặc trưng của thành phố biển.
								</p>
								<p>
									Khác với Bordeaux hay Burgundy đắt tiền và khó tiếp cận,{" "}
									<strong>Shiraz Úc từ Barossa Valley</strong> có giá cả hợp lý (từ 490.000đ), vị dễ
									uống ngay cả với người mới, và cực kỳ linh hoạt với ẩm thực Đà Nẵng — từ bê thui
									Cầu Mống đến mì Quảng, từ hải sản Mỹ Khê đến các buổi tiệc tất niên.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ── FAQ ──────────────────────────────────────────────── */}
				<section className="py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
							Hỏi Đáp — Rượu Vang Shiraz Đà Nẵng
						</h2>
						<div className="space-y-4">
							{faqItems.map((item) => (
								<div key={item.q} className="rounded-2xl border border-gray-200 bg-white p-6">
									<h3 className="mb-3 font-semibold text-gray-900">{item.q}</h3>
									<p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── Cross-link to Hà Nội + parent ────────────────────── */}
				<section className="border-t border-gray-100 bg-gray-50 py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<p className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-wide">Xem thêm</p>
						<div className="flex flex-wrap gap-4">
							<a href="/ruou-vang-shiraz"
								className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#B22222] hover:text-[#B22222]">
								← Rượu Vang Shiraz (toàn quốc)
							</a>
							<a href="/ruou-vang-shiraz-ha-noi"
								className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#B22222] hover:text-[#B22222]">
								Rượu Vang Shiraz Hà Nội →
							</a>
						</div>
					</div>
				</section>

				{/* ── CTA ──────────────────────────────────────────────── */}
				<section className="py-16">
					<div className="mx-auto max-w-xl px-4 text-center">
						<h2 className="mb-2 text-2xl font-bold text-gray-900">Đặt Shiraz Giao Tận Nhà Đà Nẵng</h2>
						<p className="mb-2 text-gray-500">Giao 2–4h nội thành &nbsp;•&nbsp; Miễn phí tư vấn</p>
						<p className="mb-8 font-semibold text-[#B22222]">📞 Zalo: 0338-909-973</p>
						<div className="flex flex-wrap justify-center gap-4">
							<a href={ZALO_LINK} target="_blank" rel="noopener noreferrer"
								className="rounded-lg bg-[#B22222] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#8B0000]">
								Nhắn tin Zalo đặt hàng
							</a>
							<a href="/san-pham"
								className="rounded-lg border border-gray-300 px-8 py-3.5 font-semibold text-gray-700 transition-colors hover:border-gray-500">
								Xem toàn bộ sản phẩm
							</a>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
