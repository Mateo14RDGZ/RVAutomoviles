import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="w-full text-slate-100">
        <section className="animate-fade-up relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="mx-auto grid min-h-[62vh] w-full max-w-7xl items-center gap-8 px-6 py-16 lg:grid-cols-2">
            <div>
              <p className="inline-flex rounded-full border border-sky-300/40 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-sky-200">
                RV Automóviles
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                Autos publicados con información real y contacto inmediato
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-300">
                Explorá unidades con fotos actuales, detalles clave y documentación disponible para
                decidir más rápido y con seguridad.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_20px_80px_rgba(14,165,233,0.18)] backdrop-blur-sm transition duration-500 hover:-translate-y-1">
              <h2 className="text-lg font-semibold text-white">Experiencia pensada para clientes</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>Catálogo actualizado de vehículos disponibles.</li>
                <li>Ficha detallada por unidad con galería de fotos.</li>
                <li>Acceso rápido desde Instagram, WhatsApp y redes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-slate-900/90 py-16">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-xl font-semibold text-white">Ubicación</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Estamos en una zona comercial de fácil acceso. Coordiná visita para ver unidades
                  en persona y agilizar tu decisión.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-xl font-semibold text-white">Horarios de atención</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Lunes a viernes de 9:00 a 18:30 y sábados de 9:30 a 13:30. También respondemos
                  consultas por canales digitales.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40">
                <h3 className="text-xl font-semibold text-white">Canales de contacto</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Atención por WhatsApp, Instagram y Facebook para precio, financiación, permutas y
                  disponibilidad de unidades.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-16">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <h3 className="text-xl font-semibold text-white">Asesoramiento profesional</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Te acompañamos para elegir el vehículo que mejor se adapta a tu presupuesto y uso
                  diario, con transparencia en cada publicación.
                </p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <h3 className="text-xl font-semibold text-white">Publicaciones claras y completas</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Cada unidad incluye datos relevantes, galería visual y acceso a documentación para
                  que tengas contexto real antes de contactar.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
