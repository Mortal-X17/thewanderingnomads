import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  Compass,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Map,
  Mountain,
  Palette,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { signOutAdmin, useAdminSession } from "@/lib/cms/admin";

export const Route = createFileRoute("/admin")({
  // The dashboard is a private, session-driven surface: the browser holds the
  // session, so there is nothing for the server to render.
  ssr: false,
  head: () => ({
    meta: [
      { title: "Studio — The Wandering Nomads" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

type NavItem = { to: string; label: string; icon: typeof Compass; exact?: boolean };

const NAV: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/site", label: "Site & SEO", icon: Settings },
  { to: "/admin/design", label: "Design", icon: Palette },
  { to: "/admin/pages", label: "Pages & story", icon: Sparkles },
  { to: "/admin/journeys", label: "Trips", icon: Mountain },
  { to: "/admin/batches", label: "Trip Batches", icon: CalendarDays },
  { to: "/admin/hosts", label: "Hosts", icon: Users },
  { to: "/admin/atlas", label: "Travel Atlas", icon: Map },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/media", label: "Media", icon: Compass },
];

function AdminLayout() {
  const { session, isAdmin, adminExists, loading } = useAdminSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading studio…
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <>
        <AdminAuth adminExists={adminExists} signedIn={Boolean(session)} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="mb-4">
            <p className="eyebrow">Studio</p>
            <h1 className="display text-2xl">The Wandering Nomads</h1>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {NAV.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to as never}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 hidden lg:block">
            <p className="truncate px-3 text-xs text-muted-foreground">{session.user.email}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 w-full justify-start"
              onClick={() => void signOutAdmin()}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-16">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
