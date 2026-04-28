"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Autos" },
  { href: "/#financiacion-bancaria", label: "Financiación" },
  { href: "/#ubicacion", label: "Ubicación" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export function PublicHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleInPageNavigation = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return;
    if (!href.startsWith("/#")) return;
    const id = href.replace("/#", "");
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rv-accent/20 backdrop-blur-xl">
      <div className="absolute inset-0 bg-white/85" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <BrandLogo className="w-full text-center sm:w-auto sm:text-left" />

        <nav aria-label="Principal" className="w-full sm:w-auto">
          <ul className="rv-glass grid w-full grid-cols-3 items-center gap-1 rounded-2xl p-1.5 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : href === "/catalogo" && pathname.startsWith("/catalogo");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={(event) => handleInPageNavigation(event, href)}
                    className={`relative inline-flex w-full justify-center overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:py-2 ${
                      active
                        ? "bg-rv-accent/12 text-rv-accent shadow-[inset_0_0_0_1px_rgba(30,166,247,0.45)]"
                        : "text-slate-600 hover:bg-rv-accent/[0.08] hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{label}</span>
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-1 h-px bg-gradient-to-r from-transparent via-rv-accent to-transparent"
                      />
                    ) : null}
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
