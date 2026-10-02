import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getPublishedArticles } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url, indexingEnabled } = siteConfig;
  if (!url || !indexingEnabled) return [];
  return locales.flatMap((locale) => [
    { url: `${url}/${locale}` },
    { url: `${url}/${locale}/blog` },
    ...getPublishedArticles(locale).map((article) => ({
      url: `${url}/${locale}/blog/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt,
    })),
  ]);
}
