import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/DaryaTorbina/russian-travel" target="blank">Статичный сайт</a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/DaryaTorbina/russian-travel" target="blank">Адаптивный сайт</a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/DaryaTorbina/react-mesto-api-full" target="blank">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
