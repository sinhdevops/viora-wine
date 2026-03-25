import { z } from "zod";

export const heroBannerSchema = z.object({
	image_url: z.string().min(1, "Vui lòng upload ảnh banner"),
	is_active: z.boolean().default(false),
});

export type HeroBannerFormValues = z.infer<typeof heroBannerSchema>;
