import './NotFound404.css';
import { Link } from 'react-router-dom';

const PageNotFound404 = () => {
  return (
    <div className="notfound">
      <div className="notfound__container">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__description">Страница не найдена</p>
      </div>
      <Link to="/" className="notfound__back">Назад</Link>
    </div>
  );
};

export default PageNotFound404;
