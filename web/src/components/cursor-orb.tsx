"use client";

import { useEffect, useRef } from "react";

/**
 * Halo gradient que sigue al cursor dentro del contenedor padre.
 * Pensado para los heros (tipo saaslogic.io).
 * El padre debe ser `relative overflow-hidden`.
 */
export function CursorOrb() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function loop() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }

    function handleEnter() {
      if (el) el.dataset.active = "true";
    }
    function handleLeave() {
      if (el) el.dataset.active = "false";
    }
    function handleMove(e: MouseEvent) {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    }

    parent.addEventListener("mouseenter", handleEnter);
    parent.addEventListener("mouseleave", handleLeave);
    parent.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(loop);

    return () => {
      parent.removeEventListener("mouseenter", handleEnter);
      parent.removeEventListener("mouseleave", handleLeave);
      parent.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="rv-cursor-orb" aria-hidden />;
}
