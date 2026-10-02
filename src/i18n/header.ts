import type { Locale } from "./config";

export type HeaderLabels = {
  primaryNavigation: string;
  home: string;
  blog: string;
  menu: string;
  language: string;
  switchLanguage: Record<Locale, string>;
  contact: string;
  contactUnavailable: string;
};

const labels: Record<Locale, HeaderLabels> = {
  fr: {
    primaryNavigation: "Navigation principale", home: "Accueil", blog: "Blog",
    menu: "Menu de navigation", language: "Langue",
    switchLanguage: { ar: "Passer en arabe", fr: "Passer en français", en: "Passer en anglais" },
    contact: "Contacter sur WhatsApp", contactUnavailable: "Le contact WhatsApp est actuellement indisponible.",
  },
  ar: {
    primaryNavigation: "التنقل الرئيسي", home: "الرئيسية", blog: "المدونة",
    menu: "قائمة التنقل", language: "اللغة",
    switchLanguage: { ar: "التبديل إلى العربية", fr: "التبديل إلى الفرنسية", en: "التبديل إلى الإنجليزية" },
    contact: "تواصل عبر واتساب", contactUnavailable: "التواصل عبر واتساب غير متاح حاليًا.",
  },
  en: {
    primaryNavigation: "Main navigation", home: "Home", blog: "Blog",
    menu: "Navigation menu", language: "Language",
    switchLanguage: { ar: "Switch to Arabic", fr: "Switch to French", en: "Switch to English" },
    contact: "Contact on WhatsApp", contactUnavailable: "WhatsApp contact is currently unavailable.",
  },
};

export const languageNames: Record<Locale, string> = { ar: "العربية", fr: "Français", en: "English" };
export function getHeaderLabels(locale: Locale): HeaderLabels { return labels[locale]; }
