import { phoneDisplay, type ServicePage } from "./site";

type BrandServicePageInput = {
  slug: string;
  brand: string;
  badge?: string;
  brandImage?: string;
  note?: string;
};

function createBrandServicePage({
  slug,
  brand,
  badge = brand,
  brandImage,
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
    brandImage,
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

const brands: BrandServicePageInput[] = [
  { slug: "remont-atlant", brand: "Atlant", badge: "Atlant / Атлант", brandImage: "" },
  { slug: "remont-samsung", brand: "Samsung", brandImage: "" },
  { slug: "remont-lg", brand: "LG", brandImage: "" },
  { slug: "remont-indesit", brand: "Indesit", brandImage: "" },
  { slug: "remont-bosch", brand: "Bosch", brandImage: "" },
  { slug: "remont-liebherr", brand: "Liebherr", brandImage: "" },
  { slug: "remont-beko", brand: "Beko", brandImage: "" },
  { slug: "remont-haier", brand: "Haier", brandImage: "" },
  { slug: "remont-stinol", brand: "Stinol", brandImage: "" },
  { slug: "remont-gorenje", brand: "Gorenje", brandImage: "" },
  { slug: "remont-electrolux", brand: "Electrolux", brandImage: "" },
  { slug: "remont-whirlpool", brand: "Whirlpool", brandImage: "" },
  { slug: "remont-zanussi", brand: "Zanussi", brandImage: "" },
  { slug: "remont-candy", brand: "Candy", brandImage: "" },
  { slug: "remont-vestfrost", brand: "Vestfrost", brandImage: "" },
  { slug: "remont-shivaki", brand: "Shivaki", brandImage: "" },
  { slug: "remont-nord", brand: "Nord", brandImage: "" },
  { slug: "remont-snaige", brand: "Snaige", brandImage: "" },
  { slug: "remont-daewoo", brand: "Daewoo", brandImage: "" },
  { slug: "remont-midea", brand: "Midea", brandImage: "" },
];

export const brandServicePages: ServicePage[] = brands.map(createBrandServicePage);
