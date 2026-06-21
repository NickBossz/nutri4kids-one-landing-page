// Camada simples de eventos. Em produção, plugar provedor real com consentimento.
export type AnalyticsEvent =
  | "hero_primary_cta_clicked"
  | "audience_family_selected"
  | "audience_school_selected"
  | "product_viewed"
  | "product_added_to_cart"
  | "product_removed_from_cart"
  | "cart_opened"
  | "checkout_started"
  | "checkout_error"
  | "whatsapp_order_clicked"
  | "school_contact_clicked"
  | "filter_applied"
  | "search_performed";

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${event}`, payload ?? {});
  }
}
