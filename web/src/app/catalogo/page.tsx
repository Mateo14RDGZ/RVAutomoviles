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
      <div className="min-h-dvh animate-fade-in bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <header className="relative overflow-hidden border-b border-rv-accent/12 bg-white/90 px-4 py-9 shadow-sm backdrop-blur-sm sm:py-10">
          <div className="rv-aurora opacity-60" aria-hidden />
          <div className="rv-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-6xl">
            <span className="rv-chip">Catálogo</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              <span className="rv-text-gradient-anim">Autos en venta</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Tocá una unidad para ver fotos, ficha técnica, equipamiento y documentación.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-7 sm:px-5 sm:py-10">
          {vehicles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-rv-accent/30 bg-white px-4 py-16 text-center shadow-sm">
              <p className="text-sm text-slate-600">
                Todavía no hay autos publicados. Cuando cargues unidades desde el panel y las
                marques como publicadas, aparecerán acá.
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
                      className="rv-glow-ring group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,115,230,0.22)] hover:ring-rv-accent/45"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-2 text-center text-[10px] font-medium text-slate-400 sm:text-xs">
                            Sin foto
                          </div>
                        )}
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80"
                          aria-hidden
                        />
                        <span className="absolute left-2.5 top-2.5 rounded-lg bg-white/95 px-2 py-0.5 text-[10px] font-bold tabular-nums text-slate-800 shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
                          {v.year}
                        </span>
                        {extraPhotos > 0 ? (
                          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md sm:bottom-3 sm:right-3 sm:text-[10px]">
                            +{extraPhotos} foto{extraPhotos > 1 ? "s" : ""}
                          </span>
                        ) : null}
                      </div>

                      <div className="relative flex flex-1 flex-col border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/90 px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3.5">
                        <div
                          className="pointer-events-none absolute left-4 top-0 h-0.5 w-10 rounded-full bg-rv-accent/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-5"
                          aria-hidden
                        />
                        <p className="rv-caption normal-case tracking-normal text-[10px] text-slate-500">
                          {v.year} · Disponible
                        </p>
                        <p className="line-clamp-2 mt-0.5 min-h-[2.25rem] text-[12px] font-bold leading-snug tracking-tight text-slate-900 sm:min-h-0 sm:text-base sm:leading-snug group-hover:text-rv-accent">
                          {title}
                        </p>
                        <p className="rv-mono mt-1 text-sm font-extrabold text-slate-900 sm:text-base">
                          {priceLabel}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 sm:text-xs">
                            {mileageLabel}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 sm:text-xs">
                            {v.fuel || "N/D"}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 sm:text-xs">
                            {v.transmission || "N/D"}
                          </span>
                        </div>

                        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rv-accent transition-transform duration-300 group-hover:translate-x-0.5">
                          Ver ficha
                          <span aria-hidden className="text-rv-accent/80">
                            →
                          </span>
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
