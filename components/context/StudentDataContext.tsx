"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { initialStudents } from "@/lib/studentsData";
import { StudentProfile } from "@/lib/types";

interface StudentDataContextType {
  students: StudentProfile[];
  isCustomDataset: boolean;
  datasetName: string;
  studentCount: number;
  availableDepartments: string[];
  availableSemesters: number[];
  setUploadedCohort: (newStudents: StudentProfile[], sourceName: string) => void;
  resetToDemoData: () => void;
}

const STORAGE_KEY = "campusiq_custom_cohort_v1";
const STORAGE_META_KEY = "campusiq_custom_meta_v1";

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export function StudentDataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<StudentProfile[]>(initialStudents);
  const [isCustomDataset, setIsCustomDataset] = useState<boolean>(false);
  const [datasetName, setDatasetName] = useState<string>("Standard Campus Benchmark Cohort");

  // On mount, check if user previously uploaded a custom cohort in this session/browser
  useEffect(() => {
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
  }, []);

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
