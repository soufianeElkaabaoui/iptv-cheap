"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Children are server-rendered content. Only this wrapper owns the motion.
export function HeroEntrance({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Keep text and the CTA fully visible, including before hydration.
      gsap.from("[data-hero-enter]", {
        y: 12, duration: 0.65, stagger: 0.07, ease: "power2.out",
        clearProps: "transform",
      });
    }, scope);
    return () => media.revert();
  }, { scope, dependencies: [], revertOnUpdate: true });

  return <div ref={scope} className="relative z-10 mx-auto flex min-h-[30rem] max-w-7xl flex-col items-start px-5 pt-[calc(var(--hero-art-height)+6.25rem)] pb-12 text-start sm:min-h-[33rem] sm:px-8 sm:pb-16 lg:pt-44">{children}</div>;
}
