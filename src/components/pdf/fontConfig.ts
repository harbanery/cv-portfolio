import nodePath from "node:path";
import { Font } from "@react-pdf/renderer";

let registered = false;

/**
 * Register Calibri font (Carlito, metric-compatible) untuk react-pdf.
 * Menggunakan absolute path filesystem untuk kompatibilitas server-side.
 */
export function registerCvFont(): void {
  if (registered) return;
  registered = true;

  const fontsDir = nodePath.join(process.cwd(), "public", "fonts");

  Font.register({
    family: "Calibri",
    fonts: [
      {
        src: nodePath.join(fontsDir, "Calibri-Regular.ttf"),
        fontWeight: 400,
      },
      {
        src: nodePath.join(fontsDir, "Calibri-Bold.ttf"),
        fontWeight: 700,
      },
    ],
  });

  Font.registerHyphenationCallback((word) => [word]);
}

/**
 * Konstanta warna untuk PDF (netral, ATS-friendly).
 * Hindari warna mencolok atau grafik rumit.
 */
export const PDF_COLORS = {
  heading: "#1a1a1a",
  text: "#333333",
  secondary: "#555555",
  light: "#888888",
  border: "#cccccc",
};

export const MAX_ITEMS_PDF = 3;
