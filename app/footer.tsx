import { address, email, phoneDisplay, siteName } from "./site-data"

export const Footer = () => {
    return (
        <footer className="site-footer" itemScope itemType="https://schema.org/WPFooter">
            <div itemScope itemType="https://schema.org/LocalBusiness">
                <strong itemProp="name">{siteName}</strong>
                <div className="footerScope">
                    <p>ИП Павловец С.П</p>
                    <p>УНП 693197337</p>
                    <p>Телефон: <span itemProp="telephone">{phoneDisplay}</span></p>
                    <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="streetAddress">{address}</span>.</p>
                    <p itemProp="description">Работаем ежедневно, ремонтируем холодильники и морозильные камеры на дому.</p>
                </div>
            </div>
            <a title="Написать на email" href={`mailto:${email}`} itemProp="email">{email}</a>
        </footer>
    )
}