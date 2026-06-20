"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site-content";
import { useScrollTo } from "@/hooks/useScrollTo";
import { MagneticButton } from "./MagneticButton";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();

  return (
    <>
      <header className="pointer-events-auto flex items-center justify-between gap-3">
        <a href="#" className="shrink-0 text-sm font-semibold tracking-[0.18em] text-white sm:text-base">
          {SITE.name}
          <span className="text-[#3b9eff]">{SITE.tagline}</span>
        </a>

        <nav className="hidden items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/50 lg:flex xl:gap-8 xl:text-xs">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <MagneticButton
            type="button"
            className="hidden border border-white/15 bg-white/5 px-4 py-2.5 text-[10px] uppercase tracking-widest text-white sm:inline-flex sm:px-5 sm:text-xs"
            onClick={() => scrollTo("#contact")}
          >
            {SITE.phone}
          </MagneticButton>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            <span
              className={`block h-0.5 w-4 bg-white transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-4 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-4 bg-white transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute left-4 right-4 top-[4.5rem] z-50 rounded-2xl border border-white/10 bg-[#0a0c12]/95 p-5 backdrop-blur-xl sm:left-6 sm:right-6 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className="mt-5 block text-xs text-[#3b9eff]"
            >
              {SITE.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
