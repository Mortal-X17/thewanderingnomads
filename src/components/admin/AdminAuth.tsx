import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { claimOwner, signInAdmin, signUpOwner } from "@/lib/cms/admin";

/**
 * Inline sign-in for the dashboard. Owner registration is only offered while
 * no administrator exists; the database enforces that rule too.
 */
export function AdminAuth({
  adminExists,
  signedIn,
}: {
  adminExists: boolean | null;
  signedIn: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const showSetup = adminExists === false;

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    try {
      await action();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const submit = () =>
    run(async () => {
      if (showSetup) {
        const { error } = await signUpOwner(email, password);
        if (error) throw error;
        const { error: claimError } = await claimOwner();
        if (claimError) throw claimError;
        toast.success("Owner account created");
        return;
      }
      const { error } = await signInAdmin(email, password);
      if (error) throw error;
      toast.success("Welcome back");
    });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <p className="eyebrow">Studio</p>
        </div>
        <h1 className="display mt-3 text-3xl">
          {showSetup ? "Create owner account" : "Sign in"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {signedIn
            ? "This account doesn't have dashboard access. Sign in with the owner account."
            : showSetup
              ? "This is a one-time setup for the website owner."
              : "Manage the website content for The Wandering Nomads."}
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete={showSetup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {showSetup ? "Create account" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
