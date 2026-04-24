export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-sky-300/20 bg-slate-950/95">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-400 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-black text-slate-950">
              RV
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
              RV Automoviles
            </p>
          </div>
          <p className="mt-2 leading-relaxed">
            Tu proximo auto con informacion clara, fotos reales y documentacion disponible.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-slate-200">Contacto (ejemplo)</p>
          <p>Telefono: +54 9 11 2345 6789</p>
          <p>Instagram: @rv.automoviles</p>
          <p>Facebook: RV Automoviles</p>
        </div>
      </div>
    </footer>
  );
}
