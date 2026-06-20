"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const duration = 2600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 700);
        }, 350);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex w-full max-w-xs flex-col items-center gap-6 sm:max-w-sm sm:gap-8"
          >
            <div className="relative">
              <div className="h-12 w-12 rounded-full border border-white/10 sm:h-16 sm:w-16" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3b9eff] border-r-[#ff6b2c]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <p className="text-center text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 sm:text-xs">
              Initializing Garage Experience
            </p>

            <div className="w-full">
              <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-[#3b9eff] via-[#5eb3ff] to-[#ff6b2c]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-center font-mono text-[10px] tabular-nums text-white/40">
                {progress}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
