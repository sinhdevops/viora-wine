import { z } from "zod";

export const CATEGORIES = ["wine", "whisky", "spirits", "combo", "gift"] as const;
export const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
	wine: "Rượu vang",
	whisky: "Whisky",
	spirits: "Rượu mạnh",
	combo: "Combo",
	gift: "Quà tặng",
};

export const WINE_TYPES = ["red", "white", "rose", "sparkling", "champagne", "sweet"] as const;
type WineType = (typeof WINE_TYPES)[number];

export const WINE_TYPE_LABELS: Record<WineType, string> = {
	red:        "Vang đỏ",
	white:      "Vang trắng",
	rose:       "Vang hồng",
	sparkling:  "Vang nổ",
	champagne:  "Champagne",
	sweet:      "Vang ngọt",
};

export const GRAPE_VARIETIES = [
	"Cabernet Sauvignon", "Merlot", "Shiraz", "Pinot Noir", 
	"Chardonnay", "Sauvignon Blanc", "Riesling", "Malbec",
	"Tempranillo", "Syrah", "Sangiovese", "Nebbiolo"
] as const;

export const COUNTRIES = [
	"Pháp", "Ý", "Úc", "Chile", "Tây Ban Nha", "Mỹ", "Nhật Bản", "Scotland", "Việt Nam"
] as const;

export const PRODUCERS = [
	"Premium Australian Wine PTY LTD",
	"Château Margaux",
	"Penfolds",
	"Suntory",
	"Macallan",
	"Hennessy",
	"Robert Mondavi",
	"Baron Philippe de Rothschild",
	"Sassicaia"
] as const;

export const productSchema = z.object({
	id: z.string().min(1, "ID là bắt buộc"),
	slug: z.string().min(1, "Slug là bắt buộc"),
	name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
	description: z.string().min(1, "Mô tả là bắt buộc"),
	thumbnail_url: z.string().min(1, "Vui lòng upload ảnh sản phẩm"),
	content: z.string().min(1, "Nội dung chi tiết là bắt buộc"),
	price: z.number().min(0, "Giá phải ≥ 0"),
	discount_percentage: z.number().min(0, "Tối thiểu 0%").max(100, "Tối đa 100%"),
	category: z.enum(CATEGORIES, { error: "Chọn danh mục hợp lệ" }),
	wine_type: z.string().optional().nullable(),
	volume: z.string().optional().nullable(),
	grape_variety: z.string().optional().nullable(),
	producer: z.string().optional().nullable(),
	alcohol: z.string().optional().nullable(),
	country: z.string().optional().nullable(),
	stock: z.number().int("Phải là số nguyên").min(0, "Kho phải ≥ 0"),
	is_hot: z.boolean(),
	seo_title: z.string().optional().nullable(),
	seo_description: z.string().optional().nullable(),
	rating: z.number().min(1, "Tối thiểu 1.0").max(5, "Tối đa 5.0").default(5.0).optional(),
	sold_count: z.number().int("Phải là số nguyên").min(0, "Phải ≥ 0").default(0).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
