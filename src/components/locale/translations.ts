/** Type for supported locales. */
export type Locale = "id" | "en";

/** Dictionary type: flat key -> value per locale. */
export type TranslationDict = Record<string, string>;

export const LOCALES: Locale[] = ["id", "en"];

export const DEFAULT_LOCALE: Locale = "id";

export const LOCALE_LABELS: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

const id: TranslationDict = {
  // Common
  "common.present": "Sekarang",
  "common.loading": "Memuat...",

  // CV toolbar
  "cv.download": "Unduh PDF",
  "cv.downloadError": "Gagal mengunduh PDF. Silakan coba lagi.",

  // PDF contact labels (prefix style, e.g. "email: name@example.com")
  "pdf.contact.email": "email:",
  "pdf.contact.phone": "wa:",
  "pdf.contact.location": "dom:",
  "pdf.contact.linkedin": "linkedin:",
  "pdf.contact.github": "github:",

  // PDF project labels
  "pdf.link.website": "link website:",
  "pdf.link.sourceCode": "link source code:",
  "pdf.project.role": "peran:",
  "pdf.project.tech": "teknologi:",
  "pdf.project.metrics": "pencapaian:",

  // Section titles
  "section.experience": "Pengalaman Kerja",
  "section.education": "Pendidikan",
  "section.certifications": "Sertifikasi",
  "section.skills": "Keahlian",
  "section.languages": "Bahasa",
  "section.projects": "Portfolio",
  "section.awards": "Penghargaan",

  // Skill categories
  "skill.languages": "Bahasa Pemrograman",
  "skill.frameworks": "Framework",
  "skill.libraries": "Library",
  "skill.databases": "Database",
  "skill.tools": "Tools",
  "skill.platforms": "Platform",
  "skill.methodologies": "Metodologi",
  "skill.domains": "Domain",

  // Project fields
  "project.role": "Peran",
  "project.techStack": "Teknologi",
  "project.metrics": "Pencapaian",

  // Theme
  "theme.light": "Mode Terang",
  "theme.dark": "Mode Gelap",
  "theme.enableLight": "Aktifkan mode terang",
  "theme.enableDark": "Aktifkan mode gelap",

  // Error / 404
  "error.title": "Terjadi Kesalahan",
  "error.description": "Maaf, terjadi kesalahan tak terduga.",
  "error.retry": "Coba Lagi",
  "notfound.title": "Halaman Tidak Ditemukan",
  "notfound.description": "Maaf, halaman yang Anda cari tidak ada.",
  "notfound.home": "Kembali ke Beranda",
};

const en: TranslationDict = {
  "common.present": "Present",
  "common.loading": "Loading...",

  "cv.download": "Download PDF",
  "cv.downloadError": "Failed to download PDF. Please try again.",

  // PDF contact labels (prefix style, e.g. "email: name@example.com")
  "pdf.contact.email": "email:",
  "pdf.contact.phone": "wa:",
  "pdf.contact.location": "loc:",
  "pdf.contact.linkedin": "linkedin:",
  "pdf.contact.github": "github:",

  // PDF project labels
  "pdf.link.website": "link website:",
  "pdf.link.sourceCode": "link source code:",
  "pdf.project.role": "role:",
  "pdf.project.tech": "tech:",
  "pdf.project.metrics": "metrics:",

  "section.experience": "Work Experience",
  "section.education": "Education",
  "section.certifications": "Certifications",
  "section.skills": "Skills",
  "section.languages": "Languages",
  "section.projects": "Portfolio",
  "section.awards": "Awards",

  // Skill categories
  "skill.languages": "Programming Languages",
  "skill.frameworks": "Frameworks",
  "skill.libraries": "Libraries",
  "skill.databases": "Databases",
  "skill.tools": "Tools",
  "skill.platforms": "Platforms",
  "skill.methodologies": "Methodologies",
  "skill.domains": "Domains",

  // Project fields
  "project.role": "Role",
  "project.techStack": "Tech Stack",
  "project.metrics": "Metrics",

  "theme.light": "Light Mode",
  "theme.dark": "Dark Mode",
  "theme.enableLight": "Enable light mode",
  "theme.enableDark": "Enable dark mode",

  "error.title": "Something Went Wrong",
  "error.description": "Sorry, an unexpected error occurred.",
  "error.retry": "Try Again",
  "notfound.title": "Page Not Found",
  "notfound.description": "Sorry, the page you are looking for does not exist.",
  "notfound.home": "Back to Home",
};

export const TRANSLATIONS: Record<Locale, TranslationDict> = { id, en };

export function translate(
  dict: TranslationDict,
  key: string,
  params?: Record<string, string | number>,
): string {
  let str = dict[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return str;
}
