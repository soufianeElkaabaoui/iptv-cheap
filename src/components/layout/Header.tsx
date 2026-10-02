import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/config";
import { getHeaderLabels } from "@/i18n/header";
import { HeaderNavigation } from "./HeaderNavigation";

// Branding and public contact configuration remain server-rendered.
export function Header({ locale }: { locale: Locale }) {
  const labels = getHeaderLabels(locale);
  const brand = siteConfig.name || "IPTV";
  const contactUrl = getWhatsAppContactUrl(locale);
  const contactClasses = "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-5 text-sm font-semibold";
  const contactContent = <>
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M9 8.5c-.5 3 2.5 6 5.5 6l1-1.5-2-1-.8.8a5 5 0 0 1-2.5-2.5l.8-.8-1-2-1 1Z" />
    </svg>
    <span>{labels.contact}</span>
  </>;
  const contact = contactUrl ? (
    <a href={contactUrl} className={`${contactClasses} bg-teal-900 text-white transition-colors hover:bg-teal-800 motion-reduce:transition-none`}>
      {contactContent}
    </a>
  ) : (
    <button type="button" disabled title={labels.contactUnavailable}
      aria-label={`${labels.contact}. ${labels.contactUnavailable}`}
      className={`${contactClasses} cursor-not-allowed border border-stone-200 bg-stone-100 text-stone-600`}>
      {contactContent}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:min-h-24">
        <Link href={`/${locale}`} prefetch={false} aria-label={`${brand} — ${labels.home}`}
          className="flex min-w-0 items-center gap-3 rounded-lg py-2 text-stone-950">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-teal-900 text-white">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="13" rx="3" />
              <path d="M9 21h6M12 18v3" />
              <path d="m10 9 5 2.5-5 2.5V9Z" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span dir="auto" className="break-words text-xl font-bold tracking-tight sm:text-2xl">{brand}</span>
        </Link>
        <HeaderNavigation locale={locale} labels={labels} contact={contact} />
      </div>
    </header>
  );
}
