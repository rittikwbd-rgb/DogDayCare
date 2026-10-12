import React from "react";
import { Wind, Utensils, HeartHandshake, Car } from "lucide-react";
import { LOCKED_COPY } from "../config/businessConfig";

const INDICATOR_ICONS = [Wind, Utensils, HeartHandshake, Car];

/**
 * SECTION B: TRUST BAR
 * Renders the exact locked heading and 4 trust indicators from LOCKED_COPY.sectionB_TrustBar.
 * Uses a compact 2x2 grid on mobile for fast scanning without excessive vertical scrolling.
 */
export const TrustBar: React.FC = () => {
  const { heading, indicators } = LOCKED_COPY.sectionB_TrustBar;

  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="bg-[#DDE7D8]/55 border-b border-[#234737]/10 py-6 sm:py-9"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="trust-bar-heading"
          className="font-serif-display text-lg sm:text-2xl text-[#234737] text-center mb-4 sm:mb-6"
        >
          {heading}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {indicators.map((label, index) => {
            const IconComponent = INDICATOR_ICONS[index] || HeartHandshake;
            return (
              <div
                key={label}
                className="rounded-xl bg-[#FAF7F0] border border-[#234737]/12 px-3 py-3 sm:px-4 sm:py-3.5 flex items-center gap-2.5 sm:gap-3"
              >
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#234737]/10 text-[#234737] inline-flex items-center justify-center shrink-0">
                  <IconComponent
                    className="w-4 h-4 text-[#C96F4A]"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[11px] sm:text-sm font-semibold tracking-wider text-[#234737] leading-snug">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
