import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "../components/animated-counter";
import { CursorOrb } from "../components/cursor-orb";
import { LatestIngresosWidget } from "../components/latest-ingresos-widget";
import { Marquee } from "../components/marquee";
import { MiautoPopupButton } from "../components/miauto-popup-button";
import { PublicChrome } from "../components/public-chrome";
import { Reveal } from "../components/reveal";
import { StaggerText } from "../components/stagger-text";
import { WhatsappIcon } from "../components/icons/whatsapp-icon";
import { listVehicles } from "@/lib/vehicle-store";
import { buildWhatsappUrl } from "@/lib/whatsapp-visit";

export const dynamic = "force-dynamic";

const MAPS_SHORT_URL = "https://maps.app.goo.gl/XHWmX8T1a47y4VPP9";
const MAP_EMBED_QUERY = "-33.5338118,-56.8898191";

const BANK_LIST = ["BROU", "Santander", "BBVA", "Scotiabank", "Itaú", "HSBC", "Banco República"] as const;

export default async function HomePage() {
  const all = await listVehicles();
  const published = all.filter((v) => v.published);
  const latestIngresos = published
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stockCount = published.length;
  const brandCount = new Set(published.map((v) => v.brand.trim().toLowerCase()).filter(Boolean)).size;

  /* Foto real para el hero: primera foto del primer auto publicado */
  const heroVehicle = latestIngresos[0] ?? null;
  const heroPhoto = heroVehicle?.photos?.[0] ?? null;

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
      <main className="relative w-full overflow-hidden pb-24 text-rv-text sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }}
        />

        {/* HERO ============================================================ */}
        <section className="relative isolate overflow-hidden border-b border-rv-border bg-rv-deep">
          <div className="rv-aurora" aria-hidden />
          <CursorOrb />

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-28 sm:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              {/* Columna izquierda: copy */}
              <div>
                <Reveal variant="soft">
                  <span className="rv-chip rv-mobile-glow">
                    <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center" aria-hidden>
                      <span className="absolute inset-0 animate-ping rounded-full bg-rv-accent/60" />
                      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" />
                    </span>
                    Automotora · Uruguay
                  </span>
                </Reveal>

                <h1 className="rv-display mt-6 text-[2.75rem] font-bold leading-[0.98] sm:text-[4.5rem]">
                  <StaggerText text="Tu próximo auto" className="text-rv-text" />
                  <span className="block">
                    <StaggerText
                      text="te está esperando."
                      className="rv-text-gradient-anim"
                    />
                  </span>
                </h1>

                <Reveal variant="soft" delay={360}>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-rv-muted sm:text-lg">
                    Catálogo actualizado, fichas con fotos reales y financiación con todos los bancos.
                    Pensada para que elijas tu próximo auto sin vueltas.
                  </p>
                </Reveal>

                <Reveal variant="up" delay={480}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/catalogo"
                      className="rv-btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                      Explorar catálogo
                      <span aria-hidden>→</span>
                    </Link>
                    <a
                      href="#financiacion-bancaria"
                      className="rv-btn-ghost inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                      Simular financiación
                    </a>
                  </div>
                </Reveal>

                <Reveal variant="up" delay={580}>
                  <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-rv-border pt-6 sm:max-w-xl sm:gap-6">
                    <div>
                      <dt className="rv-eyebrow">Stock</dt>
                      <dd className="rv-mono mt-1.5 text-2xl font-bold text-rv-text sm:text-3xl">
                        {stockCount > 0 ? <AnimatedCounter value={stockCount} /> : "—"}
                      </dd>
                      <p className="mt-0.5 text-[11px] text-rv-muted">
                        {stockCount === 1 ? "unidad publicada" : "unidades publicadas"}
                      </p>
                    </div>
                    <div>
                      <dt className="rv-eyebrow">Marcas</dt>
                      <dd className="rv-mono mt-1.5 text-2xl font-bold text-rv-text sm:text-3xl">
                        {brandCount > 0 ? <AnimatedCounter value={brandCount} /> : "—"}
                      </dd>
                      <p className="mt-0.5 text-[11px] text-rv-muted">en catálogo</p>
                    </div>
                    <div>
                      <dt className="rv-eyebrow flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full bg-emerald-400" aria-hidden />
                        Estado
                      </dt>
                      <dd className="mt-1.5 text-2xl font-bold text-rv-text sm:text-3xl">Activo</dd>
                      <p className="mt-0.5 text-[11px] text-rv-muted">L–V 8/18h · Sáb 8/12h</p>
                    </div>
                  </dl>
                </Reveal>
              </div>

              {/* Columna derecha: foto real del último auto */}
              <Reveal variant="zoom" delay={300} className="hidden lg:block">
                {heroPhoto ? (
                  <Link
                    href={`/v/${heroVehicle?.urlSlug}`}
                    className="rv-glow-ring group relative block aspect-[4/5] overflow-hidden rounded-[2rem] border border-rv-border shadow-[0_30px_80px_rgba(2,6,23,0.55)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroPhoto}
                      alt={`${heroVehicle?.brand} ${heroVehicle?.model}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rv-deep/90 via-rv-deep/30 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <span className="rv-chip border-white/30 bg-white/10 text-white backdrop-blur">
                        Recién ingresado
                      </span>
                    </div>
                    <div className="absolute inset-x-5 bottom-5">
                      <p className="rv-eyebrow text-rv-accent-2">Último ingreso</p>
                      <p className="rv-display mt-1 text-2xl font-bold text-white sm:text-3xl">
                        {heroVehicle?.brand} {heroVehicle?.model}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                        <span>{heroVehicle?.year}</span>
                        {heroVehicle?.mileageKm != null ? (
                          <>
                            <span aria-hidden>·</span>
                            <span>{heroVehicle.mileageKm.toLocaleString("es-AR")} km</span>
                          </>
                        ) : null}
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-rv-accent-2 transition-transform group-hover:translate-x-0.5">
                        Ver ficha
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="rv-glow-ring relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-rv-border bg-rv-surface/60 p-8 shadow-[0_30px_80px_rgba(2,6,23,0.55)]">
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.32),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.28),transparent_55%)]"
                      aria-hidden
                    />
                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <span className="rv-chip">Showroom virtual</span>
                        <p className="rv-display mt-4 text-3xl font-bold text-rv-text">
                          Pronto sumamos unidades.
                        </p>
                      </div>
                      <p className="text-sm text-rv-muted">
                        Visitanos por WhatsApp para conocer las próximas oportunidades.
                      </p>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>

          {/* Banda mobile con foto real (solo si hay) */}
          {heroPhoto ? (
            <Link
              href={`/v/${heroVehicle?.urlSlug}`}
              className="group relative block aspect-[16/9] w-full overflow-hidden border-y border-rv-border lg:hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroPhoto}
                alt={`${heroVehicle?.brand} ${heroVehicle?.model}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rv-deep via-rv-deep/40 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-4 bottom-4">
                <p className="rv-eyebrow text-rv-accent-2">Último ingreso</p>
                <p className="rv-display mt-1 text-2xl font-bold text-white">
                  {heroVehicle?.brand} {heroVehicle?.model}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                  <span>{heroVehicle?.year}</span>
                  {heroVehicle?.mileageKm != null ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>{heroVehicle.mileageKm.toLocaleString("es-AR")} km</span>
                    </>
                  ) : null}
                  <span aria-hidden>·</span>
                  <span className="font-semibold text-rv-accent-2">Ver ficha →</span>
                </div>
              </div>
            </Link>
          ) : null}

          {/* Marquee de bancos */}
          <div className="relative border-y border-rv-border bg-rv-bg2/60 py-6">
            <p className="rv-caption mx-auto mb-4 flex max-w-6xl items-center gap-3 px-4 text-rv-muted sm:px-6">
              <span className="rv-divider-soft hidden flex-1 sm:block" aria-hidden />
              Trabajamos con todos los bancos del mercado
              <span className="rv-divider-soft hidden flex-1 sm:block" aria-hidden />
            </p>
            <Marquee
              items={BANK_LIST.map((b) => (
                <span
                  key={b}
                  className="inline-flex h-10 items-center rounded-lg border border-rv-border bg-rv-surface/40 px-5 font-display text-base font-semibold tracking-tight text-rv-text/70 transition hover:bg-rv-surface hover:text-rv-text"
                >
                  {b}
                </span>
              ))}
              speed={0.85}
            />
          </div>
        </section>

        <LatestIngresosWidget vehicles={latestIngresos} />

        {/* PROPUESTA / VALOR =============================================== */}
        <section className="relative overflow-hidden border-b border-rv-border bg-rv-deep py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <Reveal variant="left">
                <div>
                  <span className="rv-chip">Por qué elegirnos</span>
                  <p className="rv-display mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                    Confianza, claridad y respaldo.
                  </p>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-rv-muted">
                    Te acompañamos en cada paso: desde elegir el auto hasta firmar la financiación,
                    con asesoramiento honesto y trato personal.
                  </p>
                </div>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <div className="rv-glow-ring relative overflow-hidden rounded-3xl border border-rv-border bg-rv-surface/40 p-6 sm:p-8">
                  <div className="rv-beam" aria-hidden />
                  <p className="text-base leading-relaxed text-rv-text">
                    Nuestro objetivo es que en una sola consulta tengas todo lo que necesitás: el auto que
                    buscás, la cuota que te calza y un canal directo con nosotros para coordinar.
                  </p>
                  <div className="rv-divider-soft mt-6" aria-hidden />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent-2">
                    Atención directa · Asesoramiento real · Documentación en regla
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
              {[
                {
                  step: "01",
                  title: "Catálogo actualizado",
                  desc: "Stock real con fotos y datos. Tocá una unidad y abrís la ficha completa al instante.",
                },
                {
                  step: "02",
                  title: "Financiación ágil",
                  desc: "Simulador MiAuto Santander oficial en popup. Trabajamos con todos los bancos.",
                },
                {
                  step: "03",
                  title: "Atención personalizada",
                  desc: "Coordinás visita por WhatsApp y recibís respuesta el mismo día.",
                },
              ].map((card, i) => (
                <Reveal key={card.title} variant="zoom" delay={i * 110}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-rv-border bg-rv-surface/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-rv-surface/70 sm:p-8">
                    <span className="rv-stat-num text-3xl font-bold sm:text-4xl">{card.step}</span>
                    <p className="rv-display mt-5 text-xl font-bold tracking-tight text-rv-text">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-rv-muted sm:text-base">{card.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINANCIACIÓN ===================================================== */}
        <section
          id="financiacion-bancaria"
          className="relative overflow-hidden border-b border-rv-border bg-rv-bg2 py-16 sm:py-28"
        >
          <div className="rv-aurora opacity-70" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            {/* Cabecera */}
            <Reveal variant="up">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="rv-chip">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" aria-hidden />
                    Financiación destacada
                  </span>
                  <p className="rv-display mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                    MiAuto Santander
                  </p>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-rv-muted">
                    Línea oficial de Santander para autos. Te llevamos directo al simulador real, sin
                    formularios intermedios.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-rv-border bg-rv-surface/60 px-3 py-2 backdrop-blur">
                  <div className="rounded-lg bg-white p-2">
                    <Image
                      src="/financiacion/miauto-logo.png"
                      alt="MiAuto Santander"
                      width={500}
                      height={154}
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-rv-text">Línea oficial</p>
                    <p className="text-rv-muted">Grupo Santander</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CTA + imagen ilustrativa */}
            <Reveal variant="up" delay={140}>
              <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:items-stretch">
                <div className="relative overflow-hidden rounded-3xl border border-rv-border bg-gradient-to-br from-rv-surface via-rv-bg2 to-rv-deep p-6 sm:p-8">
                  <div className="rv-beam" aria-hidden />
                  <p className="rv-eyebrow text-rv-accent-2">Simulá ahora</p>
                  <p className="rv-display mt-2 text-2xl font-bold leading-tight text-rv-text sm:text-3xl">
                    Calculá tu cuota en pocos clicks.
                  </p>
                  <p className="mt-3 text-base text-rv-muted">
                    Abre el simulador oficial en una ventana popup. Sin compromiso.
                  </p>
                  <div className="mt-6">
                    <MiautoPopupButton />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-rv-muted">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rv-border bg-rv-surface/60 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                      Sin compromiso
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rv-border bg-rv-surface/60 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-rv-accent-2" aria-hidden />
                      Asesoramiento incluido
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-rv-border">
                  <Image
                    src="/financiacion/credito-miauto.jpg"
                    alt="Financiación automotriz"
                    width={1600}
                    height={1067}
                    className="h-52 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-full sm:min-h-[280px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rv-deep/95 via-rv-deep/40 to-transparent" />
                  <p className="rv-display absolute bottom-4 left-5 right-5 text-base font-bold text-white sm:text-xl">
                    Financiá tu próximo vehículo con respaldo real.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Productos numerados */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
              {[
                {
                  n: "01",
                  name: "Crédito Convencional",
                  desc: "Cuotas fijas en pesos o dólares.",
                  ideal: "Ideal si buscás predictibilidad",
                },
                {
                  n: "02",
                  name: "Cuota Aguinaldo",
                  desc: "Cuotas dobles en junio y diciembre.",
                  ideal: "Ideal si cobrás aguinaldo",
                },
                {
                  n: "03",
                  name: "Compra Inteligente",
                  desc: "Cuotas bajas con valor residual.",
                  ideal: "Ideal si renovás cada 3 años",
                },
              ].map((p, i) => (
                <Reveal key={p.name} variant="up" delay={i * 90}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-rv-border bg-rv-surface/40 p-5 transition hover:border-white/15 hover:bg-rv-surface/70 sm:p-6">
                    <p className="rv-stat-num text-2xl font-bold">{p.n}</p>
                    <p className="rv-display mt-3 text-lg font-bold text-rv-text">{p.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-rv-muted">{p.desc}</p>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rv-accent-2">
                      <span aria-hidden>›</span>
                      {p.ideal}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Bancos marquee */}
            <Reveal variant="up" delay={120}>
              <div className="mt-10 rounded-2xl border border-rv-border bg-rv-surface/30 py-6">
                <p className="rv-caption mb-4 px-4 text-center text-rv-muted">
                  Trabajamos con todos los bancos
                </p>
                <Marquee
                  items={BANK_LIST.map((b) => (
                    <span
                      key={b}
                      className="inline-flex h-9 items-center rounded-lg border border-rv-border bg-rv-surface/50 px-4 font-display text-sm font-semibold tracking-tight text-rv-text/80"
                    >
                      {b}
                    </span>
                  ))}
                  speed={0.7}
                  reverse
                />
              </div>
            </Reveal>

            {/* Contacto MiAuto */}
            <Reveal variant="up" delay={160}>
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-rv-border bg-rv-surface/40 p-5 text-sm text-rv-muted sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="rv-caption normal-case tracking-normal text-rv-muted">Contacto MiAuto</p>
                  <p className="mt-0.5 text-rv-text">
                    Si querés hablar directamente con la línea de Santander.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/59892333309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv-btn-ghost"
                  >
                    WhatsApp 092 333 309
                  </a>
                  <a href="tel:+59827051865" className="rv-btn-ghost">
                    Tel 2705 1865
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CÓMO FUNCIONA ==================================================== */}
        <section className="relative overflow-hidden border-b border-rv-border bg-rv-deep py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="up">
              <div className="max-w-2xl">
                <span className="rv-chip">Cómo te acompañamos</span>
                <p className="rv-display mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Tres pasos hasta tu próximo auto.
                </p>
                <p className="mt-4 text-base leading-relaxed text-rv-muted">
                  De elegir el modelo a recibirlo en mano, te guiamos para que sea simple y sin sorpresas.
                </p>
              </div>
            </Reveal>

            <div className="relative mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
              <div
                className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-rv-accent/30 to-transparent sm:block"
                aria-hidden
              />
              {[
                {
                  n: "01",
                  title: "Elegís el modelo",
                  desc: "Navegás el catálogo y abrís la ficha con fotos, equipamiento y precio claro.",
                },
                {
                  n: "02",
                  title: "Simulás la cuota",
                  desc: "Comparamos opciones con todos los bancos para encontrar la cuota que te conviene.",
                },
                {
                  n: "03",
                  title: "Lo retirás",
                  desc: "Coordinamos la visita por WhatsApp, hacemos la prueba y entregamos el auto.",
                },
              ].map((step, i) => (
                <Reveal
                  key={step.n}
                  variant={i === 0 ? "left" : i === 2 ? "right" : "up"}
                  delay={i * 130}
                >
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-rv-border bg-rv-surface/40 p-6 sm:p-8">
                    <span className="rv-stat-num text-5xl font-bold leading-none sm:text-6xl">{step.n}</span>
                    <h3 className="rv-display mt-6 text-xl font-bold tracking-tight text-rv-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-rv-muted sm:text-base">{step.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO ========================================================= */}
        <section
          id="contacto"
          className="relative overflow-hidden border-b border-rv-border bg-rv-bg2 py-16 sm:py-28"
        >
          <div className="rv-aurora opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="zoom">
              <div className="rv-glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
                <span className="rv-chip">Contacto</span>
                <p className="rv-display mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                  Hablemos y coordinamos tu visita.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-rv-muted">
                  Respondemos consultas de financiación, disponibilidad de unidades y documentación en el día.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Reveal variant="left" delay={80}>
                    <a
                      href={buildWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-full items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rv-border bg-rv-surface/60 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-rv-surface sm:px-5"
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rv-accent/15 text-rv-accent-2 ring-1 ring-rv-accent/30">
                          <WhatsappIcon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rv-muted">
                            WhatsApp
                          </p>
                          <p className="text-base font-semibold text-rv-text">Hacenos tu consulta</p>
                        </div>
                      </span>
                      <span aria-hidden className="text-rv-accent-2 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  </Reveal>

                  <Reveal variant="up" delay={160}>
                    <a
                      href="https://www.instagram.com/rv__automoviles/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-full items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rv-border bg-rv-surface/60 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-rv-surface sm:px-5"
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rv-accent/15 text-rv-accent-2 ring-1 ring-rv-accent/30">
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rv-muted">
                            Instagram
                          </p>
                          <p className="text-base font-semibold text-rv-text">Seguinos en Instagram</p>
                        </div>
                      </span>
                      <span aria-hidden className="text-rv-accent-2 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  </Reveal>

                  <Reveal variant="right" delay={240}>
                    <div className="relative h-full rounded-2xl border border-rv-border bg-rv-surface/60 px-5 py-4 sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-3">
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-rv-accent-2">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rv-muted">
                            Horarios
                          </p>
                          <p className="text-base font-semibold text-rv-text">Lun a Sáb</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-rv-muted">Lun a Vie de 8:00 a 18:00</p>
                      <p className="text-sm text-rv-muted">Sábados de 8:00 a 12:00</p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* UBICACIÓN ======================================================== */}
        <section id="ubicacion" className="relative overflow-hidden bg-rv-deep py-16 sm:py-28">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
              <Reveal variant="left">
                <div>
                  <span className="rv-chip">Dónde estamos</span>
                  <p className="rv-display mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                    Te esperamos en el local.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-rv-muted">
                    Visitá <strong className="text-rv-text">RV Automóviles</strong> para conocer cada
                    unidad en persona o agendá una prueba de manejo.
                  </p>
                  <a
                    href={MAPS_SHORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv-btn-primary mt-7 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                  >
                    Abrir en Google Maps
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <div className="rv-map-dark overflow-hidden rounded-2xl border border-rv-border bg-rv-surface shadow-[0_18px_50px_rgba(2,6,23,0.45)]">
                  <iframe
                    title="Ubicación de RV Automóviles en Google Maps"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&hl=es&z=17&output=embed`}
                    className="aspect-[4/3] min-h-[260px] w-full border-0 sm:min-h-[320px] lg:aspect-auto lg:min-h-[400px]"
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
