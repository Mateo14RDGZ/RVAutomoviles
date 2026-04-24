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
      <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 animate-fade-in">
        <header className="border-b border-white/10 px-4 py-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Autos en venta</h1>
            <p className="mt-2 text-sm text-slate-300">
              Elegí una unidad para ver ficha completa, galería y documentación.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6">
          {vehicles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-14 text-center">
              <p className="text-sm text-slate-300">
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
                      className="group flex gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/[0.08]"
                    >
                      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-800 sm:w-32">
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
                        <p className="truncate font-semibold text-white">
                          {v.brand} {v.model}
                        </p>
                        <p className="text-xs text-slate-400">{v.year}</p>
                        <p className="mt-2 text-sm font-medium text-emerald-300">{price}</p>
                        <p className="mt-1 text-xs text-sky-200 transition-transform duration-300 group-hover:translate-x-1">
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
