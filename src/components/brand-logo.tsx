"use client";

import Link from "next/link";

type Props = {
  compact?: boolean;
  href?: string;
  subtitle?: string;
  className?: string;
};

export function BrandLogo({
  compact = false,
  href = "/",
  subtitle = "Compra y venta",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      aria-label="RV Automoviles"
      className={`group inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-2.5 py-2 transition-all duration-300 hover:border-sky-300/45 hover:from-sky-300/20 hover:to-white/10 ${className}`}
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 via-cyan-300 to-sky-200 text-[11px] font-black tracking-[0.15em] text-slate-950 shadow-[0_8px_24px_rgba(14,165,233,0.45)]">
        <span className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-white/40 blur-md" />
        RV
      </span>
      {!compact ? (
        <span className="leading-tight">
          <span className="block text-sm font-extrabold uppercase tracking-[0.18em] text-white sm:text-[15px]">
            RV Automoviles
          </span>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-300">{subtitle}</span>
        </span>
      ) : null}
    </Link>
  );
}
