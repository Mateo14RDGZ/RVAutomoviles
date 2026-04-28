"use client";

import { useCallback, useRef, useState } from "react";

type Props = {
  photos: string[];
  alt: string;
  /** Clases del contenedor (p. ej. bordes distintos en mobile full-bleed) */
  className?: string;
};

export function VehiclePhotoCarousel({ photos, alt, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const n = photos.length;

  const go = useCallback((delta: number) => {
    setIndex((prev) => {
      if (n <= 0) return 0;
      const cur = Math.min(prev, n - 1);
      return (cur + delta + n) % n;
    });
  }, [n]);

  const i = n > 0 ? Math.min(index, n - 1) : 0;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  }

  if (n === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="Carrusel"
      aria-label={n > 1 ? `${alt}, galería de ${n} fotos` : alt}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`relative overflow-hidden border border-rv-border bg-rv-bg2 shadow-[0_18px_48px_rgba(2,6,23,0.55)] outline-none ring-rv-accent/40 focus-visible:ring-2 ${className}`}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (dx > 56) go(-1);
        else if (dx < -56) go(1);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[i]}
        alt={n > 1 ? `${alt} — foto ${i + 1} de ${n}` : alt}
        className="aspect-[4/3] w-full object-cover select-none"
        draggable={false}
      />

      {n > 1 ? (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/60 active:scale-95 sm:left-3 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/60 active:scale-95 sm:right-3 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent"
            aria-hidden
          />
          <div className="absolute bottom-3 left-1/2 flex max-w-[90%] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5">
            {photos.map((_, j) => (
              <button
                key={`dot-${j}-${photos[j]}`}
                type="button"
                aria-label={`Ir a la foto ${j + 1}`}
                aria-current={j === i ? "true" : undefined}
                onClick={() => setIndex(j)}
                className={`pointer-events-auto h-2 rounded-full transition-all ${
                  j === i ? "w-6 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <p className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm">
            {i + 1} / {n}
          </p>
        </>
      ) : null}
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
    </svg>
  );
}
