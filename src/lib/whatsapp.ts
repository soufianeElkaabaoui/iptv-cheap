import { whatsappConfig } from "@/config/whatsapp";
import type { SubscriptionPackage } from "@/config/packages";
import type { Locale } from "@/i18n/config";

export function getWhatsAppUrl(plan: SubscriptionPackage, locale: Locale): string | null {
  const { number, messages } = whatsappConfig;
  const template = messages[locale];
  if (!number || !template?.includes("{package}")) return null;
  const message = template.replaceAll("{package}", plan.name[locale]);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
