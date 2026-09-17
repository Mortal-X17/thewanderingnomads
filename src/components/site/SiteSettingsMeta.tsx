import { useEffect } from "react";

import { useContent } from "@/lib/cms/useContent";

/**
 * Applies the CMS "Site & SEO" settings to the document head.
 *
 * The SSR head ships sensible static defaults; once the CMS settings arrive
 * this component syncs the owner-managed title, description, share image and
 * favicon onto the live document (direct DOM updates, so it never fights the
 * router's own head rendering during navigation).
 */
export function SiteSettingsMeta() {
  const { settings } = useContent();

  useEffect(() => {
    if (!settings || typeof document === "undefined") return;

    const title = settings.seo_title?.trim() || settings.site_title?.trim();
    if (title) document.title = title;

    const description = settings.seo_description?.trim() || settings.site_description?.trim();

    const setAttr = (selector: string, attr: string, value?: string | null) => {
      if (!value) return;
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    if (description) {
      setAttr('meta[name="description"]', "content", description);
      setAttr('meta[property="og:description"]', "content", description);
      setAttr('meta[name="twitter:description"]', "content", description);
    }
    if (title) {
      setAttr('meta[property="og:title"]', "content", title);
      setAttr('meta[name="twitter:title"]', "content", title);
    }
    const image = settings.og_image_url?.trim();
    if (image) {
      setAttr('meta[property="og:image"]', "content", image);
      setAttr('meta[name="twitter:image"]', "content", image);
    }

    const favicon = settings.favicon_url?.trim();
    if (favicon) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [settings]);

  return null;
}
