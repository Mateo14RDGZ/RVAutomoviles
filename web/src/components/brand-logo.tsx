"use client";

import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
};

export function BrandLogo({ href = "/", className = "" }: Props) {
  return (
    <Link
      href={href}
      aria-label="RV Automóviles"
      className={`group relative inline-flex items-center gap-2 font-[family-name:var(--font-brand)] leading-none transition-all duration-300 ${className}`.trim()}
    >
      <span
        aria-hidden
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-rv-accent via-sky-400 to-cyan-300 text-[11px] font-black tracking-tight text-white shadow-[0_8px_22px_rgba(30,166,247,0.35)] ring-1 ring-rv-accent/40 transition-transform duration-300 group-hover:scale-105"
      >
        RV
      </span>
      <span className="block text-[1.25rem] font-light tracking-[0.16em] text-slate-900 transition-colors duration-300 group-hover:text-rv-accent sm:text-[1.6rem]">
        Automóviles
      </span>
    </Link>
  );
}
