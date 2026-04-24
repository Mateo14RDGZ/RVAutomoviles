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
    <header className="sticky top-0 z-40 border-b border-sky-300/20 bg-slate-950/90 shadow-[0_12px_45px_rgba(14,165,233,0.12)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-gradient-to-r from-white/10 to-white/5 px-3 py-2.5 transition-all duration-300 hover:border-sky-300/40 hover:from-sky-300/20 hover:to-white/10"
          aria-label="Ir al inicio"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 text-sm font-black tracking-[0.14em] text-slate-950 shadow-lg shadow-cyan-500/40">
            RV
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold uppercase tracking-[0.23em] text-white sm:text-base">
              RV Automoviles
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-300">
              Compra y venta
            </span>
          </span>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-1 rounded-2xl border border-sky-300/20 bg-white/5 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
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
