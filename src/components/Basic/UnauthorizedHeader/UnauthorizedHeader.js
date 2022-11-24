import { Link } from 'react-router-dom';
import './UnauthorizedHeader.css';

function UnauthorizedHeader() {
  return (
    <nav>
      <ul className="authlinks__buttons">
        <li>
          <Link to="/signup" className="authlinks__button authlinks_signup">Регистрация</Link>
        </li>
        <li >
          <Link to="/signin" className="authlinks__button authlinks_signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UnauthorizedHeader;
