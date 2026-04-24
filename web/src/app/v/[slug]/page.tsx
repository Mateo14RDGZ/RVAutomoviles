import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicleBySlug(slug);
  if (!v || !v.published) return { title: "Vehículo" };
  return {
    title: `${v.brand} ${v.model} ${v.year}`,
    description: v.description.slice(0, 160),
  };
}

export default async function PublicVehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = getVehicleBySlug(slug);
  if (!v || !v.published) notFound();

  const priceLabel =
    v.price != null
      ? `${v.currency} ${v.price.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`
      : "Consultar precio";

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Catálogo</p>
          <Link href="/" className="text-xs text-sky-300 underline">
            Inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-16 pt-4">
        {v.photos[0] ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.photos[0]} alt={`${v.brand} ${v.model}`} className="aspect-[4/3] w-full object-cover" />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/50 text-sm text-slate-400">
            Fotos próximamente
          </div>
        )}

        {v.photos.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {v.photos.slice(1).map((url) => (
              <div
                key={url}
                className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}

        <section className="mt-6 space-y-2">
          <h1 className="text-2xl font-semibold leading-tight">
            {v.brand} {v.model}
          </h1>
          <p className="text-sm text-slate-400">{v.year}</p>
          <p className="text-lg font-semibold text-emerald-300">{priceLabel}</p>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-xs text-slate-400">Color</p>
            <p className="mt-1 font-medium">{v.color}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-xs text-slate-400">Combustible</p>
            <p className="mt-1 font-medium">{v.fuel}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-xs text-slate-400">Caja</p>
            <p className="mt-1 font-medium">{v.transmission}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-xs text-slate-400">Kilometraje</p>
            <p className="mt-1 font-medium">
              {v.mileageKm != null ? `${v.mileageKm.toLocaleString("es-AR")} km` : "—"}
            </p>
          </div>
        </section>

        {v.highlights.length ? (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-slate-200">Destacados</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {v.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {v.description ? (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-slate-200">Descripción</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
              {v.description}
            </p>
          </section>
        ) : null}

        {v.documents.length ? (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-slate-200">Documentación</h2>
            <ul className="mt-3 space-y-2">
              {v.documents.map((d) => (
                <li key={d.url}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-sky-300 underline"
                  >
                    <span className="truncate">{d.name}</span>
                    <span className="shrink-0 text-xs text-slate-400">Abrir</span>
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
  );
}
