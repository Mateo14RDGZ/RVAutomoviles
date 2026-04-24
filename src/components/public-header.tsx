"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Autos" },
] as const;

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rv-accent/15 bg-white/90 shadow-[0_8px_32px_rgba(30,166,247,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <BrandLogo className="max-w-[70%] sm:max-w-none" />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-2xl border border-rv-accent/15 bg-white p-1.5 shadow-[inset_0_1px_0_rgba(30,166,247,0.06)]">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 sm:px-4 sm:text-sm ${
                      active
                        ? "bg-rv-accent/10 text-rv-accent shadow-[inset_0_0_0_1px_rgba(30,166,247,0.35)]"
                        : "text-slate-600 hover:bg-rv-accent/[0.06] hover:text-rv-accent"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
