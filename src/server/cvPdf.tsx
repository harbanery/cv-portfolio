import { renderToBuffer } from "@react-pdf/renderer";
import PdfDocument from "@/components/pdf/PdfDocument";
import { getCvData } from "@/models/data";
import {
  getSectionTitles,
  getContactLabels,
  getProjectLinkLabels,
} from "@/services/cvPdfService";
import type { Locale } from "@/models/types";

/**
 * Modul server-only untuk generate PDF CV.
 *
 * Dipakai oleh API route `/api/cv-pdf`. Mengikuti pola layer `server/`
 * pada progress-self: route handler tetap tipis, logika berat dipisah
 * ke modul khusus server agar mudah diuji dan di-reuse.
 */

export interface CvPdfOptions {
  locale: Locale;
  avatar: boolean;
}

/** Hasil generate PDF: binary buffer siap dikirim sebagai response. */
export interface CvPdfResult {
  buffer: Buffer;
}

/** Generate buffer PDF CV sesuai locale & opsi avatar. */
export async function generateCvPdf(
  options: CvPdfOptions,
): Promise<CvPdfResult> {
  const { locale, avatar } = options;

  const doc = (
    <PdfDocument
      data={getCvData(locale)}
      locale={locale}
      sectionTitles={getSectionTitles(locale)}
      contactLabels={getContactLabels(locale)}
      projectLinkLabels={getProjectLinkLabels(locale)}
      avatar={avatar}
    />
  );

  return { buffer: await renderToBuffer(doc) };
}
