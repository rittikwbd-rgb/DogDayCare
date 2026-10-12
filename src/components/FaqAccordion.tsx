import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LOCKED_COPY } from "../config/businessConfig";
import { TerracottaDivider } from "./ResilientImage";

/**
 * SECTION I: FAQs
 * Renders the exact locked headline and all 9 FAQ questions and answers
 * from LOCKED_COPY.sectionI_Faqs.
 */
export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const { headline, items } = LOCKED_COPY.sectionI_Faqs;

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-20 lg:py-24 border-b border-[#234737]/10 scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <TerracottaDivider className="mb-3" />
          <h2
            id="faq-heading"
            className="font-serif-display text-3xl sm:text-4xl text-[#234737] tracking-tight"
            style={{ textWrap: "balance" }}
          >
            {headline}
          </h2>
        </div>

        <div className="divide-y divide-[#234737]/12 rounded-2xl border border-[#234737]/15 bg-white/85 overflow-hidden">
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `${faq.id}-panel`;
            const buttonId = `${faq.id}-button`;

            return (
              <div
                key={faq.id}
                id={faq.id}
                className="transition-colors scroll-mt-20"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 py-5 sm:px-7 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-semibold text-[#234737] hover:bg-[#DDE7D8]/35 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C96F4A] shrink-0 transition-transform duration-150 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={
                    isOpen ? "px-5 pb-5 sm:px-7 sm:pb-6 pt-1" : "hidden"
                  }
                >
                  <p className="text-sm sm:text-base text-[#252923]/85 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
