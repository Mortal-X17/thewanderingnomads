import { createFileRoute } from "@tanstack/react-router";

import { SingletonEditor, type SingletonGroup } from "@/components/admin/SingletonEditor";
import { CollectionManager } from "@/components/admin/CollectionManager";

export const Route = createFileRoute("/admin/site")({
  component: SitePage,
});

const GROUPS: SingletonGroup[] = [
  {
    title: "Identity",
    description: "Brand name, tagline and the logo used across the site.",
    fields: [
      { key: "site_title", label: "Site title", type: "text", required: true },
      { key: "site_description", label: "Tagline", type: "text" },
      { key: "logo_url", label: "Logo", type: "image" },
      { key: "favicon_url", label: "Favicon", type: "image" },
      { key: "footer_copyright", label: "Footer copyright", type: "text" },
    ],
  },
  {
    title: "Search & sharing",
    description: "How the website appears on Google and when links are shared.",
    fields: [
      { key: "seo_title", label: "SEO title", type: "text", help: "Best under 60 characters." },
      {
        key: "seo_description",
        label: "SEO description",
        type: "textarea",
        rows: 3,
        help: "Best under 160 characters.",
      },
      { key: "keywords", label: "Keywords", type: "text", help: "Comma separated." },
      { key: "og_image_url", label: "Share image", type: "image" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "contact_email", label: "Email", type: "text" },
      { key: "contact_phone", label: "Phone / WhatsApp", type: "text" },
    ],
  },
  {
    title: "Launch",
    description: "Controls the pre-launch countdown experience shown to visitors.",
    fields: [
      {
        key: "launch_status",
        label: "Website status",
        type: "select",
        options: [
          { value: "pre_launch", label: "Pre-launch — show countdown" },
          { value: "live", label: "Live — show the full website" },
        ],
      },
      {
        key: "launch_at",
        label: "Launch date & time",
        type: "text",
        help: "Format: 2026-08-25T00:00:00+05:30",
      },
      { key: "timezone", label: "Timezone label", type: "text" },
    ],
  },
];

function SitePage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="display text-3xl">Site & SEO</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Global settings, metadata and the launch countdown.
        </p>
      </header>

      <SingletonEditor table="site_settings" groups={GROUPS} />

      <CollectionManager
        config={{
          table: "social_links",
          title: "Social links",
          description: "Shown in the footer, contact section and Instagram cards.",
          labelKey: "label",
          subtitleKey: "url",
          orderable: true,
          searchKeys: ["label", "platform", "handle"],
          emptyLabel: "No social links yet.",
          fields: [
            {
              key: "platform",
              label: "Platform",
              type: "select",
              required: true,
              options: [
                { value: "instagram", label: "Instagram" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "youtube", label: "YouTube" },
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone" },
                { value: "other", label: "Other" },
              ],
            },
            { key: "label", label: "Label", type: "text", required: true },
            { key: "handle", label: "Handle", type: "text", placeholder: "@wanderwithkrishh" },
            { key: "url", label: "Link", type: "url", required: true },
          ],
        }}
      />
    </div>
  );
}
