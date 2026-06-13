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

export const baseRepairServicePages = baseServicePages;
export const brandRepairServicePages = brandServicePages;
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

export const serviceClusters = {
  services: {
    slug: "services",
    title: "Услуги",
    menuTitle: "Услуги",
    description: "Основные услуги по ремонту холодильников в Минске: диагностика, замена узлов, заправка фреоном и обслуживание на дому.",
    eyebrow: "Услуги",
    lead: "Собрали основные сервисные направления в отдельном разделе: выбирайте нужную услугу и смотрите цену, сроки и порядок работ.",
    pages: baseServicePages,
  },
  brands: {
    slug: "brands",
    title: "Ремонт холодильников по брендам",
    menuTitle: "Бренды",
    description: "Ремонт холодильников популярных брендов в Минске с выездом мастера, диагностикой и гарантией.",
    eyebrow: "Марки холодильников",
    lead: "Отдельный кластер страниц по брендам холодильников: подбираем решение с учетом модели, системы управления и типовых неисправностей марки.",
    pages: brandServicePages,
  },
  regions: {
    slug: "regions",
    title: "Ремонт холодильников по регионам",
    menuTitle: "Регионы",
    description: "Выездной ремонт холодильников в Минске и населенных пунктах Минской области.",
    eyebrow: "География выезда",
    lead: "Региональный кластер с направлениями выезда мастера по Минской области: диагностика и ремонт холодильников на дому.",
    pages: minskRegionServicePages,
  },
  problems: {
    slug: "problems",
    title: "Ремонт холодильников по симптомам",
    menuTitle: "Проблемы",
    description: "Страницы по типовым неисправностям холодильников: нет холода, течет вода, шумит, пищит, намерзает лед и другие симптомы.",
    eyebrow: "Типовые поломки",
    lead: "Подберите страницу по заметному симптому: объясняем вероятные причины, сроки диагностики и варианты ремонта.",
    pages: targetedServicePages,
  },
} as const;

export type ServiceClusterSlug = keyof typeof serviceClusters;

const serviceClusterEntries = Object.values(serviceClusters);

export function getServiceClusterForPage(page: { slug: string }) {
  return serviceClusterEntries.find((item) =>
    item.pages.some((clusterPage) => clusterPage.slug === page.slug),
  );
}

export function getServiceHref(page: { slug: string }) {
  const cluster = getServiceClusterForPage(page);

  return cluster ? `/${cluster.slug}/${page.slug}/` : `/${page.slug}/`;
}

export function getClusterBySlug(slug: string) {
  return serviceClusterEntries.find((cluster) => cluster.slug === slug);
}

export function getClusterServicePage(clusterSlug: string, pageSlug: string) {
  return getClusterBySlug(clusterSlug)?.pages.find((page) => page.slug === pageSlug);
}

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
  href: getServiceHref(page),
  title: page.menuTitle,
  description: page.description,
  price: page.price,
  searchText: createSearchText(page),
  titleSearchText: `${page.title} ${page.menuTitle}`.toLowerCase(),
}));

export const allRoutes = [
  "/",
  `/${minskRegionClusterPage.slug}/`,
  ...serviceClusterEntries.map((cluster) => `/${cluster.slug}/`),
  ...servicePages.map((page) => getServiceHref(page)),
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
