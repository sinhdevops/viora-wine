import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";

export const revalidate = 3600;

const faqItems = [
	{
		q: "Rượu vang ngọt khác gì rượu vang khô?",
		a: "Rượu vang ngọt (sweet wine) có lượng đường dư cao hơn 45g/L sau lên men, tạo vị ngọt rõ ràng. Vang khô (dry wine) lên men gần hết đường, có vị chua và khô. Vang ngọt thường dễ uống hơn, phù hợp người mới bắt đầu và các dịp uống nhẹ nhàng.",
	},
	{
		q: "Rượu vang ngọt nổi tiếng nào đáng thử?",
		a: "Moscato d'Asti (Ý) — sủi bọt nhẹ, hương đào và hoa cam. Riesling Auslese (Đức) — ngọt cân bằng, hương khoáng chất độc đáo. Sauternes (Pháp) — ngọt phức tạp, hương mật ong và mơ. Port (Bồ Đào Nha) — ngọt đậm, mạnh, uống sau bữa tối.",
	},
	{
		q: "Rượu vang ngọt uống cùng gì ngon nhất?",
		a: "Tráng miệng là pairing kinh điển — nhưng vang ngọt không được ngọt hơn món tráng miệng nếu không sẽ mất cân bằng. Moscato hợp với bánh ngọt nhẹ, trái cây tươi. Riesling ngọt hợp với pâté và foie gras (béo ngậy cân bằng vị ngọt). Port hợp với phô mai xanh và chocolate đen.",
	},
	{
		q: "Rượu vang ngọt có cồn nhiều không?",
		a: "Hầu hết rượu vang ngọt có độ cồn thấp hơn vang khô — Moscato thường 5–7% ABV, Riesling ngọt 7–9% ABV. Riêng Port và Sherry ngọt có 17–20% do quá trình fortified (thêm rượu mạnh). Đây là lý do rượu vang ngọt được nhiều người ưa thích vì dễ uống hơn.",
	},
];

const ZALO_LINK = "https://zalo.me/0325610016";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const url = buildPageUrl(locale, "/sweet-wine");
	return {
		title: "Rượu Vang Ngọt Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang ngọt nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Moscato, Riesling, Sauternes — vị ngọt dịu, hương trái cây, dễ uống. Từ 380.000đ. Giao nhanh 2–4h.",
		keywords: [
			"rượu vang ngọt", "vang ngọt nhập khẩu", "mua rượu vang ngọt", "Moscato", "Riesling ngọt",
			"Sauternes", "rượu vang ngọt dễ uống", "rượu vang cho người mới", "vang ngọt Đà Nẵng",
			"rượu vang ngọt chính hãng", "Viora Wine",
		],
		alternates: buildAlternates(locale, "/sweet-wine"),
		openGraph: {
			title: "Rượu Vang Ngọt Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Moscato, Riesling, Sauternes chính hãng. Ngọt dịu, dễ uống. Từ 380.000đ.",
			url,
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [{ url: `${SITE_URL}/statics/images/og-home.jpg`, width: 1200, height: 630, alt: "Rượu Vang Ngọt – Viora Wine" }],
		},
		twitter: { card: "summary_large_image", title: "Rượu Vang Ngọt – Viora Wine", description: "Moscato, Riesling ngọt chính hãng từ 380.000đ." },
	};
}

export default async function SweetWinePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/sweet-wine");

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
			{ "@type": "ListItem", position: 3, name: "Rượu Vang Ngọt", item: pageUrl },
		],
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

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Rượu Vang Ngọt Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang ngọt nhập khẩu chính hãng: Moscato, Riesling, Sauternes tại Viora Wine.",
		url: pageUrl,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* Hero */}
				<section className="bg-linear-to-br from-[#5B3A8B] to-[#9B5FC0] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">Sản phẩm</a>
							<span>/</span>
							<span className="text-white">Rượu Vang Ngọt</span>
						</nav>
						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
								Rượu Vang Ngọt <span className="text-yellow-300">Nhập Khẩu Chính Hãng</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Moscato, Riesling, Sauternes — vị ngọt dịu, hương trái cây phong phú, độ cồn vừa phải.
								Lựa chọn hoàn hảo cho người mới bắt đầu và những buổi tiệc nhẹ nhàng.
							</p>
							<div className="flex flex-wrap gap-3 text-sm">
								{["Nhập khẩu chính hãng 100%", "Giao nhanh 2–4h tại Đà Nẵng", "Tư vấn miễn phí 24/7"].map((b) => (
									<span key={b} className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
										<span className="text-yellow-300">✓</span> {b}
									</span>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Product grid */}
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Rượu Vang Ngọt Tại Viora Wine</h2>
					<p className="mb-8 text-gray-500">Toàn bộ vang ngọt nhập khẩu chính hãng — dễ uống, thơm ngon, phù hợp mọi khẩu vị.</p>
					<WineProductGrid wineType="sweet" emptyLabel="Đang cập nhật danh sách rượu vang ngọt mới nhất" />
				</section>

				{/* What is sweet wine */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Rượu Vang Ngọt Là Gì?</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									<strong>Rượu vang ngọt</strong> là những loại vang có hàm lượng đường dư (residual sugar)
									cao sau quá trình lên men — thường từ 45g/L trở lên. Vị ngọt này có thể đến từ nhiều nguồn
									khác nhau: quá trình lên men bị dừng sớm, nho thu hoạch muộn (late harvest), hoặc nho bị ảnh
									hưởng bởi <strong>botrytis cinerea</strong> (nấm quý tạo ra Sauternes danh tiếng).
								</p>
								<p>
									<strong>Moscato d'Asti</strong> từ Ý là loại vang ngọt phổ biến nhất thế giới — sủi bọt nhẹ,
									độ cồn thấp 5–7%, hương đào, cam bergamot và hoa tươi. <strong>Riesling Spätlese/Auslese</strong>{" "}
									từ Đức mang hương khoáng chất độc đáo và vị ngọt cân bằng tuyệt vời. <strong>Sauternes</strong>{" "}
									từ Bordeaux là loại vang ngọt cao cấp nhất — phức tạp, hương mật ong, mơ và nghệ tây.
								</p>
								<p>
									Rượu vang ngọt là <strong>lý tưởng cho người mới bắt đầu</strong> vì vị quen thuộc và dễ tiếp
									cận. Không đắng, không chát, hương thơm rõ ràng — nhiều người khám phá tình yêu với rượu vang
									qua một chai Moscato lạnh trong buổi chiều hè.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Characteristics */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">Các Loại Vang Ngọt Nổi Tiếng</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{ icon: "🍑", title: "Moscato", desc: "Ý — sủi bọt nhẹ, 5–7% ABV, hương đào và hoa cam. Dễ uống nhất, phù hợp người mới bắt đầu" },
								{ icon: "🍋", title: "Riesling ngọt", desc: "Đức — hương khoáng chất và chanh, vị ngọt cân bằng độ chua tự nhiên. Phong phú và tinh tế" },
								{ icon: "🍯", title: "Sauternes", desc: "Pháp — botrytis tạo hương mật ong, mơ, nghệ tây. Loại vang ngọt cao cấp và lâu đời nhất thế giới" },
								{ icon: "🫐", title: "Late Harvest", desc: "Thu hoạch muộn — nho cô đặc đường tự nhiên, hương trái cây đậm đà, phong phú và dễ uống" },
							].map((item) => (
								<div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
									<div className="mb-3 text-3xl">{item.icon}</div>
									<h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
									<p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Food pairing */}
				<section className="bg-[#5B3A8B] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">Vang Ngọt Uống Cùng Gì Ngon Nhất?</h2>
						<p className="mx-auto mb-10 max-w-2xl text-center text-white/75">
							Nguyên tắc vàng: vang ngọt không được ngọt hơn món ăn — nếu không rượu sẽ trở nên nhạt nhẽo. Chọn vang ngọt cân bằng hoặc đi với món mặn để tạo tương phản thú vị.
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ dish: "🍰 Bánh mousse / Panna cotta", note: "Moscato sủi bọt tươi mát cân bằng độ béo của bánh ngọt nhẹ nhàng" },
								{ dish: "🍓 Trái cây tươi / Sorbet", note: "Riesling ngọt với dâu tây tươi và sorbet — refreshing pairing mùa hè" },
								{ dish: "🧀 Phô mai xanh (Roquefort)", note: "Sauternes & phô mai xanh mặn — tương phản ngọt-mặn tạo nên một trong những pairing huyền thoại" },
								{ dish: "🦆 Foie gras / Gan ngỗng", note: "Sauternes với foie gras — pairing truyền thống Pháp, béo ngậy và ngọt tương phản hoàn hảo" },
								{ dish: "🍫 Chocolate đen 70%+", note: "Late harvest đỏ ngọt với chocolate đen đắng — tương phản tạo hương vị phức tạp bất ngờ" },
								{ dish: "☕ Tráng miệng café / Tiramisu", note: "Moscato nhẹ không cạnh tranh với hương café, tạo cân bằng tuyệt vời" },
							].map((item) => (
								<div key={item.dish} className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
									<p className="mb-1.5 font-semibold">{item.dish}</p>
									<p className="text-sm text-white/70">{item.note}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Internal links */}
				<section className="border-y border-gray-100 bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-6 text-xl font-semibold sm:text-2xl">Khám Phá Thêm Các Loại Rượu Vang</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ href: "/ruou-vang-do", label: "🍷 Rượu Vang Đỏ", desc: "Đậm đà, tanin cân bằng — Cabernet Sauvignon, Merlot" },
								{ href: "/ruou-vang-trang", label: "🥂 Rượu Vang Trắng", desc: "Tươi mát, thanh thoát — Chardonnay, Sauvignon Blanc" },
								{ href: "/ruou-vang-hong", label: "🌸 Rượu Vang Hồng", desc: "Màu hồng quyến rũ, hương dâu tây tươi mát" },
							].map((item) => (
								<a key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#9B5FC0] hover:bg-purple-50">
									<div>
										<p className="font-semibold group-hover:text-[#5B3A8B]">{item.label}</p>
										<p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
									</div>
									<span className="text-gray-400 group-hover:text-[#5B3A8B]">→</span>
								</a>
							))}
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">Câu Hỏi Thường Gặp Về Rượu Vang Ngọt</h2>
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

				{/* CTA */}
				<section className="py-16">
					<div className="mx-auto max-w-xl px-4 text-center">
						<h2 className="mb-3 text-2xl font-semibold text-gray-900">Đặt Rượu Vang Ngọt Ngay Hôm Nay</h2>
						<p className="mb-8 text-gray-500">Giao nhanh 2–4h tại Đà Nẵng &nbsp;•&nbsp; Miễn phí tư vấn &nbsp;•&nbsp; Giá tốt nhất thị trường</p>
						<div className="flex flex-wrap justify-center gap-4">
							<a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#5B3A8B] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#4a2d73]">
								Tư vấn &amp; đặt hàng qua Zalo
							</a>
							<a href="/san-pham" className="rounded-lg border border-gray-300 px-8 py-3.5 font-semibold text-gray-700 transition-colors hover:border-gray-500">
								Xem tất cả sản phẩm
							</a>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
