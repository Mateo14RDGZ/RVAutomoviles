import Link from "next/link";
import { buildWhatsappUrl } from "@/lib/whatsapp-visit";
import { BrandLogo } from "@/components/brand-logo";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

const MAPS_SHORT_URL = "https://maps.app.goo.gl/XHWmX8T1a47y4VPP9";

function IconInstagram({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconClock({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-rv-border bg-rv-bg2">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rv-accent/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 -top-12 h-56 w-56 rounded-full bg-rv-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-rv-glow/15 blur-3xl"
        aria-hidden
      />

      {/* Top: marca + contacto + visitar */}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8">
        <div>
          <BrandLogo className="inline-flex" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-rv-muted">
            Automotora en Uruguay con catálogo actualizado, fotos reales y atención personalizada en cada
            consulta.
          </p>
        </div>

        <div>
          <p className="rv-eyebrow">Contacto</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={buildWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rv-glow-ring group flex items-center justify-between gap-3 rounded-xl border border-rv-border bg-rv-surface/60 px-3 py-2.5 text-sm text-rv-text transition hover:-translate-y-0.5 hover:border-rv-accent/55 hover:bg-rv-surface"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rv-accent/15 text-rv-accent-2 ring-1 ring-rv-accent/30">
                    <WhatsappIcon className="h-4 w-4" />
                  </span>
                  WhatsApp
                </span>
                <span className="rv-mono text-sm font-semibold text-rv-accent-2">099 744 203</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/rv__automoviles/"
                target="_blank"
                rel="noopener noreferrer"
                className="rv-glow-ring group flex items-center justify-between gap-3 rounded-xl border border-rv-border bg-rv-surface/60 px-3 py-2.5 text-sm text-rv-text transition hover:-translate-y-0.5 hover:border-rv-accent/55 hover:bg-rv-surface"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rv-accent/15 text-rv-accent-2 ring-1 ring-rv-accent/30">
                    <IconInstagram />
                  </span>
                  Instagram
                </span>
                <span className="text-sm font-semibold text-rv-accent-2">RV Automóviles</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="rv-eyebrow">Visitanos</p>
          <ul className="mt-4 space-y-2.5 text-sm text-rv-muted">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rv-accent/15 text-rv-accent-2 ring-1 ring-rv-accent/30">
                <IconClock />
              </span>
              <div>
                <p className="font-medium text-rv-text">Horarios</p>
                <p className="text-xs text-rv-muted">Lunes a Viernes 8:00 – 18:00</p>
                <p className="text-xs text-rv-muted">Sábados 8:00 – 12:00</p>
              </div>
            </li>
            <li>
              <a
                href={MAPS_SHORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-rv-border bg-rv-surface/60 px-3 py-2 text-sm font-semibold text-rv-accent-2 transition hover:-translate-y-0.5 hover:border-rv-accent/55 hover:bg-rv-surface"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-rv-accent/15 ring-1 ring-rv-accent/30">
                  <IconPin className="h-3.5 w-3.5" />
                </span>
                Cómo llegar
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-footer: una sola línea con legales, copyright y firma */}
      <div className="relative border-t border-rv-border bg-rv-deep/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-[11px] text-rv-muted sm:flex-row sm:gap-4 sm:px-6">
          <p className="rv-caption normal-case tracking-normal text-center sm:text-left">
            © {year} RV Automóviles · Todos los derechos reservados
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/privacidad" className="hover:text-rv-accent-2 hover:underline">
              Privacidad
            </Link>
            <span className="h-3 w-px bg-rv-border" aria-hidden />
            <Link href="/terminos" className="hover:text-rv-accent-2 hover:underline">
              Términos
            </Link>
            <span className="h-3 w-px bg-rv-border" aria-hidden />
            <span>
              Desarrollado por{" "}
              <span className="font-semibold text-rv-text">RF DigitalStudio</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
