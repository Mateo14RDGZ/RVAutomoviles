import Link from "next/link";
import { PublicChrome } from "@/components/public-chrome";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <PublicChrome>
      <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <main className="mx-auto flex max-w-lg flex-col gap-8 px-4 pb-6 pt-12">
          <header className="space-y-3 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              RV Automóviles · PWA
            </p>
            <h1 className="text-3xl font-semibold leading-tight">
              Catálogo para tus clientes
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Publicá cada unidad con fotos, ficha técnica y documentación. Compartí el enlace en
              Instagram o WhatsApp: el cliente abre la ficha en el celular, sin ver el panel
              interno.
            </p>
          </header>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm text-slate-200">
            <h2 className="font-semibold text-white">Para clientes</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-300">
              <li>
                Listado de autos publicados en <strong className="text-white">Autos</strong>.
              </li>
              <li>
                Cada auto tiene su URL{" "}
                <code className="rounded bg-black/30 px-1 text-xs">/v/slug</code> para historias y
                mensajes.
              </li>
              <li>Podés instalar la web como app desde el navegador (PWA).</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm text-slate-200">
            <h2 className="font-semibold text-white">Para la automotora</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-300">
              <li>Alta y edición de vehículos, fotos y documentos desde el panel.</li>
              <li>Enlace copiable por unidad para redes.</li>
              <li>Borradores con “no publicado” hasta que esté listo.</li>
            </ul>
          </section>

          <div className="flex flex-col gap-3">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400"
            >
              Ver autos en venta
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Panel de administración
            </Link>
          </div>

          <p className="text-center text-xs text-slate-500">
            Los datos en producción van a Neon y los archivos a Vercel Blob (configuración en el
            servidor).
          </p>
        </main>
      </div>
    </PublicChrome>
  );
}
