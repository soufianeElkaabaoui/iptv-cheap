"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { heroArtwork } from "@/config/hero";
import type { HeroLabels } from "@/i18n/hero";

gsap.registerPlugin(useGSAP);
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function HeroShowcase({ artwork, labels, rtl, children }: {
  artwork: typeof heroArtwork;
  labels: Pick<HeroLabels, "galleryTitle" | "artworkNames" | "previewArtwork">;
  rtl: boolean;
  children: ReactNode;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  // The first scene and all thumbnails render on the server; JS enhances only
  // the decorative selector. The WhatsApp action never depends on hydration.
  const enhanced = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (min-width: 64rem)", () => {
      const active = scope.current?.querySelector(`[data-showcase-backdrop="${selected}"]`);
      if (active) gsap.fromTo(active, { scale: 1.025 }, {
        scale: 1, duration: 0.65, ease: "power2.out", clearProps: "transform",
      });
    }, scope);
    return () => media.revert();
  }, { scope, dependencies: [selected], revertOnUpdate: true });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = artwork.length - 1;
    else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const forward = (event.key === "ArrowRight") !== rtl;
      next = (index + (forward ? 1 : -1) + artwork.length) % artwork.length;
    } else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus({ preventScroll: true });
  };

  return <div ref={scope} className="relative isolate overflow-hidden bg-stone-950 text-white [--hero-art-height:75vw] sm:[--hero-art-height:56.25vw] max-lg:landscape:[--hero-art-height:min(56.25vw,calc(100svh-8rem))]">
    <div aria-hidden="true" data-hero-artwork-frame
      className="pointer-events-none absolute inset-x-0 top-20 h-[var(--hero-art-height)] lg:inset-0 lg:h-auto">
      {artwork.map((item, index) => <div key={item.id} data-showcase-backdrop={index}
        className={`absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${index === selected ? "opacity-100" : "opacity-0"}`}>
        <Image src={item.image} alt="" fill sizes="100vw"
          preload={index === 0} className="object-cover object-right lg:object-[65%_center] lg:rtl:-scale-x-100 max-lg:landscape:object-contain" />
      </div>)}
      <div className="absolute inset-0 bg-linear-to-r from-stone-950/5 via-transparent to-stone-950/5 lg:from-stone-950/95 lg:via-stone-950/65 lg:to-stone-950/20 lg:rtl:bg-linear-to-l" />
      <div className="absolute inset-0 bg-linear-to-b from-stone-950 via-transparent via-25% to-stone-950 lg:from-stone-950/90 lg:via-stone-950/10 lg:via-50%" />
    </div>
    <div className="relative z-10">{children}</div>
    <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 sm:px-8 sm:pb-12">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-stone-200">{labels.galleryTitle}</p>
        <span aria-hidden="true" className="text-[0.65rem] font-medium tracking-widest text-stone-300" dir="ltr">{String(selected + 1).padStart(2, "0")} / {String(artwork.length).padStart(2, "0")}</span>
      </div>
      <div role="group" aria-label={labels.galleryTitle} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {artwork.map((item, index) => <button key={item.id} type="button"
          ref={node => { buttons.current[index] = node; }}
          disabled={!enhanced} aria-label={`${labels.previewArtwork} ${labels.artworkNames[item.id]}`}
          aria-pressed={index === selected} onClick={() => setSelected(index)} onKeyDown={event => onKeyDown(event, index)}
          className={`group relative min-h-14 overflow-hidden rounded-xl border-2 text-start transition-colors motion-reduce:transition-none motion-reduce:duration-0 sm:rounded-2xl ${index === selected ? "border-teal-300" : "border-white/15 hover:border-white/60"}`}>
          <span className="relative block aspect-[1.85]">
            <Image src={item.image} alt="" fill sizes="(min-width: 1440px) 290px, (min-width: 640px) 23vw, 45vw" className="object-cover" />
            <span aria-hidden="true" className={`absolute inset-0 bg-black transition-opacity duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${index === selected ? "opacity-0" : "opacity-35 group-hover:opacity-10"}`} />
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute inset-x-3 bottom-2.5 flex items-center justify-between gap-2 text-xs font-semibold sm:inset-x-4 sm:bottom-3 sm:text-sm">
              <span>{labels.artworkNames[item.id]}</span>
              {index === selected && <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>}
            </span>
          </span>
        </button>)}
      </div>
    </div>
  </div>;
}
