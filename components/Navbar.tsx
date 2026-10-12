"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Faculty Workspace", href: "/faculty" },
    { label: "AI Segmentation", href: "/segmentation", badge: "Bonus" },
    { label: "Interventions", href: "/interventions" },
    { label: "Data Integration", href: "/upload" },
    { label: "Methodology", href: "/methodology" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ECE7DF] bg-[#FAF7F2]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-2xl tracking-tight text-[#111827]">
            CampusIQ
          </span>
          <span className="w-2 h-2 rounded-full bg-blue-600 mb-2"></span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#111827] font-semibold"
                    : "text-[#57534E] hover:text-[#111827]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] uppercase font-bold rounded-full bg-emerald-100 text-emerald-700">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#111827] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/faculty"
            className="hidden sm:inline-block text-sm font-medium text-[#57534E] hover:text-[#111827] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all hover:gap-3"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
