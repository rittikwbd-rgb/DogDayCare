import React from "react";
import { ExternalLink } from "lucide-react";
import { LOCKED_COPY } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { TerracottaDivider } from "./ResilientImage";

/**
 * SECTION H: CUSTOMER REVIEWS
 * Renders the exact locked eyebrow, headline, description, and READ GOOGLE REVIEWS CTA
 * from LOCKED_COPY.sectionH_CustomerReviews.
 * Follows the strict rule:
 * "Do not generate fictional testimonials, customer names, review dates or ratings.
 * Do not fabricate a Google rating or review count.
 * If reviews are not available for integration, show the description and a button linking to the verified Google Business Profile."
 */
export const GoogleReviews: React.FC = () => {
  const { eyebrow, headline, description, cta } =
    LOCKED_COPY.sectionH_CustomerReviews;

  const handleReadReviewsClick = () => {
    trackConversionEvent("google_reviews_click", {
      location_section: "customer_reviews",
      cta_label: cta,
    });
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-16 sm:py-20 lg:py-24 border-b border-[#234737]/10 scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/85 border border-[#234737]/15 p-8 sm:p-12 text-center shadow-xs">
          <TerracottaDivider className="mb-3" />
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#C96F4A] mb-2">
            {eyebrow}
          </p>
          <h2
            id="reviews-heading"
            className="font-serif-display text-3xl sm:text-4xl text-[#234737] tracking-tight mb-4"
            style={{ textWrap: "balance" }}
          >
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-[#252923]/80 max-w-2xl mx-auto leading-relaxed mb-8">
            {description}
          </p>

          <a
            href={LOCKED_COPY.business.googleBusinessProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleReadReviewsClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap"
          >
            <span>{cta}</span>
            <ExternalLink className="w-4 h-4 text-[#DDE7D8]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
