import path from "path";
import { Font } from "@react-pdf/renderer";

let registered = false;

/**
 * Register Inter font untuk react-pdf.
 * Dipanggil sekali saat modul pertama kali di-import.
 * Menggunakan absolute path filesystem untuk kompatibilitas server-side.
 */
export function registerInterFont(): void {
  if (registered) return;
  registered = true;

  const fontsDir = path.join(process.cwd(), "public", "fonts");

  Font.register({
    family: "Inter",
    fonts: [
      {
        src: path.join(fontsDir, "Inter-Regular.ttf"),
        fontWeight: 400,
      },
      {
        src: path.join(fontsDir, "Inter-Medium.ttf"),
        fontWeight: 500,
      },
      {
        src: path.join(fontsDir, "Inter-Bold.ttf"),
        fontWeight: 700,
      },
    ],
  });

  Font.registerHyphenationCallback((word) => [word]);
}

/** Konstanta warna dan ukuran untuk PDF. */
export const PDF_COLORS = {
  primary: "#6366f1",
  text: "#171717",
  secondary: "#6b7280",
  light: "#9ca3af",
  border: "#e5e7eb",
  badgeBg: "#f3f4f6",
};

export const MAX_ITEMS_PDF = 3;
