import React, { useEffect, useRef, useState } from "react";
import { Play, MessageCircle, Volume2, VolumeX } from "lucide-react";
import {
  LOCKED_COPY,
  PROPERTY_WALKTHROUGH_VIDEO_URL,
  PROPERTY_WALKTHROUGH_POSTER_URL,
  buildWhatsAppUrl,
} from "../config/businessConfig";
import { trackConversionEvent } from "../utils/analytics";
import { TerracottaDivider } from "./ResilientImage";

interface VideoWalkthroughProps {
  hasRequestedPlay: boolean;
  setHasRequestedPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * SECTION C: PROPERTY WALKTHROUGH
 * Uses IntersectionObserver to automatically play the video muted as the visitor scrolls
 * into view, pausing when scrolled out of view. Includes a floating mute/unmute toggle so
 * visitors can enable audio whenever desired, without violating browser autoplay policies.
 */
export const VideoWalkthrough: React.FC<VideoWalkthroughProps> = ({
  hasRequestedPlay,
  setHasRequestedPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { eyebrow, headline, description, primaryCta, secondaryCta } =
    LOCKED_COPY.sectionC_PropertyWalkthrough;

  // IntersectionObserver to auto-play when scrolling into view and pause when scrolling out
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            // Browsers allow autoplay when muted
            video.muted = isMuted;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(() => {
                  // Fallback if browser blocks
                });
            }
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: [0.15, 0.3, 0.6],
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isMuted]);

  // When triggered manually from Hero "TAKE A PROPERTY TOUR"
  useEffect(() => {
    if (hasRequestedPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [hasRequestedPlay]);

  const handleWatchTourClick = () => {
    trackConversionEvent("property_video_play", {
      location_section: "property_walkthrough",
      cta_label: primaryCta,
    });
    setHasRequestedPlay(true);
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      videoRef.current.play().catch(() => {});
    }
  };

  const handleToggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleAskQuestionClick = () => {
    trackConversionEvent("whatsapp_click", {
      location_section: "property_walkthrough",
      cta_label: secondaryCta,
    });
  };

  return (
    <section
      id="property-tour"
      aria-labelledby="property-tour-heading"
      className="py-10 sm:py-16 lg:py-20 bg-[#DDE7D8]/25 border-b border-[#234737]/10 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Locked Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <TerracottaDivider className="mb-1.5" />
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#C96F4A] mb-1.5">
            {eyebrow}
          </p>
          <h2
            id="property-tour-heading"
            className="font-serif-display text-2xl sm:text-4xl text-[#234737] tracking-tight mb-2.5"
            style={{ textWrap: "balance" }}
          >
            {headline}
          </h2>
          <p className="text-sm sm:text-lg text-[#252923]/80 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Responsive Video Container with Scroll Autoplay */}
        <div
          ref={containerRef}
          className="relative w-full aspect-16/9 rounded-2xl overflow-hidden border border-[#234737]/15 bg-[#1b362a] shadow-sm group"
        >
          <video
            ref={videoRef}
            src={PROPERTY_WALKTHROUGH_VIDEO_URL}
            poster={PROPERTY_WALKTHROUGH_POSTER_URL}
            controls
            playsInline
            muted={isMuted}
            preload="metadata"
            aria-label={headline}
            onPlay={() => {
              setIsPlaying(true);
              trackConversionEvent("property_video_play", {
                location_section: "property_walkthrough_video_element",
                cta_label: primaryCta,
              });
            }}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain bg-black"
          >
            <source src={PROPERTY_WALKTHROUGH_VIDEO_URL} type="video/mp4" />
            <source
              src="/Max%20Pets%20Corner%20Dogcare%20facility%20walkthrough.mp4"
              type="video/mp4"
            />
          </video>

          {/* Floating Sound Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? "Unmute video walkthrough" : "Mute video walkthrough"}
            className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/85 text-[#FAF7F0] text-xs font-medium backdrop-blur-xs transition-opacity cursor-pointer shadow-sm"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#DDE7D8]" aria-hidden="true" />
                <span>Tap for Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C96F4A]" aria-hidden="true" />
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Locked Primary & Secondary CTAs Below Video */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleWatchTourClick}
            className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-xl bg-[#234737] hover:bg-[#1a3629] text-[#FAF7F0] text-sm sm:text-base font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
          >
            <Play
              className="w-4 h-4 fill-[#C96F4A] text-[#C96F4A]"
              aria-hidden="true"
            />
            <span>{primaryCta}</span>
          </button>

          <a
            href={buildWhatsAppUrl(LOCKED_COPY.whatsappMessages.hero, {
              utm_source: "landing_page",
              utm_medium: "video_section_cta",
              utm_campaign: "dog_daycare_dum_dum",
              utm_content: "walkthrough_ask_us_a_question",
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAskQuestionClick}
            className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 rounded-xl border border-[#234737]/25 bg-[#FAF7F0] hover:bg-[#DDE7D8]/45 text-[#234737] text-sm sm:text-base font-semibold tracking-wide transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#C96F4A]" aria-hidden="true" />
            <span>{secondaryCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
