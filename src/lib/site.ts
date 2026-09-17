/**
 * Canonical public contact constants for The Wandering Nomads.
 *
 * These are the single source of truth for the phone/WhatsApp/email used
 * across the public site and the MCP tools, so a change in one place
 * propagates everywhere instead of drifting out of sync.
 */

/** WhatsApp number, digits only (international format). */
export const WHATSAPP_NUMBER = "919621217333";

/** Canonical production origin — used for sitemap, canonicals and OG URLs. */
export const SITE_URL = "https://thewanderingnomads.lovable.app";

/** Absolute URL for a path ("" → site root). Falls back to the path itself when no origin is configured. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Phone number as shown to visitors. */
export const PHONE_DISPLAY = "+91 96212 17333";

/** Public enquiry email. */
export const CONTACT_EMAIL = "wanderwithkrish@gmail.com";

/** A wa.me link, optionally with a pre-filled message. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
