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
      <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <header className="border-b border-white/10 px-4 py-6">
          <div className="mx-auto max-w-lg">
            <h1 className="text-2xl font-semibold">Autos en venta</h1>
            <p className="mt-2 text-sm text-slate-400">
              Tocá un vehículo para ver la ficha completa, fotos y documentación.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-lg px-4 py-6">
          {vehicles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-14 text-center">
              <p className="text-sm text-slate-300">
                Todavía no hay autos publicados. Cuando cargues unidades desde el panel y las
                marques como publicadas, aparecerán acá.
              </p>
              <Link
                href="/admin/login"
                className="mt-6 inline-block text-sm font-medium text-sky-300 underline"
              >
                Ir al panel
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
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
                      className="flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm transition-colors hover:border-sky-500/40 hover:bg-white/[0.07]"
                    >
                      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-800">
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
                        <p className="mt-1 text-xs text-sky-300">Ver ficha →</p>
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
