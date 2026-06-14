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
  { slug: "remont-atlant", brand: "Atlant", badge: "Atlant / Атлант", brandImage: "/br/atlant.webp" },
  { slug: "remont-samsung", brand: "Samsung", brandImage: "/br/samsung.webp" },
  { slug: "remont-lg", brand: "LG", brandImage: "/br/lg.webp" },
  { slug: "remont-indesit", brand: "Indesit", brandImage: "/br/indesid.webp" },
  { slug: "remont-bosch", brand: "Bosch", brandImage: "/br/bosh.webp" },
  { slug: "remont-liebherr", brand: "Liebherr", brandImage: "/br/leabher.webp" },
  { slug: "remont-beko", brand: "Beko", brandImage: "/br/beko.webp" },
  { slug: "remont-haier", brand: "Haier", brandImage: "/br/haier.webp" },
  { slug: "remont-stinol", brand: "Stinol", brandImage: "/br/stinol.webp" },
  { slug: "remont-gorenje", brand: "Gorenje", brandImage: "/br/gorenie.webp" },
  { slug: "remont-electrolux", brand: "Electrolux", brandImage: "/br/elec.webp" },
  { slug: "remont-whirlpool", brand: "Whirlpool", brandImage: "/br/wh.webp" },
  { slug: "remont-zanussi", brand: "Zanussi", brandImage: "/br/zan.webp" },
  { slug: "remont-candy", brand: "Candy", brandImage: "/br/candy.webp" },
  { slug: "remont-vestfrost", brand: "Vestfrost", brandImage: "/br/v.webp" },
  { slug: "remont-shivaki", brand: "Shivaki", brandImage: "/br/sh.webp" },
  { slug: "remont-nord", brand: "Nord", brandImage: "/br/nord.webp" },
  { slug: "remont-snaige", brand: "Snaige", brandImage: "/br/sn.webp" },
  { slug: "remont-daewoo", brand: "Daewoo", brandImage: "/br/de.webp" },
  { slug: "remont-midea", brand: "Midea", brandImage: "/br/media.webp" },
];

export const brandServicePages: ServicePage[] = brands.map(createBrandServicePage);
