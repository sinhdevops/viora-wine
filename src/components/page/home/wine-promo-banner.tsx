import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function WinePromoBanner() {
	const t = useTranslations("home");

	return (
		<section className="relative overflow-hidden">
			{/* Full background image */}
			<Image
				src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1600"
				alt="Wine background"
				fill
				className="object-cover object-center"
			/>

			{/* Overlay: left opaque → transparent on desktop, bottom dark on mobile */}
			<div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-white/10 sm:from-white/90 sm:via-white/60 sm:to-transparent" />

			{/* Content */}
			<div className="relative z-10 mx-auto flex min-h-48 max-w-360 items-center px-8 py-10 sm:min-h-65 sm:px-12 lg:min-h-90 lg:px-16 lg:py-16">
				<div className="w-full text-center sm:text-left sm:max-w-1/2">
					<h2 className="mb-3 text-xl font-black leading-tight tracking-tight uppercase md:mb-4 md:text-[28px]">
						{t("promo_title")}
					</h2>
					<p className="mb-6 text-[13px] leading-relaxed text-gray-700 md:mb-8 md:text-sm lg:text-[16px]">
						{t("promo_desc")}
					</p>
					<Link
						href="/products"
						className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#A30000] md:px-8 md:py-3.5 md:text-sm"
					>
						{t("all_product")}
					</Link>
				</div>
			</div>
		</section>
	);
}
