import { address, email, phoneDisplay, siteName } from "./site-data"

export const Footer = () => {
    return (
        <footer id="site-footer" className="site-footer" itemScope itemType="https://schema.org/WPFooter">
            <div>
                <strong itemProp="name">{siteName}</strong>
                <div className="footerScope">
                    <p>ИП Павловец С.П</p>
                    <p>УНП 693197337</p>
                    <p>Телефон: {phoneDisplay}</p>
                    <p>{address}.</p>
                    <p>Работаем ежедневно, ремонтируем холодильники и морозильные камеры на дому.</p>
                </div>
            </div>
            <a itemProp="email" title="Написать на email" href={`mailto:${email}`}>{email}</a>
        </footer>
    )
}