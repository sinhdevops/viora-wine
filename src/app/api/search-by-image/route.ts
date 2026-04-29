import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get("image") as File | null;

		if (!file) {
			return NextResponse.json({ error: "No image provided" }, { status: 400 });
		}

		if (!file.type.startsWith("image/")) {
			return NextResponse.json({ error: "File must be an image" }, { status: 400 });
		}

		if (file.size > 5 * 1024 * 1024) {
			return NextResponse.json({ error: "Image too large (max 5MB)" }, { status: 400 });
		}

		const arrayBuffer = await file.arrayBuffer();
		const base64 = Buffer.from(arrayBuffer).toString("base64");

		const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

		const result = await model.generateContent([
			{
				inlineData: {
					mimeType: file.type,
					data: base64,
				},
			},
			`Bạn là chuyên gia nhận diện rượu vang và đồ uống có cồn. Hãy nhìn vào hình ảnh này và trả về ĐÚNG MỘT chuỗi tìm kiếm ngắn gọn (tối đa 5 từ) để tìm sản phẩm trong kho hàng rượu.

Ưu tiên theo thứ tự:
1. Tên thương hiệu/nhãn hiệu cụ thể (ví dụ: "Jacob's Creek", "Penfolds", "Johnnie Walker")
2. Nếu không rõ thương hiệu: loại rượu + đặc điểm nổi bật (ví dụ: "vang đỏ Pháp", "whisky Scotland")
3. Nếu không phải rượu: trả về chuỗi rỗng ""

Chỉ trả về chuỗi tìm kiếm, không giải thích thêm.`,
		]);

		const query = result.response.text().trim();

		return NextResponse.json({ query });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error("[search-by-image]", msg);
		return NextResponse.json({ error: msg }, { status: 500 });
	}
}
