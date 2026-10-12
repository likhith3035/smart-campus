"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";

interface ErrorPageViewProps {
  type?: "404" | "500" | "error";
  statusCode?: string;
  badgeText?: string;
  titleSans?: string;
  titleSerif?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorPageView({
  type = "404",
  statusCode = "404",
  badgeText = "CAMPUSIQ • NAVIGATION ERROR",
  titleSans = "This page",
  titleSerif = "wandered off.",
  description = "We couldn't find the page you're looking for. It may have moved, or the address may be incorrect.",
  onRetry,
}: ErrorPageViewProps) {
  const router = useRouter();
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);

  const signs = [
    { id: "analytics", label: "ANALYTICS", href: "/segmentation", tip: "AI Clusters & Segmentation" },
    { id: "students", label: "STUDENTS", href: "/faculty", tip: "Faculty Roster & Student Profiles" },
    { id: "interventions", label: "INTERVENTIONS", href: "/interventions", tip: "Actionable Support Plans" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-2rem)] flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 bg-[#FAF7F2] text-[#121826] overflow-hidden select-none">
      {/* Subtle ambient warm glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_40%,rgba(244,236,222,0.8),transparent_55%)]" />

      {/* Main Centered Content Canvas - Compact and Sized Proportionally */}
      <div className="relative w-full max-w-3xl lg:max-w-[850px] mx-auto flex flex-col justify-between my-auto">
        
        {/* Top Tag Pill */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#E7E0D3] shadow-2xs text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-stone-700 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{badgeText}</span>
          </div>
        </div>

        {/* 2-Column Split: Left Messaging, Right Signpost Visual */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, and Action Buttons */}
          <div className="md:col-span-6 space-y-4 text-left z-10">
            <h1 className="text-3xl sm:text-[38px] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight">
              {titleSans}{" "}
              <span className="font-serif italic font-normal text-stone-800">
                {titleSerif}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="pt-1.5 flex flex-wrap items-center gap-2.5">
              <Link
                href="/home"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#0B1528] hover:bg-black text-white text-xs sm:text-[13px] font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 group cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-stone-300 group-hover:text-white transition-colors" />
                <span>Back to Campus Home</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {onRetry ? (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-[13px] font-semibold shadow-2xs hover:border-stone-300 transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              ) : (
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-[13px] font-semibold shadow-2xs hover:border-stone-300 transition-all active:scale-95 group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Go back</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Directional Signpost Illustration & 404 Watermark */}
          <div className="md:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-[400/310]">
              
              {/* Giant Serif Watermark Behind the Signpost */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-serif text-[115px] sm:text-[135px] font-normal tracking-wide text-stone-300/45 -translate-y-6 translate-x-2">
                  {statusCode}
                </span>
              </div>

              {/* Vector SVG Scene: Signpost, Path, Rolling Hills & Constellation Nodes */}
              <svg
                viewBox="0 0 400 310"
                className="w-full h-full relative z-10 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Gentle fading gradients for landscape to blend smoothly into background */}
                  <linearGradient id="hillFade1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F3EDE3" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="hillFade2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EBE4D5" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                  </linearGradient>
                  {/* Road Gradient */}
                  <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FAF6EF" />
                    <stop offset="100%" stopColor="#E8DFCE" />
                  </linearGradient>
                </defs>

                {/* ── Background Landscape: Soft rolling mounds with no hard cuts ── */}
                <path
                  d="M 20 250 Q 150 205 280 225 Q 350 235 390 245 C 400 280 300 295 180 290 C 80 285 20 270 20 250 Z"
                  fill="url(#hillFade1)"
                />
                <path
                  d="M 60 265 Q 180 235 320 248 C 380 260 380 295 240 295 C 130 295 60 285 60 265 Z"
                  fill="url(#hillFade2)"
                />

                {/* ── Soft Curving Road to Horizon ── */}
                <path
                  d="M 205 235 C 245 240 285 255 385 282 C 340 305 260 290 185 252 Z"
                  fill="url(#pathGradient)"
                  stroke="#E4DBCB"
                  strokeWidth="0.75"
                />

                {/* ── Minimalist Distant Trees on Horizon ── */}
                <g fill="#D5CBB8">
                  <path d="M 290 225 C 290 218 293 213 296 210 C 299 213 302 218 302 225 Z" />
                  <path d="M 325 230 C 325 222 328 217 331 213 C 334 217 337 222 337 230 Z" />
                  <path d="M 350 235 C 350 228 353 223 355 220 C 357 223 360 228 360 235 Z" />
                </g>

                {/* ── Delicate Constellation Graph Arcs ── */}
                <path
                  d="M 80 150 C 110 80 210 70 290 100 C 350 120 380 180 340 240"
                  stroke="#D8D0C0"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />
                <path
                  d="M 100 210 C 130 245 230 255 310 215"
                  stroke="#D8D0C0"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />

                {/* Colorful Network Data Nodes */}
                {/* Node 1: Amber dot */}
                <circle cx="85" cy="148" r="3" fill="#F59E0B" />
                <circle cx="85" cy="148" r="7" fill="#F59E0B" opacity="0.15" />

                {/* Node 2: Blue dot */}
                <circle cx="310" cy="102" r="3" fill="#3B82F6" />
                <circle cx="310" cy="102" r="7" fill="#3B82F6" opacity="0.15" />

                {/* Node 3: Slate dot */}
                <circle cx="350" cy="165" r="3" fill="#94A3B8" />

                {/* Node 4: Soft Cyan dot */}
                <circle cx="110" cy="205" r="2.5" fill="#38BDF8" />

                {/* Node 5: Warm Rose dot */}
                <circle cx="340" cy="245" r="2.5" fill="#F43F5E" />

                {/* ── Main Vertical Signpost Pole (Grey/Stone) ── */}
                <rect
                  x="180"
                  y="105"
                  width="9"
                  height="150"
                  rx="2.5"
                  fill="#78716C"
                />
                {/* Post Cap */}
                <path d="M 178 105 L 184.5 98 L 191 105 Z" fill="#57534E" />

                {/* Ground Tufts at Base */}
                <ellipse cx="184.5" cy="254" rx="14" ry="4" fill="#C9BFAC" opacity="0.6" />
              </svg>

              {/* ── Interactive Directional Arrow Signs Mounted on Pole ── */}
              <div className="absolute top-[108px] left-[170px] flex flex-col gap-2 z-20">
                {signs.map((sign, idx) => {
                  const isHovered = hoveredSign === sign.id;
                  return (
                    <Link
                      key={sign.id}
                      href={sign.href}
                      onMouseEnter={() => setHoveredSign(sign.id)}
                      onMouseLeave={() => setHoveredSign(null)}
                      className="group relative flex items-center transition-all duration-200 cursor-pointer"
                      style={{
                        transform: isHovered ? "translateX(6px) scale(1.02)" : undefined,
                      }}
                      title={sign.tip}
                    >
                      {/* Signboard Wooden/Cream Arrow Board */}
                      <div
                        className={`relative flex items-center justify-between pl-3 pr-4 py-1.5 min-w-[125px] sm:min-w-[136px] rounded-l-xs border transition-all duration-200 shadow-2xs ${
                          isHovered
                            ? "bg-white border-stone-400 text-stone-950 shadow-sm ring-2 ring-blue-500/20"
                            : "bg-[#FBF9F5] border-[#D9D2C5] text-[#44403C]"
                        }`}
                        style={{
                          clipPath:
                            "polygon(0% 0%, 84% 0%, 100% 50%, 84% 100%, 0% 100%)",
                        }}
                      >
                        <span className="text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wider uppercase pr-2">
                          {sign.label}
                        </span>
                        <ArrowRight
                          className={`w-3 h-3 transition-transform ${
                            isHovered
                              ? "text-blue-600 translate-x-0.5"
                              : "text-stone-400"
                          }`}
                        />
                      </div>

                      {/* Small Hover Tooltip */}
                      {isHovered && (
                        <span className="absolute -top-5 left-1 px-1.5 py-0.5 rounded bg-stone-900 text-white text-[8.5px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none z-30">
                          {sign.tip}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* ── Bottom Micro-Footer: Divider, Helpful Subtext & Status Pill ── */}
        <div className="pt-5 sm:pt-6 mt-6 sm:mt-7 border-t border-stone-200/60 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-[11px] sm:text-xs text-stone-500 font-normal">
            If you followed a broken link, return to the overview and continue from there.
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-emerald-800 text-[9.5px] font-mono tracking-widest uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYSTEM STATUS • OPERATIONAL</span>
          </div>
        </div>

      </div>
    </div>
  );
}
