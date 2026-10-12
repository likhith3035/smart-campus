"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WifiOff, ArrowRight, RefreshCw, X } from "lucide-react";

export function NetworkStatusWatcher() {
  const pathname = usePathname();
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Initial status check
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsOffline(!navigator.onLine);
    }

    const handleOffline = () => {
      setIsOffline(true);
      setDismissed(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Do not render floating toast banner if already on the dedicated /offline page
  if (!isOffline || dismissed || pathname === "/offline") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-3.5 rounded-2xl bg-[#0B1528] text-white shadow-xl border border-stone-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <WifiOff className="w-4 h-4 animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold leading-tight truncate">Connection lost</p>
            <p className="text-[11px] text-stone-400 leading-tight truncate">CampusIQ is running in offline mode</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/offline"
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
          >
            <span>View Screen</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
