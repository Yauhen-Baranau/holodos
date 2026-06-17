import Link from "next/link";
import { ServiceNavigation } from "./service-navigation";
import { phoneDisplay, phoneHref, siteName, siteUrl } from "./site-data";

export function Header() {
  return (
    <header
      className="site-header"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <Link
        className="logo"
        title="На главную"
        href="/"
        aria-label="Холодос — на главную"
        itemScope
        itemType="https://schema.org/Organization"
        itemProp="publisher"
      >
        <meta itemProp="url" content={`${siteUrl}/`} />
        <meta itemProp="logo" content={`${siteUrl}/favicon.svg`} />
        <span className="logo__icon" aria-hidden="true" />
        <span className="logo__text">
          <span className="logo__name" itemProp="name">{siteName}</span>
          <span className="logo__tagline">Ремонт холодильников</span>
        </span>
      </Link>
      <ServiceNavigation />
      <a
        className="header-phone"
        title="Позвонить мастеру"
        href={phoneHref}
        itemProp="telephone"
      >
        {phoneDisplay}
      </a>
    </header>
  );
}
