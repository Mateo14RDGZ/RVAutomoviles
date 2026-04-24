"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";

export function AdminHeader() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <BrandLogo href="/admin" />
        <nav className="flex flex-1 items-center justify-end gap-1 text-sm sm:gap-2">
          <Link
            href="/admin/vehicles"
            className="rounded-lg px-3 py-2 text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
          >
            Vehículos
          </Link>
          <Link
            href="/catalogo"
            className="rounded-lg px-3 py-2 text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
          >
            Catálogo
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="rv-btn-secondary ml-1 px-3 py-2 text-xs sm:text-sm"
          >
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
}
