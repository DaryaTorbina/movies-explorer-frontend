import './AboutMe.css';
import avatar from '../../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Дарья</h3>
          <p className="about-me__age">34 года</p>
          <p className="about-me__description">Живу в Москве.Закончила ПМиК ТвГУ.
          Работала прогаммистом 1С. Решилась на смену сферы деятельности после декрета.</p>
          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://github.com/DaryaTorbina">Github</a></li>
          </ul>
        </div>

        <img className="about-me__avatar" src={avatar} alt="изображение не доступно" />
      </div>
    </section>
  );
};

export default AboutMe;
