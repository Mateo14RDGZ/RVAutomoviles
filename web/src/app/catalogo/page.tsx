import type { Metadata } from "next";
import Link from "next/link";
import { PublicChrome } from "@/components/public-chrome";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Autos en venta",
  description: "Vehículos publicados de la automotora.",
};

export default async function CatalogoPage() {
  const all = await listVehicles();
  const vehicles = all
    .filter((v) => v.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatPrice = (price: number | null, currency: string) => {
    if (!price) return "Consultar";
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: currency || "UYU",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileageKm: number | null) => {
    if (!mileageKm) return "N/D km";
    return `${new Intl.NumberFormat("es-UY").format(mileageKm)} km`;
  };

  return (
    <PublicChrome>
      <div className="min-h-dvh animate-fade-in bg-rv-deep text-rv-text">
        <header className="relative overflow-hidden border-b border-rv-border bg-rv-bg2 px-4 py-9 sm:py-12">
          <div className="rv-aurora opacity-60" aria-hidden />
          <div className="rv-grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-6xl">
            <span className="rv-chip">Catálogo</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-rv-text sm:text-4xl">
              <span className="rv-text-gradient-anim">Autos en venta</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-rv-muted sm:text-base">
              Tocá una unidad para ver fotos, ficha técnica, equipamiento y documentación.
            </p>
            <p className="rv-caption mt-4 inline-flex items-center gap-2 normal-case tracking-normal text-rv-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {vehicles.length === 0
                ? "Próximamente publicamos unidades"
                : `${vehicles.length} ${vehicles.length === 1 ? "unidad publicada" : "unidades publicadas"}`}
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-7 sm:px-5 sm:py-10">
          {vehicles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-rv-border bg-rv-surface/60 px-4 py-16 text-center shadow-[0_12px_36px_rgba(2,6,23,0.45)]">
              <p className="text-sm text-rv-muted">
                Todavía no hay autos publicados. Cuando carguemos unidades, aparecerán acá.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {vehicles.map((v) => {
                const thumb = v.photos[0];
                const title = `${v.brand} ${v.model}`.trim();
                const extraPhotos = v.photos.length > 1 ? v.photos.length - 1 : 0;
                const priceLabel = formatPrice(v.price, v.currency);
                const mileageLabel = formatMileage(v.mileageKm);
                return (
                  <li key={v.id} className="min-w-0">
                    <Link
                      href={`/v/${v.urlSlug}`}
                      className="rv-glow-ring group relative flex h-full flex-col overflow-hidden rounded-3xl bg-rv-surface/70 shadow-[0_8px_30px_rgba(2,6,23,0.5)] ring-1 ring-rv-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(59,130,246,0.32)] hover:ring-rv-accent/55"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-rv-surface to-rv-bg2">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-2 text-center text-[10px] font-medium text-rv-muted sm:text-xs">
                            Sin foto
                          </div>
                        )}
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rv-deep/55 via-transparent to-transparent"
                          aria-hidden
                        />
                        <span className="absolute left-2.5 top-2.5 rounded-lg bg-rv-deep/85 px-2 py-0.5 text-[10px] font-bold tabular-nums text-white backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
                          {v.year}
                        </span>
                        {extraPhotos > 0 ? (
                          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md sm:bottom-3 sm:right-3 sm:text-[10px]">
                            +{extraPhotos} foto{extraPhotos > 1 ? "s" : ""}
                          </span>
                        ) : null}
                      </div>

                      <div className="relative flex flex-1 flex-col border-t border-rv-border/60 bg-rv-surface/70 px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3.5">
                        <div
                          className="pointer-events-none absolute left-4 top-0 h-0.5 w-10 rounded-full bg-rv-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-5"
                          aria-hidden
                        />
                        <p className="rv-caption normal-case tracking-normal text-[10px] text-rv-muted">
                          {v.year} · Disponible
                        </p>
                        <p className="line-clamp-2 mt-0.5 min-h-[2.25rem] text-[12px] font-bold leading-snug tracking-tight text-rv-text sm:min-h-0 sm:text-base sm:leading-snug group-hover:text-rv-accent-2">
                          {title}
                        </p>
                        <p className="rv-mono mt-1 text-sm font-extrabold text-rv-text sm:text-base">
                          {priceLabel}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="rounded-full border border-rv-border bg-rv-surface/80 px-2 py-0.5 text-[10px] font-medium text-rv-muted sm:text-xs">
                            {mileageLabel}
                          </span>
                          <span className="rounded-full border border-rv-border bg-rv-surface/80 px-2 py-0.5 text-[10px] font-medium text-rv-muted sm:text-xs">
                            {v.fuel || "N/D"}
                          </span>
                          <span className="rounded-full border border-rv-border bg-rv-surface/80 px-2 py-0.5 text-[10px] font-medium text-rv-muted sm:text-xs">
                            {v.transmission || "N/D"}
                          </span>
                        </div>

                        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rv-accent-2 transition-transform duration-300 group-hover:translate-x-0.5">
                          Ver ficha
                          <span aria-hidden>→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </main>
      </div>
    </PublicChrome>
  );
}
