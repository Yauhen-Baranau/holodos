import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "../service-detail-page";
import { getServiceHref, getServicePage, siteName } from "../site-data";

const page = getServicePage("about");

const masters = [
  {
    name: "Алексей Иванов",
    description:
      "Мастер по диагностике и ремонту бытовых холодильников. Быстро определяет причину поломки и объясняет клиенту каждый этап работ.",
  },
  {
    name: "Сергей Петров",
    description:
      "Специализируется на системах No Frost, замене компрессоров и восстановлении стабильного охлаждения после сложных неисправностей.",
  },
  {
    name: "Дмитрий Соколов",
    description:
      "Аккуратно выполняет ремонт на дому, замену уплотнителей, термостатов и настройку холодильников после обслуживания.",
  },
];

export function generateMetadata(): Metadata {
  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: getServiceHref(page) },
    openGraph: {
      title: `${page.title} — ${siteName}`,
      description: page.description,
      url: getServiceHref(page),
      type: "website",
      images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: `${page.title} — ${siteName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} — ${siteName}`,
      description: page.description,
      images: ["/opengraph-image.svg"],
    },
  };
}

function MastersSection() {
  return (
    <section
      className="section-shell masters"
      aria-labelledby="masters-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Наша команда</p>
        <h2 id="masters-title">Наши мастера</h2>
        <p>
          В заявках работают опытные специалисты мастерской: каждый мастер
          проводит диагностику, согласует стоимость и аккуратно выполняет
          ремонт на дому.
        </p>
      </div>
      <div className="masters-grid">
        {masters.map((master, index) => (
          <article className="master-card" key={master.name}>
            <div
              className="master-card__photo"
              aria-label={`Место для фото мастера ${master.name}`}
            >
              <span>Фото</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </div>
            <div className="master-card__content">
              <h3>{master.name}</h3>
              <p>{master.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  if (!page) {
    return notFound();
  }

  return <ServiceDetailPage page={page}
  //  extraSections={<MastersSection />} 
   />;
}
