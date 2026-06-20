"use client";

import { useLenis } from "@/components/SmoothScrollProvider";

export function useScrollTo() {
  const lenis = useLenis();

  return (selector: string) => {
    if (lenis) {
      lenis.scrollTo(selector, { offset: 0, duration: 1.4 });
      return;
    }

    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: "smooth" });
  };
}
