"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { EventForm } from "@/components/admin/event-form";
import { createClient } from "@/lib/supabase";
import { type EventFormValues } from "@/lib/schemas/event-schema";

type Event = EventFormValues & { id: string; created_at: string };

const CATEGORY_LABELS: Record<string, string> = {
	"su-kien": "Sự kiện",
	"kien-thuc": "Kiến thức",
};

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("vi-VN", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export default function EventsPage() {
	const [open, setOpen] = useState(false);
	const [editEvent, setEditEvent] = useState<Event | null>(null);
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const fetchEvents = useCallback(async () => {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.order("date", { ascending: false });

		if (error) toast.error("Không thể tải danh sách sự kiện");
		else setEvents(data ?? []);

		setLoading(false);
	}, []);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const handleDelete = async (id: string) => {
		if (!confirm("Bạn chắc muốn xoá sự kiện này?")) return;
		setDeletingId(id);
		const supabase = createClient();
		const { error } = await supabase.from("events").delete().eq("id", id);
		if (error) toast.error("Xoá thất bại: " + error.message);
		else {
			toast.success("Đã xoá sự kiện");
			setEvents((prev) => prev.filter((e) => e.id !== id));
		}
		setDeletingId(null);
	};

	return (
		<div className="min-h-screen p-8">
			{/* Header */}
			<div className="mb-8 flex items-end justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
						Sự kiện & Kiến thức
					</h1>
					<p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
						Event &amp; Knowledge Management
					</p>
				</div>

				<button
					onClick={() => setOpen(true)}
					className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-700"
				>
					<Plus size={16} />
					Thêm mới
				</button>
			</div>

			{/* Table */}
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				{loading ? (
					<div className="flex items-center justify-center py-20 text-gray-400">
						<Loader2 size={24} className="animate-spin" />
					</div>
				) : events.length === 0 ? (
					<div className="py-20 text-center text-sm text-gray-400">
						Chưa có sự kiện nào. Nhấn <strong>+ Thêm mới</strong> để tạo.
					</div>
				) : (
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
								<th className="px-5 py-4">Sự kiện</th>
								<th className="px-5 py-4">Danh mục</th>
								<th className="px-5 py-4">Ngày</th>
								<th className="px-5 py-4 text-right">Thao tác</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{events.map((event) => (
								<tr
									key={event.id}
									className="transition-colors hover:bg-gray-50/60"
								>
									{/* Event */}
									<td className="px-5 py-4">
										<div className="flex items-center gap-3">
											<div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
												{event.thumbnail_url ? (
													<Image
														src={event.thumbnail_url}
														alt={event.name}
														fill
														className="object-cover"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center text-gray-300 text-xs">
														?
													</div>
												)}
											</div>
											<p className="font-bold text-gray-900 line-clamp-2">
												{event.name}
											</p>
										</div>
									</td>

									{/* Category */}
									<td className="px-5 py-4">
										<span
											className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
												event.category === "su-kien"
													? "border border-[#C80000]/30 bg-[#C80000]/10 text-[#C80000]"
													: "border border-blue-200 bg-blue-50 text-blue-600"
											}`}
										>
											{CATEGORY_LABELS[event.category] ?? event.category}
										</span>
									</td>

									{/* Date */}
									<td className="px-5 py-4 text-gray-600">
										{formatDate(event.date)}
									</td>

									{/* Actions */}
									<td className="px-5 py-4 text-right">
										<div className="flex items-center justify-end gap-1">
											<button
												onClick={() => setEditEvent(event)}
												className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
											>
												<Pencil size={14} />
											</button>
											<button
												onClick={() => handleDelete(event.id)}
												disabled={deletingId === event.id}
												className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
											>
												{deletingId === event.id ? (
													<Loader2 size={14} className="animate-spin" />
												) : (
													<Trash2 size={14} />
												)}
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Modal tạo mới */}
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title="Thêm sự kiện mới"
				description="Điền đầy đủ thông tin để tạo sự kiện"
				size="2xl"
			>
				<EventForm
					onSuccess={() => {
						setOpen(false);
						fetchEvents();
					}}
				/>
			</Modal>

			{/* Modal chỉnh sửa */}
			<Modal
				open={!!editEvent}
				onClose={() => setEditEvent(null)}
				title="Chỉnh sửa sự kiện"
				description={editEvent ? editEvent.name : ""}
				size="2xl"
			>
				{editEvent && (
					<EventForm
						initialData={editEvent}
						onSuccess={() => {
							setEditEvent(null);
							fetchEvents();
						}}
					/>
				)}
			</Modal>
		</div>
	);
}
