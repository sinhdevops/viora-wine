"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { HeroBannerForm } from "@/components/admin/hero-banner-form";
import { TablePagination } from "@/components/admin/table-pagination";
import { supabase } from "@/lib/supabase-client";

const MAX_BANNERS = 10;
const MAX_ACTIVE = 5;

interface Banner {
    id: string;
    image_url: string;
    is_active: boolean;
    created_at: string;
}

export default function HeroBannerPage() {
    const [openAdd, setOpenAdd] = useState(false);
    const [editBanner, setEditBanner] = useState<Banner | null>(null);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const fetchBanners = useCallback(async () => {
        const { data, error } = await supabase
            .from("hero_banners")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) toast.error("Không thể tải danh sách banner");
        else { setBanners(data ?? []); setPage(1); }
        setLoading(false);
    }, []);

    useEffect(() => { fetchBanners(); }, [fetchBanners]);

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn chắc muốn xoá banner này?")) return;
        setDeletingId(id);
        const { error } = await supabase.from("hero_banners").delete().eq("id", id);
        if (error) toast.error("Xoá thất bại: " + error.message);
        else {
            toast.success("Đã xoá banner");
            setBanners((prev) => prev.filter((b) => b.id !== id));
        }
        setDeletingId(null);
    };

    const activeCount = banners.filter((b) => b.is_active).length;
    const canAdd = banners.length < MAX_BANNERS;

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                        Hero Banners
                    </h1>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                        {banners.length}/{MAX_BANNERS} banner · {activeCount}/{MAX_ACTIVE} đang active
                    </p>
                </div>

                <button
                    onClick={() => setOpenAdd(true)}
                    disabled={!canAdd}
                    title={!canAdd ? "Đã đạt tối đa 10 banner, xoá bớt để thêm mới" : ""}
                    className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Plus size={16} />
                    Add Banner
                </button>
            </div>

            {!canAdd && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    Đã đạt tối đa <strong>10 banner</strong>. Vui lòng xoá bớt để tạo thêm.
                </div>
            )}

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-gray-400">
                    <Loader2 size={24} className="animate-spin" />
                </div>
            ) : banners.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-24 text-center">
                    <p className="text-sm text-gray-400">
                        Chưa có banner nào.{" "}
                        <button
                            onClick={() => setOpenAdd(true)}
                            className="font-semibold text-brand-primary hover:underline"
                        >
                            Thêm ngay
                        </button>
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-120 text-sm">
                        <thead className="border-b border-gray-100 bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">#</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Ảnh</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Trạng thái</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Ngày tạo</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {banners.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((banner, idx) => (
                                <tr key={banner.id} className="transition-colors hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-600">{idx + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="relative h-14 w-28 overflow-hidden rounded-lg bg-gray-100">
                                            <Image
                                                src={banner.image_url}
                                                alt={`Banner ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {banner.is_active ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(banner.created_at).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditBanner(banner)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(banner.id)}
                                                disabled={deletingId === banner.id}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                                            >
                                                {deletingId === banner.id ? (
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
                    </div>
                    <TablePagination
                        total={banners.length}
                        page={page}
                        perPage={PER_PAGE}
                        onChange={setPage}
                    />
                </div>
            )}

            {/* Add Modal */}
            <Modal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                title="Thêm Hero Banner"
                description="Upload ảnh banner mới cho trang chủ"
                size="md"
            >
                <HeroBannerForm
                    activeCount={activeCount}
                    onSuccess={() => { setOpenAdd(false); fetchBanners(); }}
                />
            </Modal>

            {/* Edit Modal */}
            <Modal
                open={!!editBanner}
                onClose={() => setEditBanner(null)}
                title="Chỉnh sửa Banner"
                description="Cập nhật ảnh hoặc trạng thái banner"
                size="md"
            >
                {editBanner && (
                    <HeroBannerForm
                        initialData={editBanner}
                        activeCount={activeCount}
                        onSuccess={() => { setEditBanner(null); fetchBanners(); }}
                    />
                )}
            </Modal>
        </div>
    );
}
