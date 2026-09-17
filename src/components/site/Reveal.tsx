import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/**
 * CMS motion preferences (admin → Design → Motion), read once from the root
 * element. `--motion-intensity` scales how far elements travel/blur;
 * `--motion-speed` scales duration. Defaults match the design system so the
 * values are purely optional.
 */
function useMotionPrefs(): { intensity: number; speed: number } {
  const [prefs, setPrefs] = useState({ intensity: 1, speed: 1 });
  useEffect(() => {
    try {
      const style = getComputedStyle(document.documentElement);
      const intensity = Number.parseFloat(style.getPropertyValue("--motion-intensity"));
      const speed = Number.parseFloat(style.getPropertyValue("--motion-speed"));
      setPrefs({
        intensity: Number.isFinite(intensity) && intensity >= 0 ? intensity : 1,
        speed: Number.isFinite(speed) && speed > 0 ? speed : 1,
      });
    } catch {
      /* keep defaults */
    }
  }, []);
  return prefs;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = 8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { intensity, speed } = useMotionPrefs();

  const travel = Math.max(0, y * intensity);
  const soften = Math.max(0, blur * intensity);

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 / speed, delay } },
      }
    : {
        hidden: { opacity: 0, y: travel, filter: `blur(${soften}px)` },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.9 / speed,
            ease: [0.22, 1, 0.36, 1],
            delay,
          },
        },
      };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
