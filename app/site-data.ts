export * from "./_data/site";
export { minskRegionServicePages } from "./_data/region-service-pages";

import { baseServicePages } from "./_data/base-service-pages";
import { brandServicePages } from "./_data/brand-service-pages";
import { minskRegionServicePages } from "./_data/region-service-pages";
import { targetedServicePages } from "./_data/targeted-service-pages";
import type { SearchItem } from "./search";
import { blogArticles, getBlogHref } from "./_data/blog";

const businessPageSlugs = ["remont-po-beznalichnomu-raschetu"];
const standalonePageSlugs = ["about", "masterskaya"];

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
    title: "Услуги по ремонту холодильников в Минске с выездом на дом",
    menuTitle: "Услуги",
    h1Title: "Услуги по ремонту холодильников",
    description: "Основные услуги по ремонту холодильников в Минске: диагностика, замена компрессора и термостата, ремонт No Frost, заправка фреоном, замена уплотнителя и обслуживание на дому с гарантией.",
    eyebrow: "Услуги",
    lead: "Услуги по ремонту холодильников в Минске востребованы как среди владельцев бытовой техники, так и среди организаций. Наши мастера выполняют диагностику и ремонт холодильников любых марок с выездом на дом. Мы устраняем утечку фреона, заменяем компрессоры, термостаты, датчики и другие неисправные узлы, восстанавливая стабильную работу техники в кратчайшие сроки.",
    intro: "Здесь представлены все услуги по ремонту холодильников: от диагностики и устранения мелких неисправностей до замены компрессора, ремонта системы охлаждения и электронных модулей. Для каждой услуги указаны особенности выполнения работ, признаки поломки и примерная стоимость ремонта",
    highlights: ["диагностика перед ремонтом", "ремонт на дому по Минску", "цены и сроки по каждой услуге"],
    pages: baseServicePages.filter((page) => !standalonePageSlugs.includes(page.slug)),
  },
  brands: {
    slug: "brands",
    title: "Ремонт всех марок холодильников",
    menuTitle: "Бренды",
    h1Title: "Бренды холодильников",
    description: "Ремонт холодильников популярных брендов в Минске с выездом мастера, диагностикой, подбором совместимых деталей и гарантией на выполненные работы.",
    eyebrow: "Марки холодильников",
    lead: "Подбираем решение с учетом модели, системы управления и типовых неисправностей конкретной марки.",
    intro: "У разных брендов отличаются электронные модули, датчики, системы оттайки и типовые слабые места. В карточках брендов собраны страницы, где описаны характерные симптомы и подход к ремонту конкретных холодильников.",
    highlights: ["🔧 Оригинальные и качественные запчасти", "👨‍🔧 Опыт работы с любой конструкцией", "ремонт механики, электроники и No Frost", "🛡️ Гарантия на выполненные работы"],
    pages: brandServicePages,
  },
  regions: {
    slug: "regions",
    title: "Ремонт холодильников в Минской области",
    h1Title: "Ремонт холодильников по Минской области",
    menuTitle: "Регионы",
    description: "Выездной ремонт холодильников в населенных пунктах Минской области: диагностика на дому, согласование сметы, ремонт и гарантия.",
    eyebrow: "География выезда",
    lead: "Выбирайте населенный пункт и смотрите условия ремонта холодильника на дому.",
    intro: "Выезжаем для ремонта холодильников по всей Минской области — в города, поселки и деревни. Мастер приедет на дом, проведет диагностику, выполнит ремонт любой сложности и заменит неисправные детали без транспортировки холодильника в мастерскую.",
    highlights: ["выезд по Минской области", "ремонт без вывоза техники", "согласование времени приезда"],
    pages: minskRegionServicePages,
  },
  problems: {
    slug: "problems",
    title: "Основные поломки и неисправности холодильника - Ремонт в Минске",
    h1Title: "Неисправности холодильника",
    menuTitle: "Проблемы",
    description: "Неисправности холодильников: нет холода, течет вода, шумит, пищит, намерзает лед, не запускается компрессор и появляются ошибки.",
    eyebrow: "Типовые поломки",
    lead: "Подберите страницу по заметному симптому: объясняем вероятные причины, сроки диагностики и варианты ремонта холодильника.",
    intro: "Здесь вы найдете описание основных поломок холодильников и их признаков. Если холодильник перестал морозить, не запускается, постоянно работает, протекает, издает необычные звуки или отображает код ошибки, выберите соответствующую неисправность, чтобы узнать возможные причины, стоимость ремонта и способы устранения проблемы.",
    highlights: ["🔧 Точная диагностика неисправностей", "⚡ Ремонт в день обращения", "❄️ Устранение любых проблем с охлаждением", "🛡️ Гарантия на выполненные работы" ],
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

export const siteSearchItems: SearchItem[] = [
  ...servicePages.map((page) => ({
    slug: page.slug,
    href: getServiceHref(page),
    title: page.menuTitle,
    description: page.description,
    price: page.price,
    searchText: createSearchText(page),
    titleSearchText: `${page.title} ${page.menuTitle}`.toLowerCase(),
  })),
  ...blogArticles.map((article) => ({
    slug: article.slug,
    href: getBlogHref(article),
    title: article.menuTitle,
    description: article.description,
    price: article.readTime,
    searchText: [
      article.title,
      article.menuTitle,
      article.description,
      article.excerpt,
      ...article.tags,
      ...article.sections.flatMap((section) => [
        section.title,
        ...(section.body ?? []),
        ...(section.bullets ?? []),
        ...(section.steps ?? []),
      ]),
    ].join(" ").toLowerCase(),
    titleSearchText: `${article.title} ${article.menuTitle}`.toLowerCase(),
  })),
];

export const allRoutes = [
  "/",
  ...serviceClusterEntries.map((cluster) => `/${cluster.slug}/`),
  ...servicePages.map((page) => getServiceHref(page)),
  "/blog/",
  ...blogArticles.map((article) => getBlogHref(article)),
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
