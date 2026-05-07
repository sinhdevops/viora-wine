import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";

export const revalidate = 3600;

const faqItems = [
	{
		q: "Rượu vang trắng khác gì rượu vang đỏ?",
		a: "Rượu vang trắng được lên men không tiếp xúc với vỏ nho, nên không có tanin và màu nhạt hơn. Vị thanh mát, độ chua cao hơn, hương hoa quả tươi. Thích hợp uống lạnh 8–12°C và kết hợp với hải sản, gà, salad.",
	},
	{
		q: "Chardonnay và Sauvignon Blanc khác nhau như thế nào?",
		a: "Chardonnay thường đầy đặn hơn, hương bơ, vanilla và tropical fruit nếu ủ gỗ sồi. Sauvignon Blanc tươi mát hơn, hương chanh, bưởi, cỏ xanh — không qua gỗ sồi. Người mới bắt đầu thường thích Chardonnay vì vị dễ uống hơn.",
	},
	{
		q: "Rượu vang trắng uống với gì ngon nhất?",
		a: "Hải sản (tôm, cá, sò) là pairing kinh điển. Chardonnay hợp với gà nướng, risotto, phô mai mềm. Sauvignon Blanc tuyệt vời với salad, sushi, các món rau củ nhẹ nhàng.",
	},
	{
		q: "Rượu vang trắng bảo quản và phục vụ ở nhiệt độ bao nhiêu?",
		a: "Phục vụ 8–12°C — uống lạnh giúp giữ hương thơm và vị tươi mát. Bảo quản trong tủ wine 10–14°C hoặc tủ lạnh thông thường. Sau khi mở nút, dùng trong 3–5 ngày nếu bảo quản trong tủ lạnh.",
	},
];

const ZALO_LINK = "https://zalo.me/0325610016";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const url = buildPageUrl(locale, "/white-wine");
	return {
		title: "Rượu Vang Trắng Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang trắng nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Chardonnay, Sauvignon Blanc, Riesling, Pinot Grigio từ Pháp, Ý, Úc. Từ 350.000đ. Giao nhanh 2–4h.",
		keywords: [
			"rượu vang trắng", "rượu vang trắng nhập khẩu", "mua rượu vang trắng", "Chardonnay",
			"Sauvignon Blanc", "Riesling", "Pinot Grigio", "rượu vang trắng Pháp", "rượu vang trắng Úc",
			"rượu vang trắng Đà Nẵng", "rượu vang trắng Hà Nội", "Viora Wine",
		],
		alternates: buildAlternates(locale, "/white-wine"),
		openGraph: {
			title: "Rượu Vang Trắng Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Chardonnay, Sauvignon Blanc, Riesling chính hãng. Tươi mát, thanh thoát. Từ 350.000đ.",
			url,
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [{ url: `${SITE_URL}/statics/images/og-home.jpg`, width: 1200, height: 630, alt: "Rượu Vang Trắng – Viora Wine" }],
		},
		twitter: { card: "summary_large_image", title: "Rượu Vang Trắng Nhập Khẩu – Viora Wine", description: "Chardonnay, Sauvignon Blanc chính hãng từ 350.000đ." },
	};
}

export default async function WhiteWinePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/white-wine");

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
			{ "@type": "ListItem", position: 3, name: "Rượu Vang Trắng", item: pageUrl },
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
		name: "Rượu Vang Trắng Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang trắng nhập khẩu chính hãng từ Pháp, Ý, Úc tại Viora Wine.",
		url: pageUrl,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* Hero */}
				<section className="bg-linear-to-br from-[#7B6D3A] to-[#C8A951] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">Sản phẩm</a>
							<span>/</span>
							<span className="text-white">Rượu Vang Trắng</span>
						</nav>
						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
								Rượu Vang Trắng <span className="text-yellow-300">Nhập Khẩu Chính Hãng</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Tươi mát, thanh thoát với hương hoa quả tinh tế — Chardonnay, Sauvignon Blanc, Riesling và
								nhiều hơn nữa. Lựa chọn hoàn hảo cho hải sản, salad và những buổi chiều hè.
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
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Rượu Vang Trắng Tại Viora Wine</h2>
					<p className="mb-8 text-gray-500">Toàn bộ vang trắng nhập khẩu chính hãng — tươi mát, thanh thoát, hợp mọi khẩu vị.</p>
					<WineProductGrid wineType="white" emptyLabel="Đang cập nhật danh sách rượu vang trắng mới nhất" />
				</section>

				{/* What is white wine */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Rượu Vang Trắng Là Gì?</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									<strong>Rượu vang trắng</strong> được sản xuất từ nho xanh hoặc nho đỏ nhưng{" "}
									<strong>lên men không tiếp xúc vỏ</strong> — đây là điểm khác biệt cốt lõi so với vang đỏ.
									Kết quả là màu vàng rơm đến vàng xanh, hầu như không có tanin, vị tươi mát và độ chua thanh.
								</p>
								<p>
									Các giống nho trắng nổi tiếng nhất bao gồm <strong>Chardonnay</strong> (đầy đặn, hương bơ và
									trái cây nhiệt đới), <strong>Sauvignon Blanc</strong> (sắc nét, hương chanh và cỏ xanh),{" "}
									<strong>Riesling</strong> (hương hoa và khoáng chất độc đáo) và <strong>Pinot Grigio</strong>{" "}
									(nhẹ nhàng, dễ uống hàng ngày).
								</p>
								<p>
									Rượu vang trắng là lựa chọn lý tưởng cho bữa trưa nhẹ, tiệc ngoài trời và các dịp cần sự
									tươi mát. Đặc biệt hoàn hảo khi kết hợp với <strong>hải sản, gà, rau củ và phô mai tươi</strong>{" "}
									— những thực phẩm phổ biến trong ẩm thực Việt Nam và quốc tế.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Characteristics */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">Đặc Điểm Rượu Vang Trắng</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{ icon: "🥂", title: "Màu sắc", desc: "Vàng rơm nhạt (Pinot Grigio) đến vàng vàng đậm (Chardonnay ủ gỗ). Màu phản ánh giống nho và phương pháp sản xuất" },
								{ icon: "🌸", title: "Hương thơm", desc: "Chanh, táo, lê, đào (vang trẻ) — bơ, vanilla, mật ong, nấm (vang ủ gỗ lâu năm). Riesling thêm hương khoáng chất và xăng" },
								{ icon: "👅", title: "Vị giác", desc: "Thanh mát, chua nhẹ, hầu như không có tanin. Chardonnay đầy đặn hơn, Sauvignon Blanc sắc nét hơn" },
								{ icon: "🌡️", title: "Phục vụ", desc: "8–12°C — nhất thiết phải uống lạnh để giữ hương thơm tươi. Không nên uống ở nhiệt độ phòng vì mất đi sự tươi mát" },
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
				<section className="bg-[#7B6D3A] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">Rượu Vang Trắng Uống Cùng Gì Ngon Nhất?</h2>
						<p className="mx-auto mb-10 max-w-2xl text-center text-white/75">
							Độ chua thanh của vang trắng làm sáng lên hương vị hải sản và các món nhẹ — pairing hoàn hảo cho ẩm thực Việt Nam và Địa Trung Hải.
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ dish: "🦐 Tôm hùm / Hải sản nướng", note: "Sauvignon Blanc tôn lên vị ngọt tự nhiên của hải sản — pairing kinh điển không thể nhầm" },
								{ dish: "🐟 Cá hấp / Cá nướng", note: "Chardonnay nhẹ hoàn hảo với cá trắng, tránh lấn át hương vị繊細 của cá" },
								{ dish: "🥗 Salad / Rau củ", note: "Sauvignon Blanc tươi mát làm dịu vị chua của salad, hương cỏ xanh hòa quyện tuyệt vời" },
								{ dish: "🍗 Gà nướng / Gà hấp", note: "Chardonnay đầy đặn đủ sức đi kèm thịt gà mà không lấn át" },
								{ dish: "🧀 Phô mai tươi / Brie", note: "Riesling và Sauvignon Blanc cân bằng hoàn hảo với phô mai mềm béo ngậy" },
								{ dish: "🍜 Phở gà / Bún cá", note: "Vang trắng nhẹ như Pinot Grigio bổ sung mà không cạnh tranh với nước dùng thanh ngọt" },
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
								{ href: "/ruou-vang-hong", label: "🌸 Rượu Vang Hồng", desc: "Màu hồng quyến rũ, hương dâu tây tươi mát" },
								{ href: "/ruou-vang-shiraz", label: "🍇 Shiraz Úc", desc: "Đậm đà, cay nhẹ — đặc sản từ Barossa Valley" },
							].map((item) => (
								<a key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#C8A951] hover:bg-amber-50">
									<div>
										<p className="font-semibold group-hover:text-[#7B6D3A]">{item.label}</p>
										<p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
									</div>
									<span className="text-gray-400 group-hover:text-[#7B6D3A]">→</span>
								</a>
							))}
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">Câu Hỏi Thường Gặp Về Rượu Vang Trắng</h2>
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
						<h2 className="mb-3 text-2xl font-semibold text-gray-900">Đặt Rượu Vang Trắng Ngay Hôm Nay</h2>
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
