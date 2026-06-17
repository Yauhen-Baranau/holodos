import type { ReactNode } from "react";
import Link from "next/link";
import { ServiceNavigation } from "./service-navigation";
import { SiteSearch } from "./search";
import {
  address,
  email,
  getServiceClusterForPage,
  getServiceHref,
  phoneDisplay,
  phoneHref,
  popularServices,
  siteName,
  siteSearchItems,
  siteUrl,
} from "./site-data";
import type { ServicePage } from "./_data/site";
import { Footer } from "./footer";

type ServiceDetailPageProps = {
  page: ServicePage;
  extraSections?: ReactNode;
  isRegion?: boolean
};

export function ServiceDetailPage({ page, extraSections, isRegion }: ServiceDetailPageProps) {
  const cluster = getServiceClusterForPage(page);
  const canonicalUrl = `${siteUrl}${getServiceHref(page)}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: page.title,
    description: page.description,
    telephone: "+375336443401",
    priceRange: "BYN",
    image: `${siteUrl}/opengraph-image.svg`,
    provider: {
      "@type": "LocalBusiness",
      name: siteName,
      telephone: phoneDisplay,
      email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Домбровская, 9",
      addressLocality: "Минск",
      addressRegion: "Минская область",
      postalCode: "220036",
      addressCountry: "BY",
    },
      url: siteUrl,
    },
    serviceType: page.menuTitle,
    areaServed: ["Минск", "Минская область"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Домбровская, 9",
      addressLocality: "Минск",
      addressRegion: "Минская область",
      postalCode: "220036",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9113,
      longitude: 27.4543,
    },
    sameAs: [
      "https://maps.app.goo.gl/u8A1kU34rUbR9ayv6",
      "https://yandex.by/maps/-/CPxdnI3F",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
   
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: `${siteUrl}/`,
    },
    ...(cluster
      ? [
        {
          "@type": "ListItem",
          position: 2,
          name: cluster.menuTitle,
          item: `${siteUrl}/${cluster.slug}/`,
        },
      ]
      : []),
    {
      "@type": "ListItem",
      position: cluster ? 3 : 2,
      name: page.title,
      item: canonicalUrl,
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header id="site-header" className="site-header" itemScope itemType="https://schema.org/WPHeader">
        <Link className="logo" href="/" title="на главную" aria-label="Холодос — на главную">
          <span className="logo__icon" aria-hidden="true" />
          <span className="logo__text">
            <span className="logo__name">{siteName}</span>
            <span className="logo__tagline">Ремонт холодильников</span>
          </span>
        </Link>
        <ServiceNavigation />
        <a title="Позвонить мастеру" className="header-phone" href={phoneHref}>
          {phoneDisplay}
        </a>
      </header>

      <main>
        <section
          className="inner-hero section-shell"
          aria-labelledby="service-title"
        >
          <div className="inner-hero__content">
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link title="на главную" href="/">Главная</Link>
              <span>/</span>
              {cluster ? (
                <>
                  <Link title={cluster.menuTitle} href={`/${cluster.slug}/`}>
                    {cluster.menuTitle}
                  </Link>
                  <span>/</span>
                </>
              ) : null}
              <span aria-current="page">{page.menuTitle}</span>
            </nav>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 id="service-title">{page.menuTitle}</h1>
            <p className="hero__lead">{page.lead}</p>
            <div className="hero__actions">
              <a title="Вызвать мастера" className="button button--primary" href={phoneHref}>
                Вызвать мастера
              </a>
              <a title="Подробнее" className="button button--secondary" href="#details">
                Подробнее об услуге
              </a>
            </div>
          </div>

          <aside className="service-summary" aria-label="Кратко об услуге">
            <span className="service-summary__badge">{isRegion ? "Минская область" : page.badge}</span>
            <dl>
              <div>
                <dt>Цена</dt>
                <dd>{page.price}</dd>
              </div>
              <div>
                <dt>Срок</dt>
                <dd>{page.duration}</dd>
              </div>
              <div>
                <dt>{isRegion ? "Населенный пункт" : "Город"}</dt>
                <dd>{isRegion ? page.badge : "Минск"}</dd>
              </div>
            </dl>
            <a title="Позвонить мастеру" className="service-summary__phone" href={phoneHref}>
              {phoneDisplay}
            </a>
          </aside>
        </section>
        {extraSections}
        <section
          className="section-shell service-details"
          id="details"
          aria-labelledby="details-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Подробности</p>
            <h2 id="details-title">Что входит в работу</h2>
          </div>
          <div className="details-grid">
            {page.sections.map((section) => (
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
          className="section-shell symptoms"
          aria-labelledby="symptoms-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Когда обращаться</p>
            <h2 id="symptoms-title">Основные симптомы</h2>
          </div>
          <div className="symptoms__grid">
            {page.symptoms.map((symptom) => (
              <div className="symptom-card" key={symptom}>
                <span>✓</span>
                {symptom}
              </div>
            ))}
          </div>
        </section>
        <section
          className="section-shell process"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Как работаем</p>
            <h2 id="process-title">Понятный процесс без навязанных услуг</h2>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <p>Принимаем заявку и уточняем симптомы поломки.</p>
            </li>
            <li>
              <span>02</span>
              <p>Мастер приезжает на дом в согласованное время.</p>
            </li>
            <li>
              <span>03</span>
              <p>Проводим диагностику и называем точную стоимость.</p>
            </li>
            <li>
              <span>04</span>
              <p>Ремонтируем, проверяем технику и выдаём гарантию.</p>
            </li>
          </ol>
        </section>

        <section
          className="section-shell related-services"
          aria-labelledby="related-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Другие услуги</p>
            <h2 id="related-title">Популярные направления ремонта</h2>
          </div>
          <nav aria-label="Популярные направления ремонта">
            <ul className="related-grid">
              {popularServices
                .filter((service) => service.slug !== page.slug)
                .slice(0, 6)
                .map((service) => (
                  <li key={service.slug}>
                    <Link
                      title={service.menuTitle}
                      className="related-card"
                      href={getServiceHref(service)}
                    >
                      <span>{service.menuTitle}</span>
                      <strong>{service.price}</strong>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </section>
        <SiteSearch items={siteSearchItems} />

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
            {page.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section-shell cta" aria-labelledby="cta-title">
          <div>
            <p className="eyebrow">Оставьте заявку</p>
            <h2 id="cta-title">
              Позвоните — подскажем ближайшее время выезда мастера
            </h2>
          </div>
          <a title="Позвонить мастеру" className="button button--light" href={phoneHref}>
            {phoneDisplay}
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
