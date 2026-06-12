import { phoneDisplay, type ServicePage } from "./site";

type RegionServicePageInput = {
  slug: string;
  location: string;
  prepositionalLocation: string;
  nearbyText?: string;
};

const minskRegionLocations = [
  "Боровляны",
  "Гатово",
  "Дзержинск",
  "Ждановичи",
  "Заславль",
  "Колодищи",
  "Мачулищи",
  "Озерце",
  "Ратомка",
  "Самохваловичи",
  "Сеница",
  "Сокол",
  "Тарасово",
  "Фаниполь",
  "Ярково",
];

function createRegionServicePage({
  slug,
  location,
  prepositionalLocation,
  nearbyText = "и рядом",
}: RegionServicePageInput): ServicePage {
  return {
    slug,
    title: `Ремонт холодильников ${prepositionalLocation} — выезд мастера`,
    menuTitle: `Ремонт холодильников ${prepositionalLocation}`,
    description: `Ремонт холодильников ${prepositionalLocation} ${nearbyText}: диагностика на дому, срочный выезд мастера, замена деталей, заправка фреоном и гарантия ☎️ ${phoneDisplay}`,
    eyebrow: "Минская область",
    lead: `Выезжаем на ремонт холодильников ${prepositionalLocation}: диагностируем поломку на дому, согласуем стоимость до начала работ и ремонтируем бытовые холодильники популярных брендов с гарантией.`,
    price: "от 50 руб.",
    duration: "от 60 минут",
    badge: location,
    symptoms: [
      "холодильник не морозит или плохо охлаждает",
      "появилась вода, лед или снежная шуба",
      "компрессор щелкает, гудит или не запускается",
      "холодильник пищит, мигает ошибками или выбивает автомат",
    ],
    sections: [
      {
        title: `Выезд мастера ${prepositionalLocation}`,
        body: `Мастер приезжает ${prepositionalLocation} с диагностическим инструментом и типовыми запчастями. Большинство неисправностей устраняем на месте без вывоза техники в мастерскую.`,
        bullets: [
          "диагностика перед ремонтом",
          "согласование цены до начала работ",
          "ремонт холодильной и морозильной камер",
          "гарантия на выполненные работы",
        ],
      },
      {
        title: "Какие работы выполняем",
        body: "Ремонтируем утечки и слабый холод, меняем компрессоры, реле, термостаты, датчики, вентиляторы, уплотнители и модули управления. Обслуживаем системы No Frost, устраняем протечки, наледь и проблемы с запуском.",
        bullets: [
          "заправка фреоном после устранения утечки",
          "ремонт No Frost и системы оттайки",
          "замена компрессора, реле и датчиков",
          "ремонт электроники и блока управления",
        ],
      },
    ],
    faq: [
      {
        question: `Сколько стоит ремонт холодильника ${prepositionalLocation}?`,
        answer:
          "Итоговая цена зависит от модели, неисправности и стоимости детали. Мастер сначала проводит диагностику, затем озвучивает точную смету и только после согласования начинает ремонт.",
      },
      {
        question: `Можно ли вызвать мастера ${prepositionalLocation} в день обращения?`,
        answer:
          "Да, при наличии свободного окна стараемся приехать в день заявки. Точное время выезда зависит от адреса, загрузки мастеров и сложности предварительно описанной поломки.",
      },
    ],
  };
}

export const minskRegionClusterPage: ServicePage = {
  slug: "remont-holodilnikov-minskaya-oblast",
  title: "Ремонт холодильников в Минской области — выезд мастера",
  menuTitle: "Ремонт холодильников в Минской области",
  description: `Ремонт холодильников в Минской области: выезд мастера на дом, диагностика, ремонт No Frost, замена компрессора, заправка фреоном и гарантия ☎️ ${phoneDisplay}`,
  eyebrow: "Региональный кластер",
  lead: "Выезжаем на ремонт холодильников по Минской области: приезжаем на дом, находим причину поломки, согласуем стоимость и выполняем ремонт с гарантией без лишнего вывоза техники.",
  price: "от 50 руб.",
  duration: "от 60 минут",
  badge: "Минская область",
  symptoms: [
    "холодильник не морозит или перемораживает",
    "течет вода или собирается лед",
    "не запускается компрессор",
    "мигают ошибки, холодильник пищит или выбивает автомат",
  ],
  sections: [
    {
      title: "География выезда",
      body: "Работаем с заявками из ближайших населенных пунктов Минской области и заранее согласуем удобное время приезда мастера.",
      bullets: minskRegionLocations,
    },
    {
      title: "Ремонт на дому с гарантией",
      body: "Мастер проверяет компрессор, реле, датчики, термостат, модуль управления, систему No Frost, дренаж и контур хладагента. После диагностики вы получаете понятную смету и гарантию на выполненные работы.",
      bullets: [
        "диагностика и ремонт на дому",
        "запчасти для популярных брендов",
        "заправка фреоном и поиск утечек",
        "обслуживание бытовых холодильников и морозильных камер",
      ],
    },
  ],
  faq: [
    {
      question: "В какие населенные пункты Минской области вы выезжаете?",
      answer:
        "Выезжаем в Боровляны, Гатово, Дзержинск, Ждановичи, Заславль, Колодищи, Мачулищи, Озерце, Ратомку, Самохваловичи, Сеницу, Сокол, Тарасово, Фаниполь, Ярково и ближайшие населенные пункты по согласованию.",
    },
    {
      question: "Цена ремонта в Минской области отличается от Минска?",
      answer:
        "Стоимость зависит от адреса, неисправности и деталей. Перед выездом уточняем населенный пункт и симптомы, а точную цену ремонта мастер называет после диагностики.",
    },
  ],
};

export const minskRegionServicePages: ServicePage[] = [
  createRegionServicePage({
    slug: "remont-holodilnikov-v-borovlyanah",
    location: "Боровляны",
    prepositionalLocation: "в Боровлянах",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-gatovo",
    location: "Гатово",
    prepositionalLocation: "в Гатово",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-dzerzhinske",
    location: "Дзержинск",
    prepositionalLocation: "в Дзержинске",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-zhdanovichah",
    location: "Ждановичи",
    prepositionalLocation: "в Ждановичах",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-zaslavle",
    location: "Заславль",
    prepositionalLocation: "в Заславле",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-kolodishchah",
    location: "Колодищи",
    prepositionalLocation: "в Колодищах",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-machulishchah",
    location: "Мачулищи",
    prepositionalLocation: "в Мачулищах",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-ozertse",
    location: "Озерце",
    prepositionalLocation: "в Озерце",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-ratomke",
    location: "Ратомка",
    prepositionalLocation: "в Ратомке",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-samohvalovichah",
    location: "Самохваловичи",
    prepositionalLocation: "в Самохваловичах",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-senitse",
    location: "Сеница",
    prepositionalLocation: "в Сенице",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-sokole",
    location: "Сокол",
    prepositionalLocation: "в Соколе",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-tarasovo",
    location: "Тарасово",
    prepositionalLocation: "в Тарасово",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-fanipole",
    location: "Фаниполь",
    prepositionalLocation: "в Фаниполе",
  }),
  createRegionServicePage({
    slug: "remont-holodilnikov-v-yarkovo",
    location: "Ярково",
    prepositionalLocation: "в Ярково",
  }),
];
