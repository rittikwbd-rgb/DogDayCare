import React from "react";
import { MessageCircle, Car, HelpCircle } from "lucide-react";
import {
  LOCKED_COPY,
  buildPricingWhatsAppUrl,
  buildWhatsAppUrl,
} from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { TerracottaDivider } from "./ResilientImage";

/**
 * SECTION E: TRANSPARENT PRICING
 * Renders the exact locked eyebrow, headline, description, 3 daily pricing cards
 * (₹500, ₹600, ₹800 PER DAY), ENQUIRE NOW buttons with size-specific WhatsApp messages,
 * and the exact pricing and pickup/drop-off notes.
 */
export const TransparentPricing: React.FC = () => {
  const { eyebrow, headline, description, cards, pricingNote, pickupNote } =
    LOCKED_COPY.sectionE_TransparentPricing;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#DDE7D8]/35 border-b border-[#234737]/10 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Locked Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
          <TerracottaDivider className="mb-2" />
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#C96F4A] mb-2">
            {eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="font-serif-display text-3xl sm:text-4xl text-[#234737] tracking-tight mb-3"
            style={{ textWrap: "balance" }}
          >
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed">
            {description}
          </p>
        </div>

        {/* 3 Daily Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {cards.map((card, index) => {
            const isMiddleCard = index === 1;
            const whatsappHref = buildPricingWhatsAppUrl(
              card.sizeLabel as "Small" | "Medium" | "Large",
              `pricing_card_${card.sizeLabel.toLowerCase()}`
            );

            return (
              <div
                key={card.category}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between border transition-colors ${
                  isMiddleCard
                    ? "bg-[#234737] text-[#FAF7F0] border-[#234737] shadow-sm"
                    : "bg-[#FAF7F0] text-[#252923] border-[#234737]/15"
                }`}
              >
                <div>
                  <p
                    className={`text-xs sm:text-sm font-semibold tracking-wider mb-4 ${
                      isMiddleCard ? "text-[#DDE7D8]" : "text-[#C96F4A]"
                    }`}
                  >
                    {card.category}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className={`font-serif-display text-4xl sm:text-5xl tabular-nums ${
                        isMiddleCard ? "text-[#FAF7F0]" : "text-[#234737]"
                      }`}
                    >
                      {card.price}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wider ${
                        isMiddleCard ? "text-[#DDE7D8]/90" : "text-[#252923]/70"
                      }`}
                    >
                      {card.period}
                    </span>
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("whatsapp_click", {
                      location_section: "pricing_card",
                      cta_label: `${card.category} - ${card.cta}`,
                    })
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isMiddleCard
                      ? "bg-[#C96F4A] hover:bg-[#b55e3b] text-[#FAF7F0]"
                      : "bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0]"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{card.cta}</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Locked Pricing Note & Pickup/Drop-Off Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#FAF7F0] border border-[#234737]/12 p-5 flex items-start gap-3.5">
            <HelpCircle
              className="w-5 h-5 text-[#C96F4A] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-2">
              <p className="text-sm text-[#252923]/85 leading-relaxed">
                {pricingNote}
              </p>
              <a
                href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.pricingGeneric, {
                  utm_source: "landing_page",
                  utm_medium: "pricing_note_cta",
                  utm_campaign: "dog_daycare_dum_dum",
                  utm_content: "pricing_category_help_note",
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent("whatsapp_click", {
                    location_section: "pricing_note",
                    cta_label: "ENQUIRE NOW",
                  })
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#234737] underline decoration-[#C96F4A] underline-offset-4 hover:text-[#C96F4A]"
              >
                <span>ENQUIRE NOW</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-[#FAF7F0] border border-[#234737]/12 p-5 flex items-start gap-3.5">
            <Car
              className="w-5 h-5 text-[#C96F4A] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-2">
              <p className="text-sm text-[#252923]/85 leading-relaxed">
                {pickupNote}
              </p>
              <a
                href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.pickupDropoff, {
                  utm_source: "landing_page",
                  utm_medium: "pricing_note_cta",
                  utm_campaign: "dog_daycare_dum_dum",
                  utm_content: "pricing_pickup_dropoff_note",
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent("whatsapp_click", {
                    location_section: "pickup_dropoff_note",
                    cta_label: "ENQUIRE NOW",
                  })
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#234737] underline decoration-[#C96F4A] underline-offset-4 hover:text-[#C96F4A]"
              >
                <span>ENQUIRE NOW</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
