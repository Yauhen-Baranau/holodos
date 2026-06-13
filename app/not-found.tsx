import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__card">
        <p className="eyebrow">404</p>
        <h1>Страница не найдена</h1>
        <p>Вернитесь на главную, чтобы вызвать мастера или посмотреть услуги.</p>
        <Link className="button button--primary" title="Вернуться на главную" href="/">
          На главную
        </Link>
      </div>
    </main>
  );
}
