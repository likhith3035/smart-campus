"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { SignInModal } from "./SignInModal";

export function LandingNavbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            </Link>
            <div className="h-6 w-px bg-stone-300 hidden sm:block" />
            <div className="hidden sm:flex flex-col text-[9px] font-bold tracking-widest text-stone-500 uppercase leading-tight select-none">
              <span>STUDENT SUCCESS</span>
              <span>INTELLIGENCE</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-600">
            <a
              href="#platform"
              className="text-[#111827] relative py-1 flex flex-col items-center group"
            >
              <span>Platform</span>
              <span className="absolute bottom-0 w-5 h-0.5 bg-blue-600 rounded-full" />
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#111827] transition-colors py-1"
            >
              How it works
            </a>
            <Link
              href="/methodology"
              className="hover:text-[#111827] transition-colors py-1"
            >
              Methodology
            </Link>
            <Link
              href="/about"
              className="hover:text-[#111827] transition-colors py-1"
            >
              About
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              id="landing-signin-btn"
              onClick={() => setShowSignIn(true)}
              className="px-4 sm:px-5 py-2 rounded-full border border-stone-200/90 bg-white/80 hover:bg-white text-xs font-semibold text-stone-800 transition-all shadow-2xs cursor-pointer"
            >
              Sign in
            </button>

            <Link
              id="landing-open-platform-btn"
              href="/home"
              className="px-4 sm:px-5 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 hover:gap-2"
            >
              <span>Open platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FBF9F5] px-5 py-4 space-y-3">
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-stone-900 py-1.5"
            >
              Platform Overview
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-stone-600 hover:text-stone-900 py-1.5"
            >
              How it works
            </a>
            <Link
              href="/methodology"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-stone-600 hover:text-stone-900 py-1.5"
            >
              Methodology
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-stone-600 hover:text-stone-900 py-1.5"
            >
              About &amp; Guide
            </Link>
          </div>
        )}
      </header>

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
