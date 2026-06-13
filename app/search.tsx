"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServicePage } from "./site-data";

type SiteSearchProps = {
  pages: ServicePage[];
};

function createSearchIndex(page: ServicePage) {
  return [
    page.title,
    page.menuTitle,
    page.description,
    page.lead,
    page.price,
    page.duration,
    page.badge,
    ...page.symptoms,
    ...page.sections.flatMap((section) => [
      section.title,
      section.body,
      ...(section.bullets ?? []),
    ]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
  ]
    .join(" ")
    .toLowerCase();
}

export function SiteSearch({ pages }: SiteSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const indexedPages = useMemo(
    () =>
      pages.map((page) => ({
        page,
        searchText: createSearchIndex(page),
      })),
    [pages],
  );

  const results = useMemo(() => {
    if (normalizedQuery.length < 2) {
      return [];
    }

    const words = normalizedQuery.split(/\s+/).filter(Boolean);

    return indexedPages
      .map(({ page, searchText }) => {
        const score = words.reduce((total, word) => {
          if (!searchText.includes(word)) {
            return total;
          }

          const title = `${page.title} ${page.menuTitle}`.toLowerCase();
          return total + (title.includes(word) ? 3 : 1);
        }, 0);

        return { page, score };
      })
      .filter((item) => item.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 10);
  }, [indexedPages, normalizedQuery]);

  const shouldShowEmpty = normalizedQuery.length >= 2 && results.length === 0;

  return (
    <section className="site-search section-shell" aria-labelledby="site-search-title">
      <div className="site-search__panel">
        <div className="site-search__heading">
          <p className="eyebrow">Поиск по сайту</p>
          <h2 id="site-search-title">Найдите нужную услугу</h2>
          <p>
            Введите марку, поломку или вид работ — покажем подходящие страницы,
            чтобы сразу перейти к нужной услуге.
          </p>
        </div>
        <label className="site-search__field">
          <span>Что нужно найти?</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Например: Atlant, No Frost, не морозит, замена компрессора"
            autoComplete="off"
          />
        </label>
        <div className="site-search__results" aria-live="polite">
          {results.map(({ page }) => (
            <Link
              className="site-search__result"
              href={`/${page.slug}/`}
              key={page.slug}
              title={page.menuTitle}
            >
              <span>{page.menuTitle}</span>
              <small>{page.description}</small>
              <strong>{page.price}</strong>
            </Link>
          ))}
          {shouldShowEmpty ? (
            <p className="site-search__empty">
              Ничего не нашли. Попробуйте написать симптом другими словами или
              позвоните мастеру — подскажем подходящую услугу.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
