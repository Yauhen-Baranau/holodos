export { default, generateMetadata } from "../../[slug]/page";

import { serviceClusters } from "../../site-data";

export function generateStaticParams() {
  return serviceClusters.problems.pages.map((page) => ({ slug: page.slug }));
}
