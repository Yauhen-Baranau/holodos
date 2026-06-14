export * from "./_data/site";
export { minskRegionServicePages } from "./_data/region-service-pages";

import { baseServicePages } from "./_data/base-service-pages";
import { brandServicePages } from "./_data/brand-service-pages";
import { minskRegionServicePages } from "./_data/region-service-pages";
import { targetedServicePages } from "./_data/targeted-service-pages";
import type { SearchItem } from "./search";

const businessPageSlugs = ["remont-po-beznalichnomu-raschetu"];
const standalonePageSlugs = ["O-nas", "masterskaya"];

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
    description: "Основные услуги по ремонту холодильников в Минске: диагностика, замена компрессора и термостата, ремонт No Frost, заправка фреоном, замена уплотнителя и обслуживание на дому с гарантией.",
    eyebrow: "Услуги",
    lead: "Собрали основные сервисные направления в отдельном разделе: выбирайте нужную услугу и смотрите цену, сроки, симптомы и порядок работ без перехода по якорям на главной.",
    intro: "В этом разделе находятся работы, которые чаще всего нужны владельцам холодильников: от срочного выезда мастера до сложного ремонта контура охлаждения и электроники. Каждая страница раскрывает признаки неисправности, ориентировочную стоимость и этапы ремонта.",
    highlights: ["диагностика перед ремонтом", "ремонт на дому по Минску", "цены и сроки по каждой услуге"],
    pages: baseServicePages.filter((page) => !standalonePageSlugs.includes(page.slug)),
  },
  brands: {
    slug: "brands",
    title: "Ремонт холодильников по брендам",
    menuTitle: "Бренды",
    description: "Ремонт холодильников популярных брендов в Минске с выездом мастера, диагностикой, подбором совместимых деталей и гарантией на выполненные работы.",
    eyebrow: "Марки холодильников",
    lead: "Подбираем решение с учетом модели, системы управления и типовых неисправностей конкретной марки.",
    intro: "У разных брендов отличаются электронные модули, датчики, системы оттайки и типовые слабые места. В карточках брендов собраны страницы, где описаны характерные симптомы и подход к ремонту конкретных холодильников.",
    highlights: ["страницы по популярным маркам", "учет модели и года выпуска", "ремонт механики, электроники и No Frost"],
    pages: brandServicePages,
  },
  regions: {
    slug: "regions",
    title: "Ремонт холодильников по регионам",
    menuTitle: "Регионы",
    description: "Выездной ремонт холодильников в Минске и населенных пунктах Минской области: диагностика на дому, согласование сметы, ремонт и гарантия.",
    eyebrow: "География выезда",
    lead: "Выбирайте населенный пункт и смотрите условия ремонта холодильника на дому.",
    intro: "Заранее уточняем адрес, симптомы поломки и удобное время приезда. Мастер выезжает с инструментом и типовыми деталями, чтобы выполнить диагностику и по возможности устранить неисправность за один визит.",
    highlights: ["выезд по Минской области", "ремонт без вывоза техники", "согласование времени приезда"],
    pages: minskRegionServicePages,
  },
  problems: {
    slug: "problems",
    title: "Ремонт холодильников по симптомам",
    menuTitle: "Проблемы",
    description: "Страницы по типовым неисправностям холодильников: нет холода, течет вода, шумит, пищит, намерзает лед, не запускается компрессор и появляются ошибки.",
    eyebrow: "Типовые поломки",
    lead: "Подберите страницу по заметному симптому: объясняем вероятные причины, сроки диагностики и варианты ремонта холодильника.",
    intro: "Если непонятно, какая именно услуга нужна, начните с симптома. В этом разделе собраны ситуации, с которыми чаще всего обращаются: от воды под ящиками до ошибок на дисплее и слабого холода в камерах.",
    highlights: ["поиск услуги по симптому", "понятные причины поломок", "безнал вынесен в отдельную страницу"],
    pages: problemPages,
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
