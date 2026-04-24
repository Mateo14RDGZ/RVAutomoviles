"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Autos" },
] as const;

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-sky-300/20 bg-slate-950/95 shadow-[0_6px_30px_rgba(14,165,233,0.12)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="group inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 transition-all duration-300 hover:border-sky-300/40 hover:bg-white/10"
          aria-label="Ir al inicio"
        >
          <span className="text-xl font-semibold tracking-[0.14em] text-slate-100 sm:text-2xl">
            RV Automoviles
          </span>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-1 rounded-xl border border-sky-300/20 bg-white/5 p-1">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-sky-400/20 text-sky-200 shadow-[inset_0_0_0_1px_rgba(125,211,252,0.5)]"
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
