import type { LocalizedText } from "./types";

/**
 * Semua kategori sumber data CV.
 *
 * Setiap sumber memiliki warna khas brand-nya untuk memudahkan
 * identifikasi visual di badge.
 */
export type DataSource =
  | "linkedin"
  | "jobstreet"
  | "github"
  | "gitlab"
  | "personal"
  | "freelance"
  | "portfolio"
  | "behance"
  | "dribbble"
  | "stackoverflow"
  | "medium"
  | "kaggle"
  | "hackerrank"
  | "coursera"
  | "udemy"
  | "volunteer"
  | "academic"
  | "certification"
  | "conference"
  | "open_source";

export interface SourceConfig {
  color: string;
  label: LocalizedText;
}

/**
 * Konfigurasi warna & label untuk setiap sumber data.
 * Warna mengikuti brand color asli masing-masing platform.
 */
export const SOURCE_CONFIG: Record<DataSource, SourceConfig> = {
  linkedin: {
    color: "#0a66c2",
    label: { id: "LinkedIn", en: "LinkedIn" },
  },
  jobstreet: {
    color: "#005c99",
    label: { id: "JobStreet", en: "JobStreet" },
  },
  github: {
    color: "#181717",
    label: { id: "GitHub", en: "GitHub" },
  },
  gitlab: {
    color: "#fc6d26",
    label: { id: "GitLab", en: "GitLab" },
  },
  personal: {
    color: "#6366f1",
    label: { id: "Pribadi", en: "Personal" },
  },
  freelance: {
    color: "#1dbf73",
    label: { id: "Freelance", en: "Freelance" },
  },
  portfolio: {
    color: "#8b5cf6",
    label: { id: "Portfolio", en: "Portfolio" },
  },
  behance: {
    color: "#1769ff",
    label: { id: "Behance", en: "Behance" },
  },
  dribbble: {
    color: "#ea4c89",
    label: { id: "Dribbble", en: "Dribbble" },
  },
  stackoverflow: {
    color: "#f48024",
    label: { id: "Stack Overflow", en: "Stack Overflow" },
  },
  medium: {
    color: "#000000",
    label: { id: "Medium", en: "Medium" },
  },
  kaggle: {
    color: "#20beff",
    label: { id: "Kaggle", en: "Kaggle" },
  },
  hackerrank: {
    color: "#00ea64",
    label: { id: "HackerRank", en: "HackerRank" },
  },
  coursera: {
    color: "#0056d2",
    label: { id: "Coursera", en: "Coursera" },
  },
  udemy: {
    color: "#a435f0",
    label: { id: "Udemy", en: "Udemy" },
  },
  volunteer: {
    color: "#43a047",
    label: { id: "Volunteer", en: "Volunteer" },
  },
  academic: {
    color: "#d32f2f",
    label: { id: "Akademik", en: "Academic" },
  },
  certification: {
    color: "#ff9800",
    label: { id: "Sertifikasi", en: "Certification" },
  },
  conference: {
    color: "#e91e63",
    label: { id: "Konferensi", en: "Conference" },
  },
  open_source: {
    color: "#6f42c1",
    label: { id: "Open Source", en: "Open Source" },
  },
};
