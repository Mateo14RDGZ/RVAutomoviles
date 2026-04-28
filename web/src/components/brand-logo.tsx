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
      className={`font-[family-name:var(--font-brand)] leading-none text-rv-text transition-all duration-300 hover:text-rv-accent-2 ${className}`}
    >
      <span className="block text-[1.35rem] font-light tracking-[0.16em] sm:text-[1.7rem]">
        RV Automóviles
      </span>
    </Link>
  );
}
