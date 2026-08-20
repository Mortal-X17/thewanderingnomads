import { createFileRoute } from "@tanstack/react-router";

import { SingletonEditor, type SingletonGroup } from "@/components/admin/SingletonEditor";

export const Route = createFileRoute("/admin/design")({
  component: DesignPage,
});

const FONTS = [
  "Instrument Serif",
  "Inter",
  "Cormorant Garamond",
  "Playfair Display",
  "DM Serif Display",
  "Manrope",
  "Work Sans",
].map((font) => ({ value: font, label: font }));

const GROUPS: SingletonGroup[] = [
  {
    title: "Colours",
    description: "Brand colours used for accents, buttons and highlights.",
    fields: [
      { key: "primary_color", label: "Primary (forest)", type: "color" },
      { key: "accent_color", label: "Accent (river)", type: "color" },
      { key: "bg_light", label: "Light background", type: "color" },
      { key: "bg_dark", label: "Dark background", type: "color" },
      { key: "text_light", label: "Text on light", type: "color" },
      { key: "text_dark", label: "Text on dark", type: "color" },
      { key: "border_color", label: "Borders", type: "color" },
    ],
  },
  {
    title: "Typography",
    fields: [
      { key: "heading_font", label: "Heading font", type: "select", options: FONTS },
      { key: "body_font", label: "Body font", type: "select", options: FONTS },
      {
        key: "base_font_size",
        label: "Base font size (px)",
        type: "number",
        min: 14,
        max: 20,
        step: 1,
      },
    ],
  },
  {
    title: "Glass & shape",
    description: "Tune the frosted-glass panels and corner rounding.",
    fields: [
      { key: "glass_opacity", label: "Glass opacity", type: "number", min: 0, max: 1, step: 0.05 },
      { key: "glass_blur", label: "Glass blur (px)", type: "number", min: 0, max: 40, step: 1 },
      { key: "radius", label: "Corner radius (rem)", type: "number", min: 0, max: 2, step: 0.05 },
    ],
  },
  {
    title: "Motion",
    fields: [
      {
        key: "animation_intensity",
        label: "Animation intensity",
        type: "number",
        min: 0,
        max: 1,
        step: 0.1,
        help: "0 = still, 1 = full cinematic motion.",
      },
      {
        key: "animation_speed",
        label: "Animation speed",
        type: "number",
        min: 0.5,
        max: 2,
        step: 0.1,
      },
    ],
  },
];

function DesignPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Design</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Safe, curated controls — the underlying design system stays intact.
        </p>
      </header>
      <SingletonEditor table="design_settings" groups={GROUPS} />
    </div>
  );
}
