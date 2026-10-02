import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getArticle } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/metadata";
import { ArticleStructuredData } from "@/components/seo/ArticleStructuredData";

type Props = { params: Promise<{ locale: string; slug: string }> };
async function requireArticle(params: Props["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getArticle(locale, slug);
  if (!article) notFound();
  return article;
}
export async function generateMetadata({ params }: Props) {
  const article = await requireArticle(params);
  const metadata = pageMetadata({ title: article.title, description: article.description,
    locale: article.locale, path: `/blog/${article.slug}`,
    availableLocales: locales.filter((locale) => !!getArticle(locale, article.slug)),
  });
  return { ...metadata, ...(metadata.openGraph ? { openGraph: { ...metadata.openGraph,
    type: "article" as const, publishedTime: article.publishedAt, modifiedTime: article.updatedAt,
  } } : {}) };
}
export default async function ArticlePage({ params }: Props) {
  const article = await requireArticle(params);
  return <article>
    <h1>{article.title}</h1>
    {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <ArticleStructuredData article={article} />
  </article>;
}
