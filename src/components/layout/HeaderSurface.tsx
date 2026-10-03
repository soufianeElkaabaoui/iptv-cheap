"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

// The server supplies the brand, contact, and navigation. This boundary only
// follows the hero's edge; without JS the approved white header stays usable.
export function HeaderSurface({ locale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const onHome = pathname === `/${locale}`;
  const [appearance, setAppearance] = useState<{ pathname: string; overHero: boolean } | null>(null);
  const overHero = onHome && appearance?.pathname === pathname && appearance.overHero;

  useEffect(() => {
    const header = headerRef.current;
    if (!onHome || !header) return;
    let intersection: IntersectionObserver | undefined;
    let pendingHero: MutationObserver | undefined;

    const observeHero = () => {
      const hero = document.getElementById("home-hero");
      if (!hero) return;
      pendingHero?.disconnect();
      intersection?.disconnect();
      intersection = new IntersectionObserver(([entry]) => {
        setAppearance({ pathname, overHero: entry.isIntersecting });
      }, { rootMargin: `-${header.getBoundingClientRect().height}px 0px 0px 0px` });
      intersection.observe(hero);
    };

    // Header height changes at its mobile breakpoint. Recreate the observer
    // so the white surface starts when the hero passes below the whole header.
    const size = new ResizeObserver(observeHero);
    size.observe(header);
    observeHero();
    if (!document.getElementById("home-hero")) {
      const main = document.getElementById("main-content");
      if (main) {
        pendingHero = new MutationObserver(observeHero);
        pendingHero.observe(main, { childList: true, subtree: true });
      }
    }
    return () => { intersection?.disconnect(); pendingHero?.disconnect(); size.disconnect(); };
  }, [onHome, pathname]);

  return <header ref={headerRef} data-hero-overlay={overHero ? "true" : "false"}
    className={`group/header top-0 z-40 border-b border-stone-200 bg-white data-[hero-overlay=true]:border-transparent data-[hero-overlay=true]:bg-transparent max-lg:data-[hero-overlay=true]:bg-linear-to-b max-lg:data-[hero-overlay=true]:from-stone-950/95 max-lg:data-[hero-overlay=true]:to-stone-950/75 ${onHome ? "fixed inset-x-0" : "sticky"}`}>
    {children}
  </header>;
}
