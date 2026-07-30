import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import PdfDocument from "@/components/pdf/PdfDocument";
import { CV_DATA } from "@/models/data";
import { getSectionTitles, type PdfApiParams } from "@/helpers/pdfHelpers";

/**
 * API route untuk generate PDF CV server-side.
 *
 * Method POST dengan body JSON berisi { locale } (data CV di-hardcode untuk saat ini).
 * Mengembalikan PDF binary dengan content-type application/pdf.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<PdfApiParams>;
  const locale = body.locale ?? "id";

  const sectionTitles = getSectionTitles(locale);

  const doc = (
    <PdfDocument data={CV_DATA} locale={locale} sectionTitles={sectionTitles} />
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
