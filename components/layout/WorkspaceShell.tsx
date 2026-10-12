"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { InstitutionalSidebar } from "@/components/home/InstitutionalSidebar";
import { CommandPaletteModal } from "@/components/home/CommandPaletteModal";
import { NotificationDrawer } from "@/components/home/NotificationDrawer";
import { initialStudents, getCampusStats } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { ExecutiveBriefModal } from "@/components/dashboard/ExecutiveBriefModal";
import { JudgeTourModal } from "@/components/dashboard/JudgeTourModal";
import { InstitutionalProfileModal } from "@/components/dashboard/InstitutionalProfileModal";
import { ScenarioSelectorModal } from "@/components/dashboard/ScenarioSelectorModal";
import { SignInModal } from "@/components/landing/SignInModal";
import { useStudentData } from "@/components/context/StudentDataContext";
import { CampusIQLogo } from "@/components/brand/CampusIQLogo";
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
  FileText,
  Zap,
  GraduationCap,
  Building2,
  Settings2,
  ShieldCheck,
  Sparkles,
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
    institutionProfile,
    activePersona,
  } = useStudentData();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Command palette & notification states
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [executiveBriefOpen, setExecutiveBriefOpen] = useState(false);
  const [judgeTourOpen, setJudgeTourOpen] = useState(false);
  const [institutionalProfileOpen, setInstitutionalProfileOpen] = useState(false);
  const [personaModalOpen, setPersonaModalOpen] = useState(false);
  const [scenarioModalOpen, setScenarioModalOpen] = useState(false);

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

  // Smart Mobile Header: Hide on scroll down, instantly reveal on scroll up
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          // Always show when near the top
          if (currentY <= 30) {
            setMobileHeaderVisible(true);
            lastY = currentY;
            ticking = false;
            return;
          }

          const diff = currentY - lastY;

          // Ignore micro-movements < 6px
          if (Math.abs(diff) >= 6) {
            if (diff > 0) {
              // Scrolling DOWN -> hide header smoothly
              setMobileHeaderVisible(false);
            } else {
              // Scrolling UP -> reveal header immediately!
              setMobileHeaderVisible(true);
            }
            lastY = currentY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <div className="relative z-10 w-80 max-w-[85vw] bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between p-4 border-b border-stone-200/80">
                <Link
                  href="/home"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 transition-transform hover:opacity-95"
                >
                  <CampusIQLogo size="sm" showSubtitle={true} />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <InstitutionalSidebar />
            </div>

            {/* Mobile Drawer Institutional Utilities */}
            <div className="p-4 border-t border-stone-200/80 bg-stone-100/70 space-y-2.5 mt-auto">
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                Institutional Utilities
              </div>
              
              {/* Term Selector Mobile */}
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>Academic Term:</span>
                </span>
                <span className="font-mono text-blue-700 font-bold">{selectedTerm}</span>
              </div>

              {/* Active Dataset Mobile Pill */}
              {isCustomDataset && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="truncate max-w-[130px]">{datasetName}</span>
                    <span className="text-[10px] text-emerald-600 font-mono">({studentCount})</span>
                  </div>
                  <button
                    onClick={() => {
                      resetToDemoData();
                      setMobileOpen(false);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-white border border-emerald-300 text-[10px] font-bold text-emerald-700"
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* Judge Tour Mobile */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setJudgeTourOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>60-Second Judge Tour</span>
              </button>

              {/* College & Authority Profile Mobile */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setInstitutionalProfileOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-bold shadow-2xs"
              >
                <Building2 className="w-3.5 h-3.5 text-stone-500" />
                <span>{institutionProfile.institutionShortName} Profile</span>
              </button>

              {/* Executive Brief Mobile */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setExecutiveBriefOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-bold shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>{institutionProfile.executiveRole}&apos;s Governance Brief</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          2. MAIN WORKSPACE CONTAINER
      ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden w-full max-w-full">
        {/* ─── Mobile Smart Scroll-Direction Fixed Header (< lg screens) ─── */}
        <div
          className={`lg:hidden fixed top-0 inset-x-0 z-40 w-full transition-transform duration-300 ease-in-out will-change-transform ${
            mobileHeaderVisible ? "translate-y-0 shadow-2xs" : "-translate-y-full pointer-events-none"
          }`}
        >
          <header className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#ECE7DF] px-3.5 sm:px-5 h-14 flex items-center justify-between gap-3 w-full max-w-full">
            {/* Brand Logo & Name */}
            <Link href="/home" className="flex items-center gap-2 shrink-0 group transition-transform hover:opacity-95">
              <CampusIQLogo size="sm" />
            </Link>

            {/* Quick Action Touch Targets (Persona, Search, Alerts, Menu) */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Mobile Role Switcher Pill */}
              <button
                type="button"
                onClick={() => setPersonaModalOpen(true)}
                aria-label="Switch institutional role persona"
                className="px-2.5 py-1.5 rounded-xl border border-stone-200/90 bg-white hover:bg-stone-50 text-[11px] font-bold text-stone-800 flex items-center gap-1 shadow-2xs cursor-pointer"
                title="Switch Role / Persona"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {activePersona === "dean"
                    ? (institutionProfile.executiveRole || "Dean")
                    : activePersona === "faculty"
                    ? "Faculty"
                    : "TPO"}
                </span>
              </button>

              {/* Quick Search Modal Trigger */}
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                aria-label="Search students & departments"
                className="p-2 rounded-xl border border-stone-200/90 bg-white text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs"
              >
                <Search className="w-4 h-4 text-stone-600" />
              </button>

              {/* Notification Bell */}
              <button
                type="button"
                onClick={() => setNotificationOpen(!notificationOpen)}
                aria-label="Institutional Alerts"
                className="p-2 rounded-xl border border-stone-200/90 bg-white text-stone-700 hover:bg-stone-50 transition-colors relative shadow-2xs"
              >
                <Bell className="w-4 h-4 text-stone-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-white">
                  2
                </span>
              </button>

              {/* Mobile Drawer Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open institutional menu"
                className="p-2 rounded-xl border border-stone-200/90 bg-stone-900 text-white hover:bg-black transition-colors shadow-2xs"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Mobile Custom Dataset Sub-strip if active */}
          {isCustomDataset && (
            <div className="px-3.5 py-1.5 bg-emerald-50 border-b border-emerald-200/80 text-[11px] text-emerald-800 flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold truncate max-w-[200px]">{datasetName}</span>
                <span className="text-[10px] text-emerald-600 font-mono">({studentCount})</span>
              </div>
              <button
                onClick={resetToDemoData}
                className="px-2 py-0.5 rounded-md bg-white border border-emerald-300 text-[10px] font-bold text-emerald-700 shrink-0"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Mobile Header Spacer to maintain natural page flow */}
        <div className={`lg:hidden shrink-0 ${isCustomDataset ? "h-[86px]" : "h-14"}`} />

        {/* ─── Desktop Dedicated Top Bar (>= lg screens) ─── */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#ECE7DF] px-5 xl:px-6 py-2.5 items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            {/* Universal Search Bar with ⌘ K Shortcut */}
            <div
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl border border-stone-200/90 bg-white/90 hover:bg-white shadow-2xs hover:border-stone-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-stone-400 text-xs truncate">
                <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-colors shrink-0" />
                <span className="truncate">Search students, roll #, or views...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold text-stone-500 bg-stone-100 border border-stone-200/80">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Institutional Controls */}
          <div className="flex items-center gap-2 shrink-0 relative">
            {/* Active Dataset Status Pill */}
            {isCustomDataset ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 shadow-2xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="max-w-[130px] truncate" title={datasetName}>
                  {datasetName}
                </span>
                <span className="text-[10px] text-emerald-600 font-mono">({studentCount})</span>
                <button
                  onClick={resetToDemoData}
                  title="Revert back to standard 600-student benchmark cohort"
                  className="ml-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-emerald-300 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 transition-colors shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset</span>
                </button>
              </div>
            ) : (
              <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-stone-200/90 text-xs font-semibold text-stone-600 shadow-2xs">
                <Database className="w-3.5 h-3.5 text-stone-400" />
                <span>Demo ({studentCount})</span>
              </div>
            )}

            {/* Academic Term Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTermDropdownOpen(!termDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200/90 shadow-2xs text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>{selectedTerm}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {termDropdownOpen && (
                <div className="absolute right-0 top-9 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-40 animate-in fade-in duration-150">
                  {["Fall 2026", "Spring 2026", "Synthetic Stress Cohort"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSelectedTerm(term);
                        setTermDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-stone-100 text-stone-800 flex items-center justify-between"
                    >
                      <span>{term}</span>
                      {selectedTerm === term && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* College & Authority Profile Trigger */}
            <button
              onClick={() => setInstitutionalProfileOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 text-stone-800 text-xs font-bold shadow-2xs hover:bg-stone-50 transition-all cursor-pointer"
              title="Customize College Name, Authority Role (Principal/Dean) & Signatures"
            >
              <Building2 className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden xl:inline">{institutionProfile.institutionShortName}</span>
              <span className="xl:hidden">Campus</span>
              <Settings2 className="w-3 h-3 text-stone-400" />
            </button>

            {/* Judge Live Simulation Scenarios Trigger */}
            <button
              onClick={() => setScenarioModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs transition-all cursor-pointer"
              title="Test 1-Click Simulation Scenarios (Crisis, Placement Surge, etc.)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
              <span>Scenarios</span>
            </button>

            {/* 60-Second Judge Tour Trigger */}
            <button
              onClick={() => setJudgeTourOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer group"
              title="Quick Guided Tour for Evaluators"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Judge Tour</span>
              <span className="text-[10px] font-mono opacity-80">(60s)</span>
            </button>

            {/* Executive Authority Brief Modal Trigger */}
            <button
              onClick={() => setExecutiveBriefOpen(true)}
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 text-stone-800 text-xs font-bold shadow-2xs hover:bg-stone-50 transition-all cursor-pointer"
              title={`Open Executive ${institutionProfile.executiveRole}'s Governance Brief & Print PDF`}
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Brief</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg bg-white border border-stone-200/90 text-stone-700 hover:bg-stone-50 transition-all relative shadow-2xs cursor-pointer"
                title="Institutional Alerts"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white font-mono text-[8px] font-bold flex items-center justify-center border border-white">
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

      {/* Executive Authority Governance Brief Modal */}
      <ExecutiveBriefModal
        isOpen={executiveBriefOpen}
        onClose={() => setExecutiveBriefOpen(false)}
        students={students}
        datasetName={datasetName}
        isCustomDataset={isCustomDataset}
        onOpenInstitutionalProfile={() => {
          setExecutiveBriefOpen(false);
          setInstitutionalProfileOpen(true);
        }}
      />

      {/* College & Authority Profile Customization Modal */}
      <InstitutionalProfileModal
        isOpen={institutionalProfileOpen}
        onClose={() => setInstitutionalProfileOpen(false)}
      />

      {/* 60-Second Judge Rubric Tour Modal */}
      <JudgeTourModal
        isOpen={judgeTourOpen}
        onClose={() => setJudgeTourOpen(false)}
        onOpenExecutiveBrief={() => {
          setJudgeTourOpen(false);
          setExecutiveBriefOpen(true);
        }}
      />

      {/* 1-Click Institutional Persona Switcher Modal */}
      <SignInModal
        isOpen={personaModalOpen}
        onClose={() => setPersonaModalOpen(false)}
      />

      {/* 1-Click Judge Live Academic Scenarios Modal */}
      <ScenarioSelectorModal
        isOpen={scenarioModalOpen}
        onClose={() => setScenarioModalOpen(false)}
      />
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
