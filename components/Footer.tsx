"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Github, Globe, Heart, ShieldCheck } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Only show footer on public landing showcase (/)
  if (pathname !== "/") {
    return null;
  }
  return (
    <footer className="border-t border-[#EAE5DC] bg-[#FAF7F2] py-14 text-xs text-[#78716C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#EAE5DC]">
          {/* Brand & Mission */}
          <div className="space-y-2 max-w-md">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="font-extrabold text-xl text-[#111827] group-hover:text-blue-600 transition-colors">CampusIQ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="text-stone-300">|</span>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider font-mono">
                Smart Campus Analytics
              </span>
            </Link>
            <p className="text-xs text-[#57534E] leading-relaxed">
              AI-powered student analytics and decision intelligence platform built for the <strong>KPMG in India Hackathon</strong>. Predict, optimize, and improve student success across 7 collegiate data silos.
            </p>
          </div>

          {/* Developer Card Badge */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] card-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-stone-900 to-stone-700 text-white flex items-center justify-center font-bold text-base shadow-sm">
              KL
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#111827]">Kami Likhith</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Developer & Architect
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <a
                  href="https://devlikhith.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-stone-900 hover:text-blue-600 font-semibold transition-colors"
                >
                  <Globe className="w-3 h-3 text-stone-500" />
                  <span>Portfolio</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href="https://github.com/likhith3035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-stone-900 hover:text-blue-600 font-semibold transition-colors"
                >
                  <Github className="w-3 h-3 text-stone-500" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Designed & Engineered by</span>
            <a
              href="https://devlikhith.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#111827] hover:underline"
            >
              Kami Likhith
            </a>
            <span>for KPMG in India Hackathon</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[#57534E]">
            <Link href="/" className="hover:text-stone-900 transition-colors">Landing Showcase</Link>
            <Link href="/home" className="hover:text-stone-900 transition-colors">Campus Home</Link>
            <Link href="/faculty" className="hover:text-stone-900 transition-colors">Faculty Workspace</Link>
            <Link href="/segmentation" className="hover:text-stone-900 transition-colors">AI Segmentation</Link>
            <Link href="/interventions" className="hover:text-stone-900 transition-colors">Interventions</Link>
            <Link href="/upload" className="hover:text-stone-900 transition-colors">Data Ingestion</Link>
            <Link href="/methodology" className="hover:text-stone-900 transition-colors">Methodology Note</Link>
            <Link href="/about" className="hover:text-stone-900 transition-colors">About & Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
