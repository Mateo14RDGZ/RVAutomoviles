import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="w-full text-slate-100">
        <section className="animate-fade-up relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-20 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <p className="inline-flex rounded-full border border-sky-300/40 bg-sky-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                  RV Automoviles
                </p>
                <h1 className="text-3xl font-black leading-tight sm:text-5xl">
                  Autos publicados con nivel premium para vender mas rapido
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  Una experiencia 100% mobile: catalogo claro, ficha completa y fotos optimizadas para
                  que cada cliente pueda recorrer todas las unidades sin friccion.
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xl font-semibold text-white">100%</p>
                    <p className="mt-1 text-[11px] text-slate-300">Mobile first</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xl font-semibold text-white">24h</p>
                    <p className="mt-1 text-[11px] text-slate-300">Respuesta rapida</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xl font-semibold text-white">Pro</p>
                    <p className="mt-1 text-[11px] text-slate-300">Imagen de marca</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-sky-200/20 bg-white/5 p-5 shadow-[0_20px_60px_rgba(14,165,233,0.2)] backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white sm:text-xl">Experiencia cliente impecable</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>Ficha visual con datos clave en pocos segundos.</li>
                  <li>Subida multiple de fotos mas estable para vendedores.</li>
                  <li>Navegacion simple para WhatsApp e Instagram.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-slate-900/90 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Todo pensado para vender mejor</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-lg font-semibold text-white">Diseno de alto nivel</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Identidad visual coherente, moderna y preparada para generar confianza inmediata.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-lg font-semibold text-white">Flujo de carga agil</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Mantenimiento rapido del inventario con formularios claros y feedback en tiempo real.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-lg font-semibold text-white">Orientado a conversion</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Cada pantalla ayuda a que el cliente pase de mirar a consultar en menos pasos.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
