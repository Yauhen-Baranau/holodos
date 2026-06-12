export * from "./_data/site";
export {
  minskRegionClusterPage,
  minskRegionServicePages,
} from "./_data/region-service-pages";

import { baseServicePages } from "./_data/base-service-pages";
import {
  minskRegionClusterPage,
  minskRegionServicePages,
} from "./_data/region-service-pages";
import { targetedServicePages } from "./_data/targeted-service-pages";

const businessPageSlugs = ["remont-po-beznalichnomu-raschetu"];

export const repairServicePages = baseServicePages;
export const businessServicePages = targetedServicePages.filter((page) =>
  businessPageSlugs.includes(page.slug),
);
export const problemPages = targetedServicePages.filter(
  (page) => !businessPageSlugs.includes(page.slug),
);
export const regionalServicePages = minskRegionServicePages;

export const servicePages = [
  ...baseServicePages,
  ...targetedServicePages,
  ...minskRegionServicePages,
];

export const allRoutes = [
  "/",
  `/${minskRegionClusterPage.slug}/`,
  ...servicePages.map((page) => `/${page.slug}/`),
];

export const popularServices = servicePages.filter((page) =>
  [
    "vizov-mastera",
    "zaprevka-freona",
    "remont-no-frost",
    "remont-rele",
    "zamena-kompressora",
    "zamena-isparitelya",
    "perenaveska-dveri",
    "remont-kameri",
    "zamena-uplotnitelya",
  ].includes(page.slug),
);

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
