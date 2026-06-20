"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AssemblyProgressProvider } from "@/context/AssemblyProgressContext";
import { LoadingScreen } from "./LoadingScreen";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { ScrollSections } from "./ScrollSections";

export function GarageExperience() {
  const [loaded, setLoaded] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setShowExperience(true), 80);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <AssemblyProgressProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {loaded && (
        <SmoothScrollProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showExperience ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#050608]"
          >
            <ScrollSections showScene={showExperience} />
          </motion.div>
        </SmoothScrollProvider>
      )}
    </AssemblyProgressProvider>
  );
}
