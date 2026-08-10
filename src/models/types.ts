/**
 * Tipe data CV yang merefleksikan struktur `public/references/cv_data.json`.
 *
 * Data sumber hanya tersedia dalam satu bahasa (Inggris). Lokalisasi
 * (locale) hanya berlaku untuk label UI, judul section, dan format tanggal,
 * bukan untuk konten teks.
 */

/** Type untuk supported locales. */
export type Locale = "id" | "en";

/** Lokasi geografis. */
export interface CvLocation {
  city: string;
  region: string;
  countryCode: string;
}

/** Informasi dasar profil. */
export interface CvBasics {
  name: string;
  label: string;
  summary: string;
  title: string;
  location: CvLocation;
  profiles: unknown[];
}

/** Informasi kontak. Nilai dapat berupa URL lengkap atau prefixed (mailto:). */
export interface CvContact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

/** Pengalaman kerja. */
export interface CvWorkItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
  location: string;
  isCurrentRole: boolean;
}

/** Pendidikan. */
export interface CvEducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
  courses: string[];
  highlights: string[];
}

/** Sertifikasi. */
export interface CvCertificationItem {
  name: string;
  issuer: string;
  date: string;
  url: string;
  credentialId: string;
}

/** Keahlian dikelompokkan per kategori. */
export interface CvSkills {
  languages: string[];
  frameworks: string[];
  libraries: string[];
  databases: string[];
  tools: string[];
  platforms: string[];
  methodologies: string[];
  domains: string[];
}

/** Satu metrik pencapaian project. */
export interface CvProjectMetric {
  metric: string;
  value: string;
}

/** Tautan terkait sebuah project. */
export interface CvProjectUrls {
  website?: string;
  sourceCode?: string;
}

/** Project / portfolio. */
export interface CvProjectItem {
  name: string;
  disabled?: boolean;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  techStack: string[];
  highlights: string[];
  metrics: CvProjectMetric[];
  images: string[];
  url: CvProjectUrls;
}

/** Penghargaan. */
export interface CvAwardItem {
  title: string;
  issuer: string;
  date: string;
  summary: string;
}

/** Bahasa yang dikuasai. */
export interface CvLanguageItem {
  language: string;
  fluency: string;
}

/** Metadata sumber data. */
export interface CvMeta {
  sourceFiles: string[];
  generatedAt: string;
  version: string;
}

/** Data lengkap CV. */
export interface CvData {
  basics: CvBasics;
  contact: CvContact;
  work: CvWorkItem[];
  education: CvEducationItem[];
  certifications: CvCertificationItem[];
  skills: CvSkills;
  projects: CvProjectItem[];
  awards: CvAwardItem[];
  languages: CvLanguageItem[];
  interests: unknown[];
  meta: CvMeta;
}
