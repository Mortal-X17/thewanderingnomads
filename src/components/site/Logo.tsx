/**
 * Wandering Nomads brand mark.
 *
 * Placeholder-friendly: to replace with a final logo, drop the file into
 * `src/assets/brand/logo-light.svg` / `logo-dark.svg` and switch the
 * two <img> blocks below. Everything else (sizing, spacing) stays intact.
 */
export function Logo({
  variant = "dark",
  size = 32,
}: {
  /** "dark" = mark tuned for light backgrounds, "light" = for dark backgrounds */
  variant?: "dark" | "light";
  size?: number;
}) {
  const stroke = variant === "light" ? "rgba(255,255,255,0.92)" : "currentColor";
  const bg =
    variant === "light"
      ? "rgba(255,255,255,0.10)"
      : "color-mix(in oklab, currentColor 6%, transparent)";
  const border =
    variant === "light"
      ? "rgba(255,255,255,0.35)"
      : "color-mix(in oklab, currentColor 18%, transparent)";

  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-full transition-colors"
      style={{
        width: size,
        height: size,
        background: bg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size * 0.62}
        height={size * 0.62}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Mountain + compass needle mark */}
        <path d="M4 23 L12 12 L17 18 L22 11 L28 23 Z" />
        <circle cx="22" cy="11" r="1.3" fill={stroke} stroke="none" />
      </svg>
    </span>
  );
}
