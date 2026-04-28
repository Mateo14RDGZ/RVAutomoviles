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
    <header className="sticky top-0 z-40 border-b border-rv-border backdrop-blur-xl">
      <div className="absolute inset-0 bg-rv-deep/85" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <BrandLogo className="text-center sm:text-left" />
          <span
            className="hidden items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:inline-flex"
            title="Catálogo activo"
          >
            <span className="relative inline-flex h-1 w-1 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" aria-hidden />
              <span className="relative h-1 w-1 rounded-full bg-emerald-400" aria-hidden />
            </span>
            Online
          </span>
        </div>

        <nav aria-label="Principal" className="-mx-3 w-[calc(100%+1.5rem)] sm:mx-0 sm:w-auto">
          <ul className="rv-glass mx-3 flex items-center gap-1 overflow-x-auto rounded-2xl p-1.5 sm:mx-0 sm:flex-wrap sm:overflow-x-visible sm:justify-end">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : href === "/catalogo" && pathname.startsWith("/catalogo");
              return (
                <li key={href} className="shrink-0">
                  <Link
                    href={href}
                    onClick={(event) => handleInPageNavigation(event, href)}
                    className={`relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                      active
                        ? "bg-rv-accent/15 text-white shadow-[inset_0_0_0_1px_rgba(59,130,246,0.55)]"
                        : "text-rv-muted hover:bg-rv-accent/[0.1] hover:text-white"
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
