import React from "react";
import { Wind, Utensils, HeartHandshake, Car, MessageCircle } from "lucide-react";
import { LOCKED_COPY, buildWhatsAppUrl } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { ResilientImage, TerracottaDivider } from "./ResilientImage";

const CARD_ICONS = [Wind, Utensils, HeartHandshake, Car];

// Map the 4 daycare benefit cards to authentic uploaded Max Pet Corner dog portraits
// with explicit aspect-ratio (4:5) and precise focal object positioning so dog faces are perfectly centered and never cropped
const BENEFIT_CARD_IMAGES = [
  {
    ...LOCKED_COPY.images.facilityGallery[0], // Dogs in Max Pet Corner care facility
    objectPosition: "object-[center_18%]",
  },
  {
    ...LOCKED_COPY.images.facilityGallery[1], // Happy dog 2
    objectPosition: "object-[center_12%]",
  },
  {
    ...LOCKED_COPY.images.facilityGallery[2], // Dogs relaxing 3
    objectPosition: "object-[center_15%]",
  },
  {
    ...LOCKED_COPY.images.facilityGallery[3], // Attentive pet care 4
    objectPosition: "object-[center_15%]",
  },
];

/**
 * SECTION D: DAYCARE BENEFITS
 * Renders the exact locked eyebrow, headline, 4 benefit cards, and CTA from LOCKED_COPY.sectionD_DaycareBenefits.
 * Uses explicit 4:5 aspect ratio (style={{ aspectRatio: "4/5" }} / aspect-[4/5]) with precise upper-focal object positioning
 * to ensure all dog faces are perfectly centered and never cropped across mobile and desktop.
 */
export const DaycareBenefits: React.FC = () => {
  const { eyebrow, headline, cards, cta } = LOCKED_COPY.sectionD_DaycareBenefits;

  const handleCardCtaClick = (isPickupCard: boolean, cardHeading: string) => {
    trackConversionEvent("whatsapp_click", {
      location_section: "daycare_benefits",
      cta_label: cardHeading,
    });
    return isPickupCard
      ? buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.pickupDropoff, {
          utm_source: "landing_page",
          utm_medium: "benefits_card_cta",
          utm_campaign: "dog_daycare_dum_dum",
          utm_content: "benefits_pickup_dropoff",
        })
      : buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
          utm_source: "landing_page",
          utm_medium: "benefits_card_cta",
          utm_campaign: "dog_daycare_dum_dum",
          utm_content: "benefits_general_enquiry",
        });
  };

  return (
    <section
      id="daycare"
      aria-labelledby="daycare-benefits-heading"
      className="py-12 sm:py-20 lg:py-24 border-b border-[#234737]/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-14">
          <TerracottaDivider className="mb-2" />
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#C96F4A] mb-2">
            {eyebrow}
          </p>
          <h2
            id="daycare-benefits-heading"
            className="font-serif-display text-2xl sm:text-4xl text-[#234737] tracking-tight"
            style={{ textWrap: "balance" }}
          >
            {headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => {
            const IconComponent = CARD_ICONS[index] || HeartHandshake;
            const cardImage = BENEFIT_CARD_IMAGES[index];
            const isPickupCard = index === 3;
            const cardWhatsappHref = isPickupCard
              ? buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.pickupDropoff, {
                  utm_source: "landing_page",
                  utm_medium: "benefits_card_cta",
                  utm_campaign: "dog_daycare_dum_dum",
                  utm_content: "benefits_pickup_dropoff",
                })
              : buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
                  utm_source: "landing_page",
                  utm_medium: "benefits_card_cta",
                  utm_campaign: "dog_daycare_dum_dum",
                  utm_content: "benefits_general_enquiry",
                });

            return (
              <article
                key={card.heading}
                className="rounded-2xl bg-white/85 border border-[#234737]/12 overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#234737]/30"
              >
                <div>
                  {cardImage && (
                    <div
                      className="w-full overflow-hidden bg-[#DDE7D8]/35"
                      style={{ aspectRatio: "4 / 5" }}
                    >
                      <ResilientImage
                        src={cardImage.src}
                        alt={cardImage.alt}
                        width={600}
                        height={750}
                        loading="lazy"
                        containerClassName="w-full h-full"
                        className={`w-full h-full object-cover ${cardImage.objectPosition}`}
                      />
                    </div>
                  )}

                  <div className="p-4 sm:p-6">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DDE7D8]/70 text-[#234737] flex items-center justify-center mb-3">
                      <IconComponent
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#234737]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-serif-display text-lg sm:text-2xl text-[#234737] mb-2 leading-snug">
                      {card.heading}
                    </h3>
                    <p className="text-sm sm:text-base text-[#252923]/80 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {isPickupCard && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-2.5 border-t border-[#234737]/10">
                    <a
                      href={cardWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleCardCtaClick(true, card.heading)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#C96F4A] hover:text-[#234737] transition-colors"
                    >
                      <span>{cta}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <a
            href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
              utm_source: "landing_page",
              utm_medium: "section_cta",
              utm_campaign: "dog_daycare_dum_dum",
              utm_content: "benefits_ask_about_daycare",
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConversionEvent("whatsapp_click", {
                location_section: "daycare_benefits_main_cta",
                cta_label: cta,
              })
            }
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-4 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 shadow-xs whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#DDE7D8]" aria-hidden="true" />
            <span>{cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
