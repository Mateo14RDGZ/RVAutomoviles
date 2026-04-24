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
  const vehicles = all.filter((v) => v.published);

  return (
    <PublicChrome>
      <div className="min-h-dvh animate-fade-in bg-white text-slate-900">
        <header className="border-b border-rv-accent/12 px-4 py-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Autos en venta</h1>
            <p className="mt-2 max-w-2xl border-l-4 border-rv-accent bg-rv-accent/[0.06] py-2 pl-3 text-sm text-slate-700">
              Elegí una unidad para ver ficha completa, galería y documentación.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6">
          {vehicles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-rv-accent/30 bg-rv-accent/[0.04] px-4 py-14 text-center">
              <p className="text-sm text-slate-600">
                Todavía no hay autos publicados. Cuando cargues unidades desde el panel y las
                marques como publicadas, aparecerán acá.
              </p>
            </div>
          ) : (
            <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {vehicles.map((v) => {
                const price =
                  v.price != null
                    ? `${v.currency} ${v.price.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`
                    : "Consultar";
                const thumb = v.photos[0];
                return (
                  <li key={v.id}>
                    <Link
                      href={`/v/${v.urlSlug}`}
                      className="group flex gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rv-accent/35 hover:shadow-[0_12px_36px_rgba(30,166,247,0.12)]"
                    >
                      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border border-rv-accent/10 bg-slate-100 sm:w-32">
                        {thumb ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={thumb} alt="" className="h-full w-full object-cover" />
                          </>
                        ) : (
                          <span className="flex h-full items-center justify-center text-[10px] text-slate-500">
                            Sin foto
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 py-1">
                        <p className="truncate font-semibold text-slate-900">
                          {v.brand} {v.model}
                        </p>
                        <p className="text-xs text-slate-500">{v.year}</p>
                        <p className="mt-2 text-sm font-semibold text-rv-accent">{price}</p>
                        <p className="mt-1 text-xs font-medium text-rv-accent/90 transition-transform duration-300 group-hover:translate-x-1">
                          Ver ficha →
                        </p>
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
