import cvDataRaw from "../../public/references/cv_data.json";
import type { CvData } from "./types";

/**
 * Data CV yang diimpor langsung dari `public/references/cv_data.json`.
 *
 * File JSON ini adalah sumber data tunggal (single source of truth) untuk
 * seluruh aplikasi, dipakai baik di sisi client (komponen CV) maupun sisi
 * server (API route generator PDF). Karena `resolveJsonModule` aktif, JSON
 * di-bundle sebagai modul biasa dan tersedia di kedua lingkungan.
 */
export const CV_DATA = cvDataRaw as CvData;
