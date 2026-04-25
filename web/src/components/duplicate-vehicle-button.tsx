"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  sourceId: string;
  /** Para accesibilidad */
  sourceLabel: string;
};

export function DuplicateVehicleButton({ sourceId, sourceLabel }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDuplicate() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/vehicles/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId }),
      });
      const data = (await res.json()) as { vehicle?: { id: string }; error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo duplicar");
        return;
      }
      if (data.vehicle?.id) {
        router.push(`/admin/vehicles/${data.vehicle.id}/edit`);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex shrink-0 flex-col items-stretch justify-center gap-1 border-l border-slate-200 pl-3 sm:pl-4">
      <button
        type="button"
        onClick={onDuplicate}
        disabled={busy}
        title={`Duplicar datos de ${sourceLabel} (sin fotos)`}
        aria-label={`Duplicar ${sourceLabel} sin fotos`}
        className="rv-btn-secondary whitespace-nowrap px-3 py-2 text-xs font-semibold disabled:opacity-50"
      >
        {busy ? "Duplicando…" : "Duplicar"}
      </button>
      {error ? <p className="max-w-[8rem] text-[10px] text-red-600">{error}</p> : null}
    </div>
  );
}
