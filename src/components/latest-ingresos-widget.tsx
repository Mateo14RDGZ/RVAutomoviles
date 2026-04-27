import Link from "next/link";
import type { Vehicle } from "@/lib/vehicle-types";

type Props = {
  vehicles: Vehicle[];
};

/**
 * Bloque destacado en el home: últimos vehículos publicados (por fecha de creación).
 */
export function LatestIngresosWidget({ vehicles }: Props) {
  if (vehicles.length === 0) return null;

  return (
    <section
      className="rv-mobile-enter rv-mobile-enter-2 relative border-y border-rv-accent/20 bg-gradient-to-br from-rv-accent/[0.07] via-white to-slate-50 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:py-14"
      aria-labelledby="ultimos-ingresos-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rv-accent/40 to-transparent" />
      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rv-accent">Últimos ingresos</p>
            <h2
              id="ultimos-ingresos-heading"
              className="rv-mobile-title mt-1 text-xl font-bold tracking-tight sm:text-3xl sm:text-slate-900"
            >
              Recién sumados al catálogo
            </h2>
            <p className="rv-mobile-muted mt-2 text-sm sm:text-base sm:text-slate-600">
              Tres unidades recientes para que veas qué entró. Tocá una y abrís la ficha con fotos y
              datos.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-xl border border-rv-accent/25 bg-white px-4 py-2.5 text-sm font-semibold text-rv-accent shadow-sm transition-all hover:border-rv-accent/40 hover:bg-rv-accent/[0.06] sm:w-auto"
          >
            Ver catálogo completo
          </Link>
        </div>

        <ul className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:mt-8 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
          {vehicles.map((v, index) => {
            const thumb = v.photos[0];
            const title = `${v.brand} ${v.model}`.trim();
            return (
              <li key={v.id} className="min-w-[78%] snap-start sm:min-w-0">
                <Link
                  href={`/v/${v.urlSlug}`}
                  className="rv-mobile-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-rv-accent/30 hover:shadow-[0_16px_48px_rgba(30,166,247,0.15)] hover:ring-rv-accent/10"
                >
                  <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-100">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400">
                        Sin foto
                      </div>
                    )}
                    {index === 0 ? (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rv-accent shadow-sm">
                        Último ingreso
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="line-clamp-2 text-base font-semibold leading-snug text-white group-hover:text-rv-accent sm:text-slate-900">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-slate-300 sm:text-slate-500">{v.year}</p>
                    <span className="mt-auto pt-3 text-xs font-semibold text-rv-accent transition-transform group-hover:translate-x-0.5">
                      Ver ficha →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
