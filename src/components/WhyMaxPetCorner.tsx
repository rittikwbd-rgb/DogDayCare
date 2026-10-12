import React from "react";
import { Check, MessageCircle } from "lucide-react";
import { LOCKED_COPY, buildWhatsAppUrl } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { ResilientImage, TerracottaDivider } from "./ResilientImage";

/**
 * SECTION F: WHY MAX PET CORNER
 * Renders the exact locked eyebrow, headline, description, 5 supporting points, and CTA
 * from LOCKED_COPY.sectionF_WhyMaxPetCorner paired with the authentic Max Pet Corner photos
 * framed with upper-focal positioning (`object-[center_15%]`) so dog faces are never cut off.
 */
export const WhyMaxPetCorner: React.FC = () => {
  const { eyebrow, headline, description, supportingPoints, cta } =
    LOCKED_COPY.sectionF_WhyMaxPetCorner;

  const galleryPhotos = [
    LOCKED_COPY.images.facilityGallery[0],
    LOCKED_COPY.images.facilityGallery[3],
    LOCKED_COPY.images.facilityGallery[4],
    LOCKED_COPY.images.facilityGallery[1],
  ];

  return (
    <section
      aria-labelledby="why-max-heading"
      className="py-12 sm:py-20 lg:py-24 border-b border-[#234737]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Locked Copy & Supporting Points */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <TerracottaDivider className="justify-start mb-2" />
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#C96F4A] mb-2">
              {eyebrow}
            </p>
            <h2
              id="why-max-heading"
              className="font-serif-display text-2xl sm:text-4xl text-[#234737] tracking-tight mb-3.5"
              style={{ textWrap: "balance" }}
            >
              {headline}
            </h2>
            <p className="text-sm sm:text-lg text-[#252923]/80 leading-relaxed mb-6 max-w-2xl">
              {description}
            </p>

            {/* 5 Locked Supporting Points */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-7">
              {supportingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 rounded-xl bg-white/80 border border-[#234737]/12 px-3.5 py-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#234737] text-[#FAF7F0] inline-flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#234737]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <a
                href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
                  utm_source: "landing_page",
                  utm_medium: "section_cta",
                  utm_campaign: "dog_daycare_dum_dum",
                  utm_content: "why_max_lets_talk_about_your_dog",
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent("whatsapp_click", {
                    location_section: "why_max_pet_corner",
                    cta_label: cta,
                  })
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-4 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 shadow-xs whitespace-nowrap"
              >
                <MessageCircle
                  className="w-4 h-4 text-[#DDE7D8]"
                  aria-hidden="true"
                />
                <span>{cta}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Max Pet Corner Dog Photos — Square / Portrait-Friendly Framing Focused on Faces */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.src}
                className="rounded-2xl overflow-hidden border border-[#234737]/12 bg-[#DDE7D8]/35 aspect-square"
              >
                <ResilientImage
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={600}
                  loading="lazy"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
