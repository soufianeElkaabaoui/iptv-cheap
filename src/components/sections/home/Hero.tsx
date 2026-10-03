import type { Locale } from "@/i18n/config";
import { getHeroLabels } from "@/i18n/hero";
import { heroArtwork } from "@/config/hero";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";
import { HeroShowcase } from "./HeroShowcase";
import { HeroEntrance } from "./HeroEntrance";

export function Hero({ locale }: { locale: Locale }) {
  const labels = getHeroLabels(locale);
  const contactUrl = getWhatsAppContactUrl(locale);
  const contactClasses = "inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-white sm:text-base";
  return <section id="home-hero" aria-labelledby="hero-heading" className="relative isolate -m-6 overflow-hidden bg-stone-950 text-white">
      <HeroShowcase artwork={heroArtwork} labels={labels} rtl={locale === "ar"}>
        <HeroEntrance>
          <p data-hero-enter className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-300/25 bg-stone-950/60 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-teal-100 rtl:tracking-normal">{labels.eyebrow}</p>
          <h1 id="hero-heading" data-hero-enter className="max-w-lg text-balance text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] font-bold tracking-[-0.04em] rtl:leading-[1.35] rtl:tracking-normal">{labels.headline}</h1>
          <p data-hero-enter className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-stone-200 sm:text-base sm:leading-relaxed">{labels.description}</p>
          <div data-hero-enter className="mt-7">
            {contactUrl ? <a href={contactUrl}
              className={`${contactClasses} bg-teal-700 transition-colors hover:bg-teal-800 motion-reduce:transition-none`}>
              <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z" /><path d="M9 8.5c-.5 3 2.5 6 5.5 6l1-1.5-2-1-.8.8a5 5 0 0 1-2.5-2.5l.8-.8-1-2-1 1Z" /></svg>
              <span>{labels.contact}</span>
            </a> : <button type="button" disabled title={labels.contactUnavailable}
              aria-label={`${labels.contact}. ${labels.contactUnavailable}`}
              className={`${contactClasses} cursor-not-allowed border border-white/30 bg-stone-800`}>{labels.contact}</button>}
          </div>
        </HeroEntrance>
      </HeroShowcase>
  </section>;
}
