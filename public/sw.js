/* global self, clients */
/* Service Worker untuk PWA (cv-portfolio).
 *
 * Mendaftarkan diri pada scope "/" (lihat ServiceWorkerRegistrar.tsx).
 *
 * Catatan: SW ini sengaja minimal (tanpa offline caching dan tanpa push).
 * Aplikasi CV bersifat dokumen online (data PDF di-generate server-side),
 * sehingga caching agresif justru berisiko menampilkan konten basi.
 * PWA tetap dapat di-install karena memiliki manifest + SW + HTTPS.
 */

/** Nama aplikasi untuk notifikasi default (bila dipakai ke depannya). */
const APP_NAME = "Digital CV";

self.addEventListener("install", () => {
  // Aktivasi langsung tanpa menunggu SW lama berhenti.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Klaim semua klien agar SW langsung mengontrol halaman yang sudah terbuka.
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", () => {
  // Sengaja tidak di-handle: network-first untuk semua request.
  // Listener `fetch` tetap terdaftar agar browser menganggap SW aktif.
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    (event.notification.data && event.notification.data.url) ||
    self.location.origin + "/";

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      // Fokus ke jendela yang sudah menampilkan aplikasi (atau origin sama).
      for (const client of allClients) {
        if (client.url.startsWith(self.location.origin)) {
          if ("focus" in client) {
            await client.focus();
          }
          // Navigasi ke URL target bila berbeda.
          if ("navigate" in client && client.url !== targetUrl) {
            try {
              await client.navigate(targetUrl);
            } catch {
              // abaikan bila navigasi gagal
            }
          }
          return;
        }
      }

      // Tidak ada jendela aktif -> buka baru.
      if (clients.openWindow) {
        await clients.openWindow(targetUrl);
      }
    })(),
  );
});

/** Pesan dari klien (mis. memicu update SW baru). */
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING" && self.skipWaiting) {
    self.skipWaiting();
  }
});

// Ikon aplikasi hanya direferensikan untuk dokumentasi konstanta di atas.
void APP_NAME;
