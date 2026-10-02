export const locales = ["ar", "fr", "en"] as const;
export type Locale = (typeof locales)[number];
// A reversible routing default; final language strategy is subject to review.
export const defaultLocale: Locale = "fr";
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
export function direction(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
export function localizedPath(locale: Locale, path = ""): string {
  return `/${locale}${path}`;
}
