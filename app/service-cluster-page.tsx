import Link from "next/link";
import { SiteSearch } from "./search";
import { HeroFridgeIllustration } from "./vector-art";
import { ServiceNavigation } from "./service-navigation";
import {
  email,
  getServiceHref,
  phoneDisplay,
  phoneHref,
  siteName,
  siteSearchItems,
  siteUrl,
} from "./site-data";
import type { ServicePage } from "./_data/site";

type Cluster = {
  slug: string;
  title: string;
  menuTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  intro: string;
  highlights: readonly string[];
  pages: readonly ServicePage[];
};

export function ServiceClusterPage({ cluster }: { cluster: Cluster }) {
  const canonicalUrl = `${siteUrl}/${cluster.slug}/`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cluster.title,
    description: cluster.description,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cluster.pages.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.menuTitle,
        url: `${siteUrl}${getServiceHref(service)}`,
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cluster.menuTitle,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="site-header">
        <Link className="logo" href="/" title="на главную" aria-label="Холодос — на главную">
          <span className="logo__icon">❄</span>
          <span className="logo__text">
            <span className="logo__name">{siteName}</span>
            <span className="logo__tagline">Мастерская по ремонту холодильников</span>
          </span>
        </Link>
        <ServiceNavigation />
        <a title="Позвонить мастеру" className="header-phone" href={phoneHref}>{phoneDisplay}</a>
      </header>
      <main>
        <section className="inner-hero section-shell" aria-labelledby="cluster-title">
          <div className="inner-hero__content">
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link title="на главную" href="/">Главная</Link>
              <span>/</span>
              <span aria-current="page">{cluster.menuTitle}</span>
            </nav>
            <p className="eyebrow">{cluster.eyebrow}</p>
            <h1 id="cluster-title">{cluster.title}</h1>
            <p className="hero__lead">{cluster.lead}</p>
            <p>{cluster.intro}</p>
          </div>
          <div className="hero-card" aria-label={`Иллюстрация раздела ${cluster.menuTitle}`}>
            <HeroFridgeIllustration />
            <h2>{cluster.menuTitle}</h2>
            <ul className="hero-stats">
              {cluster.highlights.map((highlight) => (
                <li key={highlight}>
                  <strong>✓</strong>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="trust-strip" aria-label="Преимущества раздела">
          {cluster.highlights.map((highlight) => (
            <div className="trust-strip__item" key={highlight}>
              <span>✓</span>
              {highlight}
            </div>
          ))}
        </section>
        <SiteSearch items={siteSearchItems} />
        <section className="section-shell related-services" aria-labelledby="cluster-services-title">
          <div className="section-heading">
            <p className="eyebrow">Раздел</p>
            <h2 id="cluster-services-title">{cluster.menuTitle}</h2>
            <p>{cluster.description}</p>
          </div>
          <ul className="related-grid related-grid--wide">
            {cluster.pages.map((service) => (
              <li key={service.slug}>
                <Link className="related-card" href={getServiceHref(service)} title={service.menuTitle}>
                  {cluster.slug === "brands" ? (
                    <span className="brand-photo" aria-label={`Место для фото бренда ${service.menuTitle}`}>
                      {service.brandImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={service.brandImage} alt={service.menuTitle} title={service.menuTitle} />
                      ) : (
                        <span>Фото бренда</span>
                      )}
                    </span>
                  ) : null}
                  <span>{service.menuTitle}</span>
                  <strong>{service.price}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="site-footer"><strong>{siteName}</strong><a title="Написать на email" href={`mailto:${email}`}>{email}</a></footer>
    </>
  );
}
