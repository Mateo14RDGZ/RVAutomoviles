import { buildWhatsappUrl } from "@/lib/whatsapp-visit";

export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-rv-accent/20 bg-white">
      <div className="rv-mobile-enter rv-mobile-enter-6 mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-rv-accent/20 bg-gradient-to-r from-white to-rv-accent/[0.08] px-3 py-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rv-accent to-sky-300 text-xs font-black text-white">
              RV
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
              RV Automoviles
            </p>
          </div>
          <p className="mt-2 leading-relaxed">
            Tu proximo auto con informacion clara, fotos reales y documentacion disponible.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-rv-accent">Contacto</p>
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rv-mobile-card inline-flex items-center justify-center rounded-xl border border-rv-accent/25 bg-white px-3 py-2.5 text-sm font-semibold text-rv-accent transition hover:bg-rv-accent/[0.06]"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/rv.automoviles"
              target="_blank"
              rel="noopener noreferrer"
              className="rv-mobile-card inline-flex items-center justify-center rounded-xl border border-rv-accent/25 bg-white px-3 py-2.5 text-sm font-semibold text-rv-accent transition hover:bg-rv-accent/[0.06]"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rv-mobile-card inline-flex items-center justify-center rounded-xl border border-rv-accent/25 bg-white px-3 py-2.5 text-sm font-semibold text-rv-accent transition hover:bg-rv-accent/[0.06]"
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
                className="font-semibold text-rv-accent underline decoration-rv-accent/40 underline-offset-2 transition hover:text-rv-accent/80"
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
