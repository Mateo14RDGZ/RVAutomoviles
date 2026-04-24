import Link from "next/link";
import { PublicChrome } from "@/components/public-chrome";

const MAPS_SHORT_URL = "https://maps.app.goo.gl/XHWmX8T1a47y4VPP9";
/** Coordenadas del local (RV Automóviles) según el enlace compartido en Google Maps */
const MAP_EMBED_QUERY = "-33.5338118,-56.8898191";

export default function HomePage() {
  return (
    <PublicChrome>
      <main className="w-full text-slate-900">
        {/* Hero */}
        <section className="animate-fade-up relative overflow-hidden border-b border-rv-accent/12 bg-white">
          <div className="pointer-events-none absolute -left-20 top-2 h-52 w-52 rounded-full bg-rv-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-24 h-40 w-40 rounded-full bg-rv-accent/10 blur-3xl" />
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-14">
            <p className="inline-flex rounded-full border border-rv-accent/25 bg-rv-accent/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-rv-accent">
              RV Automoviles · Uruguay
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Usados con data clara, fotos de verdad y un catálogo que se entiende desde el celu
            </h1>
            <p className="mt-5 max-w-2xl border-l-4 border-rv-accent bg-rv-accent/[0.06] py-3 pl-4 pr-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Armamos la ficha pública de cada unidad para que la compartas por WhatsApp o redes, y un
              panel liviano para que publiques o saques autos del listado sin complicarte.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/catalogo"
                className="rv-btn-primary inline-flex w-full justify-center sm:w-auto"
              >
                Ver autos en venta
              </Link>
              <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
                Entrá al catálogo y elegí el que te interese: modelo, año y precio al toque.
              </p>
            </div>
          </div>
        </section>

        {/* Por qué conviene */}
        <section className="border-b border-slate-200/80 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">
                Por qué conviene
              </h2>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Menos vueltas, más ventas
              </p>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                Pensado para una automotora uruguaya: lo importante arriba, sin relleno, con buena
                lectura en pantalla chica.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <article className="rounded-2xl border border-rv-accent/15 bg-slate-50/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-rv-accent">Catálogo online</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Listado ordenado: foto, marca, modelo, año y precio. Ideal para mandar el link y que el
                  cliente se ubique al toque.
                </p>
              </article>
              <article className="rounded-2xl border border-rv-accent/15 bg-slate-50/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-rv-accent">Ficha por unidad</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Cada auto con galería, datos, equipamiento y documentación si la cargaste. Todo en
                  una sola página para compartir.
                </p>
              </article>
              <article className="rounded-2xl border border-rv-accent/15 bg-slate-50/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-rv-accent">Panel de gestión</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Cargá fotos, editá textos y marcá si está publicado o no. Sirve desde la compu o desde
                  el celular cuando estás en la vuelta.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Cómo funciona — pasos */}
        <section className="border-b border-rv-accent/10 bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">
                Cómo funciona
              </h2>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Tres pasos nomás
              </p>
            </div>
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              <li className="relative rounded-2xl border border-white bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-accent text-sm font-bold text-white">
                  1
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">Cargás la unidad</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Entrás al panel, completás datos y subís las fotos. Si falta algo, lo editás cuando
                  quieras.
                </p>
              </li>
              <li className="relative rounded-2xl border border-white bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-accent text-sm font-bold text-white">
                  2
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">Publicás en el catálogo</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Cuando la marcás publicada, aparece en &ldquo;Autos en venta&rdquo; con el resto del
                  stock.
                </p>
              </li>
              <li className="relative rounded-2xl border border-white bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-accent text-sm font-bold text-white">
                  3
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">Compartís el link</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Copiás el enlace de la ficha y lo mandás por WhatsApp, Instagram o como prefieras: el
                  cliente ve todo en limpio.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Ubicación + mapa */}
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">
                  Dónde estamos
                </h2>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Pasá a saludar o coordiná una visita
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Acá abajo tenés el mapa con la ubicación de <strong className="text-slate-800">RV Automóviles</strong>.
                  Si preferís abrirlo en la app de Google Maps, usá el botón y te lleva directo.
                </p>
                <a
                  href={MAPS_SHORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-xl border border-rv-accent/30 bg-rv-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rv-accent/90"
                >
                  Abrir en Google Maps
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-rv-accent/20 bg-slate-100 shadow-[0_12px_40px_rgba(30,166,247,0.12)]">
                <iframe
                  title="Ubicación de RV Automóviles en Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&hl=es&z=17&output=embed`}
                  className="aspect-[4/3] min-h-[260px] w-full border-0 sm:min-h-[320px] lg:aspect-auto lg:min-h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="border-t border-rv-accent/12 bg-slate-50 py-10 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="text-sm text-slate-600 sm:text-base">
              ¿Tenés dudas sobre algún usado?{" "}
              <Link href="/catalogo" className="font-semibold text-rv-accent underline-offset-2 hover:underline">
                Mirá el catálogo
              </Link>{" "}
              o escribinos por los canales que figuran abajo en el pie de página.
            </p>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
