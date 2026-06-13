import Link from "next/link";
import { SiteSearch } from "./search";
import { ServiceNavigation } from "./service-navigation";
import {
  email,
  getServiceHref,
  phoneDisplay,
  phoneHref,
  siteName,
  siteSearchItems,
} from "./site-data";
import type { ServicePage } from "./_data/site";

type Cluster = {
  slug: string;
  title: string;
  menuTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  pages: readonly ServicePage[];
};

export function ServiceClusterPage({ cluster }: { cluster: Cluster }) {
  return (
    <>
      <header className="site-header">
        <Link className="logo" href="/" title="на главную" aria-label="Холодос — на главную">
          <span className="logo__icon">❄</span>
          <span>{siteName}</span>
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
          </div>
        </section>
        <SiteSearch items={siteSearchItems} />
        <section className="section-shell related-services" aria-labelledby="cluster-services-title">
          <div className="section-heading">
            <p className="eyebrow">Раздел</p>
            <h2 id="cluster-services-title">{cluster.menuTitle}</h2>
            <p>{cluster.description}</p>
          </div>
          <div className="related-grid related-grid--wide">
            {cluster.pages.map((service) => (
              <Link className="related-card" href={getServiceHref(service)} key={service.slug} title={service.menuTitle}>
                <span>{service.menuTitle}</span>
                <strong>{service.price}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer"><strong>{siteName}</strong><a title="Написать на email" href={`mailto:${email}`}>{email}</a></footer>
    </>
  );
}
