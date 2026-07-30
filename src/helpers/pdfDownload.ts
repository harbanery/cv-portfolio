"use client";

import type { jsPDF } from "jspdf";

/**
 * Mengubah elemen DOM menjadi PDF dan memicu download.
 *
 * Menggunakan html2canvas-pro (fork yang mendukung oklch/oklab) untuk
 * menangkap elemen sebagai gambar, lalu menyisipkannya ke dalam jsPDF.
 * Jika konten lebih panjang dari satu halaman, akan otomatis terpotong.
 *
 * Jika html2canvas-pro gagal, fallback ke window.print().
 *
 * @param element Elemen DOM yang akan dikonversi ke PDF
 * @param filename Nama file PDF yang akan diunduh
 * @returns true jika berhasil via canvas, false jika menggunakan fallback print
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string,
): Promise<boolean> {
  try {
    return await downloadViaCanvas(element, filename);
  } catch {
    // Fallback: gunakan dialog print browser (Save as PDF)
    window.print();
    return false;
  }
}

async function downloadViaCanvas(
  element: HTMLElement,
  filename: string,
): Promise<boolean> {
  const [{ default: html2canvas }, jspdfModule] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);
  const JsPDF: typeof jsPDF = jspdfModule.jsPDF;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 dalam milimeter: 210 x 297
  const pdf = new JsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= pdfHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  } else {
    // Konten lebih panjang dari satu halaman: pecah ke beberapa halaman
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
  }

  pdf.save(filename);
  return true;
}
