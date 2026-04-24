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
      className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-800 hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
