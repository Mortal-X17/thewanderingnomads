import { createFileRoute } from "@tanstack/react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingletonEditor, type SingletonGroup } from "@/components/admin/SingletonEditor";
import { CollectionManager } from "@/components/admin/CollectionManager";

export const Route = createFileRoute("/admin/pages")({
  component: PagesAdmin,
});

const ABOUT_GROUPS: SingletonGroup[] = [
  {
    title: "Founder",
    description: "Krish's story as shown on the About page and homepage.",
    fields: [
      { key: "founder_name", label: "Name", type: "text", required: true },
      { key: "founder_title", label: "Title", type: "text" },
      { key: "secondary_identity", label: "Secondary identity", type: "text" },
      { key: "founder_image_url", label: "Portrait", type: "image" },
      { key: "biography", label: "Biography", type: "textarea", rows: 8 },
      { key: "achievements", label: "Achievements", type: "tags" },
      { key: "certifications", label: "Certifications", type: "tags" },
      { key: "cta_label", label: "Button label", type: "text" },
      { key: "cta_href", label: "Button link", type: "url" },
    ],
  },
];

function PagesAdmin() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="display text-3xl">Pages & story</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Headings, copy and the storytelling blocks across the website.
        </p>
      </header>

      <Tabs defaultValue="sections">
        <TabsList className="flex-wrap">
          <TabsTrigger value="sections">Section copy</TabsTrigger>
          <TabsTrigger value="about">About / founder</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="pt-6">
          <CollectionManager
            config={{
              table: "page_sections",
              title: "Section copy",
              description:
                "Every headline, subtitle and button on the homepage and inner pages.",
              labelKey: "heading",
              subtitleKey: "section_key",
              orderable: true,
              searchKeys: ["heading", "section_key", "page"],
              emptyLabel: "No sections yet.",
              fields: [
                {
                  key: "page",
                  label: "Page",
                  type: "select",
                  required: true,
                  options: [
                    { value: "home", label: "Home" },
                    { value: "about", label: "About" },
                    { value: "journeys", label: "Journeys" },
                    { value: "atlas", label: "Travel Atlas" },
                    { value: "gallery", label: "Gallery" },
                    { value: "contact", label: "Contact" },
                    { value: "launch", label: "Launch countdown" },
                  ],
                },
                {
                  key: "section_key",
                  label: "Section key",
                  type: "text",
                  required: true,
                  help: "Identifies where this copy appears, e.g. hero.",
                },
                { key: "heading", label: "Heading", type: "text" },
                { key: "subtitle", label: "Subtitle / eyebrow", type: "text" },
                { key: "description", label: "Description", type: "textarea", rows: 5 },
                { key: "cta_label", label: "Primary button label", type: "text" },
                { key: "cta_href", label: "Primary button link", type: "url" },
                { key: "secondary_cta_label", label: "Secondary button label", type: "text" },
                { key: "secondary_cta_href", label: "Secondary button link", type: "url" },
                { key: "image_url", label: "Image", type: "image" },
              ],
            }}
          />
        </TabsContent>

        <TabsContent value="about" className="pt-6">
          <SingletonEditor table="about_content" groups={ABOUT_GROUPS} />
        </TabsContent>

        <TabsContent value="milestones" className="pt-6">
          <CollectionManager
            config={{
              table: "milestones",
              title: "Journey milestones",
              description: "The timeline of Krish's expedition story.",
              labelKey: "title",
              subtitleKey: "year",
              orderable: true,
              searchKeys: ["title", "year"],
              emptyLabel: "No milestones yet.",
              fields: [
                { key: "year", label: "Year", type: "text" },
                { key: "title", label: "Title", type: "text", required: true },
                { key: "description", label: "Description", type: "textarea", rows: 4 },
              ],
            }}
          />
        </TabsContent>

        <TabsContent value="testimonials" className="pt-6">
          <CollectionManager
            config={{
              table: "testimonials",
              title: "Testimonials",
              labelKey: "name",
              subtitleKey: "trip",
              orderable: true,
              searchKeys: ["name", "trip", "review"],
              emptyLabel: "No testimonials yet.",
              fields: [
                { key: "name", label: "Traveller name", type: "text", required: true },
                { key: "trip", label: "Trip", type: "text" },
                { key: "review", label: "Review", type: "textarea", rows: 5, required: true },
                { key: "rating", label: "Rating (1-5)", type: "number", min: 1, max: 5, step: 1 },
                { key: "review_date", label: "Date", type: "text", placeholder: "2026-05-14" },
                { key: "avatar_url", label: "Photo", type: "image" },
              ],
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
