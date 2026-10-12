import React from "react";
import { MapPin, Play, MessageCircle, PawPrint } from "lucide-react";
import { LOCKED_COPY, buildWhatsAppUrl } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { ResilientImage } from "./ResilientImage";

interface HeroProps {
  onTakePropertyTour: () => void;
}

/**
 * SECTION A: HERO
 * Mobile-optimized hero with concise vertical spacing so the Property Walkthrough
 * ("See Where Your Dog Will Spend the Day") appears higher up on the page.
 * Uses a single main facility photograph in the Hero (moving the additional dog
 * photographs below the walkthrough video so the walkthrough appears before them),
 * framed with object-[center_25%] so dog faces are never cropped off.
 */
export const Hero: React.FC<HeroProps> = ({ onTakePropertyTour }) => {
  const {
    eyebrow,
    headline,
    description,
    location,
    primaryCta,
    secondaryCta,
    supportingText,
  } = LOCKED_COPY.sectionA_Hero;

  const handlePrimaryCtaClick = () => {
    trackConversionEvent("whatsapp_click", {
      location_section: "hero_primary",
      cta_label: primaryCta,
    });
  };

  const handleTourCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackConversionEvent("property_video_play", {
      location_section: "hero_secondary",
      cta_label: secondaryCta,
    });
    onTakePropertyTour();
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-5 pb-8 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#234737]/10"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-[#DDE7D8]/40 rounded-bl-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copy & CTAs */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#C96F4A] mb-3">
              <span className="w-5 h-0.5 bg-[#C96F4A]" aria-hidden="true" />
              <span>{eyebrow}</span>
              <span className="w-5 h-0.5 bg-[#C96F4A]" aria-hidden="true" />
            </div>

            <h1
              id="hero-heading"
              className="font-serif-display text-[#234737] text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] tracking-tight mb-4"
              style={{ textWrap: "balance" }}
            >
              {headline}
            </h1>

            <p className="text-sm sm:text-lg text-[#252923]/85 leading-relaxed mb-6 max-w-2xl mx-auto">
              {description}
            </p>

            {/* Primary & Secondary CTAs — Full-width touch targets on mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6 w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
                  utm_source: "landing_page",
                  utm_medium: "hero_cta",
                  utm_campaign: "dog_daycare_dum_dum",
                  utm_content: "hero_primary_enquire_whatsapp",
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePrimaryCtaClick}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 shadow-sm whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#DDE7D8]" aria-hidden="true" />
                <span>{primaryCta}</span>
              </a>

              <a
                href="#property-tour"
                onClick={handleTourCtaClick}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl border border-[#234737]/25 bg-[#FAF7F0] hover:bg-[#DDE7D8]/45 text-[#234737] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Play
                  className="w-4 h-4 fill-[#C96F4A] text-[#C96F4A]"
                  aria-hidden="true"
                />
                <span>{secondaryCta}</span>
              </a>
            </div>

            {/* Location & Supporting Text */}
            <div className="pt-4 border-t border-[#234737]/10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#252923]/80">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#234737]">
                <MapPin
                  className="w-4 h-4 text-[#C96F4A] shrink-0"
                  aria-hidden="true"
                />
                <span>{location}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <PawPrint
                  className="w-3.5 h-3.5 text-[#234737] shrink-0"
                  aria-hidden="true"
                />
                <span>{supportingText}</span>
              </span>
            </div>
          </div>
      </div>
    </section>
  );
};
