"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="text-sm font-semibold text-slate-900">
          Panel
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-4 text-sm">
          <Link href="/admin/vehicles" className="text-slate-600 hover:text-slate-900">
            Vehículos
          </Link>
          <Link href="/catalogo" className="text-slate-600 hover:text-slate-900">
            Ver catálogo
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
}
