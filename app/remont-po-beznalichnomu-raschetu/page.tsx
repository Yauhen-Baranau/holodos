import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "../service-detail-page";
import { getServiceHref, getServicePage, siteName } from "../site-data";

const page = getServicePage("remont-po-beznalichnomu-raschetu");
const documentHref = "/documents/dogovor.doc";

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

function DocumentDownloadSection() {
  return (
    <section className="section-shell document-download" aria-labelledby="document-download-title">
      <div>
        <p className="eyebrow">Документы</p>
        <h2 id="document-download-title">Скачать договор для безналичного расчета</h2>
      </div>
      <a className="button button--primary" href={documentHref} download>
        Скачать документ
      </a>
    </section>
  );
}

export default function Page() {
  if (!page) {
    return notFound();
  }

  return <ServiceDetailPage page={page} extraSections={<DocumentDownloadSection />} />;
}
