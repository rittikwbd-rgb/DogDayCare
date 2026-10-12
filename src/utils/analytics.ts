/**
 * Analytics & Conversion Tracking Utility
 *
 * Prepares clean integration points for:
 * - Google Analytics 4 (gtag)
 * - Google Tag Manager (dataLayer)
 * - Meta Pixel (fbq)
 *
 * Tracks outbound WhatsApp clicks strictly as clicks (`whatsapp_click`),
 * never claiming a confirmed message send unless verified.
 */

export type ConversionEventName =
  | "page_view"
  | "whatsapp_click"
  | "phone_click"
  | "property_video_play"
  | "google_reviews_click"
  | "directions_click"
  | "daycare_enquiry_started"
  | "daycare_enquiry_submitted";

export interface ConversionEventParams {
  location_section?: string;
  cta_label?: string;
  destination_type?: string;
  dog_breed?: string;
  dog_age?: string;
  preferred_date?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackConversionEvent(
  eventName: ConversionEventName,
  params: ConversionEventParams = {}
): void {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page_path:
      typeof window !== "undefined" ? window.location.pathname : "/dog-daycare-dum-dum",
    ...params,
  };

  if (typeof window === "undefined") return;

  // Push to GTM dataLayer if available
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  } else {
    window.dataLayer = [payload];
  }

  // Send to Google Analytics 4 if configured
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Send to Meta Pixel if configured
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}
