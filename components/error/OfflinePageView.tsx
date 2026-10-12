"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, RefreshCw, ArrowRight, CheckCircle2, WifiOff } from "lucide-react";

interface OfflinePageViewProps {
  onReconnected?: () => void;
  isOverlay?: boolean;
}

export function OfflinePageView({ onReconnected, isOverlay = false }: OfflinePageViewProps) {
  const router = useRouter();
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [retryStatus, setRetryStatus] = useState<"idle" | "checking" | "failed" | "online">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleRetry = async () => {
    setIsChecking(true);
    setRetryStatus("checking");
    setStatusMessage("Checking network ping...");

    try {
      // 1. Check navigator.onLine first
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("Device is offline");
      }

      // 2. Perform a lightweight cache-busting HEAD/GET ping
      const res = await fetch(`/?ping=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
      });

      if (res.ok || res.status < 500) {
        setRetryStatus("online");
        setStatusMessage("Connection restored! Returning to platform...");
        setTimeout(() => {
          if (onReconnected) {
            onReconnected();
          } else {
            router.push("/home");
            router.refresh();
          }
        }, 800);
        return;
      }
      throw new Error("Server unreachable");
    } catch {
      setRetryStatus("failed");
      setStatusMessage("Still unreachable. Please verify your Wi-Fi or mobile data.");
      setTimeout(() => {
        setRetryStatus("idle");
        setStatusMessage("");
      }, 3500);
    } finally {
      setIsChecking(false);
    }
  };

  const signs = [
    { id: "reconnect", label: "RECONNECT", action: handleRetry, tip: "Test live network ping" },
    { id: "retry", label: "RETRY", action: handleRetry, tip: "Retry fetching campus state" },
    { id: "home", label: "CAMPUS HOME", href: "/home", tip: "Open cached campus overview" },
  ];

  return (
    <div
      className={`relative min-h-[calc(100vh-2rem)] flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 bg-[#FAF7F2] text-[#121826] overflow-hidden select-none ${
        isOverlay ? "fixed inset-0 z-50 overflow-y-auto" : ""
      }`}
    >
      {/* Subtle ambient warm sunset glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_45%,rgba(247,238,222,0.85),transparent_60%)]" />

      {/* Main Centered Content Canvas - Compact and Sized Proportionally */}
      <div className="relative w-full max-w-3xl lg:max-w-[850px] mx-auto flex flex-col justify-between my-auto">
        
        {/* Top Tag Pill */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#E7E0D3] shadow-2xs text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-stone-700 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>CAMPUSIQ • NO INTERNET CONNECTION</span>
          </div>
        </div>

        {/* 2-Column Split: Left Messaging, Right Signpost Visual */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, and Action Buttons */}
          <div className="md:col-span-6 space-y-4 text-left z-10">
            <h1 className="text-3xl sm:text-[38px] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight">
              Looks like{" "}
              <span className="font-serif italic font-normal text-stone-800">
                you&apos;re offline.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              CampusIQ can&apos;t reach the network right now. Check your connection and try again.
            </p>

            {/* Status Message Alert if retry was clicked */}
            {statusMessage && (
              <div
                className={`p-2.5 rounded-xl text-xs flex items-center gap-2 transition-all ${
                  retryStatus === "online"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {retryStatus === "online" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <WifiOff className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
                )}
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-1.5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleRetry}
                disabled={isChecking}
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#0B1528] hover:bg-black disabled:bg-stone-700 text-white text-xs sm:text-[13px] font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 group cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-stone-300 group-hover:text-white transition-all ${
                    isChecking ? "animate-spin" : ""
                  }`}
                />
                <span>{isChecking ? "Testing connection..." : "Try again"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <Link
                href="/home"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-[13px] font-semibold shadow-2xs hover:border-stone-300 transition-all active:scale-95 group cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900 transition-colors" />
                <span>Back to Campus Home</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Directional Signpost Illustration & OFFLINE Watermark */}
          <div className="md:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-[400/310]">
              
              {/* Giant Serif OFFLINE Watermark Behind the Signpost */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-serif text-[75px] sm:text-[88px] font-normal tracking-wide text-stone-300/40 -translate-y-7 translate-x-3">
                  OFFLINE
                </span>
              </div>

              {/* Vector SVG Scene: Signpost, Path, Rolling Hills, Sunset Sun, Plants & Birds */}
              <svg
                viewBox="0 0 400 310"
                className="w-full h-full relative z-10 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Gentle fading gradients for landscape */}
                  <linearGradient id="offHillFade1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F3EDE3" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="offHillFade2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EBE4D5" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                  </linearGradient>
                  {/* Road Gradient */}
                  <linearGradient id="offPathGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FAF6EF" />
                    <stop offset="100%" stopColor="#E8DFCE" />
                  </linearGradient>
                </defs>

                {/* ── Background Landscape: Soft rolling mounds ── */}
                <path
                  d="M 20 250 Q 150 205 280 225 Q 350 235 390 245 C 400 280 300 295 180 290 C 80 285 20 270 20 250 Z"
                  fill="url(#offHillFade1)"
                />
                <path
                  d="M 60 265 Q 180 235 320 248 C 380 260 380 295 240 295 C 130 295 60 285 60 265 Z"
                  fill="url(#offHillFade2)"
                />

                {/* ── Distant Sunset Glowing Orb ── */}
                <circle cx="345" cy="235" r="19" fill="#F4ECE0" opacity="0.9" />

                {/* ── Soft Curving Road to Horizon ── */}
                <path
                  d="M 205 235 C 245 240 285 255 385 282 C 340 305 260 290 185 252 Z"
                  fill="url(#offPathGradient)"
                  stroke="#E4DBCB"
                  strokeWidth="0.75"
                />

                {/* ── Minimalist Distant Trees on Horizon ── */}
                <g fill="#D5CBB8">
                  <path d="M 350 226 C 350 219 353 214 356 211 C 359 214 362 219 362 226 Z" />
                  <path d="M 370 232 C 370 223 373 218 376 214 C 379 218 382 223 382 232 Z" />
                </g>

                {/* ── Birds Flying in the Horizon Sky ── */}
                <g stroke="#C4B9A5" strokeWidth="1" strokeLinecap="round" fill="none">
                  {/* Bird 1 */}
                  <path d="M 342 166 Q 346 162 350 166 Q 354 162 358 166" />
                  {/* Bird 2 */}
                  <path d="M 330 182 Q 334 179 338 182 Q 342 179 346 182" />
                  {/* Bird 3 (smaller) */}
                  <path d="M 358 190 Q 361 187 364 190 Q 367 187 370 190" />
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

                {/* Network Data Nodes */}
                <circle cx="85" cy="148" r="3" fill="#F59E0B" />
                <circle cx="85" cy="148" r="7" fill="#F59E0B" opacity="0.15" />
                <circle cx="310" cy="102" r="3" fill="#3B82F6" />
                <circle cx="310" cy="102" r="7" fill="#3B82F6" opacity="0.15" />
                <circle cx="365" cy="195" r="3" fill="#94A3B8" />
                <circle cx="108" cy="202" r="2.5" fill="#38BDF8" />
                <circle cx="368" cy="250" r="2.5" fill="#F59E0B" />

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

                {/* ── Botanical Leafy Foliage at Base of Pole ── */}
                <g fill="#A89F90">
                  {/* Left big leaf */}
                  <path d="M 180 252 C 160 240 148 215 152 195 C 162 210 172 230 180 252 Z" />
                  {/* Left medium leaf */}
                  <path d="M 180 252 C 165 248 156 230 162 215 C 170 228 176 242 180 252 Z" opacity="0.8" />
                  {/* Right branch leaf */}
                  <path d="M 186 252 C 196 238 206 220 202 205 C 195 218 190 235 186 252 Z" />
                  {/* Grass cluster */}
                  <path d="M 170 256 C 175 248 180 250 182 256 Z" fill="#C9BFAC" />
                  <path d="M 185 256 C 190 246 195 248 198 256 Z" fill="#C9BFAC" />
                </g>

                {/* Ground Oval Base */}
                <ellipse cx="184.5" cy="254" rx="14" ry="4" fill="#C9BFAC" opacity="0.6" />
              </svg>

              {/* ── Interactive Directional Arrow Signs Mounted on Pole ── */}
              <div className="absolute top-[108px] left-[170px] flex flex-col gap-2 z-20">
                {signs.map((sign, idx) => {
                  const isHovered = hoveredSign === sign.id;
                  const isLink = Boolean(sign.href);

                  const content = (
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
                          isHovered ? "text-blue-600 translate-x-0.5" : "text-stone-400"
                        }`}
                      />
                    </div>
                  );

                  return isLink ? (
                    <Link
                      key={sign.id}
                      href={sign.href!}
                      onMouseEnter={() => setHoveredSign(sign.id)}
                      onMouseLeave={() => setHoveredSign(null)}
                      className="group relative flex items-center transition-all duration-200 cursor-pointer"
                      style={{
                        transform: isHovered ? "translateX(6px) scale(1.02)" : undefined,
                      }}
                      title={sign.tip}
                    >
                      {content}
                      {isHovered && (
                        <span className="absolute -top-5 left-1 px-1.5 py-0.5 rounded bg-stone-900 text-white text-[8.5px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none z-30">
                          {sign.tip}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <button
                      key={sign.id}
                      onClick={sign.action}
                      onMouseEnter={() => setHoveredSign(sign.id)}
                      onMouseLeave={() => setHoveredSign(null)}
                      className="group relative flex items-center transition-all duration-200 cursor-pointer text-left"
                      style={{
                        transform: isHovered ? "translateX(6px) scale(1.02)" : undefined,
                      }}
                      title={sign.tip}
                    >
                      {content}
                      {isHovered && (
                        <span className="absolute -top-5 left-1 px-1.5 py-0.5 rounded bg-stone-900 text-white text-[8.5px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none z-30">
                          {sign.tip}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* ── Bottom Micro-Footer: Subtext & Status Pill ── */}
        <div className="pt-5 sm:pt-6 mt-6 sm:mt-7 border-t border-stone-200/60 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-[11px] sm:text-xs text-stone-500 font-normal">
            Your work on this device remains available where supported.
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-emerald-800 text-[9.5px] font-mono tracking-widest uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>CONNECTION STATUS • OFFLINE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
