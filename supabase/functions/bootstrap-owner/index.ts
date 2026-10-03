import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.117.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) return json({ error: "Server configuration error" }, 500);

  const admin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { count, error: ownerCountError } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "owner")
    .eq("is_active", true);

  if (ownerCountError) return json({ error: ownerCountError.message }, 500);
  if ((count || 0) > 0) return json({ error: "Owner bootstrap is already completed" }, 409);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const token = String(body?.bootstrapToken || "");
  const email = String(body?.email || "").trim().toLowerCase();
  const name = String(body?.name || "").trim();
  const password = String(body?.password || "");

  if (!token || !email || !name || password.length < 10) {
    return json({ error: "Invalid bootstrap data" }, 400);
  }

  const providedHash = await sha256(token);

  const { data: bootstrapRow, error: tokenError } = await admin
    .from("owner_bootstrap_tokens")
    .select("token_hash, consumed_at")
    .eq("token_hash", providedHash)
    .is("consumed_at", null)
    .maybeSingle();

  if (tokenError) return json({ error: tokenError.message }, 500);
  if (!bootstrapRow) return json({ error: "Invalid or consumed bootstrap token" }, 403);

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (createError || !created.user) {
    return json({ error: createError?.message || "Could not create owner" }, 400);
  }

  const { error: profileError } = await admin.from("profiles").upsert({
    id: created.user.id,
    name,
    email,
    role: "owner",
    is_active: true,
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return json({ error: profileError.message }, 500);
  }

  const { error: consumeError } = await admin
    .from("owner_bootstrap_tokens")
    .update({ consumed_at: new Date().toISOString() })
    .eq("token_hash", providedHash)
    .is("consumed_at", null);

  if (consumeError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return json({ error: consumeError.message }, 500);
  }

  return json({ success: true });
});
