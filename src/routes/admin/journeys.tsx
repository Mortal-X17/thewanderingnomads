import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { listRows } from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/journeys")({
  component: JourneysAdmin,
});

function JourneysAdmin() {
  const [journeyId, setJourneyId] = useState("");
  const { data: journeys = [] } = useQuery({
    queryKey: ["admin", "journeys"],
    queryFn: () => listRows("journeys", "sort_order"),
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="display text-3xl">Journeys</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Expeditions shown on the homepage and the Journeys page. Drafts stay hidden.
        </p>
      </header>

      <CollectionManager
        config={{
          table: "journeys",
          title: "Expeditions",
          labelKey: "title",
          subtitleKey: "destination",
          orderable: true,
          statusKey: "status",
          duplicable: true,
          searchKeys: ["title", "destination", "slug"],
          emptyLabel: "No journeys yet — add your first expedition.",
          defaults: { status: "draft", is_available: true },
          fields: [
            { key: "title", label: "Title", type: "text", required: true },
            {
              key: "slug",
              label: "URL slug",
              type: "text",
              required: true,
              help: "Lowercase words separated by hyphens, e.g. kashmir-winter.",
            },
            { key: "destination", label: "Destination", type: "text", required: true },
            { key: "duration", label: "Duration", type: "text", placeholder: "7 days" },
            { key: "price", label: "Price", type: "text", placeholder: "₹24,500" },
            { key: "difficulty", label: "Difficulty", type: "text" },
            { key: "best_season", label: "Best season", type: "text" },
            { key: "is_available", label: "Currently available", type: "boolean" },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "draft", label: "Draft (hidden)" },
                { value: "published", label: "Published (live)" },
              ],
            },
            { key: "hero_image_url", label: "Hero image", type: "image" },
            { key: "short_description", label: "Short description", type: "rich-text", rows: 3 },
            { key: "long_description", label: "Full description", type: "rich-text", rows: 8 },
            { key: "highlights", label: "Highlights", type: "tags" },
            { key: "travel_info", label: "Travel information", type: "rich-text", rows: 4 },
            { key: "notes", label: "Notes", type: "rich-text", rows: 3 },
            { key: "cta_label", label: "Button label", type: "text" },
            { key: "booking_url", label: "Booking link", type: "url" },
          ],
        }}
      />

      <section className="space-y-4">
        <div className="max-w-xs space-y-1.5">
          <Label className="text-xs font-medium">Gallery for journey</Label>
          <Select value={journeyId} onValueChange={setJourneyId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a journey…" />
            </SelectTrigger>
            <SelectContent>
              {journeys.map((journey) => (
                <SelectItem key={String(journey["id"])} value={String(journey["id"])}>
                  {String(journey["title"] ?? "Untitled")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {journeyId ? (
          <CollectionManager
            config={{
              table: "journey_images",
              title: "Journey images",
              labelKey: "caption",
              subtitleKey: "url",
              orderable: true,
              scope: { journey_id: journeyId },
              filter: (row) => row["journey_id"] === journeyId,
              emptyLabel: "No images for this journey yet.",
              fields: [
                { key: "url", label: "Image", type: "image", required: true },
                { key: "caption", label: "Caption", type: "text" },
                { key: "alt_text", label: "Alt text", type: "text", help: "Describes the photo for screen readers." },
              ],
            }}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a journey above to manage its photo gallery.
          </p>
        )}
      </section>
    </div>
  );
}
