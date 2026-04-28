"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  delay?: number;
  variant?: "up" | "soft";
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper que activa una transición progresiva al entrar en viewport.
 * - variant="up": sube + aparece.
 * - variant="soft": además aplica un blur que se desvanece, ideal para hero.
 * En navegadores sin IntersectionObserver muestra el contenido sin animación.
 * Respeta `prefers-reduced-motion` vía CSS.
 */
export function Reveal({ delay = 0, variant = "up", className = "", children }: Props) {
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

  const base = variant === "soft" ? "rv-reveal-soft" : "rv-reveal";

  return (
    <div ref={ref} className={`${base} ${className}`.trim()}>
      {children}
    </div>
  );
}
