"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInModal } from "@/components/landing/SignInModal";

export function LandingNavbar() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#ECE7DF]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left Brand: CampusIQ + Stacked Subtitle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-2xl tracking-tight text-[#111827]">
                CampusIQ
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-600 mb-1 animate-pulse" />
            </Link>
            <div className="h-6 w-px bg-stone-300 hidden sm:block" />
            <div className="hidden sm:flex flex-col text-[9px] font-bold tracking-widest text-stone-500 uppercase leading-tight select-none">
              <span>STUDENT SUCCESS</span>
              <span>INTELLIGENCE</span>
            </div>
          </div>

          {/* Right Action: Open Platform CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              id="landing-open-platform-btn"
              type="button"
              onClick={() => setShowSignIn(true)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 hover:gap-2 cursor-pointer"
            >
              <span>Open platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
