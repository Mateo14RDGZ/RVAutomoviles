import Image from "next/image";
import Link from "next/link";
import { LatestIngresosWidget } from "@/components/latest-ingresos-widget";
import { MiautoPopupButton } from "@/components/miauto-popup-button";
import { PublicChrome } from "@/components/public-chrome";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

const MAPS_SHORT_URL = "https://maps.app.goo.gl/XHWmX8T1a47y4VPP9";
/** Coordenadas del local (RV Automóviles) según el enlace compartido en Google Maps */
const MAP_EMBED_QUERY = "-33.5338118,-56.8898191";

export default async function HomePage() {
  const all = await listVehicles();
  const latestIngresos = all
    .filter((v) => v.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const dealerJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "RV Automóviles",
    url: "https://rv-automovilesig.vercel.app",
    areaServed: "Uruguay",
    telephone: "+59899744203",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UY",
    },
    sameAs: ["https://instagram.com/rv.automoviles"],
  };

  return (
    <PublicChrome>
      <main className="relative w-full pb-24 text-slate-900 sm:pb-0">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(30,166,247,0.16),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(30,166,247,0.12),transparent_34%)]" />

        <section className="rv-mobile-enter rv-mobile-enter-1 relative overflow-hidden border-b border-rv-accent/15 bg-white">
          <div className="mx-auto max-w-5xl px-3 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-14">
            <div>
              <p className="inline-flex rounded-full border border-rv-accent/30 bg-rv-accent/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-rv-accent">
                RV Automóviles · Uruguay
              </p>
              <h1 className="rv-mobile-title mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Compra tu próximo auto con una web pensada para decidir rápido
              </h1>
              <p className="rv-mobile-muted mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
                Catálogo claro, fichas completas y un proceso de consulta directo. Todo con una experiencia
                visual moderna y mobile-first.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/catalogo" className="rv-btn-primary inline-flex w-full justify-center sm:w-auto">
                  Empezar ahora
                </Link>
                <a href="#financiacion-bancaria" className="rv-btn-secondary inline-flex w-full justify-center sm:w-auto">
                  Ver financiación
                </a>
              </div>
            </div>
          </div>
        </section>

        <LatestIngresosWidget vehicles={latestIngresos} />

        <section className="rv-mobile-enter rv-mobile-enter-3 border-b border-rv-accent/15 bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-5xl px-3 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">Propuesta</h2>
              <p className="rv-mobile-title mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Una experiencia estilo producto premium
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
              <article className="rv-mobile-card rounded-2xl p-5">
                <p className="text-sm font-semibold text-rv-accent">Entrada dinámica</p>
                <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">
                  Cada bloque aparece con transiciones progresivas para guiar la mirada del cliente.
                </p>
              </article>
              <article className="rv-mobile-card rounded-2xl p-5">
                <p className="text-sm font-semibold text-rv-accent">Distribución clara</p>
                <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">
                  Estructura orientada a decisión: hero, ingresos, beneficios, financiación y contacto.
                </p>
              </article>
              <article className="rv-mobile-card rounded-2xl p-5">
                <p className="text-sm font-semibold text-rv-accent">Identidad consistente</p>
                <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">
                  Paleta limpia en blanco y celeste con estética tecnológica, sin secciones oscuras.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="financiacion-bancaria"
          className="rv-mobile-enter rv-mobile-enter-4 relative overflow-hidden border-b border-rv-accent/15 bg-gradient-to-b from-[#f4fafe] via-[#eef7ff] to-white py-10 text-slate-900 sm:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(30,166,247,0.22),transparent_48%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.14),transparent_42%)]" />
          <div className="mx-auto max-w-5xl px-3 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-rv-accent/20 bg-gradient-to-br from-slate-950 via-[#0b1d3c] to-[#113969] p-6 text-white shadow-[0_24px_80px_rgba(9,24,60,0.28)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                <div>
                  <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
                    Financiación destacada
                  </p>
                  <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    MiAuto Santander: simulá tu préstamo y sacá tu auto con financiación ágil
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
                    Inspirado en la propuesta oficial de MiAuto, destacamos sus líneas de Crédito Convencional,
                    Cuota Aguinaldo y Compra Inteligente para ayudarte a elegir la mejor modalidad.
                  </p>
                  <p className="mt-4 text-sm font-medium text-slate-100 sm:text-base">
                    En RV Automóviles trabajamos con Santander y también con todos los bancos para encontrar la mejor
                    opción para cada cliente.
                  </p>
                  <div className="mt-4 grid gap-2 text-xs text-slate-300 sm:grid-cols-3 sm:text-sm">
                    <span className="rounded-xl border border-white/20 bg-white/5 px-3 py-2">Simulación fácil y sin compromiso</span>
                    <span className="rounded-xl border border-white/20 bg-white/5 px-3 py-2">Asesoramiento de punta a punta</span>
                    <span className="rounded-xl border border-white/20 bg-white/5 px-3 py-2">Respaldo de Grupo Santander en Uruguay</span>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
                    {["BROU", "Santander", "BBVA", "Scotiabank", "Itaú", "HSBC", "Banco República"].map((bank) => (
                      <span
                        key={bank}
                        className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-center text-xs font-semibold text-white shadow-sm backdrop-blur sm:text-sm"
                      >
                        {bank}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7">
                    <MiautoPopupButton />
                    <p className="mt-2 text-xs text-slate-300">
                      Este botón abre en popup el simulador oficial de MiAuto Santander.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/15 bg-white p-4">
                    <Image
                      src="/financiacion/miauto-logo.png"
                      alt="MiAuto Santander"
                      width={500}
                      height={154}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-white/20">
                    <Image
                      src="/financiacion/credito-miauto.jpg"
                      alt="Crédito MiAuto para financiación automotriz"
                      width={1600}
                      height={1067}
                      className="h-52 w-full object-cover sm:h-64"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white sm:text-base">
                      Crédito MiAuto: financiá tu próximo vehículo con respaldo real.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rv-mobile-enter rv-mobile-enter-5 border-b border-rv-accent/10 bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-5xl px-3 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">Cómo funciona</h2>
              <p className="rv-mobile-title mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Tres pasos nomás
              </p>
            </div>
            <ol className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
              <li className="rv-mobile-card rounded-2xl p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-accent text-sm font-bold text-white">1</span>
                <h3 className="mt-4 font-semibold text-slate-900">Elegís el auto</h3>
                <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">
                  Navegás el catálogo y abrís la ficha con fotos y datos claros.
                </p>
              </li>
              <li className="rv-mobile-card rounded-2xl p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-accent text-sm font-bold text-white">2</span>
                <h3 className="mt-4 font-semibold text-slate-900">Simulás financiación</h3>
                <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">
                  Te mostramos alternativas de bancos para definir la mejor cuota.
                </p>
              </li>
              <li className="rv-mobile-card rounded-2xl p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rv-accent text-sm font-bold text-white">3</span>
                <h3 className="mt-4 font-semibold text-slate-900">Coordinás visita</h3>
                <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">
                  Confirmás disponibilidad y avanzás directo por WhatsApp.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="rv-mobile-enter rv-mobile-enter-6 bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-5xl px-3 sm:px-6">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">Dónde estamos</h2>
                <p className="rv-mobile-title mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Pasá a saludar o coordiná una visita
                </p>
                <p className="rv-mobile-muted mt-3 text-sm leading-relaxed sm:text-base">
                  Acá abajo tenés el mapa con la ubicación de <strong className="text-slate-800">RV Automóviles</strong>.
                </p>
                <a
                  href={MAPS_SHORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv-btn-primary mt-6 inline-flex w-full items-center justify-center sm:w-auto"
                >
                  Abrir en Google Maps
                </a>
              </div>
              <div className="rv-mobile-card overflow-hidden rounded-2xl border border-rv-accent/20 bg-slate-100 shadow-[0_12px_40px_rgba(30,166,247,0.12)]">
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

      </main>
    </PublicChrome>
  );
}
