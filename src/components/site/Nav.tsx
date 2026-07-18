import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/journeys", label: "Journeys" },
  { to: "/atlas", label: "Atlas" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 sm:py-3 ${
          scrolled
            ? "glass"
            : "border border-white/10 bg-white/5 backdrop-blur-[6px]"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/20 text-[10px] font-medium text-white tracking-widest backdrop-blur-md group-hover:bg-white/30 transition">
            WN
          </span>
          <span
            className={`display text-[15px] tracking-tight transition-colors ${
              scrolled ? "text-ink" : "text-white"
            }`}
          >
            The Wandering Nomads
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  scrolled
                    ? "text-ink/70 hover:text-ink"
                    : "text-white/80 hover:text-white"
                }`}
                activeProps={{
                  className: scrolled
                    ? "text-ink bg-ink/5"
                    : "text-white bg-white/15",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle variant={scrolled ? "dark" : "light"} />
          <Link
            to="/contact"
            className={`inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium transition ${
              scrolled
                ? "bg-ink text-snow hover:opacity-90"
                : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            Book Now
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle variant={scrolled ? "dark" : "light"} />

        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
            scrolled
              ? "border-ink/15 text-ink"
              : "border-white/25 text-white"
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-4 bg-current transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass absolute left-4 right-4 top-[72px] rounded-3xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-ink/80 hover:bg-ink/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-ink/5 pt-2">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl bg-ink px-4 py-3 text-center text-[14px] font-medium text-snow"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
