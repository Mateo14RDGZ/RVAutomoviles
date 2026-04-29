import Link from "next/link";
import { buildWhatsappUrl } from "@/lib/whatsapp-visit";
import { BrandLogo } from "@/components/brand-logo";

const MAPS_SHORT_URL = "https://maps.app.goo.gl/XHWmX8T1a47y4VPP9";

function IconWhatsapp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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
                    <IconWhatsapp />
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
