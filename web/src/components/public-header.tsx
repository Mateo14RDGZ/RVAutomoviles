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
      <div className="rv-mobile-enter rv-mobile-enter-1 mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="group inline-flex w-full items-center gap-2.5 rounded-2xl border border-indigo-300/30 bg-gradient-to-r from-[#090d1d] via-[#111a36] to-[#0b132a] px-3 py-2 transition-all duration-300 hover:border-cyan-300/50 sm:w-auto sm:gap-3 sm:bg-gradient-to-r sm:from-white/10 sm:to-white/5 sm:py-2.5"
          aria-label="Ir al inicio"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-black tracking-[0.14em] text-slate-950 shadow-lg shadow-cyan-500/40 sm:h-10 sm:w-10 sm:text-sm">
            RV
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-bold uppercase tracking-[0.18em] text-white sm:text-base sm:tracking-[0.23em]">
              RV Automoviles
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-300">
              Compra y venta
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="w-full sm:w-auto">
          <ul className="rv-mobile-scan grid w-full grid-cols-2 items-center gap-1 rounded-2xl border border-indigo-300/30 bg-[#0b1228]/90 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:flex sm:w-auto sm:border-sky-300/20 sm:bg-white/5">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex w-full justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:py-2 ${
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
