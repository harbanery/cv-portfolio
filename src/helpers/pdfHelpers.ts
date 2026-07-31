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
    projects: translate(dict, "section.projects"),
  };
}

/** Label prefix untuk setiap field kontak di PDF (mis. "e:", "p:"). */
export interface ContactLabels {
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

/** Label untuk link project di PDF (mis. "link website:"). */
export interface ProjectLinkLabels {
  website: string;
  sourceCode: string;
}

/** Ambil label prefix kontak sesuai locale. */
export function getContactLabels(locale: Locale): ContactLabels {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.id;
  return {
    email: translate(dict, "pdf.contact.email"),
    phone: translate(dict, "pdf.contact.phone"),
    location: translate(dict, "pdf.contact.location"),
    website: translate(dict, "pdf.contact.website"),
    linkedin: translate(dict, "pdf.contact.linkedin"),
    github: translate(dict, "pdf.contact.github"),
  };
}

/** Ambil label link project sesuai locale. */
export function getProjectLinkLabels(locale: Locale): ProjectLinkLabels {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.id;
  return {
    website: translate(dict, "pdf.link.website"),
    sourceCode: translate(dict, "pdf.link.sourceCode"),
  };
}

/** Type untuk parameter yang dikirim ke API PDF. */
export interface PdfApiParams {
  data: CvData;
  locale: Locale;
}
