import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicChrome } from "@/components/public-chrome";
import { VehiclePhotoCarousel } from "@/components/vehicle-photo-carousel";
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
      <div className="min-h-dvh bg-white text-slate-900">
        <main className="mx-auto max-w-4xl px-4 pb-12 pt-8">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rv-accent">
              Ficha del vehículo
            </p>
          </div>

          {v.photos.length > 0 ? (
            <div className="mt-3">
              <VehiclePhotoCarousel photos={v.photos} alt={`${v.brand} ${v.model}`} />
            </div>
          ) : (
            <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-rv-accent/25 bg-rv-accent/[0.04] text-sm text-slate-600">
              Fotos próximamente
            </div>
          )}

          <section className="mt-6 rounded-3xl border border-rv-accent/15 bg-white p-5 shadow-[0_12px_30px_rgba(30,166,247,0.08)]">
            <h1 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
              {v.brand} {v.model}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{v.year}</p>
            <p className="mt-4 inline-flex rounded-full border border-rv-accent/25 bg-rv-accent/10 px-3 py-1 text-lg font-semibold text-rv-accent">
              {priceLabel}
            </p>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-rv-accent/12 bg-white px-3 py-3 shadow-sm">
              <p className="text-xs font-medium text-rv-accent">Color</p>
              <p className="mt-1 font-medium">{v.color}</p>
            </div>
            <div className="rounded-xl border border-rv-accent/12 bg-white px-3 py-3 shadow-sm">
              <p className="text-xs font-medium text-rv-accent">Combustible</p>
              <p className="mt-1 font-medium">{v.fuel}</p>
            </div>
            <div className="rounded-xl border border-rv-accent/12 bg-white px-3 py-3 shadow-sm">
              <p className="text-xs font-medium text-rv-accent">Caja</p>
              <p className="mt-1 font-medium">{v.transmission}</p>
            </div>
            <div className="rounded-xl border border-rv-accent/12 bg-white px-3 py-3 shadow-sm">
              <p className="text-xs font-medium text-rv-accent">Kilometraje</p>
              <p className="mt-1 font-medium">
                {v.mileageKm != null ? `${v.mileageKm.toLocaleString("es-AR")} km` : "—"}
              </p>
            </div>
          </section>

          {v.highlights.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-rv-accent">Destacados</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {v.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rv-accent" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.features && v.features.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-rv-accent">Equipamiento</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-3">
                {v.features.map((f) => (
                  <li key={f} className="rounded-lg border border-rv-accent/15 bg-rv-accent/[0.05] px-3 py-2">
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.description ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-rv-accent">Descripción</h2>
              <p className="mt-3 whitespace-pre-wrap border-l-4 border-rv-accent bg-rv-accent/[0.04] py-3 pl-4 pr-3 text-sm leading-relaxed text-slate-700">
                {v.description}
              </p>
            </section>
          ) : null}

          {v.documents.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-rv-accent">Documentación</h2>
              <ul className="mt-3 space-y-2">
                {v.documents.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-rv-accent/15 bg-white px-3 py-3 text-sm font-medium text-rv-accent underline-offset-2 hover:bg-rv-accent/[0.04]"
                    >
                      <span className="truncate">{d.name}</span>
                      <span className="shrink-0 text-xs text-slate-500">Abrir</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-10 text-center text-xs text-slate-500">
            Consultanos por este vehículo desde el canal que prefieras.
          </p>
        </main>
      </div>
    </PublicChrome>
  );
}
