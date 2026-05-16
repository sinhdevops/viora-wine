import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbSchema, buildCategoryFAQ, buildFAQSchema, buildItemListSchema, jsonLdScript } from "@/lib/geo-schemas";
import { createClient } from "@/utils/supabase/server";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";
import TrustBar from "@/components/conversion/trust-bar";
import UrgencyStrip from "@/components/conversion/urgency-strip";
import ComboSection from "@/components/conversion/combo-section";
import FaqAccordion from "@/components/conversion/faq-accordion";

export const revalidate = 3600;

const faqItems = buildCategoryFAQ({
	name: "Rượu Vang Hồng (Rosé)",
	description: "Rượu vang hồng (rosé) được làm từ nho đỏ nhưng tiếp xúc vỏ trong thời gian ngắn 2–20 giờ — tạo màu hồng đặc trưng, ít tanin, tươi mát hơn vang đỏ. Phong cách Provence (Pháp) là chuẩn mực thế giới với màu hồng phấn nhạt, hương đào trắng, hoa hồng và vị khô thanh.",
	servingTemp: "8–13°C — uống lạnh như vang trắng, giúp giữ hương thơm trái cây tươi",
	pairingFoods: "hải sản nướng, salad Địa Trung Hải, thịt gà, pizza, đồ ăn nhẹ, sushi, thịt nguội (charcuterie board), bánh mì sandwich",
	origin: "Pháp (Provence, Languedoc, Rhône), Tây Ban Nha (Navarra, Rioja), Ý (Pinot Grigio Rosé, Bardolino), Chile, Úc",
	priceRange: "từ 390.000đ đến hơn 3.000.000đ — rosé Provence cao cấp đến rosé uống hàng ngày giá tốt",
	phone: "0325-610-016",
});

const ZALO_LINK = "https://zalo.me/0325610016";
const PHONE = "tel:0338909973";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const url = buildPageUrl(locale, "/rose-wine");
	return {
		title: "Rượu Vang Hồng (Rosé) Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang hồng (rosé) nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Provence, Tây Ban Nha, Chile — màu hồng tươi, hương dâu tây, uống mát lạnh cực ngon. Từ 390.000đ. Giao hàng toàn quốc.",
		keywords: [
			"rượu vang hồng",
			"rượu vang rosé",
			"vang hồng nhập khẩu",
			"mua rượu vang hồng",
			"rượu vang hồng Pháp",
			"Provence rosé",
			"rượu vang hồng Tây Ban Nha",
			"rosé Đà Nẵng",
			"rượu vang hồng chính hãng",
			"Viora Wine",
			"viorawine",
			"viora wine",
			"rượu vang hồng ngon",
		],
		alternates: buildAlternates(locale, "/rose-wine"),
		openGraph: {
			title: "Rượu Vang Hồng (Rosé) Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Rosé chính hãng từ Pháp, Ý, Tây Ban Nha. Màu hồng tươi, uống mát lạnh. Từ 390.000đ.",
			url,
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [
				{
					url: `${SITE_URL}/statics/images/og-home.jpg`,
					width: 1200,
					height: 630,
					alt: "Rượu Vang Hồng – Viora Wine",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Rượu Vang Hồng (Rosé) – Viora Wine",
			description: "Rosé chính hãng từ 390.000đ. Giao hàng toàn quốc.",
		},
	};
}

export default async function RoseWinePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/rose-wine");

	const supabase = await createClient();
	const { data: topProducts } = await supabase
		.from("products")
		.select("slug, name, thumbnail_url, description, price, discount_percentage")
		.eq("category", "wine")
		.in("wine_type", ["rose", "hồng", "Hồng", "Rose", "Rosé"])
		.gt("stock", 0)
		.order("sold_count", { ascending: false })
		.limit(8);

	const breadcrumbJsonLd = buildBreadcrumbSchema([
		{ name: "Trang chủ", url: SITE_URL },
		{ name: "Sản phẩm", url: `${SITE_URL}/san-pham` },
		{ name: "Rượu Vang Hồng", url: pageUrl },
	]);

	const faqJsonLd = buildFAQSchema(faqItems);

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Rượu Vang Hồng (Rosé) Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang hồng (rosé) nhập khẩu chính hãng từ Pháp (Provence), Tây Ban Nha, Ý tại Viora Wine. Màu hồng tươi, hương dâu tây, uống mát lạnh. Từ 390.000đ. Giao toàn quốc.",
		url: pageUrl,
		inLanguage: "vi-VN",
		breadcrumb: breadcrumbJsonLd,
		speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".category-description"] },
		publisher: { "@type": "Organization", name: "Viora Wine", url: SITE_URL },
	};

	const itemListJsonLd = topProducts?.length
		? buildItemListSchema(
				topProducts.map((p) => ({
					name: p.name,
					url: `${SITE_URL}/san-pham/${p.slug}`,
					image: p.thumbnail_url ?? undefined,
					description: p.description ?? undefined,
					price: p.discount_percentage ? Math.round(p.price * (1 - p.discount_percentage / 100)) : p.price,
				})),
				"Rượu Vang Hồng Bán Chạy Tại Viora Wine",
				"Danh sách rượu vang hồng (rosé) nhập khẩu chính hãng bán chạy nhất tại Viora Wine",
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
				{/* Hero — cinematic rose gradient */}
				<section
					className="relative flex flex-col justify-center overflow-hidden text-white"
					style={{
						background: "linear-gradient(160deg, #1a0010 0%, #4a0e2a 40%, #9B3065 100%)",
						minHeight: "70vh",
					}}
				>
					{/* Decorative blur orbs */}
					<div
						className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] translate-x-1/4 -translate-y-1/4 rounded-full opacity-20 blur-3xl"
						style={{ background: "#E8709A" }}
					/>
					<div
						className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] -translate-x-1/4 translate-y-1/4 rounded-full opacity-15 blur-3xl"
						style={{ background: "#f9a8d4" }}
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
							<span className="text-white/90">Rượu Vang Hồng</span>
						</nav>

						<div className="max-w-3xl">
							{/* Category pill */}
							<span className="mb-4 inline-block rounded-full border border-pink-300/40 bg-pink-300/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-pink-200 uppercase">
								Rosé Nhập Khẩu
							</span>

							<h1 className="mb-5 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
								Rượu Vang Hồng{" "}
								<span
									className="block"
									style={{
										background: "linear-gradient(90deg, #fda4af, #E8709A)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
									}}
								>
									Chính Hãng
								</span>
							</h1>

							<p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80">
								Màu hồng tươi quyến rũ, hương dâu tây và hoa tươi, vị thanh mát nhẹ nhàng — Rosé là lựa
								chọn lý tưởng cho tiệc ngoài trời, picnic và những khoảnh khắc vui vẻ cùng bạn bè.
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
									className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] active:scale-[.98]"
									style={{ background: "linear-gradient(135deg, #E8709A, #9B3065)" }}
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
					<h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Rượu Vang Hồng Tại Viora Wine</h2>
					<p className="mb-8 text-gray-500">
						Toàn bộ rosé nhập khẩu chính hãng — màu đẹp, vị thanh, hương thơm quyến rũ.
					</p>
					<WineProductGrid wineType="rose" emptyLabel="Đang cập nhật danh sách rượu vang hồng mới nhất" />
				</section>

				{/* Combo section */}
				<ComboSection />

				{/* What is rosé */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Rượu Vang Hồng (Rosé) Là Gì?</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									<strong>Rượu vang hồng</strong> hay <strong>Rosé</strong> là loại vang được làm từ
									nho đỏ nhưng với thời gian ngâm vỏ rất ngắn — chỉ từ vài giờ đến vài ngày. Khoảng
									thời gian này đủ để trích xuất màu hồng đẹp từ vỏ nho mà không lấy nhiều tanin, tạo
									ra phong cách <strong>nhẹ hơn vang đỏ nhưng đậm hơn vang trắng</strong>.
								</p>
								<p>
									Vùng <strong>Provence</strong> (miền Nam nước Pháp) được mệnh danh là "thủ đô rosé
									thế giới" — nơi sản xuất loại rosé màu hồng phấn nhạt tinh tế, vị khô và elegant.
									Ngoài ra, <strong>Tây Ban Nha</strong> (Navarra), <strong>Ý</strong> (Tuscany) và{" "}
									<strong>Chile</strong> cũng sản xuất rosé xuất sắc với phong cách trái cây phong phú
									hơn.
								</p>
								<p>
									Rosé từng bị coi là "vang thứ cấp" nhưng nay đã hoàn toàn thay đổi vị thế — được
									giới sành rượu đánh giá cao và trở thành{" "}
									<strong>xu hướng uống rượu thống trị mùa hè toàn cầu</strong>. Tại Việt Nam, rosé
									ngày càng được ưa chuộng nhờ màu sắc đẹp, phù hợp chụp ảnh và vị dễ uống.
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
								{
									icon: "🌸",
									title: "Màu sắc",
									desc: "Từ hồng phấn nhạt tinh tế (Provence) đến hồng đào đậm (Tây Ban Nha). Màu sắc phụ thuộc thời gian ngâm vỏ nho",
								},
								{
									icon: "🍓",
									title: "Hương thơm",
									desc: "Dâu tây tươi, mâm xôi, đào, hoa hồng, hoa nhài — tươi mát và quyến rũ. Provence thêm hương thảo mộc Địa Trung Hải",
								},
								{
									icon: "👅",
									title: "Vị giác",
									desc: "Thanh mát, ít tanin, độ chua vừa phải, vị trái cây rõ ràng. Nhẹ nhàng hơn vang đỏ nhưng phong phú hơn vang trắng",
								},
								{
									icon: "🌡️",
									title: "Phục vụ",
									desc: "8–13°C — uống lạnh giống vang trắng. Ướp lạnh 2 tiếng trước khi uống. Hoàn hảo cho bữa tiệc hè ngoài trời",
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
					style={{ background: "linear-gradient(135deg, #4a0e2a, #9B3065)" }}
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">
							Rosé Uống Cùng Gì Ngon Nhất?
						</h2>
						<p className="mx-auto mb-10 max-w-2xl text-center text-white/75">
							Rosé là loại vang linh hoạt nhất — đủ nhẹ để đi với salad, đủ đậm để kết hợp với thịt gà và
							hải sản đậm vị.
						</p>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{
									dish: "🦞 Hải sản nướng / Tôm hùm",
									note: "Rosé đủ đậm để đi với hải sản nướng có gia vị — nơi vang trắng đôi khi quá nhẹ",
								},
								{
									dish: "🥗 Salad Niçoise / Caesar",
									note: "Provence rosé và salad Địa Trung Hải — pairing sinh ra để dành cho nhau",
								},
								{
									dish: "🍗 Gà nướng BBQ",
									note: "Rosé đậm (Tây Ban Nha) tuyệt vời với gà nướng than, đặc biệt ngày hè",
								},
								{
									dish: "🥐 Charcuterie / Pâté",
									note: "Rosé nhẹ Provence với bảng charcuterie — phong cách Pháp hoàn hảo",
								},
								{
									dish: "🍕 Pizza thịt nguội",
									note: "Rosé đủ linh hoạt để đi với cả pizza — nhẹ hơn vang đỏ nhưng không nhạt nhẽo",
								},
								{
									dish: "🍜 Bún thịt nướng / Nem lụi",
									note: "Ẩm thực Việt thường nhẹ và thơm — rosé tươi mát là người bạn đồng hành lý tưởng",
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

				{/* Internal links */}
				<section className="border-y border-gray-100 bg-white py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-6 text-xl font-semibold sm:text-2xl">Khám Phá Thêm Các Loại Rượu Vang</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[
								{
									href: "/ruou-vang-do",
									label: "🍷 Rượu Vang Đỏ",
									desc: "Đậm đà, tanin cân bằng — Cabernet Sauvignon, Merlot",
								},
								{
									href: "/ruou-vang-trang",
									label: "🥂 Rượu Vang Trắng",
									desc: "Tươi mát, thanh thoát — Chardonnay, Sauvignon Blanc",
								},
								{
									href: "/ruou-vang-shiraz",
									label: "🍇 Shiraz Úc",
									desc: "Đậm đà, cay nhẹ — đặc sản từ Barossa Valley",
								},
							].map((item) => (
								<a
									key={item.href}
									href={item.href}
									className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 transition-all hover:border-[#E8709A] hover:bg-pink-50"
								>
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

				{/* FAQ accordion */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-xl font-semibold sm:text-3xl">
							Câu Hỏi Thường Gặp Về Rượu Vang Hồng
						</h2>
						<FaqAccordion items={faqItems} />
					</div>
				</section>

				{/* Final CTA */}
				<section className="py-16" style={{ background: "linear-gradient(135deg, #1a0010, #4a0e2a)" }}>
					<div className="mx-auto max-w-xl px-4 text-center">
						<p className="mb-3 text-sm font-semibold tracking-widest text-pink-300 uppercase">
							Viora Wine Đà Nẵng
						</p>
						<h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
							Đặt Rượu Vang Hồng Ngay Hôm Nay
						</h2>
						<p className="mb-8 text-white/60">
							Giao hàng toàn quốc &nbsp;•&nbsp; Miễn phí tư vấn &nbsp;•&nbsp; Giá tốt nhất thị trường
						</p>
						<div className="mx-auto flex w-full max-w-xs flex-col gap-3">
							<a
								href={ZALO_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full rounded-xl px-8 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] active:scale-[.98]"
								style={{ background: "linear-gradient(135deg, #E8709A, #9B3065)" }}
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
