import { buildAlternates, buildPageUrl, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return {
		title: "Rượu Mạnh Nhập Khẩu Chính Hãng – Viora Wine",
		description:
			"Mua rượu mạnh nhập khẩu chính hãng tại Đà Nẵng & Hà Nội. Whisky, Cognac, Brandy và nhiều loại rượu mạnh cao cấp. Giao nhanh 2–4h.",
		keywords: ["rượu mạnh", "rượu mạnh nhập khẩu", "whisky", "cognac", "brandy", "rượu mạnh chính hãng"],
		alternates: buildAlternates(locale, "/spirits"),
		openGraph: {
			title: "Rượu Mạnh Nhập Khẩu Chính Hãng – Viora Wine",
			description: "Whisky, Cognac, Brandy nhập khẩu chính hãng. Giao nhanh toàn quốc.",
			url: buildPageUrl(locale, "/spirits"),
			siteName: "Viora Wine Đà Nẵng",
			locale: "vi_VN",
			type: "website",
			images: [{ url: `${SITE_URL}/statics/images/og-home.jpg`, width: 1200, height: 630, alt: "Rượu Mạnh – Viora Wine" }],
		},
	};
}

export default function SpiritsPage() {
	return (
		<div className="min-h-screen bg-white">
			<section className="bg-gradient-to-br from-[#2C1810] to-[#6B3A2A] py-14 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/60">
						<a href="/" className="transition-colors hover:text-white">Trang chủ</a>
						<span>/</span>
						<span className="text-white">Rượu Mạnh</span>
					</nav>
					<div className="max-w-3xl">
						<h1 className="mb-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
							Rượu Mạnh <span className="text-yellow-400">Nhập Khẩu Chính Hãng</span>
						</h1>
						<p className="mb-8 text-lg leading-relaxed text-white/85">
							Whisky, Cognac, Brandy và các loại rượu mạnh cao cấp từ khắp thế giới — nhập khẩu chính hãng,
							đảm bảo chất lượng tuyệt đối.
						</p>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
				<p className="text-lg font-medium text-gray-700 mb-2">Đang cập nhật sản phẩm rượu mạnh</p>
				<p className="text-sm text-gray-500 mb-8">
					Liên hệ Zalo để được tư vấn và đặt hàng trực tiếp: <strong>0338-909-973</strong>
				</p>
				<a
					href="https://zalo.me/0325610016"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block rounded-lg bg-[#B22222] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#8B0000]"
				>
					Tư vấn qua Zalo
				</a>
			</section>
		</div>
	);
}
