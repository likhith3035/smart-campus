"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { initialStudents } from "@/lib/studentsData";
import { StudentProfile, InstitutionProfile, DEFAULT_INSTITUTION_PROFILE } from "@/lib/types";
import { SCENARIO_PRESETS, ScenarioInfo, generateScenarioCohort } from "@/lib/scenarioGenerator";

export type ActivePersona = "dean" | "faculty" | "tpo";

interface StudentDataContextType {
  students: StudentProfile[];
  isCustomDataset: boolean;
  datasetName: string;
  studentCount: number;
  availableDepartments: string[];
  availableSemesters: number[];
  setUploadedCohort: (newStudents: StudentProfile[], sourceName: string) => void;
  resetToDemoData: () => void;
  institutionProfile: InstitutionProfile;
  updateInstitutionProfile: (profile: Partial<InstitutionProfile>) => void;
  resetInstitutionProfile: () => void;
  activePersona: ActivePersona;
  setActivePersona: (persona: ActivePersona) => void;
  activeScenario: ScenarioInfo["id"];
  applyScenario: (id: ScenarioInfo["id"]) => void;
}

const STORAGE_KEY = "campusiq_custom_cohort_v1";
const STORAGE_META_KEY = "campusiq_custom_meta_v1";
const STORAGE_INSTITUTION_KEY = "campusiq_institution_profile_v1";
const STORAGE_PERSONA_KEY = "campusiq_active_persona_v1";

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export function StudentDataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<StudentProfile[]>(initialStudents);
  const [isCustomDataset, setIsCustomDataset] = useState<boolean>(false);
  const [datasetName, setDatasetName] = useState<string>("Standard Campus Benchmark Cohort");
  const [institutionProfile, setInstitutionProfile] = useState<InstitutionProfile>(DEFAULT_INSTITUTION_PROFILE);
  const [activePersona, setActivePersonaState] = useState<ActivePersona>("dean");
  const [activeScenario, setActiveScenario] = useState<ScenarioInfo["id"]>("baseline");

  const applyScenario = (id: ScenarioInfo["id"]) => {
    setActiveScenario(id);
    const { students: cohort, scenarioName } = generateScenarioCohort(id);
    setStudents(cohort);
    setIsCustomDataset(id !== "baseline");
    setDatasetName(scenarioName);
  };

  const setActivePersona = (persona: ActivePersona) => {
    setActivePersonaState(persona);
    try {
      sessionStorage.setItem(STORAGE_PERSONA_KEY, persona);
    } catch (err) {
      console.warn("Could not save persona to session:", err);
    }
  };

  // On mount, check if user previously uploaded a custom cohort or customized institution profile
  useEffect(() => {
    try {
      const savedPersona = sessionStorage.getItem(STORAGE_PERSONA_KEY);
      if (savedPersona === "dean" || savedPersona === "faculty" || savedPersona === "tpo") {
        setActivePersonaState(savedPersona);
      }
    } catch {}
    try {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      const savedMeta = sessionStorage.getItem(STORAGE_META_KEY);
      if (savedData && savedMeta) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStudents(parsed);
          setIsCustomDataset(true);
          setDatasetName(savedMeta);
        }
      }
    } catch (err) {
      console.warn("Could not retrieve custom student dataset from session:", err);
    }

    try {
      const savedProfile = localStorage.getItem(STORAGE_INSTITUTION_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed && typeof parsed === "object") {
          setInstitutionProfile((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (err) {
      console.warn("Could not retrieve custom institution profile from storage:", err);
    }
  }, []);

  const updateInstitutionProfile = (updates: Partial<InstitutionProfile>) => {
    setInstitutionProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_INSTITUTION_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn("Error saving institution profile to localStorage:", err);
      }
      return updated;
    });
  };

  const resetInstitutionProfile = () => {
    setInstitutionProfile(DEFAULT_INSTITUTION_PROFILE);
    try {
      localStorage.removeItem(STORAGE_INSTITUTION_KEY);
    } catch (err) {
      console.warn("Error resetting institution profile in localStorage:", err);
    }
  };

  const setUploadedCohort = (newStudents: StudentProfile[], sourceName: string) => {
    if (!newStudents || newStudents.length === 0) return;
    setStudents(newStudents);
    setIsCustomDataset(true);
    setDatasetName(sourceName);

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newStudents));
      sessionStorage.setItem(STORAGE_META_KEY, sourceName);
    } catch (err) {
      console.warn("Could not cache dataset to sessionStorage (possibly quota exceeded):", err);
    }
  };

  const resetToDemoData = () => {
    setStudents(initialStudents);
    setIsCustomDataset(false);
    setDatasetName("Standard Campus Benchmark Cohort");

    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_META_KEY);
    } catch (err) {
      console.warn("Error clearing sessionStorage:", err);
    }
  };

  // Derive unique departments from active students
  const availableDepartments = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.department && s.department.trim()) {
        set.add(s.department.trim());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Derive unique semesters from active students
  const availableSemesters = useMemo(() => {
    const set = new Set<number>();
    students.forEach((s) => {
      if (typeof s.semester === "number" && !isNaN(s.semester)) {
        set.add(s.semester);
      }
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [students]);

  return (
    <StudentDataContext.Provider
      value={{
        students,
        isCustomDataset,
        datasetName,
        studentCount: students.length,
        availableDepartments,
        availableSemesters,
        setUploadedCohort,
        resetToDemoData,
        institutionProfile,
        updateInstitutionProfile,
        resetInstitutionProfile,
        activePersona,
        setActivePersona,
        activeScenario,
        applyScenario,
      }}
    >
      {children}
    </StudentDataContext.Provider>
  );
}

export function useStudentData() {
  const context = useContext(StudentDataContext);
  if (!context) {
    throw new Error("useStudentData must be used within a StudentDataProvider");
  }
  return context;
}
