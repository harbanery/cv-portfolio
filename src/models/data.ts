import cvDataEn from "../../public/data/me.en.json";
import cvDataId from "../../public/data/me.id.json";
import type { CvData, Locale } from "./types";

/**
 * Data CV per-locale.
 *
 * Konten CV (ringkasan, highlights, deskripsi project, dll.) kini tersedia
 * dalam dua bahasa: `me.en.json` (Inggris) dan `me.id.json` (Indonesia).
 * File JSON ini adalah sumber data tunggal (single source of truth) untuk
 * seluruh aplikasi, dipakai baik di sisi client (komponen CV melalui hook
 * `useTranslatedCvData`) maupun sisi server (API route generator PDF melalui
 * `getCvData`). Karena `resolveJsonModule` aktif, JSON di-bundle sebagai
 * modul biasa dan tersedia di kedua lingkungan.
 */
export const CV_DATA_BY_LOCALE: Record<Locale, CvData> = {
  en: cvDataEn as CvData,
  id: cvDataId as CvData,
};

/** Locale default yang dipakai saat locale tidak dikenal. */
export const DEFAULT_CV_LOCALE: Locale = "id";

/**
 * Ambil data CV sesuai locale. Fallback ke locale default bila locale
 * tidak dikenal. Aman dipanggil di server maupun client.
 */
export function getCvData(locale: Locale): CvData {
  return CV_DATA_BY_LOCALE[locale] ?? CV_DATA_BY_LOCALE[DEFAULT_CV_LOCALE];
}

/**
 * Data CV untuk locale default. Tetap diekspor untuk kompatibilitas
 * backward (mis. nilai awal sebelum hydration).
 */
export const CV_DATA: CvData = CV_DATA_BY_LOCALE[DEFAULT_CV_LOCALE];
