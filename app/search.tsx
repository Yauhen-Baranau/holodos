"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchItem = {
  slug: string;
  href: string;
  title: string;
  description: string;
  price: string;
  searchText: string;
  titleSearchText: string;
};

type SiteSearchProps = {
  items: SearchItem[];
};

function getSearchWords(query: string) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function getSearchScore(item: SearchItem, words: string[]) {
  return words.reduce((total, word) => {
    if (!item.searchText.includes(word)) {
      return total;
    }

    return total + (item.titleSearchText.includes(word) ? 3 : 1);
  }, 0);
}

export function SiteSearch({ items }: SiteSearchProps) {
  const [query, setQuery] = useState("");
  const words = useMemo(() => getSearchWords(query), [query]);
  const searchLength = words.join("").length;

  const results = useMemo(() => {
    if (searchLength < 2) {
      return [];
    }

    return items
      .map((item) => ({
        item,
        score: getSearchScore(item, words),
      }))
      .filter((result) => result.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 10);
  }, [items, searchLength, words]);

  const shouldShowEmpty = searchLength >= 2 && results.length === 0;

  return (
    <section
      className="site-search section-shell"
      aria-labelledby="site-search-title"
    >
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
          {results.map(({ item }) => (
            <Link
              className="site-search__result"
              href={item.href}
              key={item.slug}
              title={item.title}
            >
              <span>{item.title}</span>
              <small>{item.description}</small>
              <strong>{item.price}</strong>
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
