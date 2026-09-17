import { useEffect } from "react";

import { useContent } from "@/lib/cms/useContent";
import type { DesignSettings } from "@/lib/cms/types";

/**
 * Applies CMS-managed design tokens onto the document root.
 *
 * Two groups of variables are set:
 *  1. Theme-independent brand values (solid brand fill, fonts, radius, glass).
 *  2. Theme-aware palette values — light-theme vars when the site is in light
 *     mode and dark-theme vars when it is dark. The dark class is toggled on
 *     <html> by the theme switch, so a MutationObserver re-applies the right
 *     set whenever the visitor flips themes.
 *
 * Because these are set as inline styles on <html>, they intentionally win over
 * the stylesheet defaults in src/styles.css — but they lose to nothing else,
 * so an admin cannot break the design system's structure, only its palette.
 */

const ALWAYS_VARS = [
  "--font-display",
  "--font-sans",
  "--radius",
  "--glass-opacity",
  "--glass-blur",
];

const ALL_VARS = [
  ...ALWAYS_VARS,
  "--forest-solid",
  "--forest",
  "--river",
  "--background",
  "--foreground",
  "--ink",
  "--border",
  "--input",
];

function varsFor(design: DesignSettings, dark: boolean): Record<string, string> {
  const vars: Record<string, string> = {
    // Deep brand green for solid fills — paired with white text in both themes.
    "--forest-solid": design.primary_color,
    "--font-display": `"${design.heading_font}", serif`,
    "--font-sans": `"${design.body_font}", system-ui, sans-serif`,
    "--radius": `${design.radius}rem`,
    "--glass-opacity": String(design.glass_opacity),
    "--glass-blur": `${design.glass_blur}px`,
  };

  if (!dark) {
    Object.assign(vars, {
      "--forest": design.primary_color,
      "--river": design.accent_color,
      "--background": design.bg_light,
      "--foreground": design.text_light,
      "--ink": design.text_light,
      "--border": design.border_color,
      "--input": design.border_color,
    });
  } else {
    // In dark mode the accent vars keep their stylesheet values (lightened for
    // contrast); only the neutral surfaces follow the CMS.
    Object.assign(vars, {
      "--background": design.bg_dark,
      "--foreground": design.text_dark,
      "--ink": design.text_dark,
      "--border": design.border_color,
      "--input": design.border_color,
    });
  }
  return vars;
}

export function DesignTokens() {
  const { design } = useContent();

  useEffect(() => {
    if (!design || typeof document === "undefined") return;
    const root = document.documentElement;

    const apply = () => {
      const vars = varsFor(design, root.classList.contains("dark"));
      for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
      // Base font size scales every rem-based measurement on the site.
      root.style.fontSize = `${design.base_font_size}px`;
    };

    apply();
    // Re-apply when the visitor toggles light/dark so each theme receives its
    // own CMS palette.
    const observer = new MutationObserver(apply);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      for (const key of ALL_VARS) root.style.removeProperty(key);
      root.style.removeProperty("font-size");
    };
  }, [design]);

  return null;
}
