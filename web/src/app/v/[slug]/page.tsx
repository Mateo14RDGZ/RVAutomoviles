import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicChrome } from "@/components/public-chrome";
import { VehiclePhotoCarousel } from "@/components/vehicle-photo-carousel";
import { VehicleVisitCtaBelowContent } from "@/components/vehicle-visit-cta";
import { getRequestOrigin } from "@/lib/request-origin";
import { getVehicleBySlug } from "@/lib/vehicle-store";

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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-slate-200/80 py-3.5 last:border-0 sm:py-4">
      <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-rv-accent">{label}</span>
      <span className="min-w-0 text-right text-base font-semibold leading-snug text-slate-900 sm:text-lg">{value}</span>
    </div>
  );
}

const TRUST_CHECKLIST = [
  "Publicación con datos y fotos reales",
  "Revisión documental previa a la entrega",
  "Asesoramiento en financiación bancaria",
  "Coordinación de visita y prueba de manejo",
] as const;

export default async function PublicVehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v || !v.published) notFound();

  const origin = await getRequestOrigin();
  const listingAbsoluteUrl = origin ? `${origin}/v/${slug}` : undefined;

  const priceLabel =
    v.price != null
      ? `${v.currency} ${v.price.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`
      : "Consultar precio";

  const km =
    v.mileageKm != null ? `${v.mileageKm.toLocaleString("es-AR")} km` : "No informado";

  return (
    <PublicChrome>
      <div className="min-h-dvh bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900">
        <main className="mx-auto max-w-xl px-4 pb-24 pt-3 sm:px-5 sm:pt-5 md:max-w-2xl md:pb-16">
          <nav className="mb-3 flex items-center gap-2 text-sm md:mb-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1 font-semibold text-rv-accent transition hover:text-rv-accent/80"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
              Autos en venta
            </Link>
          </nav>

          <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-3xl sm:shadow-[0_16px_48px_rgba(30,166,247,0.14)]">
            {v.photos.length > 0 ? (
              <VehiclePhotoCarousel
                photos={v.photos}
                alt={`${v.brand} ${v.model}`}
                className="rounded-none border-x-0 border-t-0 border-b-0 shadow-none sm:rounded-3xl sm:border sm:border-rv-accent/15 sm:shadow-[0_18px_48px_rgba(30,166,247,0.12)]"
              />
            ) : (
              <div className="mx-4 flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-rv-accent/30 bg-rv-accent/[0.08] text-base font-medium text-slate-600 sm:mx-0">
                Fotos próximamente
              </div>
            )}
          </div>

          {/* Cabecera llamativa */}
          <header className="rv-glow-ring relative mt-5 overflow-hidden rounded-3xl border border-rv-accent/20 bg-gradient-to-br from-white via-rv-accent/[0.07] to-white p-5 shadow-[0_12px_48px_rgba(30,166,247,0.14)] sm:mt-6 sm:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-rv-accent/18 blur-3xl" aria-hidden />
            <span className="rv-chip">En venta</span>
            <h1 className="relative mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
              <span className="rv-text-gradient-anim">{v.brand} {v.model}</span>
            </h1>
            <div className="relative mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-bold text-white">
                {v.year}
              </span>
              <span className="inline-flex rounded-xl border border-rv-accent/30 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                {km}
              </span>
            </div>
            <p className="relative mt-5 inline-flex w-full max-w-full rounded-2xl border-2 border-rv-accent/35 bg-white px-4 py-3 text-center text-2xl font-extrabold tabular-nums text-rv-accent shadow-inner sm:text-3xl">
              {priceLabel}
            </p>
          </header>

          {/* Todos los datos en lista clara */}
          <section
            className="mt-6 rounded-3xl border border-slate-200/90 bg-white px-4 py-2 shadow-[0_8px_32px_rgba(15,23,42,0.06)] sm:mt-7 sm:px-5 sm:py-3"
            aria-labelledby="datos-auto"
          >
            <h2 id="datos-auto" className="border-b border-rv-accent/15 px-1 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-rv-accent">
              Todos los datos
            </h2>
            <div className="px-1">
              <DataRow label="Marca" value={show(v.brand)} />
              <DataRow label="Modelo" value={show(v.model)} />
              <DataRow label="Año" value={String(v.year)} />
              <DataRow label="Color" value={show(v.color)} />
              <DataRow label="Combustible" value={show(v.fuel)} />
              <DataRow label="Caja" value={show(v.transmission)} />
              <DataRow label="Kilometraje" value={km} />
              <DataRow label="Precio" value={priceLabel} />
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-rv-accent/20 bg-rv-accent/[0.04] p-5 shadow-[0_8px_24px_rgba(30,166,247,0.08)] sm:mt-7 sm:p-6">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-rv-accent">
              Checklist de confianza
            </h2>
            <ul className="mt-4 space-y-2.5">
              {TRUST_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-slate-700 sm:text-base">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rv-accent text-[10px] font-bold text-white"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {v.highlights.length ? (
            <section className="mt-8 rounded-3xl border border-rv-accent/15 bg-white p-5 shadow-md sm:mt-10 sm:p-6">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-rv-accent">Destacados</h2>
              <ul className="mt-4 space-y-3">
                {v.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-3.5 text-base font-medium leading-relaxed text-slate-800"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-rv-accent shadow-sm" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.features && v.features.length ? (
            <section className="mt-8 rounded-3xl border border-rv-accent/15 bg-white p-5 shadow-md sm:mt-10 sm:p-6">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-rv-accent">Equipamiento</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {v.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-2xl border-2 border-rv-accent/15 bg-gradient-to-br from-rv-accent/[0.08] to-white px-4 py-3.5 text-center text-base font-semibold text-slate-800"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.description ? (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:mt-10 sm:p-6">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-rv-accent">Descripción</h2>
              <p className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 px-4 py-4 text-base leading-[1.7] text-slate-800 sm:px-5 sm:py-5">
                {v.description}
              </p>
            </section>
          ) : null}

          {v.documents.length ? (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:mt-10 sm:p-6">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.2em] text-rv-accent">Documentación</h2>
              <ul className="mt-4 space-y-3">
                {v.documents.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-2xl border-2 border-rv-accent/20 bg-rv-accent/[0.04] px-4 py-3.5 text-base font-bold text-rv-accent transition hover:bg-rv-accent/[0.1]"
                    >
                      <span className="min-w-0 truncate">{d.name}</span>
                      <span className="shrink-0 text-sm">Abrir →</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <VehicleVisitCtaBelowContent listingAbsoluteUrl={listingAbsoluteUrl} />

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            RV Automoviles · consultas por este usado
          </p>
        </main>
      </div>
    </PublicChrome>
  );
}
