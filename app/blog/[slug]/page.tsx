import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../header";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticle, getBlogHref } from "../../_data/blog";
import { phoneDisplay, phoneHref, siteName, siteUrl } from "../../site-data";
import { Footer } from "../../footer";
import {
  JsonLd,
  createJsonLdGraph,
  createBreadcrumbJsonLd,
} from "../../json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} — Холодос`,
    description: article.description,
    alternates: { canonical: getBlogHref(article) },
    openGraph: {
      title: `${article.title} — ${siteName}`,
      description: article.description,
      url: getBlogHref(article),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — ${siteName}`,
      description: article.description,
      images: ["/opengraph-image.svg"],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName },
    mainEntityOfPage: `${siteUrl}${getBlogHref(article)}`,
  };

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Главная", item: `${siteUrl}/` },
    { name: "Блог", item: `${siteUrl}/blog/` },
    { name: article.menuTitle, item: `${siteUrl}${getBlogHref(article)}` },
  ]);

  const articleJsonLdGraph = createJsonLdGraph([articleJsonLd, breadcrumbJsonLd]);

  const relatedArticles = blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLdGraph} />
      <Header />
      <main>
        <article className="section-shell blog-article">
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link title="на главную" href="/">Главная</Link>
            <span>/</span>
            <Link title="Блог" href="/blog/">Блог</Link>
            <span>/</span>
            <span aria-current="page">{article.menuTitle}</span>
          </nav>
          <header className="blog-article__header">
            <p className="eyebrow">Блог Холодос</p>
            <h1>{article.title}</h1>
            <p className="hero__lead">{article.excerpt}</p>
            <div className="blog-article__meta">
              <span>{new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(article.publishedAt))}</span>
              <span>{article.tags.join(" • ")}</span>
            </div>
          </header>
          <div className="blog-article__content">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                {section.steps ? <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol> : null}
              </section>
            ))}
          </div>
        </article>
        <section className="section-shell cta" aria-labelledby="blog-cta-title">
          <div>
            <p className="eyebrow">Нужна диагностика?</p>
            <h2 id="blog-cta-title">Если холодильник работает нестабильно, лучше проверить его до серьезной поломки</h2>
          </div>
          <a title="Позвонить мастеру" className="button button--light" href={phoneHref}>{phoneDisplay}</a>
        </section>
        <section className="section-shell related-services" aria-labelledby="related-blog-title">
          <div className="section-heading">
            <p className="eyebrow">Еще по теме</p>
            <h2 id="related-blog-title">Другие статьи блога</h2>
          </div>
          <ul className="related-grid">
            {relatedArticles.map((item) => (
              <li key={item.slug}>
                <Link className="related-card" href={getBlogHref(item)} title={item.title}>
                  <span>{item.menuTitle}</span>
                  <strong>{item.readTime}</strong>
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
