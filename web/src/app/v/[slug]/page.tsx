import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicChrome } from "@/components/public-chrome";
import { Reveal } from "../../../components/reveal";
import { VehiclePhotoCarousel } from "@/components/vehicle-photo-carousel";
import { VehicleVisitCtaBelowContent } from "@/components/vehicle-visit-cta";
import { getRequestOrigin } from "@/lib/request-origin";
import { getVehicleBySlug } from "@/lib/vehicle-store";
import { buildWhatsappVisitUrl } from "@/lib/whatsapp-visit";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v || !v.published) return { title: "Vehículo" };
  return {
    title: `${v.brand} ${v.model} ${v.year}`,
    description: v.description.slice(0, 160),
  };
}

function show(s: string | null | undefined): string {
  const t = (s ?? "").trim();
  return t.length ? t : "—";
}

const TRUST_CHECKLIST = [
  "Publicación con datos y fotos reales",
  "Revisión documental previa a la entrega",
  "Asesoramiento en financiación bancaria",
  "Coordinación de visita y prueba de manejo",
] as const;

/** Fila editorial estilo tabla key/value, sin íconos coloridos. */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rv-border py-3.5 last:border-0">
      <span className="rv-eyebrow text-rv-muted">{label}</span>
      <span className="text-right text-base font-semibold text-rv-text">{value}</span>
    </div>
  );
}

export default async function PublicVehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v || !v.published) notFound();

  const origin = await getRequestOrigin();
  const listingAbsoluteUrl = origin ? `${origin}/v/${slug}` : undefined;
  const whatsappHref = buildWhatsappVisitUrl(listingAbsoluteUrl);

  const priceLabel =
    v.price != null
      ? `${v.currency} ${v.price.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`
      : "Consultar precio";

  const km = v.mileageKm != null ? `${v.mileageKm.toLocaleString("es-AR")} km` : "No informado";

  return (
    <PublicChrome>
      <div className="relative min-h-dvh bg-rv-deep text-rv-text">
        <div className="rv-aurora opacity-50" aria-hidden />

        <main className="relative mx-auto max-w-3xl px-3 pb-32 pt-3 sm:px-5 sm:pt-5 md:max-w-4xl md:pb-16">
          <nav className="mb-4 flex items-center gap-2 text-sm">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 rounded-full border border-rv-border bg-rv-surface/40 px-3 py-1.5 font-semibold text-rv-accent-2 backdrop-blur transition hover:-translate-x-0.5 hover:border-white/15 hover:bg-rv-surface/70"
            >
              <span aria-hidden className="text-base leading-none">
                ←
              </span>
              Volver al catálogo
            </Link>
          </nav>

          {/* HERO ===================================================== */}
          <Reveal variant="zoom">
            <section className="relative -mx-3 overflow-hidden rounded-none border border-rv-border bg-rv-surface/40 shadow-[0_24px_60px_rgba(2,6,23,0.45)] sm:mx-0 sm:rounded-3xl">
              <div className="relative">
                {v.photos.length > 0 ? (
                  <VehiclePhotoCarousel
                    photos={v.photos}
                    alt={`${v.brand} ${v.model}`}
                    className="rounded-none border-x-0 border-t-0 border-b border-rv-border shadow-none sm:rounded-t-3xl sm:border-x sm:border-t"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-rv-bg2 text-base font-medium text-rv-muted">
                    Fotos próximamente
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-rv-deep/85 via-rv-deep/30 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="rv-chip mb-3 border-white/30 bg-white/10 text-white backdrop-blur">
                    En venta
                  </span>
                  <h1 className="rv-display text-3xl font-bold leading-[1.05] text-white drop-shadow-sm sm:text-5xl">
                    {v.brand} {v.model}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur">
                      {v.year}
                    </span>
                    <span className="inline-flex rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur">
                      {km}
                    </span>
                    {v.transmission ? (
                      <span className="inline-flex rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur">
                        {v.transmission}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Precio + CTA — precio en amber sin gradient */}
              <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
                <div>
                  <p className="rv-eyebrow text-rv-muted">
                    Precio {v.price != null ? `· ${v.currency}` : ""}
                  </p>
                  <p className="rv-price mt-2 text-4xl sm:text-5xl">{priceLabel}</p>
                  <p className="mt-2 text-[12px] text-rv-muted">
                    Precio sujeto a disponibilidad · IVA incluido cuando aplique
                  </p>
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv-btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M20.5 3.5A11 11 0 003.5 18.6L2 22l3.5-1.4A11 11 0 1020.5 3.5z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
            </section>
          </Reveal>

          {/* FICHA TÉCNICA — editorial table ============================== */}
          <Reveal variant="up" delay={120}>
            <section className="mt-10" aria-labelledby="specs-heading">
              <div className="flex items-end justify-between">
                <h2 id="specs-heading" className="rv-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Ficha técnica
                </h2>
                <span className="rv-chip">Datos clave</span>
              </div>
              <div className="mt-6 grid gap-x-10 gap-y-0 sm:grid-cols-2">
                <SpecRow label="Año" value={String(v.year)} />
                <SpecRow label="Kilometraje" value={km} />
                <SpecRow label="Combustible" value={show(v.fuel)} />
                <SpecRow label="Caja" value={show(v.transmission)} />
                <SpecRow label="Color" value={show(v.color)} />
                <SpecRow label="Marca / Modelo" value={`${show(v.brand)} ${show(v.model)}`.trim()} />
              </div>
            </section>
          </Reveal>

          {/* HIGHLIGHTS ============================================== */}
          {v.highlights.length ? (
            <Reveal variant="left" delay={120}>
              <section className="mt-12 sm:mt-16">
                <div className="flex items-end justify-between">
                  <h2 className="rv-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Lo más destacado
                  </h2>
                  <span className="rv-chip">Highlights</span>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {v.highlights.map((h, i) => (
                    <Reveal key={h} variant="up" delay={i * 70}>
                      <li className="relative flex items-start gap-3 rounded-2xl border border-rv-border bg-rv-surface/40 px-5 py-4 text-sm font-medium leading-relaxed text-rv-text">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rv-accent/20 text-[10px] font-bold text-rv-accent-2 ring-1 ring-rv-accent/30"
                        >
                          ✓
                        </span>
                        <span>{h}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          {/* EQUIPAMIENTO — pills semicuadrados ====================== */}
          {v.features && v.features.length ? (
            <Reveal variant="right" delay={120}>
              <section className="mt-12 sm:mt-16">
                <div className="flex items-end justify-between">
                  <h2 className="rv-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Equipamiento
                  </h2>
                  <span className="rv-chip">Confort</span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {v.features.map((f) => (
                    <li
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-md border border-rv-border bg-rv-surface/50 px-3 py-1.5 text-xs font-medium text-rv-text/90 transition hover:border-white/15 hover:bg-rv-surface sm:text-sm"
                    >
                      <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-rv-muted" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          {/* DESCRIPCIÓN ============================================= */}
          {v.description ? (
            <Reveal variant="zoom" delay={120}>
              <section className="mt-12 sm:mt-16">
                <div className="flex items-end justify-between">
                  <h2 className="rv-display text-2xl font-bold tracking-tight sm:text-3xl">Descripción</h2>
                  <span className="rv-chip">Detalle</span>
                </div>
                <div className="relative mt-6 overflow-hidden rounded-3xl border border-rv-border bg-rv-surface/40 p-6 sm:p-8">
                  <p className="whitespace-pre-wrap text-base leading-[1.75] text-rv-text/95">
                    {v.description}
                  </p>
                </div>
              </section>
            </Reveal>
          ) : null}

          {/* CHECKLIST DE CONFIANZA ================================== */}
          <Reveal variant="up" delay={140}>
            <section className="mt-12 sm:mt-16">
              <div className="rv-glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
                <span className="rv-chip">Confianza</span>
                <h2 className="rv-display mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                  Cómo trabajamos en RV Automóviles
                </h2>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {TRUST_CHECKLIST.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-rv-text"
                    >
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rv-accent text-[10px] font-bold text-white"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          {/* DOCUMENTOS ============================================== */}
          {v.documents.length ? (
            <Reveal variant="up" delay={140}>
              <section className="mt-12 sm:mt-16">
                <div className="flex items-end justify-between">
                  <h2 className="rv-display text-2xl font-bold tracking-tight sm:text-3xl">Documentación</h2>
                  <span className="rv-chip">PDF</span>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {v.documents.map((d) => (
                    <li key={d.url}>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-rv-border bg-rv-surface/40 px-5 py-4 text-sm font-bold text-rv-accent-2 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-rv-surface"
                      >
                        <span className="flex items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                            <path
                              d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                          </svg>
                          <span className="min-w-0 truncate">{d.name}</span>
                        </span>
                        <span className="shrink-0 text-xs transition-transform group-hover:translate-x-0.5">
                          Abrir →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ) : null}

          {/* CTA FINAL =============================================== */}
          <Reveal variant="zoom" delay={120}>
            <VehicleVisitCtaBelowContent listingAbsoluteUrl={listingAbsoluteUrl} />
          </Reveal>

          <p className="mt-10 text-center text-sm font-medium text-rv-muted">
            RV Automóviles · consultas por este usado
          </p>
        </main>

        {/* STICKY MOBILE CTA ======================================== */}
        <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 sm:hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border border-rv-border bg-rv-bg2/95 p-3 shadow-[0_18px_50px_rgba(2,6,23,0.6)] backdrop-blur"
          >
            <div className="min-w-0">
              <p className="rv-eyebrow text-rv-muted">{v.brand}</p>
              <p className="rv-price truncate text-base">{priceLabel}</p>
            </div>
            <span className="rv-btn-primary !px-3 !py-2 !text-xs">
              <svg viewBox="0 0 24 24" fill="none" className="mr-1 h-4 w-4">
                <path
                  d="M20.5 3.5A11 11 0 003.5 18.6L2 22l3.5-1.4A11 11 0 1020.5 3.5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Consultar
            </span>
          </a>
        </div>
      </div>
    </PublicChrome>
  );
}
