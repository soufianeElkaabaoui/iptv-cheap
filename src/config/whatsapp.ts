import type { Locale } from "@/i18n/config";

export const whatsappConfig: {
  number: string | null;
  messages: Record<Locale, string | null>;
  contactMessages: Record<Locale, string>;
} = {
  number: process.env.WHATSAPP_NUMBER?.trim() || null,
  // Package-specific templates remain unset until the package section is approved.
  messages: { ar: null, fr: null, en: null },
  contactMessages: {
    fr: "Bonjour, je souhaite avoir des informations sur vos forfaits IPTV.",
    ar: "مرحبًا، أود الاستفسار عن باقات IPTV لديكم.",
    en: "Hello, I would like information about your IPTV packages.",
  },
};
if (whatsappConfig.number && !/^[1-9]\d{6,14}$/.test(whatsappConfig.number)) {
  throw new Error("WHATSAPP_NUMBER must contain 7–15 international digits, without +.");
}
