import Link from "next/link";
import { ServiceNavigation } from "./service-navigation";
import { SiteSearch } from "./search";
import { HeroFridgeIllustration } from "./vector-art";
import {
  businessServicePages,
  getServiceHref,
  phoneDisplay,
  phoneHref,
  problemPages,
  repairServicePages,
  siteSearchItems,
  siteUrl,
} from "./site-data";

const ignoredSlugs = ["O-nas", "masterskaya"];
const homeServicePages = [
  ...repairServicePages.filter(
    (service) => !ignoredSlugs.includes(service.slug),
  )];
const homeProblemPages = problemPages;
const homeBusinessPages = businessServicePages;

const services = [
  {
    title: "Не морозит",
    description:
      "Проверим компрессор, датчики, термостат и систему циркуляции хладагента.",
    price: "от 60 руб.",
  },
  {
    title: "Течёт вода",
    description:
      "Прочистим дренаж, устраним наледь, восстановим герметичность узлов.",
    price: "от 45 руб.",
  },
  {
    title: "Шумит и вибрирует",
    description:
      "Найдём источник шума, закрепим детали, проверим вентилятор и мотор.",
    price: "от 50 руб.",
  },
  {
    title: "Замена деталей",
    description:
      "Поставим реле, датчики, уплотнитель, вентилятор или компрессор с гарантией.",
    price: "от 80 руб.",
  },
];

const benefits = [
  "Выезд мастера в день обращения",
  "Диагностика входит в стоимость ремонта",
  "Гарантия до 12 месяцев на работы и детали",
  "Аккуратная работа на дому без вывоза техники",
];

const steps = [
  "Оставляете заявку или звоните",
  "Мастер уточняет симптомы и время визита",
  "Проводим диагностику и согласуем цену",
  "Ремонтируем холодильник и выдаём гарантию",
];

const faq = [
  {
    question: "Сколько стоит диагностика холодильника?",
    answer:
      "При последующем ремонте диагностика входит в стоимость. Если ремонт не нужен, мастер заранее озвучит фиксированную цену выезда.",
  },
  {
    question: "Можно ли отремонтировать холодильник в день обращения?",
    answer:
      "Да, в большинстве случаев мастер приезжает в день заявки и выполняет ремонт на месте, так как основные детали есть с собой.",
  },
  {
    question: "Какие бренды вы обслуживаете?",
    answer:
      "Работаем с Atlant, Bosch, Samsung, LG, Indesit, Liebherr, Beko, Haier, Stinol и другими популярными марками.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Холодос",
  image: `${siteUrl}/opengraph-image.svg`,
  url: `${siteUrl}`,
  telephone: phoneDisplay,
  priceRange: "BYN",
  description:
    "Ремонт холодильников на дому: срочный выезд мастера, диагностика, замена деталей и гарантия.",
  areaServed: "Минск",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    name: service.title,
    description: service.description,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "BYN",
      description: service.price,
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="site-header">
        <Link className="logo" title="На главную" href="/" aria-label="Холодос — на главную">
          <span className="logo__icon">❄</span>
          <span>Холодос</span>
        </Link>
        <ServiceNavigation />
        <a className="header-phone" title="Позвонить мастеру" href={phoneHref}>
          {phoneDisplay}
        </a>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow">Бесплатный выезд по Минску от 30 мин</p>
            <h1 id="hero-title">Ремонт холодильников в Минске</h1>
            <p className="hero__lead">
              Срочно починим холодильник, морозильную камеру или винный шкаф.
              Мастер приедет с инструментами и популярными деталями, аккуратно
              проведёт диагностику и сразу предложит понятную смету.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" title="Позвонить мастеру" href={phoneHref}>
                Позвонить мастеру
              </a>
              <a className="button button--secondary" title="Смотреть услуги" href="/services/">
                Смотреть услуги
              </a>
              <a className="button button--secondary" title="Ремонт холодильников в Минской области" href="/minskaya-oblast">
                Ремонт холодильников в Минской области
              </a>
            </div>
            <ul className="hero__facts" aria-label="Преимущества сервиса">
              <li>
                <strong>30–90 мин</strong>
                <span>среднее время выезда</span>
              </li>
              <li>
                <strong>12 мес.</strong>
                <span>гарантия на работы</span>
              </li>
              <li>
                <strong>08:00–22:00</strong>
                <span>принимаем заявки ежедневно</span>
              </li>
            </ul>
          </div>

          <div className="hero-card" aria-label="Карточка вызова мастера">
            <div className="hero-card__badge">Сегодня есть окна</div>
            <HeroFridgeIllustration />
            <h2>Диагностика перед ремонтом</h2>
            <p>
              Сначала находим причину поломки, затем согласуем цену и только
              после этого ремонтируем.
            </p>
            <a title="Вызвать мастера" className="hero-card__link" href={phoneHref}>
              Вызвать мастера →
            </a>
          </div>
        </section>

        <section className="trust-strip" aria-label="Ключевые гарантии">
          {benefits.map((benefit) => (
            <div className="trust-strip__item" key={benefit}>
              <span>✓</span>
              {benefit}
            </div>
          ))}
        </section>

        <section
          className="section-shell services"
          id="problems"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Что ремонтируем</p>
            <h2 id="services-title">Популярные поломки холодильников</h2>
            <p>
              Показываем ориентиры по цене заранее, чтобы вам было проще принять
              решение.
            </p>
          </div>
          <div className="service-grid">
            {homeProblemPages.map((problem, key) => (
              <Link
                className="related-card"
                href={getServiceHref(problem)}
                key={key}
                title={problem.menuTitle}
              >
                <div className="service-card__icon" aria-hidden="true">✺</div>
                <h3 className="titleProblem">{problem.menuTitle}</h3>
                <ul className="problrms_list">
                  {problem.symptoms.map((symptom) => (
                    <li key={symptom}>{symptom}</li>
                  ))}
                </ul>
                <strong>{problem.price}</strong>
              </Link>
            ))}
          </div>
        </section>
        

        <SiteSearch items={siteSearchItems} />

        <section
          className="section-shell related-services"
          aria-labelledby="all-services-title"
          id="services"
        >
          <div className="section-heading">
            <p className="eyebrow">Услуги</p>
            <h2 id="all-services-title">Работы и сервисные направления</h2>
          </div>
          <div className="related-grid related-grid--wide">
            {homeServicePages.map((service) => (
              <Link
                className="related-card"
                href={getServiceHref(service)}
                key={service.slug}
                title={service.menuTitle}
              >
                <span>{service.menuTitle}</span>
                <strong>{service.price}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="section-shell related-services"
          id="business"
          aria-labelledby="business-services-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Для организаций</p>
            <h2 id="business-services-title">
              Ремонт и обслуживание по безналичному расчету
            </h2>
            <p>
              Отдельное направление для юридических лиц, офисов, магазинов и
              организаций: диагностика, ремонт, обслуживание, гарантия и
              документы для оплаты по безналу.
            </p>
          </div>
          <div className="related-grid related-grid--wide">
            {homeBusinessPages.map((service) => (
              <Link
                className="related-card"
                href={getServiceHref(service)}
                key={service.slug}
                title={service.menuTitle}
              >
                <span>{service.menuTitle}</span>
                <strong>{service.price}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="section-shell process"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Прозрачный процесс</p>
            <h2 id="process-title">Как проходит ремонт</h2>
          </div>
          <ol className="process-list">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section-shell cta" aria-labelledby="cta-title">
          <div>
            <p className="eyebrow">Нужна помощь сейчас?</p>
            <h2 id="cta-title">
              Опишите симптомы — подскажем ближайшее время выезда
            </h2>
          </div>
          <a title="Вызвать мастера" className="button button--light" href={phoneHref}>
            {phoneDisplay}
          </a>
        </section>

        <section
          className="section-shell faq"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Частые вопросы</h2>
          </div>
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Холодос</strong>
          <p>
            Ремонт холодильников на дому. Работаем ежедневно с 08:00 до 22:00.
          </p>
        </div>
        <a title="телефон мастерской" href={phoneHref}>{phoneDisplay}</a>
      </footer>
    </>
  );
}
