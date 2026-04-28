"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/vehicles", label: "Vehículos" },
  { href: "/admin/vehicles/new", label: "Nuevo" },
] as const;

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-rv-accent/20 bg-white/85 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <Link href="/admin" className="inline-flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-cyan-400 to-sky-300 text-xs font-black text-white shadow-[0_8px_22px_rgba(0,115,230,0.35)] ring-1 ring-rv-accent/40">
            RV
          </span>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-rv-accent">Panel</span>
            <span className="text-sm font-semibold text-slate-900">RV Automóviles</span>
          </div>
        </Link>

        <nav aria-label="Navegación admin" className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <ul className="rv-glass hidden items-center gap-1 rounded-2xl p-1 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative inline-flex items-center rounded-xl px-3 py-1.5 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-rv-accent/12 text-rv-accent shadow-[inset_0_0_0_1px_rgba(0,115,230,0.45)]"
                      : "text-slate-600 hover:bg-rv-accent/[0.08] hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/catalogo"
            className="hidden rounded-xl px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
          >
            Ver catálogo
          </Link>

          <button
            type="button"
            onClick={() => void logout()}
            disabled={busy}
            className="rv-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M16 8l4 4-4 4M20 12H10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {busy ? "Saliendo…" : "Salir"}
          </button>
        </nav>
      </div>

      {/* Tabs mobile */}
      <div className="border-t border-rv-accent/10 bg-white/70 backdrop-blur sm:hidden">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 py-2">
          {navLinks.map((link) => (
            <li key={`m-${link.href}`} className="shrink-0">
              <Link
                href={link.href}
                className={`inline-flex rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  isActive(link.href)
                    ? "bg-rv-accent/12 text-rv-accent shadow-[inset_0_0_0_1px_rgba(0,115,230,0.45)]"
                    : "text-slate-600 hover:bg-rv-accent/[0.08] hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
