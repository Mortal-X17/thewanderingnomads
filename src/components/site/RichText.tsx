import { cn } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";

/** Renders CMS-authored HTML with consistent typography styles and a safety filter. */
export function RichText({ html, className }: { html?: string | null; className?: string }) {
  if (!html) return null;
  return (
    <div
      className={cn("cms-content", className)}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
