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
      className={`group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 transition-all duration-300 hover:border-sky-300/45 hover:bg-white/10 ${className}`}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-sky-300/50 bg-sky-300/15 text-[11px] font-bold tracking-[0.14em] text-sky-100">
        RV
      </span>
      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-[0.06em] text-white sm:text-[15px]">
          RV Automoviles
        </span>
        {!compact ? (
          <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-300">{subtitle}</span>
        ) : null}
      </span>
    </Link>
  );
}
