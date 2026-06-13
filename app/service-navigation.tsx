import Link from "next/link";

export function ServiceNavigation() {
  return (
    <nav className="site-nav" aria-label="Основная навигация">
      <Link title="Услуги" href="/services/">Услуги</Link>
      <Link title="Проблемы" href="/problems/">Проблемы</Link>
      <Link title="Бренды" href="/brands/">Бренды</Link>
      <Link title="Регионы" href="/regions/">Регионы</Link>
      <Link title="Мастерская" href="/services/masterskaya/">Мастерская</Link>
      <Link title="Безнал" href="/problems/remont-po-beznalichnomu-raschetu/">Безнал</Link>
      <Link title="О нас" href="/services/O-nas/">О нас</Link>
    </nav>
  );
}
