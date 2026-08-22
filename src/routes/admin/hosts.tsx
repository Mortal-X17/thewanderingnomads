import { createFileRoute } from "@tanstack/react-router";

import { CollectionManager } from "@/components/admin/CollectionManager";

export const Route = createFileRoute("/admin/hosts")({
  component: HostsAdmin,
});

function HostsAdmin() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Hosts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Trip leaders who run expeditions. Krish is Host #1 — but the company is not tied to any
          single person. Drafts stay hidden from the website.
        </p>
      </header>

      <CollectionManager
        config={{
          table: "hosts",
          title: "Hosts",
          labelKey: "name",
          subtitleKey: "home_location",
          orderable: true,
          statusKey: "status",
          duplicable: true,
          searchKeys: ["name", "slug", "home_location"],
          emptyLabel: "No hosts yet — add your first trip leader.",
          defaults: { status: "draft" },
          fields: [
            { key: "name", label: "Name", type: "text", required: true },
            {
              key: "slug",
              label: "URL slug",
              type: "text",
              required: true,
              help: "Lowercase words separated by hyphens, e.g. krish.",
            },
            { key: "photo_url", label: "Profile photo", type: "image" },
            {
              key: "home_location",
              label: "Home / base",
              type: "text",
              placeholder: "Jaipur, Rajasthan",
            },
            { key: "years_active", label: "Years active", type: "number", min: 0 },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "draft", label: "Draft (hidden)" },
                { value: "published", label: "Published (live)" },
              ],
            },
            { key: "short_bio", label: "Short bio", type: "rich-text", rows: 3 },
            { key: "bio", label: "Full bio", type: "rich-text", rows: 8 },
            { key: "languages", label: "Languages", type: "tags" },
            { key: "specializations", label: "Specializations", type: "tags" },
            { key: "certifications", label: "Certifications", type: "tags" },
            { key: "instagram_url", label: "Instagram", type: "url" },
            { key: "youtube_url", label: "YouTube", type: "url" },
            { key: "linkedin_url", label: "LinkedIn", type: "url" },
          ],
        }}
      />
    </div>
  );
}
