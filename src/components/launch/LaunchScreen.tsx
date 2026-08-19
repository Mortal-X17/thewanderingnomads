import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import valley from "@/assets/launch/launch-valley.jpg";
import logoAsset from "@/assets/brand/wandering-nomads-logo.png.asset.json";
import { LAUNCH_DATE_LABEL, getRemaining, type Remaining } from "@/lib/launch";

const UNITS: Array<{ key: keyof Omit<Remaining, "total">; label: string }> = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "minutes" },
  { key: "seconds", label: "seconds" },
];

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center">
      <div className="relative overflow-hidden">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="display block text-[13vw] leading-none tabular-nums text-launch-snow sm:text-6xl md:text-7xl"
        >
          {value}
        </motion.span>
      </div>
      <span
        className="mt-2 text-[0.6rem] font-medium uppercase text-launch-mist sm:text-[0.68rem]"
        style={{ letterSpacing: "0.22em" }}
      >
        {label}
      </span>
    </div>
  );
}

export function LaunchScreen({ onLaunch }: { onLaunch?: () => void }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining());
  const fired = useRef(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const next = getRemaining();
      setRemaining(next);
      if (next.total <= 0 && !fired.current) {
        fired.current = true;
        onLaunch?.();
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [onLaunch]);

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-launch-ink text-launch-snow">
      {/* Cinematic valley */}
      <motion.div
        aria-hidden
        initial={{ scale: reduced ? 1 : 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduced ? 0.6 : 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={valley}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover object-[60%_center] sm:object-center"
        />
      </motion.div>

      {/* Atmospheric grading */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--launch-ink) 72%, transparent) 0%, color-mix(in oklab, var(--launch-ink) 30%, transparent) 42%, color-mix(in oklab, var(--launch-ink) 88%, transparent) 100%)",
        }}
      />

      {/* Slow drifting mist bands */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-30%] bottom-[26%] h-[26vh]"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--launch-mist) 22%, transparent), transparent 70%)",
              filter: "blur(18px)",
            }}
            animate={{ x: ["-6%", "6%", "-6%"], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-20%] bottom-[8%] h-[20vh]"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 50%, color-mix(in oklab, var(--launch-mist) 16%, transparent), transparent 72%)",
              filter: "blur(24px)",
            }}
            animate={{ x: ["5%", "-5%", "5%"], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col items-center px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] text-center">
        <motion.div
          initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--launch-snow) 22%, transparent), transparent 70%)",
              filter: "blur(24px)",
            }}
          />
          <img
            src={logoAsset.url}
            alt="The Wandering Nomads official logo"
            width={256}
            height={256}
            className="h-32 w-32 rounded-full border border-launch-snow/20 object-contain shadow-2xl shadow-launch-ink/40 sm:h-40 sm:w-40 md:h-44 md:w-44"
          />
        </motion.div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 py-12 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            <p
              className="text-[0.62rem] font-medium uppercase text-launch-mist sm:text-[0.7rem]"
              style={{ letterSpacing: "0.3em" }}
            >
              The Wandering Nomads
            </p>
            <h1
              className="display mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl"
              style={{ color: "var(--launch-snow)" }}
            >
              A new journey

              <br />
              begins soon.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-launch-mist">
              Founder-led expeditions across the Himalaya and beyond. The trail
              opens on launch day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            className="w-full"
          >
            <div className="mx-auto flex w-full max-w-md items-start justify-center divide-x divide-launch-snow/15">
              {UNITS.map(({ key, label }) => (
                <Unit
                  key={key}
                  value={mounted ? pad(remaining[key], 2) : pad(0, 2)}
                  label={label}
                />
              ))}
            </div>
            <div
              aria-hidden
              className="mx-auto mt-7 h-px w-40 sm:w-56"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in oklab, var(--launch-gold) 80%, transparent), transparent)",
              }}
            />
            <p
              className="mt-5 text-[0.62rem] font-medium uppercase text-launch-snow/80 sm:text-[0.7rem]"
              style={{ letterSpacing: "0.28em" }}
            >
              {LAUNCH_DATE_LABEL}
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="text-[0.6rem] uppercase text-launch-mist"
          style={{ letterSpacing: "0.24em" }}
        >
          By Krish · @thewanderingnomads.in
        </motion.p>
      </div>
    </main>
  );
}
