"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { StudentProfile } from "@/lib/types";
import {
  Search,
  X,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Database,
  FileSpreadsheet,
} from "lucide-react";

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  students,
  onSelectStudent,
}: CommandPaletteModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter students based on query
  const filteredStudents = query.trim()
    ? students
        .filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.student_id.toLowerCase().includes(query.toLowerCase()) ||
            s.department.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const quickActions = [
    {
      label: "View Statutory Debarred Students (<75% Att.)",
      icon: ShieldAlert,
      href: "/faculty?tab=debarment",
      badge: "Urgent",
      color: "text-rose-600",
    },
    {
      label: "Open Faculty Triage Roster",
      icon: Users,
      href: "/faculty",
      badge: "Workspace",
      color: "text-blue-600",
    },
    {
      label: "Explore Unsupervised AI Segments",
      icon: Sparkles,
      href: "/segmentation",
      badge: "Bonus ML",
      color: "text-emerald-600",
    },
    {
      label: "Upload Custom Excel / CSV Dataset",
      icon: FileSpreadsheet,
      href: "/upload",
      badge: "Data",
      color: "text-amber-600",
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden cursor-default"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-100 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, roll numbers, departments, or actions..."
            className="w-full bg-transparent text-sm text-[#111827] placeholder-stone-400 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 cursor-pointer"
                title="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
              title="Close search popup (ESC or click outside)"
            >
              <X className="w-4 h-4" />
            </button>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-mono text-stone-400 bg-stone-200/60 border border-stone-300/80">
              ESC
            </kbd>
          </div>
        </div>

        {/* Content area */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Filtered Students */}
          {query.trim() && (
            <div>
              <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-400 px-3 pb-1.5">
                Students Matching &quot;{query}&quot; ({filteredStudents.length})
              </div>
              {filteredStudents.length > 0 ? (
                <div className="space-y-1">
                  {filteredStudents.map((s) => (
                    <button
                      key={s.student_id}
                      onClick={() => {
                        onSelectStudent(s);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            s.overall_tier === "High Risk"
                              ? "bg-rose-100 text-rose-700"
                              : s.overall_tier === "Moderate Risk"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-blue-600 transition-colors">
                            {s.name}
                          </div>
                          <div className="text-[10px] text-stone-500 font-mono">
                            {s.student_id} • {s.department} • Sem {s.semester}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.overall_tier === "High Risk"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          S³: {s.success_score}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-700 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-stone-400">
                  No students found matching &quot;{query}&quot;.
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-400 px-3 pb-1.5">
              Quick Institutional Commands
            </div>
            <div className="space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => {
                      onClose();
                      router.push(action.href);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-stone-100 ${action.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-stone-800 group-hover:text-black">
                        {action.label}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-mono font-medium">
                      {action.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2.5 border-t border-stone-100 bg-[#FAF8F5] flex items-center justify-between text-[11px] text-stone-400">
          <span>CampusIQ Universal Indexer</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
