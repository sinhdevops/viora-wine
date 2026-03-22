import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const EVENT_FIELDS =
  "id, slug, name, description, content, thumbnail_url, date, category, read_time, author, featured, created_at";

// GET /api/events
// Query params: ?category=su-kien|kien-thuc  ?featured=true  ?limit=10  ?page=1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
    const page = Math.max(parseInt(searchParams.get("page") ?? "1"), 1);
    const offset = (page - 1) * limit;

    const supabase = await createClient();
    let query = supabase
      .from("events")
      .select(EVENT_FIELDS, { count: "exact" })
      .order("date", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) query = query.eq("category", category);
    if (featured === "true") query = query.eq("featured", true);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      meta: { total: count ?? 0, page, limit },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("events")
      .insert(body)
      .select(EVENT_FIELDS)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
