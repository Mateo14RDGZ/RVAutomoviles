import { BrandLogo } from "@/components/brand-logo";
import { buildWhatsappUrl } from "@/lib/whatsapp-visit";

export function PublicFooter() {
  return (
    <footer className="mt-10 border-t border-rv-accent/15 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <BrandLogo className="pointer-events-none" />
          <p className="mt-3 max-w-md leading-relaxed">
            Publicaciones claras, fotos reales y proceso simple para clientes desde el celular.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-rv-accent">Contacto</p>
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300/55 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/rv.automoviles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-fuchsia-300/55 bg-fuchsia-50 px-3 py-2.5 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-100"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-sky-300/55 bg-sky-50 px-3 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
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
                className="font-semibold text-emerald-700 underline decoration-emerald-600/40 underline-offset-2 transition hover:text-emerald-800"
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
