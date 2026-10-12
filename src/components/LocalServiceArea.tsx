import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { LOCKED_COPY } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { TerracottaDivider } from "./ResilientImage";

/**
 * SECTION G: LOCAL SERVICE AREA
 * Renders the exact locked headline, description, address, and GET DIRECTIONS CTA
 * from LOCKED_COPY.sectionG_LocalServiceArea.
 */
export const LocalServiceArea: React.FC = () => {
  const { headline, description, address, cta } =
    LOCKED_COPY.sectionG_LocalServiceArea;

  const handleDirectionsClick = () => {
    trackConversionEvent("directions_click", {
      location_section: "local_service_area",
      cta_label: cta,
    });
  };

  return (
    <section
      aria-labelledby="service-area-heading"
      className="py-16 sm:py-20 bg-[#DDE7D8]/40 border-b border-[#234737]/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <TerracottaDivider className="mb-3" />
        <h2
          id="service-area-heading"
          className="font-serif-display text-3xl sm:text-4xl text-[#234737] tracking-tight mb-4"
          style={{ textWrap: "balance" }}
        >
          {headline}
        </h2>

        <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed max-w-2xl mx-auto mb-6">
          {description}
        </p>

        <div className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F0] border border-[#234737]/15 text-sm sm:text-base font-medium text-[#234737] mb-7">
          <MapPin className="w-4 h-4 text-[#C96F4A] shrink-0" aria-hidden="true" />
          <address className="not-italic">{address}</address>
        </div>

        <div>
          <a
            href={LOCKED_COPY.business.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDirectionsClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 shadow-xs whitespace-nowrap"
          >
            <Navigation className="w-4 h-4 text-[#DDE7D8]" aria-hidden="true" />
            <span>{cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
