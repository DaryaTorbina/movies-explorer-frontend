import { useState, useEffect } from "react";
import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((state) => !state);
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) toggleMenu();
  }

  function handleEscClose(event) {
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return (
    <nav className="navigation">
      <button
        className="navigation__button-open"
        type="button"
        onClick={toggleMenu}
      ></button>
      <div
        className={`navigation__container ${
          isOpen ? "navigation__container_visible" : ""
        }`}
        onClick={handleOverlayClick}
      >
        <div className="navigation__sidebar">
          <button
            className="navigation__button-close"
            type="button"
            onClick={toggleMenu}
          ></button>
          <ul className="navigation__list">
            <li className="navigation__list-item navigation__list-item_main">
              <Link to="/" className="navigation__link">
                Главная
              </Link>
            </li>
            <li className="navigation__list-item">
              <NavLink to="/movies" className="navigation__link">
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__list-item">
              <NavLink to="/saved-movies" className="navigation__link">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/profile"
            className="navigation__link navigation__link_profile"
          >
            Аккаунт
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
