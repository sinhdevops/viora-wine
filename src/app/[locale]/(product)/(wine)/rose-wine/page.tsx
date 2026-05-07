import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";

export const revalidate = 3600;

const faqItems = [
	{
		q: "Rượu vang hồng (rosé) là gì?",
		a: "Rượu vang hồng được làm từ nho đỏ nhưng tiếp xúc vỏ trong thời gian ngắn (2–20 giờ) thay vì vài tuần như vang đỏ. Kết quả là màu hồng tươi đẹp, ít tanin hơn vang đỏ, tươi mát hơn vang đỏ nhưng đậm hơn vang trắng.",
	},
	{
		q: "Rượu vang hồng uống lạnh hay ấm?",
		a: "Nên uống lạnh 8–13°C — tương tự vang trắng. Uống lạnh giúp giữ hương thơm trái cây tươi và vị thanh mát. Đây là điểm làm cho rosé đặc biệt phù hợp với mùa hè và bữa tiệc ngoài trời.",
	},
	{
		q: "Rượu vang hồng Provence khác gì các loại rosé khác?",
		a: "Provence (miền Nam nước Pháp) nổi tiếng với rosé màu hồng phấn nhạt, vị khô, thanh elegant với hương đào trắng và hoa hồng. Đây là phong cách rosé được coi là 'chuẩn mực thế giới'. Rosé Tây Ban Nha thường đậm hơn, rosé Chile trái cây hơn.",
	},
	{
		q: "Viora Wine có rosé nào giá tốt không?",
		a: "Viora Wine luôn có rosé từ 390.000đ, nhập khẩu chính hãng từ Pháp, Ý, Tây Ban Nha. Liên hệ Zalo 0338-909-973 để được tư vấn chai phù hợp ngân sách và dịp uống.",
	},
];

const ZALO_LINK = "https://zalo.me/0325610016";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const url = buildPageUrl(locale, "/rose-wine");
	return {
		title: "Rượu Vang Hồng (Rosé) Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang hồng (rosé) nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Provence, Tây Ban Nha, Chile — màu hồng tươi, hương dâu tây, uống mát lạnh cực ngon. Từ 390.000đ. Giao nhanh 2–4h.",
		keywords: [
			"rượu vang hồng", "rượu vang rosé", "vang hồng nhập khẩu", "mua rượu vang hồng",
			"rượu vang hồng Pháp", "Provence rosé", "rượu vang hồng Tây Ban Nha", "rosé Đà Nẵng",
			"rượu vang hồng chính hãng", "Viora Wine", "rượu vang hồng ngon",
		],
		alternates: buildAlternates(locale, "/rose-wine"),
		openGraph: {
			title: "Rượu Vang Hồng (Rosé) Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Rosé chính hãng từ Pháp, Ý, Tây Ban Nha. Màu hồng tươi, uống mát lạnh. Từ 390.000đ.",
			url,
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [{ url: `${SITE_URL}/statics/images/og-home.jpg`, width: 1200, height: 630, alt: "Rượu Vang Hồng – Viora Wine" }],
		},
		twitter: { card: "summary_large_image", title: "Rượu Vang Hồng (Rosé) – Viora Wine", description: "Rosé chính hãng từ 390.000đ. Giao nhanh toàn quốc." },
	};
}

export default async function RoseWinePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/rose-wine");

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
			{ "@type": "ListItem", position: 3, name: "Rượu Vang Hồng", item: pageUrl },
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
		name: "Rượu Vang Hồng (Rosé) Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang hồng (rosé) nhập khẩu chính hãng từ Pháp, Ý, Tây Ban Nha tại Viora Wine.",
		url: pageUrl,
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* Hero */}
				<section className="bg-linear-to-br from-[#9B3065] to-[#E8709A] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">Sản phẩm</a>
							<span>/</span>
							<span className="text-white">Rượu Vang Hồng</span>
						</nav>
						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
								Rượu Vang Hồng <span className="text-yellow-300">Nhập Khẩu Chính Hãng</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Màu hồng tươi quyến rũ, hương dâu tây và hoa tươi, vị thanh mát nhẹ nhàng — Rosé là lựa chọn
								lý tưởng cho tiệc ngoài trời, picnic và những khoảnh khắc vui vẻ cùng bạn bè.
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
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Rượu Vang Hồng Tại Viora Wine</h2>
					<p className="mb-8 text-gray-500">Toàn bộ rosé nhập khẩu chính hãng — màu đẹp, vị thanh, hương thơm quyến rũ.</p>
					<WineProductGrid wineType="rose" emptyLabel="Đang cập nhật danh sách rượu vang hồng mới nhất" />
				</section>

				{/* What is rosé */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Rượu Vang Hồng (Rosé) Là Gì?</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									<strong>Rượu vang hồng</strong> hay <strong>Rosé</strong> là loại vang được làm từ nho đỏ
									nhưng với thời gian ngâm vỏ rất ngắn — chỉ từ vài giờ đến vài ngày. Khoảng thời gian này đủ
									để trích xuất màu hồng đẹp từ vỏ nho mà không lấy nhiều tanin, tạo ra phong cách{" "}
									<strong>nhẹ hơn vang đỏ nhưng đậm hơn vang trắng</strong>.
								</p>
								<p>
									Vùng <strong>Provence</strong> (miền Nam nước Pháp) được mệnh danh là "thủ đô rosé thế giới" —
									nơi sản xuất loại rosé màu hồng phấn nhạt tinh tế, vị khô và elegant. Ngoài ra,{" "}
									<strong>Tây Ban Nha</strong> (Navarra), <strong>Ý</strong> (Tuscany) và{" "}
									<strong>Chile</strong> cũng sản xuất rosé xuất sắc với phong cách trái cây phong phú hơn.
								</p>
								<p>
									Rosé từng bị coi là "vang thứ cấp" nhưng nay đã hoàn toàn thay đổi vị thế — được giới sành
									rượu đánh giá cao và trở thành{" "}
									<strong>xu hướng uống rượu thống trị mùa hè toàn cầu</strong>. Tại Việt Nam, rosé ngày càng
									được ưa chuộng nhờ màu sắc đẹp, phù hợp chụp ảnh và vị dễ uống.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Characteristics */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">Đặc Điểm Rượu Vang Hồng</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{ icon: "🌸", title: "Màu sắc", desc: "Từ hồng phấn nhạt tinh tế (Provence) đến hồng đào đậm (Tây Ban Nha). Màu sắc phụ thuộc thời gian ngâm vỏ nho" },
								{ icon: "🍓", title: "Hương thơm", desc: "Dâu tây tươi, mâm xôi, đào, hoa hồng, hoa nhài — tươi mát và quyến rũ. Provence thêm hương thảo mộc Địa Trung Hải" },
								{ icon: "👅", title: "Vị giác", desc: "Thanh mát, ít tanin, độ chua vừa phải, vị trái cây rõ ràng. Nhẹ nhàng hơn vang đỏ nhưng phong phú hơn vang trắng" },
								{ icon: "🌡️", title: "Phục vụ", desc: "8–13°C — uống lạnh giống vang trắng. Ướp lạnh 2 tiếng trước khi uống. Hoàn hảo cho bữa tiệc hè ngoài trời" },
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
				<section className="bg-[#9B3065] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">Rosé Uống Cùng Gì Ngon Nhất?</h2>
						<p className="mx-auto mb-10 max-w-2xl text-center text-white/75">
							Rosé là loại vang linh hoạt nhất — đủ nhẹ để đi với salad, đủ đậm để kết hợp với thịt gà và hải sản đậm vị.
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{ dish: "🦞 Hải sản nướng / Tôm hùm", note: "Rosé đủ đậm để đi với hải sản nướng có gia vị — nơi vang trắng đôi khi quá nhẹ" },
								{ dish: "🥗 Salad Niçoise / Caesar", note: "Provence rosé và salad Địa Trung Hải — pairing sinh ra để dành cho nhau" },
								{ dish: "🍗 Gà nướng BBQ", note: "Rosé đậm (Tây Ban Nha) tuyệt vời với gà nướng than, đặc biệt ngày hè" },
								{ dish: "🥐 Charcuterie / Pâté", note: "Rosé nhẹ Provence với bảng charcuterie — phong cách Pháp hoàn hảo" },
								{ dish: "🍕 Pizza thịt nguội", note: "Rosé đủ linh hoạt để đi với cả pizza — nhẹ hơn vang đỏ nhưng không nhạt nhẽo" },
								{ dish: "🍜 Bún thịt nướng / Nem lụi", note: "Ẩm thực Việt thường nhẹ và thơm — rosé tươi mát là người bạn đồng hành lý tưởng" },
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
								{ href: "/ruou-vang-shiraz", label: "🍇 Shiraz Úc", desc: "Đậm đà, cay nhẹ — đặc sản từ Barossa Valley" },
							].map((item) => (
								<a key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#E8709A] hover:bg-pink-50">
									<div>
										<p className="font-semibold group-hover:text-[#9B3065]">{item.label}</p>
										<p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
									</div>
									<span className="text-gray-400 group-hover:text-[#9B3065]">→</span>
								</a>
							))}
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">Câu Hỏi Thường Gặp Về Rượu Vang Hồng</h2>
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
						<h2 className="mb-3 text-2xl font-semibold text-gray-900">Đặt Rượu Vang Hồng Ngay Hôm Nay</h2>
						<p className="mb-8 text-gray-500">Giao nhanh 2–4h tại Đà Nẵng &nbsp;•&nbsp; Miễn phí tư vấn &nbsp;•&nbsp; Giá tốt nhất thị trường</p>
						<div className="flex flex-wrap justify-center gap-4">
							<a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#9B3065] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#7a2450]">
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
