"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { HeroBannerForm } from "@/components/admin/hero-banner-form";
import { supabase } from "@/lib/supabase-client";

interface Banner {
    id: string;
    image_url: string;
    created_at: string;
}

export default function HeroBannerPage() {
    const [open, setOpen] = useState(false);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchBanners = useCallback(async () => {
        const { data, error } = await supabase
            .from("hero_banners")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) toast.error("Không thể tải danh sách banner");
        else setBanners(data ?? []);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

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

    return (
        <div className="min-h-screen p-8">
            {/* Page header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Hero Banners
                    </h1>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Homepage Banner Management
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-700"
                >
                    <Plus size={16} />
                    Add Banner
                </button>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-gray-400">
                    <Loader2 size={24} className="animate-spin" />
                </div>
            ) : banners.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-24 text-center">
                    <p className="text-sm text-gray-400">
                        Chưa có banner nào.{" "}
                        <button
                            onClick={() => setOpen(true)}
                            className="font-semibold text-[#C80000] hover:underline"
                        >
                            Thêm ngay
                        </button>
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {banners.map((banner, idx) => (
                        <div
                            key={banner.id}
                            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/7] w-full bg-gray-100">
                                <Image
                                    src={banner.image_url}
                                    alt={`Banner ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-4 py-3">
                                <div>
                                    <p className="text-xs font-semibold text-gray-700">
                                        Banner #{idx + 1}
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                        {new Date(banner.created_at).toLocaleDateString("vi-VN")}
                                    </p>
                                </div>

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
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Thêm Hero Banner"
                description="Upload ảnh banner mới cho trang chủ"
                size="md"
            >
                <HeroBannerForm
                    onSuccess={() => {
                        setOpen(false);
                        fetchBanners();
                    }}
                />
            </Modal>
        </div>
    );
}
