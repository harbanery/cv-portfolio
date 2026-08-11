import type { Locale, CvSkills, CvLocation } from "@/models/types";
import { TRANSLATIONS, translate } from "@/components/locale/translations";

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
  if (start === end) {
    return start;
  }
  return `${start} \u2014 ${end}`;
}

/** Format tanggal tunggal dari ISO (YYYY-MM atau YYYY) ke teks locale. */
export function formatDate(iso: string, locale: Locale): string {
  const parts = iso.split("-");

  if (parts.length === 1) {
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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

/** Pemetaan field kategori skill -> key translation. */
const SKILL_CATEGORY_KEYS = [
  ["languages", "skill.languages"],
  ["frameworks", "skill.frameworks"],
  ["libraries", "skill.libraries"],
  ["databases", "skill.databases"],
  ["tools", "skill.tools"],
  ["platforms", "skill.platforms"],
  ["methodologies", "skill.methodologies"],
  ["domains", "skill.domains"],
  ["softSkills", "skill.softSkills"],
] as const;

export interface SkillGroup {
  label: string;
  items: string[];
}

/** Ubah object skill terkategori menjadi daftar group berlabel (locale-aware). */
export function buildSkillGroups(
  skills: CvSkills,
  locale: Locale,
): SkillGroup[] {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.id;
  return SKILL_CATEGORY_KEYS.map(([field, key]) => ({
    label: translate(dict, key),
    items: skills[field],
  })).filter((group) => group.items.length > 0);
}

/** Nama negara dari country code (fallback ke kode bila tidak dikenal). */
const COUNTRY_NAMES: Record<string, string> = {
  ID: "Indonesia",
  US: "United States",
  GB: "United Kingdom",
  SG: "Singapore",
  MY: "Malaysia",
};

/** Teks lokasi "City, Region, Country". */
export function locationText(location: CvLocation): string {
  const country = COUNTRY_NAMES[location.countryCode] ?? location.countryCode;
  return `${location.city}, ${location.region}, ${country}`;
}

/* ----------------------------- Contact helpers ---------------------------- */

/** Tampilan email (tanpa prefix "mailto:"). */
export function emailDisplay(raw: string): string {
  return raw.replace(/^mailto:/i, "");
}

/** Href email yang valid. */
export function emailHref(raw: string): string {
  return /^mailto:/i.test(raw) ? raw : `mailto:${raw}`;
}

/** Format nomor telepon Indonesia dari URL/angka mentah ke "+62 ...". */
export function phoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) {
    const local = digits.slice(2);
    const a = local.slice(0, 3);
    const b = local.slice(3, 7);
    const c = local.slice(7);
    return `+62 ${a}${b ? `-${b}` : ""}${c ? `-${c}` : ""}`;
  }
  return raw;
}

/** Href telepon — URL WhatsApp bila tersedia, jika tidak tel:. */
export function phoneHref(raw: string): string {
  if (/^https?:\/\//i.test(raw)) return raw;
  return `tel:${raw.replace(/\s/g, "")}`;
}

/** Tampilan URL bersih (tanpa protokol & trailing slash). */
export function urlDisplay(raw: string): string {
  return raw.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
}
