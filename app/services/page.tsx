import type { Metadata } from "next";
import { ServiceClusterPage } from "../service-cluster-page";
import { serviceClusters, siteName } from "../site-data";

const cluster = serviceClusters.services;

export const metadata: Metadata = {
  title: cluster.title,
  description: cluster.description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${cluster.title} — ${siteName}`,
    description: cluster.description,
    url: "/services",
    type: "website",
  },
};

export default function Page() {
  return <ServiceClusterPage cluster={cluster} />;
}
