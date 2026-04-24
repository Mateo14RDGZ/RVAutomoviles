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
    <header className="sticky top-0 z-40 border-b border-sky-300/20 bg-slate-950/90 shadow-[0_12px_45px_rgba(14,165,233,0.12)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <BrandLogo className="max-w-[70%] sm:max-w-none" />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-2xl border border-sky-300/20 bg-white/5 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 sm:px-4 sm:text-sm ${
                      active
                        ? "bg-gradient-to-r from-sky-400/25 to-cyan-300/25 text-sky-100 shadow-[inset_0_0_0_1px_rgba(125,211,252,0.55)]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
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
