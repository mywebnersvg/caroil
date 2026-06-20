"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import {
  FOOTER,
  HERO,
  PRICING,
  PROCESS,
  SITE,
  STATS,
} from "@/lib/site-content";
import { useAssemblyProgress } from "@/context/AssemblyProgressContext";
import { AssemblyProgressBar } from "./AssemblyProgressBar";
import { GlassPanel } from "./ui/GlassPanel";
import { MagneticButton } from "./MagneticButton";
import { ServicesSection } from "./ServicesSection";
import { SiteHeader } from "./SiteHeader";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ScrollProgress } from "./ScrollProgress";

const Hero3DScene = dynamic(
  () => import("./Hero3DScene").then((m) => ({ default: m.Hero3DScene })),
  { ssr: false, loading: () => null }
);

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionsProps {
  showScene?: boolean;
}

export function ScrollSections({ showScene = true }: ScrollSectionsProps) {
  const heroPinRef = useRef<HTMLElement>(null);
  const { setHeroScrollProgress, setProgress } = useAssemblyProgress();
  const scrollTo = useScrollTo();
  useEffect(() => {
    const hero = heroPinRef.current;
    if (!hero) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        const endDistance = isMobile ? "+=140%" : "+=220%";

        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: endDistance,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setHeroScrollProgress(self.progress);
            setProgress(self.progress);
          },
        });
      }
    );

    return () => mm.revert();
  }, [setHeroScrollProgress, setProgress]);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(timer);
  }, [showScene]);

  return (
    <>
      <ScrollProgress />

      {/* Hero — pinned 3D assembly */}
      <section
        ref={heroPinRef}
        id="hero"
        className="relative h-[100dvh] w-full overflow-hidden"
        aria-label="Hero"
      >
        <div className="absolute inset-0 z-0 bg-[#050608]">
          {showScene && <Hero3DScene />}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        <div className="pointer-events-none relative z-20 flex h-full flex-col justify-between p-4 sm:p-6 md:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SiteHeader />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[min(100%,28rem)]"
          >
            <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#ff6b2c] sm:text-xs">
              {HERO.eyebrow}
            </p>
            <h1 className="text-[1.65rem] font-light leading-[1.12] text-white min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {HERO.title}
              <br />
              <span className="bg-gradient-to-r from-[#3b9eff] to-[#ff6b2c] bg-clip-text text-transparent">
                {HERO.titleAccent}
              </span>
            </h1>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/60 sm:mt-4 sm:max-w-md sm:text-sm md:text-base">
              {HERO.description}
            </p>
            <div className="pointer-events-auto mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
              <MagneticButton
                type="button"
                className="bg-gradient-to-r from-[#3b9eff] to-[#2a7fd4] px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-white sm:px-6 sm:text-xs"
                onClick={() => scrollTo("#contact")}
              >
                {HERO.cta}
              </MagneticButton>
              <AssemblyProgressBar />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="flex items-center gap-2 text-white/40"
          >
            <span className="h-6 w-px bg-gradient-to-b from-[#3b9eff] to-transparent sm:h-8" />
            <span className="text-[9px] uppercase tracking-[0.22em] sm:text-[10px]">
              {HERO.scrollHint}
            </span>
          </motion.div>
        </div>
      </section>

      <ServicesSection />

      {/* Stats strip */}
      <section className="border-y border-white/5 bg-[#07090e] px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="text-center"
            >
              <p className="text-2xl font-light text-white sm:text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#050608] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.28em] text-[#3b9eff] sm:text-xs"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-2xl font-light text-white sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Simple, transparent process
          </motion.h2>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((block, i) => (
              <GlassPanel key={block.step} delay={i * 0.08} className="!p-5 sm:!p-6">
                <span className="font-mono text-xs text-[#ff6b2c]">{block.step}</span>
                <h3 className="mt-3 text-base font-light text-white sm:text-lg">
                  {block.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/50 sm:text-sm">
                  {block.body}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#07090e] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.28em] text-[#ff6b2c] sm:text-xs"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-2xl font-light text-white sm:text-3xl md:text-4xl"
          >
            Packages for every driver
          </motion.h2>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PRICING.map((plan, i) => (
              <GlassPanel
                key={plan.name}
                delay={i * 0.1}
                className={`relative flex flex-col !p-5 sm:!p-7 ${
                  plan.highlighted
                    ? "border-[#3b9eff]/40 ring-1 ring-[#3b9eff]/20"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-5 rounded-full bg-[#3b9eff] px-3 py-0.5 text-[9px] uppercase tracking-widest text-white sm:text-[10px]">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg text-white sm:text-xl">{plan.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-light text-white sm:text-4xl">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-xs text-white/40">{plan.period}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-white/55 sm:text-sm"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#3b9eff]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  type="button"
                  className={`mt-6 w-full px-5 py-3 text-[10px] uppercase tracking-widest sm:text-xs ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#3b9eff] to-[#2a7fd4] text-white"
                      : "border border-white/15 bg-white/5 text-white"
                  }`}
                  onClick={() => scrollTo("#contact")}
                >
                  Choose plan
                </MagneticButton>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Footer */}
      <section
        id="contact"
        className="relative bg-gradient-to-b from-[#050608] to-black px-4 py-20 sm:px-6 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-light text-white sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Schedule your{" "}
            <span className="text-[#ff6b2c]">service today</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 max-w-md text-xs text-white/50 sm:text-sm"
          >
            Walk-ins welcome. Same-day appointments available Mon–Sat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <MagneticButton
              type="button"
              className="w-full bg-gradient-to-r from-[#3b9eff] to-[#2a7fd4] px-6 py-3.5 text-[10px] uppercase tracking-widest text-white sm:w-auto sm:text-xs"
            >
              Book appointment
            </MagneticButton>
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className="w-full rounded-full border border-white/20 px-6 py-3.5 text-[10px] uppercase tracking-widest text-white/80 transition-colors hover:border-white/40 sm:w-auto sm:text-xs"
            >
              Call {SITE.phone}
            </a>
          </motion.div>

          <GlassPanel className="mx-auto mt-10 max-w-lg !p-5 text-left sm:!p-6">
            <div className="grid gap-3 text-xs text-white/55 sm:grid-cols-2 sm:gap-4 sm:text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  Location
                </p>
                <p className="mt-1">{SITE.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  Hours
                </p>
                <p className="mt-1">{SITE.hours}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  Email
                </p>
                <a href={`mailto:${SITE.email}`} className="mt-1 block text-[#3b9eff]">
                  {SITE.email}
                </a>
              </div>
            </div>
          </GlassPanel>
        </div>

        <footer className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-white/30 sm:flex-row sm:text-xs">
          <p>{FOOTER.copyright}</p>
          <div className="flex gap-5">
            {FOOTER.links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white/60">
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </section>
    </>
  );
}
