const phoneDisplay = "+7 (999) 123-45-67";
const phoneHref = "tel:+79991234567";

const services = [
  {
    title: "Не морозит",
    description: "Проверим компрессор, датчики, термостат и систему циркуляции хладагента.",
    price: "от 1 200 ₽",
  },
  {
    title: "Течёт вода",
    description: "Прочистим дренаж, устраним наледь, восстановим герметичность узлов.",
    price: "от 900 ₽",
  },
  {
    title: "Шумит и вибрирует",
    description: "Найдём источник шума, закрепим детали, проверим вентилятор и мотор.",
    price: "от 1 000 ₽",
  },
  {
    title: "Замена деталей",
    description: "Поставим реле, датчики, уплотнитель, вентилятор или компрессор с гарантией.",
    price: "от 1 500 ₽",
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
  image: "https://holodos.ru/opengraph-image.svg",
  url: "https://holodos.ru/",
  telephone: phoneDisplay,
  priceRange: "₽₽",
  description:
    "Ремонт холодильников на дому: срочный выезд мастера, диагностика, замена деталей и гарантия.",
  areaServed: "Россия",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
      priceCurrency: "RUB",
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
        <a className="logo" href="#top" aria-label="Холодос — на главную">
          <span className="logo__icon">❄</span>
          <span>Холодос</span>
        </a>
        <nav className="site-nav" aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#process">Как работаем</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <a className="header-phone" href={phoneHref}>
          {phoneDisplay}
        </a>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow">Ремонт холодильников на дому</p>
            <h1 id="hero-title">Вернём холод без лишней суеты</h1>
            <p className="hero__lead">
              Срочно починим холодильник, морозильную камеру или винный шкаф. Мастер приедет
              с инструментами и популярными деталями, аккуратно проведёт диагностику и сразу
              предложит понятную смету.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href={phoneHref}>
                Позвонить мастеру
              </a>
              <a className="button button--secondary" href="#services">
                Смотреть услуги
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
            <div className="fridge-illustration" aria-hidden="true">
              <div className="fridge-illustration__body">
                <span className="fridge-illustration__snow">✦</span>
                <span className="fridge-illustration__line" />
                <span className="fridge-illustration__handle" />
              </div>
              <div className="fridge-illustration__tool">✓</div>
            </div>
            <h2>Диагностика перед ремонтом</h2>
            <p>Сначала находим причину поломки, затем согласуем цену и только после этого ремонтируем.</p>
            <a className="hero-card__link" href={phoneHref}>
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

        <section className="section-shell services" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Что ремонтируем</p>
            <h2 id="services-title">Популярные поломки холодильников</h2>
            <p>Показываем ориентиры по цене заранее, чтобы вам было проще принять решение.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-card__icon">✺</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <strong>{service.price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell process" id="process" aria-labelledby="process-title">
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
            <h2 id="cta-title">Опишите симптомы — подскажем ближайшее время выезда</h2>
          </div>
          <a className="button button--light" href={phoneHref}>
            {phoneDisplay}
          </a>
        </section>

        <section className="section-shell faq" id="faq" aria-labelledby="faq-title">
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
          <p>Ремонт холодильников на дому. Работаем ежедневно с 08:00 до 22:00.</p>
        </div>
        <a href={phoneHref}>{phoneDisplay}</a>
      </footer>
    </>
  );
}
