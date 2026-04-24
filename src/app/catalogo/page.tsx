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

  return (
    <PublicChrome>
      <div className="min-h-dvh animate-fade-in bg-white text-slate-900">
        <header className="border-b border-rv-accent/12 px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Autos en venta</h1>
            <p className="mt-2 max-w-2xl border-l-4 border-rv-accent bg-rv-accent/[0.06] py-2 pl-3 text-sm text-slate-700">
              Elegí una unidad para ver ficha completa, galería y documentación.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          {vehicles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-rv-accent/30 bg-rv-accent/[0.04] px-4 py-14 text-center">
              <p className="text-sm text-slate-600">
                Todavía no hay autos publicados. Cuando cargues unidades desde el panel y las
                marques como publicadas, aparecerán acá.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
              {vehicles.map((v) => {
                const thumb = v.photos[0];
                const title = `${v.brand} ${v.model}`.trim();
                return (
                  <li key={v.id} className="min-w-0">
                    <Link
                      href={`/v/${v.urlSlug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rv-accent/35 hover:shadow-[0_14px_40px_rgba(30,166,247,0.14)]"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-2 text-center text-[10px] font-medium text-slate-400 sm:text-xs">
                            Sin foto
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
                        <p className="line-clamp-2 text-xs font-semibold leading-snug text-slate-900 sm:text-base sm:leading-snug group-hover:text-rv-accent">
                          {title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500 sm:mt-1 sm:text-sm">{v.year}</p>
                        <span className="mt-auto pt-2 text-[10px] font-semibold text-rv-accent sm:text-xs">
                          Ver ficha →
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
