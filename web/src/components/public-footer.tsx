export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-sky-300/20 bg-slate-950/95">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 text-sm text-slate-400 md:grid-cols-2">
        <div>
          <p className="inline-flex rounded-xl border border-sky-300/25 bg-sky-300/10 px-3 py-1.5 text-base font-extrabold tracking-[0.08em] text-sky-100">
            RV Automoviles
          </p>
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
