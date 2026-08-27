import {
  MAX_HIGHLIGHTS_PDF,
  MAX_PROJECTS_PDF,
  MAX_WORK_HIGHLIGHTS_PDF,
} from "@/components/pdf/fontConfig";
import type { CvData, CvProjectItem, CvWorkItem } from "@/models/types";

/**
 * Helper pembatas konten PDF.
 *
 * Mengikuti pola layer `helpers/` pada progress-self: pure function tanpa
 * efek samping, mudah diuji, dan dipakai oleh layer `server/` maupun
 * `components/`. Konstanta batas tetap didefinisikan di `components/pdf/
 * fontConfig.ts` agar terkumpul bersama konfigurasi PDF lainnya.
 */

/** Batasi jumlah highlight pengalaman kerja yang dirender di PDF. */
export function limitWorkHighlights(highlights: string[]): string[] {
  return highlights.slice(0, MAX_WORK_HIGHLIGHTS_PDF);
}

/** Batasi jumlah highlight (bullet) per project yang dirender di PDF. */
export function limitProjectHighlights(highlights: string[]): string[] {
  return highlights.slice(0, MAX_HIGHLIGHTS_PDF);
}

/** Batasi jumlah project yang dirender di PDF. */
export function limitProjects(projects: CvProjectItem[]): CvProjectItem[] {
  return projects.filter((p) => !p.disabled).slice(0, MAX_PROJECTS_PDF);
}

/** Ambil item kerja aktif (terbaru) untuk kebutuhan ringkasan. */
export function getCurrentWorkItems(work: CvWorkItem[]): CvWorkItem[] {
  return work.filter((w) => w.isCurrentRole);
}

/** Total tahun pengalaman kerja (berdasarkan tanggal mulai terawal). */
export function getYearsOfExperience(work: CvWorkItem[]): number {
  const now = new Date().getFullYear();
  const startYears = work
    .map((w) => parseInt(w.startDate.split("-")[0], 10))
    .filter((y) => !isNaN(y));
  if (startYears.length === 0) return 0;
  return Math.max(0, now - Math.min(...startYears));
}

/** Ringkasan singkat data CV untuk keperluan debug/metadata. */
export function summarizeCvData(data: CvData): {
  workCount: number;
  educationCount: number;
  certificationCount: number;
  projectCount: number;
} {
  return {
    workCount: data.work.length,
    educationCount: data.education.length,
    certificationCount: data.certifications.length,
    projectCount: data.projects.filter((p) => !p.disabled).length,
  };
}
