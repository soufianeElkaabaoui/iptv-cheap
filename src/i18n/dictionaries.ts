import type { Locale } from "./config";

type Dictionary = {
  home: string; blog: string; scaffold: string; emptyBlog: string;
  previous: string; next: string; pagination: string; skip: string;
};
const dictionaries: Record<Locale, Dictionary> = {
  fr: { home: "Accueil", blog: "Blog", scaffold: "Structure de la page d’accueil", emptyBlog: "Aucun article publié.", previous: "Précédent", next: "Suivant", pagination: "Pagination du blog", skip: "Aller au contenu" },
  ar: { home: "الرئيسية", blog: "المدونة", scaffold: "هيكل الصفحة الرئيسية", emptyBlog: "لا توجد مقالات منشورة.", previous: "السابق", next: "التالي", pagination: "صفحات المدونة", skip: "انتقل إلى المحتوى" },
  en: { home: "Home", blog: "Blog", scaffold: "Homepage scaffold", emptyBlog: "No published articles.", previous: "Previous", next: "Next", pagination: "Blog pagination", skip: "Skip to content" },
};
export function getDictionary(locale: Locale): Dictionary { return dictionaries[locale]; }
