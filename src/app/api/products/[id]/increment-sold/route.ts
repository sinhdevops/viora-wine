import { checkRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

/**
 * POST /api/products/[id]/increment-sold
 * Atomically increments sold_count by 1 for the given product.
 * Called fire-and-forget when a customer clicks the Zalo button.
 *
 * Requires this Supabase function (run once in SQL editor):
 *   CREATE OR REPLACE FUNCTION increment_sold_count(product_id TEXT)
 *   RETURNS void LANGUAGE plpgsql AS $$
 *   BEGIN
 *     UPDATE products SET sold_count = sold_count + 1 WHERE id = product_id;
 *   END;
 *   $$;
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return Response.json({ ok: false }, { status: 400 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Max 3 increments per product per IP per 10 minutes
  if (!checkRateLimit(`increment-sold:${ip}:${id}`, 3, 10 * 60_000)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const supabase = await createClient();
  await supabase.rpc('increment_sold_count', { product_id: id });

  // Always return 200 — this is fire-and-forget, client does not wait
  return Response.json({ ok: true });
}
