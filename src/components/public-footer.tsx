import { buildWhatsappUrl } from "@/lib/whatsapp-visit";

export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-indigo-300/20 bg-slate-950/95">
      <div className="rv-mobile-enter rv-mobile-enter-6 mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-400 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 text-xs font-black text-slate-950">
              RV
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
              RV Automoviles
            </p>
          </div>
          <p className="mt-2 leading-relaxed">
            Tu proximo auto con informacion clara, fotos reales y documentacion disponible.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-slate-200">Contacto</p>
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rv-mobile-card inline-flex items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold text-emerald-200 transition"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/rv.automoviles"
              target="_blank"
              rel="noopener noreferrer"
              className="rv-mobile-card inline-flex items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold text-fuchsia-100 transition"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rv-mobile-card inline-flex items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold text-cyan-100 transition"
            >
              Facebook
            </a>
          </div>
          <div className="hidden space-y-2 sm:block">
            <p>
              WhatsApp:{" "}
              <a
                href={buildWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-400 underline decoration-emerald-500/40 underline-offset-2 transition hover:text-emerald-300"
              >
                099 744 203
              </a>
            </p>
            <p>Instagram: @rv.automoviles</p>
            <p>Facebook: RV Automoviles</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
