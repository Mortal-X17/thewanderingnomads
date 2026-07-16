import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getInitial(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("wn-theme", theme);
  } catch {
    // ignore
  }
}

export function ThemeToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitial());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const onDark = mounted && theme === "dark";
  const base =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border transition";
  const styles =
    variant === "light" && !onDark
      ? "border-white/25 bg-white/5 text-white hover:bg-white/15"
      : "border-ink/15 bg-ink/5 text-ink hover:bg-ink/10";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={onDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={onDark}
      className={`${base} ${styles}`}
    >
      {onDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
