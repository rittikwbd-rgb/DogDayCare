import React, { useState } from "react";
import { PawPrint } from "lucide-react";
import { LOCKED_COPY } from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";

/**
 * SECTION K: FOOTER
 * Renders the exact locked footer lines and navigation links from LOCKED_COPY.sectionK_Footer,
 * alongside the official Max Pet Corner logo.
 */
export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  const {
    brandTitle,
    serviceLine,
    locationLine,
    phoneLine,
    landlineLine,
    links,
  } = LOCKED_COPY.sectionK_Footer;

  return (
    <footer className="bg-[#1b362a] text-[#FAF7F0]/85 pt-12 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Logo & Service Location */}
          <div className="md:col-span-5 space-y-2">
            <div className="inline-flex items-center gap-3 text-[#FAF7F0] font-serif-display text-xl tracking-wide">
              {!logoError ? (
                <img
                  src={LOCKED_COPY.images.logo.src}
                  alt={LOCKED_COPY.images.logo.alt}
                  width={36}
                  height={36}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 shrink-0"
                />
              ) : (
                <span className="w-7 h-7 rounded-lg bg-[#C96F4A] text-[#FAF7F0] inline-flex items-center justify-center shrink-0">
                  <PawPrint className="w-4 h-4" aria-hidden="true" />
                </span>
              )}
              <span>{brandTitle}</span>
            </div>
            <p className="text-sm text-[#FAF7F0]/90 font-medium">
              {serviceLine}
            </p>
            <p className="text-sm text-[#FAF7F0]/75">{locationLine}</p>
          </div>

          {/* Contact Lines */}
          <div className="md:col-span-4 space-y-2 text-sm tabular-nums">
            <p>
              <a
                href={LOCKED_COPY.business.phoneHref}
                onClick={() =>
                  trackConversionEvent("phone_click", {
                    location_section: "footer_phone",
                    cta_label: phoneLine,
                  })
                }
                className="hover:text-white underline decoration-white/30 underline-offset-4"
              >
                {phoneLine}
              </a>
            </p>
            <p>
              <a
                href={LOCKED_COPY.business.landlineHref}
                onClick={() =>
                  trackConversionEvent("phone_click", {
                    location_section: "footer_landline",
                    cta_label: landlineLine,
                  })
                }
                className="hover:text-white underline decoration-white/30 underline-offset-4"
              >
                {landlineLine}
              </a>
            </p>
          </div>

          {/* Locked Footer Links */}
          <div className="md:col-span-3">
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#FAF7F0]/60">
          <p>{brandTitle}</p>
          <p>{LOCKED_COPY.business.address}</p>
        </div>
      </div>
    </footer>
  );
};
