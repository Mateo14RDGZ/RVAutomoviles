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

function SpecCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rv-glow-ring relative flex items-center gap-3 rounded-2xl border border-rv-accent/20 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(30,166,247,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(30,166,247,0.18)]">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rv-accent/[0.1] text-rv-accent ring-1 ring-rv-accent/30">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-rv-accent">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-slate-900 sm:text-base">{value}</p>
      </div>
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
      <div className="relative min-h-dvh bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
        <div className="rv-aurora opacity-50" aria-hidden />

        <main className="relative mx-auto max-w-3xl px-3 pb-32 pt-3 sm:px-5 sm:pt-5 md:max-w-4xl md:pb-16">
          <nav className="mb-3 flex items-center gap-2 text-sm md:mb-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 rounded-full border border-rv-accent/25 bg-white/80 px-3 py-1.5 font-semibold text-rv-accent backdrop-blur transition hover:-translate-x-0.5 hover:bg-white"
            >
              <span aria-hidden className="text-base leading-none">
                ←
              </span>
              Volver al catálogo
            </Link>
          </nav>

          {/* HERO ===================================================== */}
          <Reveal variant="zoom">
            <section className="rv-glow-ring relative -mx-3 overflow-hidden rounded-none border border-rv-accent/15 bg-white shadow-[0_30px_70px_rgba(30,166,247,0.18)] sm:mx-0 sm:rounded-3xl">
              <div className="relative">
                {v.photos.length > 0 ? (
                  <VehiclePhotoCarousel
                    photos={v.photos}
                    alt={`${v.brand} ${v.model}`}
                    className="rounded-none border-x-0 border-t-0 border-b border-rv-accent/15 shadow-none sm:rounded-t-3xl sm:border-x sm:border-t"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-base font-medium text-slate-500">
                    Fotos próximamente
                  </div>
                )}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                  <span className="rv-chip mb-2 border-white/40 bg-white/20 text-white backdrop-blur">
                    En venta
                  </span>
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
                    {v.brand} {v.model}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-lg bg-white/95 px-2.5 py-1 text-sm font-bold text-slate-900 backdrop-blur">
                      {v.year}
                    </span>
                    <span className="inline-flex rounded-lg border border-white/40 bg-white/15 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur">
                      {km}
                    </span>
                    {v.transmission ? (
                      <span className="inline-flex rounded-lg border border-white/40 bg-white/15 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur">
                        {v.transmission}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Precio + CTA */}
              <div className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rv-accent">Precio</p>
                  <p className="mt-1 text-3xl font-extrabold tabular-nums sm:text-4xl">
                    <span className="rv-text-gradient-anim">{priceLabel}</span>
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

          {/* SPECS GRID ============================================== */}
          <Reveal variant="up" delay={120}>
            <section className="mt-7" aria-labelledby="specs-heading">
              <div className="flex items-end justify-between">
                <h2 id="specs-heading" className="rv-mobile-title text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ficha técnica
                </h2>
                <span className="rv-chip">Datos clave</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <SpecCard
                  label="Año"
                  value={String(v.year)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  }
                />
                <SpecCard
                  label="Kilometraje"
                  value={km}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="M4 18a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M12 18l4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
                    </svg>
                  }
                />
                <SpecCard
                  label="Combustible"
                  value={show(v.fuel)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <rect x="4" y="3" width="10" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M14 8l3 2v8a2 2 0 11-4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  }
                />
                <SpecCard
                  label="Caja"
                  value={show(v.transmission)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M6 8v8M18 8v8M8 6h8M8 18h8" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  }
                />
                <SpecCard
                  label="Color"
                  value={show(v.color)}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M12 3a9 9 0 100 18 3 3 0 003-3 1.5 1.5 0 011.5-1.5h1A3.5 3.5 0 0021 13a9 9 0 00-9-10z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" />
                      <circle cx="11" cy="7" r="1" fill="currentColor" />
                      <circle cx="16" cy="9" r="1" fill="currentColor" />
                    </svg>
                  }
                />
                <SpecCard
                  label="Marca"
                  value={`${show(v.brand)} ${show(v.model)}`.trim()}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M3 12l2-5a2 2 0 011.8-1.2h10.4A2 2 0 0119 7l2 5v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle cx="7.5" cy="14.5" r="1" fill="currentColor" />
                      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
                    </svg>
                  }
                />
              </div>
            </section>
          </Reveal>

          {/* HIGHLIGHTS ============================================== */}
          {v.highlights.length ? (
            <Reveal variant="left" delay={120}>
              <section className="mt-8 sm:mt-10">
                <div className="flex items-end justify-between">
                  <h2 className="rv-mobile-title text-2xl font-semibold tracking-tight sm:text-3xl">
                    Lo más destacado
                  </h2>
                  <span className="rv-chip">Highlights</span>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {v.highlights.map((h, i) => (
                    <Reveal key={h} variant="up" delay={i * 70}>
                      <li className="rv-glow-ring relative flex items-start gap-3 rounded-2xl border border-rv-accent/20 bg-white px-4 py-3.5 text-sm font-medium leading-relaxed text-slate-800 shadow-[0_8px_24px_rgba(30,166,247,0.08)]">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rv-accent to-sky-400 text-[10px] font-bold text-white shadow-sm"
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

          {/* EQUIPAMIENTO ============================================ */}
          {v.features && v.features.length ? (
            <Reveal variant="right" delay={120}>
              <section className="mt-8 sm:mt-10">
                <div className="flex items-end justify-between">
                  <h2 className="rv-mobile-title text-2xl font-semibold tracking-tight sm:text-3xl">
                    Equipamiento
                  </h2>
                  <span className="rv-chip">Confort</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {v.features.map((f) => (
                    <li
                      key={f}
                      className="rv-glow-ring inline-flex items-center gap-1.5 rounded-full border border-rv-accent/25 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-rv-accent/[0.06] sm:text-sm"
                    >
                      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" />
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
              <section className="mt-8 sm:mt-10">
                <div className="flex items-end justify-between">
                  <h2 className="rv-mobile-title text-2xl font-semibold tracking-tight sm:text-3xl">
                    Descripción
                  </h2>
                  <span className="rv-chip">Detalle</span>
                </div>
                <div className="rv-glow-ring relative mt-5 overflow-hidden rounded-3xl border border-rv-accent/15 bg-white p-5 shadow-[0_12px_36px_rgba(30,166,247,0.1)] sm:p-6">
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rv-accent/10 blur-3xl"
                    aria-hidden
                  />
                  <p className="relative whitespace-pre-wrap text-base leading-[1.75] text-slate-800">
                    {v.description}
                  </p>
                </div>
              </section>
            </Reveal>
          ) : null}

          {/* CHECKLIST DE CONFIANZA ================================== */}
          <Reveal variant="up" delay={140}>
            <section className="mt-8 sm:mt-10">
              <div className="rv-glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
                <span className="rv-chip">Confianza</span>
                <h2 className="rv-mobile-title mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  Cómo trabajamos en RV Automóviles
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {TRUST_CHECKLIST.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-slate-700"
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
              <section className="mt-8 sm:mt-10">
                <div className="flex items-end justify-between">
                  <h2 className="rv-mobile-title text-2xl font-semibold tracking-tight sm:text-3xl">
                    Documentación
                  </h2>
                  <span className="rv-chip">PDF</span>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {v.documents.map((d) => (
                    <li key={d.url}>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rv-glow-ring group flex w-full items-center justify-between gap-3 rounded-2xl border border-rv-accent/20 bg-white px-4 py-3.5 text-sm font-bold text-rv-accent transition hover:-translate-y-0.5 hover:bg-rv-accent/[0.06] hover:shadow-[0_14px_30px_rgba(30,166,247,0.18)]"
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

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            RV Automóviles · consultas por este usado
          </p>
        </main>

        {/* STICKY MOBILE CTA ======================================== */}
        <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 sm:hidden">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rv-glow-ring flex items-center justify-between gap-3 rounded-2xl border border-rv-accent/20 bg-white/95 p-3 shadow-[0_18px_50px_rgba(30,166,247,0.28)] backdrop-blur"
          >
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-[0.18em] text-rv-accent">
                {priceLabel}
              </p>
              <p className="truncate text-sm font-semibold text-slate-900">
                {v.brand} {v.model} · {v.year}
              </p>
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
