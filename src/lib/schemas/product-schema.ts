import { z } from "zod";

export const CATEGORIES = ["wine", "whisky", "spirits", "combo", "gift"] as const;
export type Category = (typeof CATEGORIES)[number];

export const WINE_TYPES = ["red", "white", "rose", "sparkling", "champagne", "sweet"] as const;
export type WineType = (typeof WINE_TYPES)[number];

export const WINE_TYPE_LABELS: Record<WineType, string> = {
	red:        "Vang đỏ",
	white:      "Vang trắng",
	rose:       "Vang hồng",
	sparkling:  "Vang nổ",
	champagne:  "Champagne",
	sweet:      "Vang ngọt",
};

export const productSchema = z.object({
	id: z.string().min(1, "ID là bắt buộc"),
	name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
	description: z.string().min(1, "Mô tả là bắt buộc"),
	thumbnail_url: z.string().min(1, "Vui lòng upload ảnh sản phẩm"),
	content: z.string().min(1, "Nội dung chi tiết là bắt buộc"),
	price: z.number().min(0, "Giá phải ≥ 0"),
	discount_percentage: z.number().min(0, "Tối thiểu 0%").max(100, "Tối đa 100%"),
	category: z.enum(CATEGORIES, { error: "Chọn danh mục hợp lệ" }),
	wine_type: z.string().optional().nullable(),
	stock: z.number().int("Phải là số nguyên").min(0, "Kho phải ≥ 0"),
	is_hot: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
