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
      <span className="block text-[1.3rem] font-medium tracking-[0.08em] sm:text-[1.6rem]">
        RV Automóviles
      </span>
    </Link>
  );
}
