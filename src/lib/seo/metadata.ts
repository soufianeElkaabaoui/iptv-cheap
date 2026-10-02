import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, type Locale, localizedPath } from "@/i18n/config";

export function pageMetadata({ title, description, locale, path = "", availableLocales = locales }: {
  title: string; description?: string; locale: Locale; path?: string;
  availableLocales?: readonly Locale[];
}): Metadata {
  const { url, name, socialImage, indexingEnabled } = siteConfig;
  const resolvedDescription = description || siteConfig.description || undefined;
  const canonical = url ? `${url}${localizedPath(locale, path)}` : undefined;
  return {
    title: name ? `${title} | ${name}` : title,
    description: resolvedDescription,
    robots: { index: indexingEnabled, follow: indexingEnabled },
    ...(url ? {
      metadataBase: new URL(url),
      alternates: {
        canonical,
        languages: Object.fromEntries(availableLocales.map((language) => [language, `${url}${localizedPath(language, path)}`])),
      },
      openGraph: {
        title, description: resolvedDescription, url: canonical,
        siteName: name || undefined, type: "website",
        locale: { ar: "ar_MA", fr: "fr_FR", en: "en_GB" }[locale],
        ...(socialImage ? { images: [socialImage] } : {}),
      },
      twitter: { card: socialImage ? "summary_large_image" : "summary", title, description: resolvedDescription, ...(socialImage ? { images: [socialImage] } : {}) },
    } : {}),
  };
}
