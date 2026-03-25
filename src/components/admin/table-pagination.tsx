"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
	total: number;
	page: number;
	perPage?: number;
	onChange: (page: number) => void;
}

export function TablePagination({
	total,
	page,
	perPage = 10,
	onChange,
}: TablePaginationProps) {
	const totalPages = Math.ceil(total / perPage);
	const from = total === 0 ? 0 : (page - 1) * perPage + 1;
	const to = Math.min(page * perPage, total);

	if (total === 0) return null;

	// Build page number list with ellipsis
	const getPages = (): (number | "...")[] => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		const pages: (number | "...")[] = [1];
		if (page > 3) pages.push("...");
		for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
			pages.push(i);
		}
		if (page < totalPages - 2) pages.push("...");
		pages.push(totalPages);
		return pages;
	};

	return (
		<div className="flex flex-col gap-2 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
			<p className="text-center text-xs text-gray-500 sm:text-left">
				Hiển thị <span className="font-semibold text-gray-700">{from}–{to}</span> trong{" "}
				<span className="font-semibold text-gray-700">{total}</span> mục
			</p>

			<div className="flex items-center justify-center gap-1">
				<button
					onClick={() => onChange(page - 1)}
					disabled={page === 1}
					className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronLeft size={14} />
				</button>

				{getPages().map((p, i) =>
					p === "..." ? (
						<span key={`ellipsis-${i}`} className="px-1 text-xs text-gray-400">
							···
						</span>
					) : (
						<button
							key={p}
							onClick={() => onChange(p as number)}
							className={`h-8 min-w-8 rounded-lg border px-2 text-xs font-medium transition-colors ${
								p === page
									? "border-gray-900 bg-gray-900 text-white"
									: "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
							}`}
						>
							{p}
						</button>
					)
				)}

				<button
					onClick={() => onChange(page + 1)}
					disabled={page === totalPages}
					className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronRight size={14} />
				</button>
			</div>
		</div>
	);
}
