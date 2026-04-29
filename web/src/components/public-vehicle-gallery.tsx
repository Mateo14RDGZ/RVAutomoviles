"use client";

import { useState } from "react";

type Props = {
  photos: string[];
  alt: string;
};

export function PublicVehicleGallery({ photos, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasPhotos = photos.length > 0;

  if (!hasPhotos) {
    return (
      <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
        Galería en actualización
      </div>
    );
  }

  function next() {
    setActiveIndex((current) => (current + 1) % photos.length);
  }

  function previous() {
    setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
  }

  return (
    <section className="mt-3 space-y-3">
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[activeIndex]}
          alt={alt}
          className="aspect-[4/3] w-full object-cover transition duration-500"
        />

        {photos.length > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 p-2 text-slate-900 shadow-lg transition hover:scale-105 hover:bg-white"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 p-2 text-slate-900 shadow-lg transition hover:scale-105 hover:bg-white"
            >
              <ChevronRight />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-slate-950/75 px-2 py-1">
              {photos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Ir a foto ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === index ? "w-5 bg-sky-300" : "w-1.5 bg-white/65 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {photos.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {photos.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-xl border bg-white ${
                activeIndex === index ? "border-sky-400 ring-2 ring-sky-200" : "border-slate-200"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="aspect-[4/3] h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}
