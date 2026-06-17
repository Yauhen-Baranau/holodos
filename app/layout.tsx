import type { Metadata, Viewport } from "next";
import "./globals.css";
import { email, phoneDisplay } from "./site-data";

const siteUrl = "https://holodos.by";
const siteName = "Холодос";
const description =
  `Ремонт холодильников в Минске на дому. ⭐Atlant, ⭐Samsung, ⭐LG, ⭐Gorenje и любые другие бренды с выездом мастера на дом в Минске и области. Либо с вывозом в сервисный центр ☎️ ${phoneDisplay}`;

export const metadata: Metadata = {
  verification: {
    google: "11122",
    yandex: "222",
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

const headerJsonLd = {
  "@context": "https://schema.org",
  "@type": "WPHeader",
  "@id": `${siteUrl}/#site-header`,
  name: `${siteName} — шапка сайта`,
  url: `${siteUrl}/`,
  headline: "Ремонт холодильников в Минске",
};

const footerJsonLd = {
  "@context": "https://schema.org",
  "@type": "WPFooter",
  "@id": `${siteUrl}/#site-footer`,
  name: `${siteName} — подвал сайта`,
  url: `${siteUrl}/`,
  copyrightHolder: {
    "@type": "LocalBusiness",
    name: siteName,
    telephone: phoneDisplay,
    email,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(headerJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(footerJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
