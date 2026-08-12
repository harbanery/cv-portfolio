import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import PdfDocument from "@/components/pdf/PdfDocument";
import { getCvData } from "@/models/data";
import {
  getSectionTitles,
  getContactLabels,
  getProjectLinkLabels,
  type PdfApiParams,
} from "@/helpers/pdfHelpers";

/**
 * API route untuk generate PDF CV server-side.
 *
 * Method POST dengan body JSON berisi { locale, avatar }. Konten CV dipilih
 * per-locale dari `getCvData(locale)` (me.en.json / me.id.json).
 * Mengembalikan PDF binary dengan content-type application/pdf.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<PdfApiParams>;
  const locale = body.locale ?? "id";
  const withAvatar = body.avatar === true;

  const sectionTitles = getSectionTitles(locale);
  const contactLabels = getContactLabels(locale);
  const projectLinkLabels = getProjectLinkLabels(locale);

  const doc = (
    <PdfDocument
      data={getCvData(locale)}
      locale={locale}
      sectionTitles={sectionTitles}
      contactLabels={contactLabels}
      projectLinkLabels={projectLinkLabels}
      avatar={withAvatar}
    />
  );

  let buffer: Buffer;
  try {
    buffer = await renderToBuffer(doc);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="CV-Raihan-Yusuf.pdf"',
    },
  });
}
