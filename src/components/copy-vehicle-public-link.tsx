"use client";

import { useState } from "react";

export function CopyVehiclePublicLink({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    const path = `/v/${slug}`;
    const full =
      typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    try {
      await navigator.clipboard.writeText(full);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      setDone(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-rv-accent/15 bg-rv-accent/[0.05] px-3 py-2">
      <p className="text-xs text-slate-600">
        Compartí esta ficha en <span className="font-medium text-rv-accent">Instagram</span> o{" "}
        <span className="font-medium text-rv-accent">WhatsApp</span>.
      </p>
      <button
        type="button"
        onClick={() => void copy()}
        className="shrink-0 rounded-lg bg-rv-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rv-accent/90"
      >
        {done ? "Copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
