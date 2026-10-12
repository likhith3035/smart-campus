import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/layout/SidebarContext";
import { useStudentData } from "@/components/context/StudentDataContext";
import { InstitutionalProfileModal } from "@/components/dashboard/InstitutionalProfileModal";
import {
  Home,
  Users,
  Sparkles,
  Calendar,
  Database,
  FileText,
  BookOpen,
  ChevronRight,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export function InstitutionalSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { institutionProfile } = useStudentData();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const navItems = [
    { label: "Campus Home", href: "/home", icon: Home },
    { label: "Faculty", href: "/faculty", icon: Users },
    { label: "AI Segments", href: "/segmentation", icon: Sparkles, badge: "BONUS" },
    { label: "Interventions", href: "/interventions", icon: Calendar },
    { label: "Data Ingest", href: "/upload", icon: Database },
    { label: "Methodology", href: "/methodology", icon: FileText },
    { label: "Guide", href: "/about", icon: BookOpen },
  ];

  return (
    <aside
      className={`bg-[#FAF7F2] border-r border-[#EAE5DC] flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none overflow-y-auto transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? "w-20 p-3 items-center" : "w-64 p-5"
      }`}
    >
      {/* ─── Top Brand Header ─── */}
      <div className="space-y-6 w-full">
        {/* Brand & Toggle Row */}
        <div className={`flex items-center ${isCollapsed ? "justify-center flex-col gap-3" : "justify-between"}`}>
          <Link href="/" className="flex items-center gap-3 group" title="Return to Public Showcase">
            {/* Isometric Blue Mortarboard Cap Icon */}
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden transition-opacity duration-200">
                <div className="font-extrabold text-xl tracking-tight text-[#111827]">
                  CampusIQ
                </div>
                <div className="text-[9px] font-bold tracking-widest text-[#78716C] uppercase leading-none mt-0.5">
                  STUDENT SUCCESS PLATFORM
                </div>
              </div>
            )}
          </Link>

          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand Sidebar (Open)" : "Collapse Sidebar (Close)"}
            className="p-1.5 rounded-lg border border-stone-200/80 bg-white hover:bg-stone-100 text-stone-600 hover:text-black transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-blue-600" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-stone-500" />
            )}
          </button>
        </div>

        {/* ─── Navigation List ─── */}
        <nav className="space-y-1.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all ${
                    isCollapsed
                      ? "justify-center p-3"
                      : "justify-between px-3.5 py-2.5"
                  } ${
                    isActive
                      ? "bg-[#EFECE6] text-[#111827] shadow-xs"
                      : "text-[#57534E] hover:text-[#111827] hover:bg-[#F2EDE4]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#111827]" : "text-stone-500 group-hover:text-stone-900"
                      }`}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* Floating Tooltip when Collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#111827] text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap z-50 flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[8px] uppercase font-bold rounded bg-emerald-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* ─── Bottom Section: Campus Sketch & User Profile ─── */}
      <div className="pt-6 border-t border-[#EAE5DC]/80 space-y-4 w-full">
        {/* Neoclassical University Hall Sketch Illustration (Expanded Only) */}
        {!isCollapsed && (
          <div className="px-1 text-center space-y-2 animate-in fade-in duration-200">
            <div className="w-full h-24 overflow-hidden rounded-xl bg-stone-100/40 border border-stone-200/50 flex items-center justify-center relative">
              <div
                className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-85"
                style={{
                  backgroundImage: `url('/campus_sketch_transparent.png')`,
                }}
              />
            </div>
            <div className="text-left px-1">
              <div className="font-bold text-xs text-[#111827]">CampusIQ</div>
              <div className="text-[11px] text-[#78716C] leading-snug">
                Turning data into brighter student futures.
              </div>
            </div>
          </div>
        )}

        {/* Administrator / Authority Profile Pill */}
        <div
          onClick={() => setProfileModalOpen(true)}
          title={isCollapsed ? `${institutionProfile.executiveName} (${institutionProfile.executiveRole})` : "Click to edit College & Authority Profile"}
          className={`rounded-2xl bg-white border border-[#EAE5DC] shadow-2xs flex items-center hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group ${
            isCollapsed ? "p-2 justify-center" : "p-2.5 justify-between"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#4A154B] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              {institutionProfile.executiveName.replace(/^Dr\.\s*|^Prof\.\s*/i, "").charAt(0) || "A"}
            </div>
            {!isCollapsed && (
              <div className="text-left truncate min-w-0">
                <div className="text-xs font-bold text-[#111827] group-hover:text-blue-600 transition-colors truncate">
                  {institutionProfile.executiveName.split(",")[0]}
                </div>
                <div className="text-[10px] text-[#78716C] truncate flex items-center gap-1">
                  <span>{institutionProfile.executiveRole}</span>
                  <span className="text-[9px] text-blue-600 font-mono font-bold">• Edit</span>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600 transition-colors shrink-0" />
          )}
        </div>
      </div>

      {/* College & Authority Profile Modal */}
      <InstitutionalProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </aside>
  );
}
