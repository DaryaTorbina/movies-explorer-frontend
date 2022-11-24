import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../../images/logo.svg';
// import AuthorizedHeader from '../AuthorizedHeader/AuthorizedHeader';
import UnauthorizedHeader from '../UnauthorizedHeader/UnauthorizedHeader';
import Navigation from '../Navigation/Navigation';

function Header( { loggedIn } ) {
  return (
    <header className="header section">
      <NavLink to="/" className="header__link"><img className="header__logo" src={logo} alt="Логотип" /></NavLink>
      {!loggedIn ? <UnauthorizedHeader /> : <Navigation /> }
    </header>
  );
}

export default Header;
