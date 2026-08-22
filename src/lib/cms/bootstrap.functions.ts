import { createServerFn } from "@tanstack/react-start";

/**
 * One-time owner bootstrap.
 *
 * Runs only while no administrator exists (checked server-side with the
 * service role). It creates — or repairs, if a half-finished signup left an
 * unconfirmed account — the owner login and grants the admin role, so the
 * setup flow never depends on confirmation email delivery.
 */
export const bootstrapOwner = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => {
    const email = String(data?.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(data?.password ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    return { email, password };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existingAdmin, error: roleCheckError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .limit(1);
    if (roleCheckError) throw new Error(roleCheckError.message);
    if (existingAdmin && existingAdmin.length > 0) {
      throw new Error("An administrator already exists. Please sign in instead.");
    }

    // Find an existing (possibly unconfirmed) account for this email.
    const { data: list, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listError) throw new Error(listError.message);
    const existing = list.users.find((u) => u.email?.toLowerCase() === data.email);

    let userId: string;
    if (existing) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(existing.id, {
        password: data.password,
        email_confirm: true,
      });
      if (error) throw new Error(error.message);
      userId = existing.id;
    } else {
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
      });
      if (error || !created.user)
        throw new Error(error?.message ?? "Could not create the owner account.");
      userId = created.user.id;
    }

    await supabaseAdmin
      .from("profiles")
      .upsert({ id: userId, email: data.email }, { onConflict: "id" });

    const { error: grantError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
    if (grantError) throw new Error(grantError.message);

    await supabaseAdmin.from("audit_log").insert({
      user_id: userId,
      actor_email: data.email,
      entity: "user_roles",
      action: "create",
      summary: "Owner account bootstrapped",
    });

    return { ok: true as const };
  });
