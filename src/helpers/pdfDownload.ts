"use client";

import type { jsPDF } from "jspdf";

/**
 * Mengubah elemen DOM menjadi PDF dan memicu download.
 *
 * Menggunakan html2canvas untuk menangkap elemen sebagai gambar,
 * lalu menyisipkannya ke dalam jsPDF. Jika konten lebih panjang dari
 * satu halaman, akan otomatis terpotong menjadi beberapa halaman.
 *
 * Catatan: html2canvas tidak mendukung warna oklch() (default Tailwind v4).
 * Pada `onclone`, kita mengganti semua oklch di stylesheet menjadi hex agar
 * proses capture tidak gagal.
 *
 * @param element Elemen DOM yang akan dikonversi ke PDF
 * @param filename Nama file PDF yang akan diunduh
 */
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const [{ default: html2canvas }, jspdfModule] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const JsPDF: typeof jsPDF = jspdfModule.jsPDF;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    onclone: (clonedDoc: Document) => {
      // Ganti oklch() di semua stylesheet clone agar html2canvas bisa parse
      const oklchRegex = /oklch\([^)]+\)/g;
      const oklchReplacement = "#d1d5db";

      for (const sheet of Array.from(clonedDoc.styleSheets)) {
        try {
          const rules = sheet.cssRules;
          for (const rule of Array.from(rules)) {
            if (
              rule.cssText.includes("oklch(") ||
              rule.cssText.includes("oklab(")
            ) {
              const newCss = rule.cssText
                .replace(oklchRegex, oklchReplacement)
                .replace(/oklab\([^)]+\)/g, oklchReplacement);
              sheet.deleteRule(Array.from(rules).indexOf(rule));
              sheet.insertRule(newCss, Array.from(rules).indexOf(rule));
            }
          }
        } catch {
          // Cross-origin stylesheet, skip
        }
      }

      // Paksa background putih pada elemen yang di-capture
      const clonedEl = clonedDoc.querySelector(".cv-document");
      if (clonedEl instanceof HTMLElement) {
        clonedEl.style.backgroundColor = "#ffffff";
        clonedEl.style.color = "#171717";
      }
    },
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

  // Rasio lebar gambar terhadap lebar PDF
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
}
