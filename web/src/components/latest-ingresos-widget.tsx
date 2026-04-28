import Link from "next/link";
import { Reveal } from "@/components/reveal";
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
      className="relative overflow-hidden border-y border-rv-accent/20 bg-white py-12 sm:py-16"
      aria-labelledby="ultimos-ingresos-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-10 h-32 w-32 rounded-full bg-rv-accent/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-sky-300/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="rv-chip">Últimos ingresos</span>
              <h2
                id="ultimos-ingresos-heading"
                className="rv-mobile-title mt-3 text-2xl font-bold tracking-tight sm:text-4xl"
              >
                Recién sumados al catálogo
              </h2>
              <p className="rv-mobile-muted mt-2 text-sm sm:text-base">
                Tres unidades recientes para que veas qué entró. Tocá una y abrís la ficha con fotos y datos.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="rv-btn-secondary inline-flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto"
            >
              Ver catálogo completo
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:mt-10 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
          {vehicles.map((v, index) => {
            const thumb = v.photos[0];
            const title = `${v.brand} ${v.model}`.trim();
            return (
              <li key={v.id} className="min-w-[78%] snap-start sm:min-w-0">
                <Reveal delay={index * 90}>
                  <Link
                    href={`/v/${v.urlSlug}`}
                    className="rv-mobile-card rv-glow-ring group flex h-full flex-col overflow-hidden rounded-2xl border border-rv-accent/20 bg-white shadow-[0_12px_32px_rgba(30,166,247,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-rv-accent/45 hover:shadow-[0_20px_44px_rgba(30,166,247,0.22)]"
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-100">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400">
                          Sin foto
                        </div>
                      )}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80"
                        aria-hidden
                      />
                      {index === 0 ? (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-rv-accent/30 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rv-accent shadow-sm backdrop-blur">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" aria-hidden />
                          Último ingreso
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-rv-accent">
                        {title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{v.year}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-rv-accent transition-transform group-hover:translate-x-0.5">
                        Ver ficha
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
