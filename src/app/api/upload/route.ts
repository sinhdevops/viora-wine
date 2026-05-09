import { requireAuth } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
	const { error } = await requireAuth();
	if (error) return error;

	const formData = await request.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ error: "No file provided" }, { status: 400 });
	}

	if (!file.type.startsWith("image/")) {
		return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
	}

	if (file.size > 10 * 1024 * 1024) {
		return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
	}

	const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
	const apiKey = process.env.CLOUDINARY_API_KEY!;
	const apiSecret = process.env.CLOUDINARY_API_SECRET!;

	const timestamp = Math.round(Date.now() / 1000);
	const signature = crypto
		.createHash("sha1")
		.update(`timestamp=${timestamp}${apiSecret}`)
		.digest("hex");

	const uploadData = new FormData();
	uploadData.append("file", file);
	uploadData.append("api_key", apiKey);
	uploadData.append("timestamp", String(timestamp));
	uploadData.append("signature", signature);

	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
		{ method: "POST", body: uploadData },
	);

	const data = await res.json();

	if (!res.ok) {
		return NextResponse.json(
			{ error: data.error?.message || "Upload failed" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ url: data.secure_url });
}