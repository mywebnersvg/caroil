"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="scroll-progress fixed right-0 top-0 z-[90] hidden h-[3px] origin-left bg-gradient-to-r from-[#3b9eff] via-[#5eb3ff] to-[#ff6b2c] md:block"
      style={{ width: `${progress * 100}%` }}
      aria-hidden
    />
  );
}
