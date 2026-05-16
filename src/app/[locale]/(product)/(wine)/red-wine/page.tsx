import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbSchema, buildCategoryFAQ, buildFAQSchema, buildItemListSchema, jsonLdScript } from "@/lib/geo-schemas";
import { createClient } from "@/utils/supabase/server";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";
import TrustBar from "@/components/conversion/trust-bar";
import UrgencyStrip from "@/components/conversion/urgency-strip";
import ComboSection from "@/components/conversion/combo-section";
import FaqAccordion from "@/components/conversion/faq-accordion";

export const revalidate = 3600;

const PHONE = "0338909973";
const ZALO_LINK = "https://zalo.me/0325610016";

const faqItems = buildCategoryFAQ({
	name: "Rượu Vang Đỏ",
	description: "Rượu vang đỏ được lên men từ nho đỏ hoặc nho đen nguyên vỏ, tạo màu đỏ đặc trưng từ anthocyanin. Vị đậm đà, tanin cao, hương trái cây đỏ và đen. Các giống nho phổ biến: Cabernet Sauvignon, Merlot, Shiraz, Pinot Noir, Sangiovese.",
	servingTemp: "16–18°C",
	pairingFoods: "bò nướng, steak, cừu quay, sườn BBQ, phô mai cứng (Cheddar, Manchego), pasta thịt bò, lẩu bò, bò lúc lắc",
	origin: "Úc (Barossa Valley, McLaren Vale), Pháp (Bordeaux, Rhône), Ý (Tuscany, Puglia), Chile (Colchagua Valley), Tây Ban Nha (Rioja)",
	priceRange: "từ 390.000đ đến hơn 5.000.000đ — phù hợp mọi ngân sách từ uống hàng ngày đến quà biếu cao cấp",
	phone: "0325-610-016",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const url = buildPageUrl(locale, "/red-wine");
	return {
		title: "Rượu Vang Đỏ Nhập Khẩu Chính Hãng – Viora Wine Đà Nẵng",
		description:
			"Mua rượu vang đỏ nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Cabernet Sauvignon, Merlot, Shiraz từ Pháp, Ý, Úc, Chile. Từ 390.000đ. Giao hàng toàn quốc. Tư vấn miễn phí: 0338-909-973.",
		keywords: [
			"rượu vang đỏ",
			"rượu vang đỏ nhập khẩu",
			"mua rượu vang đỏ",
			"rượu vang đỏ chính hãng",
			"rượu vang đỏ Pháp",
			"rượu vang đỏ Ý",
			"rượu vang đỏ Úc",
			"rượu vang đỏ Chile",
			"Cabernet Sauvignon",
			"Merlot",
			"Pinot Noir",
			"rượu vang đỏ Đà Nẵng",
			"rượu vang đỏ Hà Nội",
			"shop rượu vang đỏ",
			"Viora Wine",
			"viorawine",
			"viora wine",
		],
		alternates: buildAlternates(locale, "/red-wine"),
		openGraph: {
			title: "Rượu Vang Đỏ Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Vang đỏ chính hãng từ Pháp, Ý, Úc, Chile. Từ 390.000đ. Giao hàng toàn quốc.",
			url,
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [
				{
					url: `${SITE_URL}/statics/images/og-home.jpg`,
					width: 1200,
					height: 630,
					alt: "Rượu Vang Đỏ – Viora Wine",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Rượu Vang Đỏ Nhập Khẩu – Viora Wine",
			description: "Vang đỏ chính hãng từ 390.000đ. Giao hàng toàn quốc.",
		},
	};
}

export default async function RedWinePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const pageUrl = buildPageUrl(locale, "/red-wine");
	const productsPath = `${SITE_URL}/san-pham`;

	// Fetch top red wine products for ItemList schema
	const supabase = await createClient();
	const { data: topProducts } = await supabase
		.from("products")
		.select("slug, name, thumbnail_url, description, price, discount_percentage")
		.eq("category", "wine")
		.in("wine_type", ["red", "đỏ", "Đỏ", "Red"])
		.gt("stock", 0)
		.order("sold_count", { ascending: false })
		.limit(8);

	const breadcrumbJsonLd = buildBreadcrumbSchema([
		{ name: "Trang chủ", url: SITE_URL },
		{ name: "Sản phẩm", url: `${SITE_URL}/san-pham` },
		{ name: "Rượu Vang Đỏ", url: pageUrl },
	]);

	const faqJsonLd = buildFAQSchema(faqItems);

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Rượu Vang Đỏ Nhập Khẩu Chính Hãng",
		description: "Tuyển chọn rượu vang đỏ nhập khẩu chính hãng từ Pháp, Ý, Úc, Chile, Tây Ban Nha tại Viora Wine Đà Nẵng. Cabernet Sauvignon, Merlot, Shiraz, Pinot Noir từ 390.000đ. Giao toàn quốc.",
		url: pageUrl,
		inLanguage: "vi-VN",
		breadcrumb: breadcrumbJsonLd,
		speakable: {
			"@type": "SpeakableSpecification",
			cssSelector: ["h1", ".category-description", ".faq-answer"],
		},
		publisher: {
			"@type": "Organization",
			name: "Viora Wine",
			url: SITE_URL,
		},
	};

	const itemListJsonLd = topProducts?.length
		? buildItemListSchema(
				topProducts.map((p) => ({
					name: p.name,
					url: `${productsPath}/${p.slug}`,
					image: p.thumbnail_url ?? undefined,
					description: p.description ?? undefined,
					price: p.discount_percentage
						? Math.round(p.price * (1 - p.discount_percentage / 100))
						: p.price,
				})),
				"Rượu Vang Đỏ Bán Chạy Tại Viora Wine",
				"Danh sách rượu vang đỏ nhập khẩu chính hãng bán chạy nhất tại Viora Wine Đà Nẵng",
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
				{/* ── HERO ── Cinematic, mobile-first */}
				<section
					className="relative overflow-hidden text-white"
					style={{
						background: "linear-gradient(160deg, #0d0103 0%, #2e0a10 40%, #6B0F1A 100%)",
						minHeight: "70vh",
					}}
				>
					{/* Decorative glow */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"radial-gradient(ellipse 60% 50% at 80% 60%, rgba(180,30,30,.18) 0%, transparent 70%)",
						}}
					/>

					<div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-20 lg:pt-28">
						{/* Breadcrumb */}
						<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-white/60">
							<a href="/" className="transition-colors hover:text-white/90">
								Trang chủ
							</a>
							<span>/</span>
							<a href="/san-pham" className="transition-colors hover:text-white/90">
								Sản phẩm
							</a>
							<span>/</span>
							<span className="text-white/80">Rượu Vang Đỏ</span>
						</nav>

						<div className="max-w-xl">
							{/* Tag */}
							<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
								<span className="text-[11px] font-semibold tracking-widest text-[#f9d4a0] uppercase">
									🍷 Nhập khẩu chính hãng
								</span>
							</div>

							{/* H1 */}
							<h1 className="mb-4 text-[38px] leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
								Rượu Vang Đỏ
								<br />
								<span className="text-[#f9d4a0]">Đẳng Cấp Thế Giới</span>
							</h1>

							{/* Tagline */}
							<p className="mb-7 max-w-sm text-[15px] leading-relaxed text-white/70 sm:text-base">
								Dễ uống · Sang trọng · Quà biếu đẳng cấp — từ Pháp, Ý, Úc, Chile.
							</p>

							{/* Trust pills */}
							<div className="mb-8 flex flex-wrap gap-2">
								{["✅ Freeship nội thành", "🎁 Hỗ trợ hộp quà", "📞 Tư vấn 24/7"].map((pill) => (
									<span
										key={pill}
										className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur-sm"
									>
										{pill}
									</span>
								))}
							</div>

							{/* CTAs */}
							<div className="flex flex-col gap-3 sm:flex-row">
								<a
									href={ZALO_LINK}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-13 items-center justify-center rounded-xl bg-[#f9d4a0] px-8 text-[15px] font-bold text-[#7a1c1c] transition-opacity hover:opacity-90 active:opacity-75"
								>
									Đặt giao hôm nay
								</a>
								<a
									href={`tel:${PHONE}`}
									className="flex h-13 items-center justify-center rounded-xl border-2 border-white/30 px-8 text-[15px] font-bold text-white transition-colors hover:border-white/60 active:opacity-75"
								>
									📞 Gọi tư vấn miễn phí
								</a>
							</div>
						</div>
					</div>

					{/* Bottom fade */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute right-0 bottom-0 left-0 h-16"
						style={{ background: "linear-gradient(to bottom, transparent, #fff)" }}
					/>
				</section>

				{/* ── TRUST BAR ── */}
				<TrustBar />

				{/* ── URGENCY STRIP ── */}
				<UrgencyStrip />

				{/* ── PRODUCT GRID ── */}
				<section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
					<div className="mb-6 flex items-end justify-between">
						<div>
							<h2 className="text-xl font-bold text-gray-900 sm:text-2xl">🔥 Bán Chạy Tuần Này</h2>
							<p className="mt-1 text-[13px] text-gray-500">
								Vang đỏ nhập khẩu chính hãng — sắp xếp theo lượt bán
							</p>
						</div>
						<a
							href="/san-pham"
							className="shrink-0 text-[13px] font-semibold text-[#7a1c1c] underline-offset-2 hover:underline"
						>
							Xem tất cả →
						</a>
					</div>
					<WineProductGrid wineType="red" emptyLabel="Đang cập nhật danh sách rượu vang đỏ mới nhất" />
				</section>

				{/* ── COMBO SECTION ── */}
				<ComboSection />

				{/* ── FOOD PAIRING ── */}
				<section className="bg-[#6B0F1A] py-12 text-white sm:py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-2 text-center text-xl font-bold sm:text-2xl">
							Rượu Vang Đỏ Uống Cùng Gì Ngon Nhất?
						</h2>
						<p className="mx-auto mb-8 max-w-xl text-center text-[13px] text-white/80 sm:text-sm">
							Tanin trong vang đỏ tương tác với protein thịt — tạo sự cân bằng hoàn hảo.
						</p>
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
							{[
								{ dish: "🥩", name: "Bò nướng / Steak", note: "Cab Sauv hoặc Shiraz" },
								{ dish: "🍖", name: "Cừu quay / BBQ", note: "Shiraz cân bằng hoàn hảo" },
								{ dish: "🫕", name: "Bò lúc lắc", note: "Vị sốt đậm + tanin" },
								{ dish: "🧀", name: "Phô mai cứng", note: "Cheddar, Manchego" },
								{ dish: "🍝", name: "Pasta bò / Pizza", note: "Sangiovese Ý tuyệt vời" },
								{ dish: "🌶️", name: "Lẩu / Nướng", note: "Vang đỏ tầm trung" },
							].map((item) => (
								<div
									key={item.name}
									className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm"
								>
									<div className="mb-1.5 text-2xl">{item.dish}</div>
									<p className="text-[12px] font-semibold sm:text-[13px]">{item.name}</p>
									<p className="mt-0.5 text-[11px] text-white/70">{item.note}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── INTERNAL LINKS ── */}
				<section className="border-y border-gray-100 py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">Khám Phá Thêm</h2>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
							{[
								{
									href: "/ruou-vang-trang",
									label: "🥂 Rượu Vang Trắng",
									desc: "Tươi mát, Chardonnay, Sauvignon Blanc",
								},
								{
									href: "/ruou-vang-hong",
									label: "🌸 Rượu Vang Hồng",
									desc: "Màu hồng quyến rũ, hương dâu tây",
								},
								{
									href: "/ruou-vang-shiraz",
									label: "🍇 Shiraz Úc",
									desc: "Đậm đà, đặc sản Barossa Valley",
								},
							].map((item) => (
								<a
									key={item.href}
									href={item.href}
									className="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 transition-all hover:border-[#7a1c1c]/40 hover:bg-red-50"
								>
									<div>
										<p className="text-[14px] font-semibold group-hover:text-[#7a1c1c]">
											{item.label}
										</p>
										<p className="mt-0.5 text-[12px] text-gray-500">{item.desc}</p>
									</div>
									<span className="text-gray-400 group-hover:text-[#7a1c1c]">→</span>
								</a>
							))}
						</div>
					</div>
				</section>

				{/* ── FAQ ── */}
				<section className="bg-gray-50 py-12 sm:py-14">
					<div className="mx-auto max-w-2xl px-4 sm:px-6">
						<h2 className="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
							Câu Hỏi Thường Gặp
						</h2>
						<FaqAccordion items={faqItems} />
					</div>
				</section>

				{/* ── FINAL CTA ── */}
				<section className="py-14">
					<div className="mx-auto max-w-lg px-4 text-center">
						<p className="mb-2 text-[13px] font-semibold tracking-widest text-[#7a1c1c] uppercase">
							Bắt đầu ngay hôm nay
						</p>
						<h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
							Nhắn Zalo — Nhận Ưu Đãi Ngay
						</h2>
						<p className="mb-7 text-[14px] text-gray-500">
							Tư vấn miễn phí · Giao hàng nhanh · Đảm bảo chính hãng
						</p>
						<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
							<a
								href={ZALO_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-13 items-center justify-center rounded-xl bg-[#7a1c1c] px-10 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
							>
								Nhắn Zalo đặt hàng
							</a>
							<a
								href={`tel:${PHONE}`}
								className="flex h-13 items-center justify-center rounded-xl border-2 border-[#7a1c1c] px-10 text-[15px] font-bold text-[#7a1c1c] transition-colors hover:bg-red-50"
							>
								📞 {PHONE}
							</a>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
