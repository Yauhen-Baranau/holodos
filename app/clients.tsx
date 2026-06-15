const clientsData = [
  {
    img: "/clients/1.jpg",
    name: "Елена Кравченко",
    description:
      "Обратилась за ремонтом холодильника в Минске, потому что техника перестала охлаждать продукты. Мастер приехал в тот же день, провел диагностику и быстро устранил неисправность. Холодильник работает как новый.",
  },
  {
     img: "/clients/2.jpg",
    name: "Наталья Черникевич",
    description:
      "Требовался срочный ремонт холодильника на дому. Специалист заменил неисправный термостат и подробно объяснил причину поломки. Порадовали доступные цены и гарантия на выполненные работы.",
  },
  {
     img: "/clients/3.jpg",
    name: "Марина Бабенко",
    description:
      "Искала надежный ремонт холодильников в Минске по разумной цене. Осталась довольна качеством обслуживания, скоростью выполнения работ и вежливым отношением специалиста.",
  },
];

export const Clients = () => {
    return (
    <section
      className="section-shell masters"
      aria-labelledby="masters-title"
    >
      <div className="section-heading">
        <p className="eyebrow">клиенты</p>
        <h2 id="masters-title">Наши довольные клиенты</h2>
      </div>
      <div className="masters-grid">
        {clientsData.map((client, index) => (
          <article className="master-card" key={client.name}>
            <div
              className="master-card__photo"
              aria-label={`Место для фото клиента ${client.name}`}
            >
              <img src={client.img} alt={'Фото клиента'} title={client.name} />
            </div>
            <div className="master-card__content">
              <h3>{client.name}</h3>
              <p>{client.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}