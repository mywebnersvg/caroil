"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { SERVICES } from "@/lib/site-content";
import { useScrollTo } from "@/hooks/useScrollTo";
import { GlassPanel } from "./ui/GlassPanel";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
      if (panels.length < 2) return;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 100)}`,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.15, max: 0.5 },
            ease: "power3.out",
          },
          invalidateOnRefresh: true,
        },
      });

      const onWheel = (e: WheelEvent) => {
        const st = tween.scrollTrigger;
        if (!st?.isActive) return;
        e.preventDefault();
        st.scroll(st.scroll() + e.deltaY + e.deltaX);
      };

      window.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", onWheel);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="services">
      {/* Mobile: vertical stack */}
      <section className="bg-[#050608] px-4 py-14 sm:px-6 md:hidden">
        <SectionHeading eyebrow="Our Services" title="Complete vehicle care" />
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Desktop: horizontal scroll panels */}
      <section
        ref={sectionRef}
        aria-labelledby="services-desktop-heading"
        className="relative hidden h-[100dvh] w-full overflow-hidden bg-[#050608] md:block"
      >
        <div className="absolute left-6 top-8 z-20 lg:left-10 lg:top-10">
          <SectionHeading
            eyebrow="Our Services"
            title="Complete vehicle care"
            id="services-desktop-heading"
          />
        </div>
        <div
          ref={trackRef}
          className="flex h-full w-max items-center pl-6 pt-28 lg:pl-10 lg:pt-32"
        >
          {SERVICES.map((service, i) => (
            <article
              key={service.title}
              className="service-panel flex h-[58vh] w-[min(78vw,480px)] shrink-0 items-center px-4 lg:w-[460px] lg:px-6"
            >
              <ServiceCard service={service} index={i} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#3b9eff] sm:text-xs">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 text-xl font-light leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const scrollTo = useScrollTo();

  return (
    <GlassPanel
      className="flex h-full w-full flex-col !p-4 sm:!p-6 md:!p-8 lg:!p-10"
      delay={index * 0.05}
    >
      <div
        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 sm:mb-4 sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:rounded-2xl"
        style={{ boxShadow: `0 0 32px ${service.accent}22` }}
      >
        <Image src={service.icon} alt="" width={22} height={22} />
      </div>
      <p className="text-[10px] font-medium uppercase tracking-widest text-[#ff6b2c]">
        {service.price}
      </p>
      <h3 className="mt-1.5 text-base font-light leading-snug text-white sm:mt-2 sm:text-xl lg:text-2xl xl:text-3xl">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-[11px] leading-relaxed text-white/55 sm:mt-3 sm:text-sm">
        {service.description}
      </p>
      <MagneticButton
        type="button"
        className="mt-4 border border-white/15 bg-white/5 px-4 py-2.5 text-[10px] uppercase tracking-widest text-white sm:mt-5 sm:px-5 sm:py-3 sm:text-xs"
        onClick={() => scrollTo("#contact")}
      >
        Book this service
      </MagneticButton>
    </GlassPanel>
  );
}
