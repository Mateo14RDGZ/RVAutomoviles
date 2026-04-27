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
    <header className="sticky top-0 z-40 border-b border-rv-accent/20 bg-white/90 backdrop-blur-xl">
      <div className="rv-mobile-enter rv-mobile-enter-1 mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="group inline-flex w-full items-center gap-2.5 rounded-2xl border border-rv-accent/20 bg-gradient-to-r from-white to-rv-accent/[0.08] px-3 py-2 transition-all duration-300 hover:border-rv-accent/45 hover:shadow-[0_10px_28px_rgba(30,166,247,0.18)] sm:w-auto sm:gap-3 sm:py-2.5"
          aria-label="Ir al inicio"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rv-accent to-sky-300 text-xs font-black tracking-[0.14em] text-white shadow-lg shadow-sky-300/40 sm:h-10 sm:w-10 sm:text-sm">
            RV
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-bold uppercase tracking-[0.18em] text-slate-900 sm:text-base sm:tracking-[0.23em]">
              RV Automoviles
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Compra y venta
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="w-full sm:w-auto">
          <ul className="rv-mobile-scan grid w-full grid-cols-2 items-center gap-1 rounded-2xl border border-rv-accent/20 bg-white p-1.5 sm:flex sm:w-auto">
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
