import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MapPin, Phone, Mail, Clock, Car, Baby } from "lucide-react";
import Image from "next/image";
import { WINE_IMAGES } from "../../../public/statics/images";
import FooterZaloButton from "./footer-zalo-button";

export default function Footer() {
	const t = useTranslations("footer");
	const commonT = useTranslations("common");
	const homeT = useTranslations("home");

	const supportItems = [
		{ name: t("shopping_guide_link"), path: "/shopping-guide" as const },
		{ name: t("shipping_policy_link"), path: "/shipping-policy" as const },
		{ name: t("inspection_policy_link"), path: "/inspection-policy" as const },
		{ name: t("return_policy_link"), path: "/return-policy" as const },
		{ name: t("payment_policy_link"), path: "/payment-policy" as const },
	];

	const socials = [
		{ icon: FaFacebookF, href: "https://www.facebook.com/viorawine", label: "Facebook" },
		{ icon: SiZalo, href: "https://zalo.me/0373216268", label: "Zalo" },
		{ icon: FaYoutube, href: "https://www.youtube.com/@viorawine", label: "YouTube" },
	];

	const contacts = [
		{ icon: MapPin, label: t("contact_address_label"), value: t("address") },
		{ icon: Phone, label: t("contact_phone_label"), value: t("phone") },
		{ icon: Mail, label: t("contact_email_label"), value: t("email") },
	];

	const hours = [
		{ day: t("hours_weekday"), time: "08:00 – 22:00" },
		{ day: t("hours_weekend"), time: "09:00 – 23:00" },
	];

	return (
		<footer className="bg-[#0C0C0C] text-white">
			{/* Main content */}
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">

					{/* Col 1 — Brand */}
					<div className="space-y-6">
						<Link href="/">
							<Image src={WINE_IMAGES.logoDark} alt="Logo dark" />
						</Link>
						<p className="text-sm leading-relaxed text-white/50">
							{commonT("slogan")}
						</p>
						<div className="flex gap-3">
							{socials.map(({ icon: Icon, href, label }) => (
								<a
									key={label}
									href={href}
									aria-label={label}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white"
								>
									<Icon size={14} />
								</a>
							))}
						</div>
						
						{/* Legal / warning block (moved here) */}
						<div className="mt-6 space-y-3">
							<div className="flex items-center gap-3">
								<div
									aria-label="18+"
									className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500 text-[11px] font-extrabold tracking-tight text-red-500"
								>
									18+
								</div>
								<div
									aria-label={t("warnings_no_driving")}
									className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500"
								>
									<Car className="h-4 w-4 text-red-500" />
									<span className="pointer-events-none absolute inset-0 rotate-45">
										<span className="absolute left-1/2 top-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 bg-red-500" />
									</span>
								</div>
								<div
									aria-label={t("warnings_no_pregnancy")}
									className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500"
								>
									<Baby className="h-4 w-4 text-red-500" />
									<span className="pointer-events-none absolute inset-0 rotate-45">
										<span className="absolute left-1/2 top-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 bg-red-500" />
									</span>
								</div>
							</div>

							<div className="space-y-2 text-sm leading-relaxed ">
								<p className="text-white/60 transition-colors hover:text-white">{t("legal_company_name")}</p>
								<p className="text-white/60 transition-colors hover:text-white">{t("legal_business_license")}</p>
								<p className="text-white/60 transition-colors hover:text-white">{t("legal_alcohol_license")}</p>
							</div>
						</div>
					</div>

					

					{/* Col 2 — Categories */}
					<div>
						<h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
							{t("categories_label")}
						</h4>
						<ul className="space-y-3">
							{[
								{ name: homeT("cat_wine"), path: "/products?cat=wine" },
								{ name: homeT("cat_whisky"), path: "/products?cat=whisky" },
								{ name: homeT("cat_spirits"), path: "/products?cat=spirits" },
								{ name: homeT("cat_champagne"), path: "/products?cat=champagne" },
								{ name: homeT("cat_gift"), path: "/products?cat=gift" },
							].map((item) => (
								<li key={item.path}>
									<Link
										href={item.path as any}
										className="text-sm text-white/60 transition-colors hover:text-white"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Col 3 — Support */}
					<div>
					<h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
						{t("support_label")}
					</h4>
					<ul className="space-y-3">
						{supportItems.map((item) => (
							<li key={item.path}>
								<Link
									href={item.path}
									className="text-sm text-white/60 transition-colors hover:text-white"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Col 4 — Contact */}
					<div>
						<h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
							{t("owner_info_label")}
						</h4>
						<ul className="space-y-5">
							{contacts.map(({ icon: Icon, label, value }) => (
								<li key={label} className="flex items-start gap-3">
									<span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
										<Icon size={13} className="text-brand-primary" />
									</span>
									<div>
										<p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
											{label}
										</p>
										<p className="mt-0.5 text-sm text-white/60">{value}</p>
									</div>
								</li>
							))}
						</ul>
						<div className="mt-4">
						<h4 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
							{t("hours_label")}
						</h4>
						<ul className="space-y-3">
							{hours.map(({ day, time }) => (
								<li key={day} className="flex items-center gap-2.5">
									<Clock size={13} className="shrink-0 text-brand-primary" />
									<span className="text-sm text-white/60">
										{day}
										<span className="mx-1.5 text-white/20">—</span>
										<span className="font-semibold text-white/80">{time}</span>
									</span>
								</li>
							))}
						</ul>

						<div className="mt-4">
							<FooterZaloButton label={commonT("contact_zalo")} />
						</div>
					</div>
				</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-white/5">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row lg:px-8">
					<p className="text-[11px] uppercase tracking-[0.15em] text-white/30">
						© {new Date().getFullYear()}{" "}
						<span className="text-white/60 font-semibold">VIORA WINE</span>.{" "}
						{t("copyright")}.
					</p>
					<div className="flex gap-6">
						<Link href="/privacy-policy" className="text-[11px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/60">
							{t("privacy_link")}
						</Link>
						<Link href="/terms" className="text-[11px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/60">
							{t("terms_link")}
						</Link>
					</div>				</div>
			</div>
		</footer>
	);
}
