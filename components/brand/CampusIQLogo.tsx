"use client";

import React from "react";

interface CampusIQLogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  showText?: boolean;
  className?: string;
  variant?: "dark" | "light";
}

export function CampusIQLogo({
  size = "md",
  showSubtitle = false,
  showText = true,
  className = "",
  variant = "dark",
}: CampusIQLogoProps) {
  // Dimension definitions
  const dimensions = {
    sm: {
      icon: "w-8 h-8 rounded-xl",
      text: "text-xl",
      subtitle: "text-[7.5px] tracking-[0.16em]",
      gap: "gap-2.5",
    },
    md: {
      icon: "w-10 h-10 sm:w-11 sm:h-11 rounded-2xl",
      text: "text-2xl sm:text-[27px]",
      subtitle: "text-[8.5px] sm:text-[9.5px] tracking-[0.2em]",
      gap: "gap-3",
    },
    lg: {
      icon: "w-14 h-14 rounded-2xl",
      text: "text-3xl sm:text-4xl",
      subtitle: "text-[10px] sm:text-[11px] tracking-[0.22em]",
      gap: "gap-4",
    },
  }[size];

  return (
    <div className={`inline-flex items-center ${dimensions.gap} select-none ${className}`}>
      {/* ── App Icon Squircle ── */}
      <div
        className={`${dimensions.icon} shrink-0 relative flex items-center justify-center p-2 sm:p-2.5 shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105 duration-200`}
        style={{
          background: "linear-gradient(135deg, #38BDF8 0%, #2563EB 50%, #1D4ED8 100%)",
        }}
      >
        {/* Subtle top-inner highlight reflection */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

        {/* Crisp 3D Mortarboard Cap Vector */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-xs"
        >
          {/* Mortarboard Rhombus Top Diamond */}
          <path
            d="M24 10L42 19.5L24 29L6 19.5L24 10Z"
            fill="#FFFFFF"
          />
          {/* Skullcap Band */}
          <path
            d="M13 23V31C13 35.5 17.5 38 24 38C30.5 38 35 35.5 35 31V23L24 28.5L13 23Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />
          {/* Hanging Tassel Thread */}
          <path
            d="M39 20V33.5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Tassel Ring/Bead */}
          <circle cx="39" cy="35" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* ── Wordmark & Subtitle ── */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`flex items-baseline font-black tracking-tight ${dimensions.text}`}>
            <span className={variant === "light" ? "text-white" : "text-[#0B1528]"}>
              Campus
            </span>
            <span
              className="bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent ml-0.5"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IQ
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`font-bold uppercase text-[#64748B] mt-1 ${dimensions.subtitle}`}
            >
              STUDENT SUCCESS PLATFORM
            </span>
          )}
        </div>
      )}
    </div>
  );
}
