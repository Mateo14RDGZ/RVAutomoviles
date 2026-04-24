import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="w-full text-slate-100">
        <section className="animate-fade-up relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="pointer-events-none absolute -left-20 top-2 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="mx-auto max-w-5xl px-4 pb-14 pt-12 sm:px-6">
            <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-200">
              RV Automoviles
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
              Presentacion minimalista y profesional para vender tus autos desde mobile
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Catalogo optimizado, ficha completa por enlace y panel simple para publicar unidades con
              fotos reales y datos claros.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-lg font-semibold text-white">100%</p>
                <p className="text-[11px] text-slate-300">Mobile</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-lg font-semibold text-white">Pro</p>
                <p className="text-[11px] text-slate-300">Imagen</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-lg font-semibold text-white">Agil</p>
                <p className="text-[11px] text-slate-300">Gestion</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/90 py-12">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-white">Catalogo claro</h3>
              <p className="mt-2 text-sm text-slate-300">Listado rapido con foco en foto, modelo, año y precio.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-white">Ficha completa</h3>
              <p className="mt-2 text-sm text-slate-300">Cada auto con datos, equipamiento y documentacion disponible.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-white">Panel simple</h3>
              <p className="mt-2 text-sm text-slate-300">Carga de unidades pensada para celular y escritorio.</p>
            </article>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
