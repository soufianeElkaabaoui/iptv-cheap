"use client";

import { useId, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { direction, type Locale } from "@/i18n/config";
import { languageNames, type HeaderLabels } from "@/i18n/header";

gsap.registerPlugin(useGSAP);

const languageOrder: readonly Locale[] = ["fr", "ar", "en"];

function MenuIcon({ close = false }: { close?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    className={close ? "hidden group-open:block" : "group-open:hidden"}>
    {close ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>;
}

// Only route-aware navigation and the progressively enhanced mobile disclosure
// need a client boundary. The layout, brand, and contact remain on the server.
export function HeaderNavigation({ locale, labels, contact }: {
  locale: Locale; labels: HeaderLabels; contact: ReactNode;
}) {
  const pathname = usePathname();
  const menuId = useId();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const desktopHomeRef = useRef<HTMLAnchorElement>(null);
  const home = `/${locale}`;
  const onBlog = pathname === `${home}/blog` || pathname.startsWith(`${home}/blog/`);
  const navigation = [
    { label: labels.home, href: home, active: pathname === home },
    { label: labels.blog, href: `${home}/blog`, active: onBlog },
  ];

  useGSAP((_context, contextSafe) => {
    const menu = menuRef.current;
    const panel = panelRef.current;
    if (!menu || !panel || !contextSafe) return;
    const closeMenu = (restoreFocus = false) => {
      if (!menu.open) return;
      menu.open = false;
      if (restoreFocus) summaryRef.current?.focus({ preventScroll: true });
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.open) return;
      const inside = menu.contains(document.activeElement);
      if (inside) event.preventDefault();
      closeMenu(inside);
    };
    const onOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.contains(event.target)) {
        closeMenu(panel.contains(document.activeElement));
      }
    };
    const onLinkClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) closeMenu(true);
    };
    // CSS can hide the focused disclosure before the media-query event fires.
    // Remember deliberate focus moves so a resize can restore visible focus.
    let focusWithinMenu = menu.contains(document.activeElement);
    const onFocusIn = (event: FocusEvent) => {
      focusWithinMenu = event.target instanceof Node && menu.contains(event.target);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktopChange = () => {
      if (!desktop.matches) return;
      const focusInside = focusWithinMenu || menu.contains(document.activeElement);
      closeMenu();
      if (focusInside) desktopHomeRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutsidePointer);
    menu.addEventListener("click", onLinkClick);
    desktop.addEventListener("change", onDesktopChange);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (width < 64rem)", () => {
      let animation: gsap.core.Tween | undefined;
      const clearAnimation = () => { animation?.revert(); animation = undefined; };
      const animate = contextSafe(() => {
        clearAnimation();
        if (!menu.open) return;
        animation = gsap.fromTo(panel.querySelectorAll("[data-menu-item]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.025, ease: "power2.out", clearProps: "opacity,transform" });
      });
      menu.addEventListener("toggle", animate);
      return () => { menu.removeEventListener("toggle", animate); clearAnimation(); };
    }, menu);

    return () => {
      media.revert();
      closeMenu();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutsidePointer);
      menu.removeEventListener("click", onLinkClick);
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, { scope: menuRef, dependencies: [pathname], revertOnUpdate: true });

  const languages = (mobile: boolean) => (
    <nav aria-label={labels.language} className={mobile ? "grid grid-cols-3 gap-2" : "flex items-center rounded-full border border-stone-200 p-1"}>
      {languageOrder.map((language) => (
        <Link key={language} prefetch={false} href={`/${language}${onBlog ? "/blog" : ""}`}
          lang={language} dir={direction(language)} aria-label={languageNames[language]}
          aria-current={language === locale ? "true" : undefined} title={labels.switchLanguage[language]}
          className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors motion-reduce:transition-none ${
            language === locale ? "bg-teal-900 text-white" : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"}`}
          {...(mobile ? { "data-menu-item": "" } : {})}>
          {mobile ? languageNames[language] : language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex shrink-0 items-center gap-5 xl:gap-8">
      <nav aria-label={labels.primaryNavigation} className="hidden items-center gap-7 lg:flex xl:gap-9">
        {navigation.map((item, index) => <Link key={item.href} ref={index === 0 ? desktopHomeRef : undefined}
          prefetch={false} href={item.href} aria-current={item.active ? "page" : undefined}
          className={`inline-flex min-h-11 items-center border-b-2 px-1 text-sm font-medium transition-colors motion-reduce:transition-none ${
            item.active ? "border-teal-800 text-teal-900" : "border-transparent text-stone-600 hover:border-stone-300 hover:text-stone-950"}`}>
          {item.label}
        </Link>)}
      </nav>
      <div className="hidden lg:block">{languages(false)}</div>
      <div className="hidden lg:block">{contact}</div>
      <details ref={menuRef} className="group lg:hidden">
        <summary ref={summaryRef} aria-controls={menuId}
          className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-800 transition-colors hover:bg-stone-100 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
          <MenuIcon /><MenuIcon close />
          <span className="sr-only">{labels.menu}</span>
        </summary>
        <div ref={panelRef} id={menuId} className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-stone-200 bg-white px-5 pb-6 pt-3 shadow-lg shadow-stone-900/5 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <nav aria-label={labels.primaryNavigation} className="grid gap-1">
              {navigation.map((item) => <Link key={item.href} prefetch={false} data-menu-item=""
                href={item.href} aria-current={item.active ? "page" : undefined}
                className={`flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-base font-medium ${
                  item.active ? "bg-teal-50 text-teal-900" : "text-stone-700 hover:bg-stone-50"}`}>
                <span>{item.label}</span>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
              </Link>)}
            </nav>
            <div className="my-5 border-t border-stone-100 pt-5">
              <p className="mb-3 px-1 text-xs font-semibold text-stone-500">{labels.language}</p>
              {languages(true)}
            </div>
            <div data-menu-item="" className="[&>*]:w-full">{contact}</div>
          </div>
        </div>
      </details>
    </div>
  );
}
