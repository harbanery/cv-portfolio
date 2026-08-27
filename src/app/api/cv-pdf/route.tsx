import { NextRequest, NextResponse } from "next/server";
import { generateCvPdf } from "@/server/cvPdf";
import type { Locale } from "@/models/types";

/**
 * API route untuk generate PDF CV server-side.
 *
 * Method POST dengan body JSON berisi { locale, avatar }. Konten CV dipilih
 * per-locale dari `getCvData(locale)` (me.en.json / me.id.json) di dalam
 * `server/cvPdf`. Mengembalikan PDF binary dengan content-type application/pdf.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    locale?: Locale;
    avatar?: boolean;
  };
  const locale: Locale = body.locale ?? "id";
  const withAvatar = body.avatar === true;

  let buffer: Buffer;
  try {
    const result = await generateCvPdf({ locale, avatar: withAvatar });
    buffer = result.buffer;
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
      "Content-Disposition": 'attachment; filename="CV.pdf"',
    },
  });
}
