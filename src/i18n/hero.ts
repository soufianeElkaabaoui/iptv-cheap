import type { Locale } from "./config";
import type { HeroArtworkId } from "@/config/hero";

export type HeroLabels = {
  eyebrow: string;
  headline: string;
  description: string;
  contact: string;
  contactUnavailable: string;
  galleryTitle: string;
  previewArtwork: string;
  artworkNames: Record<HeroArtworkId, string>;
};

const labels: Record<Locale, HeroLabels> = {
  fr: {
    eyebrow: "IPTV · Maroc & Europe",
    headline: "Trouvez votre offre IPTV.",
    description: "Parlons de votre prochain abonnement. Contactez-nous sur WhatsApp pour découvrir les forfaits et faire votre choix.",
    contact: "Parlons sur WhatsApp",
    galleryTitle: "Choisissez une ambiance",
    previewArtwork: "Afficher l’illustration :",
    artworkNames: { adventure: "Aventure", animation: "Animation", family: "Famille", action: "Action" },
    contactUnavailable: "Le contact WhatsApp est actuellement indisponible.",
  },
  ar: {
    eyebrow: "IPTV · المغرب وأوروبا",
    headline: "اعثر على باقة IPTV المناسبة لك.",
    description: "لنتحدث عن اشتراكك القادم. تواصل معنا عبر واتساب للتعرف على الباقات واختيار ما يناسبك.",
    contact: "تواصل معنا عبر واتساب",
    galleryTitle: "اختر أجواءك",
    previewArtwork: "عرض الصورة:",
    artworkNames: { adventure: "مغامرة", animation: "رسوم متحركة", family: "عائلي", action: "أكشن" },
    contactUnavailable: "التواصل عبر واتساب غير متاح حاليًا.",
  },
  en: {
    eyebrow: "IPTV · Morocco & Europe",
    headline: "Find your IPTV package.",
    description: "Let’s talk about your next subscription. Contact us on WhatsApp to explore the packages and make your choice.",
    contact: "Let’s talk on WhatsApp",
    galleryTitle: "Choose a mood",
    previewArtwork: "Show artwork:",
    artworkNames: { adventure: "Adventure", animation: "Animation", family: "Family", action: "Action" },
    contactUnavailable: "WhatsApp contact is currently unavailable.",
  },
};

export function getHeroLabels(locale: Locale): HeroLabels { return labels[locale]; }
