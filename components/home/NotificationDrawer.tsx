"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  X,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Clock,
} from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  debarmentCount: number;
}

export function NotificationDrawer({
  isOpen,
  onClose,
  debarmentCount,
}: NotificationDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Dimmed backdrop for outside tap / click dismissal */}
      <div
        className="fixed inset-0 bg-stone-900/30 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Dialog positioned under bell on both mobile and desktop */}
      <div
        role="dialog"
        aria-label="Institutional Alerts"
        aria-modal="true"
        className="fixed inset-x-3 top-16 sm:inset-x-auto sm:right-6 sm:top-14 w-auto sm:w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold text-[#111827]">
              Institutional Alerts
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
              2 Urgent
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close alerts"
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="py-3 space-y-2.5">
          {/* Alert 1 */}
          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Statutory Debarment Breach</span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">12m ago</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug">
              <strong>{debarmentCount} students</strong> have fallen below the mandatory 75% biometric attendance cutoff. The 0.85× multiplier gate has been automatically triggered.
            </p>
            <div className="pt-1 flex items-center justify-between">
              <Link
                href="/faculty"
                onClick={onClose}
                className="text-[11px] font-bold text-rose-700 hover:underline flex items-center gap-1"
              >
                <span>Auto-Assign Faculty Mentors</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Alert 2 */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Compound Backlog Dampener</span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">1h ago</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug">
              12 students in Semester 6 have active multiple backlogs (&ge;2), reducing placement eligibility scores under $0.90^k$ exponential dampening.
            </p>
            <div className="pt-1 flex items-center justify-between">
              <Link
                href="/interventions"
                onClick={onClose}
                className="text-[11px] font-bold text-amber-800 hover:underline flex items-center gap-1"
              >
                <span>Schedule Remedial Bootcamps</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Autonomous Diagnostic Log
          </span>
          <Link
            href="/interventions"
            onClick={onClose}
            className="font-semibold text-blue-600 hover:underline"
          >
            View All History
          </Link>
        </div>
      </div>
    </div>
  );
}
