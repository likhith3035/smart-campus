"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { InstitutionalSidebar } from "@/components/home/InstitutionalSidebar";
import { CommandPaletteModal } from "@/components/home/CommandPaletteModal";
import { NotificationDrawer } from "@/components/home/NotificationDrawer";
import { initialStudents, getCampusStats } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { useStudentData } from "@/components/context/StudentDataContext";
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  Check,
  Menu,
  X,
  RotateCcw,
  Database,
} from "lucide-react";

interface WorkspaceShellProps {
  children: ReactNode;
}

function WorkspaceShellInner({ children }: WorkspaceShellProps) {
  const { isCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const {
    students,
    isCustomDataset,
    datasetName,
    studentCount,
    resetToDemoData,
  } = useStudentData();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Command palette & notification states
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Academic term selector
  const [selectedTerm, setSelectedTerm] = useState("Fall 2026");
  const [termDropdownOpen, setTermDropdownOpen] = useState(false);

  // Register Global ⌘ K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const debarmentCount = students.filter((s) => s.attendance_pct < 75).length;

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#111827]">
      {/* ───────────────────────────────────────────────────────────
          1. DEDICATED COLLAPSIBLE SIDEBAR (Desktop)
      ─────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block shrink-0">
        <InstitutionalSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-72 bg-[#FAF7F2] h-full shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <InstitutionalSidebar />
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          2. MAIN WORKSPACE CONTAINER
      ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Universal Top Bar */}
        <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#ECE7DF] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Universal Search Bar with ⌘ K Shortcut */}
            <div
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full max-w-xl flex items-center justify-between px-3.5 py-2 rounded-2xl border border-stone-200/90 bg-white/80 hover:bg-white shadow-2xs hover:border-stone-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 text-stone-400 text-xs sm:text-sm truncate">
                <Search className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors shrink-0" />
                <span className="truncate">Search students, departments, or keywords...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold text-stone-500 bg-stone-100 border border-stone-200/80">
                ⌘ K
              </kbd>
            </div>
          </div>

          {/* Right Institutional Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 relative">
            {/* Active Dataset Status Pill */}
            {isCustomDataset ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 shadow-2xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="max-w-[120px] sm:max-w-[180px] truncate" title={datasetName}>
                  {datasetName}
                </span>
                <span className="text-[10px] text-emerald-600 font-mono">({studentCount})</span>
                <button
                  onClick={resetToDemoData}
                  title="Revert back to standard 600-student benchmark cohort"
                  className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-emerald-300 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 transition-colors shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/90 text-xs font-semibold text-stone-600 shadow-2xs">
                <Database className="w-3.5 h-3.5 text-stone-400" />
                <span>Demo Cohort ({studentCount})</span>
              </div>
            )}

            {/* Academic Term Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTermDropdownOpen(!termDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-200/90 shadow-2xs text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>{selectedTerm}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-1" />
              </button>

              {termDropdownOpen && (
                <div className="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-40 animate-in fade-in duration-150">
                  {["Fall 2026", "Spring 2026", "Synthetic Stress Cohort"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSelectedTerm(term);
                        setTermDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-stone-100 text-stone-800 flex items-center justify-between"
                    >
                      <span>{term}</span>
                      {selectedTerm === term && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell with Badge 2 */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2.5 rounded-xl bg-white border border-stone-200/90 text-stone-700 hover:bg-stone-50 transition-all relative shadow-2xs cursor-pointer"
                title="Institutional Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-white">
                  2
                </span>
              </button>

              <NotificationDrawer
                isOpen={notificationOpen}
                onClose={() => setNotificationOpen(false)}
                debarmentCount={debarmentCount}
              />
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <div className="flex-1">{children}</div>
      </div>

      {/* Global Command Palette Modal (works on every page!) */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        students={students}
        onSelectStudent={(s) => setSelectedStudent(s)}
      />

      {/* Global Student Profile Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <SidebarProvider>
      <WorkspaceShellInner>{children}</WorkspaceShellInner>
    </SidebarProvider>
  );
}
