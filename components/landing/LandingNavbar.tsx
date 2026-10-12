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
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200/90 bg-[#FBF9F5]/98 backdrop-blur-xl px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Direct App Launchers on Mobile */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-200">
              <Link
                href="/home"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-stone-900 text-white font-bold text-xs flex items-center justify-between shadow-sm"
              >
                <span>Command Center</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </Link>
              <Link
                href="/faculty"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs flex items-center justify-between border border-purple-200"
              >
                <span>What-If Simulator</span>
                <span className="text-[10px] font-mono font-bold text-purple-700">AI</span>
              </Link>
            </div>

            <div className="space-y-1 text-sm font-semibold text-stone-700">
              <a
                href="#platform"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-stone-100"
              >
                <span>Platform Cockpit</span>
                <span className="text-xs text-stone-400 font-mono">Overview</span>
              </a>
              <Link
                href="/faculty"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-stone-100"
              >
                <span>Faculty Triage Directory</span>
                <span className="text-xs text-stone-400 font-mono">600 Students</span>
              </Link>
              <Link
                href="/upload"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-stone-100"
              >
                <span>Custom Dataset Ingestion</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">CSV/XLSX</span>
              </Link>
              <Link
                href="/methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-stone-100"
              >
                <span>Algorithm Methodology</span>
                <span className="text-xs text-stone-400 font-mono">7 Pillars</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-stone-100"
              >
                <span>Guide & Architecture</span>
                <span className="text-xs text-stone-400 font-mono">Docs</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  );
}
