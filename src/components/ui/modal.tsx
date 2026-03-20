"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const sizes = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-2xl",
	"2xl": "max-w-3xl",
};

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	size?: keyof typeof sizes;
	children: React.ReactNode;
}

export function Modal({
	open,
	onClose,
	title,
	description,
	size = "lg",
	children,
}: ModalProps) {
	// lock body scroll
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	// close on Escape
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (open) document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (typeof window === "undefined") return null;

	return createPortal(
		<AnimatePresence>
			{open && (
				<>
					{/* Backdrop */}
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={onClose}
						className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
					/>

					{/* Panel */}
					<motion.div
						key="panel"
						initial={{ opacity: 0, scale: 0.96, y: 12 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.96, y: 12 }}
						transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
						className={`fixed inset-x-4 top-[50%] z-50 mx-auto -translate-y-1/2 ${sizes[size]} flex max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl`}
					>
						{/* Header */}
						<div className="flex flex-shrink-0 items-start justify-between border-b border-gray-100 px-6 py-5">
							<div>
								<h2 className="text-base font-bold text-gray-900">{title}</h2>
								{description && (
									<p className="mt-0.5 text-xs text-gray-400">{description}</p>
								)}
							</div>
							<button
								onClick={onClose}
								className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
							>
								<X size={16} />
							</button>
						</div>

						{/* Scrollable body */}
						<div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body,
	);
}
