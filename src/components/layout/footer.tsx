import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";
import { WINE_IMAGES } from "../../../public/statics/images";

export default function Footer() {
	const t = useTranslations("footer");
	const commonT = useTranslations("common");

	const supportItems = [
		{ name: t("shopping_guide_link"), path: "/shopping-guide" },
		{ name: t("shipping_policy_link"), path: "/shipping-policy" },
		{ name: t("inspection_policy_link"), path: "/inspection-policy" },
		{ name: t("return_policy_link"), path: "/return-policy" },
		{ name: t("payment_policy_link"), path: "/payment-policy" },
	];

	const socials = [
		{ icon: FaFacebookF, href: "#", label: "Facebook" },
		{ icon: FaInstagram, href: "#", label: "Instagram" },
		{ icon: FaYoutube, href: "#", label: "YouTube" },
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
									className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white"
								>
									<Icon size={14} />
								</a>
							))}
						</div>
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
							{commonT("contact")}
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
					</div>

					{/* Col 4 — Hours */}
					<div>
						<h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
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

						<div className="mt-8">
							<Link
							target="_blank"
								href={`https://zalo.me/0338909973`}
								className="inline-block rounded-lg bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#A30000]"
							>
								{commonT("contact_zalo")}
							</Link>
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
