import Link from "next/link";
import { Reveal } from "./reveal";
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
      className="relative overflow-hidden border-y border-rv-border bg-rv-bg2 py-12 sm:py-16"
      aria-labelledby="ultimos-ingresos-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-10 h-32 w-32 rounded-full bg-rv-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-rv-glow/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal variant="left">
            <div className="max-w-xl">
              <span className="rv-chip">Últimos ingresos</span>
              <h2
                id="ultimos-ingresos-heading"
                className="rv-display mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
              >
                Recién sumados al catálogo
              </h2>
              <p className="mt-3 text-base text-rv-muted">
                Tres unidades recientes para que veas qué entró. Tocá una y abrís la ficha con fotos y datos.
              </p>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <Link
              href="/catalogo"
              className="rv-btn-secondary inline-flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto"
            >
              Ver catálogo completo
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {vehicles.map((v, index) => {
            const thumb = v.photos[0];
            const title = `${v.brand} ${v.model}`.trim();
            return (
              <li key={v.id} className="min-w-0">
                <Reveal variant="zoom" delay={index * 130}>
                  <Link
                    href={`/v/${v.urlSlug}`}
                    className="rv-mobile-card rv-glow-ring group flex h-full flex-col overflow-hidden rounded-2xl border border-rv-border bg-rv-surface/70 shadow-[0_12px_32px_rgba(2,6,23,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-rv-accent/55 hover:shadow-[0_20px_44px_rgba(59,130,246,0.32)]"
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden bg-rv-bg2">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-rv-bg2 text-xs font-medium text-rv-muted">
                          Sin foto
                        </div>
                      )}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rv-deep/60 via-transparent to-transparent opacity-90"
                        aria-hidden
                      />
                      {index === 0 ? (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-rv-accent/40 bg-rv-deep/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rv-accent-2 shadow-sm backdrop-blur">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rv-accent" aria-hidden />
                          Último ingreso
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="rv-display line-clamp-2 text-base font-bold leading-snug text-rv-text transition-colors group-hover:text-rv-accent-2 sm:text-lg">
                        {title}
                      </p>
                      <p className="mt-1 text-sm text-rv-muted">{v.year}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-rv-accent-2 transition-transform group-hover:translate-x-0.5">
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
