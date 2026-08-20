import { createFileRoute } from "@tanstack/react-router";

/**
 * Public read-only proxy for the private `media` storage bucket.
 *
 * Uploaded assets are served through this route so files can be cached
 * aggressively at the edge while writes stay restricted to administrators.
 */
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const raw = (params as { _splat?: string })._splat ?? "";
        const path = decodeURIComponent(raw);

        // Reject traversal and absolute paths.
        if (!path || path.includes("..") || path.startsWith("/")) {
          return new Response("Not found", { status: 404 });
        }

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.storage.from("media").download(path);
          if (error || !data) return new Response("Not found", { status: 404 });

          return new Response(await data.arrayBuffer(), {
            status: 200,
            headers: {
              "content-type": data.type || "application/octet-stream",
              "cache-control": "public, max-age=31536000, immutable",
            },
          });
        } catch (error) {
          console.error("[media] download failed", error);
          return new Response("Unavailable", { status: 503 });
        }
      },
    },
  },
});
