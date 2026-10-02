import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedArticles, blogPageSize } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ page?: string | string[] }> };
function parsePage(value: string | string[] | undefined): number {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) notFound();
  const page = Number(value);
  if (!Number.isSafeInteger(page)) notFound();
  return page;
}
export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = parsePage((await searchParams).page);
  return pageMetadata({ title: getDictionary(locale).blog, locale, path: `/blog${page > 1 ? `?page=${page}` : ""}` });
}
export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = parsePage((await searchParams).page);
  const articles = getPublishedArticles(locale);
  const pages = Math.max(1, Math.ceil(articles.length / blogPageSize));
  if (page > pages) notFound();
  const dictionary = getDictionary(locale);
  return <>
    <h1>{dictionary.blog}</h1>
    {articles.length === 0 ? <p>{dictionary.emptyBlog}</p> : <ul>
      {articles.slice((page - 1) * blogPageSize, page * blogPageSize).map((article) =>
        <li key={article.slug}><Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link></li>)}
    </ul>}
    {pages > 1 && <nav aria-label={dictionary.pagination}>
      {page > 1 && <Link href={`/${locale}/blog${page === 2 ? "" : `?page=${page - 1}`}`}>{dictionary.previous}</Link>}
      {page < pages && <Link href={`/${locale}/blog?page=${page + 1}`}>{dictionary.next}</Link>}
    </nav>}
  </>;
}
