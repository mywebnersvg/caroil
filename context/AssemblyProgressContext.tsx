"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AssemblyProgressContextValue {
  progress: number;
  setProgress: (value: number) => void;
  heroScrollProgress: number;
  setHeroScrollProgress: (value: number) => void;
}

const AssemblyProgressContext =
  createContext<AssemblyProgressContextValue | null>(null);

export function AssemblyProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);

  const value = useMemo(
    () => ({
      progress,
      setProgress,
      heroScrollProgress,
      setHeroScrollProgress,
    }),
    [progress, heroScrollProgress]
  );

  return (
    <AssemblyProgressContext.Provider value={value}>
      {children}
    </AssemblyProgressContext.Provider>
  );
}

export function useAssemblyProgress() {
  const ctx = useContext(AssemblyProgressContext);
  if (!ctx) {
    throw new Error(
      "useAssemblyProgress must be used within AssemblyProgressProvider"
    );
  }
  return ctx;
}
