import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  suffix = "+",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  // Server render and pre-scroll renders show the real number (never "0+"),
  // and the count-up takes over once the stat scrolls into view.
  const display = value == null ? to : Math.round(value);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
