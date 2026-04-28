"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Variant = "up" | "soft" | "left" | "right" | "zoom" | "mask";

type Props = {
  delay?: number;
  variant?: Variant;
  duration?: number;
  className?: string;
  children: ReactNode;
};

const VARIANT_CLASS: Record<Variant, string> = {
  up: "rv-reveal",
  soft: "rv-reveal-soft",
  left: "rv-reveal-left",
  right: "rv-reveal-right",
  zoom: "rv-reveal-zoom",
  mask: "rv-reveal-mask",
};

/**
 * Wrapper que activa transiciones futuristas al entrar en viewport.
 * Variantes: up, soft (blur), left, right, zoom, mask (clip-path).
 * Respeta `prefers-reduced-motion` vía CSS.
 */
export function Reveal({
  delay = 0,
  variant = "up",
  duration,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const style = duration
    ? ({ ["--rv-reveal-duration" as string]: `${duration}ms` } as React.CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
