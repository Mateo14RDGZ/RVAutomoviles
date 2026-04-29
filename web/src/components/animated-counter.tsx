"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/**
 * Cuenta de 0 hasta `value` cuando entra en viewport.
 * Pensado para stats del home (estilo saaslogic).
 */
export function AnimatedCounter({ value, duration = 1400, suffix = "", prefix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let instantFrame = 0;
    const setInstantValue = () => {
      instantFrame = window.requestAnimationFrame(() => setDisplay(value));
    };

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInstantValue();
      return () => window.cancelAnimationFrame(instantFrame);
    }

    if (typeof IntersectionObserver === "undefined") {
      setInstantValue();
      return () => window.cancelAnimationFrame(instantFrame);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || startedRef.current) return;
          startedRef.current = true;
          const start = performance.now();
          const from = 0;
          const to = value;

          function tick(now: number) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            // ease out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(from + (to - from) * eased));
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("es-AR")}
      {suffix}
    </span>
  );
}
