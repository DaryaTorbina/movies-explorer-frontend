import "./Promo.css";

function Promo(navTab) {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        {navTab.children}
      </div>
    </section>
  );
}

export default Promo;
