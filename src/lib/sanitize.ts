/**
 * Conservative HTML sanitizer for CMS-authored rich text, applied at the single
 * public render point (the `RichText` component). This is defense-in-depth on
 * top of two existing layers: (1) content writes are admin-only via row-level
 * security, and (2) the editor emits only a Tiptap schema allowlist (headings,
 * bold/italic, links, lists, blockquotes).
 *
 * This is intentionally NOT a full HTML parser — if untrusted third-party input
 * ever enters the pipeline, replace this with DOMPurify (server + client). It
 * strips the highest-risk constructs so a compromised admin account or a stray
 * paste cannot inject executable markup into the public site.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return html;

  let out = html;

  // 1. Drop element blocks whose contents could carry a payload (with contents).
  out = out.replace(
    /<\s*(script|style|iframe|object|embed|noscript|template)\b[\s\S]*?<\s*\/\s*\1\s*>/gi,
    "",
  );
  // 1b. Drop dangerous void / self-closing tags.
  out = out.replace(
    /<\s*(script|style|iframe|object|embed|noscript|template|link|meta|base|form|frame|frameset|applet|svg|math)\b[^>]*\/?\s*>/gi,
    "",
  );

  // 2. Strip event handlers and other executable/unsafe attributes.
  out = out.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  out = out.replace(
    /\s(style|srcdoc|formaction|action|xlink:href)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
    "",
  );

  // 3. Neutralise javascript:/data:/vbscript: URLs in href/src attributes.
  out = out.replace(
    /(\s(?:href|src)\s*=\s*)(["']?)([^"'\s>]+)\2/gi,
    (match, prefix: string, _quote: string, url: string) =>
      /^(javascript|vbscript|data):/i.test(url) ? `${prefix}""` : match,
  );

  return out;
}
