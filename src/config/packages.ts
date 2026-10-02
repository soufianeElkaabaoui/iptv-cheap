import type { Locale } from "@/i18n/config";

export type SubscriptionPackage = {
  id: string;
  name: Record<Locale, string>;
  durationMonths: number;
  price: { amount: number; currency: "MAD" | "EUR" } | null;
};
// Add only confirmed packages. No placeholder prices or plan claims.
export const subscriptionPackages: readonly SubscriptionPackage[] = [];
