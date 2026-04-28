import Link from "next/link";
import { listVehicles } from "@/lib/vehicle-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Panel",
};

function StatCard({
  label,
  value,
  helper,
  tone,
  icon,
}: {
  label: string;
  value: number | string;
  helper?: string;
  tone: "accent" | "emerald" | "amber" | "slate";
  icon: React.ReactNode;
}) {
  const toneMap = {
    accent: "from-sky-500 to-cyan-400",
    emerald: "from-emerald-500 to-teal-400",
    amber: "from-amber-500 to-orange-400",
    slate: "from-slate-700 to-slate-500",
  } as const;

  return (
    <div className="rv-surface relative overflow-hidden p-5">
      <span
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${toneMap[tone]} opacity-15 blur-3xl`}
        aria-hidden
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${toneMap[tone]} text-white shadow-md`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold tabular-nums text-slate-900 sm:text-4xl">{value}</p>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
  primary,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  primary?: boolean;
  icon: React.ReactNode;
}) {
  const cardCls = primary
    ? "rv-glow-ring relative overflow-hidden rounded-2xl border border-rv-accent/30 bg-gradient-to-br from-rv-accent/[0.12] via-white to-rv-accent/[0.06] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,115,230,0.22)]"
    : "rv-glow-ring relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-rv-accent/35 hover:shadow-[0_14px_32px_rgba(0,115,230,0.14)]";

  return (
    <Link href={href} className={cardCls}>
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rv-accent/[0.12] text-rv-accent ring-1 ring-rv-accent/30">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rv-accent">
        Abrir
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export default async function AdminHomePage() {
  const vehicles = await listVehicles();
  const total = vehicles.length;
  const published = vehicles.filter((v) => v.published).length;
  const drafts = total - published;

  const recent = vehicles
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-7">
      {/* Cabecera */}
      <header className="rv-surface relative overflow-hidden p-5 sm:p-6">
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-rv-accent/15 blur-3xl"
          aria-hidden
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rv-accent">Panel · RV</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Hola 👋, este es tu resumen
            </h1>
            <p className="mt-1.5 max-w-lg text-sm text-slate-600">
              Gestioná el catálogo, publicá unidades y copiá enlaces para redes sociales en un toque.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/vehicles/new" className="rv-btn-primary inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Nuevo vehículo
            </Link>
            <Link href="/admin/vehicles" className="rv-btn-secondary inline-flex items-center gap-2">
              Ver listado
            </Link>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Total"
          value={total}
          helper="Unidades en el sistema"
          tone="accent"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M3 12l2-5a2 2 0 011.8-1.2h10.4A2 2 0 0119 7l2 5v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <StatCard
          label="Publicados"
          value={published}
          helper="Visibles en la web"
          tone="emerald"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          label="Borradores"
          value={drafts}
          helper="Pendientes de publicar"
          tone="amber"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 5v7l4 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          }
        />
        <StatCard
          label="Estado"
          value={total === 0 ? "Vacío" : drafts === 0 ? "Al día" : `${drafts} pend.`}
          helper={total === 0 ? "Cargá tu primera unidad" : drafts === 0 ? "Todo publicado" : "Revisar borradores"}
          tone="slate"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </section>

      {/* Acciones rápidas */}
      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">Accesos rápidos</h2>
          <span className="rv-chip">Atajos</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            href="/admin/vehicles/new"
            title="Cargar vehículo"
            description="Creá un borrador, subí fotos y publicalo cuando esté listo."
            primary
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
          <QuickAction
            href="/admin/vehicles"
            title="Gestionar catálogo"
            description="Editá datos, fotos, documentación y duplicá unidades existentes."
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
          <QuickAction
            href="/catalogo"
            title="Ver catálogo público"
            description="Abrí el catálogo como lo ven tus clientes para chequear que todo se vea bien."
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Actividad reciente */}
      {recent.length > 0 ? (
        <section>
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">Actividad reciente</h2>
            <Link href="/admin/vehicles" className="text-sm font-semibold text-rv-accent hover:underline">
              Ver todo →
            </Link>
          </div>
          <ul className="mt-4 grid gap-2">
            {recent.map((v) => (
              <li key={v.id}>
                <Link
                  href={`/admin/vehicles/${v.id}/edit`}
                  className="rv-surface flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition hover:-translate-y-0.5 hover:border-rv-accent/45"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {v.brand} {v.model}{" "}
                      <span className="font-normal text-slate-500">· {v.year}</span>
                    </p>
                    <p className="truncate text-xs text-slate-500">/v/{v.urlSlug}</p>
                  </div>
                  <span
                    className={
                      v.published
                        ? "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/60 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700"
                        : "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700"
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
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="rv-surface p-8 text-center">
          <p className="text-sm text-slate-700">
            Aún no hay vehículos. Empezá creando el primero desde{" "}
            <Link href="/admin/vehicles/new" className="font-semibold text-rv-accent hover:underline">
              Nuevo vehículo
            </Link>
            .
          </p>
        </section>
      )}
    </div>
  );
}
