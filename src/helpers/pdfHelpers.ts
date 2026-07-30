import { TRANSLATIONS, translate, type Locale } from "@/components/locale/translations";
import type { CvData } from "@/models/types";

/**
 * Helper untuk mendapatkan judul section sesuai locale.
 * Bisa dipanggil di server-side (API route) maupun client-side.
 */
export function getSectionTitles(locale: Locale) {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.id;
  return {
    experience: translate(dict, "section.experience"),
    education: translate(dict, "section.education"),
    organizations: translate(dict, "section.organizations"),
    certifications: translate(dict, "section.certifications"),
    skills: translate(dict, "section.skills"),
    languages: translate(dict, "section.languages"),
    projects: translate(dict, "section.projects"),
  };
}

/** Type untuk parameter yang dikirim ke API PDF. */
export interface PdfApiParams {
  data: CvData;
  locale: Locale;
}
