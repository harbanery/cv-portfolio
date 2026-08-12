"use client";

import { useMemo } from "react";
import { getCvData } from "@/models/data";
import type { CvData } from "@/models/types";
import { useLocale } from "./LocaleProvider";

/**
 * Hook yang mengembalikan data CV (konten teks) sesuai locale aktif.
 *
 * Mengikuti pola `useTranslatedData` dari progress-self: konten data
 * (summary, highlights, deskripsi project, dll.) dipilih per-locale dari
 * `CV_DATA_BY_LOCALE`, bukan hanya label UI. Hasil di-memoize berdasarkan
 * locale agar tidak ada re-render yang tidak perlu.
 */
export function useTranslatedCvData(): CvData {
  const { locale } = useLocale();

  return useMemo(() => getCvData(locale), [locale]);
}
