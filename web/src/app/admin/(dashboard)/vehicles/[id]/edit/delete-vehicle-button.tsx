"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteVehicleButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onDelete() {
    if (!window.confirm("¿Eliminar este vehículo y sus archivos enlazados del listado?")) return;
    setPending(true);
    try {
      const res = await fetch(`/api/admin/vehicles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.replace("/admin/vehicles");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => void onDelete()}
      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 transition hover:bg-red-100 disabled:opacity-50"
    >
      {pending ? "Eliminando…" : "Eliminar"}
    </button>
  );
}

export function MarkVehicleSoldButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onMarkSold() {
    if (
      !window.confirm(
        "¿Marcar como vendido? Esto elimina el auto del catálogo, la base de datos y sus imágenes.",
      )
    ) {
      return;
    }
    setPending(true);
    try {
      const res = await fetch(`/api/admin/vehicles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.replace("/admin/vehicles");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => void onMarkSold()}
      className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-100 disabled:opacity-50"
    >
      {pending ? "Procesando…" : "Marcar como vendido"}
    </button>
  );
}
