import { ArticleJsonLd, BreadcrumbJsonLd } from "next-seo";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import type { Article } from "@/content/blog/types";

// Server-rendered JSON-LD, only for real published content and a confirmed URL.
export function ArticleStructuredData({ article }: { article: Article }) {
  if (!siteConfig.url || article.status !== "published") return null;
  const base = `${siteConfig.url}/${article.locale}`;
  const url = `${base}/blog/${article.slug}`;
  const dictionary = getDictionary(article.locale);
  return <>
    <ArticleJsonLd type="BlogPosting" headline={article.title} description={article.description}
      url={url} mainEntityOfPage={url} author={{ "@type": "Person", ...article.author }}
      datePublished={article.publishedAt} dateModified={article.updatedAt}
      image={article.image} />
    <BreadcrumbJsonLd items={[
      { name: dictionary.home, item: base },
      { name: dictionary.blog, item: `${base}/blog` },
      { name: article.title, item: url },
    ]} />
  </>;
}
