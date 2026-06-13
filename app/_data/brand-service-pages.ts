import { phoneDisplay, type ServicePage } from "./site";

type BrandServicePageInput = {
  slug: string;
  brand: string;
  badge?: string;
  note?: string;
};

function createBrandServicePage({
  slug,
  brand,
  badge = brand,
  note = "Работаем с бытовыми моделями разных годов выпуска, включая холодильники с электронным управлением и системой No Frost.",
}: BrandServicePageInput): ServicePage {
  return {
    slug,
    title: `Ремонт холодильников ${brand} в Минске`,
    menuTitle: `Ремонт холодильников ${brand}`,
    description: `Ремонт холодильников ${brand} в Минске: диагностика на дому, замена деталей, заправка фреоном, ремонт No Frost и гарантия ☎️ ${phoneDisplay}`,
    eyebrow: "Ремонт по маркам",
    lead: `Выполняем ремонт холодильников ${brand} на дому в Минске: проверяем электронику, компрессор, датчики, контур охлаждения и систему оттайки. ${note}`,
    price: "от 60 руб.",
    duration: "от 60 минут",
    badge,
    symptoms: [
      "холодильник не морозит или слабо охлаждает",
      "появилась наледь, вода или посторонний шум",
      "компрессор не запускается или работает без остановки",
      "горит ошибка, пищит сигнал или мигают индикаторы",
    ],
    sections: [
      {
        title: `Что проверяем в холодильниках ${brand}`,
        body: "Начинаем с диагностики симптомов и фактической температуры в камерах, чтобы точно определить неисправный узел и не менять исправные детали.",
        bullets: [
          "термостат, датчики температуры и модуль управления",
          "пускозащитное реле, компрессор и вентиляторы",
          "систему No Frost, оттайку, ТЭН и таймер",
          "герметичность контура, испаритель и количество хладагента",
        ],
      },
      {
        title: "Как проходит ремонт на дому",
        body: "Мастер приезжает с инструментом и типовыми расходниками, проводит диагностику, согласует стоимость и выполняет ремонт на месте, если это технически возможно. После работ проверяем запуск, набор холода и выдаем гарантию.",
      },
    ],
    faq: [
      {
        question: `Можно ли отремонтировать холодильник ${brand} в день обращения?`,
        answer:
          "В большинстве случаев да: если нужная деталь есть у мастера и ремонт не требует длительного восстановления контура, работу выполняем за один визит.",
      },
      {
        question: "Сколько стоит ремонт?",
        answer:
          "Точную цену мастер называет после диагностики. Стоимость зависит от модели, неисправного узла и необходимости замены деталей.",
      },
    ],
  };
}

export const brandServicePages: ServicePage[] = [
  createBrandServicePage({ slug: "remont-atlant", brand: "Atlant", badge: "Atlant / Атлант" }),
  createBrandServicePage({ slug: "remont-samsung", brand: "Samsung" }),
  createBrandServicePage({ slug: "remont-lg", brand: "LG" }),
  createBrandServicePage({ slug: "remont-indesit", brand: "Indesit" }),
  createBrandServicePage({ slug: "remont-bosch", brand: "Bosch" }),
  createBrandServicePage({ slug: "remont-liebherr", brand: "Liebherr" }),
  createBrandServicePage({ slug: "remont-beko", brand: "Beko" }),
  createBrandServicePage({ slug: "remont-haier", brand: "Haier" }),
  createBrandServicePage({ slug: "remont-stinol", brand: "Stinol" }),
  createBrandServicePage({ slug: "remont-gorenje", brand: "Gorenje" }),
  createBrandServicePage({ slug: "remont-electrolux", brand: "Electrolux" }),
  createBrandServicePage({ slug: "remont-whirlpool", brand: "Whirlpool" }),
  createBrandServicePage({ slug: "remont-zanussi", brand: "Zanussi" }),
  createBrandServicePage({ slug: "remont-candy", brand: "Candy" }),
  createBrandServicePage({ slug: "remont-vestfrost", brand: "Vestfrost" }),
  createBrandServicePage({ slug: "remont-shivaki", brand: "Shivaki" }),
  createBrandServicePage({ slug: "remont-nord", brand: "Nord" }),
  createBrandServicePage({ slug: "remont-snaige", brand: "Snaige" }),
  createBrandServicePage({ slug: "remont-daewoo", brand: "Daewoo" }),
  createBrandServicePage({ slug: "remont-midea", brand: "Midea" }),
];
