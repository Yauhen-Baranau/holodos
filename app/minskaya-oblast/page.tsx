import type { Metadata } from "next";
import Link from "next/link";
import {
  address,
  email,
  minskRegionClusterPage,
  minskRegionServicePages,
  phoneDisplay,
  phoneHref,
  siteName,
  siteUrl,
} from "../site-data";

const canonicalUrl = `${siteUrl}/${minskRegionClusterPage.slug}`;

export const metadata: Metadata = {
  title: minskRegionClusterPage.title,
  description: minskRegionClusterPage.description,
  alternates: {
    canonical: `/${minskRegionClusterPage.slug}`,
  },
  openGraph: {
    title: `${minskRegionClusterPage.title} — ${siteName}`,
    description: minskRegionClusterPage.description,
    url: `/${minskRegionClusterPage.slug}`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: `${minskRegionClusterPage.title} — ${siteName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${minskRegionClusterPage.title} — ${siteName}`,
    description: minskRegionClusterPage.description,
    images: ["/opengraph-image.svg"],
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: minskRegionClusterPage.title,
  description: minskRegionClusterPage.description,
  url: canonicalUrl,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: minskRegionServicePages.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.menuTitle,
      url: `${siteUrl}/${service.slug}/`,
    })),
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: minskRegionClusterPage.title,
  description: minskRegionClusterPage.description,
  provider: {
    "@type": "LocalBusiness",
    name: siteName,
    telephone: phoneDisplay,
    email,
    address,
    url: siteUrl,
  },
  areaServed: "Минская область",
  offers: {
    "@type": "Offer",
    priceCurrency: "BYN",
    description: minskRegionClusterPage.price,
    availability: "https://schema.org/InStock",
    url: canonicalUrl,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: minskRegionClusterPage.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function MinskRegionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="site-header">
        <Link className="logo" title="На главную" href="/" aria-label="Холодос — на главную">
          <span className="logo__icon">❄</span>
          <span>{siteName}</span>
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <Link title="Услуги" href="/#services">Услуги</Link>
          <Link title="Мастерская" href="/masterskaya/">Мастерская</Link>
          <Link title="Безнал" href="/remont-po-beznalichnomu-raschetu/">Безнал</Link>
          <Link title="О нас" href="/O-nas/">О нас</Link>
        </nav>
        <a className="header-phone" title="Позвонить мастеру" href={phoneHref}>
          {phoneDisplay}
        </a>
      </header>

      <main>
        <section
          className="inner-hero section-shell"
          aria-labelledby="region-title"
        >
          <div className="inner-hero__content">
            <div className="breadcrumbs" aria-label="Хлебные крошки">
              <Link title="На главную" href="/">Главная</Link>
              <span>/</span>
              <span>{minskRegionClusterPage.menuTitle}</span>
            </div>
            <p className="eyebrow">{minskRegionClusterPage.eyebrow}</p>
            <h1 id="region-title">{minskRegionClusterPage.menuTitle}</h1>
            <p className="hero__lead">{minskRegionClusterPage.lead}</p>
            <div className="hero__actions">
              <a className="button button--primary" title="Вызвать мастера" href={phoneHref}>
                Вызвать мастера
              </a>
              <a className="button button--secondary" title="Смотреть города" href="#cities">
                Выбрать населенный пункт
              </a>
            </div>
          </div>

          <aside className="service-summary" aria-label="Кратко о выезде">
            <span className="service-summary__badge">
              {minskRegionClusterPage.badge}
            </span>
            <dl>
              <div>
                <dt>Цена</dt>
                <dd>{minskRegionClusterPage.price}</dd>
              </div>
              <div>
                <dt>Срок</dt>
                <dd>{minskRegionClusterPage.duration}</dd>
              </div>
              <div>
                <dt>Регион</dt>
                <dd>Минская область</dd>
              </div>
            </dl>
            <a className="service-summary__phone" title="Позвонить мастеру" href={phoneHref}>
              {phoneDisplay}
            </a>
          </aside>
        </section>

        <section
          className="section-shell symptoms"
          aria-labelledby="region-symptoms-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Когда обращаться</p>
            <h2 id="region-symptoms-title">
              Выезжаем при любых типовых поломках
            </h2>
          </div>
          <div className="symptoms__grid">
            {minskRegionClusterPage.symptoms.map((symptom) => (
              <div className="symptom-card" key={symptom}>
                <span>✓</span>
                {symptom}
              </div>
            ))}
          </div>
        </section>

        <section
          className="section-shell related-services"
          id="cities"
          aria-labelledby="region-cities-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Города и поселки</p>
            <h2 id="region-cities-title">
              Страницы ремонта холодильников по Минской области
            </h2>
            <p>
              Выберите населенный пункт — на отдельной странице указаны условия
              выезда мастера, типовые неисправности и ориентиры по ремонту.
            </p>
          </div>
          <div className="related-grid related-grid--wide">
            {minskRegionServicePages.map((service) => (
              <Link
                className="related-card"
                href={`/${service.slug}/`}
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
          className="section-shell service-details"
          aria-labelledby="region-details-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Подробности</p>
            <h2 id="region-details-title">Что входит в выезд по области</h2>
          </div>
          <div className="details-grid">
            {minskRegionClusterPage.sections.map((section) => (
              <article className="detail-card" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section
          className="section-shell process"
          aria-labelledby="region-process-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Как работаем</p>
            <h2 id="region-process-title">Выезд без лишнего вывоза техники</h2>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <p>Уточняем населенный пункт, модель холодильника и симптомы.</p>
            </li>
            <li>
              <span>02</span>
              <p>Согласуем ориентир по времени приезда мастера.</p>
            </li>
            <li>
              <span>03</span>
              <p>Проводим диагностику на дому и называем точную стоимость.</p>
            </li>
            <li>
              <span>04</span>
              <p>Ремонтируем холодильник, проверяем холод и выдаем гарантию.</p>
            </li>
          </ol>
        </section>

        <section
          className="section-shell faq"
          id="faq"
          aria-labelledby="region-faq-title"
        >
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2 id="region-faq-title">Частые вопросы</h2>
          </div>
          <div className="faq-list">
            {minskRegionClusterPage.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="section-shell cta"
          aria-labelledby="region-cta-title"
        >
          <div>
            <p className="eyebrow">Оставьте заявку</p>
            <h2 id="region-cta-title">
              Позвоните — подскажем ближайшее время выезда по области
            </h2>
          </div>
          <a className="button button--light" title="Позвонить мастеру" href={phoneHref}>
            {phoneDisplay}
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>{siteName}</strong>
          <p>
            {address}. Работаем ежедневно, ремонтируем холодильники и
            морозильные камеры на дому.
          </p>
        </div>
        <a title="Написать на email" href={`mailto:${email}`}>{email}</a>
      </footer>
    </>
  );
}
