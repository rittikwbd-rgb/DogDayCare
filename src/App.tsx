/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { VideoWalkthrough } from "./components/VideoWalkthrough";
import { DaycareBenefits } from "./components/DaycareExperience";
import { TransparentPricing } from "./components/TransparentPricing";
import { WhyMaxPetCorner } from "./components/WhyMaxPetCorner";
import { LocalServiceArea } from "./components/LocalServiceArea";
import { GoogleReviews } from "./components/GoogleReviews";
import { FaqAccordion } from "./components/FaqAccordion";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { trackConversionEvent } from "./utils/analytics";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasRequestedWalkthroughPlay, setHasRequestedWalkthroughPlay] =
    useState(false);

  useEffect(() => {
    const canonicalLink = document.getElementById(
      "canonical-link"
    ) as HTMLLinkElement | null;
    if (canonicalLink && typeof window !== "undefined") {
      canonicalLink.href = window.location.origin + window.location.pathname;
    }

    trackConversionEvent("page_view", {
      location_section: "landing_page",
    });
  }, []);

  const handleTakePropertyTour = () => {
    const tourSection = document.getElementById("property-tour");
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: "smooth" });
    }
    setHasRequestedWalkthroughPlay(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#252923]">
      {/* Keyboard accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#234737] focus:text-[#FAF7F0] focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Sticky Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main id="main-content" className="flex-1">
        {/* SECTION A: HERO */}
        <Hero onTakePropertyTour={handleTakePropertyTour} />

        {/* SECTION C: PROPERTY WALKTHROUGH ("See Where Your Dog Will Spend the Day" moved upward before the facility photo cards) */}
        <VideoWalkthrough
          hasRequestedPlay={hasRequestedWalkthroughPlay}
          setHasRequestedPlay={setHasRequestedWalkthroughPlay}
        />

        {/* SECTION B: TRUST BAR */}
        <TrustBar />

        {/* SECTION D: DAYCARE BENEFITS (With dog photographs focused on dog faces) */}
        <DaycareBenefits />

        {/* SECTION E: TRANSPARENT PRICING */}
        <TransparentPricing />

        {/* SECTION F: WHY MAX PET CORNER */}
        <WhyMaxPetCorner />

        {/* SECTION G: LOCAL SERVICE AREA */}
        <LocalServiceArea />

        {/* SECTION H: CUSTOMER REVIEWS */}
        <GoogleReviews />

        {/* SECTION I: FAQs */}
        <FaqAccordion />

        {/* SECTION J: FINAL CTA */}
        <FinalCta />
      </main>

      {/* SECTION K: FOOTER */}
      <Footer />

      {/* Fixed Bottom Mobile CTA */}
      <MobileStickyBar hiddenWhenOverlayOpen={isMobileMenuOpen} />
    </div>
  );
}
