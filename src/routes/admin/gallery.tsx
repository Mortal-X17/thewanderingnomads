import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { CollectionManager } from "@/components/admin/CollectionManager";
import { listRows } from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const { data: regions = [] } = useQuery({
    queryKey: ["admin", "atlas_regions"],
    queryFn: () => listRows("atlas_regions", "sort_order"),
  });
  const { data: journeys = [] } = useQuery({
    queryKey: ["admin", "journeys"],
    queryFn: () => listRows("journeys", "sort_order"),
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Photographs shown on the homepage, Gallery page and inside Atlas regions.
        </p>
      </header>

      <CollectionManager
        config={{
          table: "gallery_images",
          title: "Photographs",
          labelKey: "caption",
          subtitleKey: "location",
          orderable: true,
          searchKeys: ["caption", "location", "album"],
          emptyLabel: "No photographs yet — upload your first image.",
          fields: [
            { key: "url", label: "Image", type: "image", required: true },
            { key: "caption", label: "Caption", type: "text" },
            {
              key: "alt_text",
              label: "Alt text",
              type: "text",
              help: "Describes the photo for screen readers and search engines.",
            },
            { key: "location", label: "Location", type: "text" },
            { key: "album", label: "Album", type: "text", help: "Group photos, e.g. Himalaya." },
            {
              key: "region_id",
              label: "Atlas region",
              type: "select",
              options: [
                { value: "", label: "None" },
                ...regions.map((region) => ({
                  value: String(region["id"]),
                  label: String(region["name"] ?? ""),
                })),
              ],
            },
            {
              key: "journey_id",
              label: "Journey",
              type: "select",
              options: [
                { value: "", label: "None" },
                ...journeys.map((journey) => ({
                  value: String(journey["id"]),
                  label: String(journey["title"] ?? ""),
                })),
              ],
            },
          ],
        }}
      />
    </div>
  );
}
