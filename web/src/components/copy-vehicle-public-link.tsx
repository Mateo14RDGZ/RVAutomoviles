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
    <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-xs text-slate-400">
        Compartí esta ficha en <span className="text-slate-300">Instagram</span> o{" "}
        <span className="text-slate-300">WhatsApp</span>.
      </p>
      <button
        type="button"
        onClick={() => void copy()}
        className="shrink-0 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-400"
      >
        {done ? "Copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
