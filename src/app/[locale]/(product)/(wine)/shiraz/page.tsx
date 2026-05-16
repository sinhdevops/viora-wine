import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbSchema, buildCategoryFAQ, buildFAQSchema, buildItemListSchema, jsonLdScript } from "@/lib/geo-schemas";
import { createClient } from "@/utils/supabase/server";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";
import TrustBar from "@/components/conversion/trust-bar";
import UrgencyStrip from "@/components/conversion/urgency-strip";
import ComboSection from "@/components/conversion/combo-section";
import FaqAccordion from "@/components/conversion/faq-accordion";

export const revalidate = 3600;

const ZALO_LINK = "https://zalo.me/0325610016";
const PHONE = "tel:0338909973";

const faqItems = buildCategoryFAQ({
	name: "Rượu Vang Shiraz",
	description: "Shiraz (hay Syrah) là giống nho đỏ nổi tiếng thế giới, đặc biệt phổ biến tại Úc. Shiraz Úc có màu tím đen đậm, hương mận chín, blackberry, chocolate đen, vị cay nhẹ đặc trưng của hạt tiêu đen và hậu vị kéo dài. Khác với Syrah Pháp tinh tế, Shiraz Úc fruit-forward và dễ uống hơn.",
	servingTemp: "16–18°C — mở nắp trước 20–30 phút để hương thơm phát triển tốt nhất",
	pairingFoods: "bò nướng, steak, cừu quay, sườn BBQ, phô mai cứng (Cheddar, Manchego), bò lúc lắc, lẩu bò, burger, pizza thịt",
	origin: "Úc (Barossa Valley, McLaren Vale, Clare Valley — Nam Úc), Pháp (Rhône Valley — Syrah), California (Mỹ), Chile, Nam Phi",
	priceRange: "từ 490.000đ đến hơn 6.000.000đ — từ Shiraz uống hàng ngày đến Shiraz single vineyard cao cấp",
	phone: "0325-610-016",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return {
		title: "Rượu Vang Shiraz Úc Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang Shiraz Úc nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Đậm đà, cay nhẹ, hợp bò nướng & thịt đỏ. Từ 490.000đ. Giao hàng toàn quốc. Tư vấn miễn phí: 0338-909-973.",
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
			"Viora Wine",
			"viorawine",
			"viora wine",
		],
		alternates: buildAlternates(locale, "/shiraz"),
		openGraph: {
			title: "Rượu Vang Shiraz Úc Nhập Khẩu Chính Hãng – Viora Wine",
			description:
				"Shiraz Úc nhập khẩu chính hãng. Đậm đà, cay nhẹ, hợp thịt đỏ. Từ 490.000đ. Giao hàng toàn quốc.",
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
			description: "Shiraz Úc chính hãng từ 490.000đ. Giao hàng toàn quốc.",
		},
	};
}

export default async function ShirazPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/shiraz");

	const supabase = await createClient();
	const { data: topProducts } = await supabase
		.from("products")
		.select("slug, name, thumbnail_url, description, price, discount_percentage")
		.eq("category", "wine")
		.ilike("grape_variety", "%Shiraz%")
		.gt("stock", 0)
		.order("sold_count", { ascending: false })
		.limit(8);

	const breadcrumbJsonLd = buildBreadcrumbSchema([
		{ name: "Trang chủ", url: SITE_URL },
		{ name: "Sản phẩm", url: `${SITE_URL}/san-pham` },
		{ name: "Rượu Vang Shiraz", url: pageUrl },
	]);

	const faqJsonLd = buildFAQSchema(faqItems);

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Rượu Vang Shiraz Úc Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang Shiraz Úc nhập khẩu chính hãng từ Barossa Valley & McLaren Vale tại Viora Wine. Đậm đà, cay nhẹ, hương mận chín và tiêu đen. Từ 490.000đ. Giao hàng toàn quốc.",
		url: pageUrl,
		inLanguage: "vi-VN",
		breadcrumb: breadcrumbJsonLd,
		speakable: {
			"@type": "SpeakableSpecification",
			cssSelector: ["h1", ".category-description"],
		},
		publisher: { "@type": "Organization", name: "Viora Wine", url: SITE_URL },
	};

	const itemListJsonLd = topProducts?.length
		? buildItemListSchema(
				topProducts.map((p) => ({
					name: p.name,
					url: `${SITE_URL}/san-pham/${p.slug}`,
					image: p.thumbnail_url ?? undefined,
					description: p.description ?? undefined,
					price: p.discount_percentage
						? Math.round(p.price * (1 - p.discount_percentage / 100))
						: p.price,
				})),
				"Rượu Vang Shiraz Bán Chạy Tại Viora Wine",
				"Danh sách rượu vang Shiraz Úc nhập khẩu chính hãng bán chạy nhất tại Viora Wine",
			)
		: null;

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(webPageJsonLd) }} />
			{itemListJsonLd && (
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }} />
			)}

			<div className="min-h-screen bg-white">
				{/* Hero — cinematic dark red gradient */}
				<section
					className="relative flex flex-col justify-center overflow-hidden text-white"
					style={{
						background: "linear-gradient(160deg, #0d0103 0%, #2e0a10 40%, #6B0F1A 100%)",
						minHeight: "70vh",
					}}
				>
					{/* Decorative blur orbs */}
					<div
						className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full opacity-20 blur-3xl"
						style={{ background: "#B22222" }}
					/>
					<div
						className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] -translate-x-1/4 translate-y-1/4 rounded-full opacity-10 blur-3xl"
						style={{ background: "#ff6b6b" }}
					/>

					<div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-20 lg:pt-28">
						{/* Breadcrumb */}
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/70">
							<a href="/" className="transition-colors hover:text-white">
								Trang chủ
							</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white">
								Sản phẩm
							</a>
							<span>/</span>
							<span className="text-white/90">Rượu Vang Shiraz</span>
						</nav>

						<div className="max-w-3xl">
							{/* Category pill */}
							<span className="mb-4 inline-block rounded-full border border-red-400/30 bg-red-400/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-red-300 uppercase">
								Shiraz Barossa Valley · Úc
							</span>

							<h1 className="mb-5 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
								Rượu Vang Shiraz Úc{" "}
								<span
									className="block"
									style={{
										background: "linear-gradient(90deg, #fca5a5, #ef4444)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
									}}
								>
									Chính Hãng
								</span>
							</h1>

							<p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80">
								Đậm đà, cay nhẹ với hương mận chín, chocolate đen và hạt tiêu — chọn lọc kỹ từ Barossa
								Valley & McLaren Vale. Hoàn hảo cho bữa tiệc thịt nướng và những khoảnh khắc kết nối.
							</p>

							{/* Trust badges */}
							<div className="mb-10 flex flex-wrap gap-3 text-sm">
								{["✓ Nhập khẩu chính hãng 100%", "✓ Tư vấn miễn phí 24/7", "✓ Giao hàng toàn quốc"].map(
									(b) => (
										<span
											key={b}
											className="rounded-full bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm"
										>
											{b}
										</span>
									),
								)}
							</div>

							{/* CTA buttons */}
							<div className="flex flex-wrap gap-4">
								<a
									href={ZALO_LINK}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-xl bg-[#E1001E] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:scale-[1.03] hover:bg-[#c0001a] active:scale-[.98]"
								>
									Tư vấn ngay qua Zalo
								</a>
								<a
									href={PHONE}
									className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
								>
									Gọi ngay
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* Trust bar */}
				<TrustBar />

				{/* Urgency strip */}
				<UrgencyStrip />

				{/* Product grid */}
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">
						Các Loại Rượu Vang Shiraz Tại Viora Wine
					</h2>
					<p className="mb-8 text-gray-500">
						Toàn bộ Shiraz Úc nhập khẩu chính hãng, chọn lọc kỹ từ Barossa Valley & McLaren Vale — Nam Úc.
					</p>
					<WineProductGrid grapeVariety="Shiraz" emptyLabel="Đang cập nhật sản phẩm Shiraz mới nhất" />
				</section>

				{/* Combo section */}
				<ComboSection />

				{/* What is Shiraz */}
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

				{/* Characteristics */}
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

				{/* Food pairing */}
				<section
					className="py-14 text-white"
					style={{ background: "linear-gradient(135deg, #2e0a10, #6B0F1A)" }}
				>
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

				{/* Why Viora Wine */}
				<section className="py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-10 text-center text-2xl font-semibold sm:text-3xl">
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
									title: "Giao hàng toàn quốc",
									desc: "Giao toàn quốc qua J&T, GHN với đóng gói chuyên dụng chống vỡ. 1–3 ngày làm việc tùy khu vực.",
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

				{/* City links */}
				<section className="border-y border-gray-100 bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-2 text-xl font-semibold sm:text-2xl">Mua Rượu Vang Shiraz Theo Thành Phố</h2>
						<p className="mb-6 text-sm text-gray-500">
							Giao hàng toàn quốc, giá như nhau — chọn thành phố để xem thông tin và ưu đãi địa phương.
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
									<p className="mt-0.5 text-sm text-gray-500">Giao hàng toàn quốc</p>
								</div>
								<span className="text-gray-600 group-hover:text-[#B22222]">→</span>
							</a>
							<a
								href="/ruou-vang-shiraz-ha-noi"
								className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#B22222] hover:bg-red-50"
							>
								<div>
									<p className="font-semibold group-hover:text-[#B22222]">
										🏙️ Rượu Vang Shiraz Hà Nội
									</p>
									<p className="mt-0.5 text-sm text-gray-500">Giao hàng toàn quốc</p>
								</div>
								<span className="text-gray-600 group-hover:text-[#B22222]">→</span>
							</a>
						</div>
					</div>
				</section>

				{/* FAQ accordion */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">
							Câu Hỏi Thường Gặp Về Rượu Vang Shiraz
						</h2>
						<FaqAccordion items={faqItems} />
					</div>
				</section>

				{/* Final CTA */}
				<section className="py-16" style={{ background: "linear-gradient(135deg, #0d0103, #2e0a10)" }}>
					<div className="mx-auto max-w-xl px-4 text-center">
						<p className="mb-3 text-sm font-semibold tracking-widest text-red-400 uppercase">
							Viora Wine Đà Nẵng
						</p>
						<h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
							Đặt Rượu Vang Shiraz Ngay Hôm Nay
						</h2>
						<p className="mb-8 text-white/60">
							Giao hàng toàn quốc &nbsp;•&nbsp; Miễn phí tư vấn &nbsp;•&nbsp; Giá tốt nhất thị trường
						</p>
						<div className="mx-auto flex w-full max-w-xs flex-col gap-3">
							<a
								href={ZALO_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full rounded-xl bg-[#E1001E] px-8 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:scale-[1.03] hover:bg-[#c0001a] active:scale-[.98]"
							>
								Tư vấn &amp; đặt hàng qua Zalo
							</a>
							<a
								href="/san-pham"
								className="w-full rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
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
