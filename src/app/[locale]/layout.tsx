import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales, isLocale, direction } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export default async function LocaleLayout({ children, params }: {
  children: ReactNode; params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <html lang={locale} dir={direction(locale)}>
      <body>
        <a href="#main-content" className="sr-only z-50 rounded-xl bg-teal-900 text-white focus:fixed focus:start-4 focus:top-4 focus:not-sr-only focus:px-5 focus:py-3">{dictionary.skip}</a>
        <Header locale={locale} />
        <main id="main-content" tabIndex={-1} className="scroll-mt-28 p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
