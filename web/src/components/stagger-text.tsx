"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
};

/**
 * Renderiza el texto dividido por palabras y las anima escalonadas
 * cuando entra en viewport (estilo saaslogic.io / framer).
 * Devuelve un <span> inline-block, así se puede usar dentro de cualquier heading.
 */
export function StaggerText({ text, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

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
            el.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span ref={ref} className={`rv-stagger inline-block ${className}`.trim()}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="mr-[0.25em] inline-block">
          {w}
        </span>
      ))}
    </span>
  );
}
