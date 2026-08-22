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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { listRows } from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/atlas")({
  component: AtlasAdmin,
});

function AtlasAdmin() {
  const [regionId, setRegionId] = useState("");
  const { data: regions = [] } = useQuery({
    queryKey: ["admin", "atlas_regions"],
    queryFn: () => listRows("atlas_regions", "sort_order"),
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Travel Atlas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark regions as explored and write their stories. Map shapes stay fixed.
        </p>
      </header>

      <CollectionManager
        config={{
          table: "atlas_regions",
          title: "Regions",
          description: "States and countries shown on the interactive map.",
          labelKey: "name",
          subtitleKey: "code",
          orderable: true,
          searchKeys: ["name", "code"],
          emptyLabel: "No regions yet.",
          fields: [
            { key: "name", label: "Name", type: "text", required: true },
            {
              key: "code",
              label: "Map code",
              type: "text",
              required: true,
              help: "Must match the map, e.g. HP for Himachal Pradesh.",
            },
            {
              key: "kind",
              label: "Type",
              type: "select",
              options: [
                { value: "state", label: "State" },
                { value: "country", label: "Country" },
              ],
            },
            { key: "visited", label: "Explored", type: "boolean" },
            { key: "visited_year", label: "Year explored", type: "number", min: 1990, max: 2100 },
            { key: "cover_image_url", label: "Cover image", type: "image" },
            { key: "overview", label: "Overview", type: "rich-text", rows: 4 },
            { key: "journal", label: "Travel journal", type: "rich-text", rows: 8 },
            { key: "favorite_memory", label: "Favourite memory", type: "rich-text", rows: 3 },
            { key: "culture", label: "Culture & people", type: "rich-text", rows: 4 },
            { key: "founder_note", label: "Founder note", type: "rich-text", rows: 3 },
            { key: "food", label: "Food to try", type: "tags" },
            { key: "tips", label: "Travel tips", type: "tags" },
            { key: "hidden_gems", label: "Hidden gems", type: "tags" },
          ],
        }}
      />

      <section className="space-y-4">
        <div className="max-w-xs space-y-1.5">
          <Label className="text-xs font-medium">Region details for</Label>
          <Select value={regionId} onValueChange={setRegionId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a region…" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={String(region["id"])} value={String(region["id"])}>
                  {String(region["name"] ?? "Untitled")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {regionId ? (
          <Tabs defaultValue="destinations">
            <TabsList>
              <TabsTrigger value="destinations">Cities & places</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
            </TabsList>
            <TabsContent value="destinations" className="pt-6">
              <CollectionManager
                config={{
                  table: "atlas_destinations",
                  title: "Cities & places",
                  labelKey: "name",
                  subtitleKey: "kind",
                  orderable: true,
                  scope: { region_id: regionId },
                  filter: (row) => row["region_id"] === regionId,
                  emptyLabel: "No cities or places for this region yet.",
                  fields: [
                    { key: "name", label: "Name", type: "text", required: true },
                    {
                      key: "kind",
                      label: "Type",
                      type: "select",
                      options: [
                        { value: "city", label: "City" },
                        { value: "temple", label: "Temple" },
                        { value: "trek", label: "Trek" },
                        { value: "viewpoint", label: "Viewpoint" },
                        { value: "cafe", label: "Café" },
                        { value: "village", label: "Village" },
                        { value: "monument", label: "Monument" },
                        { value: "beach", label: "Beach" },
                        { value: "market", label: "Market" },
                        { value: "other", label: "Other" },
                      ],
                    },
                    { key: "summary", label: "Summary", type: "rich-text", rows: 4 },
                    { key: "tips", label: "Tips", type: "tags" },
                  ],
                }}
              />
            </TabsContent>
            <TabsContent value="stories" className="pt-6">
              <CollectionManager
                config={{
                  table: "atlas_stories",
                  title: "Stories",
                  labelKey: "title",
                  subtitleKey: "story_date",
                  orderable: true,
                  scope: { region_id: regionId },
                  filter: (row) => row["region_id"] === regionId,
                  emptyLabel: "No stories for this region yet.",
                  fields: [
                    { key: "title", label: "Title", type: "text", required: true },
                    { key: "story_date", label: "Date", type: "text", placeholder: "2025-11-02" },
                    { key: "narrative", label: "Narrative", type: "rich-text", rows: 10 },
                  ],
                }}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a region above to manage its cities, places and stories.
          </p>
        )}
      </section>
    </div>
  );
}
