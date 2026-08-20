import { useEffect } from "react";

import { useContent } from "@/lib/cms/useContent";

/**
 * Applies CMS-managed design tokens onto the document root.
 *
 * Only a curated set of variables is exposed — the design system itself stays
 * in src/styles.css so an admin cannot break the visual language.
 */
export function DesignTokens() {
  const { design } = useContent();

  useEffect(() => {
    if (!design || typeof document === "undefined") return;
    const root = document.documentElement;
    const vars: Record<string, string> = {
      "--forest": design.primary_color,
      "--river": design.accent_color,
      "--cms-bg-light": design.bg_light,
      "--cms-bg-dark": design.bg_dark,
      "--cms-text-light": design.text_light,
      "--cms-text-dark": design.text_dark,
      "--cms-border": design.border_color,
      "--glass-opacity": String(design.glass_opacity),
      "--glass-blur": `${design.glass_blur}px`,
      "--radius": `${design.radius}rem`,
      "--font-display": `"${design.heading_font}", serif`,
      "--font-body": `"${design.body_font}", system-ui, sans-serif`,
      "--base-font-size": `${design.base_font_size}px`,
      "--motion-intensity": String(design.animation_intensity),
      "--motion-speed": String(design.animation_speed),
    };
    for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
    return () => {
      for (const key of Object.keys(vars)) root.style.removeProperty(key);
    };
  }, [design]);

  return null;
}
