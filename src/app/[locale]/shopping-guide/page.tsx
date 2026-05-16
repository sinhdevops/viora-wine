import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { buildHowToSchema, buildFAQSchema, buildBreadcrumbSchema, jsonLdScript } from "@/lib/geo-schemas";
import { SITE_URL } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "shopping_guide" });
	const common = await getTranslations({ locale, namespace: "common" });

	return {
		title: t("meta_title"),
		description: t("updated"),
		keywords: [
			"hướng dẫn mua rượu vang",
			"cách chọn rượu vang",
			"mua rượu vang ở đâu",
			"rượu vang nhập khẩu chính hãng",
			"cách đặt hàng Viora Wine",
			"viorawine",
			"viora wine",
			"Viora Wine",
		],
		robots: { index: true },
		openGraph: {
			title: `${t("meta_title")} | ${common("brand")}`,
			description: t("updated"),
		},
	};
}

export default async function ShoppingGuidePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "shopping_guide" });

	const SECTIONS = [
		{ title: t("section1_title"), content: t("section1_content") },
		{ title: t("section2_title"), content: t("section2_content") },
		{ title: t("section3_title"), content: t("section3_content") },
		{ title: t("section4_title"), content: t("section4_content") },
		{ title: t("section5_title"), content: t("section5_content") },
	];

	const pageUrl = `${SITE_URL}/huong-dan-mua-hang`;

	// ── HowTo schema — giúp AI hướng dẫn người dùng mua rượu từng bước ──
	const howToJsonLd = buildHowToSchema({
		name: "Hướng Dẫn Mua Rượu Vang Nhập Khẩu Tại Viora Wine",
		description: "Quy trình mua rượu vang nhập khẩu chính hãng tại Viora Wine — từ chọn sản phẩm, đặt hàng đến nhận hàng và thanh toán.",
		totalTime: "PT10M",
		steps: [
			{
				name: "Xác định nhu cầu và ngân sách",
				text: "Trước tiên, xác định mục đích: uống hàng ngày, quà tặng hay tiệc đặc biệt? Ngân sách bao nhiêu? Viora Wine có rượu từ 210.000đ đến nhiều triệu đồng. Nếu không chắc, hãy liên hệ tư vấn qua Zalo 0325-610-016 — miễn phí hoàn toàn.",
			},
			{
				name: "Chọn loại rượu phù hợp",
				text: "Duyệt danh mục trên viorawine.com: Vang đỏ (đậm đà, hợp thịt đỏ), Vang trắng (tươi mát, hợp hải sản), Vang hồng (cân bằng, dễ uống), Vang ngọt (dịu nhẹ, dễ tiếp cận), Shiraz Úc (đặc sản đậm đà), Rượu mạnh Whisky/Cognac. Đọc mô tả chi tiết từng sản phẩm để chọn đúng.",
			},
			{
				name: "Đặt hàng qua Zalo hoặc website",
				text: "Cách 1: Nhắn Zalo 0325-610-016 — nhanh nhất, nhân viên phản hồi trong 15 phút, tư vấn chọn thêm nếu cần. Cách 2: Đặt trực tiếp trên viorawine.com — chọn sản phẩm, nhập địa chỉ, chọn phương thức thanh toán. Cách 3: Gọi điện 0338-909-973.",
			},
			{
				name: "Xác nhận đơn và thanh toán",
				text: "Viora Wine xác nhận đơn hàng qua Zalo/điện thoại. Phương thức thanh toán: COD (thanh toán khi nhận hàng), chuyển khoản ngân hàng, MoMo, ZaloPay. Hóa đơn/biên lai được cấp khi yêu cầu.",
			},
			{
				name: "Nhận hàng và kiểm tra",
				text: "Nội thành Đà Nẵng & Hà Nội: giao trong 2–4 giờ. Tỉnh thành khác: 1–3 ngày qua J&T/GHN. Đóng gói chuyên dụng thùng xốp + bubble wrap — 100% không vỡ chai. Khi nhận, kiểm tra số lượng, tình trạng chai và tem nhập khẩu. Liên hệ ngay nếu có vấn đề.",
			},
		],
	});

	// ── FAQPage cho trang hướng dẫn mua hàng ──
	const faqJsonLd = buildFAQSchema([
		{
			q: "Viora Wine có giao hàng tận nhà không?",
			a: "Có. Viora Wine giao hàng tận nhà toàn quốc. Nội thành Đà Nẵng và Hà Nội: giao trong 2–4 giờ sau khi xác nhận đơn. Các tỉnh thành khác: 1–3 ngày làm việc qua J&T Express và GHN. Đóng gói chuyên dụng chống vỡ, cam kết 100% không vỡ chai.",
		},
		{
			q: "Mua rượu vang tại Viora Wine thanh toán bằng cách nào?",
			a: "Viora Wine chấp nhận nhiều hình thức thanh toán: (1) COD — thanh toán tiền mặt khi nhận hàng; (2) Chuyển khoản ngân hàng (Vietcombank, MB Bank, Techcombank); (3) Ví điện tử MoMo, ZaloPay. Không bắt buộc thanh toán trước đối với đơn hàng nội thành.",
		},
		{
			q: "Đặt hàng số lượng lớn tại Viora Wine được giảm giá không?",
			a: "Có. Viora Wine áp dụng giá ưu đãi cho đơn số lượng lớn: từ 6 chai giảm 5%, từ 12 chai giảm 10%, từ 24 chai trở lên giảm 15–20% tùy sản phẩm. Đặc biệt có dịch vụ đóng hộp quà, in logo doanh nghiệp cho quà tặng tập thể. Liên hệ Zalo 0325-610-016 để được báo giá.",
		},
		{
			q: "Mua rượu vang làm quà tặng tại Viora Wine cần làm gì?",
			a: "Liên hệ Zalo 0325-610-016 và cho biết: ngân sách, số lượng chai, dịp tặng (sinh nhật/kỷ niệm/doanh nghiệp), có cần in thiệp/ribbon không. Viora Wine sẽ tư vấn chọn rượu phù hợp và đóng gói hộp quà sang trọng. Thời gian xử lý đơn quà tặng: 2–4 giờ nội thành.",
		},
		{
			q: "Tôi không biết chọn rượu vang nào, Viora Wine có tư vấn không?",
			a: "Có. Dịch vụ tư vấn của Viora Wine hoàn toàn miễn phí. Chỉ cần nhắn Zalo 0325-610-016 và cho biết: bạn thích vị gì (đậm/nhẹ/ngọt/khô), uống cùng món ăn nào, ngân sách bao nhiêu. Đội ngũ sẽ gợi ý 2–3 chai phù hợp nhất và giải thích tại sao để bạn lựa chọn tốt nhất.",
		},
		{
			q: "Rượu vang Viora Wine có hóa đơn VAT không?",
			a: "Có. Viora Wine xuất hóa đơn VAT theo yêu cầu. Vui lòng thông báo khi đặt hàng và cung cấp thông tin công ty (tên, MST, địa chỉ). Hóa đơn điện tử sẽ được gửi qua email trong vòng 24 giờ sau khi giao hàng thành công.",
		},
	]);

	// ── Breadcrumb ──
	const breadcrumbJsonLd = buildBreadcrumbSchema([
		{ name: "Trang chủ", url: SITE_URL },
		{ name: "Hướng Dẫn Mua Hàng", url: pageUrl },
	]);

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(howToJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />

			<div className="min-h-screen bg-white">
				{/* Breadcrumb */}
				<div className="border-b border-gray-100">
					<div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
						<nav className="flex items-center gap-1.5 text-[12px] text-gray-400" aria-label="breadcrumb">
							<Link href="/" className="hover:text-gray-700">
								{t("breadcrumb_home")}
							</Link>
							<ChevronRight size={12} />
							<span className="text-gray-700">{t("breadcrumb_current")}</span>
						</nav>
					</div>
				</div>

				<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-10 border-b border-gray-100 pb-8">
						<p className="text-brand-primary mb-2 text-[11px] font-bold tracking-widest uppercase">
							{t("brand_label")}
						</p>
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900 uppercase md:text-[32px]">
							{t("title")}
						</h1>
						<p className="mt-3 text-sm text-gray-500">{t("updated")}</p>
					</div>

					{/* Sections */}
					<div className="space-y-8">
						{SECTIONS.map((section) => (
							<div key={section.title}>
								<h2 className="mb-3 text-[15px] font-semibold text-gray-900">{section.title}</h2>
								<p className="text-[14px] leading-relaxed whitespace-pre-line text-gray-600">
									{section.content}
								</p>
							</div>
						))}
					</div>

					{/* FAQ Section */}
					<div className="mt-12 space-y-4">
						<h2 className="text-[15px] font-semibold text-gray-900">Câu Hỏi Thường Gặp Khi Mua Hàng</h2>
						{[
							{
								q: "Tôi không biết chọn rượu nào, Viora Wine có tư vấn không?",
								a: "Dịch vụ tư vấn hoàn toàn miễn phí. Nhắn Zalo 0325-610-016 với thông tin: vị yêu thích, món ăn kết hợp, ngân sách — đội ngũ sẽ gợi ý phù hợp nhất.",
							},
							{
								q: "Giao hàng có đảm bảo an toàn cho chai rượu không?",
								a: "Đảm bảo 100%. Viora Wine đóng gói chuyên dụng thùng xốop + bubble wrap cho từng chai, cam kết không vỡ. Nếu vỡ trong vận chuyển, đổi miễn phí.",
							},
						].map((item) => (
							<div key={item.q} className="rounded-xl border border-gray-100 p-5">
								<h3 className="mb-2 text-[14px] font-semibold text-gray-900">{item.q}</h3>
								<p className="text-[13px] leading-relaxed text-gray-500">{item.a}</p>
							</div>
						))}
					</div>

					{/* Contact */}
					<div className="mt-12 rounded-2xl bg-gray-50 p-6">
						<h3 className="mb-2 text-[14px] font-bold text-gray-900">{t("contact_title")}</h3>
						<p className="text-[13px] leading-relaxed text-gray-500">{t("contact_desc")}</p>
						<ul className="mt-3 space-y-1 text-[13px] text-gray-600">
							<li>
								{t("contact_email_label")} <span className="font-medium">{t("contact_email")}</span>
							</li>
							<li>
								{t("contact_phone_label")} <span className="font-medium">{t("contact_phone")}</span>
							</li>
							<li>
								{t("contact_address_label")} <span className="font-medium">{t("contact_address")}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
