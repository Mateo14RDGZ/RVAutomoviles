"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados (default: 6). */
  max?: number;
};

/**
 * Card con tilt 3D suave siguiendo el cursor.
 * Inspiración: cards de saaslogic.io / linear / vercel.
 */
export function TiltCard({ children, className = "", max = 6 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rv-tilt-y", `${x * max}deg`);
    el.style.setProperty("--rv-tilt-x", `${-y * max}deg`);
    el.style.setProperty("--rv-spotlight-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--rv-spotlight-y", `${(y + 0.5) * 100}%`);
    el.dataset.active = "true";
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rv-tilt-y", "0deg");
    el.style.setProperty("--rv-tilt-x", "0deg");
    el.dataset.active = "false";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`rv-tilt rv-spotlight ${className}`.trim()}
    >
      {children}
    </div>
  );
}
