/** Type untuk supported locales. */
export type Locale = "id" | "en";

/** Teks yang tersedia dalam multiple bahasa. */
export interface LocalizedText {
  id: string;
  en: string;
}

/** Re-export DataSource dari sources.ts */
export type { DataSource } from "./sources";

import type { DataSource } from "./sources";

/** Informasi kontak. */
export interface ContactInfo {
  email: string;
  phone: string;
  location: LocalizedText;
  website?: string;
  linkedin?: string;
  github?: string;
}

/** Pengalaman kerja. */
export interface ExperienceItem {
  source: DataSource;
  company: string;
  position: LocalizedText;
  startDate: string;
  endDate: string | null;
  location: LocalizedText;
  description: LocalizedText[];
}

/** Pendidikan. */
export interface EducationItem {
  source: DataSource;
  institution: string;
  degree: LocalizedText;
  field: LocalizedText;
  startDate: string;
  endDate: string | null;
  gpa?: string;
  description?: LocalizedText[];
}

/** Kelompok keahlian. */
export interface SkillGroup {
  source: DataSource;
  category: LocalizedText;
  skills: string[];
}

/** Sertifikasi. */
export interface CertificationItem {
  source: DataSource;
  name: string;
  issuer: string;
  startDate: string;
  endDate: string | null;
}

/** Pengalaman organisasi. */
export interface OrganizationItem {
  source: DataSource;
  organization: string;
  position: LocalizedText;
  startDate: string;
  endDate: string | null;
  location: LocalizedText;
  description: LocalizedText[];
}

/** Bahasa. */
export interface LanguageItem {
  language: LocalizedText;
  proficiency: LocalizedText;
}

/** Project. */
export interface ProjectItem {
  source: DataSource;
  name: string;
  description: LocalizedText;
  techStack: string[];
  link?: string;
}

/** Profil utama CV. */
export interface CvProfile {
  name: string;
  title: LocalizedText;
  avatar?: string;
  contact: ContactInfo;
  summary: LocalizedText;
}

/** Data lengkap CV. */
export interface CvData {
  profile: CvProfile;
  experiences: ExperienceItem[];
  education: EducationItem[];
  organizations: OrganizationItem[];
  skills: SkillGroup[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
}
