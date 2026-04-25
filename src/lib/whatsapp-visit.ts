/** Celular Uruguay 099 744 203 → formato internacional para enlaces wa.me */
export const WHATSAPP_VISIT_E164 = "59899744203";

export const WHATSAPP_VISIT_MESSAGE = "Buenas, me gustaria pasar a ver este auto";

export function buildWhatsappVisitMessage(listingAbsoluteUrl?: string | null): string {
  const u = listingAbsoluteUrl?.trim();
  if (u) return `${WHATSAPP_VISIT_MESSAGE}\n\n${u}`;
  return WHATSAPP_VISIT_MESSAGE;
}

export function buildWhatsappVisitUrl(listingAbsoluteUrl?: string | null): string {
  const text = buildWhatsappVisitMessage(listingAbsoluteUrl);
  return `https://wa.me/${WHATSAPP_VISIT_E164}?text=${encodeURIComponent(text)}`;
}

/** Abrir chat de WhatsApp (mensaje opcional). */
export function buildWhatsappUrl(optionalText?: string | null): string {
  const t = optionalText?.trim();
  if (t) return `https://wa.me/${WHATSAPP_VISIT_E164}?text=${encodeURIComponent(t)}`;
  return `https://wa.me/${WHATSAPP_VISIT_E164}`;
}
