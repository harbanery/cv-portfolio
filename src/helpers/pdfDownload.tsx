"use client";

import type { Locale } from "@/models/types";

/**
 * Fetch PDF dari API route server-side dan picu download.
 *
 * API route di /api/cv-pdf menggenerate PDF menggunakan @react-pdf/renderer
 * server-side, lalu mengembalikan binary stream PDF.
 *
 * @param locale Locale aktif
 * @param filename Nama file PDF yang akan diunduh
 */
export async function downloadCvPdf(
  locale: Locale,
  filename: string,
): Promise<void> {
  const response = await fetch("/api/cv-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locale }),
  });

  console.log("download cv", response);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
