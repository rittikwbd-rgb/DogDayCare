import React from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { LOCKED_COPY, buildWhatsAppUrl } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";

/**
 * SECTION J: FINAL CTA
 * Renders the exact locked headline, description, primary CTA, secondary CTA,
 * contact numbers (8240300753, 03325605158), and address from LOCKED_COPY.sectionJ_FinalCta.
 */
export const FinalCta: React.FC = () => {
  const { headline, description, primaryCta, secondaryCta, phone, landline, address } =
    LOCKED_COPY.sectionJ_FinalCta;

  const handleWhatsAppClick = () => {
    trackConversionEvent("whatsapp_click", {
      location_section: "final_cta",
      cta_label: primaryCta,
    });
  };

  const handlePhoneClick = () => {
    trackConversionEvent("phone_click", {
      location_section: "final_cta",
      cta_label: secondaryCta,
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="final-cta-heading"
      className="bg-[#234737] text-[#FAF7F0] py-16 sm:py-20 lg:py-24 scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="flex items-center justify-center gap-3 mb-4"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-[#C96F4A]/60" />
          <span className="w-2 h-2 rotate-45 bg-[#C96F4A]" />
          <span className="h-px w-10 bg-[#C96F4A]/60" />
        </div>

        <h2
          id="final-cta-heading"
          className="font-serif-display text-3xl sm:text-5xl text-[#FAF7F0] tracking-wide mb-4"
          style={{ textWrap: "balance" }}
        >
          {headline}
        </h2>

        <p className="text-base sm:text-xl text-[#FAF7F0]/85 max-w-2xl mx-auto leading-relaxed mb-9">
          {description}
        </p>

        {/* Primary & Secondary Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10">
          <a
            href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
              utm_source: "landing_page",
              utm_medium: "final_cta",
              utm_campaign: "dog_daycare_dum_dum",
              utm_content: "final_chat_with_us_whatsapp",
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#C96F4A] hover:bg-[#b55e3b] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span>{primaryCta}</span>
          </a>

          <a
            href={LOCKED_COPY.business.phoneHref}
            onClick={handlePhoneClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-[#FAF7F0]/35 hover:bg-[#FAF7F0]/10 text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-[#DDE7D8]" aria-hidden="true" />
            <span>{secondaryCta}</span>
          </a>
        </div>

        {/* Contact Numbers & Address */}
        <div className="pt-8 border-t border-[#FAF7F0]/15 flex flex-col items-center gap-3 text-sm sm:text-base text-[#FAF7F0]/90">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold tabular-nums">
            <a
              href={LOCKED_COPY.business.phoneHref}
              onClick={() =>
                trackConversionEvent("phone_click", {
                  location_section: "final_cta_number",
                  cta_label: phone,
                })
              }
              className="inline-flex items-center gap-1.5 hover:text-[#DDE7D8] underline decoration-[#C96F4A] underline-offset-4"
            >
              <Phone className="w-4 h-4 text-[#C96F4A]" aria-hidden="true" />
              <span>{phone}</span>
            </a>

            <span className="text-[#FAF7F0]/30" aria-hidden="true">
              ·
            </span>

            <a
              href={LOCKED_COPY.business.landlineHref}
              onClick={() =>
                trackConversionEvent("phone_click", {
                  location_section: "final_cta_landline",
                  cta_label: landline,
                })
              }
              className="inline-flex items-center gap-1.5 hover:text-[#DDE7D8] underline decoration-[#C96F4A] underline-offset-4"
            >
              <Phone className="w-4 h-4 text-[#C96F4A]" aria-hidden="true" />
              <span>{landline}</span>
            </a>
          </div>

          <div className="inline-flex items-center justify-center gap-2 text-center text-[#DDE7D8]">
            <MapPin
              className="w-4 h-4 text-[#C96F4A] shrink-0"
              aria-hidden="true"
            />
            <address className="not-italic">{address}</address>
          </div>
        </div>
      </div>
    </section>
  );
};
