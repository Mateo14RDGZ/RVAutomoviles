"use client";

import type { ReactNode } from "react";

type Props = {
  items: ReactNode[];
  /** Velocidad relativa: > 1 más rápido, < 1 más lento. */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Banda con scroll infinito (estilo saaslogic). Duplica items para loop continuo.
 * Pausa al hacer hover.
 */
export function Marquee({ items, speed = 1, reverse = false, className = "" }: Props) {
  const duration = `${28 / speed}s`;
  return (
    <div className={`rv-marquee ${className}`.trim()}>
      <div
        className="rv-marquee-track"
        data-direction={reverse ? "reverse" : undefined}
        style={{ animationDuration: duration }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
