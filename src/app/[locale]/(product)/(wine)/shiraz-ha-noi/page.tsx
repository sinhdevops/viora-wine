import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";
import WineProductGrid from "@/components/page/wine/wine-product-grid-wrapper";

export const revalidate = 3600;

const ZALO_LINK = "https://zalo.me/0325610016";

const faqItems = [
	{
		q: "Mua rượu vang Shiraz tại Hà Nội ở đâu chính hãng?",
		a: "Viora Wine là shop rượu vang Shiraz Úc nhập khẩu chính hãng có giao hàng tại Hà Nội. Toàn bộ sản phẩm có giấy tờ nhập khẩu, tem chính hãng, xuất xứ rõ ràng từ Úc. Đặt hàng qua Zalo 0338-909-973, giao tận nhà trong 2–4h nội thành Hà Nội.",
	},
	{
		q: "Giao rượu vang Shiraz Hà Nội 2h có được không?",
		a: "Có! Viora Wine giao rượu vang Shiraz trong nội thành Hà Nội trong 2–4 giờ sau khi xác nhận đơn. Phủ sóng toàn bộ các quận: Hoàn Kiếm, Ba Đình, Đống Đa, Cầu Giấy, Tây Hồ, Long Biên, Hoàng Mai, Thanh Xuân, Nam Từ Liêm, Bắc Từ Liêm và các khu vực lân cận.",
	},
	{
		q: "Rượu vang Shiraz Hà Nội có khác gì so với Đà Nẵng không?",
		a: "Sản phẩm hoàn toàn giống nhau — cùng lô nhập khẩu chính hãng từ Úc, cùng chất lượng và giá cả. Điểm khác biệt chỉ là logistics: Hà Nội giao từ kho Hà Nội, Đà Nẵng giao từ kho Đà Nẵng. Đảm bảo thời gian giao hàng 2–4h tại cả hai thành phố.",
	},
	{
		q: "Shop rượu vang Hà Nội có nhận đặt hàng số lượng lớn cho sự kiện không?",
		a: "Có! Viora Wine phục vụ đặt hàng số lượng lớn cho tiệc công ty, hội nghị, sự kiện tại Hà Nội. Giảm giá 5–15% tùy số lượng từ 6 chai trở lên. Có thể in logo công ty lên hộp quà, giao đúng giờ theo yêu cầu. Liên hệ Zalo để báo giá chi tiết.",
	},
	{
		q: "Rượu vang nhập khẩu Hà Nội giá bao nhiêu là hợp lý?",
		a: "Shiraz Úc nhập khẩu chính hãng tại Viora Wine từ 490.000đ/chai — đây là mức giá hợp lý cho rượu vang Úc authentic. So sánh: siêu thị cao cấp bán 700.000–900.000đ/chai tương đương, nhập trực tiếp tại Viora Wine giá tốt hơn 20–30% với chất lượng đảm bảo tương đương.",
	},
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return {
		title: "Rượu Vang Shiraz Hà Nội – Giao 2-4h | Viora Wine",
		description:
			"Mua rượu vang Shiraz tại Hà Nội. Nhập khẩu chính hãng từ Úc, giao hàng 2–4h nội thành. Giá từ 490.000đ. Gói quà sang trọng. Tư vấn miễn phí: 0338-909-973.",
		keywords: [
			"rượu vang Shiraz Hà Nội",
			"mua rượu vang Shiraz Hà Nội",
			"shop rượu vang Hà Nội",
			"rượu vang Úc Hà Nội",
			"giao rượu vang Hà Nội 2h",
			"rượu vang nhập khẩu Hà Nội",
			"Shiraz Barossa Valley Hà Nội",
		],
		alternates: buildAlternates(locale, "/shiraz-ha-noi"),
		openGraph: {
			title: "Rượu Vang Shiraz Hà Nội – Giao 2-4h | Viora Wine",
			description:
				"Shiraz Úc chính hãng tại Hà Nội. Giao nhanh 2–4h nội thành. Từ 490.000đ.",
			url: buildPageUrl(locale, "/shiraz-ha-noi"),
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [
				{
					url: `${SITE_URL}/statics/images/og-home.jpg`,
					width: 1200,
					height: 630,
					alt: "Rượu Vang Shiraz Hà Nội – Viora Wine",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Rượu Vang Shiraz Hà Nội – Viora Wine",
			description: "Shiraz Úc chính hãng. Giao nhanh 2–4h nội thành Hà Nội. Từ 490.000đ.",
		},
	};
}

export default async function ShirazHaNoiPage() {
	const pageUrl = buildPageUrl("vi", "/shiraz-ha-noi");

	const localBusinessJsonLd = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "Viora Wine Hà Nội",
		description: "Cửa hàng rượu vang Shiraz nhập khẩu chính hãng tại Hà Nội. Giao 2–4h nội thành.",
		url: pageUrl,
		telephone: "+84-338-909-973",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Ngõ 44/65 Nguyễn Cơ Thạch",
			addressLocality: "Hà Nội",
			addressRegion: "Hà Nội",
			addressCountry: "VN",
		},
		areaServed: { "@type": "City", name: "Hà Nội" },
		openingHours: ["Mo-Fr 08:00-22:00", "Sa-Su 09:00-23:00"],
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
			{ "@type": "ListItem", position: 3, name: "Shiraz Hà Nội", item: pageUrl },
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
							<span className="text-white">Hà Nội</span>
						</nav>

						<div className="max-w-3xl">
							<h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
								Rượu Vang Shiraz{" "}
								<span className="text-yellow-400">Hà Nội</span>
								<br />
								<span className="text-2xl font-medium sm:text-3xl">Giao Nhanh 2–4h Nội Thành</span>
							</h1>
							<p className="mb-8 text-lg leading-relaxed text-white/85">
								Viora Wine giao rượu vang Shiraz Úc nhập khẩu chính hãng đến tận nhà tại Hà Nội trong
								2–4 giờ. Phủ sóng toàn bộ nội thành — từ Hoàn Kiếm, Tây Hồ đến Cầu Giấy, Hoàng Mai.
							</p>

							<div className="mb-8 flex flex-wrap gap-3 text-sm">
								{[
									"⚡ Giao 2–4h nội thành Hà Nội",
									"🏅 Shiraz Úc chính hãng 100%",
									"🏢 Phục vụ sự kiện & doanh nghiệp",
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

				{/* ── Delivery coverage ────────────────────────────────── */}
				<section className="border-b border-gray-100 bg-white py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mb-4 text-lg font-bold text-gray-900">
							Giao Rượu Vang Shiraz Hà Nội — Phủ Sóng Toàn Nội Thành
						</h2>
						<div className="mb-6 flex flex-wrap gap-2">
							{[
								"Hoàn Kiếm", "Ba Đình", "Đống Đa", "Hai Bà Trưng",
								"Cầu Giấy", "Tây Hồ", "Long Biên", "Hoàng Mai",
								"Thanh Xuân", "Nam Từ Liêm", "Bắc Từ Liêm", "Hà Đông",
							].map((q) => (
								<span key={q} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600">
									{q}
								</span>
							))}
						</div>
						<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
							{[
								{ icon: "⚡", title: "2–4h nội thành", desc: "Toàn bộ 12 quận nội thành Hà Nội. Đặt sáng nhận chiều" },
								{ icon: "📦", title: "Đóng gói chống vỡ", desc: "Thùng xốp chuyên dụng, bubble wrap. Cam kết không vỡ chai" },
								{ icon: "🏢", title: "Phục vụ doanh nghiệp", desc: "Sự kiện, hội nghị, tiệc tất niên. Số lượng lớn giảm 5–15%" },
								{ icon: "💳", title: "Thanh toán linh hoạt", desc: "COD, chuyển khoản, MoMo, VNPay — trả khi nhận hàng" },
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
						Mua Rượu Vang Shiraz Hà Nội
					</h2>
					<p className="mb-8 text-gray-500">
						Shiraz Úc Barossa Valley nhập khẩu chính hãng — giao tận nhà Hà Nội trong 2–4h.
					</p>

					<WineProductGrid grapeVariety="Shiraz" emptyLabel="Đang cập nhật sản phẩm Shiraz Hà Nội mới nhất" />
				</section>

				{/* ── Why Shiraz Hà Nội ────────────────────────────────── */}
				<section className="bg-gray-50 py-14">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-5 text-2xl font-bold text-gray-900 sm:text-3xl">
								Rượu Vang Úc Shiraz — Lựa Chọn Phổ Biến Tại Hà Nội
							</h2>
							<div className="space-y-4 leading-relaxed text-gray-600">
								<p>
									Tại Hà Nội, văn hóa ẩm thực phong phú với các món thịt nướng, lẩu, thịt bò kho và
									các bữa tiệc doanh nghiệp tạo nên nhu cầu cao cho <strong>Shiraz Úc</strong> —
									loại vang đỏ đậm đà hợp với mọi món thịt đỏ và không khí đông đúc, ấm cúng của
									những bữa tụ họp Hà Thành.
								</p>
								<p>
									<strong>Rượu vang nhập khẩu Hà Nội</strong> từ Viora Wine được ưa chuộng trong
									các sự kiện doanh nghiệp, tiệc tất niên, quà biếu khách hàng và đối tác. Với mức
									giá từ 490.000đ/chai và khả năng đặt số lượng lớn kèm hộp quà logo, Viora Wine
									là đối tác rượu vang tin cậy cho doanh nghiệp Hà Nội.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ── FAQ ──────────────────────────────────────────────── */}
				<section className="py-14">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
							Hỏi Đáp — Rượu Vang Shiraz Hà Nội
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

				{/* ── Cross-link to Đà Nẵng + parent ──────────────────── */}
				<section className="border-t border-gray-100 bg-gray-50 py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">Xem thêm</p>
						<div className="flex flex-wrap gap-4">
							<a href="/ruou-vang-shiraz"
								className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#B22222] hover:text-[#B22222]">
								← Rượu Vang Shiraz (toàn quốc)
							</a>
							<a href="/ruou-vang-shiraz-da-nang"
								className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#B22222] hover:text-[#B22222]">
								Rượu Vang Shiraz Đà Nẵng →
							</a>
						</div>
					</div>
				</section>

				{/* ── CTA ──────────────────────────────────────────────── */}
				<section className="py-16">
					<div className="mx-auto max-w-xl px-4 text-center">
						<h2 className="mb-2 text-2xl font-bold text-gray-900">Đặt Shiraz Giao Tận Nhà Hà Nội</h2>
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
