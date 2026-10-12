"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Github,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { CampusIQLogo } from "@/components/brand/CampusIQLogo";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Workspace pages use WorkspaceShell; Landing page uses LandingNavbar
  return null;

  // 2. Institutional Application Workspace Navigation (for /home, /faculty, /segmentation, etc.)
  const workspaceNavItems = [
    { label: "Campus Home", href: "/home" },
    { label: "Faculty", href: "/faculty" },
    { label: "AI Segments", href: "/segmentation", badge: "Bonus" },
    { label: "Interventions", href: "/interventions" },
    { label: "Data Ingest", href: "/upload" },
    { label: "Methodology", href: "/methodology" },
    { label: "Guide", href: "/about" },
  ];

  const mobileWorkspaceItems = [
    { label: "Campus Executive Home", href: "/home" },
    { label: "Faculty Workspace", href: "/faculty" },
    { label: "AI Segmentation", href: "/segmentation", badge: "Bonus" },
    { label: "Interventions Tracker", href: "/interventions" },
    { label: "Data Integration (Excel/CSV)", href: "/upload" },
    { label: "Methodology & Formulations", href: "/methodology" },
    { label: "Platform Guide & Generator", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ECE7DF] bg-[#FAF7F2]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand: Clicking CampusIQ navigates directly to the Landing Page */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" title="CampusIQ Landing Page" className="flex items-center group transition-transform hover:opacity-95">
            <CampusIQLogo size="sm" />
          </Link>
        </div>

        {/* Desktop Segmented Floating Pill Island Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1 rounded-full bg-[#F2EDE4]/90 border border-[#E5DFD4] shadow-xs">
          {workspaceNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#111827] text-white shadow-xs"
                    : "text-[#57534E] hover:text-[#111827] hover:bg-[#EAE4D9]/70"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] uppercase font-extrabold rounded-full ${
                      isActive
                        ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/30"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            href="https://github.com/likhith3035/smart-campus"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2 sm:p-2.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link
            href="/faculty"
            className="hidden sm:inline-flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all hover:gap-2.5"
          >
            <span>Faculty Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2.5 rounded-xl border border-[#EAE5DC] bg-white text-[#111827] hover:bg-stone-100 transition-all focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 bg-[#FAF7F2] border-t border-[#ECE7DF] px-5 py-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in fade-in duration-200">
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#78716C] font-bold px-3 pb-2">
              Institutional Modules
            </div>
            {mobileWorkspaceItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-[#57534E] hover:text-[#111827] hover:bg-[#F2EDE4]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 text-[9px] uppercase font-extrabold rounded-full ${
                          isActive
                            ? "bg-emerald-500/25 text-emerald-300"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`}
                  />
                </Link>
              );
            })}

          </div>

          <div className="pt-6 border-t border-[#ECE7DF] text-xs text-[#78716C] flex items-center justify-between">
            <span>CampusIQ v2.0 • Institutional Hub</span>
            <span className="font-mono text-[10px] font-semibold text-emerald-600">System Online</span>
          </div>
        </div>
      )}
    </header>
  );
}
