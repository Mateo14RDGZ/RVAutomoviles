import Image from "next/image";
import Link from "next/link";
import { DuplicateVehicleButton } from "@/components/duplicate-vehicle-button";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehículos",
};

export default async function AdminVehiclesPage() {
  const vehicles = await listVehicles();
  const total = vehicles.length;
  const published = vehicles.filter((v) => v.published).length;
  const drafts = total - published;

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <header className="rv-surface relative overflow-hidden p-5 sm:p-6">
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rv-accent/15 blur-3xl"
          aria-hidden
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rv-accent">Catálogo</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Vehículos</h1>
            <p className="mt-1.5 max-w-md text-sm text-slate-600">
              Editá datos, fotos y documentación. Tocá una unidad para abrir su edición.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700">
                Total: <span className="text-slate-900">{total}</span>
              </span>
              <span className="rounded-full border border-emerald-300/60 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
                Publicados: {published}
              </span>
              <span className="rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
                Borradores: {drafts}
              </span>
            </div>
          </div>
          <Link href="/admin/vehicles/new" className="rv-btn-primary inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Nuevo vehículo
          </Link>
        </div>
      </header>

      {vehicles.length === 0 ? (
        <div className="rv-surface relative overflow-hidden border-dashed p-10 text-center">
          <span
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rv-accent/15 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <p className="text-sm font-semibold text-slate-800">Todavía no hay vehículos cargados</p>
            <p className="mt-1 text-sm text-slate-600">
              Creá el primero para obtener su enlace público y poder compartirlo.
            </p>
            <Link
              href="/admin/vehicles/new"
              className="rv-btn-primary mt-5 inline-flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Cargar primer vehículo
            </Link>
          </div>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((v) => {
            const thumb = v.photos[0];
            const vehicleName = `${v.brand} ${v.model}`.trim();
            const photoCount = v.photos.length;
            return (
              <li key={v.id}>
                <div className="rv-glow-ring group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-rv-accent/35 hover:shadow-[0_22px_50px_rgba(0,115,230,0.18)]">
                  <Link
                    href={`/admin/vehicles/${v.id}/edit`}
                    aria-label={`Editar ${vehicleName} ${v.year}`}
                    className="block"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={vehicleName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs font-medium text-slate-400">
                          Sin foto cargada
                        </div>
                      )}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                        aria-hidden
                      />
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <span
                          className={
                            v.published
                              ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-300/70 bg-emerald-50/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700 backdrop-blur"
                              : "inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700 backdrop-blur"
                          }
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              v.published ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                            aria-hidden
                          />
                          {v.published ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                      {photoCount > 0 ? (
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                            <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M3 17l5-4 5 4 4-3 4 3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                          </svg>
                          {photoCount} foto{photoCount === 1 ? "" : "s"}
                        </span>
                      ) : null}
                    </div>

                    <div className="px-4 pt-3">
                      <p className="truncate text-base font-semibold text-slate-900" title={vehicleName}>
                        {vehicleName}{" "}
                        <span className="font-medium text-slate-500">· {v.year}</span>
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">/v/{v.urlSlug}</p>
                    </div>
                  </Link>

                  <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-3 py-2.5">
                    <Link
                      href={`/admin/vehicles/${v.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rv-accent/[0.08] px-3 py-1.5 text-xs font-bold text-rv-accent transition hover:bg-rv-accent/[0.14]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                        <path
                          d="M4 20h4l10-10-4-4L4 16v4z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      Editar
                    </Link>
                    {v.published ? (
                      <Link
                        href={`/v/${v.urlSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                          <path
                            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                        Ver
                      </Link>
                    ) : null}
                    <DuplicateVehicleButton sourceId={v.id} sourceLabel={`${vehicleName} ${v.year}`} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
