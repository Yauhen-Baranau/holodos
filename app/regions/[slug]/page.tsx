import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ServiceDetailPage } from "../../service-detail-page";
import {
  baseRepairServicePages,
  getClusterServicePage,
  getServiceHref,
  problemPages,
  serviceClusters,
  siteName,
} from "../../site-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const cluster = serviceClusters.regions;

const priceListServices = baseRepairServicePages.filter(
  (service) => !["about", "masterskaya"].includes(service.slug),
);

const problemLinks = problemPages.slice(0, 8).map((problem) => ({
  ...problem,
  solution: problem.sections.find((section) => section.title === "Как устраняем неисправность")?.body ??
    "Проводим диагностику холодильника на дому, находим неисправный узел и согласуем ремонт до начала работ.",
}));

function RegionExtraSections({ page }: { page: NonNullable<ReturnType<typeof getClusterServicePage>> }) {
  const mapQuery = page.mapQuery ?? `${page.badge}, Минск`;
  const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY;
  const googleMapsEmbedSrc = googleMapsEmbedApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(googleMapsEmbedApiKey)}&q=${encodeURIComponent(mapQuery)}`
    : null;
  const googleMapsSearchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <>
      <section className="section-shell seo-text region-intro" aria-labelledby="region-intro-title">
        <div className="section-heading">
          <p className="eyebrow">Ремонт в вашем районе</p>
          <h2 id="region-intro-title">Особенности выезда: {page.badge}</h2>
        </div>
        <p>{page.areaText ?? page.lead}</p>
      </section>

      <section className="section-shell region-map" aria-labelledby="region-map-title">
        <div className="section-heading">
          <p className="eyebrow">Карта района</p>
          <h2 id="region-map-title">Ориентир выезда мастера</h2>
          <p>Карта помогает уточнить зону выезда и ближайший маршрут мастера к вашему адресу.</p>
        </div>
        {googleMapsEmbedSrc ? (
          <iframe
            title={`Карта: ${page.badge}`}
            src={googleMapsEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="region-map__fallback">
            <p>Для показа карты через Google Maps Embed API добавьте ключ в переменную NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY.</p>
            <Link href={googleMapsSearchHref} target="_blank" rel="noopener noreferrer">
              Открыть район на Google Картах
            </Link>
          </div>
        )}
      </section>

      <section className="section-shell price-section" aria-labelledby="region-price-title">
        <div className="section-heading">
          <p className="eyebrow">Цены на ремонт холодильников</p>
          <h2 id="region-price-title">Прайс-лист на услуги</h2>
          <p>Ориентировочная стоимость такая же, как в общем прайс-листе. Точную цену мастер называет после диагностики холодильника.</p>
        </div>
        <div className="price-table-wrap">
          <table className="price-table">
            <thead><tr><th scope="col">Услуга</th><th scope="col">Цена</th><th scope="col">Срок</th></tr></thead>
            <tbody>
              {priceListServices.map((service) => (
                <tr key={service.slug}>
                  <th scope="row"><Link href={getServiceHref(service)} title={service.menuTitle}>{service.menuTitle}</Link></th>
                  <td>{service.price}</td>
                  <td>{service.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-shell price-section" aria-labelledby="region-problems-title">
        <div className="section-heading">
          <p className="eyebrow">Основные проблемы</p>
          <h2 id="region-problems-title">Частые неисправности холодильников</h2>
          <p>Выберите симптом, чтобы открыть подробную страницу с причинами, диагностикой и вариантом ремонта.</p>
        </div>
        <div className="price-table-wrap">
          <table className="price-table problems-table">
            <thead><tr><th scope="col">Проблема</th><th scope="col">Признаки</th><th scope="col">Решение</th></tr></thead>
            <tbody>
              {problemLinks.map((problem) => (
                <tr key={problem.slug}>
                  <th scope="row"><Link href={getServiceHref(problem)} title={problem.menuTitle}>{problem.menuTitle}</Link></th>
                  <td>{problem.symptoms.slice(0, 3).join(", ")}</td>
                  <td>{problem.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return cluster.pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getClusterServicePage(cluster.slug, slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: getServiceHref(page),
    },
    openGraph: {
      title: `${page.title} — ${siteName}`,
      description: page.description,
      url: getServiceHref(page),
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getClusterServicePage(cluster.slug, slug);

  if (!page) {
    return notFound();
  }

  return <ServiceDetailPage page={page} extraSections={<RegionExtraSections page={page} />} isRegion={true} />;
}
