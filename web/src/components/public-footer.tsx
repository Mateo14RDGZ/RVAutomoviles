import { buildWhatsappUrl } from "@/lib/whatsapp-visit";
import { BrandLogo } from "@/components/brand-logo";

export function PublicFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-rv-accent/20 bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-40 w-40 rounded-full bg-rv-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-sky-300/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <BrandLogo className="inline-flex" />
          <p className="mt-3 max-w-md leading-relaxed">
            Tu próximo auto con información clara, fotos reales y documentación disponible.
          </p>
          <p className="rv-caption mt-3 flex items-center gap-2 normal-case tracking-normal text-xs text-slate-500">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            Atención · Lun–Vie 8:00–18:00 · Sáb 8:00–12:00
          </p>
        </div>

        <div className="space-y-3 md:justify-self-end md:text-right">
          <p className="font-semibold text-rv-accent">Contacto</p>

          <div className="grid grid-cols-1 gap-2 sm:hidden">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rv-glow-ring rv-mobile-card inline-flex items-center justify-center gap-2 rounded-xl border border-rv-accent/25 bg-white px-3 py-2.5 text-sm font-semibold text-rv-accent transition hover:bg-rv-accent/[0.06]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M20.5 3.5A11 11 0 003.5 18.6L2 22l3.5-1.4A11 11 0 1020.5 3.5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/rv__automoviles/"
              target="_blank"
              rel="noopener noreferrer"
              className="rv-glow-ring rv-mobile-card inline-flex items-center justify-center gap-2 rounded-xl border border-rv-accent/25 bg-white px-3 py-2.5 text-sm font-semibold text-rv-accent transition hover:bg-rv-accent/[0.06]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          <div className="hidden gap-2 sm:grid sm:min-w-[300px]">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rv-glow-ring inline-flex items-center justify-between gap-3 rounded-xl border border-rv-accent/25 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-rv-accent/[0.06] md:gap-2"
            >
              <span className="flex items-center gap-2 font-medium">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-rv-accent">
                  <path
                    d="M20.5 3.5A11 11 0 003.5 18.6L2 22l3.5-1.4A11 11 0 1020.5 3.5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                WhatsApp
              </span>
              <span className="font-semibold text-rv-accent underline decoration-rv-accent/40 underline-offset-2">
                099 744 203
              </span>
            </a>
            <a
              href="https://www.instagram.com/rv__automoviles/"
              target="_blank"
              rel="noopener noreferrer"
              className="rv-glow-ring inline-flex items-center justify-between gap-3 rounded-xl border border-rv-accent/25 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-rv-accent/[0.06] md:gap-2"
            >
              <span className="flex items-center gap-2 font-medium">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-rv-accent">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                Instagram
              </span>
              <span className="font-semibold text-rv-accent">@rv__automoviles</span>
            </a>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 text-xs md:justify-end">
            <a href="/privacidad" className="text-slate-500 underline-offset-2 hover:text-rv-accent hover:underline">
              Privacidad
            </a>
            <a href="/terminos" className="text-slate-500 underline-offset-2 hover:text-rv-accent hover:underline">
              Términos
            </a>
          </div>
        </div>
      </div>

      {/* Sub-footer con copyright fino */}
      <div className="relative border-t border-rv-accent/10 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-3 text-[11px] text-slate-500 sm:flex-row">
          <p className="rv-caption normal-case tracking-normal">
            © {new Date().getFullYear()} RV Automóviles · Hecho en Uruguay
          </p>
          <p className="rv-caption normal-case tracking-normal">
            <span className="rv-mono">v2.0</span> · Mobile-first · Catálogo en vivo
          </p>
        </div>
      </div>
    </footer>
  );
}
