import type { ReactNode } from "react";
import Link from "next/link";
import { ServiceNavigation } from "./service-navigation";
import { SiteSearch } from "./search";
import {
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
import {
  JsonLd,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createServiceJsonLd,
  createWebSiteJsonLd,
} from "./json-ld";

type ServiceDetailPageProps = {
  page: ServicePage;
  extraSections?: ReactNode;
  isRegion?: boolean
};

export function ServiceDetailPage({ page, extraSections, isRegion }: ServiceDetailPageProps) {
  const cluster = getServiceClusterForPage(page);
  const canonicalUrl = `${siteUrl}${getServiceHref(page)}`;
  const serviceJsonLd = createServiceJsonLd(page, canonicalUrl);
  const webSiteJsonLd = createWebSiteJsonLd();
  const faqJsonLd = createFaqJsonLd(page.faq);

  const breadcrumbItems = [
    {
      name: "Главная",
      item: `${siteUrl}/`,
    },
    ...(cluster
      ? [
        {
          name: cluster.menuTitle,
          item: `${siteUrl}/${cluster.slug}/`,
        },
      ]
      : []),
    {
      name: page.title,
      item: canonicalUrl,
    },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbItems);

  return (
    <>
      <JsonLd data={webSiteJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <header className="site-header">
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
