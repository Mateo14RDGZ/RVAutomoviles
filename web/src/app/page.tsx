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
import { TiltCard } from "../components/tilt-card";
import { listVehicles } from "@/lib/vehicle-store";
import { buildWhatsappUrl } from "@/lib/whatsapp-visit";

export const dynamic = "force-dynamic";

const MAPS_SHORT_URL = "https://maps.app.goo.gl/XHWmX8T1a47y4VPP9";
/** Coordenadas del local (RV Automóviles) según el enlace compartido en Google Maps */
const MAP_EMBED_QUERY = "-33.5338118,-56.8898191";

export default async function HomePage() {
  const all = await listVehicles();
  const published = all.filter((v) => v.published);
  const latestIngresos = published
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stockCount = published.length;
  const brandCount = new Set(published.map((v) => v.brand.trim().toLowerCase()).filter(Boolean)).size;

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

        {/* HERO ====================================================== */}
        <section className="relative isolate overflow-hidden border-b border-rv-accent/15 bg-white">
          <div className="rv-aurora" aria-hidden />
          <div className="rv-grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <div className="rv-beam" aria-hidden />
          <CursorOrb />

          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <Reveal variant="soft">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rv-chip rv-mobile-glow">
                      <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center" aria-hidden>
                        <span className="absolute inset-0 animate-ping rounded-full bg-rv-accent/60" />
                        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" />
                      </span>
                      Automotora en vivo · Uruguay
                    </span>
                    <span className="rv-caption text-slate-500">2026 · v2.0</span>
                  </div>
                </Reveal>

                <h1 className="mt-5 text-[2.5rem] font-bold leading-[1.02] tracking-tight sm:text-6xl">
                  <StaggerText text="Tu próximo auto" className="rv-text-gradient-anim" />
                </h1>
                <p className="mt-3 text-2xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                  <StaggerText text="con la experiencia más" />{" "}
                  <StaggerText text="moderna del país." className="rv-text-gradient-anim" />
                </p>

                <Reveal variant="soft" delay={360}>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                    Catálogo en vivo, fichas con fotos reales, simulador de financiación oficial y atención
                    directa por WhatsApp. Una sola web mobile-first para decidir rápido.
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
                      className="rv-btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                    >
                      Simular financiación
                    </a>
                  </div>
                </Reveal>

                <Reveal variant="up" delay={580}>
                  <dl className="mt-10 grid grid-cols-3 gap-2 sm:max-w-lg sm:gap-3">
                    <div className="rv-glow-ring relative rounded-2xl border border-rv-accent/15 bg-white/70 px-3 py-3 text-left backdrop-blur">
                      <dt className="rv-eyebrow flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full bg-rv-accent" aria-hidden />
                        Stock
                      </dt>
                      <dd className="rv-mono mt-1.5 text-xl font-bold text-slate-900 sm:text-2xl">
                        {stockCount > 0 ? <AnimatedCounter value={stockCount} /> : "—"}
                      </dd>
                      <p className="rv-caption mt-0.5 normal-case tracking-normal text-[10px] text-slate-500">
                        {stockCount === 1 ? "unidad publicada" : "unidades publicadas"}
                      </p>
                    </div>
                    <div className="rv-glow-ring relative rounded-2xl border border-rv-accent/15 bg-white/70 px-3 py-3 text-left backdrop-blur">
                      <dt className="rv-eyebrow flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full bg-rv-accent" aria-hidden />
                        Marcas
                      </dt>
                      <dd className="rv-mono mt-1.5 text-xl font-bold text-slate-900 sm:text-2xl">
                        {brandCount > 0 ? <AnimatedCounter value={brandCount} /> : "—"}
                      </dd>
                      <p className="rv-caption mt-0.5 normal-case tracking-normal text-[10px] text-slate-500">
                        en catálogo
                      </p>
                    </div>
                    <div className="rv-glow-ring relative rounded-2xl border border-rv-accent/15 bg-white/70 px-3 py-3 text-left backdrop-blur">
                      <dt className="rv-eyebrow flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" aria-hidden />
                        Atención
                      </dt>
                      <dd className="mt-1.5 text-xl font-bold text-slate-900 sm:text-2xl">Directa</dd>
                      <p className="rv-caption mt-0.5 normal-case tracking-normal text-[10px] text-slate-500">
                        WhatsApp · L–V 8/18h
                      </p>
                    </div>
                  </dl>
                </Reveal>
              </div>

              {/* Panel decorativo del hero (solo desktop / tablet ancha) */}
              <Reveal variant="zoom" delay={300} className="hidden lg:block">
                <TiltCard className="rv-glow-ring relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-rv-accent/20 bg-white/80 shadow-[0_30px_80px_rgba(0,115,230,0.18)]">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,115,230,0.22),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.18),transparent_55%)]"
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div>
                      <span className="rv-chip">Live Showroom</span>
                      <p className="mt-4 text-sm font-medium text-slate-600">
                        Cada unidad se publica con fotos reales, año, kilometraje, equipamiento y documentación
                        cuando corresponde.
                      </p>
                    </div>
                    <ul className="mt-6 space-y-3 text-sm">
                      {[
                        "Catálogo actualizado",
                        "Simulador oficial Santander",
                        "WhatsApp directo con la automotora",
                      ].map((item, i) => (
                        <li key={item} className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rv-accent/30 bg-rv-accent/[0.08] text-xs font-bold text-rv-accent"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="rv-neon-divider mt-6" aria-hidden />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">
                      RV Automóviles · 2026
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>

          {/* Marquee de bancos */}
          <div className="relative border-y border-rv-accent/15 bg-gradient-to-r from-white via-rv-accent/[0.04] to-white py-5">
            <p className="rv-caption mx-auto mb-3 flex max-w-6xl items-center gap-3 px-4 sm:px-6">
              <span className="rv-divider-soft hidden flex-1 sm:block" aria-hidden />
              Trabajamos con todos los bancos del mercado
              <span className="rv-divider-soft hidden flex-1 sm:block" aria-hidden />
            </p>
            <Marquee
              items={[
                "BROU",
                "Santander",
                "BBVA",
                "Scotiabank",
                "Itaú",
                "HSBC",
                "Banco República",
                "MiAuto",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-rv-accent/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" aria-hidden />
                  {b}
                </span>
              ))}
              speed={0.85}
            />
          </div>
        </section>

        <LatestIngresosWidget vehicles={latestIngresos} />

        {/* PROPUESTA / VALOR ========================================== */}
        <section className="relative overflow-hidden border-b border-rv-accent/15 bg-white py-14 sm:py-24">
          <div className="rv-grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <Reveal variant="left">
                <div>
                  <span className="rv-chip">Propuesta</span>
                  <p className="rv-mobile-title mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                    Tecnología, claridad y respaldo.
                  </p>
                  <p className="rv-mobile-muted mt-4 max-w-md text-sm leading-relaxed sm:text-base">
                    Cada bloque está pensado para que decidas con confianza y la web te acompañe con fluidez
                    en mobile y desktop.
                  </p>
                </div>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <div className="rv-glow-ring relative overflow-hidden rounded-3xl border border-rv-accent/20 bg-gradient-to-br from-white via-rv-accent/[0.06] to-white p-6 sm:p-8">
                  <div className="rv-beam" aria-hidden />
                  <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                    Nuestro objetivo es que en una sola visita a la web tengas todo: el auto que querés,
                    la cuota que te calza, y un canal directo con nosotros para coordinar.
                  </p>
                  <div className="rv-neon-divider mt-6" aria-hidden />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-rv-accent">
                    Mobile-first · Tiempos rápidos · Datos claros
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
              {[
                {
                  title: "Catálogo en vivo",
                  desc: "Stock real con fotos y datos. Tocá una unidad y abrís la ficha completa al instante.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  ),
                  step: "01",
                },
                {
                  title: "Financiación ágil",
                  desc: "Simulador MiAuto Santander oficial en popup. Trabajamos con todos los bancos.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M3 10h18M5 10v8a2 2 0 002 2h10a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M2 8l10-5 10 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  ),
                  step: "02",
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
                      <path
                        d="M9 13c1 2 3 4 5 5l2-2c.3-.3.7-.4 1.1-.2l2.5 1c.4.2.6.6.5 1A4 4 0 0116 21a13 13 0 01-13-13 4 4 0 013.2-3.9.8.8 0 011 .5l1 2.5a.9.9 0 01-.2 1z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  ),
                  step: "03",
                },
              ].map((card, i) => (
                <Reveal key={card.title} variant="zoom" delay={i * 110}>
                  <TiltCard className="rv-mobile-card rv-glow-ring group relative h-full overflow-hidden rounded-2xl border border-rv-accent/20 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,115,230,0.22)]">
                    <span
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-rv-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rv-accent/[0.12] text-rv-accent ring-1 ring-rv-accent/30">
                        {card.icon}
                      </span>
                      <span className="rv-stat-num text-2xl font-bold sm:text-3xl">{card.step}</span>
                    </div>
                    <p className="relative mt-5 text-lg font-semibold tracking-tight text-slate-900">{card.title}</p>
                    <p className="rv-mobile-muted relative mt-2 text-sm leading-relaxed">{card.desc}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINANCIACIÓN ============================================== */}
        <section
          id="financiacion-bancaria"
          className="relative overflow-hidden border-b border-rv-accent/15 bg-gradient-to-b from-[#f4fafe] via-[#eef7ff] to-white py-14 text-slate-900 sm:py-24"
        >
          <div className="rv-aurora" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="soft">
              <div className="rv-glass-dark relative overflow-hidden rounded-3xl p-6 text-white sm:p-10">
                <span
                  className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
                  aria-hidden
                />

                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-center">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
                      Financiación destacada
                    </span>
                    <Reveal variant="mask" delay={120}>
                      <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                        MiAuto Santander: simulá tu préstamo y sacá tu auto con financiación ágil.
                      </h2>
                    </Reveal>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
                      Línea oficial de Santander para vehículos. Acá te resumimos sus tres modalidades y te
                      acercamos al simulador real, sin formularios intermedios.
                    </p>

                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                      {[
                        { name: "Crédito Convencional" },
                        { name: "Cuota Aguinaldo" },
                        { name: "Compra Inteligente" },
                      ].map((p, i) => (
                        <Reveal key={p.name} variant="up" delay={140 + i * 90}>
                          <div className="rv-glow-ring relative rounded-xl border border-white/15 bg-white/10 p-3 transition hover:bg-white/15">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200">
                              Producto
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">{p.name}</p>
                          </div>
                        </Reveal>
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

                    <div className="mt-6">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                        Trabajamos con todos los bancos
                      </p>
                      <Marquee
                        items={[
                          "BROU",
                          "Santander",
                          "BBVA",
                          "Scotiabank",
                          "Itaú",
                          "HSBC",
                          "Banco República",
                        ].map((b) => (
                          <span
                            key={b}
                            className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur sm:text-sm"
                          >
                            {b}
                          </span>
                        ))}
                        speed={0.7}
                        reverse
                      />
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

                  <Reveal variant="right" delay={200}>
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
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CÓMO FUNCIONA ============================================= */}
        <section className="relative overflow-hidden border-b border-rv-accent/10 bg-white py-14 sm:py-24">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="up">
              <div className="max-w-2xl">
                <span className="rv-chip">Cómo funciona</span>
                <p className="rv-mobile-title mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                  Tres pasos nomás.
                </p>
                <p className="rv-mobile-muted mt-3 text-sm leading-relaxed sm:text-base">
                  Una experiencia pensada para que llegues hasta la entrega del auto sin fricción.
                </p>
              </div>
            </Reveal>

            <div className="relative mt-12 grid gap-5 sm:grid-cols-3">
              <div
                className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-rv-accent/40 to-transparent sm:block"
                aria-hidden
              />
              {[
                {
                  n: "01",
                  title: "Elegís el auto",
                  desc: "Navegás el catálogo y abrís la ficha con fotos y datos claros.",
                },
                {
                  n: "02",
                  title: "Simulás financiación",
                  desc: "Te mostramos alternativas de bancos para definir la mejor cuota.",
                },
                {
                  n: "03",
                  title: "Coordinás visita",
                  desc: "Confirmás disponibilidad y avanzás directo por WhatsApp.",
                },
              ].map((step, i) => (
                <Reveal
                  key={step.n}
                  variant={i === 0 ? "left" : i === 2 ? "right" : "up"}
                  delay={i * 130}
                >
                  <TiltCard
                    max={4}
                    className="rv-mobile-card rv-glow-ring relative flex h-full flex-col overflow-hidden rounded-2xl border border-rv-accent/20 bg-white p-6"
                  >
                    <span
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-rv-accent/10 blur-3xl"
                      aria-hidden
                    />
                    <span className="rv-stat-num relative text-5xl font-bold leading-none sm:text-6xl">{step.n}</span>
                    <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-slate-900">{step.title}</h3>
                    <p className="rv-mobile-muted relative mt-2 text-sm leading-relaxed">{step.desc}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO ================================================== */}
        <section
          id="contacto"
          className="relative overflow-hidden border-b border-rv-accent/10 bg-white py-14 sm:py-24"
        >
          <div className="rv-aurora opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="zoom">
              <div className="rv-glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
                <span
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rv-accent/10 blur-3xl"
                  aria-hidden
                />
                <span className="rv-chip">Contacto</span>
                <p className="rv-mobile-title mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                  Hablemos y coordinamos tu visita.
                </p>
                <p className="rv-mobile-muted mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
                  Respondemos consultas de financiación, disponibilidad de unidades y documentación en el día.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Reveal variant="left" delay={80}>
                    <a
                      href={buildWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rv-glow-ring group relative flex h-full items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rv-accent/25 bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rv-accent/[0.06] hover:shadow-[0_18px_36px_rgba(0,115,230,0.18)]"
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
                  </Reveal>

                  <Reveal variant="up" delay={160}>
                    <a
                      href="https://www.instagram.com/rv__automoviles/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rv-glow-ring group relative flex h-full items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rv-accent/25 bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rv-accent/[0.06] hover:shadow-[0_18px_36px_rgba(0,115,230,0.18)]"
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
                  </Reveal>

                  <Reveal variant="right" delay={240}>
                    <div className="rv-glow-ring relative h-full rounded-2xl border border-rv-accent/20 bg-white px-4 py-4 sm:col-span-2 lg:col-span-1">
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
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* UBICACIÓN ================================================= */}
        <section id="ubicacion" className="relative overflow-hidden bg-white py-14 sm:py-24">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
              <Reveal variant="left">
                <div>
                  <span className="rv-chip">Dónde estamos</span>
                  <p className="rv-mobile-title mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                    Pasá a saludar.
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
              <Reveal variant="right" delay={120}>
                <div className="rv-glow-ring rv-mobile-card overflow-hidden rounded-2xl border border-rv-accent/20 bg-slate-100 shadow-[0_18px_50px_rgba(0,115,230,0.14)]">
                  <iframe
                    title="Ubicación de RV Automóviles en Google Maps"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&hl=es&z=17&output=embed`}
                    className="aspect-[4/3] min-h-[260px] w-full border-0 sm:min-h-[320px] lg:aspect-auto lg:min-h-[380px]"
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
