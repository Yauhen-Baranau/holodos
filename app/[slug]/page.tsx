import type { Metadata } from "next";
import Link from "next/link";
import { SiteSearch } from "../search";
import { notFound } from "next/navigation";
import {
  address,
  email,
  getServicePage,
  phoneDisplay,
  phoneHref,
  popularServices,
  servicePages,
  siteName,
  siteUrl,
} from "../site-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} — ${siteName}`,
      description: page.description,
      url: `/${page.slug}`,
      type: "website",
      images: [
        {
          url: "/opengraph-image.svg",
          width: 1200,
          height: 630,
          alt: `${page.title} — ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} — ${siteName}`,
      description: page.description,
      images: ["/opengraph-image.svg"],
    },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    return notFound();
  }

  const canonicalUrl = `${siteUrl}/${page.slug}/`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteName,
      telephone: phoneDisplay,
      email,
      address,
      url: siteUrl,
    },
    areaServed: "Минск",
    offers: {
      "@type": "Offer",
      priceCurrency: "BYN",
      description: page.price,
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
    },
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
        name: page.title,
        item: canonicalUrl,
      },
    ],
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

      <header className="site-header">
        <Link className="logo" href="/" title="на главную" aria-label="Холодос — на главную">
          <span className="logo__icon">❄</span>
          <span>{siteName}</span>
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <Link title="Услуги" href="/#services">Услуги</Link>
          <Link title="Мастерская" href="/masterskaya/">Мастерская</Link>
          <Link title="Безнал" href="/remont-po-beznalichnomu-raschetu/">Безнал</Link>
          <Link title="О нас" href="/O-nas/">О нас</Link>
        </nav>
        <a title={phoneHref} className="header-phone" href={phoneHref}>
          {phoneDisplay}
        </a>
      </header>

      <main>
        <section
          className="inner-hero section-shell"
          aria-labelledby="service-title"
        >
          <div className="inner-hero__content">
            <div className="breadcrumbs" aria-label="Хлебные крошки">
              <Link title="на главную" href="/">Главная</Link>
              <span>/</span>
              <span>{page.menuTitle}</span>
            </div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 id="service-title">{page.menuTitle}</h1>
            <p className="hero__lead">{page.lead}</p>
            <div className="hero__actions">
              <a title={phoneHref} className="button button--primary" href={phoneHref}>
                Вызвать мастера
              </a>
              <a title="Подробнее" className="button button--secondary" href="#details">
                Подробнее об услуге
              </a>
            </div>
          </div>

          <aside className="service-summary" aria-label="Кратко об услуге">
            <span className="service-summary__badge">{page.badge}</span>
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
                <dt>Город</dt>
                <dd>Минск</dd>
              </div>
            </dl>
            <a title={phoneHref} className="service-summary__phone" href={phoneHref}>
              {phoneDisplay}
            </a>
          </aside>
        </section>

        <SiteSearch pages={servicePages} />

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
          <div className="related-grid">
            {popularServices
              .filter((service) => service.slug !== page.slug)
              .slice(0, 6)
              .map((service) => (
                <Link
                  title={service.menuTitle}
                  className="related-card"
                  href={`/${service.slug}/`}
                  key={service.slug}
                >
                  <span>{service.menuTitle}</span>
                  <strong>{service.price}</strong>
                </Link>
              ))}
          </div>
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
          <a title={phoneHref} className="button button--light" href={phoneHref}>
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
        <a href={`mailto:${email}`}>{email}</a>
      </footer>
    </>
  );
}
