import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "../service-detail-page";
import { getServiceHref, getServicePage, siteName } from "../site-data";

const page = getServicePage("masterskaya");

export function generateMetadata(): Metadata {
  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: getServiceHref(page) },
    openGraph: {
      title: `${page.title} — ${siteName}`,
      description: page.description,
      url: getServiceHref(page),
      type: "website",
      images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: `${page.title} — ${siteName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} — ${siteName}`,
      description: page.description,
      images: ["/opengraph-image.svg"],
    },
  };
}

export default function Page() {
  if (!page) {
    return notFound();
  }

  return <ServiceDetailPage page={page} />;
}
