"use client";

import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Autos" },
] as const;

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rv-accent/20 bg-white/90 shadow-[0_8px_26px_rgba(30,166,247,0.08)] backdrop-blur-xl">
      <div className="rv-mobile-enter rv-mobile-enter-1 mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <BrandLogo className="w-full text-center sm:w-auto sm:text-left" />

        <nav aria-label="Principal" className="w-full sm:w-auto">
          <ul className="grid w-full grid-cols-2 items-center gap-1 rounded-2xl border border-rv-accent/20 bg-white p-1.5 sm:flex sm:w-auto">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex w-full justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:py-2 ${
                      active
                        ? "bg-rv-accent/12 text-rv-accent shadow-[inset_0_0_0_1px_rgba(30,166,247,0.45)]"
                        : "text-slate-600 hover:bg-rv-accent/[0.06] hover:text-slate-900"
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
