import type { LocalizedText, Locale } from "@/models/types";

/**
 * Format rentang tanggal dari format ISO (YYYY-MM atau YYYY) ke teks yang
 * dapat dibaca manusia sesuai locale.
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null,
  locale: Locale,
): string {
  const start = formatDate(startDate, locale);
  const end = endDate
    ? formatDate(endDate, locale)
    : locale === "id"
      ? "Sekarang"
      : "Present";
  return `${start} \u2014 ${end}`;
}

/** Format tanggal tunggal dari ISO (YYYY-MM atau YYYY) ke teks locale. */
export function formatDate(iso: string, locale: Locale): string {
  // Parse ISO: bisa "YYYY-MM" atau "YYYY"
  const parts = iso.split("-");

  if (parts.length === 1) {
    // Hanya tahun
    return parts[0];
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return iso;
  }

  const monthNames = locale === "id" ? MONTHS_ID : MONTHS_EN;
  return `${monthNames[month - 1]} ${year}`;
}

const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/** Ambil teks sesuai locale dari LocalizedText. */
export function pickLocale(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}
