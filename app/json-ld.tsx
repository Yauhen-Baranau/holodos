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
      "@id": businessId,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: page.title,
    alternateName: page.menuTitle,
    description: page.description,
    serviceType: page.menuTitle,
    url: canonicalUrl,
    image: page.brandImage ? `${siteUrl}${page.brandImage}` : defaultImage,
    provider: { "@id": businessId },
    areaServed: [
      { "@type": "City", name: "Минск" },
      { "@type": "AdministrativeArea", name: "Минская область" },
    ],
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "BYN",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "BYN",
        description: page.price,
      },
      availability: "https://schema.org/InStock",
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
