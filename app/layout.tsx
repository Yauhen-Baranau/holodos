import type { Metadata, Viewport } from "next";
import "./globals.css";
import {phoneDisplay } from "./site-data";
import { Nunito_Sans } from 'next/font/google'

const inter = Nunito_Sans({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})

const siteUrl = "https://holodos.by";
const siteName = "Холодос";
const description =
  `Ремонт холодильников в Минске на дому. ⭐Atlant, ⭐Samsung, ⭐LG, ⭐Gorenje и любые другие бренды с выездом мастера на дом в Минске и области. Либо с вывозом в сервисный центр ☎️ ${phoneDisplay}`;

export const metadata: Metadata = {
  verification: {
    google: "OR9FOnngTLdzJqchjpuQrdmqYV1DK_o_VBBiqONxl3w",
    yandex: "bafc5e9a7fdc267e",
  },
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Ремонт холодильников в Минске с выездом на дом, цены — Холодос",
    template: "%s",
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
    title: "Ремонт холодильников в Минске с выездом на дом, цены — Холодос",
    description,
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Холодос — Ремонт холодильников в Минске с выездом на дом, цены",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ремонт холодильников в Минске с выездом на дом, цены — Холодос",
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/favicon-180x180.png", sizes: "180x180" }
    ]
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
    <html lang="ru" className={inter.className}>
    <body>
        {children}
      </body>
    </html>
  );
}
