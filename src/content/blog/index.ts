import type { Locale } from "@/i18n/config";
import type { Article } from "./types";

// Deliberately empty: no invented articles, authors, or publication dates.
const articles: readonly Article[] = [];
export const blogPageSize = 10;
export function getPublishedArticles(locale: Locale): Article[] {
  return articles.filter((article) => article.locale === locale && article.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function getArticle(locale: Locale, slug: string): Article | undefined {
  return getPublishedArticles(locale).find((article) => article.slug === slug);
}
