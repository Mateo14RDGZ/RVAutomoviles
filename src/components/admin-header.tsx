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
    <header className="sticky top-0 z-30 border-b border-sky-200/40 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <BrandLogo href="/admin" compact />
        <nav className="flex flex-1 items-center justify-end gap-2 text-sm sm:gap-4">
          <Link
            href="/admin/vehicles"
            className="rounded-lg px-3 py-1.5 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Vehículos
          </Link>
          <Link
            href="/catalogo"
            className="rounded-lg px-3 py-1.5 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Ver catálogo
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="rv-btn-secondary px-3 py-1.5"
          >
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
}
