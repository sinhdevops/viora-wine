import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const EVENT_FIELDS =
  "id, slug, name, description, content, thumbnail_url, date, category, read_time, author, featured, created_at";

interface Params {
  params: Promise<{ slug: string }>;
}

// GET /api/events/[slug]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("events")
      .select(EVENT_FIELDS)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/events/[slug]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("events")
      .update(body)
      .eq("slug", slug)
      .select(EVENT_FIELDS)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/events/[slug]
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("slug", slug);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
