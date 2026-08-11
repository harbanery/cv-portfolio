import type { MetadataRoute } from "next";
import {
  META_APP,
  META_DESCRIPTION,
  META_TITLE,
} from "@/config/variables";

/**
 * Web App Manifest (PWA).
 *
 * Di-generate ke `/manifest.webmanifest` oleh Next.js dan otomatis ditautkan
 * pada <link rel="manifest">. Memungkinkan situs CV dipasang ke home screen
 * (installable PWA).
 *
 * `name` = judul lengkap, `short_name` = nama singkat untuk ikon home screen.
 *
 * Ikon bersumber dari `public/android/` (launcher icon standar PWA).
 * Ikon 512 ditandai `any maskable` agar adaptif di Android (adaptive icon).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: META_TITLE ?? META_APP ?? "CV Portfolio",
    short_name: META_APP ?? "CV Portfolio",
    description: META_DESCRIPTION ?? "Personal CV portfolio website",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f3f4f6",
    theme_color: "#6366f1",
    lang: "id",
    categories: ["business", "productivity", "career"],
    icons: [
      {
        src: "/android/launchericon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android/launchericon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android/launchericon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android/launchericon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android/launchericon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      // Launcher icon 512 berlatar penuh -> aman sebagai adaptive (maskable)
      // icon di Android. Dideklarasikan dua entri ("any" & "maskable") karena
      // tipe Next.js hanya menerima satu purpose per entri.
      {
        src: "/android/launchericon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android/launchericon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
