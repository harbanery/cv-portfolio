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

  // CV Sections
  "cv.download": "Unduh PDF",
  "cv.downloadError": "Gagal mengunduh PDF. Silakan coba lagi.",
  "cv.printFallback":
    "Membuka dialog cetak. Pilih \u201cSimpan sebagai PDF\u201d untuk mengunduh.",
  "cv.source.tooltip": "Sumber data",

  // Section titles
  "section.experience": "Pengalaman Kerja",
  "section.education": "Pendidikan",
  "section.organizations": "Pengalaman Organisasi",
  "section.certifications": "Sertifikasi",
  "section.skills": "Keahlian",
  "section.languages": "Bahasa",
  "section.projects": "Portfolio",

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
  "cv.printFallback":
    "Opening print dialog. Choose \u201cSave as PDF\u201d to download.",
  "cv.source.tooltip": "Data source",

  "section.experience": "Work Experience",
  "section.education": "Education",
  "section.organizations": "Organizational Experience",
  "section.certifications": "Certifications",
  "section.skills": "Skills",
  "section.languages": "Languages",
  "section.projects": "Portfolio",

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
