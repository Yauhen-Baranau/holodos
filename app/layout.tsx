import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://holodos.by";
const siteName = "Холодос";
const description =
  "Срочный ремонт холодильников в Минске: диагностика на дому, замена деталей, гарантия и выезд мастера в день обращения.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Ремонт холодильников в Минске — Холодос",
    template: "%s — Холодос",
  },
  description,
  keywords: [
    "ремонт холодильников",
    "ремонт холодильников на дому",
    "мастер по холодильникам",
    "срочный ремонт холодильника Минск",
    "диагностика холодильника",
    "заправка фреоном",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName,
    title: "Ремонт холодильников в Минске — Холодос",
    description,
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Холодос — ремонт холодильников в Минске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ремонт холодильников в Минске — Холодос",
    description,
    images: ["/opengraph-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "home services",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
