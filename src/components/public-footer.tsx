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
    </footer>
  );
}
