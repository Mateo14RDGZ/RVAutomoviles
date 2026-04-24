/** Celular Uruguay 099 744 203 → formato internacional para enlaces wa.me */
export const WHATSAPP_VISIT_E164 = "59899744203";

export const WHATSAPP_VISIT_MESSAGE = "Buenas, me gustaria pasar a ver este auto";

export function buildWhatsappVisitUrl(): string {
  return `https://wa.me/${WHATSAPP_VISIT_E164}?text=${encodeURIComponent(WHATSAPP_VISIT_MESSAGE)}`;
}
