import type { ServicePage } from "./_data/site";
import { email, siteName, siteUrl } from "./site-data";

export const businessId = `${siteUrl}/#localbusiness`;
export const webSiteId = `${siteUrl}/#website`;
export const defaultImage = `${siteUrl}/opengraph-image.svg`;

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": webSiteId,
    name: siteName,
    url: `${siteUrl}/`,
    image: defaultImage,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: `${siteUrl}/`,
      image: defaultImage,
    },
  };
}

export function createHeaderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WPHeader",
    "@id": `${siteUrl}/#site-header`,
    name: `${siteName} — шапка сайта`,
    url: `${siteUrl}/`,
    headline: "Ремонт холодильников в Минске",
  };
}

export function createFooterJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WPFooter",
    "@id": `${siteUrl}/#site-footer`,
    name: `${siteName} — подвал сайта`,
    url: `${siteUrl}/`,
    copyrightHolder: {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: siteName,
      telephone: "+375336443401",
      email,
    },
  };
}

export function createLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: siteName,
    image: defaultImage,
    url: `${siteUrl}/`,
    telephone: "+375336443401",
    email,
    priceRange: "BYN",
    description: "Ремонт холодильников на дому: срочный выезд мастера, диагностика, замена деталей и гарантия.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Домбровская, 9",
      addressLocality: "Минск",
      addressRegion: "Минская область",
      postalCode: "220036",
      addressCountry: "BY",
    },
    areaServed: [
      { "@type": "City", name: "Минск" },
      { "@type": "AdministrativeArea", name: "Минская область" },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9113,
      longitude: 27.4543,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    sameAs: [
      "https://maps.app.goo.gl/u8A1kU34rUbR9ayv6",
      "https://yandex.by/maps/-/CPxdnI3F",
    ],
  };
}

export function createServiceJsonLd(page: ServicePage, canonicalUrl: string) {
  const image = page.brandImage ? new URL(page.brandImage, siteUrl).toString() : defaultImage;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${canonicalUrl}#service-business`,
    name: page.title,
    alternateName: page.menuTitle,
    description: page.description,
    url: canonicalUrl,
    image,
    telephone: "+375336443401",
    email,
    priceRange: "BYN",
    serviceType: page.menuTitle,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Домбровская, 9",
      addressLocality: "Минск",
      addressRegion: "Минская область",
      postalCode: "220036",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9113,
      longitude: 27.4543,
    },
    areaServed: [
      { "@type": "City", name: "Минск" },
      { "@type": "AdministrativeArea", name: "Минская область" },
    ],
    sameAs: [
      "https://maps.app.goo.gl/u8A1kU34rUbR9ayv6",
      "https://yandex.by/maps/-/CPxdnI3F",
    ],
    makesOffer: {
      "@type": "Offer",
      url: canonicalUrl,
      name: page.menuTitle,
      description: page.price,
      priceCurrency: "BYN",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: page.menuTitle,
        description: page.description,
        serviceType: page.menuTitle,
      },
    },
  };
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function createFaqJsonLd(faq: ServicePage["faq"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
