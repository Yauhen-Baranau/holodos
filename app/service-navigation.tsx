"use client";

import Link from "next/link";
import { useState } from "react";

const navigationItems = [
  { title: "Услуги", href: "/services/" },
  { title: "Проблемы", href: "/problems/" },
  { title: "Бренды", href: "/brands/" },
  { title: "Регионы", href: "/regions/" },
  { title: "Мастерская", href: "/masterskaya/" },
  { title: "Безнал", href: "/remont-po-beznalichnomu-raschetu/" },
  { title: "О нас", href: "/O-nas/" },
];

export function ServiceNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true">☰</span>
        Меню
      </button>
      <nav
        className={isOpen ? "site-nav site-nav--open" : "site-nav"}
        id="site-navigation"
        aria-label="Основная навигация"
      >
        {navigationItems.map((item) => (
          <Link
            title={item.title}
            href={item.href}
            key={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
