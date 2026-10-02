function confirmedOrigin(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.hostname === "localhost" || url.hostname.endsWith(".local")) {
    throw new Error("SITE_URL must be a confirmed HTTPS production origin.");
  }
  return url.origin;
}
export const siteConfig = {
  name: process.env.SITE_NAME?.trim() || null,
  description: process.env.SITE_DESCRIPTION?.trim() || null,
  url: confirmedOrigin(process.env.SITE_URL),
  // Stage 1 content must remain unindexed; enable only after launch review.
  indexingEnabled: false,
  socialImage: null as string | null,
} as const;
