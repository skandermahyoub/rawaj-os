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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) return json({ error: "Server configuration error" }, 500);

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user: caller },
    error: callerError,
  } = await admin.auth.getUser(token);

  if (callerError || !caller) return json({ error: "Unauthorized" }, 401);

  const { data: callerProfile, error: profileError } = await admin
    .from("profiles")
    .select("id, role, is_active")
    .eq("id", caller.id)
    .single();

  if (profileError || !callerProfile || !callerProfile.is_active || callerProfile.role !== "owner") {
    return json({ error: "Owner permission required" }, 403);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (body?.action === "invite") {
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const role = String(body.role || "sales");
    const allowedRoles = ["owner", "admin", "editor", "sales", "designer"];

    if (!email || !name || !allowedRoles.includes(role)) {
      return json({ error: "Invalid user data" }, 400);
    }

    const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { name },
    });

    if (inviteError || !inviteData.user) {
      return json({ error: inviteError?.message || "Could not invite user" }, 400);
    }

    const { error: upsertError } = await admin.from("profiles").upsert({
      id: inviteData.user.id,
      name,
      email,
      phone: phone || null,
      role,
      is_active: true,
      updated_at: new Date().toISOString(),
    });

    if (upsertError) {
      await admin.auth.admin.deleteUser(inviteData.user.id);
      return json({ error: upsertError.message }, 500);
    }

    return json({
      user: {
        id: inviteData.user.id,
        name,
        email,
        phone: phone || undefined,
        role,
        createdAt: inviteData.user.created_at,
        isOwnerProtected: role === "owner",
      },
    });
  }

  if (body?.action === "delete") {
    const userId = String(body.userId || "").trim();
    if (!userId) return json({ error: "Missing userId" }, 400);
    if (userId === caller.id) return json({ error: "You cannot delete your own account" }, 400);

    const { data: target, error: targetError } = await admin
      .from("profiles")
      .select("id, role")
      .eq("id", userId)
      .single();

    if (targetError || !target) return json({ error: "User not found" }, 404);

    if (target.role === "owner") {
      const { count, error: countError } = await admin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "owner")
        .eq("is_active", true);

      if (countError) return json({ error: countError.message }, 500);
      if ((count || 0) <= 1) return json({ error: "At least one owner must remain" }, 400);
    }

    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
    if (deleteError) return json({ error: deleteError.message }, 400);

    return json({ success: true });
  }

  return json({ error: "Unsupported action" }, 400);
});
