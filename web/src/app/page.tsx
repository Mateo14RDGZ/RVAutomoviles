import Image from "next/image";
import Link from "next/link";
import { LatestIngresosWidget } from "@/components/latest-ingresos-widget";
import { MiautoPopupButton } from "@/components/miauto-popup-button";
import { PublicChrome } from "@/components/public-chrome";
import { Reveal } from "@/components/reveal";
import { listVehicles } from "@/lib/vehicle-store";
import { buildWhatsappUrl } from "@/lib/whatsapp-visit";

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
    sameAs: ["https://www.instagram.com/rv__automoviles/"],
  };

  return (
    <PublicChrome>
      <main className="relative w-full overflow-hidden pb-24 text-slate-900 sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }}
        />

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-rv-accent/15 bg-white">
          <div className="rv-aurora" aria-hidden />
          <div className="rv-grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-3 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
            <Reveal variant="soft">
              <span className="rv-chip rv-mobile-glow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" aria-hidden />
                RV Automóviles · Uruguay
              </span>
            </Reveal>

            <Reveal variant="soft" delay={120}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                <span className="rv-text-gradient-anim">Tu próximo auto</span>
                <span className="block text-slate-900">con una experiencia futurista.</span>
              </h1>
            </Reveal>

            <Reveal variant="soft" delay={220}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Catálogo claro, fichas con fotos reales, simulador de financiación oficial y atención
                directa por WhatsApp. Diseñado mobile-first para que decidas rápido.
              </p>
            </Reveal>

            <Reveal variant="up" delay={320}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/catalogo"
                  className="rv-btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Ver catálogo
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <a
                  href="#financiacion-bancaria"
                  className="rv-btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Simular financiación
                </a>
              </div>
            </Reveal>

            <Reveal variant="up" delay={420}>
              <dl className="mt-10 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3">
                {[
                  { k: "Stock", v: "Actualizado" },
                  { k: "Bancos", v: "Todos" },
                  { k: "Atención", v: "Directa" },
                ].map((stat) => (
                  <div
                    key={stat.k}
                    className="rv-glow-ring relative rounded-2xl border border-rv-accent/15 bg-white/70 px-3 py-3 text-center backdrop-blur"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rv-accent">
                      {stat.k}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-slate-900 sm:text-base">{stat.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div className="rv-divider" aria-hidden />
        </section>

        <Reveal>
          <LatestIngresosWidget vehicles={latestIngresos} />
        </Reveal>

        {/* PROPUESTA / VALOR */}
        <section className="relative overflow-hidden border-b border-rv-accent/15 bg-white py-12 sm:py-20">
          <div className="rv-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
            <Reveal>
              <div className="max-w-2xl">
                <span className="rv-chip">Propuesta</span>
                <p className="rv-mobile-title mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
                  Tecnología, claridad y respaldo en cada paso
                </p>
                <p className="rv-mobile-muted mt-3 text-sm leading-relaxed sm:text-base">
                  Cada bloque está pensado para que decidas con confianza y la web te acompañe con
                  fluidez en mobile y desktop.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
              {[
                {
                  title: "Catálogo en vivo",
                  desc: "Stock real con fotos y datos. Tocá una unidad y abrís la ficha completa.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  title: "Financiación ágil",
                  desc: "Simulá MiAuto Santander en popup oficial y trabajamos con todos los bancos.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M3 10h18M5 10v8a2 2 0 002 2h10a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M2 8l10-5 10 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  title: "Atención directa",
                  desc: "Coordinás visita por WhatsApp y recibís respuesta el mismo día.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M20 12a8 8 0 11-3.5-6.6L20 4l-1 4-3.4-.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M9 13c1 2 3 4 5 5l2-2c.3-.3.7-.4 1.1-.2l2.5 1c.4.2.6.6.5 1A4 4 0 0116 21a13 13 0 01-13-13 4 4 0 013.2-3.9.8.8 0 011 .5l1 2.5a.9.9 0 01-.2 1z" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  ),
                },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 90}>
                  <article className="rv-mobile-card rv-glow-ring group relative h-full overflow-hidden rounded-2xl border border-rv-accent/20 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(30,166,247,0.18)]">
                    <span
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-rv-accent/10 blur-3xl transition-opacity duration-300 group-hover:opacity-90"
                      aria-hidden
                    />
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rv-accent/[0.12] text-rv-accent ring-1 ring-rv-accent/30">
                      {card.icon}
                    </span>
                    <p className="mt-4 text-base font-semibold text-slate-900">{card.title}</p>
                    <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">{card.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINANCIACIÓN */}
        <section
          id="financiacion-bancaria"
          className="relative overflow-hidden border-b border-rv-accent/15 bg-gradient-to-b from-[#f4fafe] via-[#eef7ff] to-white py-12 text-slate-900 sm:py-20"
        >
          <div className="rv-aurora" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
            <Reveal>
              <div className="rv-glass-dark relative overflow-hidden rounded-3xl p-6 text-white sm:p-10">
                <span
                  className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
                  aria-hidden
                />

                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
                      Financiación destacada
                    </span>
                    <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                      MiAuto Santander: simulá tu préstamo y sacá tu auto con financiación ágil
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
                      Línea oficial de Santander para vehículos. Acá te resumimos sus tres modalidades y te
                      acercamos al simulador real, sin formularios intermedios.
                    </p>
                    <p className="mt-4 text-sm font-medium text-slate-100 sm:text-base">
                      Trabajamos con Santander y con todos los bancos del mercado, así te ayudamos a elegir la
                      mejor opción.
                    </p>

                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                      {[
                        { name: "Crédito Convencional" },
                        { name: "Cuota Aguinaldo" },
                        { name: "Compra Inteligente" },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className="rv-glow-ring relative rounded-xl border border-white/15 bg-white/10 p-3 transition hover:bg-white/15"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200">
                            Producto
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">{p.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-2 text-xs text-slate-200 sm:grid-cols-3 sm:text-sm">
                      <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                        Simulación sin compromiso
                      </span>
                      <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                        Asesoramiento de punta a punta
                      </span>
                      <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                        Respaldo Grupo Santander
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {["BROU", "Santander", "BBVA", "Scotiabank", "Itaú", "HSBC", "Banco República"].map(
                        (bank) => (
                          <span
                            key={bank}
                            className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur sm:text-sm"
                          >
                            {bank}
                          </span>
                        )
                      )}
                    </div>

                    <div className="mt-7">
                      <MiautoPopupButton />
                      <p className="mt-2 text-xs text-slate-300">
                        Abre el simulador oficial de MiAuto Santander en una ventana popup.
                      </p>
                    </div>

                    <div className="mt-5 rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-slate-200 sm:text-sm">
                      <p>
                        Contacto MiAuto: WhatsApp{" "}
                        <a
                          href="https://wa.me/59892333309"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sky-200 underline underline-offset-2"
                        >
                          092 333 309
                        </a>{" "}
                        · Tel{" "}
                        <a
                          href="tel:+59827051865"
                          className="font-semibold text-sky-200 underline underline-offset-2"
                        >
                          2705 1865
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rv-glow-ring relative rounded-2xl border border-white/15 bg-white p-4">
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
                        className="h-52 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-64"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white sm:text-base">
                        Crédito MiAuto: financiá tu próximo vehículo con respaldo real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="relative overflow-hidden border-b border-rv-accent/10 bg-white py-12 sm:py-20">
          <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
            <Reveal>
              <div className="max-w-2xl">
                <span className="rv-chip">Cómo funciona</span>
                <p className="rv-mobile-title mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
                  Tres pasos nomás
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
              {[
                { n: "01", title: "Elegís el auto", desc: "Navegás el catálogo y abrís la ficha con fotos y datos claros." },
                { n: "02", title: "Simulás financiación", desc: "Te mostramos alternativas de bancos para definir la mejor cuota." },
                { n: "03", title: "Coordinás visita", desc: "Confirmás disponibilidad y avanzás directo por WhatsApp." },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 100}>
                  <li className="rv-mobile-card rv-glow-ring relative h-full list-none overflow-hidden rounded-2xl border border-rv-accent/20 bg-white p-5">
                    <span
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-rv-accent/10 blur-3xl"
                      aria-hidden
                    />
                    <span className="rv-text-gradient-anim text-3xl font-bold tracking-tight">
                      {step.n}
                    </span>
                    <h3 className="mt-3 font-semibold text-slate-900">{step.title}</h3>
                    <p className="rv-mobile-muted mt-2 text-sm leading-relaxed">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          className="relative overflow-hidden border-b border-rv-accent/10 bg-white py-12 sm:py-20"
        >
          <div className="rv-aurora opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
            <Reveal>
              <div className="rv-glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
                <span
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rv-accent/10 blur-3xl"
                  aria-hidden
                />
                <span className="rv-chip">Contacto</span>
                <p className="rv-mobile-title mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
                  Hablemos y coordinamos tu próxima visita
                </p>
                <p className="rv-mobile-muted mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
                  Respondemos consultas de financiación, disponibilidad de unidades y documentación en el día.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <a
                    href={buildWhatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv-glow-ring group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rv-accent/25 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rv-accent/[0.06] hover:shadow-[0_18px_36px_rgba(30,166,247,0.18)]"
                  >
                    <span className="flex items-center gap-2 font-semibold text-rv-accent">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path
                          d="M20.5 3.5A11 11 0 003.5 18.6L2 22l3.5-1.4A11 11 0 1020.5 3.5z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      WhatsApp
                    </span>
                    <span className="rv-btn-primary !px-3 !py-1.5 !text-xs sm:!text-sm">Hacenos tu consulta</span>
                  </a>

                  <a
                    href="https://www.instagram.com/rv__automoviles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv-glow-ring group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rv-accent/25 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rv-accent/[0.06] hover:shadow-[0_18px_36px_rgba(30,166,247,0.18)]"
                  >
                    <span className="flex items-center gap-2 font-semibold text-rv-accent">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                      </svg>
                      Instagram
                    </span>
                    <span className="text-sm font-medium text-slate-700 underline decoration-rv-accent/40 underline-offset-2">
                      Seguinos en Instagram
                    </span>
                  </a>

                  <div className="rv-glow-ring relative rounded-2xl border border-rv-accent/20 bg-white px-4 py-3 sm:col-span-2 lg:col-span-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-rv-accent">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      Horarios
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Lunes a Viernes de 8:00 a 18:00</p>
                    <p className="text-sm text-slate-600">Sábados de 8:00 a 12:00</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* UBICACIÓN */}
        <section id="ubicacion" className="relative overflow-hidden bg-white py-12 sm:py-20">
          <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <Reveal>
                <div>
                  <span className="rv-chip">Dónde estamos</span>
                  <p className="rv-mobile-title mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
                    Pasá a saludar o coordiná una visita
                  </p>
                  <p className="rv-mobile-muted mt-3 text-sm leading-relaxed sm:text-base">
                    Acá abajo tenés el mapa con la ubicación de{" "}
                    <strong className="text-slate-800">RV Automóviles</strong>.
                  </p>
                  <a
                    href={MAPS_SHORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv-btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                  >
                    Abrir en Google Maps
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="rv-glow-ring rv-mobile-card overflow-hidden rounded-2xl border border-rv-accent/20 bg-slate-100 shadow-[0_18px_50px_rgba(30,166,247,0.14)]">
                  <iframe
                    title="Ubicación de RV Automóviles en Google Maps"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&hl=es&z=17&output=embed`}
                    className="aspect-[4/3] min-h-[260px] w-full border-0 sm:min-h-[320px] lg:aspect-auto lg:min-h-[360px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </PublicChrome>
  );
}
