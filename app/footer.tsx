import { address, email, siteName } from "./site-data"

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div>
                <strong>{siteName}</strong>
                <div className="footerScope">
                    <p>ИП Павловец С.П</p>
                    <p>УНП 693197337</p>
                    <p>{address}.</p>
                    <p>Работаем ежедневно, ремонтируем холодильники и морозильные камеры на дому.</p>
                </div>
            </div>
            <a title="Написать на email" href={`mailto:${email}`}>{email}</a>
        </footer>
    )
}