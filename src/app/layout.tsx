import "@/assets/global/index.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/components/locale/LocaleProvider";
import { AvatarProvider } from "@/components/avatar/AvatarProvider";
import { CvModeProvider } from "@/components/cv/CvModeProvider";
import Footer from "@/components/footer";
import { VercelCompatibleComponents } from "@/components/vercel";
import { geistMono, geistSans, inter } from "@/utils/fonts/next-google";
import {
  BASE_URL,
  META_APP,
  META_DESCRIPTION,
  META_TITLE,
} from "@/config/variables";
import { neueHaasDisplay } from "@/utils/fonts/next-local";

export const metadata: Metadata = {
  title: META_TITLE,
  applicationName: META_APP,
  ...(META_DESCRIPTION && { description: META_DESCRIPTION }),
  metadataBase: new URL(BASE_URL),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: META_APP,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: META_TITLE,
    ...(META_DESCRIPTION && { description: META_DESCRIPTION }),
    type: "profile",
    siteName: META_APP,
    countryName: "Indonesia",
    locale: "id-ID",
    alternateLocale: "en-US",
    url: `/`,
    images: [
      {
        url: `images/opengraph-image.png`,
        alt: META_APP,
        type: "image/png",
      },
    ],
  },
  creator: "Raihan Yusuf",
  authors: [
    { name: "Raihan Yusuf", url: "https://www.linkedin.com/in/raihan-yusuf" },
  ],
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: `/favicon.ico`,
      sizes: "any",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      url: `/ios/180.png`,
      sizes: "180x180",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      url: `/ios/152.png`,
      sizes: "152x152",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      url: `/ios/120.png`,
      sizes: "120x120",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      url: `/ios/1024.png`,
      sizes: "1024x1024",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: `/favicon.ico`,
    },
  ],
};

/**
 * Viewport config. `themeColor` wajib didefinisikan di sini (bukan di metadata)
 * agar warna chrome browser mengikuti tema terang/gelap aplikasi.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${neueHaasDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AntdRegistry>
          <LocaleProvider>
            <ThemeProvider>
              <AvatarProvider>
                <CvModeProvider>
                  {children}
                  <Footer />
                </CvModeProvider>
              </AvatarProvider>
            </ThemeProvider>
          </LocaleProvider>
        </AntdRegistry>
        <VercelCompatibleComponents.Analytics />
      </body>
    </html>
  );
}
