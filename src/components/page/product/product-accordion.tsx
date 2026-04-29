"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Star } from "lucide-react";
import { sanitizeHtmlContent } from "@/utils/content-processor";

interface Section {
	id: string;
	title: string;
	content: string | null;
}

interface Props {
	productContent: string | null;
	sections: Section[];
}

export default function ProductAccordion({ productContent, sections }: Props) {
	const [openSection, setOpenSection] = useState<string | null>("policy");

	return (
		<div>
			{productContent && (
				<div className="border-b border-gray-100 pb-6">
					<h3 className="mb-3 text-[15px] font-bold text-gray-900">Mô tả sản phẩm</h3>
					<div
						className="prose max-w-none text-[14px] leading-relaxed text-gray-600"
						dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(productContent) }}
					/>
				</div>
			)}

			{sections.map((section) => (
				<div key={section.id} className="border-b border-gray-100 last:border-b-0">
					<button
						onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
						className="flex w-full items-center justify-between py-4 text-left"
					>
						<span
							className={`text-[15px] font-semibold transition-colors ${openSection === section.id ? "text-brand-primary" : "text-gray-800"}`}
						>
							{section.title}
						</span>
						<ChevronDown
							size={18}
							className={`shrink-0 transition-transform duration-300 ${openSection === section.id ? "text-brand-primary rotate-180" : "text-gray-300"}`}
						/>
					</button>
					<AnimatePresence initial={false}>
						{openSection === section.id && (
							<motion.div
								key="content"
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.25 }}
								className="overflow-hidden"
							>
								<div className="pb-5">
									{section.id === "reviews" ? (
										<div className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-4 text-[13px]">
											<Star size={16} className="shrink-0 fill-yellow-400 text-yellow-400" />
											<span>Chưa có đánh giá. Hãy là người đầu tiên!</span>
										</div>
									) : section.content ? (
										<div
											className="prose max-w-none text-[14px] leading-relaxed"
											dangerouslySetInnerHTML={{
												__html: sanitizeHtmlContent(section.content),
											}}
										/>
									) : null}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			))}
		</div>
	);
}
