import type { Metadata } from "next";
import { ServiceClusterPage } from "../service-cluster-page";
import { serviceClusters, siteName } from "../site-data";

const cluster = serviceClusters.problems;

export const metadata: Metadata = {
  title: cluster.title,
  description: cluster.description,
  alternates: { canonical: "/problems" },
  openGraph: {
    title: `${cluster.title} — ${siteName}`,
    description: cluster.description,
    url: "/problems",
    type: "website",
  },
};

export default function Page() {
  return <ServiceClusterPage cluster={cluster} isProblems={true} />;
}
