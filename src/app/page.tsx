import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="w-full text-slate-900">
        <section className="animate-fade-up relative overflow-hidden border-b border-rv-accent/12 bg-white">
          <div className="pointer-events-none absolute -left-20 top-2 h-52 w-52 rounded-full bg-rv-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-24 h-40 w-40 rounded-full bg-rv-accent/10 blur-3xl" />
          <div className="mx-auto max-w-5xl px-4 pb-14 pt-12 sm:px-6">
            <p className="inline-flex rounded-full border border-rv-accent/25 bg-rv-accent/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-rv-accent">
              RV Automoviles
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Presentacion minimalista y profesional para vender tus autos desde mobile
            </h1>
            <p className="mt-4 max-w-2xl border-l-4 border-rv-accent bg-rv-accent/[0.06] py-3 pl-4 pr-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Catalogo optimizado, ficha completa por enlace y panel simple para publicar unidades con
              fotos reales y datos claros.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-rv-accent/20 bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-semibold text-rv-accent">100%</p>
                <p className="text-[11px] text-slate-600">Mobile</p>
              </div>
              <div className="rounded-2xl border border-rv-accent/20 bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-semibold text-rv-accent">Pro</p>
                <p className="text-[11px] text-slate-600">Imagen</p>
              </div>
              <div className="rounded-2xl border border-rv-accent/20 bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-semibold text-rv-accent">Agil</p>
                <p className="text-[11px] text-slate-600">Gestion</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            <article className="rounded-2xl border border-rv-accent/15 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-rv-accent">Catalogo claro</h3>
              <p className="mt-2 text-sm text-slate-600">Listado rapido con foco en foto, modelo, año y precio.</p>
            </article>
            <article className="rounded-2xl border border-rv-accent/15 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-rv-accent">Ficha completa</h3>
              <p className="mt-2 text-sm text-slate-600">Cada auto con datos, equipamiento y documentacion disponible.</p>
            </article>
            <article className="rounded-2xl border border-rv-accent/15 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-rv-accent">Panel simple</h3>
              <p className="mt-2 text-sm text-slate-600">Carga de unidades pensada para celular y escritorio.</p>
            </article>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
