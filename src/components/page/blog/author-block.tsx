"use client";

import { User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SiZalo } from "react-icons/si";

interface SocialLinks {
	facebook?: string;
	zalo?: string;
}

interface AuthorBlockProps {
	name: string;
	bio: string;
	title?: string;
	label?: string;
	viewMoreLabel?: string;
	authorPageHref?: string;
	avatarUrl?: string;
	socialLinks?: SocialLinks;
}

export default function AuthorBlock({
	name,
	bio,
	title = "Chuyên gia rượu vang",
	label = "Về tác giả",
	viewMoreLabel = "Xem trang chuyên gia →",
	authorPageHref,
	avatarUrl,
	socialLinks,
}: AuthorBlockProps) {
	const hasSocials = socialLinks?.facebook || socialLinks?.zalo;

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div className="rounded-2xl border border-gray-100 bg-linear-to-br from-amber-50/60 via-white to-gray-50 p-6">
				{/* Label */}
				<p className="mb-4 text-[10px] font-semibold tracking-widest text-gray-600 uppercase">{label}</p>

				<div className="flex items-start gap-5">
					{/* Avatar */}
					<div className="relative shrink-0">
						{avatarUrl ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img src={avatarUrl} alt={name} className="h-18 w-18 rounded-full object-cover shadow" />
						) : (
							<div className="bg-brand-primary/10 text-brand-primary flex h-18 w-18 items-center justify-center rounded-full">
								<User size={30} />
							</div>
						)}
						{/* "Expert" badge */}
						<span className="bg-brand-primary absolute -right-1 -bottom-1 rounded-full border-2 border-white px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase shadow">
							Expert
						</span>
					</div>

					{/* Info */}
					<div className="min-w-0 flex-1">
						{/* Name + brand badge */}
						<div className="mb-0.5 flex flex-wrap items-center gap-2">
							<p className="text-[15px] font-semibold text-gray-900">{name}</p>
							<span className="bg-brand-primary/10 text-brand-primary rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
								Viora Wine
							</span>
						</div>

						{/* Title */}
						<p className="mb-2 text-[12px] font-semibold tracking-wide text-gray-600 uppercase">{title}</p>

						{/* Bio */}
						<p className="text-[13px] leading-relaxed text-gray-600">{bio}</p>

						{/* Social links + author page */}
						<div className="mt-4 flex flex-wrap items-center gap-3">
							{hasSocials && (
								<div className="flex items-center gap-2">
									{socialLinks?.facebook && (
										<a
											href={socialLinks.facebook}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Facebook"
											className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-80"
										>
											<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
											</svg>
										</a>
									)}
									{socialLinks?.zalo && (
										<a
											href={socialLinks.zalo}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Zalo"
											className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#2196F3] to-[#01579B] text-white transition-opacity hover:opacity-80"
										>
											<SiZalo size={14} />
										</a>
									)}
								</div>
							)}

							{authorPageHref && (
								<Link
									href={authorPageHref as any}
									className="text-brand-primary text-[12px] font-semibold hover:underline"
								>
									{viewMoreLabel}
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
