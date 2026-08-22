import { cn } from "@/lib/utils";

/** Renders CMS-authored HTML safely with consistent typography styles. */
export function RichText({
  html,
  className,
}: {
  html?: string | null;
  className?: string;
}) {
  if (!html) return null;
  return (
    <div
      className={cn("cms-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
