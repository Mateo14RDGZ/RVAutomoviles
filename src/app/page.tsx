import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="animate-fade-up rounded-2xl border border-sky-300/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-[0_10px_40px_rgba(14,165,233,0.12)]">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Bienvenidos a RV Automoviles</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Encontrá autos publicados con datos reales, fotos actuales y acceso rápido desde tu
            celular para consultar disponibilidad en minutos.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.08]">
            <h2 className="text-lg font-semibold text-white">Qué vas a encontrar</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Un catalogo actualizado de autos publicados.</li>
              <li>Ficha completa por unidad con fotos, datos y documentacion.</li>
              <li>Acceso rapido desde Instagram, WhatsApp y redes sociales.</li>
            </ul>
          </article>

          <article className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.08]">
            <h2 className="text-lg font-semibold text-white">Atención y asesoramiento</h2>
            <p className="mt-3 text-sm text-slate-300">
              Te acompañamos en la elección con información clara, opciones según presupuesto y
              seguimiento en todo el proceso de compra.
            </p>
          </article>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-base font-semibold text-white">Ubicación</h2>
            <p className="mt-3 text-sm text-slate-300">
              Zona comercial de fácil acceso. Coordiná visita por mensaje para una atención más
              rápida y personalizada.
            </p>
          </article>
          <article className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-base font-semibold text-white">Horarios de atención</h2>
            <p className="mt-3 text-sm text-slate-300">
              Lunes a viernes de 9:00 a 18:30 y sábados de 9:30 a 13:30. Respondemos consultas online
              durante todo el día.
            </p>
          </article>
          <article className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-base font-semibold text-white">Canales de contacto</h2>
            <p className="mt-3 text-sm text-slate-300">
              WhatsApp, Instagram y Facebook para consultas de precio, disponibilidad y toma de usado.
            </p>
          </article>
        </section>
      </main>
    </PublicChrome>
  );
}
