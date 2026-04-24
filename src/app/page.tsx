import { PublicChrome } from "@/components/public-chrome";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold text-white">Bienvenidos a RV Automoviles</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Somos una automotora enfocada en ofrecer unidades seleccionadas con informacion clara,
            documentacion disponible y una experiencia simple para ver cada auto desde el celular.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Que vas a encontrar</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Un catalogo actualizado de autos publicados.</li>
              <li>Ficha completa por unidad con fotos, datos y documentacion.</li>
              <li>Acceso rapido desde Instagram, WhatsApp y redes sociales.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Nuestro compromiso</h2>
            <p className="mt-3 text-sm text-slate-300">
              Brindarte transparencia en cada publicacion para que puedas evaluar cada vehiculo con
              toda la informacion necesaria antes de contactarnos.
            </p>
          </article>
        </section>
      </main>
    </PublicChrome>
  );
}
