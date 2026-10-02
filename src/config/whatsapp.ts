import type { Locale } from "@/i18n/config";

export const whatsappConfig: {
  number: string | null;
  messages: Record<Locale, string | null>;
} = {
  number: process.env.WHATSAPP_NUMBER?.trim() || null,
  // Approved templates must contain {package}; no marketing copy in Stage 1.
  messages: { ar: null, fr: null, en: null },
};
if (whatsappConfig.number && !/^[1-9]\d{6,14}$/.test(whatsappConfig.number)) {
  throw new Error("WHATSAPP_NUMBER must contain 7–15 international digits, without +.");
}
