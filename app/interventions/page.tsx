"use client";

import { useState, useEffect } from "react";
import { initialStudents } from "@/lib/studentsData";
import { PrescriptiveAction, StudentProfile } from "@/lib/types";
import { StudentModal } from "@/components/dashboard/StudentModal";
import { InterventionDispatchModal } from "@/components/dashboard/InterventionDispatchModal";
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle2, 
  Download, 
  UserCheck, 
  Eye,
  MessageSquare
} from "lucide-react";
import { CustomSelect, SelectOption } from "@/components/ui/CustomSelect";
import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { useStudentData } from "@/components/context/StudentDataContext";

interface ActionItemWithStudent extends PrescriptiveAction {
  student: StudentProfile;
}

export default function InterventionsPage() {
  const { students } = useStudentData();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [dispatchTarget, setDispatchTarget] = useState<{ action: PrescriptiveAction; student: StudentProfile } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const [actions, setActions] = useState<ActionItemWithStudent[]>([]);

  useEffect(() => {
    const list: ActionItemWithStudent[] = [];
    students.forEach((s) => {
      s.prescriptive_actions.forEach((act) => {
        list.push({
          ...act,
          student: s,
        });
      });
    });
    setActions(list);
  }, [students]);

  const handleStatusChange = (actionId: string, currentStatus: PrescriptiveAction["status"]) => {
    const nextStatus: PrescriptiveAction["status"] =
      currentStatus === "Pending" ? "In Progress" : currentStatus === "In Progress" ? "Completed" : "Pending";

    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: nextStatus } : a))
    );
  };

  const filteredActions = actions.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (priorityFilter !== "all" && a.priority !== priorityFilter) return false;
    return true;
  });

  const pendingCount = actions.filter((a) => a.status === "Pending").length;
  const inProgressCount = actions.filter((a) => a.status === "In Progress").length;
  const completedCount = actions.filter((a) => a.status === "Completed").length;

  const handleExportCSV = () => {
    const headers = "Action ID,Student ID,Student Name,Department,Title,Priority,Assigned To,Status,Details\n";
    const rows = filteredActions
      .map(
        (a) =>
          `"${a.id}","${a.student.student_id}","${a.student.name}","${a.student.department}","${a.title}","${a.priority}","${a.assigned_to}","${a.status}","${a.details.replace(/"/g, '""')}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `prescriptive_actions_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold mb-1">
            [ CLOSED-LOOP DECISION INTELLIGENCE ]
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Prescriptive Interventions & Action Tracker
          </h1>
          <p className="text-xs text-[#57534E] mt-1 max-w-2xl">
            Transform predictive indicators into closed-loop administrative actions: Attendance alerts, remedial tutoring, and placement bootcamps.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-xs font-semibold text-[#111827] border border-[#E5E0D8] shadow-sm transition-colors"
        >
          <Download className="w-4 h-4 text-stone-500" />
          <span>Export Action Plan CSV</span>
        </button>
      </div>

      {/* KPI Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs text-[#78716C] font-medium">Pending Interventions</p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1 font-sans">{pendingCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs text-[#78716C] font-medium">In Progress (Active Tutoring)</p>
            <h3 className="text-3xl font-extrabold text-blue-600 mt-1 font-sans">{inProgressCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs text-[#78716C] font-medium">Resolved & Recovered</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1 font-sans">{completedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-3xl bg-white border border-[#EAE5DC] card-shadow flex flex-wrap items-center justify-between gap-3 text-xs relative z-30">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-52">
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: `All Statuses (${actions.length})` },
                { value: "Pending", label: `Pending (${pendingCount})`, dotColor: "bg-amber-500" },
                { value: "In Progress", label: `In Progress (${inProgressCount})`, dotColor: "bg-blue-500" },
                { value: "Completed", label: `Completed (${completedCount})`, dotColor: "bg-emerald-500" },
              ]}
              buttonClassName="py-2"
            />
          </div>

          <div className="w-48">
            <CustomSelect
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={[
                { value: "all", label: "All Priorities" },
                { value: "URGENT", label: "URGENT", badge: "Critical", badgeColor: "bg-rose-100 text-rose-700" },
                { value: "HIGH", label: "HIGH", badge: "High", badgeColor: "bg-amber-100 text-amber-700" },
                { value: "MEDIUM", label: "MEDIUM", badge: "Medium", badgeColor: "bg-blue-100 text-blue-700" },
              ]}
              buttonClassName="py-2"
            />
          </div>
        </div>

        <div className="text-[#78716C]">
          Showing <span className="text-[#111827] font-mono font-bold">{filteredActions.length}</span> actions
        </div>
      </div>

      {/* Action Cards List */}
      <div className="space-y-3">
        {filteredActions.length === 0 ? (
          <div className="p-12 text-center text-stone-400 bg-white rounded-3xl border border-[#EAE5DC]">
            No prescriptive actions match the selected filter.
          </div>
        ) : (
          filteredActions.map((act, idx) => (
            <div
              key={act.id}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#EAE5DC] hover:border-stone-400 card-shadow transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="space-y-1.5 flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    #{idx + 1}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    act.priority === "URGENT"
                      ? "bg-rose-100 text-rose-700"
                      : act.priority === "HIGH"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {act.priority}
                  </span>
                  <h3 className="text-sm font-bold text-[#111827]">{act.title}</h3>
                  <span className="text-xs text-stone-400 font-mono">({act.id})</span>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">{act.details}</p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-stone-500 pt-1">
                  <div>
                    Student:{" "}
                    <button
                      onClick={() => setSelectedStudent(act.student)}
                      className="text-stone-900 font-bold hover:underline"
                    >
                      {act.student.name} ({act.student.student_id})
                    </button>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div>
                    Dept: <span className="text-stone-700">{act.student.department}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div>
                    Assigned Lead: <strong className="text-stone-900">{act.assigned_to}</strong>
                  </div>
                </div>
              </div>

              {/* Status Toggle & Inspection */}
              <div className="flex items-center justify-between w-full md:w-auto gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                <button
                  onClick={() => handleStatusChange(act.id, act.status)}
                  className={`flex-1 md:flex-initial px-4 py-2 sm:py-1.5 rounded-full text-xs font-semibold border transition-all text-center ${
                    act.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : act.status === "In Progress"
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                  }`}
                  title="Click to cycle status"
                >
                  Status: {act.status}
                </button>

                <button
                  onClick={() => setDispatchTarget({ action: act, student: act.student })}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  title="Dispatch WhatsApp Alert to Guardian or Mentor Invite"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dispatch Alert</span>
                </button>

                <button
                  onClick={() => setSelectedStudent(act.student)}
                  className="p-2 sm:p-2 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
                  title="Inspect Student 360 Profile"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Student 360 Modal */}
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Closed-Loop Intervention Dispatch Modal */}
      {dispatchTarget && (
        <InterventionDispatchModal
          isOpen={Boolean(dispatchTarget)}
          onClose={() => setDispatchTarget(null)}
          action={dispatchTarget.action}
          student={dispatchTarget.student}
          onDispatchSuccess={(actionId) => {
            setActions((prev) =>
              prev.map((a) => (a.id === actionId ? { ...a, status: "In Progress" } : a))
            );
          }}
        />
      )}
      </div>
    </WorkspaceShell>
  );
}
