"use client";

import React, { useState } from "react";
import { X, Send, MessageSquare, Calendar, CheckCircle2, ShieldCheck, Clock, User, Phone } from "lucide-react";
import { StudentProfile, PrescriptiveAction } from "@/lib/types";
import { useStudentData } from "@/components/context/StudentDataContext";

interface InterventionDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: PrescriptiveAction | null;
  student: StudentProfile | null;
  onDispatchSuccess?: (actionId: string, channel: "whatsapp" | "email") => void;
}

export function InterventionDispatchModal({
  isOpen,
  onClose,
  action,
  student,
  onDispatchSuccess,
}: InterventionDispatchModalProps) {
  const { institutionProfile } = useStudentData();
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !action || !student) return null;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      if (onDispatchSuccess) {
        onDispatchSuccess(action.id, channel);
      }
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 1600);
    }, 1000);
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#FAF7F2] border border-[#EAE5DC] shadow-2xl overflow-hidden text-[#121826]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 pb-4 border-b border-[#EAE5DC] bg-white flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold uppercase">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Closed-Loop Administrative Dispatch</span>
            </div>
            <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
              Dispatch Prescriptive Remediation
            </h2>
            <p className="text-xs text-stone-500">
              Transmit automated notifications directly to guardians or assign counseling slots to faculty mentors.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Selector Tabs */}
        <div className="px-5 pt-4 bg-[#FAF7F2] flex items-center gap-2">
          <button
            onClick={() => {
              setChannel("whatsapp");
              setIsSent(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              channel === "whatsapp"
                ? "bg-[#25D366] text-white shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Parent WhatsApp Alert</span>
          </button>

          <button
            onClick={() => {
              setChannel("email");
              setIsSent(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              channel === "email"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Faculty Mentor Calendar</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Target Student Header Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 font-bold flex items-center justify-center font-mono">
                {student.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-[#0F172A]">{student.name}</div>
                <div className="text-[11px] text-stone-500 font-mono">
                  {student.student_id} • {student.department} (Sem {student.semester})
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-stone-400">Success Score:</div>
              <div className={`font-extrabold ${student.success_score < 60 ? "text-rose-600" : "text-emerald-600"}`}>
                {student.success_score.toFixed(1)} / 100
              </div>
            </div>
          </div>

          {/* Interactive Preview Container */}
          {channel === "whatsapp" ? (
            /* WhatsApp Message Preview Bubble */
            <div className="p-4 rounded-2xl bg-[#EFEAE2] border border-[#DDD3C4] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-stone-600 pb-1 border-b border-[#DDD3C4]/60">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-[#25D366]" />
                  <span>To: Guardian (+91 98480 •••••)</span>
                </span>
                <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full font-mono">
                  WhatsApp Business API
                </span>
              </div>

              {/* Chat Bubble */}
              <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#DCF8C6] shadow-2xs text-[#111827] space-y-2 border border-[#C5E1A5]/60 max-w-md">
                <p className="font-bold text-[11px] text-[#075E54] uppercase tracking-wide">
                  🏛️ {institutionProfile.institutionName} • Official Notice
                </p>
                <p className="text-[11px] leading-relaxed">
                  Dear Parent / Guardian, this is an automated alert from the Office of the Dean regarding <strong>{student.name}</strong> ({student.student_id}).
                </p>
                <div className="p-2 rounded-lg bg-white/70 space-y-1 text-[10px] font-mono text-stone-700">
                  <div>• Current Attendance: <strong>{student.attendance_pct}%</strong> (Required: 75%)</div>
                  <div>• Active Backlogs: <strong>{student.active_backlogs || 0}</strong></div>
                  <div>• Prescribed Plan: <strong>{action.title}</strong></div>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Faculty Lead <strong>{action.assigned_to}</strong> has been assigned to support {student.name}. Please confirm your availability for a progress review.
                </p>
                <div className="text-[9px] text-stone-400 text-right font-mono pt-1">
                  {currentDate} • Delivered ✓✓
                </div>
              </div>
            </div>
          ) : (
            /* Email & Calendar Slot Preview */
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-stone-100">
                <span className="font-bold text-stone-900">
                  Subject: [Urgent Action] {action.title} — {student.name}
                </span>
                <span className="text-[10px] font-mono text-stone-400">Outlook / Google Calendar</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Assigned Mentor: <strong>{action.assigned_to}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>Suggested Slot: <strong>Tomorrow at 3:30 PM (45 mins)</strong></span>
                </div>
                <div className="text-stone-600 pt-1 leading-relaxed text-[10px]">
                  Agenda: Deep dive into {student.name}&apos;s remedial roadmap, address attendance gaps, and establish weekly milestone check-ins.
                </div>
              </div>
            </div>
          )}

          {/* Success Feedback Banner */}
          {isSent && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {channel === "whatsapp"
                  ? "✓ Dispatched via WhatsApp Gateway (ID: WABA-84920)!"
                  : "✓ Calendar invitation dispatched to mentor inbox!"}
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-white border-t border-[#EAE5DC] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={isSending || isSent}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-xs active:scale-95 cursor-pointer ${
              channel === "whatsapp"
                ? "bg-[#25D366] hover:bg-[#1EBE5D] disabled:bg-stone-400"
                : "bg-[#0B1528] hover:bg-black disabled:bg-stone-400"
            }`}
          >
            {isSending ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Transmitting...</span>
              </span>
            ) : isSent ? (
              <span>✓ Sent Successfully</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>
                  {channel === "whatsapp" ? "Send WhatsApp Notice" : "Dispatch Calendar Invite"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
