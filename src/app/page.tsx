import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="w-full text-slate-100">
        <section className="animate-fade-up relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="mx-auto grid min-h-[70vh] w-full max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-sky-300/40 bg-sky-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-sky-200">
                RV Automóviles
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
                Diseño moderno, información clara y unidades listas para ver
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Publicamos vehículos con una presentación profesional: fotos reales, ficha completa y
                contacto directo para avanzar rápido.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">100%</p>
                  <p className="mt-1 text-xs text-slate-300">Publicaciones con datos reales</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">24h</p>
                  <p className="mt-1 text-xs text-slate-300">Respuesta por canales digitales</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">1 clic</p>
                  <p className="mt-1 text-xs text-slate-300">Acceso desde redes a cada ficha</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 shadow-[0_20px_80px_rgba(14,165,233,0.18)] backdrop-blur-sm transition duration-500 hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-white">Experiencia premium para clientes</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>Catálogo optimizado para móvil y desktop.</li>
                <li>Galería visual por unidad con información útil.</li>
                <li>Proceso de consulta ágil y profesional.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-slate-900/90 py-20">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Información útil para visitarnos</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-xl font-semibold text-white">Ubicación estratégica</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Estamos en una zona comercial de fácil acceso. Coordiná visita para ver unidades
                  en persona y agilizar tu decisión.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-xl font-semibold text-white">Horarios de atención</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Lunes a viernes de 9:00 a 18:30 y sábados de 9:30 a 13:30. También respondemos
                  consultas por canales digitales.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-xl font-semibold text-white">Canales de contacto</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Atención por WhatsApp, Instagram y Facebook para precio, financiación, permutas y
                  disponibilidad de unidades.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <p className="text-xs uppercase tracking-[0.16em] text-sky-200">01</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Asesoramiento real</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Te guiamos en la elección según uso, presupuesto y necesidades concretas.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <p className="text-xs uppercase tracking-[0.16em] text-sky-200">02</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Publicaciones confiables</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Cada unidad se publica con datos útiles, fotos actuales y contexto claro.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <p className="text-xs uppercase tracking-[0.16em] text-sky-200">03</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Seguimiento rápido</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Respondemos consultas de forma ágil para que avances sin fricción.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
