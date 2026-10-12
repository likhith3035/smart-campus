"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInModal } from "@/components/landing/SignInModal";
import { CampusIQLogo } from "@/components/brand/CampusIQLogo";

export function LandingNavbar() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <header className="relative z-40 w-full bg-transparent border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4">
          {/* Left Brand: Clean CampusIQ Logo (squircle icon + wordmark) */}
          <Link
            href="/"
            aria-label="CampusIQ Home"
            className="group flex items-center transition-transform hover:opacity-95"
          >
            <CampusIQLogo size="md" />
          </Link>

          {/* Right Action: Open Platform CTA */}
          <div className="flex items-center shrink-0">
            <button
              id="landing-open-platform-btn"
              type="button"
              onClick={() => setShowSignIn(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Open platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
