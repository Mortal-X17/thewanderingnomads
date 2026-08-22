import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { listRows } from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

const COUNTS = [
  { table: "journeys", label: "Trips", to: "/admin/journeys" },
  { table: "trip_batches", label: "Trip batches", to: "/admin/batches" },
  { table: "hosts", label: "Hosts", to: "/admin/hosts" },
  { table: "atlas_regions", label: "Atlas regions", to: "/admin/atlas" },
  { table: "gallery_images", label: "Gallery images", to: "/admin/gallery" },
  { table: "testimonials", label: "Testimonials", to: "/admin/pages" },
  { table: "milestones", label: "Milestones", to: "/admin/pages" },
  { table: "media", label: "Media files", to: "/admin/media" },
] as const;

function AdminOverview() {
  const stats = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const entries = await Promise.all(
        COUNTS.map(async (item) => {
          const rows = await listRows(item.table, "created_at").catch(() => []);
          return [item.table, rows.length] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<string, number>;
    },
  });

  const activity = useQuery({
    queryKey: ["admin", "audit_log"],
    queryFn: async () => {
      const rows = await listRows("audit_log", "created_at");
      return rows.slice(-12).reverse() as Record<string, string>[];
    },
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-3xl">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you publish here appears on the live website immediately.
          </p>
        </div>
        <Button variant="secondary" asChild>
          <a href="/" target="_blank" rel="noreferrer">
            View website <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTS.map((item) => (
          <Link key={item.label} to={item.to as never} className="block">
            <Card className="transition hover:border-foreground/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="display text-3xl tabular-nums">{stats.data?.[item.table] ?? "—"}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-lg font-medium">Recent changes</h2>
        {activity.data && activity.data.length > 0 ? (
          <ul className="mt-3 divide-y divide-border rounded-lg border border-border text-sm">
            {activity.data.map((row) => (
              <li key={row["id"]} className="flex flex-wrap justify-between gap-2 px-4 py-2.5">
                <span>
                  <span className="font-medium capitalize">{row["action"]}</span>{" "}
                  <span className="text-muted-foreground">
                    {String(row["entity"] ?? "").replace(/_/g, " ")}
                    {row["summary"] ? ` — ${row["summary"]}` : ""}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {row["created_at"] ? new Date(row["created_at"]).toLocaleString() : ""}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No changes recorded yet.</p>
        )}
      </section>
    </div>
  );
}
