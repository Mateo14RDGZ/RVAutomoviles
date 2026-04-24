import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <main className="mx-auto flex max-w-lg flex-col gap-8 px-4 py-14">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            PWA · Mobile first
          </p>
          <h1 className="text-3xl font-semibold leading-tight">
            Catálogo listo para compartir en redes
          </h1>
          <p className="text-sm leading-relaxed text-slate-300">
            Cada vehículo tiene su propia página pública. Ideal para enlazar desde Instagram o
            WhatsApp: el cliente ve fotos, ficha técnica y documentación sin ver el panel interno.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <p className="font-medium text-white">Uso principal</p>
          <p className="mt-2 text-slate-300">
            Publicás el auto, copiás el enlace tipo{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs text-sky-200">/v/abcd1234</code>{" "}
            y lo pegás en la historia. Los clientes entran desde el celular como una app ligera
            (instalable como PWA).
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Entrar al panel
          </Link>
          <p className="self-center text-center text-xs text-slate-500 sm:text-left">
            El listado público global lo podemos agregar después; el foco ahora es la ficha por
            enlace.
          </p>
        </div>
      </main>
    </div>
  );
}
