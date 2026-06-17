import type { Metadata } from "next";
import Link from "next/link";
import { blogArticles, getBlogHref } from "../_data/blog";
import { ServiceNavigation } from "../service-navigation";
import { phoneDisplay, phoneHref, siteName, siteUrl } from "../site-data";
import { Footer } from "../footer";
import {
  JsonLd,
  createBreadcrumbJsonLd,
  createWebSiteJsonLd,
} from "../json-ld";

export const metadata: Metadata = {
  title: "Блог о ремонте и уходе за холодильниками — Холодос",
  description: "Полезные статьи о выборе, разморозке, запахах, фреоне, энергопотреблении и правильном уходе за холодильником.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Блог о ремонте и уходе за холодильниками — Холодос",
    description: "Советы мастеров Холодос по эксплуатации холодильников, профилактике поломок и выбору техники.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const webSiteJsonLd = createWebSiteJsonLd();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог Холодос",
    description: metadata.description,
    url: `${siteUrl}/blog/`,
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      url: `${siteUrl}${getBlogHref(article)}`,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
    })),
  };

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Главная", item: `${siteUrl}/` },
    { name: "Блог", item: `${siteUrl}/blog/` },
  ]);

  return (
    <>
      <JsonLd data={webSiteJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <header id="site-header" className="site-header" itemScope itemType="https://schema.org/WPHeader">
        <Link className="logo" href="/" title="на главную" aria-label="Холодос — на главную">
          <span className="logo__icon" aria-hidden="true" />
          <span className="logo__text">
            <span className="logo__name">{siteName}</span>
            <span className="logo__tagline">Ремонт холодильников</span>
          </span>
        </Link>
        <ServiceNavigation />
        <a title="Позвонить мастеру" className="header-phone" href={phoneHref}>{phoneDisplay}</a>
      </header>
      <main>
        <section className="inner-hero section-shell" aria-labelledby="blog-title">
          <div className="inner-hero__content">
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link title="на главную" href="/">Главная</Link>
              <span>/</span>
              <span aria-current="page">Блог</span>
            </nav>
            <p className="eyebrow">Полезные статьи</p>
            <h1 id="blog-title">Блог о холодильниках</h1>
            <p className="hero__lead">Собрали практичные материалы по выбору, уходу, разморозке и типовым проблемам холодильников. Пишем простым языком и добавляем подсказки от мастеров.</p>
          </div>
          <aside className="service-summary" aria-label="О блоге">
            <span className="service-summary__badge">Советы мастеров</span>
            <dl>
              <div><dt>Статей</dt><dd>{blogArticles.length}</dd></div>
              <div><dt>Темы</dt><dd>Уход и ремонт</dd></div>
              <div><dt>Формат</dt><dd>Практика</dd></div>
            </dl>
          </aside>
        </section>
        <section className="section-shell blog-list" aria-labelledby="blog-list-title">
          <div className="section-heading">
            <p className="eyebrow">Материалы</p>
            <h2 id="blog-list-title">Последние статьи</h2>
          </div>
          <ul className="blog-grid">
            {blogArticles.map((article) => (
              <li key={article.slug}>
                <Link className="blog-card" href={getBlogHref(article)} title={article.title}>
                  <h3>{article.menuTitle}</h3>
                  <p>{article.excerpt}</p>
                  <span className="blog-card__tags">{article.tags.join(" • ")}</span>
                  <strong>Читать статью →</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />    
      </>
  );
}
