import React, { useState } from "react";
import { PawPrint } from "lucide-react";

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
  fallbackLabel?: string;
}

/**
 * Zero-Broken-Image Component
 * Renders a high-resolution image with referrerPolicy="no-referrer" and explicit dimensions
 * to prevent Cumulative Layout Shift (CLS). If the image fails to load, displays a warm
 * architectural fallback card with a minimal paw emblem.
 */
export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  loading = "lazy",
  fetchPriority = "auto",
  width = 800,
  height = 600,
  fallbackLabel = "Max Pet Corner · Dum Dum, Kolkata",
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#DDE7D8]/60 text-[#234737] p-8 text-center select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-[#234737]/10 flex items-center justify-center mb-3">
          <PawPrint className="w-6 h-6 text-[#234737]" aria-hidden="true" />
        </div>
        <p className="font-serif-display text-lg text-[#234737]">{fallbackLabel}</p>
        <p className="text-xs text-[#252923]/75 mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#DDE7D8]/30 ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
};

/**
 * Subtle Bengali Terracotta Alpona-inspired Section Divider
 * Restrained architectural line motif using terracotta (#C96F4A) and forest green (#234737).
 */
export const TerracottaDivider: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`flex items-center justify-center gap-3 py-2 select-none ${className}`}
    aria-hidden="true"
  >
    <span className="h-px w-12 bg-[#C96F4A]/35" />
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#C96F4A]"
    >
      <path
        d="M12 3C13.5 7.5 16.5 10.5 21 12C16.5 13.5 13.5 16.5 12 21C10.5 16.5 7.5 13.5 3 12C7.5 10.5 10.5 7.5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
    <span className="h-px w-12 bg-[#C96F4A]/35" />
  </div>
);
