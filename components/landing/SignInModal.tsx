"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ShieldCheck, UserCheck, ArrowRight, Lock } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KPMG CampusIQ Enterprise</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#111827]">
            Institutional Access
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Select an institutional profile to enter the decision intelligence workspace.
          </p>
        </div>

        {/* 1-Click Role Access Buttons */}
        <div className="space-y-3">
          <Link
            href="/home"
            onClick={onClose}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-stone-200 hover:border-stone-900 bg-[#FBF9F5] hover:bg-stone-100/70 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-900 text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#111827] group-hover:text-black">
                  Dean / Executive Office
                </div>
                <div className="text-[11px] text-stone-500">
                  Full campus KPIs, retention ROI &amp; debarment alarms
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/faculty"
            onClick={onClose}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-stone-200 hover:border-blue-600 bg-[#FBF9F5] hover:bg-blue-50/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#111827] group-hover:text-blue-900">
                  Faculty Mentor / HOD
                </div>
                <div className="text-[11px] text-stone-500">
                  Student triage, SHAP explainability &amp; recovery dispatch
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-stone-400" />
            SSO Protected
          </span>
          <span>v2.0 Decision Engine</span>
        </div>
      </div>
    </div>
  );
}
