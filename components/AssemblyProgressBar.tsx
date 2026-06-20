"use client";

import { useAssemblyProgress } from "@/context/AssemblyProgressContext";

export function AssemblyProgressBar() {
  const { heroScrollProgress } = useAssemblyProgress();
  const pct = Math.round(heroScrollProgress * 100);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="h-[2px] w-16 overflow-hidden rounded-full bg-white/10 sm:w-24 md:w-32">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3b9eff] to-[#ff6b2c] transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[9px] tabular-nums text-white/45 sm:text-[10px]">
        {pct}%
      </span>
    </div>
  );
}
