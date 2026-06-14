import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "../../service-detail-page";
import { getClusterServicePage, getServiceHref, serviceClusters, siteName } from "../../site-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const cluster = serviceClusters.services;

export function generateStaticParams() {
  return cluster.pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getClusterServicePage(cluster.slug, slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: getServiceHref(page),
    },
    openGraph: {
      title: `${page.title} — ${siteName}`,
      description: page.description,
      url: getServiceHref(page),
      type: "website",
      images: [
        {
          url: "/opengraph-image.svg",
          width: 1200,
          height: 630,
          alt: `${page.title} — ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} — ${siteName}`,
      description: page.description,
      images: ["/opengraph-image.svg"],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getClusterServicePage(cluster.slug, slug);

  if (!page) {
    return notFound();
  }

  return <ServiceDetailPage page={page}/>;
}
