import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { LOCKED_COPY, buildWhatsAppUrl } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";

interface MobileStickyBarProps {
  hiddenWhenOverlayOpen: boolean;
}

/**
 * Fixed Bottom Mobile CTA Bar
 * Contains WhatsApp and Call actions without covering important content.
 */
export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  hiddenWhenOverlayOpen,
}) => {
  if (hiddenWhenOverlayOpen) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Mobile Contact Actions"
      className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#FAF7F0]/95 backdrop-blur-md border-t border-[#234737]/15 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
            utm_source: "landing_page",
            utm_medium: "mobile_sticky_cta",
            utm_campaign: "dog_daycare_dum_dum",
            utm_content: "mobile_sticky_whatsapp",
          })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackConversionEvent("whatsapp_click", {
              location_section: "mobile_sticky_bar",
              cta_label: "WhatsApp",
            })
          }
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#234737] active:bg-[#1a3629] text-[#FAF7F0] text-sm font-semibold whitespace-nowrap"
        >
          <MessageCircle
            className="w-4 h-4 text-[#DDE7D8] shrink-0"
            aria-hidden="true"
          />
          <span>WhatsApp</span>
        </a>

        <a
          href={LOCKED_COPY.business.phoneHref}
          onClick={() =>
            trackConversionEvent("phone_click", {
              location_section: "mobile_sticky_bar",
              cta_label: "Call",
            })
          }
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#C96F4A] active:bg-[#b55e3b] text-[#FAF7F0] text-sm font-semibold whitespace-nowrap"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
};
