import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";

export const revalidate = 3600;

const faqItems = [
	{
		q: "Rượu vang đỏ là gì?",
		a: "Rượu vang đỏ được lên men từ nho đỏ hoặc nho đen nguyên vỏ, tạo màu đỏ đặc trưng từ anthocyanin. Vị đậm đà, tanin cao, hương trái cây đỏ và đen, thích hợp uống cùng thịt đỏ và phô mai cứng.",
	},
	{
		q: "Rượu vang đỏ nào ngon nhất cho người mới bắt đầu?",
		a: "Merlot và Pinot Noir là lựa chọn tốt nhất — tanin mềm, vị trái cây dễ chịu, ít chát hơn Cabernet Sauvignon. Shiraz Úc cũng rất được ưa chuộng nhờ vị fruit-forward và cay nhẹ đặc trưng.",
	},
	{
		q: "Uống rượu vang đỏ ở nhiệt độ bao nhiêu?",
		a: "Nhiệt độ lý tưởng là 16–18°C. Không nên uống quá lạnh vì làm mất hương vị, không nên uống quá ấm vì cồn sẽ nổi bật hơn. Nếu bảo quản tủ lạnh, để ra ngoài 20–30 phút trước khi uống.",
	},
	{
		q: "Viora Wine có giao rượu vang đỏ toàn quốc không?",
		a: "Có! Viora Wine giao hàng toàn quốc với đóng gói chuyên dụng chống vỡ. Tại Đà Nẵng giao nhanh 2–4 giờ. Các tỉnh khác giao 1–3 ngày làm việc. Tư vấn miễn phí qua Zalo: 0338-909-973.",
	},
];

const ZALO_LINK = "https://zalo.me/0325610016";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const url = buildPageUrl(locale, "/red-wine");
	return {
		title: "Rượu Vang Đỏ Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang đỏ nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Cabernet Sauvignon, Merlot, Shiraz từ Pháp, Ý, Úc, Chile. Từ 390.000đ. Giao nhanh 2–4h. Tư vấn miễn phí: 0338-909-973.",
		keywords: [
			"rượu vang đỏ", "rượu vang đỏ nhập khẩu", "mua rượu vang đỏ", "rượu vang đỏ chính hãng",
			"rượu vang đỏ Pháp", "rượu vang đỏ Ý", "rượu vang đỏ Úc", "rượu vang đỏ Chile",
			"Cabernet Sauvignon", "Merlot", "Pinot Noir", "rượu vang đỏ Đà Nẵng",
			"rượu vang đỏ Hà Nội", "shop rượu vang đỏ", "Viora Wine",
		],
		alternates: buildAlternates(locale, "/red-wine"),
		openGraph: {
			title: "Rượu Vang Đỏ Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Vang đỏ chính hãng từ Pháp, Ý, Úc, Chile. Từ 390.000đ. Giao nhanh 2–4h toàn quốc.",
			url,
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [{ url: `${SITE_URL}/statics/images/og-home.jpg`, width: 1200, height: 630, alt: "Rượu Vang Đỏ – Viora Wine" }],
		},
		twitter: { card: "summary_large_image", title: "Rượu Vang Đỏ Nhập Khẩu – Viora Wine", description: "Vang đỏ chính hãng từ 390.000đ. Giao nhanh 2–4h Đà Nẵng." },
	};
}

export default async function RedWinePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/red-wine");

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
			{ "@type": "ListItem", position: 3, name: "Rượu Vang Đỏ", item: pageUrl },
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
		name: "Rượu Vang Đỏ Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang đỏ nhập khẩu chính hãng từ Pháp, Ý, Úc, Chile tại Viora Wine.",
		url: pageUrl,
		breadcrumb: breadcrumbJsonLd,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* Hero */}
				<section className="bg-linear-to-br from-[#6B0F1A] to-[#B22222] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">Sản phẩm</a>
							<span>/</span>
							<span className="text-white">Rượu Vang Đỏ</span>
						</nav>
						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
								Rượu Vang Đỏ <span className="text-yellow-400">Nhập Khẩu Chính Hãng</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Tuyển chọn kỹ lưỡng từ các vùng nổi tiếng thế giới — Bordeaux, Tuscany, Barossa Valley,
								Mendoza. Đậm đà, tanin cân bằng, hoàn hảo cho bữa tiệc và những khoảnh khắc đặc biệt.
							</p>
							<div className="flex flex-wrap gap-3 text-sm">
								{["Nhập khẩu chính hãng 100%", "Giao nhanh 2–4h tại Đà Nẵng", "Tư vấn miễn phí 24/7"].map((b) => (
									<span key={b} className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
										<span className="text-yellow-400">✓</span> {b}
									</span>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Product grid */}
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Rượu Vang Đỏ Tại Viora Wine</h2>
					<p className="mb-8 text-gray-500">Toàn bộ vang đỏ nhập khẩu chính hãng — tuyển chọn từ các vùng rượu nổi tiếng thế giới.</p>
					<WineProductGrid wineType="red" emptyLabel="Đang cập nhật danh sách rượu vang đỏ mới nhất" />
				</section>

				{/* What is red wine */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Rượu Vang Đỏ Là Gì?</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									<strong>Rượu vang đỏ</strong> được sản xuất từ các giống nho đỏ và đen như{" "}
									<strong>Cabernet Sauvignon, Merlot, Pinot Noir, Syrah/Shiraz, Malbec</strong>. Điểm khác biệt
									lớn nhất so với vang trắng là quá trình lên men <strong>có tiếp xúc với vỏ nho</strong> — chính
									vỏ nho tạo ra màu đỏ đặc trưng, tanin và nhiều hợp chất polyphenol có lợi cho sức khỏe.
								</p>
								<p>
									Tanin trong rượu vang đỏ là "chữ ký" quan trọng — tạo cảm giác se miệng nhẹ nhàng và giúp rượu
									có khả năng lưu trữ lâu dài. Tanin cao hay thấp phụ thuộc vào giống nho, vùng trồng và phương
									pháp sản xuất. <strong>Cabernet Sauvignon</strong> có tanin mạnh và cần thời gian ủ dài, trong
									khi <strong>Pinot Noir</strong> và <strong>Merlot</strong> tanin mềm hơn, dễ uống hơn.
								</p>
								<p>
									Tại Việt Nam, rượu vang đỏ được ưa chuộng nhất nhờ vị đậm đà phù hợp với các món thịt nướng,
									lẩu và bữa tiệc. Shiraz Úc và Cabernet Sauvignon Chile là hai lựa chọn phổ biến nhất vì giá
									tốt, chất lượng ổn định và dễ tìm thấy ở mức giá 400.000–900.000đ.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Characteristics */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">Đặc Điểm Rượu Vang Đỏ</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{ icon: "🍷", title: "Màu sắc", desc: "Từ đỏ ruby nhạt (Pinot Noir) đến tím đen sâu (Cabernet, Shiraz) — màu sắc phản ánh độ đậm và tuổi rượu" },
								{ icon: "🌸", title: "Hương thơm", desc: "Trái cây đỏ (cherry, dâu), trái cây đen (mận, blackberry), hoa violet, vani, gỗ sồi, đôi khi có hương đất và thuốc lá" },
								{ icon: "👅", title: "Vị giác", desc: "Đậm đà, tanin cân bằng, độ chua vừa phải. Vị khác nhau tùy giống nho — từ mềm mại (Merlot) đến mạnh mẽ (Cab Sauv)" },
								{ icon: "🌡️", title: "Phục vụ", desc: "16–18°C là nhiệt độ lý tưởng. Decant 20–30 phút với rượu trẻ để mở hương. Bảo quản 14–18°C, tránh ánh sáng" },
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
				<section className="bg-[#6B0F1A] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">Rượu Vang Đỏ Uống Cùng Gì Ngon Nhất?</h2>
						<p className="mx-auto mb-10 max-w-2xl text-center text-white/75">
							Tanin trong vang đỏ tương tác với protein trong thịt, làm mềm tanin và tôn lên hương vị món ăn — đây là lý do vang đỏ &amp; thịt đỏ là cặp đôi kinh điển.
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ dish: "🥩 Bò nướng / Steak", note: "Pairing kinh điển nhất — Cabernet Sauvignon hoặc Shiraz đậm đà tôn lên vị ngọt của thịt bò" },
								{ dish: "🍖 Cừu quay / Sườn BBQ", note: "Tanin Shiraz cắt qua chất béo cừu, tạo cân bằng hoàn hảo" },
								{ dish: "🫕 Bò lúc lắc / Bò hầm", note: "Món Việt hợp nhất với vang đỏ — sốt đậm đà hòa quyện với tanin" },
								{ dish: "🧀 Phô mai cứng", note: "Cheddar, Manchego — tanin và béo ngậy tạo nên sự cân bằng tuyệt vời" },
								{ dish: "🍝 Pasta thịt bò / Pizza", note: "Sangiovese Ý hoàn hảo với pasta bolognese và pizza pepperoni" },
								{ dish: "🌶️ Lẩu thập cẩm / Nướng", note: "Vang đỏ tầm trung giúp bữa nhậu bạn bè thêm đặc biệt" },
							].map((item) => (
								<div key={item.dish} className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
									<p className="mb-1.5 font-semibold">{item.dish}</p>
									<p className="text-sm text-white/70">{item.note}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Internal links to other wine types */}
				<section className="border-y border-gray-100 bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-6 text-xl font-semibold sm:text-2xl">Khám Phá Thêm Các Loại Rượu Vang</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ href: "/ruou-vang-trang", label: "🥂 Rượu Vang Trắng", desc: "Tươi mát, thanh thoát — Chardonnay, Sauvignon Blanc" },
								{ href: "/ruou-vang-hong", label: "🌸 Rượu Vang Hồng", desc: "Màu hồng quyến rũ, hương dâu tây, uống mát cực ngon" },
								{ href: "/ruou-vang-shiraz", label: "🍇 Shiraz Úc", desc: "Đậm đà, cay nhẹ — đặc sản từ Barossa Valley" },
							].map((item) => (
								<a key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#B22222] hover:bg-red-50">
									<div>
										<p className="font-semibold group-hover:text-[#B22222]">{item.label}</p>
										<p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
									</div>
									<span className="text-gray-400 group-hover:text-[#B22222]">→</span>
								</a>
							))}
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">Câu Hỏi Thường Gặp Về Rượu Vang Đỏ</h2>
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
						<h2 className="mb-3 text-2xl font-semibold text-gray-900">Đặt Rượu Vang Đỏ Ngay Hôm Nay</h2>
						<p className="mb-8 text-gray-500">Giao nhanh 2–4h tại Đà Nẵng &nbsp;•&nbsp; Miễn phí tư vấn &nbsp;•&nbsp; Giá tốt nhất thị trường</p>
						<div className="flex flex-wrap justify-center gap-4">
							<a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#B22222] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#8B0000]">
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
