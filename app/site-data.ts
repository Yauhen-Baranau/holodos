export * from "./_data/site";
export {
  minskRegionClusterPage,
  minskRegionServicePages,
} from "./_data/region-service-pages";

import { baseServicePages } from "./_data/base-service-pages";
import { brandServicePages } from "./_data/brand-service-pages";
import {
  minskRegionClusterPage,
  minskRegionServicePages,
} from "./_data/region-service-pages";
import { targetedServicePages } from "./_data/targeted-service-pages";
import type { SearchItem } from "./search";

const businessPageSlugs = ["remont-po-beznalichnomu-raschetu"];

export const repairServicePages = [
  ...baseServicePages,
  ...brandServicePages,
];
export const businessServicePages = targetedServicePages.filter((page) =>
  businessPageSlugs.includes(page.slug),
);
export const problemPages = targetedServicePages.filter(
  (page) => !businessPageSlugs.includes(page.slug),
);
export const regionalServicePages = minskRegionServicePages;

export const servicePages = [
  ...baseServicePages,
  ...brandServicePages,
  ...targetedServicePages,
  ...minskRegionServicePages,
];

function createSearchText(page: (typeof servicePages)[number]) {
  return [
    page.title,
    page.menuTitle,
    page.description,
    page.lead,
    page.price,
    page.duration,
    page.badge,
    ...page.symptoms,
    ...page.sections.flatMap((section) => [
      section.title,
      section.body,
      ...(section.bullets ?? []),
    ]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
  ]
    .join(" ")
    .toLowerCase();
}

export const siteSearchItems: SearchItem[] = servicePages.map((page) => ({
  slug: page.slug,
  title: page.menuTitle,
  description: page.description,
  price: page.price,
  searchText: createSearchText(page),
  titleSearchText: `${page.title} ${page.menuTitle}`.toLowerCase(),
}));

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
