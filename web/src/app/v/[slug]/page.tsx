import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicChrome } from "@/components/public-chrome";
import { VehiclePhotoCarousel } from "@/components/vehicle-photo-carousel";
import { VehicleVisitCtaInline, VehicleVisitCtaSticky } from "@/components/vehicle-visit-cta";
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

const sectionTitle = "text-xs font-bold uppercase tracking-[0.2em] text-rv-accent";
const cardBase =
  "rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-sm sm:px-4 sm:py-4";

export default async function PublicVehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v || !v.published) notFound();

  const priceLabel =
    v.price != null
      ? `${v.currency} ${v.price.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`
      : "Consultar precio";

  return (
    <PublicChrome>
      <div className="min-h-dvh bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
        <main className="mx-auto max-w-xl px-4 pb-36 pt-3 sm:px-5 sm:pt-5 md:max-w-2xl md:pb-16">
          <nav className="mb-3 flex items-center gap-2 text-sm md:mb-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1 font-medium text-rv-accent transition hover:text-rv-accent/80"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
              Autos en venta
            </Link>
          </nav>

          <div className="-mx-4 overflow-hidden sm:mx-0 sm:rounded-3xl sm:shadow-[0_12px_40px_rgba(30,166,247,0.1)]">
            {v.photos.length > 0 ? (
              <VehiclePhotoCarousel
                photos={v.photos}
                alt={`${v.brand} ${v.model}`}
                className="rounded-none border-x-0 border-t-0 border-b-0 shadow-none sm:rounded-3xl sm:border sm:border-rv-accent/15 sm:shadow-[0_18px_48px_rgba(30,166,247,0.12)]"
              />
            ) : (
              <div className="mx-4 flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-rv-accent/25 bg-rv-accent/[0.06] text-base text-slate-600 sm:mx-0">
                Fotos próximamente
              </div>
            )}
          </div>

          <section className="mt-5 rounded-3xl border border-rv-accent/12 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:mt-6 sm:p-6">
            <p className={sectionTitle}>Ficha</p>
            <h1 className="mt-2 text-2xl font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-3xl">
              {v.brand} {v.model}
            </h1>
            <p className="mt-1.5 text-base text-slate-500">{v.year}</p>
            <p className="mt-5 inline-flex rounded-2xl border border-rv-accent/20 bg-rv-accent/[0.08] px-4 py-2 text-xl font-bold tabular-nums text-rv-accent sm:text-2xl">
              {priceLabel}
            </p>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
            <div className={cardBase}>
              <p className={`${sectionTitle} tracking-[0.12em]`}>Color</p>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-900">{v.color}</p>
            </div>
            <div className={cardBase}>
              <p className={`${sectionTitle} tracking-[0.12em]`}>Combustible</p>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-900">{v.fuel}</p>
            </div>
            <div className={cardBase}>
              <p className={`${sectionTitle} tracking-[0.12em]`}>Caja</p>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-900">{v.transmission}</p>
            </div>
            <div className={cardBase}>
              <p className={`${sectionTitle} tracking-[0.12em]`}>Kilometraje</p>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-900">
                {v.mileageKm != null ? `${v.mileageKm.toLocaleString("es-AR")} km` : "—"}
              </p>
            </div>
          </section>

          {v.highlights.length ? (
            <section className="mt-8 sm:mt-10">
              <h2 className={sectionTitle}>Destacados</h2>
              <ul className="mt-4 space-y-3.5 text-base leading-relaxed text-slate-700">
                {v.highlights.map((h) => (
                  <li key={h} className="flex gap-3 rounded-2xl bg-white/80 px-3 py-2.5 ring-1 ring-slate-200/80">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rv-accent" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.features && v.features.length ? (
            <section className="mt-8 sm:mt-10">
              <h2 className={sectionTitle}>Equipamiento</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 text-base sm:grid-cols-2">
                {v.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-2xl border border-rv-accent/12 bg-rv-accent/[0.06] px-4 py-3 font-medium text-slate-800"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.description ? (
            <section className="mt-8 sm:mt-10">
              <h2 className={sectionTitle}>Descripción</h2>
              <p className="mt-4 whitespace-pre-wrap rounded-2xl border border-slate-200/90 bg-white px-4 py-4 text-base leading-[1.65] text-slate-700 shadow-sm sm:px-5 sm:py-5">
                {v.description}
              </p>
            </section>
          ) : null}

          {v.documents.length ? (
            <section className="mt-8 sm:mt-10">
              <h2 className={sectionTitle}>Documentación</h2>
              <ul className="mt-4 space-y-3">
                {v.documents.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-2xl border border-rv-accent/15 bg-white px-4 py-3.5 text-base font-semibold text-rv-accent shadow-sm transition active:bg-slate-50 hover:border-rv-accent/30 hover:bg-rv-accent/[0.04]"
                    >
                      <span className="min-w-0 truncate">{d.name}</span>
                      <span className="shrink-0 text-sm font-bold text-rv-accent/80">Abrir</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <VehicleVisitCtaInline />

          <p className="mt-8 text-center text-sm leading-relaxed text-slate-500 md:mt-10">
            ¿Dudas? Escribinos o pasá cuando quieras.
          </p>
        </main>

        <VehicleVisitCtaSticky />
      </div>
    </PublicChrome>
  );
}
