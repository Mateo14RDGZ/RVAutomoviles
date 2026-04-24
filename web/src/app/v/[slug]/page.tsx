import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicChrome } from "@/components/public-chrome";
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

function PublicVehicleGallery({ photos, alt }: { photos: string[]; alt: string }) {
  if (!photos.length) {
    return (
      <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
        Fotos proximamente
      </div>
    );
  }

  const main = photos[0];

  return (
    <section className="mt-3 space-y-3">
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={main} alt={alt} className="aspect-[4/3] w-full object-cover transition duration-500" />
      </div>

      {photos.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {photos.map((url, index) => (
            <div key={`${url}-${index}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
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
      <div className="min-h-dvh bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-900">
        <main className="mx-auto max-w-4xl px-4 pb-12 pt-10">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Ficha del vehículo
            </p>
          </div>

          <PublicVehicleGallery photos={v.photos} alt={`${v.brand} ${v.model}`} />

          <section className="mt-8 rounded-3xl border border-white bg-white/85 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900">
              {v.brand} {v.model}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{v.year}</p>
            <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-lg font-semibold text-emerald-800">
              {priceLabel}
            </p>
          </section>

          <section className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <p className="text-xs text-slate-500">Color</p>
              <p className="mt-1 font-medium">{v.color}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <p className="text-xs text-slate-500">Combustible</p>
              <p className="mt-1 font-medium">{v.fuel}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <p className="text-xs text-slate-500">Caja</p>
              <p className="mt-1 font-medium">{v.transmission}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
              <p className="text-xs text-slate-500">Kilometraje</p>
              <p className="mt-1 font-medium">
                {v.mileageKm != null ? `${v.mileageKm.toLocaleString("es-AR")} km` : "—"}
              </p>
            </div>
          </section>

          {v.highlights.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-slate-700">Destacados</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {v.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.features && v.features.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-slate-700">Equipamiento</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-3">
                {v.features.map((f) => (
                  <li key={f} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {v.description ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-slate-700">Descripción</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {v.description}
              </p>
            </section>
          ) : null}

          {v.documents.length ? (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-slate-700">Documentación</h2>
              <ul className="mt-3 space-y-2">
                {v.documents.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-sky-700 underline"
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
