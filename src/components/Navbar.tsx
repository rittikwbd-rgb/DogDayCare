import React, { useEffect, useState } from "react";
import { PawPrint, Menu, X, MessageCircle, Phone } from "lucide-react";
import { LOCKED_COPY, buildWhatsAppUrl } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TOP_NAV_LINKS = [
  { label: "Daycare", href: "#daycare" },
  { label: "Pricing", href: "#pricing" },
  { label: "Property Tour", href: "#property-tour" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];

export const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleWhatsAppNavClick = () => {
    trackConversionEvent("whatsapp_click", {
      location_section: "navbar",
      cta_label: LOCKED_COPY.sectionA_Hero.primaryCta,
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#234737]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Official Max Pet Corner Logo + Brand Name */}
        <a
          href="#"
          className="inline-flex items-center gap-3 text-[#234737] font-serif-display text-xl sm:text-2xl tracking-tight whitespace-nowrap shrink-0 focus-visible:rounded-md"
          aria-label="Max Pet Corner"
        >
          {!logoError ? (
            <img
              src={LOCKED_COPY.images.logo.src}
              alt={LOCKED_COPY.images.logo.alt}
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="w-10 h-10 rounded-xl object-contain bg-white border border-[#234737]/12 shrink-0"
            />
          ) : (
            <span className="w-9 h-9 rounded-lg bg-[#234737] text-[#FAF7F0] inline-flex items-center justify-center shrink-0">
              <PawPrint className="w-4 h-4 text-[#FAF7F0]" aria-hidden="true" />
            </span>
          )}
          <span>{LOCKED_COPY.business.name}</span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#252923]/85"
        >
          {TOP_NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 hover:text-[#234737] border-b-2 border-transparent hover:border-[#C96F4A] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
              utm_source: "landing_page",
              utm_medium: "nav_cta",
              utm_campaign: "dog_daycare_dum_dum",
              utm_content: "header_enquire_whatsapp",
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppNavClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-[#DDE7D8]" aria-hidden="true" />
            <span>{LOCKED_COPY.sectionA_Hero.primaryCta}</span>
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={
              isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#234737]/15 text-[#234737] hover:bg-[#DDE7D8]/50 transition-colors duration-150"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden bg-[#FAF7F0] border-b border-[#234737]/15 px-4 pt-3 pb-6 shadow-lg"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {LOCKED_COPY.sectionK_Footer.links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-[#252923] hover:bg-[#DDE7D8]/50 hover:text-[#234737] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#234737]/10 flex flex-col gap-2.5">
            <a
              href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
                utm_source: "landing_page",
                utm_medium: "mobile_nav_cta",
                utm_campaign: "dog_daycare_dum_dum",
                utm_content: "mobile_drawer_enquire_whatsapp",
              })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleWhatsAppNavClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#234737] text-[#FAF7F0] text-sm font-semibold whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>{LOCKED_COPY.sectionA_Hero.primaryCta}</span>
            </a>

            <a
              href={LOCKED_COPY.business.phoneHref}
              onClick={() => {
                trackConversionEvent("phone_click", {
                  location_section: "mobile_menu",
                  cta_label: LOCKED_COPY.sectionJ_FinalCta.secondaryCta,
                });
                setIsMobileMenuOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#234737]/20 text-[#234737] text-sm font-semibold whitespace-nowrap"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{LOCKED_COPY.sectionJ_FinalCta.secondaryCta}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
