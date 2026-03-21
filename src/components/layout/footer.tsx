import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
	const t = useTranslations("footer");
	const commonT = useTranslations("common");
	const locale = useLocale();

	const navItems = [
		{ name: commonT("home"), path: "/" },
		{ name: commonT("products"), path: "/products" },
		{ name: commonT("news"), path: "/news" },
		{ name: commonT("promotion"), path: "/promotion" },
		{ name: commonT("gifts"), path: "/gifts" },
		{ name: commonT("contact"), path: "/contact" },
	];

	const socials = [
		{ icon: FaFacebookF, href: "#", label: "Facebook" },
		{ icon: FaInstagram, href: "#", label: "Instagram" },
		{ icon: FaYoutube, href: "#", label: "YouTube" },
	];

	const contacts = [
		{ icon: MapPin, label: "Địa chỉ", value: t("address") },
		{ icon: Phone, label: "Hotline", value: t("phone") },
		{ icon: Mail, label: "Email", value: t("email") },
	];

	const hours = [
		{ day: locale === "vi" ? "Thứ 2 – Thứ 6" : "Mon – Fri", time: "08:00 – 22:00" },
		{ day: locale === "vi" ? "Thứ 7 – Chủ nhật" : "Sat – Sun", time: "09:00 – 23:00" },
	];

	return (
		<footer className="bg-[#0C0C0C] text-white">
			{/* Main content */}
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

					{/* Col 1 — Brand */}
					<div className="space-y-6">
						<Link href="/">
							<span className="font-serif text-2xl font-black tracking-tight text-white">
								VIORA WINE
							</span>
							<div className="mt-1 h-0.5 w-10 bg-brand-primary" />
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

					{/* Col 2 — Navigation */}
					<div>
						<h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
							Thông tin
						</h4>
						<ul className="space-y-3">
							{navItems.map((item) => (
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

					{/* Col 3 — Contact */}
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
							Giờ hoạt động
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
								href="/contact"
								className="inline-block rounded-lg bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#A30000]"
							>
								{commonT("contact_us")}
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
						{locale === "vi" ? "Đã đăng ký bản quyền" : "All rights reserved"}.
					</p>
					<div className="flex gap-6">
						<Link href="/privacy-policy" className="text-[11px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/60">
							Chính sách bảo mật
						</Link>
						<Link href="/terms" className="text-[11px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/60">
							Điều khoản sử dụng
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
