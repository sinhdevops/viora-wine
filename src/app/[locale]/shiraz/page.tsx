import { createClient } from "@/utils/supabase/server";
import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import CardProduct from "@/components/page/card-product";
import type { DbProduct } from "@/@types/product";

export const revalidate = 3600;

const ZALO_LINK = "https://zalo.me/0325610016";

const faqItems = [
	{
		q: "Rượu vang Shiraz có vị như thế nào?",
		a: "Shiraz là loại vang đỏ đậm đà với hương trái cây đỏ và đen như mận, mâm xôi, blackberry. Đặc trưng nổi bật là vị cay nhẹ của hạt tiêu đen, tanin mềm mượt và hậu vị kéo dài. Shiraz Úc thường fruit-forward và dễ uống hơn so với Syrah của Pháp.",
	},
	{
		q: "Rượu vang Shiraz Úc khác gì Shiraz Pháp (Syrah)?",
		a: "Shiraz Úc (Barossa Valley, McLaren Vale) đậm đà, fruity, cay nhẹ và giàu màu sắc phong cách New World dễ tiếp cận. Syrah Pháp (Rhône Valley) tinh tế hơn, nhiều khoáng chất và herb hơn phong cách Old World. Shiraz Úc được ưa chuộng tại Việt Nam vì vị dễ uống và phù hợp khẩu vị châu Á.",
	},
	{
		q: "Shiraz uống cùng món ăn gì ngon nhất?",
		a: "Rượu vang Shiraz đặc biệt hợp với thịt đỏ: bò nướng, cừu quay, sườn BBQ, phô mai cứng. Với khẩu vị Việt Nam, Shiraz rất ngon khi uống cùng bò lúc lắc, lẩu bò, thịt nướng và các món sốt đậm đà. Nhiệt độ phục vụ lý tưởng là 16–18°C.",
	},
	{
		q: "Bảo quản rượu vang Shiraz như thế nào?",
		a: "Bảo quản ở 14–18°C, tránh ánh sáng mặt trời và nhiệt độ thay đổi đột ngột. Để nằm ngang nếu chai còn nút bần. Sau khi mở, dùng nút chân không và uống trong 3–5 ngày. Không nên để trong tủ lạnh thông thường quá 1 tuần vì nhiệt độ quá lạnh làm mất hương vị.",
	},
	{
		q: "Viora Wine có giao rượu Shiraz toàn quốc không?",
		a: "Có! Viora Wine giao hàng toàn quốc với đóng gói chuyên dụng chống vỡ. Tại Đà Nẵng giao nhanh 2–4 giờ. Các tỉnh khác giao 1–3 ngày làm việc qua J&T và GHN. Đặt hàng và tư vấn miễn phí qua Zalo: 0338-909-973.",
	},
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return {
		title: "Rượu Vang Shiraz Úc Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang Shiraz Úc nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Đậm đà, cay nhẹ, hợp bò nướng & thịt đỏ. Từ 490.000đ. Giao nhanh 2–4h. Tư vấn miễn phí: 0338-909-973.",
		keywords: [
			"rượu vang Shiraz",
			"rượu vang Shiraz Úc",
			"mua rượu vang Shiraz",
			"rượu vang Shiraz Đà Nẵng",
			"rượu vang Shiraz nhập khẩu",
			"Shiraz Barossa Valley",
			"rượu vang đỏ Shiraz",
			"Shiraz McLaren Vale",
			"rượu vang Úc Shiraz",
		],
		alternates: buildAlternates(locale, "/shiraz"),
		openGraph: {
			title: "Rượu Vang Shiraz Úc Nhập Khẩu Chính Hãng – Viora Wine",
			description:
				"Shiraz Úc nhập khẩu chính hãng. Đậm đà, cay nhẹ, hợp thịt đỏ. Từ 490.000đ. Giao nhanh toàn quốc.",
			url: buildPageUrl(locale, "/shiraz"),
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [
				{
					url: `${SITE_URL}/statics/images/og-home.jpg`,
					width: 1200,
					height: 630,
					alt: "Rượu Vang Shiraz Úc – Viora Wine",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Rượu Vang Shiraz Úc – Viora Wine Đà Nẵng",
			description: "Shiraz Úc chính hãng từ 490.000đ. Giao nhanh toàn quốc.",
		},
	};
}

export default async function ShirazPage() {
	const supabase = await createClient();

	const { data: products } = await supabase
		.from("products")
		.select(
			"id, slug, name, description, thumbnail_url, content, price, discount_percentage, category, stock, tag, rating, sold_count, grape_variety, wine_type, country",
		)
		.or("grape_variety.ilike.%Shiraz%,name.ilike.%Shiraz%")
		.order("sold_count", { ascending: false })
		.limit(12);

	const shirazProducts = (products ?? []) as DbProduct[];

	const pageUrl = buildPageUrl("vi", "/shiraz");

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
			{ "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE_URL}/san-pham` },
			{ "@type": "ListItem", position: 3, name: "Rượu Vang Shiraz", item: pageUrl },
		],
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* ── Hero ─────────────────────────────────────────────── */}
				<section className="bg-gradient-to-br from-[#6B0F1A] to-[#B22222] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
							<a href="/" className="transition-colors hover:text-white">
								Trang chủ
							</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">
								Sản phẩm
							</a>
							<span>/</span>
							<span className="text-white">Rượu Vang Shiraz</span>
						</nav>

						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
								Rượu Vang Shiraz Úc <span className="text-yellow-400">Nhập Khẩu Chính Hãng</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Shiraz là giống nho đặc trưng của Úc — đậm đà, cay nhẹ với hương mận chín, chocolate đen
								và hạt tiêu. Được chọn lọc kỹ từ Barossa Valley & McLaren Vale, hoàn hảo cho bữa tiệc
								thịt nướng và những khoảnh khắc kết nối bạn bè.
							</p>

							<div className="flex flex-wrap gap-3 text-sm">
								{[
									"Nhập khẩu chính hãng 100%",
									"Giao nhanh 2–4h tại Đà Nẵng",
									"Tư vấn miễn phí 24/7",
								].map((badge) => (
									<span
										key={badge}
										className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm"
									>
										<span className="text-yellow-400">✓</span> {badge}
									</span>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ── Product grid ─────────────────────────────────────── */}
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">
						Các Loại Rượu Vang Shiraz Tại Viora Wine
					</h2>
					<p className="mb-8 text-gray-500">
						Toàn bộ Shiraz Úc nhập khẩu chính hãng, chọn lọc kỹ từ Barossa Valley & McLaren Vale — Nam Úc.
					</p>

					{shirazProducts.length > 0 ? (
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
							{shirazProducts.map((product) => (
								<CardProduct key={product.id} product={product} />
							))}
						</div>
					) : (
						<div className="rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
							<p className="mb-2 text-lg font-medium text-gray-700">
								Đang cập nhật sản phẩm Shiraz mới nhất
							</p>
							<p className="mb-6 text-sm text-gray-400">
								Liên hệ Zalo để được tư vấn và đặt hàng trực tiếp
							</p>
							<div className="flex flex-wrap justify-center gap-3">
								<a
									href={ZALO_LINK}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-lg bg-[#B22222] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8B0000]"
								>
									Tư vấn qua Zalo
								</a>
								<a
									href="/san-pham"
									className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
								>
									Xem tất cả sản phẩm
								</a>
							</div>
						</div>
					)}
				</section>

				{/* ── What is Shiraz ───────────────────────────────────── */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Rượu Vang Shiraz Là Gì?</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									<strong>Shiraz</strong> (hay còn gọi là <strong>Syrah</strong> tại Pháp và châu Âu)
									là giống nho đỏ nổi tiếng thế giới, được trồng phổ biến nhất tại Úc — đặc biệt tại
									vùng <strong>Barossa Valley</strong> và <strong>McLaren Vale</strong>, Nam Úc. Giống
									nho này cho ra những chai vang đỏ đậm đà, màu tím đen sâu, tanin mềm và hương thơm
									phức tạp.
								</p>
								<p>
									Khác với Syrah Pháp thường tinh tế và mang nhiều tính khoáng chất,{" "}
									<strong>Shiraz Úc nổi bật với phong cách fruit-forward</strong>: hương mận,
									blackberry, chocolate đen và đặc biệt là{" "}
									<strong>vị cay nhẹ đặc trưng của hạt tiêu đen</strong> — đây là "chữ ký" không thể
									nhầm lẫn của Shiraz xứ Kangaroo.
								</p>
								<p>
									Nhờ vị dễ uống, tanin không quá chát, Shiraz Úc là lựa chọn lý tưởng cho người mới
									bắt đầu khám phá rượu vang lẫn những tín đồ rượu vang lâu năm muốn tìm một chai đậm
									đà để thưởng thức cùng thịt nướng hoặc một bữa tối đặc biệt.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ── Characteristics ──────────────────────────────────── */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">
							Đặc Điểm Rượu Vang Shiraz Úc
						</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{
									icon: "🍇",
									title: "Màu sắc",
									desc: "Tím đen đậm sâu — biểu hiện của nồng độ anthocyanin cao, cấu trúc đầy đặn",
								},
								{
									icon: "🌸",
									title: "Hương thơm",
									desc: "Mận, blackberry, chocolate đen, hoa violet, hạt tiêu đen, vanilla từ gỗ sồi",
								},
								{
									icon: "👅",
									title: "Vị giác",
									desc: "Đầy đặn, cay nhẹ cuối miệng, tanin mềm mượt, độ chua vừa phải, hậu vị kéo dài",
								},
								{
									icon: "🍷",
									title: "Độ cồn",
									desc: "13.5–15% ABV — cồn cao tạo cảm giác ấm, cân bằng hoàn hảo với độ chua tự nhiên",
								},
							].map((item) => (
								<div
									key={item.title}
									className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
								>
									<div className="mb-3 text-3xl">{item.icon}</div>
									<h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
									<p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── Food pairing ─────────────────────────────────────── */}
				<section className="bg-[#6B0F1A] py-14 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">
							Shiraz Uống Cùng Gì Ngon Nhất?
						</h2>
						<p className="mx-auto mb-10 max-w-2xl text-center text-white/75">
							Tanin đậm của Shiraz "cắt" qua chất béo của thịt, tạo sự cân bằng hoàn hảo. Đây là lý do
							Shiraz được mệnh danh là "bạn đồng hành của thịt đỏ".
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{
									dish: "🥩 Bò nướng / Steak",
									note: "Classic pairing tuyệt đỉnh — Shiraz & bò nướng là cặp đôi hoàn hảo nhất thế giới",
								},
								{
									dish: "🍖 Cừu quay / Sườn nướng BBQ",
									note: "Vị cay nhẹ của Shiraz tôn lên độ đậm đà của cừu và sườn nướng",
								},
								{
									dish: "🫕 Bò lúc lắc / Bò hầm",
									note: "Món Việt hợp nhất với Shiraz — sốt đậm đà và thịt mềm hòa quyện hoàn hảo",
								},
								{
									dish: "🧀 Phô mai cứng (Aged Cheese)",
									note: "Cheddar, Manchego, Gouda già — tanin Shiraz cân bằng béo ngậy của phô mai",
								},
								{
									dish: "🌶️ Lẩu bò / Nướng BBQ gia vị",
									note: "Vị cay đặc trưng của Shiraz hòa quyện với gia vị đậm đà của lẩu và BBQ",
								},
								{
									dish: "🍕 Pizza thịt / Burger",
									note: "Tụ họp bạn bè — Shiraz biến bữa tiệc bình thường thành kỷ niệm đáng nhớ",
								},
							].map((item) => (
								<div key={item.dish} className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
									<p className="mb-1.5 font-semibold">{item.dish}</p>
									<p className="text-sm text-white/70">{item.note}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── Why Viora Wine ───────────────────────────────────── */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-10 text-center text-xl font-semibold sm:text-xl">
							Tại Sao Nên Mua Shiraz Tại Viora Wine?
						</h2>
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{
									icon: "🏅",
									title: "Chính hãng 100%",
									desc: "Nhập khẩu trực tiếp từ nhà máy Úc, có đầy đủ giấy tờ, tem nhập khẩu và certificate of origin.",
								},
								{
									icon: "💰",
									title: "Giá tốt nhất thị trường",
									desc: "Nhập thẳng không qua trung gian, tiết kiệm 15–20% so với siêu thị và cửa hàng rượu thông thường.",
								},
								{
									icon: "🚀",
									title: "Giao nhanh 2–4h tại Đà Nẵng",
									desc: "Đặt buổi sáng, nhận buổi chiều. Giao toàn quốc qua J&T, GHN với đóng gói chuyên dụng chống vỡ.",
								},
								{
									icon: "🎁",
									title: "Gói quà chuyên nghiệp",
									desc: "Hộp quà wine sang trọng, ruy băng và thiệp viết tay cá nhân hóa — hoàn hảo cho mọi dịp.",
								},
								{
									icon: "📞",
									title: "Tư vấn tận tâm 24/7",
									desc: "Đội ngũ am hiểu rượu vang, tư vấn chọn Shiraz phù hợp ngân sách và dịp uống của bạn.",
								},
								{
									icon: "🔄",
									title: "Đổi trả dễ dàng",
									desc: "Sản phẩm lỗi hoặc không đúng mô tả — đổi trả ngay, không cần giải thích lý do.",
								},
							].map((item) => (
								<div key={item.title} className="flex gap-4">
									<span className="mt-0.5 shrink-0 text-2xl">{item.icon}</span>
									<div>
										<h3 className="mb-1 font-semibold text-gray-900">{item.title}</h3>
										<p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── City links (internal link cluster) ──────────────── */}
				<section className="border-y border-gray-100 bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-2 text-xl font-semibold sm:text-2xl">Mua Rượu Vang Shiraz Theo Thành Phố</h2>
						<p className="mb-6 text-sm text-gray-500">
							Giao hàng nhanh 2–4h, giá như nhau — chọn thành phố để xem thông tin giao hàng và ưu đãi địa
							phương.
						</p>
						<div className="grid gap-4 sm:grid-cols-2">
							<a
								href="/ruou-vang-shiraz-da-nang"
								className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#B22222] hover:bg-red-50"
							>
								<div>
									<p className="font-semibold group-hover:text-[#B22222]">
										🏖️ Rượu Vang Shiraz Đà Nẵng
									</p>
									<p className="mt-0.5 text-sm text-gray-500">Giao nhanh 2–4h nội thành Đà Nẵng</p>
								</div>
								<span className="text-gray-400 group-hover:text-[#B22222]">→</span>
							</a>
							<a
								href="/ruou-vang-shiraz-ha-noi"
								className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#B22222] hover:bg-red-50"
							>
								<div>
									<p className="font-semibold group-hover:text-[#B22222]">
										🏙️ Rượu Vang Shiraz Hà Nội
									</p>
									<p className="mt-0.5 text-sm text-gray-500">Giao nhanh 2–4h nội thành Hà Nội</p>
								</div>
								<span className="text-gray-400 group-hover:text-[#B22222]">→</span>
							</a>
						</div>
					</div>
				</section>

				{/* ── FAQ ──────────────────────────────────────────────── */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">
							Câu Hỏi Thường Gặp Về Rượu Vang Shiraz
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

				{/* ── CTA ──────────────────────────────────────────────── */}
				<section className="py-16">
					<div className="mx-auto max-w-xl px-4 text-center">
						<h2 className="mb-3 text-2xl font-semibold text-gray-900">Đặt Rượu Vang Shiraz Ngay Hôm Nay</h2>
						<p className="mb-8 text-gray-500">
							Giao nhanh 2–4h tại Đà Nẵng &nbsp;•&nbsp; Miễn phí tư vấn &nbsp;•&nbsp; Giá tốt nhất thị
							trường
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<a
								href={ZALO_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg bg-[#B22222] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#8B0000]"
							>
								Tư vấn & đặt hàng qua Zalo
							</a>
							<a
								href="/san-pham"
								className="rounded-lg border border-gray-300 px-8 py-3.5 font-semibold text-gray-700 transition-colors hover:border-gray-500"
							>
								Xem tất cả sản phẩm
							</a>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
