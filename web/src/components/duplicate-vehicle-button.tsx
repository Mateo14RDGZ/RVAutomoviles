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
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onDuplicate}
        disabled={busy}
        title={`Duplicar datos de ${sourceLabel} (sin fotos)`}
        aria-label={`Duplicar ${sourceLabel} sin fotos`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100 disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 15V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {busy ? "Duplicando…" : "Duplicar"}
      </button>
      {error ? <p className="max-w-[10rem] text-right text-[10px] text-red-600">{error}</p> : null}
    </div>
  );
}
