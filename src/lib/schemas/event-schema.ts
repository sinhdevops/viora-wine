import { z } from "zod";

export const EVENT_CATEGORIES = [
	{ value: "su-kien", label: "Sự kiện" },
	{ value: "kien-thuc", label: "Kiến thức" },
] as const;



export const eventSchema = z.object({
	name: z.string().min(1, "Tên sự kiện là bắt buộc"),
	slug: z.string().min(1, "Slug là bắt buộc").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
	description: z.string().min(1, "Mô tả ngắn là bắt buộc"),
	thumbnail_url: z.string().min(1, "Vui lòng upload ảnh thumbnail"),
	content: z.string().min(1, "Nội dung là bắt buộc"),
	date: z.string().min(1, "Ngày diễn ra là bắt buộc"),
	category: z.enum(["su-kien", "kien-thuc"], {
		error: "Chọn danh mục hợp lệ",
	}),
});

export type EventFormValues = z.infer<typeof eventSchema>;
