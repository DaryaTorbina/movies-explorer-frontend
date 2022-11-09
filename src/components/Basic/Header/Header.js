import './Header.css';
import logo from '../../../images/logo.svg';
import { NavLink } from 'react-router-dom';


function Header({ children}) {
  return (
    <header className="header section">
    <NavLink to="/" className="header__link">
      <img className="header__logo" src={logo} alt="Изображение не доступно"></img></NavLink>

      {children}
    </header>
  );
}

export default Header;
