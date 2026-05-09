import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/** Returns the authenticated user, or a 401 NextResponse if not logged in. */
export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { user, error: null };
}
