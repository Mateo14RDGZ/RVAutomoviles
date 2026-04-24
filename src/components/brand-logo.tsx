"use client";

import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
};

/**
 * Logo tipográfico minimalista: solo "RV Automoviles", sin recuadros ni iconos.
 * Usa la variable CSS --font-brand (Outfit) definida en el layout raíz.
 */
export function BrandLogo({ href = "/", className = "" }: Props) {
  return (
    <Link
      href={href}
      aria-label="RV Automoviles"
      className={`font-[family-name:var(--font-brand)] text-[0.95rem] font-light tracking-[0.12em] text-white/95 transition-colors duration-200 ease-out hover:text-sky-300 sm:text-base ${className}`}
    >
      RV Automoviles
    </Link>
  );
}
