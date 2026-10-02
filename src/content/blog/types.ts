import type { Locale } from "@/i18n/config";

export type Article = {
  slug: string;
  locale: Locale;
  status: "draft" | "published";
  title: string;
  description: string;
  author: { name: string; url?: string };
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  paragraphs: readonly string[];
};
