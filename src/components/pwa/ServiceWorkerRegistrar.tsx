"use client";

import { useEffect } from "react";

/**
 * Mendaftarkan service worker (`/sw.js`) untuk PWA.
 *
 * - Hanya berjalan di production: di development SW sering mengganggu
 *   hot-reload dan menyajikan aset basi.
 * - `updateViaCache: "none"` memastikan browser tidak pernah mengambil
 *   file SW dari HTTP cache, sehingga pembaruan SW langsung terdeteksi.
 * - Kegagalan registrasi diabaikan secara sadar (silently ignored) — PWA
 *   bukan fitur kritis, situs tetap berfungsi normal tanpa SW.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => {
        // abaikan — situs tetap berfungsi tanpa service worker
      });
  }, []);

  return null;
}
